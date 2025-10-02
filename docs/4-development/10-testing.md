# Testing

## WDIO
The test framework of choice for UI5 Web Components is [WebdriverIO](https://webdriver.io/) or WDIO for short.
It has a straightforward API - [https://webdriver.io/docs/api.html](https://webdriver.io/docs/api.html), and has excellent support for Web Components.

The browser of choice for test execution is [Google Chrome](https://www.google.com/chrome/), respectively the WebDriver used is [ChromeDriver](https://chromedriver.chromium.org/).

### Prerequisites

#### Install ChromeDriver

ChromeDriver is a peer dependency of `@ui5/webcomponents-tools`. Therefore, you are expected to install and upgrade it manually.

You can install it with `npm`:
 - `npm i --save-dev chromedriver`

or with `yarn`:
 - `yarn add -D chromedriver`

**Note:** Google Chrome and ChromeDriver need to be the same version to work together. Whenever you update Google Chrome on
your system (or it updates automatically, if allowed), you are expected to also update ChromeDriver to the respective version.

### Running the tests

#### 1. Test configuration

The configuration for WDIO can be found in the `config/` directory under `wdio.conf.js`.

As explained [here](./01-package.md) in the section about the `config/` directory, you can
customize, or even completely replace the default configuration.

However, before doing so, please note the following two benefits of working with the default configuration, provided by UI5 Web Components:
 - Hooks, synchronizing the execution of all relevant WDIO commands (e.g. `click`, `url`, `$`, `$$`) with the rendering of the framework to
 ensure consistency when reading or changing the state of the components.
 - Additional API methods: `setProperty`, `setAttribute`, `removeAttribute`, `hasClass`.

So our recommendation would be to modify it, if necessary, but not completely replace it.

#### 2. Running all tests

`npm run test`

or

`yarn test`

This will *launch a static server* and execute all tests found in the `test/specs/` directory of your package.

**Note:** Before running the tests for the first time, make sure you've built the project, or at least the dev server is running (`build` or `start` commands).

#### 3. Running a single test spec

`npm run test test/specs/Demo.spec.js`

or

`yarn test test/specs/Demo.spec.js`

**Note:** Executing a single test spec only makes sense for debugging purposes, therefore no test server is launched for it.
Make sure you're running the `start` command while running single test specs, as it provides a server and the ability to change
files, and test the changes on the fly.

### Writing tests

The simplest test would look something like this:

```js
describe("ui5-demo rendering", async () => {
	await browser.url("test/pages/index.html");

	it("tests if web component is correctly rendered", async () => {
		const innerContent = await browser.$("#myFirstComponent").shadow$("div");
		assert.ok(innerContent, "content rendered");
	});
});
```

Key points:
   - Load the test page with the `browser.url` command. You can do this once for each test suite or for each individual test.
   - You can access the web components with `$` or `$$`.
   - You can access the shadow roots with `shadow$` or `shadow$$`.
   - Simulate mouse interaction with the web components by calling the `click` command on the web component itself or certain parts of its shadow root.
   - Simulate keyboard with the `keys` command.
   - You can read the DOM with commands such as `getHTML`, `getProperty`, `getAttribute`, etc.
   - You can modify the DOM with commands such as `setProperty`, `setAttribute` etc.

For WDIO capabilities, see:
   - Official API: [https://webdriver.io/docs/api.html](https://webdriver.io/docs/api.html).
   - Additional commands provided in our standard WDIO configuration: `setProperty`, `setAttribute`, `removeAttribute`, `hasClass`.

**Note:** The standard WDIO configuration we provide automatically synchronizes all test commands' execution with the framework rendering cycle.
Therefore, in the example above, the `shadow$` command will internally wait for all rendering to be over before being executed. The
same holds true for commands that modify the DOM such as `setAttribute` or `click`.

### Debugging

Debugging with WDIO is really simple. Just follow these 3 steps:

1. Change the WDIO configuration file `config/wdio.conf.js` to disable `headless` mode for Google Chrome as follows:

	From:

	```js
	module.exports = require("@ui5/webcomponents-tools/components-package/wdio.js");
	```

	to:

	```js
    const result = require("@ui5/webcomponents-tools/components-package/wdio.js");
    result.config.capabilities[0]["goog:chromeOptions"].args = ['--disable-gpu']; // From: ['--disable-gpu', '--headless']
    module.exports = result;
    ```

    If you happen to debug often, it's recommended to keep the file in this format and just comment out the middle line when you're done debugging.

2. Set a breakpoint with `browser.debug` somewhere in your test:

	```js
	it("tests if web component is correctly rendered", async () => {
        const innerContent = await browser.$("#myFirstComponent").shadow$("div");
        await browser.debug();
        assert.ok(innerContent, "content rendered");
    });
	```

	For more on `debug`, see [https://webdriver.io/docs/api/browser/debug.html](https://webdriver.io/docs/api/browser/debug.html).

3. Run the single test spec and wait for the browser to open and pause on your breakpoint:

 - Run the dev server, if you haven't already:

	`yarn start`

	or

	`npm run start`.

 - Run the single test spec:

	`yarn test test/specs/Demo.spec.js`

	or

	`npm run test test/specs/Demo.spec.js`.

Google Chrome will then open in a new window, controlled by WDIO via the ChromeDriver, and your test will pause on your
breakpoint of choice. Proceed to debug normally.

### Best practices for writing tests

#### 1. Do not overuse `assert.ok`

When an `assert.ok` fails, the error you get is "Expected something to be true, but it was false". This is fine when you're passing a Boolean, but not ok when there is an expression inside `assert.ok` and you'd like to know which part of the expression is not as expected.

For example, when `assert.ok(a === b, "They match")` fails, the error just says that an expression that was expected to be true was false. However, if you use `assert.strictEqual(a, b, "They match")`, and it fails, the error will say that `a` was expected to be a certain value, but it was another value, which makes it much easier to debug.

Prefer one of the following, when applicable:
- `assert.notOk(a)` instead of `assert.ok(!a)`
- `assert.strictEqual(a, b)` instead of `assert.ok(a === b)`
- `assert.isBelow(a, b)` instead of `assert.ok(a < b)`
- `assert.isAbove(a, b)` instead of `assert.ok(a > b)`
- `assert.exists` / `assert.notExists` when checking for `null` or `undefined`

#### 2. Do not overuse `assert.strictEqual`

Use:
- `assert.ok` instead of `assert.strictEqual(a, true)`
- `assert.notOk` instead of `assert.strictEqual(a, false)`

#### 3. Use `isExisting` to check the DOM

Preferred:
 ```js
assert.ok(await browser.$(<SELECTOR>).isExisting())
```

instead of:

```js
assert.ok((await browser.$$(<SELECTOR>)).length)
```

#### 4. Do not use `browser.executeAsync` for properties

We have custom commands such as `getProperty` and `setProperty` to fill in gaps in the WDIO standard command set. Use them instead of manually setting properties with `executeAsync`.

#### 5. Use `assert.include` instead of string functions

Use:

 ```js
assert.include(text, EXPECTED_TEXT, "Text found")
assert.notInclude(text, NOT_EXPECTED_TEXT, "Text not found")
```

instead of:

```js
assert.ok(text.indexOf(EXPECTED_TEXT) > -1, "Text found")
assert.ok(text.includes(EXPECTED_TEXT), "Text found")
assert.notOk(text.includes(NOT_EXPECTED_TEXT), "Text not found")
```

#### 6. Extract variables before asserting

Avoid complex expressions inside `assert`s by extracting parts of them to variables and only asserting the variables.

## Cypress

### Folder Structure

Refer to the official Cypress documentation for detailed information on [folder structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Folder-structure).

For each package in your project, include a `cypress` folder at the root level with the following subfolders:

- **`specs`**: Contains all test files.
- **`support`**: Includes additional functionality such as custom commands that can be reused across different components, as well as library-specific commands (e.g., commands for enforcing mobile testing).

---

### Writing Tests

To write tests for a specific component, create a file in the respective package's specs folder:

```
{packageName}/cypress/specs/MyComponent.cy.tsx
```

We utilize component testing for UI5 web components, which involves mounting the component you intend to test. Our custom `mount` function leverages `preact` with `JSX` syntax for rendering components.

**Example Test File:**

```typescript
describe("MyComponent Rendering", () => {
  it("MyComponent exists", () => {
    cy.mount(<MyComponent></MyComponent>);

    cy.get("[my-component]").should("exist");
  });
});
```

---

### Interacting with Components

#### Changing Properties and Attributes

Use Cypress's `invoke` command to interact with component properties and attributes.

**Reading and Setting Properties:**

```typescript
// Read a property
cy.get("[ui5-button]")
  .should("have.prop", "myProp", "expectedValue");

// Set a property
cy.get("[ui5-button]")
  .invoke("prop", "myProp", "newValue");
```

**Reading and Setting Attributes:**

```typescript
// Read an attribute
cy.get("[ui5-button]")
  .should("have.attr", "my-attr", "expectedValue");

// Set an attribute
cy.get("[ui5-button]")
  .invoke("attr", "my-attr", "newValue");
```

#### Performing Actions

Cypress's default events are simulated, meaning events like `cy.click` or `cy.type` are fired from JavaScript and may not always behave like real native events (`event.isTrusted` will be `false`).

To simulate real user interactions, we use the [`cypress-real-events`](https://github.com/dmtrKovalenko/cypress-real-events) package, which dispatches actual browser events.

**Comparison of Commands:**

| Cypress Command   | cypress-real-events Command |
| ----------------- | --------------------------- |
| `cy.click`        | `cy.realClick`              |
| `cy.type('a')`    | `cy.realPress('a')`         |
| `cy.type('text')` | `cy.realType('text')`       |

Refer to the [cypress-real-events documentation](https://github.com/dmtrKovalenko/cypress-real-events) for more information and additional commands.

---

### Testing Events

With Cypress component testing, we can efficiently verify if events are fired using `cy.spy`.

**Example:**

```typescript
cy.mount(<Button></Button>`);

cy.get("[ui5-button]").then(($button) => {
  cy.spy($button[0], "click").as("clickEvent");
});

cy.get("[ui5-button]").realClick();

cy.get("@clickEvent").should("have.been.called");
```

For more details, refer to the [Cypress `cy.spy` documentation](https://docs.cypress.io/api/commands/spy).

---

### Configuration

To customize the configuration for a specific test, pass a configuration object as the second parameter to the `mount` function. This configuration applies to the entire test page.

**Example:**

```typescript
import { getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";

describe("Configuration Example", () => {
  const config = {
    theme: "sap_horizon_hcb",
  };

  before(() => {
    cy.mount(<MyComponent></MyComponent>, {
      ui5Configuration: config,
    });

    cy.wrap({ resetConfiguration })
      .invoke("resetConfiguration", true);

  });

  it("should apply the new theme", () => {
    cy.wrap({ getTheme })
      .invoke("getTheme")
      .should("be.equal", config.theme)
  });
});
```

**Notes:**
- The configuration persists across all subsequent tests until reset. If the configuration is intended for a specific test, ensure you call `resetConfiguration` after the test completes.
- You can directly import and use configuration functions from the respective packages.

**Example:**

```typescript
import { setTheme, getTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

describe("Direct Configuration", () => {
  it("should change the theme", () => {
    const newTheme = "sap_horizon_hcb";

    cy.wrap({ setTheme })
      .invoke("setTheme", newTheme)

    cy.wrap({ getTheme })
      .invoke("getTheme")
      .should("be.equal", newTheme)
  });
});
```

---

### Mobile Testing

To simulate mobile testing conditions, use the `ui5SimulateDevice` Cypress command. This command overrides the `isPhone` function from `Device.ts` to mimic mobile behavior without changing the user agent or opening a new browser.

**Example:**

```typescript
cy.mount(<Button></Button>);

cy.ui5SimulateDevice("phone"); // Simulates a phone device

cy.get("[ui5-button]").should("have.class", "ui5-button-mobile");
```

---

### Custom Commands

To create custom Cypress commands:

1. Create a new file in the `cypress/support/commands` directory specific to your component.
2. Define your custom commands within this file.
3. Import these commands into the main `commands.ts` file located in `cypress/support`.
4. Describe the TypeScript types for your commands within the Cypress namespace to ensure proper typing and IntelliSense support.

**Example (`cypress/support/commands/myComponentCommands.ts`):**

```typescript
Cypress.Commands.add("clickMyComponent", (selector) => {
  cy.get(selector).click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      clickMyComponent(selector: string): Chainable<Element>;
    }
  }
}
```

**Importing in `commands.ts`:**

```typescript
import "./myComponentCommands";
```

**Usage in Tests:**

```typescript
describe("My Component Tests", () => {
  it("should click my component", () => {
    cy.mount(<MyComponent></MyComponent>);

    cy.clickMyComponent("my-component");
  });
});
```

### Changing the language

Locale-aware components often need to set the user's language for certain tests.

Here is how you can do it:

```typescript
import Calendar from "../../src/Calendar.js";
import "../../src/Assets.js"; // Do not forget to import the Assets.js module for the extra languages
import { setLanguage, getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";

describe("Test group", () => {
	it("Test", () => {
		// setLanguage("bg"); // Wrong, the promise will not be awaited!

		cy.wrap({ setLanguage })
			.invoke("setLanguage", "bg"); // Correct, the promise will be awaited!

		cy.wrap({ getLanguage })
			.invoke("getLanguage")
			.should("equal", "bg");

		cy.mount(<Calendar />); // This calendar will be in Bulgarian
	});
});
```

Notes:
 - You must import the Assets module for the extra languages to work
 - You must call `setLanguage` with `cy.wrap` to make sure it will be awaited until the desired language is completely set (CLDR assets are fetched)

### Code coverage

Cypress tests automatically run with instrumentation switched on. To see the code coverage report, run the following commands:
```sh
# build the project
yarn build
# run the tests for a pacakge
cd packages/main
yarn test:cypress
# start a static server in the `coverage` folder and inspect the results in the browser
http-server coverage
```
