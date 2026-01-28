# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - Localization

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides date/time and CLDR functionality for the purposes of building UI5 Web Components.

## Provided assets

The assets, provided by this package, are CLDR data:

`import "@ui5/webcomponents-localization/dist/Assets.js";`

*Note:* These assets are already imported by the UI5 Web Components packages that need them.

## Provided features

| Feature Import                                                       | Description               |
|----------------------------------------------------------------------|---------------------------|
| `@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js` | Buddhist calendar support |
| `@ui5/webcomponents-localization/dist/features/calendar/Islamic.js`  | Islamic calendar support  |
| `@ui5/webcomponents-localization/dist/features/calendar/Japanese.js` | Japanese calendar support |
| `@ui5/webcomponents-localization/dist/features/calendar/Persian.js`  | Persian calendar support  |

### Advanced Calendar Types Feature

```js
import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";
```

The `ui5-date-picker` and `ui5-datetime-picker` components supports Gregorian Calendar by default.

In order to be able to use Buddhist, Islamic, Japanese, or Persian calendar with these components
(by setting its `primaryCalendarType` property), you must import one or more of the modules above.

## Resources
- [UI5 Web Components - README.md](https://github.com/UI5/webcomponents/blob/main/README.md)
- [UI5 Web Components - Home Page](https://ui5.github.io/webcomponents)
- [UI5 Web Components - Playground and API Reference](https://ui5.github.io/webcomponents/play/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/UI5/webcomponents/blob/main/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/UI5/webcomponents/blob/main/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/UI5/webcomponents/blob/main/LICENSE.txt) file.
