---
title: i18n for Apps
---

# UI5 Web Components i18n for Apps

*This section explains how to use the UI5 Web Components `i18n` functionality for the purpose of your app's translatable texts.
None of the code below implies or requires the usage of UI5 Web Components, and can be used completely stand-alone.*

The `@ui5/webcomponents-base` package allows the usage of `i18n` functionality not just for UI5 Web Components,
but for apps as well.

*Note:* This section is dedicated to apps. For information on how to set up `i18n` for your custom components, please see [Developing Web Components](../07-development/01-package.md).

## Step-by-Step Tutorial

This tutorial will show you how to use the UI5 Web Components `i18n` functionality for the purpose of your apps.

### 1. Start by creating some `i18n` resources in `.properties` format in a directory that can be served, for example:

|                 File                 |          Content           |
| ------------------------------------ | -------------------------- |
| `assets/messagebundle_de.properties` | `PLEASE_WAIT=Bitte warten` |
| `assets/messagebundle_fr.properties` | `PLEASE_WAIT=Patientez.`   |
| `assets/messagebundle_es.properties` | `PLEASE_WAIT=Espere`       |
| `assets/messagebundle_en.properties` | `PLEASE_WAIT=Please wait`  |

(This example demonstrates just one translatable text per file for simplicity. You can have any number of texts per file, each on a new line.)

### 2. Import the following `i18n`-related modules to your app:

```js
import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
import { registerI18nLoader, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
```

The first one provides support for `.properties` files, as used in the example, and the second one - the functions
that will allow you to take advantage of the `i18n` functionality.

### 3. Register a loader function that can retrieve and process the actual content of your message bundles:

```js
const supportedLocales = ["en", "fr", "de", "es"];
supportedLocales.forEach(localeToRegister => {
	registerI18nLoader("myApp", localeToRegister, async (localeId) => {
		const props = await (await fetch(`./assets/messagebundle_${localeId}.properties`)).text();
		return parseProperties(props);
	});
});
```

The first argument to `registerI18nLoader` is an ID that will be used to reference this message bundle, the second is the locale this loader can load, and the third is a function that can load and process the content for the specified package/locale combination.

*Note:* For more assets, a loop is used to register a loader for each package/locale combination. The same loader function can be registered and its parameter can be used to distinguish which locale resource is requested.

*Note:* This step takes care of registering assets only, no data will be fetched at this point.

### 4. Get and use the bundle:

```js
const bundle = await getI18nBundle("myApp");
const pleaseWait = bundle.getText("PLEASE_WAIT");
console.log("Please wait in the current language is: ", pleaseWait);
```

You can pass multiple additional values to `getText` for texts with placeholders.

If your text looks like this

`CAROUSEL_DOT_TEXT=Item {0} of {1} displayed`

you can call `getText`

`bundle.getText("CAROUSEL_DOT_TEXT", 5, 20);`

which will finally result in

`Item 5 of 20 displayed`.

### 5. Test your page using different languages, e.g. set `?sap-ui-language=de` in the URL or change the configuration.

## Summary

The whole code would look like this:

```js
import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
import { registerI18nLoader, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

const supportedLocales = ["en", "fr", "de", "es"];
supportedLocales.forEach(localeToRegister => {
	registerI18nLoader("myApp", localeToRegister, async (localeId) => {
		const props = await (await fetch(`./assets/messagebundle_${localeId}.properties`)).text();
		return parseProperties(props);
	});
});

const bundle = await getI18nBundle("myApp");

const pleaseWait = bundle.getText("PLEASE_WAIT");
console.log("Please wait in the current language is: ", pleaseWait);
```

You register your assets for all supported languages, then you fetch the data for the currently active language,
get a reference to the bundle and call the `getText` method to get texts for your app.

## Tips and Tricks

 - You can skip the `.properties` format support import

 ```js
return await (await fetch(`./assets/messagebundle_${localeId}.json`)).json();
 ```
and return the data directly in `.json` format if you want to load a little bit less code in the runtime.

|              File              |              Content              |
| ------------------------------ | --------------------------------- |
| `assets/messagebundle_de.json` | `{"PLEASE_WAIT": "Bitte warten"}` |
| `assets/messagebundle_fr.json` | `{"PLEASE_WAIT": "Patientez."}`   |
| `assets/messagebundle_es.json` | `{"PLEASE_WAIT": "Espere"}`       |
| `assets/messagebundle_en.json` | `{"PLEASE_WAIT": "Please wait"}`  |

