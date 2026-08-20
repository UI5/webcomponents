# Theming and CSS

## The variable tiers

| Tier | Prefix | Defined in | Use it for |
|------|--------|------------|-----------|
| Global design tokens | `--sap*` | Outside this repo | Colours, fonts, shadows, focus |
| Component parameters | `--_ui5_<component>_*` | The component's `-parameters.css` | Values that differ per theme or density |
| Cross-boundary values | `--ui5_*` / `--ui5-*`, no leading underscore | Component CSS or a shared partial | Values another component or the build reads |

No `--sap*` token is defined in this monorepo — the theme's `parameters-bundle.css` only `@import`s the `--sap*` variables from `@sap-theming/theming-base-content`.

`--_ui5_*` component parameters are by far the most common variable in the theme CSS. `--ui5_*` / `--ui5-*` cross-boundary variables (no leading underscore) are rare and reserved for a value another component or the build reads across a boundary — for example `--ui5_content_density` (read by the build, below), `--ui5-form-column-span-s`, and `--ui5_value_state-background`.

```css
:host {
	height: var(--_ui5_button_base_height);
	font-family: var(--_ui5_button_fontFamily);
	font-size: var(--sapFontSize);
	background-color: var(--sapButton_Background);
	border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);
}

/* A token missing from some themes needs a chained fallback. */
--_ui5_table_row_alternating_background: var(--sapTableRow_AlternatingBackground, var(--sapList_AlternatingBackground));
margin: var(--_ui5_button_overlay_badge_offset, -0.5rem);
```

Never hard-code a colour or a font. A handful of legacy files still do — do not copy them.

## How CSS reaches the component

`yarn generate` compiles each `.css` file to a `.css.js` module; the component imports that module and passes it to `styles:`. `themeAware: true` on `@customElement` additionally re-renders on theme change.

```ts
import buttonCss from "./generated/themes/Button.css.js";

// Several stylesheets compose into one styles array:
	styles: [inputStyles, ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss],
```

Shared partials come in through `@import` at the top of the component CSS instead — a component's `.css` file can pull in `./FormComponents.css`, `./InvisibleTextStyles.css`, and similar partials.

## Where each file goes

```
src/themes/Foo.css                         structure and layout, theme-independent
src/themes/base/Foo-parameters.css         default --_ui5_foo_* values
src/themes/sap_horizon/Foo-parameters.css  overrides
src/themes/sap_fiori_3/Foo-parameters.css  overrides
```

A per-theme file usually `@import`s the base one and overrides only what changes, but chains exist: `sap_horizon_hcw/rtl-parameters.css` imports `../sap_horizon/rtl-parameters.css`.

Themes: `sap_horizon` (+ `_dark`, `_hcb`, `_hcw`, `_auto`, `_hc_auto`) and `sap_fiori_3` (+ `_dark`, `_hcb`, `_hcw`). A new `--_ui5_*` parameter needs a value in `base/`; central compact overrides live in `base/sizes-parameters.css` onward.

`parameters-bundle.css` is the registration unit — `sap_horizon/parameters-bundle.css` aggregates every `-parameters.css` plus `sizes-parameters.css` and `rtl-parameters.css`. A parameters file that is not imported there does nothing. Add it in every theme folder.

## Selectors

Never use tag names — write `[ui5-button].accept`, not `ui5-button.accept`, or the selector breaks under tag scoping. `yarn lint:scope` enforces it.

Persistent state comes from reflected attributes, not classes. Transient classes for animation or measurement-driven layout are legitimate (`Popup`'s `ui5-popup-opening`, `Bar`'s `ui5-bar-root-shrinked`) — the rule is that *durable* state must be a reflected attribute, not that `classList` is never touched. An internal property gets `noAttribute: true` only when CSS does *not* read it.

```css
:host([design="Transparent"]) {
	background-color: var(--sapButton_Lite_Background);
	color: var(--sapButton_Lite_TextColor);
}

/* Reach into a child component's part the way an application would. */
.ui5-breadcrumbs-link-wrapper [ui5-link]::part(root) {
	padding-top: 0.25rem;
}
```

Anything marked `part="..."` is public API: document it with `@csspart` and treat renaming it as a breaking change.

```ts
 * @csspart button - Used to style the native button element
 * @csspart icon - Used to style the icon in the native button element
 * @csspart endIcon - Used to style the end icon in the native button element
```

## Right-to-left

| Instead of | Write |
|------------|-------|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
| `text-align: left` | `text-align: start` |
| `width` (in a flow context) | `inline-size` |

Physical directional properties and `left:`/`right:` positioning still exist throughout the older theme CSS. Do not migrate old ones opportunistically; do not add new ones.

The `post-edit-lint.sh` hook catches only a subset — `padding-left/right`, `margin-left/right`, `border-left/right`, `float: left|right`, `text-align: left|right`, minus lines containing `[dir=`. It misses `left:` / `right:` positioning and physical corner radii such as `border-top-right-radius`.

Mirrored icons, transforms and gradient directions flip by swapping *parameters*, not by writing `:dir(rtl)` rules per component:

```css
:dir(rtl) {
	--_ui5_icon_transform_scale: scale(-1, 1);
	--_ui5_panel_toggle_btn_rotation: var(--_ui5_rotation_minus_90deg);
}
```

CSS alone is not enough — keyboard and positioning logic must read `effectiveDir`:

```ts
const isForward = this.effectiveDir === "rtl" ? isLeft(e) : isRight(e);

return this.effectiveDir === "rtl" ? "right" : "left";
```

## Density

Two densities: cozy (default) and compact. An ancestor carrying `data-ui5-compact-size`, `.ui5-content-density-compact` or `.sapUiSizeCompact` switches compact on by setting `--_ui5_content_density`.

Scope compact values with a container style query — the pattern used across the theme CSS. Note the two distinct variables: `--ui5_content_density` (no leading `_`) is a **build-time** directive the postcss plugin reads; `--_ui5_content_density` (leading `_`) is the **runtime** signal set by `SystemCSSVars.css`. This matters: the `@container style(--ui5_content_density: compact)` block only works inside a `-parameters.css` file, where `cssVariablesTarget: "host"` runs the postcss plugin that strips the `@container` and merges both densities into one `:host` declaration — `--_ui5_bar_base_height: var(--_ui5-compact-size, 2.5rem) var(--_ui5-cozy-size, 2.75rem)`. The same block placed in component CSS (`themes/Foo.css`) is left unprocessed and never fires at runtime, because `--ui5_content_density` is never set on `:root`.

```css
@container style(--ui5_content_density: compact) {
	:host {
		--_ui5_button_base_height: var(--sapElement_Compact_Height);
		--_ui5_button_base_min_width: 2rem;
	}
}
```

A density block that styles *slotted children* belongs in the component CSS, never in `<Component>-parameters.css`: a `-parameters.css` declaration is merged into a single shared `CSSStyleSheet` adopted into every component's shadow root, where `:host` applies to all of them and `::slotted()` would target slots across all of them. Same rule for any variable whose producer and consumer are different components.

```css
@container style(--ui5_content_density: compact) {
	::slotted([ui5-button]) {
		--_ui5_button_overlay_badge_offset: initial;
	}
}
```

## Focus, animation, high contrast

| Concern | Rule |
|---------|------|
| Sizes | `rem` for element sizing; `px` is acceptable for hairline borders and small positioning offsets |
| Animation | Gate on `getAnimationMode()`; see `performance.md` |
| High contrast | `_hcb` and `_hcw` resolve most colours to pure black and white |

Focus styling is a pseudo-element border, not a native outline: the focusable root sets `outline: none` and the ring is drawn on `:after`. Where a native outline suffices, drive it from the tokens directly.

```css
	border: var(--_ui5_button_focused_border);  /* resolves to var(--sapContent_FocusColor) */

	outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);
	outline-offset: calc(-1 * var(--sapContent_FocusWidth));
```
