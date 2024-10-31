# JetBrains Buy Page Testing

This project contains tests for the **Buy** pages of JetBrains products using Playwright.

## Project Structure

- **`/tests`**: Contains tests for the [**Buy IntelliJ IDEA**](https://www.jetbrains.com/idea/buy/) and [**Buy CLion**](https://www.jetbrains.com/clion/buy) pages.
- **`/pages/BuyPage.ts`**: Contains the **Buy Page** class that defines the structure and methods for the pages under test.
- **`/components`**: Houses classes for individual elements used on the Buy pages, improving readability and maintainability.

## Key Features

- **Page Object Pattern**: Tests are organized using the **Page Object** pattern, which simplifies scaling and extending tests.
- **Component Classes**: Common page elements are encapsulated in component classes, promoting reusable and clean code.

## Running the Tests

To run all tests, use the following command:

```bash
npx playwright test
```

To run a specific test file:
```bash
npx playwright test tests/fileName.ts
```

## Notes
- **Screenshot testing, Docker setup, and CI integration** were not considered within the scope of this task.
- **Header and Footer** testing is not covered in this project and may be implemented separately if needed.
