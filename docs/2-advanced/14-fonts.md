# Fonts

This article explains how fonts are handled in UI5 Web Components and the options available for customization.

## Default Font Loading

During boot, the UI5 Web Components framework automatically loads the necessary fonts to achieve the SAP Fiori design. The fonts are fetched from a CDN (`cdn.jsdelivr.net`) via network requests.

This default behavior requires no configuration - fonts are loaded automatically when you use UI5 Web Components.

## Manual Font Loading (via `FontFace.css`)

*Since version 2.20*

The `@ui5/webcomponents-base` package ships a standalone `FontFace.css` file that you can use to load fonts via CSS instead of JavaScript. This is useful for:
- Avoiding cross-origin issues with CDN-based font loading
- Environments where you prefer CSS-based font loading

### Usage

The file is located at `@ui5/webcomponents-base/dist/FontFace.css` and contains `@font-face` declarations for all standard UI5 fonts.

Import it in your application entry point:

```ts
// In your main.ts or App.tsx
import "@ui5/webcomponents-base/dist/FontFace.css";
```

```css
/* In your main.css */
@import "@ui5/webcomponents-base/dist/FontFace.css";
```

**Note:** The CSS file references font files from the `@sap-theming/theming-base-content` npm package. Most modern bundlers (Vite, Webpack with css-loader, etc.) handle this out of the box. Older build tools may require additional CSS plugins or configuration to resolve npm package paths in `url()` declarations.

### Disabling Default Font Loading

When using `FontFace.css`, you should disable the default JavaScript-based font loading to avoid duplicate requests:

```ts
import { setDefaultFontLoading } from "@ui5/webcomponents-base/dist/config/Fonts.js";

setDefaultFontLoading(false);
```

## Custom Fonts

There are several reasons why you might need to customize fonts:
- To specify different paths for fonts (e.g., due to restrictions on public internet access)
- To include additional declarations within `@font-face` (e.g., `font-display`)
- To download additional fonts, such as `72-Light`
- To prevent the default fonts from being fetched

### Disabling Default Fonts

To prevent the framework from fetching default fonts, configure `setDefaultFontLoading` to `false`:

```ts
import { setDefaultFontLoading } from "@ui5/webcomponents-base/dist/config/Fonts.js";

setDefaultFontLoading(false);
```

When the UI5 Web Components framework initializes, it will refrain from fetching default fonts and instead use the ones you have provided.

### Providing Custom Font Definitions

After disabling default fonts, specify the custom fonts you intend to use. For example, to use the `72-Light` font with a custom `font-display` setting:

```html
<style type="text/css">
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
