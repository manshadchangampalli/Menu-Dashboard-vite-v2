const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("@playwright/test");

const baseURL = process.env.QA_BASE_URL || "http://127.0.0.1:5173";
const outputDir = path.join(process.cwd(), "qa-results");
const mockApi = process.env.MOCK_API === "1";

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

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  if (mockApi) {
    await context.addInitScript(() => {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            user: { _id: "qa-user", name: "QA User", email: "qa@example.com", role: "owner" },
            isLoggedIn: true,
          },
          version: 0,
        })
      );
    });

    await context.route("**/api/**", async (route) => {
      const url = route.request().url();
      if (url.includes("auth/dashboard/login")) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: { user: { _id: "qa-user", name: "QA User", email: "qa@example.com", role: "owner" } },
          }),
        });
      }

      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: [],
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
        }),
      });
    });
  }
  const page = await context.newPage();
  const results = [];

  for (const route of routes) {
    const consoleMessages = [];
    const pageErrors = [];
    const failedRequests = [];

    const onConsole = (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleMessages.push(`${message.type()}: ${message.text()}`);
      }
    };
    const onPageError = (error) => pageErrors.push(error.message);
    const onRequestFailed = (request) => {
      failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`);
    };

    page.on("console", onConsole);
    page.on("pageerror", onPageError);
    page.on("requestfailed", onRequestFailed);

    const startedAt = Date.now();
    let status = "ok";
    let bodyText = "";
    let title = "";
    let url = "";
    let buttons = [];
    let links = [];

    try {
      await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
      await wait(1500);
      bodyText = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
      title = await page.title().catch(() => "");
      url = page.url();
      buttons = await page.locator("button").evaluateAll((nodes) =>
        nodes.slice(0, 12).map((node) => node.textContent?.trim()).filter(Boolean)
      );
      links = await page.locator("a").evaluateAll((nodes) =>
        nodes.slice(0, 12).map((node) => node.textContent?.trim()).filter(Boolean)
      );

      const prefix = mockApi ? "mocked" : "route";
      const screenshotName = `${prefix}-${route === "/" ? "root" : route.slice(1).replaceAll("/", "-")}.png`;
      await page.screenshot({ path: path.join(outputDir, screenshotName), fullPage: true });

      if (!bodyText.trim()) status = "blank";
      if (/internal server error|failed to load module script/i.test(bodyText)) status = "fatal-render-error";
    } catch (error) {
      status = "navigation-error";
      pageErrors.push(error.message);
    }

    results.push({
      route,
      status,
      url,
      title,
      elapsedMs: Date.now() - startedAt,
      bodyPreview: bodyText.replace(/\s+/g, " ").slice(0, 400),
      buttons,
      links,
      consoleMessages,
      pageErrors,
      failedRequests,
    });

    page.off("console", onConsole);
    page.off("pageerror", onPageError);
    page.off("requestfailed", onRequestFailed);
  }

  let loginValidation = "skipped in mocked API mode";
  if (!mockApi) {
    await page.goto(`${baseURL}/login`, { waitUntil: "domcontentloaded" });
    await page.click('button[type="submit"]');
    await wait(300);
    loginValidation = await page.locator("body").innerText();
    await page.screenshot({ path: path.join(outputDir, "interaction-login-empty-submit.png"), fullPage: true });
  }

  fs.writeFileSync(
    path.join(outputDir, mockApi ? "frontend-mocked-sweep.json" : "frontend-sweep.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), mockApi, routes: results, loginValidation }, null, 2)
  );

  await browser.close();
  console.log(JSON.stringify({ outputDir, routeCount: results.length, statuses: results.map((r) => [r.route, r.status]) }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
