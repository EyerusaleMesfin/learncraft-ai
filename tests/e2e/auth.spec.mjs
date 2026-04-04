import { test, expect } from "@playwright/test";

const existingUserEmail = process.env.E2E_EXISTING_USER_EMAIL;
const existingUserPassword = process.env.E2E_EXISTING_USER_PASSWORD;
const signupPassword = process.env.E2E_SIGNUP_PASSWORD;
const signupDomain = process.env.E2E_SIGNUP_EMAIL_DOMAIN;
const signupPrefix = process.env.E2E_SIGNUP_EMAIL_PREFIX ?? "learncraft";
const signupName = process.env.E2E_SIGNUP_FULL_NAME ?? "Learn Craft Tester";
const googleRedirectEnabled = process.env.E2E_TEST_GOOGLE === "true";

function uniqueSignupEmail() {
  return `${signupPrefix}+${Date.now()}@${signupDomain}`;
}

async function login(page, email, password) {
  await page.goto("/login");
  await page.getByTestId("email-input").fill(email);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("auth-submit-button").click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("dashboard-page")).toBeVisible();
}

test.describe("Learn Craft AI auth flow", () => {
  test("redirects signed-out users away from protected routes", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("login-form")).toBeVisible();

    await page.goto("/tracks");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("registers a learner with email and password", async ({ page }) => {
    test.skip(
      !signupDomain || !signupPassword,
      "Set E2E_SIGNUP_EMAIL_DOMAIN and E2E_SIGNUP_PASSWORD to run signup tests."
    );

    const email = uniqueSignupEmail();

    await page.goto("/register");
    await page.getByTestId("full-name-input").fill(signupName);
    await page.getByTestId("email-input").fill(email);
    await page.getByTestId("password-input").fill(signupPassword);
    await page.getByTestId("confirm-password-input").fill(signupPassword);
    await page.getByTestId("auth-submit-button").click();

    await Promise.race([
      page.waitForURL(/\/dashboard$/, { timeout: 12_000 }),
      expect(page.getByTestId("auth-message")).toContainText("Check your email", {
        timeout: 12_000
      })
    ]);
  });

  test("logs in with an existing learner account", async ({ page }) => {
    test.skip(
      !existingUserEmail || !existingUserPassword,
      "Set E2E_EXISTING_USER_EMAIL and E2E_EXISTING_USER_PASSWORD to run login tests."
    );

    await login(page, existingUserEmail, existingUserPassword);
    await expect(page.getByTestId("dashboard-heading")).toContainText("dashboard");
  });

  test("starts the Google OAuth redirect flow", async ({ page }) => {
    test.skip(!googleRedirectEnabled, "Set E2E_TEST_GOOGLE=true to run Google OAuth tests.");

    await page.goto("/login");
    await page.getByTestId("google-auth-button").click();

    await page.waitForURL(
      (url) =>
        url.href.includes("accounts.google.com") || url.href.includes("/auth/v1/authorize"),
      { timeout: 15_000 }
    );

    await expect(page).toHaveURL(/accounts\.google\.com|auth\/v1\/authorize/);
  });

  test("logs out and protects routes again", async ({ page }) => {
    test.skip(
      !existingUserEmail || !existingUserPassword,
      "Set E2E_EXISTING_USER_EMAIL and E2E_EXISTING_USER_PASSWORD to run logout tests."
    );

    await login(page, existingUserEmail, existingUserPassword);
    await expect(page.getByTestId("user-identity")).toBeVisible();

    await page.getByTestId("logout-button").click();
    await expect(page).toHaveURL(/\/login$/);

    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login$/);
  });
});
