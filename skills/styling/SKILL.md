---
name: styling
description: How to customize and style UI5 Web Components. Covers CSS shadow parts, CSS custom states, CSS variables, and tag-level styling. Use when the user asks about changing component appearance, colors, spacing, theming, or overriding styles.
user-invocable: false
---

# Styling UI5 Web Components

UI5 Web Components use Shadow DOM for encapsulation. Styles are isolated — external CSS won't leak in, but customization requires specific techniques. There are four approaches, ordered from most recommended to least.

## 1. Styles on Tag Level

Some components (Title, Label, Tag, Button, Input, and others) are designed so that styles set directly on the custom element take effect.

```css
ui5-input {
  width: 150px;
  color: yellow;
  background: purple;
}
```

This works for simpler components. For complex components with deep DOM structures, tag-level styling has no effect on internal elements.

**Best practice:** Always use tag-level styling for sizing properties (margin, padding, width, height) to avoid design inconsistencies.

## 2. CSS Shadow Parts

For complex components, specific internal elements are exposed as [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

```css
ui5-card-header::part(status) {
  color: red;
}
```

**Important:** Available shadow parts are listed in each component's API reference under the "Overview" section. Only documented parts are stable — do not rely on undocumented internal structure.

## 3. CSS Custom States

Components can expose custom states via the [CSS custom state pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:state), allowing you to style based on internal component conditions.

```css
ui5-toolbar-item:state(overflowed) {
  flex-direction: column;
}
```

**Important:** Available custom states are listed in each component's API reference under the "Overview" section.

## 4. Overriding CSS Variables

UI5 Web Components use SAP CSS variables (`--sap*`) for theming. You can override these on a per-component or per-scope basis.

```css
ui5-button {
  --sapButton_TextColor: purple;
}
```

All global SAP CSS variables are defined in [@sap-theming/theming-base-content](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css). Overriding them changes the appearance of any component that uses them.

**Best practice:** For broad theme changes, prefer using the UI Theme Designer to ensure consistency. Use direct CSS variable overrides only for targeted, scoped customizations.

## What NOT to Do

- **Don't pierce shadow DOM** with deprecated `>>>` or `/deep/` selectors — they don't work.
- **Don't rely on internal DOM structure** — it can change between versions. Only use documented shadow parts.
- **Don't use `!important` on SAP variables** — scope your overrides instead.
- **Don't override raw colors** when a SAP CSS variable exists — use the variable to maintain theme consistency.

## Quick Decision Guide

| Goal | Technique |
|------|-----------|
| Change width, margin, padding | Tag-level styles |
| Restyle a specific internal element | `::part(name)` |
| Style based on component state | `:state(name)` |
| Change colors/fonts globally | Override `--sap*` CSS variables |
| Full theme customization | UI Theme Designer |
