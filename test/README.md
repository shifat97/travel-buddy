# Playwright TypeScript Template

This template provides a solid starting point for Playwright automation projects using TypeScript and Page Object Model (POM).

## Features
- **Global Authentication Setup**: Login once and reuse the state across multiple tests.
- **Environment Variable Support**: Securely manage URLs and credentials using `.env` files.
- **Page Object Model (POM)**: Organized page classes for better maintainability.
- **Custom Fixtures**: Simplified test code by injecting page objects directly into tests.
- **Centralized Test Data**: Easy management of credentials and expected values.
- **Multi-browser Support**: Configured for Chromium, Firefox, and WebKit.

## Folder Structure
- `pages/`: Contains Page Object classes.
- `fixtures/`: Contains custom fixtures to extend Playwright's `test` object.
- `tests/`: Contains test files and the global setup (`auth.setup.ts`).
- `data/`: Contains test data (credentials, constants, etc.).
- `playwright/.auth/`: Directory where the authenticated state is stored.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   - Copy `.env.example` to `.env`.
   - Update the values in `.env` as needed.
   ```bash
   cp .env.example .env
   ```
3. Run tests:
   ```bash
   npx playwright test
   ```
4. Run tests in headed mode:
   ```bash
   npx playwright test --headed
   ```

## How it Works
- `tests/auth.setup.ts` runs first (configured in `playwright.config.ts`) and performs the login.
- It saves the session state to `playwright/.auth/user.json`.
- Other tests in `tests/` automatically use this state, so they start logged in.
- For tests that need to be logged out (e.g., login failure tests), use `test.use({ storageState: { cookies: [], origins: [] } });`.
