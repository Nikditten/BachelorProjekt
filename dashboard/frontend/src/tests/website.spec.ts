import { expect, test } from "@playwright/test";

test("User must be able to create a website", async ({ page, request }) => {
  const res = await request.post(
    "http://localhost:5001/api/dashboard/User/Login",
    {
      data: {
        username: "e2eTestUser",
        password: "murtu6-jamwEx-gewnin",
      },
    },
  );

  expect(res.ok()).toBe(true);

  const token = await res.text();

  await page.context().addCookies([
    {
      name: "auth",
      value: token,
      domain: "localhost",
      path: "/",
    },
  ]);

  await page.goto("http://localhost:3000/");

  await page.getByTestId("manage-website-link").click();

  await page.waitForURL("http://localhost:3000/create");

  const numberOfWebsites = await page.$$eval(
    "div[data-testid=website-card]",
    (elements) => elements.length,
  );

  await page.getByTestId("create-website-button").click();

  await page.fill("input[name=name]", "Test Website" + Date.now());

  await page.fill("input[name=url]", "https://test.com");

  await page.click("button[type=submit]");

  await page.waitForTimeout(1000);

  const updatedNumberOfWebsites = await page.$$eval(
    "div[data-testid=website-card]",
    (elements) => elements.length,
  );

  expect(updatedNumberOfWebsites).toBe(numberOfWebsites + 1);
});
