# Fonts

This article explains how fonts are handled in UI5 Web Components and the options available for customization.

## Default Font Loading

During boot, the UI5 Web Components framework automatically loads the necessary fonts to achieve the SAP Fiori design. The fonts are fetched from a CDN (`cdn.jsdelivr.net`) via network requests.

This default behavior requires no configuration - fonts are loaded automatically when you use UI5 Web Components.


## Custom (Manual) Font Loading

There are several reasons why you might need to customize fonts:
- To specify different paths for fonts (e.g., due to restrictions on public internet access)
- To include additional declarations within `@font-face` (e.g., `font-display`)
- To download additional fonts, such as `72-Light`
- To prevent the default fonts from being fetched


### 1. Disable Default Fonts

You can disable the default fonts by either creating a `style` tag with `data-ui5-font-face` attribute, or via the `defaultFontLoading` configuration option.

- via `<style data-ui5-font-face>`

The framework checks for the presense of this element with this specific attribute and skips the font loading when present.

```html
<style type="text/css" data-ui5-font-face>
    @font-face {
        font-family: "72";
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: local("72-Light"),
        url({path_to_your_font});
    }
</style>
```

- via `defaultFontLoading` in your HTML


```html
<script data-ui5-config type="application/json">
{
	"defaultFontLoading": false
}
</script>
```

- via `setDefaultFontLoading` JS API


```ts
import { setDefaultFontLoading } from "@ui5/webcomponents-base/dist/config/Fonts.js";

setDefaultFontLoading(false);
```

When the UI5 Web Components framework initializes, it will refrain from fetching default fonts and instead use the ones you have provided.


### 2. Provide Custom Font Definitions

After disabling the default fonts, specify the custom fonts you intend to use.

For example, to use the `72-Light` font with a custom `font-display` setting:

```html
<style type="text/css" data-ui5-font-face>
    @font-face {
        font-family: "72";
        font-style: normal;
        font-weight: 200;
        font-display: swap;
        src: local("72-Light"),
        url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff2?ui5-webcomponents) format("woff2");
    }
</style>
```

### 3. Host Fonts Locally

If your application cannot reach the public CDN, you can serve the SAP `72` font family from your own infrastructure. The framework ships a ready-made stylesheet at `@ui5/webcomponents-base/dist/FontFace.css` whose `@font-face` URLs point at the `@sap-theming/theming-base-content` npm package, so a modern bundler (Vite, webpack, Rollup, esbuild, …) can resolve them from `node_modules` and emit the font files alongside your build output — no CDN call at runtime.

**Note (experimental):** `@ui5/webcomponents-base/dist/FontFace.css` is provided as a convenience and its location, contents, and hosting package are subject to change — it may be relocated to a different package or restructured in a future release. If you depend on it, pin your `@ui5/webcomponents` version and re-verify the import path when upgrading.

After disabling default font loading (see step 1), import the stylesheet at your application entry point:

```ts
// In your main.ts / main.js
import "@ui5/webcomponents-base/dist/FontFace.css";
```

or from CSS:

```css
/* In your main.css */
@import "@ui5/webcomponents-base/dist/FontFace.css";
```

Your bundler resolves the `@sap-theming/theming-base-content/...` URLs inside the stylesheet, copies the `.woff2` files into the build output, and rewrites the references to your asset paths.

**Without a bundler.** If you don't have a build step, copy the font files manually. They live under `@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/` in the npm package — install the package or download them directly. The full set is:

| Family       | Files                                                                                                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 72           | `72-Regular.woff2`, `72-Bold.woff2`, `72-Semibold.woff2`, `72-Light.woff2`, `72-Black.woff2`, `72-Italic.woff2`, `72-BoldItalic.woff2`, `72-Condensed.woff2`, `72-CondensedBold.woff2`, `72-SemiboldDuplex.woff2` |
| 72 (full)    | The same files with the `-full` suffix (e.g. `72-Regular-full.woff2`) — extended Unicode coverage fallback                                                         |
| 72Mono       | `72Mono-Regular.woff2`, `72Mono-Bold.woff2` and their `-full` variants                                                                                             |

Copy the `fonts/` directory to a location served by your web server (e.g. `/static/fonts/`), then copy `FontFace.css` into your project and replace the `@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/` URL prefix with that location. Load the rewritten CSS using one of the methods from step 1.

**Keep the fonts in sync.** The font files rarely change. When you upgrade `@ui5/webcomponents` to a new minor version, check the version of `@sap-theming/theming-base-content` it depends on, and re-copy the `fonts/` directory if it has been updated.
