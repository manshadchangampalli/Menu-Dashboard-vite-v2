import { expect, test } from "@playwright/test";
import { setupAuthenticatedContext, setupMockBackend } from "./helpers/mockBackend";
import { clickRowAction, confirmDialog, fillByLabel, selectByLabel } from "./helpers/ui";

test.beforeEach(async ({ context, page }) => {
  await setupAuthenticatedContext(context);
  await setupMockBackend(page);
});

test.describe("dashboard functional QA with mocked API", () => {
  test("covers sidebar navigation and read-only pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "System Overview" })).toBeVisible();
    await expect(page.getByText("BistroOS")).toBeVisible();

    for (const [path, text] of [
      ["/reservations", "Manage reservations here."],
      ["/analytics", "View analytics here."],
      ["/settings", "Manage settings here."],
    ] as const) {
      await page.goto(path);
      await expect(page.getByText(text)).toBeVisible();
    }
  });

  test("validates login form and supports successful login redirect", async ({ page, context }) => {
    await context.clearCookies();
    await page.addInitScript(() => localStorage.clear());
    await page.goto("/login");

    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();

    await page.getByLabel("Email Address").fill("qa@example.com");
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "System Overview" })).toBeVisible();
  });

  test("branches: create, search/list, edit, toggle status, delete, export", async ({ page }) => {
    await page.goto("/branches");
    await expect(page.getByRole("heading", { name: "Branch Listing" })).toBeVisible();
    await expect(page.getByText("Downtown Bistro")).toBeVisible();

    await page.getByRole("button", { name: "New Branch" }).click();
    await fillByLabel(page, "Branch Name", "QA Creek Branch");
    await fillByLabel(page, "Email", "creek@example.com");
    await fillByLabel(page, "Phone", "971500001111");
    await fillByLabel(page, "Street Address", "Creek Harbour");
    await selectByLabel(page, page, "City / Emirate", "Dubai");
    await fillByLabel(page, "Zip Code", "12345");
    await fillByLabel(page, "Capacity", "96");
    await selectByLabel(page, page, "Branch Type", "Standard");
    await page.getByRole("button", { name: "Create Branch" }).click();
    await expect(page.getByText("QA Creek Branch")).toBeVisible();

    await page.getByPlaceholder("Search...").fill("Creek");
    await expect(page.getByText("QA Creek Branch")).toBeVisible();
    await expect(page.getByText("Downtown Bistro")).not.toBeVisible();
    await page.getByPlaceholder("Search...").clear();

    await clickRowAction(page, "QA Creek Branch", 0);
    await fillByLabel(page, "Branch Name", "QA Creek Branch Updated");
    await page.getByRole("button", { name: "Update Branch" }).click();
    await expect(page.getByText("QA Creek Branch Updated")).toBeVisible();

    const downtownRow = page.getByRole("row").filter({ hasText: "Downtown Bistro" });
    await downtownRow.getByRole("switch").click();
    await confirmDialog(page, "Confirm");
    await expect(downtownRow.getByText("inactive")).toBeVisible();

    await clickRowAction(page, "QA Creek Branch Updated", 1);
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Creek Branch Updated")).not.toBeVisible();

    await page.getByRole("button", { name: "Export List" }).click();
    await expect(page.getByText(/exported successfully/i)).toBeVisible();
  });

  test("menus: create, edit status/details, delete, and navigate to detail", async ({ page }) => {
    await page.goto("/menu");
    await expect(page.getByRole("heading", { name: "Menus" })).toBeVisible();

    await page.getByRole("button", { name: "Create Menu" }).click();
    await fillByLabel(page, "Menu Name", "QA Weekend Menu");
    await fillByLabel(page, "Description", "Weekend specials");
    await fillByLabel(page, "Start Time", "10:00");
    await fillByLabel(page, "End Time", "22:00");
    await fillByLabel(page, "Category Count", "2");
    await fillByLabel(page, "Item Count", "8");
    await page.getByRole("button", { name: "Create Menu" }).click();
    await expect(page.getByText("QA Weekend Menu")).toBeVisible();

    await clickRowAction(page, "QA Weekend Menu", 0);
    await fillByLabel(page, "Menu Name", "QA Weekend Menu Updated");
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(page.getByText("QA Weekend Menu Updated")).toBeVisible();

    await clickRowAction(page, "QA Weekend Menu Updated", 1);
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Weekend Menu Updated")).not.toBeVisible();

    await page.getByRole("row").filter({ hasText: "All Day Menu" }).click();
    await expect(page).toHaveURL(/\/menu\/menu-001/);
  });

  test("categories: create, edit card, toggle availability, delete", async ({ page }) => {
    await page.goto("/categories");
    await expect(page.getByRole("heading", { name: "Menu Categories" })).toBeVisible();

    await page.getByRole("button", { name: "Add Category" }).click();
    await fillByLabel(page, "Category Name", "QA Starters");
    await fillByLabel(page, "Description", "Small plates");
    await selectByLabel(page, page, "Category Icon", "Pizza");
    await selectByLabel(page, page, "Select Menu", "All Day Menu");
    await fillByLabel(page, "Initial Item Count", "3");
    await page.getByRole("button", { name: "Create Category" }).click();
    await expect(page.getByText("QA Starters")).toBeVisible();

    const card = page.locator(".cursor-pointer").filter({ hasText: "QA Starters" }).first();
    await card.getByRole("button").first().click();
    await fillByLabel(page, "Category Name", "QA Starters Updated");
    await page.getByRole("button", { name: "Update Category" }).click();
    await expect(page.getByText("QA Starters Updated")).toBeVisible();

    const updatedCard = page.locator(".cursor-pointer").filter({ hasText: "QA Starters Updated" }).first();
    await updatedCard.getByRole("switch").click();
    await expect(page.getByText(/deactivated successfully|activated successfully/i)).toBeVisible();

    await updatedCard.getByRole("button").nth(1).click();
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Starters Updated")).not.toBeVisible();
  });

  test("products: create with media, search/list, edit, toggle active, delete, detail panel", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("heading", { name: "Product Catalog" })).toBeVisible();

    await page.getByRole("button", { name: "Add Item" }).click();
    await fillByLabel(page, "Product Name", "QA Lemon Tart");
    await fillByLabel(page, "Description", "Citrus dessert");
    await fillByLabel(page, "SKU", "QA-TART-001");
    await page.getByRole("button", { name: /Pricing & Tax/ }).click();
    await fillByLabel(page, "Base Price (AED)", "24");
    await fillByLabel(page, "Tax Rate (%)", "5");
    await page.getByRole("button", { name: /Media/ }).click();
    await page.getByRole("button", { name: "Add Media" }).click();
    await page.getByRole("button", { name: "URL" }).click();
    await fillByLabel(page, "Media URL", "https://placehold.co/400x300.png");
    await fillByLabel(page, "Alt Text", "Lemon tart plated dessert");
    await fillByLabel(page, "Order", "1");
    await page.getByRole("button", { name: "Create Product" }).click();
    await expect(page.getByText("QA Lemon Tart")).toBeVisible();

    await page.getByPlaceholder("Search...").fill("Lemon");
    await expect(page.getByText("QA Lemon Tart")).toBeVisible();
    await page.getByPlaceholder("Search...").clear();

    await clickRowAction(page, "QA Lemon Tart", 0);
    await fillByLabel(page, "Product Name", "QA Lemon Tart Updated");
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(page.getByText("QA Lemon Tart Updated")).toBeVisible();

    const row = page.getByRole("row").filter({ hasText: "QA Lemon Tart Updated" });
    await row.click();
    await expect(page.getByText("Citrus dessert")).toBeVisible();
    await page.keyboard.press("Escape");

    await row.getByRole("switch").click();
    await confirmDialog(page, "Confirm");
    await expect(page.getByText(/deactivated successfully|activated successfully/i)).toBeVisible();

    await clickRowAction(page, "QA Lemon Tart Updated", 1);
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Lemon Tart Updated")).not.toBeVisible();
  });

  test("staff: create with permissions, edit, toggle status, delete, export", async ({ page }) => {
    await page.goto("/staff");
    await expect(page.getByRole("heading", { name: "Staff Directory" })).toBeVisible();

    await page.getByRole("button", { name: "Add Staff Member" }).click();
    await fillByLabel(page, "Full Name", "QA Lina Parker");
    await fillByLabel(page, "Email Address", "lina@example.com");
    await fillByLabel(page, "Phone Number", "971500002222");
    await fillByLabel(page, "Password", "secret1");
    await fillByLabel(page, "Confirm Password", "secret1");
    await selectByLabel(page, page, "Role", "Chef");
    await selectByLabel(page, page, "Assign to Branch", "Downtown Bistro");
    await page.getByText("Can Create Orders").click();
    await page.getByRole("button", { name: "Add Staff" }).click();
    await expect(page.getByText("QA Lina Parker")).toBeVisible();

    await clickRowAction(page, "QA Lina Parker", 0);
    await fillByLabel(page, "Full Name", "QA Lina Parker Updated");
    await page.getByRole("button", { name: "Update Staff" }).click();
    await expect(page.getByText("QA Lina Parker Updated")).toBeVisible();

    const staffRow = page.getByRole("row").filter({ hasText: "QA Lina Parker Updated" });
    await staffRow.getByRole("switch").click();
    await confirmDialog(page, "Confirm");
    await expect(page.getByText(/deactivated successfully|activated successfully/i)).toBeVisible();

    await clickRowAction(page, "QA Lina Parker Updated", 1);
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Lina Parker Updated")).not.toBeVisible();

    await page.getByRole("button", { name: "Export List" }).click();
    await expect(page.getByText(/exported successfully/i)).toBeVisible();
  });

  test("orders: create walk-in order, list it, search, and filter tabs", async ({ page }) => {
    await page.goto("/orders");
    await expect(page.getByRole("heading", { name: "Order Management" })).toBeVisible();
    await expect(page.getByText("Maya Joseph")).toBeVisible();

    await page.getByRole("button", { name: "New Walk-in Order" }).click();
    await fillByLabel(page, "Customer Name", "QA Omar Saleh");
    await fillByLabel(page, "Phone Number", "971500003333");
    await selectByLabel(page, page, "Branch", "Downtown Bistro");
    await fillByLabel(page, "Table Number", "12");
    await selectByLabel(page, page, "Menu Item", "Classic Burger");
    await fillByLabel(page, "Qty", "3");
    await page.getByRole("button", { name: "Create Order" }).click();
    await expect(page.getByText("QA Omar Saleh")).toBeVisible();
    await expect(page.getByText("$126.00")).toBeVisible();

    await page.getByPlaceholder("Search...").fill("Omar");
    await expect(page.getByText("QA Omar Saleh")).toBeVisible();
    await page.getByPlaceholder("Search...").clear();

    await page.getByRole("button", { name: "Pending" }).click();
    await expect(page.getByText("QA Omar Saleh")).toBeVisible();
  });

  test("menu items: assign product, edit selling price, delete assignment", async ({ page }) => {
    await page.goto("/menu-items");
    await expect(page.getByRole("heading", { name: "Menu Items" })).toBeVisible();

    await page.getByRole("button", { name: "Assign Product" }).click();
    await selectByLabel(page, page, "Select Category", "Burgers");
    await selectByLabel(page, page, "Select Product", "Classic Burger");
    await fillByLabel(page, "Selling Price (AED)", "45");
    await page.getByRole("button", { name: "Add Size" }).click();
    await page.getByPlaceholder("e.g. Small").fill("Large");
    await page.getByPlaceholder("Price").fill("49");
    await page.getByRole("button", { name: "Add to Category" }).click();
    await expect(page.getByText("45 AED")).toBeVisible();

    await page.getByRole("row").filter({ hasText: "Classic Burger" }).first().click();
    await expect(page.getByRole("heading", { name: "Classic Burger" })).toBeVisible();
    await fillByLabel(page, "Selling Price (AED)", "47");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("47 AED")).toBeVisible();

    const createdRows = page.getByRole("row").filter({ hasText: "47 AED" });
    await createdRows.first().getByRole("button").click();
    await confirmDialog(page, "Remove");
    await expect(page.getByText("47 AED")).not.toBeVisible();
  });

  test("filters and sort options: create, edit, delete", async ({ page }) => {
    await page.goto("/filters");
    await expect(page.getByRole("heading", { name: "Filters & Sorting" })).toBeVisible();

    await page.getByRole("button", { name: /Add filter/i }).click();
    await fillByLabel(page, "Name", "QA Spice");
    await selectByLabel(page, page, "Source", "Spice level");
    await fillByLabel(page, "Label", "Hot");
    await fillByLabel(page, "Value", "hot");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("QA Spice")).toBeVisible();

    await page.getByRole("row").filter({ hasText: "QA Spice" }).getByRole("button").first().click();
    await fillByLabel(page, "Name", "QA Spice Updated");
    await page.getByRole("button", { name: "Update" }).click();
    await expect(page.getByText("QA Spice Updated")).toBeVisible();

    await page.getByRole("row").filter({ hasText: "QA Spice Updated" }).getByRole("button").nth(1).click();
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Spice Updated")).not.toBeVisible();

    await page.getByRole("button", { name: /Add sort/i }).click();
    await fillByLabel(page, "Label", "QA Price Low to High");
    await selectByLabel(page, page, "Field", "Price");
    await selectByLabel(page, page, "Direction", "Ascending");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("QA Price Low to High")).toBeVisible();

    await page.getByRole("row").filter({ hasText: "QA Price Low to High" }).getByRole("button").first().click();
    await fillByLabel(page, "Label", "QA Price Sort Updated");
    await page.getByRole("button", { name: "Update" }).click();
    await expect(page.getByText("QA Price Sort Updated")).toBeVisible();

    await page.getByRole("row").filter({ hasText: "QA Price Sort Updated" }).getByRole("button").nth(1).click();
    await confirmDialog(page, "Delete");
    await expect(page.getByText("QA Price Sort Updated")).not.toBeVisible();
  });
});
