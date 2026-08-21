---
name: accessibility
description: How to make UI5 Web Components applications accessible. Covers accessibility APIs (accessibleName, accessibleNameRef, accessibleDescription, accessibleRole, accessibilityAttributes), label-input relationships, invisible messaging, keyboard handling, high contrast themes, and screen reader support. Use when the user asks about ARIA attributes, screen readers, keyboard navigation, accessibility properties, or making their app accessible.
user-invocable: false
---

# Accessibility in UI5 Web Components

UI5 Web Components have built-in accessibility: ARIA roles, keyboard navigation, screen reader support, and high contrast themes are handled automatically in the shadow DOM. Applications should use the accessibility APIs described here to provide additional context that only the app can know (labels, descriptions, relationships).

## Built-in Accessibility (No App Code Needed)

Components automatically provide:
- **ARIA roles and attributes** mapped in the shadow DOM (e.g., `ui5-combobox` renders `role="combobox"` internally)
- **Keyboard navigation** within complex components (arrow keys in lists, tables, date pickers, etc.)
- **Focus management** with visible focus indicators
- **State mapping** — `disabled`, `readonly`, `required`, `checked` are automatically mapped to their ARIA equivalents (`aria-disabled`, `aria-readonly`, `aria-required`, `aria-checked`)

## Accessibility APIs

Use these properties to enrich the accessibility context for your application.

### accessibleName

Maps to `aria-label`. Provides a text alternative when the visual label is insufficient or absent.

```html
<ui5-button icon="sap-icon://edit" accessible-name="Edit document"></ui5-button>

<ui5-combobox accessible-name="Select country">
    <ui5-cb-item text="Germany"></ui5-cb-item>
</ui5-combobox>
```

Use `accessibleName` when there is no visible text label, for example icon-only buttons or inputs without a `<ui5-label>`.

### accessibleNameRef

Alternative to `aria-labelledby` that works across shadow DOM boundaries. Takes one or more IDs of elements whose text content serves as the label.

```html
<ui5-label id="lblName">Full name</ui5-label>
<ui5-input accessible-name-ref="lblName"></ui5-input>

<!-- Multiple refs -->
<span id="prefix">Shipping</span>
<ui5-label id="lblAddr">Address</ui5-label>
<ui5-input accessible-name-ref="prefix lblAddr"></ui5-input>
```

Prefer `accessibleNameRef` over `accessibleName` when a visible label exists — this keeps the label and the ARIA text in sync automatically.

### accessibleDescription / accessibleDescriptionRef

Maps to `aria-description`. Provides additional descriptive text beyond the label.

```html
<ui5-input accessible-name="Password"
           accessible-description="Must be at least 8 characters">
</ui5-input>

<!-- Or reference an existing element -->
<p id="hint">Must be at least 8 characters</p>
<ui5-input accessible-name="Password"
           accessible-description-ref="hint">
</ui5-input>
```

### accessibleRole

Overrides the default ARIA role of a component.

```html
<ui5-panel accessible-role="Complementary">...</ui5-panel>
<ui5-list accessible-role="Menu">...</ui5-list>
<ui5-button accessible-role="Link">Navigate</ui5-button>
```

Only change the role when the component is used in a non-standard way (e.g., a List used as a menu).

### accessibilityAttributes

An object that sets additional ARIA attributes on the component's root element. Use for `aria-expanded`, `aria-haspopup`, `aria-controls`, and similar relationship attributes.

```html
<ui5-button id="menuBtn">Open Menu</ui5-button>
<ui5-menu id="menu">...</ui5-menu>

<script>
document.getElementById("menuBtn").accessibilityAttributes = {
    expanded: false,
    hasPopup: "menu",
    controls: "menu"
};
</script>
```

For composite components like `ui5-shellbar`, the object contains nested objects for different internal elements — check the component's API docs.

## Label-Input Relationships

Due to shadow DOM, standard HTML `<label for="...">` does not work with custom elements. Use these patterns instead:

**Using Label's `for` property** (preferred for forms):

```html
<ui5-label for="nameInput" required show-colon>Name</ui5-label>
<ui5-input id="nameInput" required></ui5-input>
```

The `for` property connects the label to the input. Clicking the label focuses the input. Setting `required` on the label shows an asterisk; setting `required` on the input sets `aria-required`.

**Using `accessibleNameRef`:**

```html
<ui5-label id="dateLabel">Date of birth</ui5-label>
<ui5-date-picker accessible-name-ref="dateLabel"></ui5-date-picker>
```

## Headings and Semantic Levels

Use the `level` property on `ui5-title` and `header-level` on `ui5-panel` to set the correct heading level for the document outline.

```html
<ui5-title level="H1">Page Title</ui5-title>

<ui5-panel header-text="Settings" header-level="H2">
    <ui5-title level="H3">General</ui5-title>
</ui5-panel>
```

Screen readers use heading levels to build a page outline. Skipping levels (e.g., H1 to H4) is an accessibility violation.

## Icon Accessibility

The `ui5-icon` component has a `mode` property that controls its accessible behavior:

| Mode | Behavior | Use when |
|------|----------|----------|
| `Image` (default) | `role="img"` | Icon conveys meaning (needs `accessible-name`) |
| `Interactive` | `role="button"`, focusable | Icon is clickable |
| `Decorative` | `aria-hidden="true"` | Icon is purely visual, no meaning |

```html
<!-- Meaningful icon — needs accessible-name -->
<ui5-icon name="sap-icon://warning" mode="Image"
          accessible-name="Warning"></ui5-icon>

<!-- Clickable icon -->
<ui5-icon name="sap-icon://delete" mode="Interactive"
          accessible-name="Delete item"></ui5-icon>

<!-- Decorative icon — hidden from screen readers -->
<ui5-icon name="sap-icon://favorite" mode="Decorative"></ui5-icon>
```

Always set `accessible-name` on icons in `Image` or `Interactive` mode.

## Invisible Messaging

Use `InvisibleMessage` to announce dynamic content changes to screen readers (e.g., search results count, form validation, live updates).

```javascript
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";

// Polite: announced at the next pause (e.g., search results)
announce("5 results found", InvisibleMessageMode.Polite);

// Assertive: announced immediately (e.g., errors)
announce("Invalid email address", InvisibleMessageMode.Assertive);
```

- Use **Polite** for non-urgent updates (search results, status changes)
- Use **Assertive** for urgent notifications (errors, warnings)

## Tooltip

Use the `tooltip` property instead of the native `title` attribute.

```html
<ui5-button icon="sap-icon://edit" tooltip="Edit document"></ui5-button>
```

Do **not** set `title` directly on custom elements — this can cause repetitive speech output or incorrect accessibility tree mapping.

## High Contrast and Theming

UI5 Web Components ship with high contrast themes:

| Theme | Use case |
|-------|----------|
| `sap_horizon` | Default light theme |
| `sap_horizon_dark` | Dark theme |
| `sap_horizon_hcb` | High Contrast Black |
| `sap_horizon_hcw` | High Contrast White |

Detect OS preferences and apply the appropriate theme:

```javascript
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
const highContrast = window.matchMedia("(prefers-contrast: more)");

function applyTheme() {
    if (highContrast.matches) {
        setTheme(darkMode.matches ? "sap_horizon_hcb" : "sap_horizon_hcw");
    } else {
        setTheme(darkMode.matches ? "sap_horizon_dark" : "sap_horizon");
    }
}

darkMode.onchange = applyTheme;
highContrast.onchange = applyTheme;
applyTheme();
```

## Quick Reference

| Goal | Property / API |
|------|----------------|
| Label a component without visible text | `accessible-name="..."` |
| Link a visible label to a component | `accessible-name-ref="labelId"` or `<ui5-label for="inputId">` |
| Add a description | `accessible-description="..."` or `accessible-description-ref="id"` |
| Change ARIA role | `accessible-role="..."` |
| Set expanded/haspopup/controls | `accessibilityAttributes = { expanded, hasPopup, controls }` |
| Set heading level | `level="H2"` on Title, `header-level="H2"` on Panel |
| Make icon accessible | `mode="Image"` + `accessible-name="..."` |
| Hide decorative icon | `mode="Decorative"` |
| Announce dynamic changes | `announce(message, InvisibleMessageMode.Polite)` |
| Set tooltip | `tooltip="..."` (not `title`) |
| Respond to OS contrast settings | Use `prefers-contrast` media query + `setTheme()` |
