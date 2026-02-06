# AGENTS.md - UI5 Web Components Development Guide

This file provides guidance for AI coding assistants when developing web components built on `@ui5/webcomponents-base`.

## Component Architecture

Components use decorator-based definitions with Preact JSX templates:

```typescript
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { customElement, property, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

@customElement({
  tag: "my-button",
  renderer: jsxRenderer,
  template: MyButtonTemplate,
  styles: myButtonCss,
  languageAware: true,  // Re-render on language change
  themeAware: true,     // Re-render on theme change
})
class MyButton extends UI5Element {
  @property() design: `${ButtonDesign}` = "Default";
  @property({ type: Boolean }) disabled = false;
  @slot({ type: HTMLElement, "default": true }) content!: Array<HTMLElement>;
}
```

**Recommended file structure for a component:**
- `src/ComponentName.ts` - Component class with decorators
- `src/ComponentNameTemplate.tsx` - JSX template
- `src/themes/ComponentName.css` - Styles (use CSS variables for theming)
- `src/i18n/messagebundle*.properties` - Translations (if language-aware)

## Critical Development Rules

### DOM Manipulation Anti-Pattern

Accessing DOM elements via `@query` or `querySelector` is allowed only for calling methods like `.focus()`:

```typescript
@query("[ui5-input]")
_input!: Input;

// GOOD - calling methods
this._input?.focus();

// BAD - modifying properties directly
this._input.value = "don't do this";
```

Always modify child component state through the template:

```tsx
// GOOD - use the template for state
<Input value={this.inputValue} />
```

### Always Use Template Literal Types for Enums

This pattern eliminates runtime overhead from enum objects:

**Imports:**
```typescript
// BAD - imports the enum object (runtime overhead)
import ButtonDesign from "./types/ButtonDesign.js";

// GOOD - import type only (no runtime overhead)
import type ButtonDesign from "./types/ButtonDesign.js";
```

**Property types:**
```typescript
// BAD - uses enum object at runtime
design: ButtonDesign = ButtonDesign.Default;

// GOOD - template literal type with string value
design: `${ButtonDesign}` = "Default";
```

**Value comparisons:**
```typescript
// BAD - runtime enum access
if (this.design !== ButtonDesign.Transparent) { }

// GOOD - string comparison (IDE autocomplete + TS type safety)
if (this.design !== "Transparent") { }
```

### Scoping-Safe Code (Required for Micro-Frontend Support)

UI5 Web Components support tag name scoping for micro-frontend scenarios where multiple versions may coexist. Always use attribute selectors:

**In TypeScript:**
```typescript
// BAD - hard-coded tag names break when scoped
this.shadowRoot.querySelector("ui5-popover")
element.tagName === "UI5-BUTTON"

// GOOD - attribute selectors work with any scoping
this.shadowRoot.querySelector("[ui5-popover]")
```

**In CSS:**
```css
/* BAD - tag selector breaks with scoping */
ui5-button.accept-btn { color: green; }

/* GOOD - attribute selector works with scoping */
[ui5-button].accept-btn { color: green; }
```

### No `instanceof` Checks

`instanceof` fails when multiple versions of the framework are loaded. Use duck-typing instead:

```typescript
// BAD - fails with multiple framework versions
if (element instanceof Button) { }

// BAD - tag name could be scoped (e.g., "UI5-BUTTON-F5331039")
if (element.tagName === "UI5-BUTTON") { }

// GOOD - use createInstanceChecker helper
import createInstanceChecker from "@ui5/webcomponents-base/dist/util/createInstanceChecker.js";

// In your component class:
class MyItem extends UI5Element {
  readonly isMyItem = true;  // Duck-typing marker
}
export const isInstanceOfMyItem = createInstanceChecker<MyItem>("isMyItem");

// Usage:
if (isInstanceOfMyItem(element)) {
  // element is typed as MyItem
}
```

### Property and Event Conventions

- **Never change public properties programmatically** - only in response to user interaction
- **Use `noAttribute: true`** for private/internal properties not used in CSS selectors
- **Fire events for all user interactions** - applications rely on events for state management
- **Import icons explicitly** - don't rely on bundled icon imports

```typescript
@property({ noAttribute: true })
_internalState = false;  // Won't create HTML attribute

// Fire events for user interactions
this.fireDecoratorEvent("change", { value: this.value });
```

## Testing with Cypress

Tests use Cypress component testing with JSX mounting:

```typescript
import MyButton from "../../src/MyButton.js";

describe("MyButton", () => {
  it("fires click event", () => {
    cy.mount(<MyButton>Click me</MyButton>);

    // Use attribute selector for scoping safety
    cy.get("[my-button]").then(($btn) => {
      $btn[0].addEventListener("click", cy.stub().as("clicked"));
    });

    // Use cypress-real-events for realistic interaction
    cy.get("[my-button]").realClick();
    cy.get("@clicked").should("have.been.called");
  });
});
```

**Key testing patterns:**
- Use `cypress-real-events`: `realClick()`, `realPress()`, `realType()` instead of Cypress simulated events
- Always use attribute selectors `[my-component]` not tag selectors `my-component`
- Use `.only` to run a single test case when debugging, remove before committing

## Summary of Rules

| Rule | Bad | Good |
|------|-----|------|
| Enum imports | `import Enum from "..."` | `import type Enum from "..."` |
| Enum types | `prop: Enum` | `prop: \`${Enum}\`` |
| Enum values | `Enum.Value` | `"Value"` |
| DOM queries | `querySelector("ui5-tag")` | `querySelector("[ui5-tag]")` |
| CSS selectors | `ui5-tag { }` | `[ui5-tag] { }` |
| Type checks | `instanceof Component` | `isInstanceOfComponent(el)` |
| Tag comparison | `el.tagName === "UI5-TAG"` | Use instance checker |
| DOM mutation | `this._ref.value = x` | `<Comp value={x} />` in template |
