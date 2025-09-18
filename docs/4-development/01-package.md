---
sidebar_label: Create Web Components Project
---

# Create UI5 Web Components Project (Package)

This tutorial explains how to create web components project, ready to be published as NPM package, on top of the  UI5 Web Components framework (`@ui5/webcomponents-base`) and tools (`@ui5/webcomponents-tools`) to make use of development server, theming, JSX template support, i18n, test setup, etc.

## Initialize New Project

### 1. Run the init command

The following command will **create a new directory** and initialize your project, prepared as an NPM package.

 - With **npm**:

	`npm init @ui5/webcomponents-package`
   
	or
   
    `npm init @ui5/webcomponents-package <NEW-PACKAGE-NAME>`


 - With **yarn**:

	`yarn create @ui5/webcomponents-package`

    or

    `yarn create @ui5/webcomponents-package <NEW-PACKAGE-NAME>`

**Note:** The `<NEW-PACKAGE-NAME>` is the name of the directory/project to be created, but also the NPM package name, used in the `package.json`.

For example:

```sh
npm init @ui5/webcomponents-package myComponents
```

will create a `myComponents` directory and initialize the project inside.

### 2. Follow the prompts

The initialization script will ask you to choose:
 - The **name** of your NPM package (if you did not already pass a name when running the command above);
 - The **port** for your dev server (`8080` by default - just press Enter to select this);
 - The **componentName** of the sample web component that will be created (`MyComponent` by default - just press Enter to select this).

**That's it! Your package is ready!**

### 3. Run the project

 - `cd <NEW-PACKAGE-NAME>`
 - `npm i` (or `yarn`)
 - `npm start` (or `yarn start`)


In addition to the development server that is started with `npm start`,
there are `test` the `build` commands:


- `npm run build` ( or `yarn build`)
- `npm run test` ( or `yarn test`)

**Note:** In order to run the tests for the first time, you must have built the project with either `start` or `build`.


## The Project Structure

### `package.json`

The initialization script will add several packages as dependencies.
These three `@ui5/` packages will serve as the foundation of your own package and Web Components.

| Package                         | Type of Dependency | Description                          |
|---------------------------------|--------------------|--------------------------------------|
| `@ui5/webcomponents-base`       | `dependency`       | Base classes and framework           |
| `@ui5/webcomponents-theming`    | `dependency`       | Base theming assets                  |
| `@ui5/webcomponents-tools`      | `devDependency`    | Build tools and configuration assets |

The initialization script will create several NPM scripts for you in `package.json`.

| Task               | Purpose                                                                      |
|--------------------|------------------------------------------------------------------------------|
| clean              | Delete the `dist/` directory with the build output.                          |
| build              | Production build to the `dist/` directory.                                   |
| lint               | Run a static code scan with `eslint`.                                        |
| start              | Build the project for development, run the dev server and watch for changes. |
| watch              | Watch for changes only.                                                      |
| serve              | Run the dev server only.                                                     |
| test               | Run the dev server and execute the specs from the `test/specs/` directory.   |
| create-ui5-element | Create an empty Web Component with the given name.                           |


**Note**: The `create-ui5-element` command supports two optional environment variables that customize the output when used in a specific component package:

* **UI5_TAG_NAME_PREFIX** - sets the tag name prefix for the generated Web Component. The resulting tag will follow the format: `{UI5_TAG_NAME_PREFIX}-component-name`. Defaults to `my` if not specified.

* **UI5_TEMPLATE_FILENAME_SUFFIX** - sets the suffix for the generated template filename. The resulting filename will follow the format: `ComponentName{UI5_TEMPLATE_FILENAME_SUFFIX}.tsx`. Defaults to `Template` if not specified.

### Files in the main directory

The initialization script will create several files in your package's main directory.

| File               | Purpose                                                                         |
|--------------------|---------------------------------------------------------------------------------|
| .eslintignore      | Excludes the `dist/` and `test/` directories from static code scans.            |
| package-scripts.js | An [nps](https://www.npmjs.com/package/nps) package scripts configuration file. |
| bundle.js          | Entry point for the bundle used for development and tests.                      |

You'll likely only need to change `bundle.js` to import your new components there.

### The `config/` directory

The `config/` directory serves as a central place for most build and test tools configuration assets. Normally, you
don't need to change any files there.

#### Custom configuration

The files in the `config/` directory simply import UI5 Web Components default configuration for all tasks: `rollup`, `eslint`, etc.

If you need to customize any configuration, simply put your own content into the respective file in `config/`.

Examples:
 - Modifying `eslint` settings.

    Open `config/.eslintrc.js`. It should look like this:
	 ```js
	module.exports = require("@ui5/webcomponents-tools/components-package/eslint.js");
	```
	As you can see, this is just a proxy to UI5 Web Components default configuration.
	Put your own content instead:
	```js
	module.exports = {
    	"env": {
    		"browser": true,
    		"es6": true
    	},
    	"root": true,
    	"extends": "airbnb-base",
   		.............
  	}
	```

### The `src/` directory

This is where you'll do most of the development. Let's see the necessary files for your first web component.

#### Class and template files

The main files describing a Web Component are:

| File                       | Purpose        |
|----------------------------|----------------|
| `src/MyComponent.js`  | Web Component class |
| `src/MyComponentTemplate.tsx` | JSX template |

In order to understand how a UI5 Web Component works and what lies behind these two files, read the next articles
to understand more about [Developing web components](./02-component.md).

For the purposes of this tutorial, however, you don't need to understand their internals, as they are automatically generated by the script and are in a working state already.

#### Theming-related files

The theming setup is based on having a single web component CSS file, containing all CSS rules, that will be used for all themes. Some CSS Variables are global, such as `--sapBrandColor`, `--sapBackgroundColor`, and `--sapTextColor`, and automatically included by the framework and available for usage (as explained in the previous section). Furthermore, they are required to implement the standard SAP themes.

In addition, you can define your own CSS Vars and provide different values for them for the different themes. Set these CSS Vars in the
`parameters-bundle.css` file for each theme. These files are the entry points for the styles build script.

| File                                                | Purpose                                                                                        |
|-----------------------------------------------------|------------------------------------------------------------------------------------------------|
| `src/themes/MyComponent.css`                        | All CSS rules for the Web Component, same for all themes; will be inserted in the shadow root. |
| `src/themes/sap_horizon/parameters-bundle.css`      | Values for the component-specific CSS Vars for the `sap_horizon` theme                         |
| `src/themes/sap_horizon_dark/parameters-bundle.css` | Values for the component-specific CSS Vars for the `sap_horizon_dark` theme                    |
| `src/themes/sap_horizon_hcb/parameters-bundle.css`  | Values for the component-specific CSS Vars for the `sap_horizon_hcb` theme                     |
| `src/themes/sap_horizon_hcw/parameters-bundle.css`  | Values for the component-specific CSS Vars for the `sap_horizon_hcw` theme                     |
| `src/themes/sap_fiori_3/parameters-bundle.css`      | Values for the component-specific CSS Vars for the `sap_fiori_3` theme                         |

**Note:** To learn more about theming and how to write your web component styles, take a look at the [Styles](07-styling.md) section of the documentation.

#### i18n files

You can define translatable texts as key-value pairs, separated by `=` in the `messagebundle.properties` file. Then you can provide translations for as many languages
as needed.

| File                                   | Purpose                                |
|----------------------------------------|----------------------------------------|
| `src/i18n/messagebundle.properties`    | Source file for all translatable texts |
| `src/i18n/messagebundle_de.properties` | Translations in German                 |
| `src/i18n/messagebundle_en.properties` | Translations in English                |
| etc.                                   | etc.                                   |

Let's have a look at the sample `messagebundle.properties` file, generated by the script.

```
#please wait text for the sample component
PLEASE_WAIT=wait
```

Here's where you define all i18n texts, optionally with comments for the translators (`# Comment`).

And now let's have a look at a sample file with translations, for example `messagebundle_es.properties`:

```
PLEASE_WAIT=Espere
```

#### Assets (additional themes, i18n texts, etc.)

| File            | Purpose                              |
|-----------------|--------------------------------------|
| `src/Assets.js` | Entry point for your package assets. |


This module imports all base assets (such as `CLDR` and the base theme parameters), but also your own
package assets (i18n and package-specific theme parameters). Users of your package will have to import this module in their production applications in order to get additional themes support and i18n support.

**Note:** For easier development and testing, `Assets.js` is also imported in the dev/test bundle `bundle.esm.js` by the initialization script.

### The `test/` directory

| File           | Purpose                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------|
| `test/pages/*` | Simple `.html` pages used for development and tests.                                                |

You can execute all specs by running `yarn test` or `npm run test`.

For more on testing, see our [Testing Web Components](./10-testing.md) section.

## Consumption of the Web Components

Once you've developed your package and published it to NPM, application developers can import from the `dist/` directory
of your package any of your Web Components, and optionally the `Assets.js` module, if they want additional themes and i18n.

For example, if your package is called `my-ui5-webcomponents`, users will install it by:

```
npm i my-ui5-webcomponents --save
```

and then use it by:

```js
import "my-ui5-webcomponents/Assets.js"; // optional
import "my-ui5-webcomponents/dist/MyComponent.js"; // for my-component
import "my-ui5-webcomponents/dist/SomeOtherComponent.js";
import "my-ui5-webcomponents/dist/YetAnotherComponent.js";
```
