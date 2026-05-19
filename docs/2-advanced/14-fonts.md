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
