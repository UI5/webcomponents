# AGENTS.md - UI5 Web Components Development Guide

This file provides guidance for AI coding assistants when developing web components built on `@ui5/webcomponents-base`.

> **Working in the ui5-webcomponents monorepo?** See the [root AGENTS.md](../../AGENTS.md) for repository commands, build flow, and commit guidelines.

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

### Public vs Private Properties

If a component changes a property internally, that property should be **private** (prefixed with `_`):

| Property Type | Who Changes It | Needs Event? |
|---------------|----------------|--------------|
| Public (`propertyName`) | App only | N/A - component doesn't change it |
| Public, component needs to change | App, with event | Yes - fire event |
| Private (`_propertyName`) | Component only | No - component owns it |

```typescript
// BAD - Component changes public property without event
@property({ type: Boolean })
navigationOpen = false;

_onNavItemClick() {
    this.navigationOpen = false;  // App doesn't know this changed!
}

// GOOD - Private property, component manages it
@property({ type: Boolean, noAttribute: true })
_navigationOpen = false;

_onNavItemClick() {
    this._navigationOpen = false;  // Component owns this state
}

// GOOD - Public property with event notification
@property({ type: Boolean })
expanded = false;

_onToggleClick() {
    // Don't change directly - fire event for app to handle
    this.fireDecoratorEvent("toggle-click", { expanded: !this.expanded });
}
```

### Avoiding Hidden State

Components should be deterministic based on their public properties. Express all application modes as explicit values of a property, not via methods that create temporary state:

```typescript
// BAD - Hidden state via method
showOnlyCenter() {
    this._hideStart = true;  // Hidden state, not reflected in any property
    this._hideEnd = true;
}

// GOOD - Explicit state via property
@property()
mode: "normal" | "settings" = "normal";

// Config describes mode constraints
const MODE_CONFIGS = {
    settings: { allowStart: false, allowEnd: false },
    normal: { allowStart: true, allowEnd: true },
};
```

### Never Use Counter Properties to Force Re-renders

Never create "version counter" properties that exist solely to force re-renders:

```typescript
// BAD - Counter property to force re-render
@property({ type: Number, noAttribute: true })
_accountVersion = 0;

_onAccountChange = () => {
    this._accountVersion++;  // Hack to trigger re-render
};

// GOOD - Store actual state in properties
@property({ noAttribute: true })
_profileName = "";

_onAccountChange = () => {
    const account = this._getSelectedAccount();
    this._profileName = account?.getAttribute("title-text") ?? "";
};
```

### Boolean Property Defaults

Boolean properties **must default to `false`** because they reflect to HTML attributes. In HTML, a boolean attribute's presence means `true`, absence means `false`:

```typescript
// Boolean must default to false
@property({ type: Boolean })
expanded = false;

// If you need a boolean to default to true, set it in onBeforeRendering
@property({ type: Boolean, noAttribute: true })
_alwaysEnabled = false;

onBeforeRendering() {
    this._alwaysEnabled = true;
}
```

### Parent-Child Component Communication

**Parent to Child:** Pass state via private properties (set programmatically when state changes).

**Child to Parent:** Fire events with `bubbles: true`. Never query parent DOM from children.

```typescript
// BAD - Child querying parent
get _layout(): ParentComponent | null {
    let parent = this.parentElement;
    while (parent) {
        if (parent.tagName.includes("PARENT")) return parent;
        parent = parent.parentElement;
    }
    return null;
}

_onButtonClick() {
    this._layout?.someMethod();  // Direct parent manipulation
}

// GOOD - Child uses own properties and fires events
@property({ type: Boolean, noAttribute: true })
_parentState = false;  // Parent sets this

_onButtonClick() {
    this.fireDecoratorEvent("button-click");  // Let parent handle it
}
```

### Typed Slot Accessors

Use typed slot accessors instead of `querySelector` for slotted content:

```typescript
// BAD - Using querySelector
get _userMenu(): UserMenu | null {
    return this.shadowRoot?.querySelector("slot[name='userMenu']")
        ?.assignedElements()[0] as UserMenu;
}

// GOOD - Typed slot accessor
@slot({ type: HTMLElement })
userMenu!: Array<UserMenu>;

get _userMenu(): UserMenu | null {
    return this.userMenu?.[0] ?? null;
}
```

### Event Binding in Templates

For shadow DOM elements, bind events in the template, not with `addEventListener`:

```typescript
// BAD - Imperative event binding
onAfterRendering() {
    const logo = this.shadowRoot?.querySelector(".logo");
    logo?.addEventListener("click", this._onLogoClick.bind(this));
}

// GOOD - Declarative template binding
// In template:
<div class="logo" onClick={this._onLogoClick}>...</div>

// Use arrow functions to preserve 'this' context
_onLogoClick = () => {
    this.fireDecoratorEvent("logo-click");
};
```

**Exception:** `addEventListener` IS acceptable for:
- The host element (`this`) - listening for bubbling events from slotted children
- `document` - for global event tracking
- Slotted elements (light DOM) - they're outside the shadow root

### i18n Bundle Naming When Extending Components

When extending a UI5 component that has its own `@i18n` bundle, use a **different property name** to avoid shadowing:

```typescript
// BAD - Shadows parent's i18nBundle
class FxUserMenu extends UserMenu {
    @i18n("@my-package")
    static i18nBundle: I18nBundle;  // Shadows UserMenu.i18nBundle!
}

// GOOD - Use a unique property name
class FxUserMenu extends UserMenu {
    @i18n("@my-package")
    static fxI18nBundle: I18nBundle;  // Unique name, no shadowing

    get _myLabel(): string {
        return FxUserMenu.fxI18nBundle.getText(MY_TEXT);
    }
}
```

### Lifecycle Method Best Practices

| Method | Purpose | When to Use |
|--------|---------|-------------|
| `onBeforeRendering` | Set/compute state | Setting private properties, applying constraints |
| `onAfterRendering` | DOM operations | Measurements, focus, dialog open/close |

```typescript
onBeforeRendering() {
    // Set properties that need non-default values
    if (!this._initialized) {
        this._applySectionConstraints();
    }
}

onAfterRendering() {
    // DOM operations that require rendered elements
    if (!this._width) {
        this._width = this._mainArea?.offsetWidth ?? this.offsetWidth;
    }
}
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
