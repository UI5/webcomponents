# Styles

The article guides you through defining and structuring your styles for creating themeable web components with the UI5 Web Components framework and tools.

## CSS Variables

[CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (also known as Custom properties) are entities that represent specific values to be reused throughout a document.

They are particularly beneficial for implementing theming in web design due to their reusability nature.
Unsurprisingly, UI5 Web Components theming relies entirely on CSS Variables.

## Themes

A theme is a collection of CSS Variables, each representing a specific design property such as color, font size, or spacing. Switching between themes simply involves updating the values of these variables. The underlying CSS rules or styles remain the same, but they reference different variable values depending on the active theme, allowing for a seamless transition between different visual styles.

UI5 Web Components comes with several built-in themes:
- **Quartz themes:** Quartz Light, Quartz Dark, Quartz High Contrast Black and  Quartz High Contrast White
- **Horizon themes:** Horizon Morning, Horizon Evening,  Horizon High Contrast Black and  Horizon High Contrast White

To implement these themes, the UI5 Web Components uses and depends on the `SAP CSS variables`, available in the [@sap-theming/theming-base-content](https://www.npmjs.com/package/@sap-theming/theming-base-content) package.

**Note:** The [theming-base-content](https://github.com/SAP/theming-base-content/) project is developed by SAP and provides color, font, and metric definitions of SAP themes to be used by application UIs and UI frameworks.

The package provides collections of CSS variables per theme - one for `Morning Horizon`, one for `Quartz Light` and so on.
Let's exlore a small part of these collections. You will notice that both collections include the same set of variables, but with different values:

```css
/* Horizon */
root {
	--sapBrandColor: #0070f2;
	--sapHighlightColor: #0064d9;
	--sapBaseColor: #fff;
	--sapShellColor: #fff;
	--sapBackgroundColor: #f5f6f7;
	--sapTextColor: #1d2d3e;
```

```css
/* Quartz */
:root {
	--sapBrandColor: #0a6ed1;
	--sapTextColor: #32363a;
	--sapHighlightColor: #0854a0;
	--sapBaseColor: #fff;
	--sapShellColor: #354a5f;
	--sapBackgroundColor: #f7f7f7
```


So, to make the UI5 Web Components themeable, internally, in the styles of all our web components we use these CSS Variables:

```css
/* ui5-text web component */
:host {
	font-size: var(--sapFontSize);
	font-family: var(--sapFontFamily);
	color: var(--sapTextColor);
}
```

Instead of having multiple CSS files per theme, we create a single web components CSS file used in all themes and apply one or the other CSS variables collection for the respective theme.

**Note:** It's highly likely that when developing web components for SAP applications, it's often necessary to implement and support the same SAP themes. **Here comes the UI5 Web Components framework and tools providing out-of-the-box theming setup**.


## Themeable Web Components

Now that we've explained the essential ingredients for theming, let's explore the practical steps involved.

If you already went through the [Create Web Components Project](./01-package.md) article at the beginning of the `Development` section and kickstarted a project, you probably noticed many theming-related files in the `src/themes` folder. 

These CSS files are part of the theming setup that's in place after the project initialization is done via `npm init @ui5/create-webcomponents-package` (as explained [here](./01-package.md)).

The theming setup is based on having a single web component CSS file, containing all CSS rules, that will be used for all themes. Some CSS Variables are global, such as `--sapBrandColor`, `--sapBackgroundColor`, and `--sapTextColor`, and automatically included by the framework and available for usage (as explained in the previous section). Furthermore, they are required to implement the standard SAP themes.

In addition, you can define your own CSS Variables and provide different values for them for the different themes. Set these CSS Variables in the `parameters-bundle.css` file for each theme. These files are the entry points for the styles build. Once you define them, the framework will be responsible for applying the respective CSS Variables according to the configured theme.

| File                                                | Purpose                                                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/themes/MyComponent.css`                        | The web component CSS file with all CSS rules, used in all themes and inserted in the shadow root. |
| `src/themes/sap_horizon/parameters-bundle.css`      | Values for the component-specific CSS Variables for the `sap_horizon` theme                        |
| `src/themes/sap_horizon_dark/parameters-bundle.css` | Values for the component-specific CSS Variables for the `sap_horizon_dark` theme                   |
| `src/themes/sap_horizon_hcb/parameters-bundle.css`  | Values for the component-specific CSS Variables for the `sap_horizon_hcb` theme                    |
| `src/themes/sap_horizon_hcw/parameters-bundle.css`  | Values for the component-specific CSS Variables for the `sap_horizon_hcw` theme                    |
| `src/themes/sap_fiori_3/parameters-bundle.css`      | Values for the component-specific CSS Variables for the `sap_fiori_3` theme                        |

**Note:** It's up to you whether to put the CSS Variables directly in the `parameters-bundle.css` files for the different themes or to import them from separate `.css` files. 


Practically speaking, the theming setup appears as follows:

- The web component styles:
```css
/* src/themes/MyComponent.css */
:host {
	color: var(--sapTextColor); /* using global vars */
	border-color: var(--my-component-border-color); /* using component-specific vars */
}
```

- Component-specific variables (for example `sap_horizon`):
```css
/* src/themes/sap_horizon/parameters-bundle.css */
:host {
    --my-component-border-color: blue;
}
```

- Component-specific variables (for example `sap_horizon_dark`):
```css
/* src/themes/sap_horizon_dark/parameters-bundle.css */
:host {
    --my-component-border-color: lightblue;
}
```

The last piece is to connect the web component styles (the main file used in all themes) via the [@customElement](./02-component.md) decorator:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

// Styles
import myStyles from "./generated/themes/MyComponent.css.js";

@customElement({
	tag: "my-component",
	styles: myStyles,
})
class MyComponent extends UI5Element {
}
```



**That's it! The framework will connect the styles with the web component and automatically apply the appropriate CSS variables for the `sap_horizon` and `sap_horizon_dark` themes**. This allows developers to focus on writing CSS without worrying about building, fetching, or loading these styles.

## CSS Variables Target

The `cssVariablesTarget` configuration in `package-scripts.cjs` determines where your component-specific CSS variables (defined in `parameters-bundle.css`) are injected:

- **`cssVariablesTarget: "host"`** - CSS variables are added to each component's shadow root. This provides better encapsulation as variables are scoped to each component instance.

- **`cssVariablesTarget: "root"`** (or omitted) - CSS variables are added to the global `:root` selector. This makes variables available globally across the entire document.

```js
// package-scripts.cjs
module.exports = {
	build: {
		options: {
			cssVariablesTarget: "host" // or "root"
		}
	}
};
```

When using `cssVariablesTarget: "host"`, component-specific variables are injected into each shadow root, enabling customization via `--sap*` variables on a component or specific scope level. This allows for more granular theming control, where different instances of the same component can be styled differently based on their context.

```html
<!-- Example: customizing specific component instances -->
<my-component style="--sapBrandColor: red;"></my-component>
<my-component style="--sapBrandColor: blue;"></my-component>
```

When using `cssVariablesTarget: "root"`, all variables are placed globally, which may limit instance-level customization but can be simpler for certain use cases.


## RTL

RTL stands for "Right-to-Left" and refers to languages and scripts written and read from right to left, such as Arabic, Hebrew, and Persian. 

In RTL layouts, elements like text alignment, margins, paddings, and even the flow of elements on the page are reversed compared to LTR layouts and web components must adapt to appear correctly for users who are accustomed to reading from right to left.

### CSS Logical Properties

CSS provides the [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), such as `margin-inline-start`, `padding-inline-end`, and others that adapt to both `LTR` and `RTL` layouts automatically.

**For Example:**

If you use `padding-left` it may look good in `LTR`, but incorrect in `RTL` layouts, because what is `padding-left` in `LTR`, becomes `padding-left` in RTL, which is actually the right side of the element.

```css
:host {
	padding-left: 1rem; /* not RTL-friendly */
}
```

To avoid these issues, you must use the CSS logical properties whenever possible. If you use `padding-inline-start` it will look as expected in `LTR` and will be automatically mirrored by the browser in RTL layouts - what is `padding-left` in LTR will become `padding-right` in RTL.

```css
:host {
	padding-inline-start: 1rem; /* RTL-friendly */
}
```

Of course, this applies only to asymmetric paddings, margins, and borders.
If your styles are symmetric, the same from both sides, the result will be the same in both `LTR` and `RTL`.

```css
:host {
	padding-left: 1rem;
	padding-right: 1rem;
}
```

### Using `:dir()` Selector for Advanced RTL Cases

While CSS logical properties cover most RTL scenarios, there are cases where they don't provide a solution. For example, when using transforms, rotations, or other CSS properties that don't have logical equivalents, you'll need to use the `:dir()` pseudo-class selector.

The `:host(:dir(rtl))` and `:host(:dir(ltr))` selectors allow you to apply specific styles based on the text direction:

```css
:host {
	/* Default LTR styles */
	transform: rotate(45deg);
}

:host(:dir(rtl)) {
	/* RTL-specific styles */
	transform: rotate(-45deg);
}
```

**Conclusion**: To support the `RTL` text direction, use the CSS logical properties as they are automatically mirrored by the browser, based on the text direction (LTR or RTL). For cases where logical properties don't help, use the `:dir(rtl)` or `:dir(ltr)` selectors to apply direction-specific styles.


## Content Density

`Content Density` is a concept in SAP Design that primarily defines the spacing and sizing of web components to optimize usability and visual appeal based on the user's device and preferences.

There are two main content density modes:

- **Cozy:** This mode provides more spacing around, making them larger and more comfortable to interact with. It's suited for touch-based devices or scenarios where users need a clear distinction between different UI components.

- **Compact:** In this mode, UI elements are more tightly packed with less spacing between them. It's ideal for scenarios where maximizing the amount of visible content is crucial, such as desktop applications or complex dashboards.

By default, when writing web component styles and defining CSS variables, they are considered as `Cozy`.

If you defined the following variables:
```css
:host {
	--my-component-width: 2.75rem;
	--my-component-padding: 1rem;
}
```

And, your web component is used normally:

```html
<body>
	<my-component></my-component>
</body>
```

As expected, the `--my-component-width` variable will be `2.75rem` and the `--my-component-padding` variable  will be `1rem`.

To write `Compact` styles and define `Compact` CSS variables, use CSS container queries:

```css
@container style(--ui5_content_density: compact) {
	:host {
		--my-component-width: 1rem;
		--my-component-padding: 0.5rem;
	}
}
```

**Important:** To use container queries for content density, you must configure `cssVariablesTarget: "host"` in the `package-scripts.cjs` options for your package:

```js
// package-scripts.cjs
module.exports = {
	build: {
		options: {
			cssVariablesTarget: "host"
		}
	}
};
```

This approach provides better encapsulation and follows the CSS container queries specification.

Alternatively, you can define density variables using selectors `[data-ui5-compact-size], .ui5-content-density-compact {}` for compact and `:root` for cozy(this is the old approach). When using these selectors, the `cssVariablesTarget` configuration should either not be set or should be set to `"root"`:

```css
.ui5-content-density-compact,
[data-ui5-compact-size] {
	--my-component-width: 1rem;
	--my-component-padding: 0.5rem;
}

:root {
	--my-component-width: 2rem;
	--my-component-padding: 1rem;
}
```

```js
// package-scripts.cjs
module.exports = {
	build: {
		options: {
			cssVariablesTarget: "root" // or omit this configuration
		}
	}
};
```

**Note:** The `cssVariablesTarget` configuration is per package, allowing each package to choose the approach that best fits its needs.

To enable `Compact` content density mode, consumers or app developers can use the CSS class:

```html
<body class="ui5-content-density-compact">
	<my-component></my-component>
</body>
```

Then, `--my-component-width` will have `1rem` and `--my-component-padding` will be `0.5rem`, making the `my-component` appear smaller, e.g compact.

**Conclusion**: To support the `Compact` density mode, use container queries to define `Compact` CSS variables with `@container style(--ui5_content_density: compact)` and configure `cssVariablesTarget: "host"` in your package-scripts. Alternatively, use traditional selectors like `[data-ui5-compact-size]`, `.ui5-content-density-compact`, or `:root` with `cssVariablesTarget: "root"` or no configuration.

## Theming Assets

Once your web component implementation is ready and published on NPM, there's one more detail to consider: the `src/Assets.ts` file generated during project initialization.
This file is an entry point for your `package's assets`, including theming and translations.
These assets are not included in the components by default but need to be imported separately.
This approach helps minimize the package size since users may require multiple themes, while others may not.

To use the web component, one will:

- install the NPM package:
```sh
npm install {PACKAGE-NAME}
```

- import the web component:

```ts
import "{PACKAGE-NAME}/dist/MyComponent.js`
```

- use it in his/her application:

```html
<body>
	<my-component></my-component>
</body>
```

At this point, the web component can be used in the default theme only (Morning Horizon at the time of writing). Even though we coded everything perfectly, following the previous recommendations, the web component won't be displayed as expected in other themes, because the theming assets are not included by default.


To use the web component with another theme:

```ts
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_horizon_dark");
```

the consumers or the application developers must import the package `Assets` explicitly:

```ts
import "{PACKAGE-NAME}/dist/Assets.js`
```
