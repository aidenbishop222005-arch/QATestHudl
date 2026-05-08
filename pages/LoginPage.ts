import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessageEmail: Locator;
  readonly errorMessagePassword: Locator;
  readonly viewIcon: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use the specific data-qa-id attributes you found
    this.emailInput = page.locator('[data-qa-id="email-input-input"]');
    this.passwordInput = page.locator('[data-qa-id="password-input-input"]');
    
    // We target the button that has the name "Continue" and is a submit type
    this.continueButton = page.locator('button[name="Continue"][type="submit"]');
    
    // Specifically targeting the help/error text area
    this.errorMessageEmail = page.locator('[data-qa-id="email-input-help-text"]');

    // Specifivally targeting the password help/error text area 
    this.errorMessagePassword = page.locator('[data-qa-id="password-input-help-text"]');

    //Targets the eye icon to view the password
    this.viewIcon = page.locator('[data-qa-id="toggle-password-visibility"]')

    //Target the edit button to return to the email enter page
    this.editButton = page.locator('[data-qa-id="edit-identifier"]')
  }

  async goto() {
    await this.page.goto('/login');
  }

  /**
   * Enters email and waits for the password page to load
   */
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
    // Clicking 'Continue' triggers a navigation to the password page
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
        /* Ignore timeout if it's a single-page swap */
      }),
      this.continueButton.click(),
    ]);
  }

  /**
   * Enters password and submits the final login
   */
  async enterPassword(password: string) {
    // Ensure the password field is ready before typing
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }

  /**
   * Enter password and clicks the eye icon to view it
   */
  async viewPassword(password:string){
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.viewIcon.click();
  }

}