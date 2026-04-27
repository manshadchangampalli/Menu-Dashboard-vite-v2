import { test, expect } from "@playwright/test";

const routes = [
  "/login",
  "/",
  "/orders",
  "/reservations",
  "/menu-items",
  "/menu",
  "/categories",
  "/branches",
  "/staff",
  "/analytics",
  "/settings",
  "/products",
  "/filters",
];

test.describe("frontend QA smoke sweep", () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }, testInfo) => {
      const consoleMessages: string[] = [];
      const pageErrors: string[] = [];
      const failedRequests: string[] = [];

      page.on("console", (message) => {
        if (["error", "warning"].includes(message.type())) {
          consoleMessages.push(`${message.type()}: ${message.text()}`);
        }
      });

      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      page.on("requestfailed", (request) => {
        failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`);
      });

      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("body")).not.toHaveText(/failed to load module script|internal server error/i);

      await page.screenshot({
        path: testInfo.outputPath(`route-${route.replaceAll("/", "_") || "root"}.png`),
        fullPage: true,
      });

      testInfo.attach("console-messages", {
        body: consoleMessages.join("\n") || "none",
        contentType: "text/plain",
      });
      testInfo.attach("page-errors", {
        body: pageErrors.join("\n") || "none",
        contentType: "text/plain",
      });
      testInfo.attach("failed-requests", {
        body: failedRequests.join("\n") || "none",
        contentType: "text/plain",
      });

      expect(pageErrors).toEqual([]);
    });
  }
});
