import { defineConfig } from "@playwright/test";

const baseURL = process.env.QA_BASE_URL || "http://127.0.0.1:5173";

export default defineConfig({
  testDir: "./qa",
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: process.env.QA_BASE_URL
    ? undefined
    : {
        command: "pnpm run dev:qa",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
