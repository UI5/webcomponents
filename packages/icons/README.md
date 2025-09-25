# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - Icons

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides assets for the rich `SAP-icons` icon collection.

## Provided icons

| Icon asset                | Module import                                            |
|---------------------------|----------------------------------------------------------|
| All icons (~115KB zipped) | `import "@ui5/webcomponents-icons/dist/AllIcons.js";`    |
| Accelerated icon          | `import "@ui5/webcomponents-icons/dist/accelerated.js";` |
| Accept icon               | `import "@ui5/webcomponents-icons/dist/accept.js";`      |
| ...                       | ...                                                      |
| Zoom out icon             | `import "@ui5/webcomponents-icons/dist/zoom-out.js";`    |

*Note:* The `@ui5/webcomponents-icons` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import 
just the ones that your app will actually use.

*Note:* For a full list of the icons in the `SAP-icons` collection, click [here](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).

## Provided assets

```js
import "@ui5/webcomponents-fiori/dist/Assets.js";
```

| Assets           | Module                                           | Notes                                                                                                                                                                                                            |
|------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `i18n`           | `@ui5/webcomponents-icons/dist/Assets.js`        | Translations for the tooltips / "aria labels" of several icons                                                                                                                                                   |
## Usage

### No Collection 
As SAP Icons is the default icon collection, you can skip the collection name and just set the name of the icon:

```html
<ui5-icon name="accept"></ui5-icon>
```

The package provides two versions of each icon (SAP Icons v4 and SAP Icons v5). If you don't specify a collection name like in the example above,
the framework will detect the current theme and render the corresponding icon - `SAP Icons v5` for SAP Horizon theme family  (sap_horizon, sap_horizon_dark, etc.), and `SAP Icons v4` for all the rest (sap_fiori_3, sap_fiori_3_dark, etc.).

### Collections `SAP-icon-v4` and `SAP-icon-v5`

In case you want to always display the `SAP Icons v5` icons in all themes, you can set it explicitly via the `SAP-icon-v5` collection name:

```html
<ui5-icon name="SAP-icon-v5/accept"></ui5-icon>
```

The same applies if you want to always display the `SAP Icons v4` icons. You can set it explicitly via the `SAP-icon-v4` collection name:
```html
<ui5-icon name="SAP-icon-v4/accept"></ui5-icon>
```

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
