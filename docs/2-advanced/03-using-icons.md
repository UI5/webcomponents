# Using Icons

*This section explains how to load and use icons in your UI5 Web Components projects.*

One of the most commonly used UI5 Web Components is `ui5-icon`. Many other components also have an icon property that expects an icon name as its value.


## Icon Collections

The UI5 Web Components project provides three official icon collections, available as NPM packages:

Project | NPM Package | Description | Icons list
-----------|-----------|------------|-------------
`icons` | [UI5 Web Components - Icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) | A rich icon collection (`SAP-icons`), suitable for enterprise-grade apps |[Explore](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons)
`icons-tnt` | [UI5 Web Components - Icons TNT](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt) | A rich icon collection (`SAP-icons-TNT`), suitable for more technical apps | [Explore](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT)
`icons-business-suite` | [UI5 Web Components - Icons Business Suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) | A rich icon collection (`BusinessSuiteInAppSymbols`), suitable for SAP Fiori apps | [Explore](https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols)

## Usage

1. Add one or more of the above packages as dependencies to your project.

```
npm i @ui5/webcomponents-icons
npm i @ui5/webcomponents-icons-tnt
npm i @ui5/webcomponents-icons-business-suite
```

2. Import icons into your project.

**Important:** Only import the icons your app actually uses. This keeps your bundle size small. Importing all icons is recommended only if you cannot predict which icons will be needed.

- Import **all icons** from a package:

```js
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";
```

- Import **individual** icons:

```js
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/bookmark.js";
import "@ui5/webcomponents-icons/dist/cart.js";

import "@ui5/webcomponents-icons-tnt/dist/actor.js";

import "@ui5/webcomponents-icons-business-suite/dist/add-point.js";
```

3. Use the imported icons.

All collections except `@ui5/webcomponents-icons` require a prefix before the icon name, separated by `/`. 

Package | Prefix | Example
----------|---------|-------------
`@ui5/webcomponents-icons` | N/A | `alert`
`@ui5/webcomponents-icons-tnt` | `tnt` | `tnt/actor`
`@ui5/webcomponents-icons-business-suite` | `business-suite` | `business-suite/coins`

For example:
```html
<ui5-icon name="alert"></ui5-icon>
<ui5-button icon="tnt/actor"></ui5-button>
<ui5-avatar icon="business-suite/coins"></ui5-avatar>
```

## Custom Icon Collections

UI5 Web Components display standard icons using SVGs. You can also register your own SVG icon collections using the `registerIconLoader` method.

The loader must return an object with the following fields:
- `collection`: unique icon collection name
- `data`: object that describes the icons (names and SVG paths)

```js
import { registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

registerIconLoader("my-custom-icons", () => {
    return {
        collection: "my-custom-icons",
        data: {
            "myIconName": {
                paths: [
                   "M16.5 76c0-41 32-75 72-75h335c40 0 72 34 72 75v329c0 41-32 75-72 75h-335c-40 0-72-34-72-75V76zm263 356h144c13 0 24-12 24-27V76c0-15-11-27-24-27h-144v383zM88.5 49c-13 0-24 12-24 27v329c0 15 11 27 24 27h143V49h-143z"
                ],
            },
        },
    };
});
```

## Custom SVG Icons

UI5 Web Components allow developers to register custom icons using the `registerIcon` and `unsafeRegisterIcon` methods. These methods enable you to add your own SVG icons and making them available for use in your application.

### registerIcon (recommended)

The `registerIcon` is the preferred method, as it includes built-in safety checks to prevent security vulnerabilities.
You can register icons either with a `JSX template`, or with `pathData`.

- #### with `JSX` template

**Note:** JSX templates work only if your project is scaffolded with `npm init @ui5/webcomponents-package`.
Otherwise, use `unsafeRegisterIcon`.

```tsx
// MyCustomSVGIconTemplate.tsx
export default function MyCustomSVGIconTemplate() {
    return (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2221_23716)"><path d="M11.3333 1.99998C11.503 1.79933 11.7131 1.63601 11.9499 1.52043C12.1868 1.40485 12.4453 1.33953 12.709 1.32865C12.9727 1.31777 13.2358 1.36156 13.4815 1.45723C13.7272 1.55291 13.9502 1.69836 14.1361 1.88432C14.3221 2.07029 14.467 2.29268 14.5616 2.53734C14.6562 2.78199 14.6985 3.04353 14.6857 3.3053C14.6728 3.56706 14.6052 3.8233 14.4872 4.05769C14.3691 4.29207 14.2032 4.49947 13.9999 4.66664L4.99992 13.6666L1.33325 14.6666L2.33325 11L11.3333 1.99998Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 3.33331L12.6667 5.99998" stroke-linecap="round" stroke-linejoin="round"/></g>
            <defs>
                <clipPath id="clip0_2221_23716"><rect width="16" height="16"/></clipPath>
            </defs>
        </svg>
    )
};
```

```js
import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

registerIcon("myIconName", {
    collection: "my-custom-icons",
    customTemplate: MyCustomSVGIconTemplate,
});
```

- #### with `pathData`

Alternatively, you can use `registerIcon` and provide not the entire SVG, but its `pathData`.

```js
import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

registerIcon("myIconName", {
    collection: "my-custom-icons",
    pathData: "M16.5 76c0-41 32-75 72-75h335c40 0 72 34 72 75v329c0 41-32 75-72 75h-335c-40 0-72-34-72-75V76zm263 356h144c13 0 24-12 24-27V76c0-15-11-27-24-27h-144v383zM88.5 49c-13 0-24 12-24 27v329c0 15 11 27 24 27h143V49h-143z",
});
```

**Parameters:**

- `name`: unique identifier for the icon
- `iconData` (object): icon configuration containing:
- - `collection`: unique icon collection name
- - `pathData`: the icon's SVG path data
- - `customTemplate`: the icon's SVG
- - `viewBox`: the SVG viewBox

**Note:** Use either `customTemplate` or `pathData`. If both are set, `customTemplate` takes precedence

### unsafeRegisterIcon

The `unsafeRegisterIcon` allows you to register raw SVG strings `without sanitization`. Use this only if you trust the SVG source and have validated it yourself.

```js
import { unsafeRegisterIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

unsafeRegisterIcon("myIconName", {
	collection: "my-custom-icons",
	customTemplateAsString: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_2221_23716)"><path d="M11.3333 1.99998C11.503 1.79933 11.7131 1.63601 11.9499 1.52043C12.1868 1.40485 12.4453 1.33953 12.709 1.32865C12.9727 1.31777 13.2358 1.36156 13.4815 1.45723C13.7272 1.55291 13.9502 1.69836 14.1361 1.88432C14.3221 2.07029 14.467 2.29268 14.5616 2.53734C14.6562 2.78199 14.6985 3.04353 14.6857 3.3053C14.6728 3.56706 14.6052 3.8233 14.4872 4.05769C14.3691 4.29207 14.2032 4.49947 13.9999 4.66664L4.99992 13.6666L1.33325 14.6666L2.33325 11L11.3333 1.99998Z" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 3.33331L12.6667 5.99998" stroke-linecap="round" stroke-linejoin="round"/></g>
		<defs>
			<clipPath id="clip0_2221_23716"><rect width="16" height="16"/></clipPath>
		</defs>
	</svg>`,
});
```

**Parameters:**
- `name`: unique identifier for the icon
- `iconData` (object): icon configuration containing:
- - `collection`: unique icon collection name
- - `customTemplateAsString`: the icon's SVG as a string

## Usage of Custom Icons

Once registered, the icon can be used just like any other UI5 Web Components icon:

```html
<ui5-icon name="my-custom-icons/myIconName"></ui5-icon>
<ui5-button icon="my-custom-icons/myIconName"></ui5-button>
<ui5-avatar icon="my-custom-icons/myIconName"></ui5-avatar>
```

**Tip:** For multi-colored icons, you can define multiple `<path>` or `<g>` elements in your SVG and assign a fill or color attribute to each:

```html
<g fill="none" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" fill="aqua"/>
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
</g>
```
