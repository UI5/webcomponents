# ![UI5 icon](https://raw.githubusercontent.com/UI5/webcomponents/main/docs/images/UI5_logo_water.png)UI5 Web Components - Fiori

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides essential building blocks, necessary to implement the Fiori UX concept,
such as a common header (ShellBar).

## Provided components

| Web Component                             | Tag name                                | Module import                                                          |
|-------------------------------------------|-----------------------------------------|------------------------------------------------------------------------|
| Barcode Scanner Dialog                    | `ui5-barcode-scanner-dialog`            | `import "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";`      |
| Dynamic Side Content                      | `ui5-dynamic-side-content`              | `import "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";`        |
| Flexible Column Layout                    | `ui5-flexible-column-layout`            | `import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";`      |
| Illustrated Message                       | `ui5-illustrated-message`               | `import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";`        |
| Media Gallery                             | `ui5-media-gallery`                     | `import "@ui5/webcomponents-fiori/dist/MediaGallery.js";`              |
| Media Gallery Item                        | `ui5-media-gallery-item`                | comes with `ui5-media-gallery`                                         |
| Notification List                         | `ui5-notification-list`                 | `import "@ui5/webcomponents-fiori/dist/NotifcationList.js";`           |
| Notification List Item                    | `ui5-li-notification`                   | `import "@ui5/webcomponents-fiori/dist/NotifcationListItem.js";`       |
| Notification Group List Item              | `ui5-li-notification-group`             | `import "@ui5/webcomponents-fiori/dist/NotifcationListGroupItem.js";`  |
| Notification Action                       | `ui5-notification-action`               | `import "@ui5/webcomponents-fiori/dist/NotificationAction.js";`        |
| Page                                      | `ui5-page`                              | `import "@ui5/webcomponents-fiori/dist/Page.js";`                      |
| Product Switch                            | `ui5-product-switch`                    | `import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";`             |
| Product Switch Item                       | `ui5-product-switch-item`               | `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";`         |
| Shell Bar                                 | `ui5-shellbar`                          | `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`                  |
| Shell Bar Item                            | `ui5-shellbar-item`                     | `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`              |
| Side Navigation                           | `ui5-side-navigation`                   | `import "@ui5/webcomponents-fiori/dist/SideNavigation.js";`            |
| Side Navigation Item                      | `ui5-side-navigation-item`              | `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";`        |
| Side Navigation Sub Item                  | `ui5-side-navigation-sub-item`          | `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`     |
| Side Navigation Group                     | `ui5-side-navigation-group`             | `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`       |
| Timeline                                  | `ui5-timeline`                          | `import "@ui5/webcomponents-fiori/dist/Timeline.js";`                  |
| Timeline Item                             | `ui5-timeline-item`                     | comes with `ui5-timeline`                                              |
| Timeline Group Item                       | `ui5-timeline-group-item`               | `import "@ui5/webcomponents-fiori/dist/TimelineGroupItem.js";`         |
| Upload Collection                         | `ui5-upload-collection`                 | `import "@ui5/webcomponents-fiori/dist/UploadCollection.js";`          |
| Upload Collection Item                    | `ui5-upload-collection-item`            | `import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";`      |
| User Menu                                 | `ui5-user-menu`                         | `import "@ui5/webcomponents-fiori/dist/UserMenu.js";`                  |
| User Menu Account                         | `ui5-user-menu-account`                 | `import "@ui5/webcomponents-fiori/dist/UserMenuAccount.js";`           |
| User Menu Item                            | `ui5-user-menu-item`                    | `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";`              |
| User Menu Item Group                      | `ui5-user-menu-item-group`              | `import "@ui5/webcomponents-fiori/dist/UserMenuItemGroup.js";`         |
| User Settings Dialog                      | `ui5-user-settings-dialog`              | `import "@ui5/webcomponents-fiori/dist/UserSettingsDialog.js";`        |
| User Settings Item                        | `ui5-user-settings-item`                | `import "@ui5/webcomponents-fiori/dist/UserSettingsItem.js";`          |
| User Settings Account View                | `ui5-user-settings-account-view`        | `import "@ui5/webcomponents-fiori/dist/UserSettingsAccountView.js";`   |
| User Settings Appearance View             | `ui5-user-settings-appearance-view`     | `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceView.js";`|
| User Settings Appearance View Item        | `ui5-user-settings-appearance-view-item`| `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewItem.js";`|
| User Settings Appearance View Group       | `ui5-user-settings-appearance-view-group`| `import "@ui5/webcomponents-fiori/dist/UserSettingsAppearanceViewGroup.js";`|
| User Settings View                        | `ui5-user-settings-view`                | `import "@ui5/webcomponents-fiori/dist/UserSettingsView.js";`          |
| View Settings Dialog                      | `ui5-view-settings-dialog`              | `import "@ui5/webcomponents-fiori/dist/ViewSettingsDialog.js";`        |
| View Settings Dialog - Sort Item          | `ui5-sort-item`                         | `import "@ui5/webcomponents-fiori/dist/SortItem.js";`                  |
| View Settings Dialog - Filter Item        | `ui5-filter-item`                       | `import "@ui5/webcomponents-fiori/dist/FilterItem.js";`                |
| View Settings Dialog - Filter Item Option | `ui5-filter-item-option`                | `import "@ui5/webcomponents-fiori/dist/FilterItemOption.js";`          |
| Wizard                                    | `ui5-wizard`                            | `import "@ui5/webcomponents-fiori/dist/Wizard.js";`                    |
| Wizard Step                               | `ui5-wizard-step`                       | comes with `ui5-wizard`                                                |

## Provided assets

```js
import "@ui5/webcomponents-fiori/dist/Assets.js";
```

| Assets           | Module                                    | Notes                                                                                                                                  |
|------------------|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `i18n`, `themes` | `@ui5/webcomponents-fiori/dist/Assets.js` | Theming parameters and translations for the components  <br/><br/> *Automatically imports also:<br/> `@ui5/webcomponents/dist/Assets.js`* |

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
