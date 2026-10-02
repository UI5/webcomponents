# Theming and CSS

## The variable tiers

| Tier | Prefix | Defined in | Use it for |
|------|--------|------------|-----------|
| Global design tokens | `--sap*` | Outside this repo | Colors, fonts, shadows, focus |
| Component parameters | `--_ui5_<component>_*` | The component's `-parameters.css` | Values that differ per theme or density |
| Cross-boundary values | `--ui5_*` / `--ui5-*`, no leading underscore | Component CSS, a shared partial, or a template | Values the build or another module reads |

A common point of confusion: this repo does not define the `--sap*` token set. Each theme's `parameters-bundle.css` under `packages/theming` only `@import`s it from `@sap-theming/theming-base-content` — install that npm package to browse which tokens exist. A few component files re-assign an individual `--sap*` value inside their own scope (`fiori`'s `HeroBanner.css`, `DynamicPageTitle-parameters.css`); that is a local override, not a token definition.

For a **new** component, start with `Foo.css` and existing `--sap*` tokens — they already resolve across themes.

Component-private `--_ui5_<component>_*` parameters live in a `-parameters.css` file. They exist throughout the codebase, but add one only when a value differs per theme in a way existing UI5 CSS parameters cannot express.

Cross-boundary `--ui5_*` / `--ui5-*` variables (no leading underscore) are rare, and reserved for a value read across a boundary the declaring CSS cannot see: `--ui5_content_density` is read by the build's postcss plugin (below), and `--ui5-form-column-span-s` is written as an inline style by `FormTemplate.tsx` and read back in `FormLayout.css`.

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

Never hard-code a color or a font. A handful of legacy files still do — do not copy them.

## How CSS reaches the component

`yarn generate` compiles each `.css` file to a `.css.js` module; the component imports that module and passes it to `styles:`.

`themeAware` on `@customElement` is opt-in and defaults to `false`. Setting it to `true` does exactly one thing: the component is re-rendered when the theme changes. The stylesheets are swapped for every component either way, so set it only when the component's *rendered output* depends on the theme — a template branch or a getter reading theme state — not merely because its CSS uses theme tokens.

```ts
import buttonCss from "./generated/themes/Button.css.js";

// Several stylesheets compose into one styles array:
	styles: [inputStyles, ResponsivePopoverCommonCss, ValueStateMessageCss, SuggestionsCss],
```

Shared partials come in through `@import` at the top of the component CSS instead — a component's `.css` file can pull in `./FormComponents.css`, `./InvisibleTextStyles.css`, and similar partials.

## Where each file goes

Most components need only `Foo.css`:

```
src/themes/Foo.css    structure and layout — use --sap* and existing shared --_ui5_* parameters
```

Add `-parameters.css` only when structural values differ per theme and cannot be covered by existing UI5 CSS parameters:

```
src/themes/base/Foo-parameters.css         default --_ui5_foo_* values
src/themes/sap_horizon/Foo-parameters.css  overrides
src/themes/sap_fiori_3/Foo-parameters.css  overrides
```

A per-theme file usually `@import`s the base one and overrides only what changes. A few extend another *theme's* file instead of `base/` and override only the difference — `sap_horizon_hcw/rtl-parameters.css` imports `../sap_horizon/rtl-parameters.css`. That is the exception, not the pattern.

Ten themes are supported: `sap_horizon` (+ `_dark`, `_hcb`, `_hcw`, `_auto`, `_hc_auto`) and `sap_fiori_3` (+ `_dark`, `_hcb`, `_hcw`). `packages/tools/assets-meta.js` is the authoritative list. `packages/fiori/src/themes` also holds `sap_belize*` and `*_exp` folders that are absent from that list and unreachable from any `parameters-bundle.css` — ignore them.

A new `--_ui5_*` parameter needs a value in `base/` only, not in every theme folder. Per-theme folders `@import` base, so the base value reaches all ten — `--_ui5_button_border_radius` is declared solely in `base/Button-parameters.css` and resolves everywhere. A theme folder gets a file only when it actually overrides something: `Bar-parameters.css` exists in `base/` and in the four high-contrast folders, nowhere else. Central compact overrides live in `base/sizes-parameters.css` onward.

Declaring the file is not enough — it must also be `@import`ed from the theme's `parameters-bundle.css`, or it has no effect. That file is the registration unit: `sap_horizon/parameters-bundle.css` aggregates every `-parameters.css` plus `sizes-parameters.css` and `rtl-parameters.css`. Add the `@import` in every theme folder that should load it.

## Selectors

Never use tag names — write `[ui5-button].accept`, not `ui5-button.accept`. When an application configures scoping, the framework registers the element under a suffixed tag name (`ui5-button-suffix`), so an element selector stops matching; it always also sets a bare `ui5-button` attribute on the host, which is why the attribute form keeps working. `yarn lint:scope` enforces it.

Persistent state comes from reflected attributes, not classes. Transient classes for animation or measurement-driven layout are legitimate (`Popup`'s `ui5-popup-opening`, `Bar`'s `ui5-bar-root-shrinked`) — the rule is that *durable* state must be a reflected attribute, not that `classList` is never touched.

This is the other half of the selector rule: properties reflect to an attribute by default, and `noAttribute: true` stops the attribute from ever being created or observed, so `[attribute]` can never match it. Give an internal property `noAttribute: true` only when no CSS reads that state.

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

Nothing in the repo checks this: `yarn lint` is ESLint over TypeScript, `yarn lint:scope` only looks for bare tag names, and there is no stylelint configuration. Review is the only guard. The forms most often missed are `left:` / `right:` positioning and physical corner radii such as `border-top-right-radius`, since they read less obviously "directional" than `margin-left`.

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

Scope compact values with a container style query — the pattern used across the theme CSS. Two near-identical variable names carry completely different jobs:

- `--ui5_content_density` (no leading `_`) — a **build-time** directive. Only the postcss plugin reads it, and only inside `-parameters.css` files. It is never set at runtime.
- `--_ui5_content_density` (leading `_`) — the **runtime** signal, set by `SystemCSSVars.css`.

This is why placement matters. A `@container style(--ui5_content_density: compact)` block works only inside a `-parameters.css` file, where `cssVariablesTarget: "host"` runs the postcss plugin that strips the `@container` and merges both densities into one `:host` declaration — `--_ui5_bar_base_height: var(--_ui5-compact-size, 2.5rem) var(--_ui5-cozy-size, 2.75rem)`. The same block in component CSS (`themes/Foo.css`) is shipped unprocessed and can never fire, because nothing ever sets `--ui5_content_density` in the browser.

```css
@container style(--ui5_content_density: compact) {
	:host {
		--_ui5_button_base_height: var(--sapElement_Compact_Height);
		--_ui5_button_base_min_width: 2rem;
	}
}
```

Every `-parameters.css` declaration is merged into a single shared `CSSStyleSheet` that is adopted into *every* component's shadow root. A `:host` rule there therefore applies inside all of them, and a `::slotted()` rule would match slotted children in all of them. That is why a density block styling *slotted children* belongs in the component CSS and never in `<Component>-parameters.css` — and the same reasoning covers any variable whose producer and consumer are different components.

```css
@container style(--ui5_content_density: compact) {
	::slotted([ui5-button]) {
		--_ui5_button_overlay_badge_offset: initial;
	}
}
```

## Focus, animation, high contrast

Three cross-cutting rules apply to sizing, motion, and contrast regardless of component:

| Concern | Rule |
|---------|------|
| Sizes | `rem` for element sizing; `px` is acceptable for hairline borders and small positioning offsets |
| Animation | Gate on `getAnimationMode()`; see `performance.md` |
| High contrast | `_hcb` and `_hcw` resolve most colors to pure black and white |

Focus styling is a pseudo-element border, not a native outline: the focusable root sets `outline: none` and the ring is drawn on `:after`. Where a native outline suffices, drive it from the tokens directly.

```css
	border: var(--_ui5_button_focused_border);  /* resolves to var(--sapContent_FocusColor) */

	outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);
	outline-offset: calc(-1 * var(--sapContent_FocusWidth));
```
