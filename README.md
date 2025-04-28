# Playwright Test Automation Project

This project contains tests for the **Premium** page of Spotify.

[![Buy Page Tests](https://github.com/ausievich/testing-task-1/actions/workflows/playwright.yml/badge.svg)](https://github.com/ausievich/testing-task-1/actions/workflows/playwright.yml)

## Project Structure

- **`/tests`**: Contains the specification file for the **Premium Page** tests.
- **`/pages`**: Contains the **Premium Page** class that defines the structure and methods for the page under test.
- **`/components`**: Houses classes for individual elements used on the page.
- **`/screenshots`**: Contains reference screenshots captured during tests.

## Key Features

- **Page Object Pattern**: Tests are organized using the **Page Object** pattern, which simplifies scaling and extending tests.
- **Component Classes**: Common page elements are encapsulated in component classes, promoting reusable and clean code.
- **Screenshot testing**: Screenshot testing is implemented within a Docker container to avoid differences during CI runs.
- **Scheduled Test Runs**: Tests are executed automatically on CI once a day using a scheduled job configuration, ensuring consistent monitoring of application functionality.


## Running the Tests

To run the tests, please refer to the scripts section of the `package.json` file. 
Screenshots are only intended to be captured in Docker or CI environments to avoid discrepancies in comparisons.

To run tests locally for debugging purposes or to execute them in headed mode, use the following commands:
```bash
npm run test:local
```

To capture screenshots, use the following scripts:
```bash
npm run test:docker
```
