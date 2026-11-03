# Quick Reference

> Rules only — no extended context or full worked examples. Load [`WRITING-SPECS.md`](./WRITING-SPECS.md) when you need the reasoning behind a rule or a complete example.

---

## Running tests

Run from the package folder, scoped to the component — the full suite is slow:

```bash
cd packages/main
yarn test:cypress:single cypress/specs/<Component>.cy.tsx
```

One statement per line, tab-indented chains. Add `.only` to isolate a failing `it()` while iterating; remove it before committing.

---

## Selectors

Always use attribute selectors for UI5 components — never tag names.

```typescript
// Wrong
cy.get("ui5-button")

// Right
cy.get<Button>("[ui5-button]")
```

This applies inside `.shadow().find(...)` too:
```typescript
// Wrong
cy.get("[ui5-button]").shadow().find("ui5-icon")

// Right
cy.get<Button>("[ui5-button]").shadow().find("[ui5-icon]")
```

---

## Async API calls

Base API functions (`setLanguage`, `setTheme`, `setAnimationMode`, …) return Promises. Cypress does not await bare calls, and `.then(api => api.fn())` does not await either. Always use `async`/`await` inside `.then()`.

```typescript
// Wrong
setLanguage("de");

// Wrong — no await
cy.wrap({ setLanguage }).then(({ setLanguage }) => {
    setLanguage("de");
});

// Right
cy.wrap({ setLanguage }).then(async ({ setLanguage }) => {
    await setLanguage("de");
});
```

---

## Opening a popup

Set the `open` property via `invoke`, then wait with the component's built-in command.

```typescript
// Wrong — attribute, not property
cy.get("[ui5-popover]").invoke("attr", "open", true);

// Right
cy.get<Popover>("[ui5-popover]")
    .invoke("prop", "open", true);

cy.get<Popover>("[ui5-popover]")
    .ui5PopoverOpened();
```

Replace `Popover` / `ui5PopoverOpened` with the actual component type and its command — see `COMMANDS.md` § Existing Command Families for the full list.

---

## Keyboard input — realPress / realType

`cy.realPress` and `cy.realType` are global commands that dispatch to whatever currently has focus. A piped subject is silently ignored. Always focus the target first, then call them as separate statements.

```typescript
// Wrong — chained; focus change hasn't settled
cy.get("@input")
    .realClick()
    .realType("hello");

// Right — two statements
cy.get("@input")
    .realClick();
cy.realType("hello");
```

---

## ARIA in shadow DOM

UI5 components render accessible markup inside shadow roots. Traverse `.shadow().find(...)` to reach the native element, and always read the value from the i18n bundle — never hardcode an English string.

```typescript
// Wrong — host rarely carries ARIA attrs
cy.get("[ui5-input]")
    .should("have.attr", "aria-label", "Search");

// Wrong — hardcoded string breaks under locale changes
cy.get("[ui5-input]").shadow().find("input")
    .should("have.attr", "aria-label", "Search");

// Right — value from i18n bundle
import MyComponent from "../../src/MyComponent.js";
import { MY_COMPONENT_ARIA_KEY } from "../../src/generated/i18n/i18n-defaults.js";

cy.get<MyComponent>("[ui5-my-component]").shadow().find("input")
    .should("have.attr", "aria-label", MyComponent.i18nBundle.getText(MY_COMPONENT_ARIA_KEY));
```

---

## prop vs attr

Use `have.prop` for JavaScript state that is not reflected to a DOM attribute; use `have.attr` for reflected properties and ARIA attributes.

```typescript
// State not reflected to DOM
cy.get("[ui5-checkbox]")
    .should("have.prop", "checked", true);

// Reflected attribute or ARIA
cy.get("[ui5-button]")
    .should("have.attr", "disabled");
cy.get("[ui5-button]").shadow().find("button")
    .should("have.attr", "aria-label", "Close");
```

---

## Global state cleanup (afterEach)

Any test that changes global configuration must reset it in `afterEach`. Without this, a failing test corrupts state for every subsequent test.

```typescript
// Language
afterEach(() => {
    cy.wrap({ setLanguage }).then(async ({ setLanguage }) => {
        await setLanguage("en");
    });
});

// Theme
afterEach(() => {
    cy.wrap({ setTheme }).then(async ({ setTheme }) => {
        await setTheme("sap_horizon");
    });
});
```
