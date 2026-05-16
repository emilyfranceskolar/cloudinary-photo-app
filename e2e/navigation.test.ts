import { expect, test } from "@playwright/test";

test.describe("Gallery Page", () => {
  test("should open gallery and navigate to favorites", async ({ page }) => {
    await page.goto("/gallery");

    await expect(page.getByRole("heading", { name: "Gallery" })).toBeVisible();

    await page.getByRole("link", { name: "Favorites" }).click();

    await expect(page).toHaveURL(/\/favorites$/);
    await expect(
      page.getByRole("heading", { name: "Favorites" }),
    ).toBeVisible();
  });
});
