import { expect, type Locator, type Page } from "@playwright/test";

const exactText = (text: string) => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");

export const fieldByLabel = (scope: Page | Locator, label: string) =>
  scope
    .locator("label")
    .filter({ hasText: exactText(label) })
    .locator("xpath=..")
    .locator("input, textarea")
    .first();

export async function fillByLabel(scope: Page | Locator, label: string, value: string) {
  const field = fieldByLabel(scope, label);
  await expect(field, `Expected field "${label}" to be visible`).toBeVisible();
  await field.fill(value);
}

export async function selectByLabel(page: Page, scope: Page | Locator, label: string, option: string | RegExp) {
  const wrapper = scope
    .locator("label")
    .filter({ hasText: exactText(label) })
    .locator("xpath=..")
    .first();
  await expect(wrapper, `Expected select "${label}" to be visible`).toBeVisible();
  await wrapper.getByRole("combobox").click();
  await page.getByRole("option", { name: option }).click();
}

export async function clickRowAction(page: Page, rowText: string | RegExp, actionIndex: number) {
  const row = page.getByRole("row").filter({ hasText: rowText }).first();
  await expect(row).toBeVisible();
  await row.getByRole("button").nth(actionIndex).click();
}

export async function confirmDialog(page: Page, buttonName: string | RegExp = /^(Confirm|Delete|Remove)$/) {
  const dialog = page.getByRole("dialog").last();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: buttonName }).click();
}

export async function expectNoFatalConsole(page: Page, errors: string[]) {
  const fatalErrors = errors.filter((message) => !/Failed to load resource: the server responded with a status of 404/.test(message));
  expect(fatalErrors).toEqual([]);
}
