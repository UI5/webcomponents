#  ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/Logo_wide_25.png)

[![CI](https://github.com/UI5/webcomponents/actions/workflows/test.yaml/badge.svg)](https://github.com/UI5/webcomponents/actions/workflows/test.yaml)
[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)
[![REUSE status](https://api.reuse.software/badge/github.com/UI5/webcomponents)](https://api.reuse.software/info/github.com/UI5/webcomponents)

## What are [UI5 Web Components](https://ui5.github.io/webcomponents)?

 - A rich set of **enterprise-grade reusable UI elements** driven by a **lightweight framework** (~20K gzipped for the framework part).
 - Suitable for building anything from **static web sites** to **complex web applications**.
 - Usable with any current or future **web development framework** (React, Angular, Vue, etc.).
 - Implement the [SAP Fiori design](https://experience.sap.com/fiori-design/) and follow the [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/) for a consistent UX.
 - Created and maintained by [SAP](https://sap.com) as part of the [UI5](https://openui5.org/) product family.

## Why use web components?

 - **Future-proof**: being *web standards*, they are compatible with any version of any web development framework.
 - **Encapsulated**: the HTML/CSS in the *shadow DOM* are protected from interference by the web page and vice versa, making them stable in any environment and suitable not only for apps, but also for *libraries and micro-frontends*.
 - **Elegant**: being *custom HTML elements*, they hide implementation complexity behind a single HTML tag, making them easily usable with the standard DOM APIs.

## Where can I see them in action?
- [Playground and API Reference](https://ui5.github.io/webcomponents/components/)

## More Resources
- [UI5 Web Components Home Page](https://ui5.github.io/webcomponents)
- [Configuring UI5 Web Components](./docs/2-advanced/01-configuration.md)
- [Customizing with `UI Theme Designer`](./docs/2-advanced/12-theming.md)
- [Creating a Custom UI5 Web Components Package](docs/4-development/01-package.md)
- [Developing Custom UI5 Web Components](docs/4-development/02-component.md)
- [Micro-Frontends and Custom Elements Scoping](./docs/2-advanced/06-scoping.md)
- [Release Management](./docs/08-Releases.md)
- [F.A.Q.](./docs/09-FAQ.md)

## Related Projects

### OpenUI5

#### 1. What is UI5/OpenUI5?

[OpenUI5](https://openui5.org/) is an open source JS framework that lets you build enterprise-ready web applications, responsive to all devices, running on almost any browser of your choice. It's based on JavaScript, using jQuery as its foundation and follows web standards. It eases your development with a client-side HTML5 rendering library including a rich set of controls and supports data binding to different data models (JSON, XML and OData).

#### 2. How do UI5 Web Components relate to OpenUI5?

UI5 Web Components…
* …are **not built on top** of UI5, but rather lightweight and independent UI elements.
* …are **not a successor** of UI5, but rather a complementary offering.
* …bring the relevant **UI5 qualities and SAP Fiori UX to the HTML level**, usable with any web framework.

UI5 Web Components are good for…
* …web applications which **already use a different web framework**.
* …**static web sites** built without web frameworks, to just add a few interactive UI elements.

UI5 remains what it is: the best choice for…
* …building complete **enterprise-ready and responsive web applications**.

### UI5 Web Components for React

[UI5 Web Components for React](https://github.com/SAP/ui5-webcomponents-react) is a wrapper implementation around
UI5 Web Components which makes using them in React even more comfortable. The current version of React (`react 18`) has some
shortcomings when it comes to handling Custom Elements, namely the binding of `boolean` attributes as well as adding event listeners to custom event names like `selection-change`. With the help of UI5 Web Components for React, you can use the UI5 Web Components in React as if they were native React components. In addition to that, this library is also offering TypeScript definitions for all components, some complex layout components built on top of UI5 Web Components as well as Charting Components.

### UI5 Web Components for Angular

[UI5 Web Components for Angular](https://github.com/SAP/ui5-webcomponents-ngx) is a wrapper implementation around
UI5 Web Components which to make it work with Angular without needing to use the `CUSTOM_ELEMENTS_SCHEMA` or `NO_ERRORS_SCHEMA` schemas.
Moreover, all Angular-specific features, such as two-way data binding and Angular Form support, work out of the box.

## How to Use

1. Install the NPM module(s) that ship the desired UI5 Web Component(s), for example if you need `ui5-button`:

	```sh
	npm install @ui5/webcomponents
	```

2. Import the desired UI5 Web Component(s) to your app:

	```js
	import "@ui5/webcomponents/dist/Button.js"; // loads and defines ui5-button
	```

3. Use the UI5 Web Component(s) as you would use any HTML element:

	```html
	<ui5-button>Hello world!</ui5-button>
	```

	For more information, see [Importing UI5 Web Components](https://ui5.github.io/webcomponents/docs/getting-started/components-packages/) and [Understanding UI5 Web Components APIs](https://ui5.github.io/webcomponents/docs/getting-started/components-APIs/).

## Typescript Support
TypeScript Support is enabled for both component development and component consumption.
Since version `1.11.0`, we have been providing TypeScript definitions under an experimental flag, and starting from version `1.19.0`, all TypeScript definitions are considered `stable`. 

### Is there a CDN I can use?

No, you are expected to import only the components (or other public APIs) that you are going to use and bundle them along with the rest
of your application.

## Browser Support

UI5 Web Components are supported by all major modern browsers.

Browser | Supported versions
--------|--------
Chrome | Latest two stable releases
Firefox | Latest two stable releases
Safari | Latest two stable releases
Edge | Latest two stable releases

## Project Structure, Development and Build

This section might be of interest to you mainly if you need to run or build the project locally

### Requirements
- [Node.js](https://nodejs.org/) (**version 21 or higher**)
- [Yarn](https://yarnpkg.com/en) (**version 1.22 or higher for branches released before v2.15**)
- Yarn v4 is managed via [Corepack](https://github.com/nodejs/corepack), run `corepack enable` in case the `yarn` command is not found.

**Note:** The UI5 Web Components project is set up with the [Yarn](https://yarnpkg.com/) node package manager.
This is because it offers functionality that the otherwise preferred [npm](https://www.npmjs.com/) package manager is currently lacking. Namely, the [workspace](https://yarnpkg.com/lang/en/docs/workspaces/) setting which is currently used in the [UI5 Web Components (mono-)repository](https://github.com/UI5/webcomponents).

### Structure

The UI5 Web Components project contains several packages:

| Project                     | NPM Package                                                                                                        | Description                                                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `main`                      | [UI5 Web Components - Main](https://www.npmjs.com/package/@ui5/webcomponents)                                      | Bread-and-butter components (buttons, inputs, popups, pickers, tables, etc.) that are generally found in web apps.         |
| `fiori`                     | [UI5 Web Components - Fiori](https://www.npmjs.com/package/@ui5/webcomponents-fiori)                               | More semantic components, specific to the Fiori UX (shell bar, side navigation, etc.) that are commonly found in SAP apps. |
| `icons`                     | [UI5 Web Components - Icons](https://www.npmjs.com/package/@ui5/webcomponents-icons)                               | A rich icons collection (`SAP-icons`), suitable for enterprise-grade apps                                                  |
| `icons-tnt`                 | [UI5 Web Components - Icons TNT](https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt)                       | A rich icons collection (`SAP-icons-TNT`), suitable for more technical apps                                                |
| `icons-business-suite`      | [UI5 Web Components - Icons Business Suite](https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite) | A rich icons collection (`BusinessSuiteInAppSymbols`), suitable for SAP Fiori apps                                         |
| `base`                      | [UI5 Web Components - Base](https://www.npmjs.com/package/@ui5/webcomponents-base)                                 | The UI5 Web Components framework itself                                                                                    |
| `theming`                   | [UI5 Web Components - Theming](https://www.npmjs.com/package/@ui5/webcomponents-theming)                           | Theming assets (the default theme and additional accessibility themes)                                                     |
| `localization`              | [UI5 Web Components - Localization](https://www.npmjs.com/package/@ui5/webcomponents-localization)                 | `i18n` functionality and `CLDR` assets                                                                                     |
| `create-package`            | [Create Webcomponents Package](https://www.npmjs.com/package/@ui5/create-webcomponents-package)                    | An `npm init` script for creating new UI5 Webcomponents Packages                                                           |
| `playground`                | N/A                                                                                                                | The playground application                                                                                                 |

### How to run the project locally:

```sh
yarn # to install all dependencies
yarn start # to serve the project
```

A dev server will be started and the browser will open its index URL with a listing of all test pages.

### How to start Website (Docs & Samples):
You can start the website app with the following commands:

```sh
yarn # to install all dependencies

# start the playground from the project root
yarn start:website

# open http://localhost:3000/webcomponents/nightly/
```

**Note:** If you wish to manually install dependencies & run the Playground you can check out our [in depth tutorial](docs/5-contributing/03-website.md)

### Production Build
To build the UI5 Web Components project, run the following commands:

```sh
yarn # to install all dependencies
yarn ci:releasebuild # to build the project
```

Afterwards, you can find the build output in the `dist` folder of the corresponding package folder.
For example, to find the Button component (that belongs to the `main` package), look inside the `packages/main/dist` folder.

## Limitations
None as of 1.24.0

## Known Issues
No major bugs known. To report an issue or view the currently open issues, click [here](https://github.com/UI5/webcomponents/issues).

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](docs/5-contributing/02-conventions-and-guidelines.md).
