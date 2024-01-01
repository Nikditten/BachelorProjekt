import { expect, test } from "@playwright/test";

test("User must be able to register", async ({ page }) => {
  await page.context().clearCookies();

  await page.goto("http://localhost:3000/auth/login");

  const title = await page.textContent("h1");

  expect(title).toBe("Analytics");

  await page.getByTestId("signup-link").click();

  await page.waitForURL("http://localhost:3000/auth/signup");

  await page.fill("input[name=name]", "test");

  await page.fill("input[name=username]", "test" + Date.now());

  await page.fill("input[name=password]", "ThisIsATest121212");

  await page.click("button[type=submit]");

  await page.waitForURL("http://localhost:3000/");

  const cookie = await page.context().cookies();

  const authCookie = cookie.find((c) => c.name === "auth");

  expect(authCookie).toBeTruthy();

  expect(authCookie?.value.length).toBeGreaterThan(0);
});

test("User must be able to login", async ({ page }) => {
  await page.context().clearCookies();

  await page.goto("http://localhost:3000/auth/login");

  const title = await page.textContent("h1");

  expect(title).toBe("Analytics");

  await page.fill("input[name=username]", "user");

  await page.fill("input[name=password]", "Detteerentest1234");

  await page.click("button[type=submit]");

  await page.waitForURL("http://localhost:3000/");

  const cookie = await page.context().cookies();

  const authCookie = cookie.find((c) => c.name === "auth");

  expect(authCookie).toBeTruthy();

  expect(authCookie?.value.length).toBeGreaterThan(0);
});
