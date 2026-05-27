# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - SAP Fiori Tools (TNT) Icons

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides assets for the rich `tnt` icon collection.

## Provided icons

| Icon asset               | Module import                                                    |
|--------------------------|------------------------------------------------------------------|
| All icons (~31KB zipped) | `import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";`        |
| Actor icon               | `import "@ui5/webcomponents-icons-tnt/dist/actor.js";`           |
| Ad hoc actor icon        | `import "@ui5/webcomponents-icons-tnt/dist/ad-hoc-actor.js";`    |
| ...                      | ...                                                              |
| Workflow editor icon     | `import "@ui5/webcomponents-icons-tnt/dist/workflow-editor.js";` |

*Note:* The `@ui5/webcomponents-icons-tnt` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import
just the ones that your app will actually use.

*Note:* For a full list of the icons in the `tnt` collection, click [here](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT).

## Usage
### Collection `tnt` 
All icon names from the collection have to be prefixed with `tnt` and a `/` separator when used by web components.

Example usage with `<ui5-icon>` web component:

```html
<ui5-icon name="tnt/actor"></ui5-icon>
```

The package provides two versions of each icon (TNT Icons v2 and TNT Icons v3).
If you don't specify the versioned collection name, like in the example above:

```html
<ui5-icon name="tnt/actor"></ui5-icon>
```

the framework will detect the current theme and render the corresponding icon - from `TNT Icons v3` (collection name `tnt-v3`) for SAP Horizon theme family  (sap_horizon, sap_horizon_dark, etc.), and from `TNT Icons v2` (collection name `tnt-v2`) for all the rest (sap_fiori_3, sap_fiori_3_dark, etc.).

### Collections `tnt-v2` and `tnt-v3 `

In case you want to always display the `TNT Icons v3` icons in all themes, you can set it explicitly via the `tnt-v3` collection name:

```html
<ui5-icon name="tnt-v3/actor"></ui5-icon>
```

The same applies if you want to always display the `TNT Icons v2` icons. You can set it explicitly via the `tnt-v2` collection name:
```html
<ui5-icon name="tnt-v2/actor"></ui5-icon>
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
