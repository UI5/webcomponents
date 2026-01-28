---
title: Using Assets
---

# Using Additional Assets

*Most UI5 Web Components packages offer **additional assets**. This section explains what these are and how to use them.*

## What Are Additional Assets

These are **themes**, **text translations**, **locale data** etc. that are not shipped as part of the components/icons themselves, but can be loaded separately, if needed.

These assets are important for **accessibility** and **globalization**.

## Importing Additional Assets

Import the `dist/Assets.js` file of the respective NPM package:

- `import "@ui5/<PACKAGE-NAME>/dist/Assets.js`
- `import "@ui5/<PACKAGE-NAME>/dist/Assets-fetch.js`
- `import "@ui5/<PACKAGE-NAME>/dist/Assets-node.js`

** Note: read "Techcnocal aspects" below on how to choose which one to use**

| Project                | NPM Package                                                                                                      | Assets           | Module                                           | Notes                                                                                                                                                                                                            |
|------------------------|------------------------------------------------------------------------------------------------------------------|------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `main`                 | [@ui5/webcomponents](https://www.npmjs.com/package/@ui5/webcomponents)                                           | `i18n`, `themes` | `@ui5/webcomponents/dist/Assets.js`              | Theming parameters and translations for the components  <br/><br/> *Automatically imports also:<br/> `@ui5/webcomponents-localization/dist/Assets.js` <br/> and <br/> `@ui5/webcomponents-theming/dist/Assets.js`* |
| `fiori`                | [@ui5/webcomponents-fiori](https://www.npmjs.com/package/@ui5/webcomponents-fiori)                               | `i18n`, `themes` | `@ui5/webcomponents-fiori/dist/Assets.js`        | Theming parameters and translations for the components  <br/><br/> *Automatically imports also:<br/> `@ui5/webcomponents/dist/Assets.js`*                                                                           |
| `icons`                | [@ui5/webcomponents-icons](https://www.npmjs.com/package/@ui5/webcomponents-icons)                               | `i18n`           | `@ui5/webcomponents-icons/dist/Assets.js`        | Translations for the tooltips / "aria labels" of several icons                                                                                                                                                   |
| `icons-tnt`            | [@ui5/webcomponents-icons-tnt](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt)                       | N/A              | N/A                                              |                                                                                                                                                                                                                  |
| `icons-business-suite` | [@ui5/webcomponents-icons-business-suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) | N/A              | N/A                                              |                                                                                                                                                                                                                  |
| `localization` *       | [@ui5/webcomponents-localization](https://www.npmjs.com/package/@ui5/webcomponents-localization)                 | `CLDR`           | `@ui5/webcomponents-localization/dist/Assets.js` | Locale data, needed for date/time/currency-related components <br/><br/> *You don't need to import the assets of this package directly.*                                                                           |
| `theming` *         | [@ui5/webcomponents-theming](https://www.npmjs.com/package/@ui5/webcomponents-theming)                     | `themes`         | `@ui5/webcomponents-theming/dist/Assets.js`   | Additional themes' base parameters <br/><br/> *You don't need to import the assets of this package directly.*                                                                                                      |

`*` Only listed for completeness, included automatically by other packages.

For example:

```js
import "@ui5/webcomponents/dist/Assets.js";
```

and use:

```html
<ui5-date-picker></ui5-date-picker>
```

with another language and another theme:

```js
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

setLanguage("es");
setTheme("sap_fiori_3_hcb");
```

The `ui5-date-picker` component will have all translatable texts in Spanish, and the Spanish format settings (e.g. date format) will be used, and will be rendered with the `sap_fiori_3_hcb` accessibility theme instead of the default theme.

## Technical Aspects

Additional assets are `.json` files with the respective data.

There are two ways to reference them.

### Assets.js
When you import the `dist/Assets.js` file of a given package, assets are only **registered**, but not yet fetched. When they are needed, they are loaded on the fly with **dymamic imports**, and then used. This only works with bundlers which copy the JSON file as a JS file and rewrite the import URL to the correct location.

One drawback with this is that it doesn't work with CDN usage when the JSON files are hosted directly as JSON - the import expects a JS file and the browser gets a JSON content-type back with leads to an error.

Use this approach only with a bundler.

### Assets-fetch.js
When you import the `dist/Assets-fetch.js` file of a given package, assets are only **registered**, but not yet fetched. When they are needed, they are loaded on the fly with **fetch**, and then used.

The issue is how to get the correct URL for the fetch to work and this is solved by using `import.meta.url` to resolve a relative path from a module to a JSON file

The approach can be used with a bundler and for CDN usage.

### Assets-node.js

This module is an alternative to `Assets.js`, with added support for the `with: { type: 'json' }` import attribute, which is required in certain environments—such as Node.js with server-side rendering (SSR) — to properly load JSON files.

This approach allows you to dynamically import assets while explicitly specifying the file type.

**For example:**
```ts
await import("../assets/i18n/messagebundle_bg.json", { with: { type: 'json' } })
```