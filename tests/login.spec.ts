import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Hudl Login Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Successful Login Flow', async ({ page }) => {
    await loginPage.enterEmail(process.env.HUDL_EMAIL!);
    await loginPage.enterPassword(process.env.HUDL_PASSWORD!);
    
    // Check for success - usually redirection to home
    await expect(page).toHaveURL(/.*home/, { timeout: 10000 });
  });

  test('Validation error for malformed email', async () => {
    // Fill and click without waiting for navigation, as we expect to stay on page
    await loginPage.emailInput.fill('not-an-email'); 
    await loginPage.continueButton.click();

    // The error message should appear below the email input
    await expect(loginPage.errorMessageEmail).toBeVisible();
    await expect(loginPage.errorMessageEmail).toContainText('Enter a valid email.');
  });

  test('Error for incorrect username or password', async ({ page }) => {
    // A valid format but non-existent user
    await loginPage.enterEmail('thisuserdoesnotexist123@gmail.com');
    await loginPage.enterPassword('randompassword')

    await expect(loginPage.errorMessagePassword).toBeVisible();
    await expect(loginPage.errorMessagePassword).toContainText("Incorrect username or password.");
  });
});