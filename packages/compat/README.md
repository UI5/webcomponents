# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - Compatibility

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

**DEPRECATED SINCE 2.12.0:** The `@ui5/webcomponents-compat` package has been deprecated as of version `2.12.0`.
Please use the Table from `@ui5/webcomponents` package instead.

While `@ui5/webcomponents-compat` will remain available for compatibility purposes (until the next major release),
migration is strongly recommended, as new development and enhancements will be focused on `@ui5/webcomponents/Table`.

## Guidance for coding assistants

The npm package includes `llms.txt`, which provides usage conventions and a generated component index for the installed package version. Consult `dist/custom-elements.json` and the component TypeScript declarations for complete API details.

To make this guidance discoverable, add the following to your application's agent instructions:

> When using `@ui5/webcomponents-compat`, read its installed `llms.txt` before writing component code, and check the relevant declaration in its public API manifest.

The file ships with the npm package and can be resolved as `@ui5/webcomponents-compat/llms.txt` by tools that read package documentation.

For repository development, run `yarn generateAPI` from the root to generate the public manifests and guidance. The generated `llms.txt` files are ignored by Git and refreshed during release builds and packing; commit changes to the generator rather than its output. Packing requires the public manifests from the build.

## Provided components

The package provides Table web component and several subcomopnents as descrived below.


| Web Component            | Tag name                    | Module import                                              |
|--------------------------|-----------------------------|------------------------------------------------------------|
| Table                    | `ui5-table`                 | `import "@ui5/webcomponents-compat/dist/Table.js";`               |
| Table Column             | `ui5-table-column`          | `import "@ui5/webcomponents-compat/dist/TableColumn.js";`         |
| Table Row                | `ui5-table-row`             | `import "@ui5/webcomponents-compat/dist/TableRow.js";`            |
| Table Group Row          | `ui5-table-group-row`       | `import "@ui5/webcomponents-compat/dist/TableGroupRow.js";`       |
| Table Cell               | `ui5-table-cell`            | `import "@ui5/webcomponents-compat/dist/TableCell.js";`           |


## Provided assets


| Assets | Module | Notes
|------------|-----------|----------- 
| `i18n`, `themes` | `@ui5/webcomponents-compat/dist/Assets.js` | Theming parameters and translations for the components  


## Resources
- [UI5 Web Components - README.md](https://github.com/UI5/webcomponents/blob/main/README.md)
- [UI5 Web Components - Playground and API Reference](https://ui5.github.io/webcomponents/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/UI5/webcomponents/blob/main/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/UI5/webcomponents/blob/main/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/UI5/webcomponents/blob/main/LICENSE.txt) file.
