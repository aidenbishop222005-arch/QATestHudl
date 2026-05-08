# Hudl Login Automation

This repository contains a production-ready test automation framework for validating the Hudl login flow. It is built using Playwright and TypeScript, following the Page Object Model (POM) design pattern to ensure scalability and maintainability.

## Features

- **Page Object Model:** Separation of page-specific logic from test assertions.
- **Multi-Step Flow Support:** Custom handling for the split email and password authentication process.
- **Secure Configuration:** Environment variable management via `dotenv` to prevent credential exposure.
- **Stability:** Use of `data-qa-id` selectors for resilient element targeting.

## Prerequisites

- Node.js (v18 or higher)
- npm (included with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. Install dependencies:
    npm install

3. Install required browsers:
    npx playwright install chromium

## Configuration

The framework requires valid credentials to execute the login scenarios. These should be stored in a `.env` file in the root directory.

1. Create a `.env` file:
   ```bash
   touch .env

2. Add your Hudl test account credentials:
    HUDL_EMAIL=your_email@example.com
    HUDL_PASSWORD=your_password

Note: The `.env` file is excluded from version control via `.gitignore`.

## Running Tests

- **Execute all tests:**
  ```bash
  npx playwright test

Run in UI mode (Interactive):
    npx playwright test --ui

View test report:
    npx playwright show-report

## Project Structure

- `pages/`: Page Object Model classes.
- `tests/`: Test specifications and scenarios.
- `.env.example`: Template for required environment variables.
- `playwright.config.ts`: Global configuration and browser settings.

## Design Considerations

The framework utilizes `data-qa-id` attributes to interact with elements, ensuring tests remain stable even if internal CSS classes or dynamic IDs change. The navigation logic accounts for the asynchronous nature of the multi-page login redirect to prevent race conditions during execution.