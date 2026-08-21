---
title: Internationalization
---

# Internationalization (i18n)

In this article, we will discuss internationalization (i18n) in the context of UI5 Web Components.

Internationalization is crucial for creating applications that support multiple languages and regional settings. The UI5 Web Components library provides an easy way to internationalize your components using i18n files.

## i18n Files

i18n files define translatable texts as key-value pairs, separated by `=` in the `messagebundle.properties` file. Translations for multiple languages can be provided by creating additional properties files.

To define translatable texts, create a `src/i18n/messagebundle.properties` file with key-value pairs. For example:

```
# please wait text for the sample component
PLEASE_WAIT=wait
```

**Note:** Comments for translatable text can be added using the `#` symbol.

To create key-value pairs in a specific language different from the default one, create files following this pattern: `messagebundle_{locale}.properties`. For example:
- **Translations in German:** `src/i18n/messagebundle_de.properties`
- **Translations in English:** `src/i18n/messagebundle_en.properties`

Here is an example of providing translations:

```properties
# Spanish translation
PLEASE_WAIT=Espere
```

## I18n in Web Components

To integrate internationalization (i18n) into web components, you need to load the i18n bundle that contains all translatable texts for the current package.

To load the bundle, use the `getI18nBundle` method from the `i18nBundle.js` module in the `@ui5/webcomponents-base` package.

During the build process, UI5 Web Components packages automatically convert their `src/i18n/messagebundle.properties` files into named imports inside `src/generated/i18n/i18n-defaults.js`.

To fetch texts from the bundle, use the `getText` method provided by the imported bundle.

When displaying translatable text, fetch the text from the bundle according to the currently configured language. If you need to use this text in a template, create a getter method. Here is an example showing how to do this with a `counterText` getter:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { COUNT } from "./generated/i18n/i18n-defaults.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
  static i18nBundle: I18nBundle;

  static async onDefine() {
    MyDemoComponent.i18nBundle = await getI18nBundle("my-ui5-web-components");
  }

  get counterText() {
    return MyDemoComponent.i18nBundle.getText(COUNT);
  }
}
```

**Note:** The `onDefine` method of `UI5Element` ensures that i18n resources are fetched before the web component is defined.

**Note:** The namespace used for resource registration (`my-ui5-web-components`) corresponds to the `name` property in your `package.json` file.