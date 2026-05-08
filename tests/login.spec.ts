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
    await loginPage.emailInput.fill('random-text'); 
    await loginPage.continueButton.click();

    // The error message should appear below the email input
    await expect(loginPage.errorMessageEmail).toBeVisible();
    await expect(loginPage.errorMessageEmail).toContainText('Enter a valid email.');
  });

  test('Error for incorrect username or password', async ({ page }) => {
    // A valid format but non-existent user
    await loginPage.enterEmail('fakeuser@gmail.com');
    await loginPage.enterPassword('randompassword')

    // The error meesage should appear below the password input
    await expect(loginPage.errorMessagePassword).toBeVisible();
    await expect(loginPage.errorMessagePassword).toContainText("Incorrect username or password.");
  });

    test('Viewing/Hiding password using eye icon', async ({ page }) => {
    // A random user is enter but doesn't try to log in yet button to view is pressed
    await loginPage.enterEmail('fakeuser@gmail.com');
    await loginPage.viewPassword('randompassword')

    // The input for the password should be text
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');

    // The password visivility is clicked again
    await loginPage.viewIcon.click();

    // The input for the password should be back to type password
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  
    test('Editing Email', async ({ page }) => {
    // Random user email is entered 
    await loginPage.enterEmail('fakeuser@gmail.com');

    // Edit button is pressed to send back to main page
    await loginPage.editButton.click();

    // Email input should be accesable again
    await expect(loginPage.emailInput).toBeVisible();
  });
});