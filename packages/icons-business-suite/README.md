# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - SAP Business Suite Icons

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides assets for the rich `business-suite` icon collection.

| Icon asset               | Module import                                                               |
|--------------------------|-----------------------------------------------------------------------------|
| All icons (~73KB zipped) | `import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";`        |
| 1x2 grid layout icon     | `import "@ui5/webcomponents-icons-business-suite/dist/1x2-grid-layout.js";` |
| 2x1 grid layout icon     | `import "@ui5/webcomponents-icons-business-suite/dist/2x1-grid-layout.js";` |
| ...                      | ...                                                                         |
| Year icon                | `import "@ui5/webcomponents-icons-business-suite/dist/year.js";`            |

*Note:* The `@ui5/webcomponents-icons-business-suite` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import
just the ones that your app will actually use.

## Usage

Since this is a non-default icon collection, all names have to be prefixed with the collection name and a `/` separator when used by web components.

Example usage with `<ui5-icon>` web component:

```html
<ui5-icon name="business-suite/1x2-grid-layout"></ui5-icon>
```

The package provides two versions of each icon (SAP Business Suite Icons v1 and SAP Business Suite Icons v2).
If you don't specify the versioned collection name, like in the example above:

```html
<ui5-icon name="business-suite/1x2-grid-layout"></ui5-icon>
```

the framework will detect the current theme and render the corresponding icon - from `SAP Icons Business suite V2` (collection name `business-suite-v2`) for SAP Horizon theme family  (sap_horizon, sap_horizon_dark, etc.), and from `SAP Icons Business suite V1` (collection name `business-suite-v1`) for all the rest (sap_fiori_3, sap_fiori_3_dark, etc.).

### Collections `business-suite-v1` and `business-suite-v2 `

In case you want to always display the `SAP Icons Business suite V1` icons in all themes, you can set it explicitly via the `business-suite-v1` collection name:

```html
<ui5-icon name="business-suite-v1/answered"></ui5-icon>
```

The same applies if you want to always display the `SAP Icons Business suite V2` icons. You can set it explicitly via the `business-suite-v2` collection name:
```html
<ui5-icon name="business-suite-v2/answered"></ui5-icon>
```

For a full list of the icons in the `business-suite` collection, click [here](https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols).

## Resources
- [UI5 Web Components - README.md](https://github.com/UI5/webcomponents/blob/main/README.md)
- [UI5 Web Components - Home Page](https://ui5.github.io/webcomponents)
- [UI5 Web Components - Using Icons](https://ui5.github.io/webcomponents/docs/getting-started/using-icons/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/UI5/webcomponents/blob/main/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/UI5/webcomponents/blob/main/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/UI5/webcomponents/blob/main/LICENSE.txt) file.
