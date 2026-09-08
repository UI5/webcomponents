# UI5 Web Components & Tailwind CSS

Tailwind CSS works great with UI5 Web Components — you just need one configuration step to make sure Tailwind's CSS reset doesn't interfere with some web components.

## Why is this needed?

Tailwind's base layer (`@tailwind base`) includes a comprehensive CSS reset called **preflight**. It normalizes margins, fonts, headings, lists, and more across all elements. The most visible conflict with UI5 Web Components comes from rules like:

```css
*, ::before, ::after {
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
}
```

Some UI5 Web Components intentionally set styles directly on the **`:host` element** (the custom element tag itself, e.g. `<ui5-input>`) rather than on shadow-internal elements. This is a deliberate design choice: placing styles on the host makes components easier to customize from the outside. So preflight's resets may override the component's own `:host` styles, causing visual issues — most notably missing borders.


## Configure Tailwind's preflight.

Choose one of the two options below:

### Option A: Disable preflight entirely (recommended for UI5-based apps)

If your application primarily uses UI5 Web Components for its UI and doesn't rely on Tailwind's base reset for native HTML elements, you can disable preflight altogether. You still get all of Tailwind's utility classes — only the global CSS reset is removed.

#### Tailwind v3

```js
// tailwind.config.js
module.exports = {
  corePlugins: {
    preflight: false,
  },
}
```

#### Tailwind v4

Import Tailwind's parts individually and omit `preflight.css`:

```css
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
/* @import "tailwindcss/preflight.css" layer(base); — removed */
@import "tailwindcss/utilities.css" layer(utilities);
```

### Option B: Keep preflight with a targeted restore

If you need Tailwind's preflight for other parts of your application, add a targeted rule to undo preflight for affected UI5 component host elements.

`all: revert-layer` rolls back every property to the value it would have had without the current cascade layer (i.e. before preflight), in a single declaration.

#### Tailwind v3

```css
@tailwind base;

/* Undo preflight for UI5 Web Components that you use */
@layer base {
  [ui5-button],
  [ui5-input],
  [ui5-step-input],
  [ui5-segmented-button-item],
  [ui5-li],
  [ui5-li-groupheader],
  [ui5-panel],
  [ui5-table-header-row],
  [ui5-table-row],
  [ui5-menu-separator],
  [ui5-bar],
  [ui5-dynamic-page-title],
  [ui5-li-notification] {
    all: revert-layer;
  }
}

@tailwind components;
@tailwind utilities;
```

#### Tailwind v4

The `@layer base` block is identical — only the import syntax changes:

```css
@import "tailwindcss";

/* Undo preflight for UI5 Web Components that you use */
@layer base {
  [ui5-button],
  [ui5-input],
  [ui5-step-input],
  [ui5-segmented-button-item],
  [ui5-li],
  [ui5-li-groupheader],
  [ui5-panel],
  [ui5-table-header-row],
  [ui5-table-row],
  [ui5-menu-separator],
  [ui5-bar],
  [ui5-dynamic-page-title],
  [ui5-li-notification] {
    all: revert-layer;
  }
}
```

## Using Tailwind with UI5 Web Components

Tailwind utility classes work on UI5 component host elements for **page-level layout**:

```html
<ui5-button class="m-2">Spaced</ui5-button>

<div class="flex gap-4 items-center">
  <ui5-icon name="home"></ui5-icon>
  <ui5-label>Dashboard</ui5-label>
</div>

<ui5-card class="w-full max-w-md">
  <ui5-card-header slot="header" title-text="Info"></ui5-card-header>
  <div class="p-4">Card content</div>
</ui5-card>
```

Layout utilities like `flex`, `gap-*`, `p-*`, `m-*`, and `w-*` all work as expected on the host elements.

However, **Tailwind utilities cannot reach inside the Shadow DOM** of UI5 components. For component-internal styling, use UI5's own theming mechanisms:

- **CSS custom properties** — override `--sapButton_BorderColor`, `--sapField_BorderColor`, etc.
- **`::part()` selectors** — style exposed shadow parts when available

This is by design: Tailwind handles your page layout, UI5 theming handles component appearance.
