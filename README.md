# JetBrains Buy Page Testing

This project contains tests for the **Buy** pages of JetBrains products using Playwright.

## Project Structure

- **`/tests`**: Contains test files
- **`/pages/BuyPage.ts`**: Contains the **Buy Page** class that defines the structure and methods for the pages under test.
- **`/components`**: Houses classes for individual elements used on the Buy pages, improving readability and maintainability.

## Key Features

- **Page Object Pattern**: Tests are organized using the **Page Object** pattern, which simplifies scaling and extending tests.
- **Component Classes**: Common page elements are encapsulated in component classes, promoting reusable and clean code.

## Notes
- **Header and Footer** testing is not covered in this project and may be implemented separately if needed.
