# Testing

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
