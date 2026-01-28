---
title: UI Theme Designer
---

# Creating Custom Theme with UI Theme Designer

UI5 Web Components are fully compatible with the `UI Theme Designer`, a tool for building a custom theme. You can create your own theme and effortlessly integrate it in your UI5 Web Components project on HTML level. On top, this does not prevent you from switching to and from officially supported themes, while having your own.

<b>Note:</b> `UI Theme Designer` is not an open-source tool and requires SAP BTP account and configuration in the SAP BTP Cockpit. In case you don't have access to the UI Theme Designer - follow the [Manually Building Custom Theme](13-theming-part2.md) article.

Follow this simple tutorial to build a custom theme running with UI5 Web Components in 5 minutes:

1. Open **UI Theme Designer**.

   Go to the [official docs](https://help.sap.com/viewer/09f6818d8e064537973102d6289e2aca/Cloud/en-US/935325fb130d41449362181fb6020dd0.html) and set up the Theme Designer.

2. Create your **custom theme** in `UI Theme Designer`.

    - Click the **Create a New Theme** button.

    - Choose which SAP stock theme will serve as the base of your custom theme and click the **Create Theme** button in the footer of the dialog.

    - Proceed to change as many parameters as you wish.

    - Once you are done customizing, choose **Theme** -> **Export** from the main menu on top. A dialog will appear,
      asking for **Theme ID** (technical name of your new theme) and a title.

      The Theme ID you choose at this point will be the one you'll use in order to switch to your custom theme, for example if you choose `mytheme`:

      `index.html?sap-ui-theme=mytheme`

      **Important:** Before clicking the **Export** button, thus dismissing the dialog and finishing theme creation,
      it is *mandatory* that you expand the **Optional Settings (for Experts)** panel, and select the **Source Files + CSS Resources** option.
      Otherwise, no CSS Variables will be generated.

3. Download the custom theme `.zip` file:

   Your browser will then download a `.zip` file with the name of your new theme, e.g. `mytheme.zip`.

4. Copy the `css_variables.css` file with all CSS Variables for your custom theme to your project.

   You can find this file inside the `.zip` in the `\Base\baseLib\<your theme name>\` directory.

   For example: `mytheme.zip\Base\baseLib\mytheme\css_variables.css`.

   Just copy this file to a directory in your project where it can be statically served.

5. Include the file in your project `.html` page:

   The simplest option would be to use a `<link>` tag and point to where you copied the file:

   ```html
   <link rel="stylesheet" type="text/css" href="<path-to-your-css-file>/css_variables.css">
   ```

   but you could as well use a `<style>` tag and paste the content of `css_variables.css` inside,
   if that's what you prefer:

   ```html
   <style>
          /* Here goes the content of css_variables.css */
   </style>
   ```

And that's it! Now you can use your custom theme by setting it either in the URL of your page,
or in your configuration script:

`index.html?sap-ui-theme=mytheme`

or

```html
<script data-ui5-config type="application/json">
{
	"theme": "mytheme"
}
</script>
```

**Note:** Using a custom theme does not prevent you from using the official themes. You can freely switch to and from them.

```js
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_fiori_3");
...
setTheme("mytheme");
...
setTheme("sap_fiori_3_dark");
```

For more on configuring themes, see [Configuration](01-configuration.md).

## Load custom theme, built with `UI Theme Designer`, via URL
The feature is specific to custom themes, created with the `UI Theme Designer` and allows fetching a theme from external location, e.g theme root.

### Using URL parameter
To load a custom theme via URL, you can specify theme's location with the `theme` URL parameter:

```
index.html?sap-ui-theme=mytheme@https://my-example-host.com/
```

In this example, "mytheme" theme will be applied and its resources (CSS variables specific to the theme) will be loaded from https://my-example-host.com/UI5/Base/baseLib/mytheme/css_variables.css.

**Note:** Certain security restrictions will apply before loading the custom theme. Absolute URLs to a different origin than the current page will return the current page as an origin. To allow certain origins, you have to use `<meta name="sap-allowed-theme-origins" content="https://my-example-host.com/">` tag inside the head of the page.

### Using JS API

To load a custom theme via URL, you can also use the available `setThemeRoot` method. The specified theme root will be applied to the currently set theme.

**Note:** Certain security restrictions will apply before loading the custom theme. Absolute URLs to a different origin than the current page will return the current page as an origin. To allow certain origins, you have to use `<meta name="sap-allowed-theme-origins" content="https://my-example-host.com/">` tag inside the head of the page.

```js
import { setThemeRoot } from "@ui5/webcomponents-base/dist/config/ThemeRoot.js";
setThemeRoot("https://my-example-host.com/");
```
