import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  test: {
    exclude: ["**/node_modules/**", "**/e2e/**"],
    projects: [
      {
        extends: true,
        test: {
          exclude: ["**/*.browser.{test,spec}.ts(x)"],
          name: "Unit",
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          include: ["**/*.browser.{test,spec}.ts(x)"],
          name: "Browser",
          browser: {
            enabled: true,
            headless: false,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
