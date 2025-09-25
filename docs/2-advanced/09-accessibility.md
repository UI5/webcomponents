---
title: Accessibility
---

# Accessibility in UI5 Web Components

Accessibility refers to the possibility for everyone, including and especially people with special needs, to access and use IT products. Making software work for more people should be of high priority. All users should be able to operate our software without loss of meaningful content, functionality, and efficiency when using assistive technologies.

Following those principles in an ongoing approach, we at UI5 Web Components aim to bring accessibility to life by providing the appropriate accessibility features, and following precise accessibility requirements and processes.


## Web Components & Accessibility

Web Components allow developers to make their own custom components with native HTML and JavaScript using custom elements, shadow DOM, and templates. In HTML, you can define an element using a role.  When you use semantic elements, you don’t need to define a role as these elements receive all relevant aria mappings out of the box. However, this is not the case when you use custom elements where you should add all relevant accessibility attributes yourselves.

This is not needed in UI5 Web Components, because when using our elements, all relevant accessibility attributes for a certain component will be applied in the shadow DOM, without further setup. Additionally, many accessibility-related APIs are available. They can be used to enhance the accessibility in the context of each application.

As the Web Components are a new standard, there are still some gaps in regard to accessibility. For example - setting IDRef relationships is currently not possible due to the nature of the custom elements and their shadow DOM. This is a limitation in the ARIA support and there is a draft of a new [AOM (Accessibility Object Model)](https://github.com/WICG/aom), which addresses this issue and many more, and aims at a better JS-based accessibility support for all web elements. We are continuously working on improving the existing limitations. For example, in order to create a Label-Input relationship, you can use the `for` property of the label component to bind the label to an input, or `accessible-name-ref` property of the input component to bind the input to a label.


## Accessibility Features

Many accessibility features are built into the core design elements upfront and are available to app teams out of the box. Keyboard navigation and interaction, tab and reading order, as well as screen reader support are fundamental features enabled in UI5 Web Components. Visualization features like high contrast themes, consistency of icons, keyboard focus visualization, layout adaptation, and support for text resizing are also available.


### **Screen Reader Support**

UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards support in order to aid people using screen reader software.

Navigation with the keyboard and screen reader should work properly together. In order for this to happen, you need to use the correct ARIA attributes and to map them to their HTML counterparts. With UI5 Web Components, you will receive ARIA mapped elements out of the box. For example, let's add a `ui5-combobox` component:

```html
<ui5-combobox>
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
```

By doing so, you receive an input element with `role="combobox"` with all aria attributes relevant for this role in the shadow DOM. Also, if you set the `disabled` property, this will automatically add `disabled` to the shadow `combobox` element. Attribute mapping is available for all relevant properties - `required`, `disabled`, `readonly`, and more.

In order to ease the setting of aria attributes, we have introduced properties that are available for developers to extend the accessibility support in the context of the application. More information about the available properties could be found in the Accessibility APIs section below.


### **Invisible Messaging**
The Invisible Message provides a way to programmaticaly expose dynamic content changes in a way that can be announced by screen readers. It marks the dynamic content changes as ARIA live regions so that you are able to inform the users of assistive technologies for a change that has happened to the UI.

The Invisible Messaging service is designed to be used both internally in the components logic and from the applications. Using the service, you have to specify the message to be announced by the screen reader and the mode which will be inserted in the `aria-live` attribute via the `InvisibleMessage.announce(message, mode)` method. The possible modes to choose from are:
* `InvisibleMessageMode.Assertive` - indicates that updates to the region have the highest priority and should be presented to the user immediately.
* `InvisibleMessageMode.Polite` - indicates that updates to the region should be presented at the next graceful opportunity such as at the end of reading the current sentence, or when the user paused typing.

According to the WAI-ARIA recommendations, the live regions should be initialised empty when the page is loaded. This way screen readers remember them and start to listen for changes of their value. Thus, we recommend to instantiate Invisible Message as early as possible in the application. Then, you should specify the text that has to be announced by the screen reader and the live region mode using the `announce` method.


### **Keyboard Handling**

All standard UI elements and controls are designed to be keyboard-enabled. All suitable input channels (such as mouse, keyboard, or touch) are treated equally according to the capabilities of the device or the individual preferences of the user. For example, some users may prefer using the keyboard instead of a mouse, which lets them work faster.

Support for standard keystrokes based on the role of the component element is available. Complex components also provide advanced keyboard handling, which is described in the Overview section of each component.


### **Theming**

Theming is an important aspect when it comes to a UI5 Web Components application. The different colors shown on the UI need to have a good contrast to each other in order to be easily distinguishable. We ensure that the requirements for color contrast are fulfilled in all themes. High Contrast White and High Contrast Black themes are also available to support people with visual impairments.

For more information regarding the available themes and how to use them, see the [Configuration](../2-advanced/01-configuration.md) section.

### Theme Selection According to OS Settings

The UI5 Web Components framework does not offer a built-in mechanism for selecting themes based on the users' OS settings. However, we recommend using standard APIs to implement OS-based theme selection in applications built with UI5 Web Components.

In the next sections, we will demonstrate one of the possible approaches to detect and apply a theme that aligns with the user's OS preferences. However, you are free to explore and develop your own detection and matching algorithm.

#### Light | Dark

To synchronize theme switching with the OS's light or dark mode, you can use the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS Media feature, as shown in the next example:

Check `prefers-color-scheme` for `dark` or `light` and apply one of the availabe light/dark themes (Horizon Morning, Horizon Evening, ect.)

```ts
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

setTheme(darkColorScheme ? "sap_horizon_dark" : "sap_horizon");
```

#### Contrast

To switch to a high contrast theme when the OS does, you can use [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) and  [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) (detecting MacOS contrast preferences and Windows high contrast themes) CSS features, as shown in the next example:

Check `prefers-color-scheme` for `dark` or `light` and `prefers-contrast` for `more`, and apply one of the available high contrast themes (Horizon High Contrast White or Horizon High Contrast Black)

```ts
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const prefersContrastMore = window.matchMedia("(prefers-contrast: more)").matches;
const prefersContrastCustom = window.matchMedia("(prefers-contrast: custom)").matches;
const prefersContrast = prefersContrastMore || prefersContrastCustom;

if (prefersContrast) {
	setTheme(darkColorScheme ? "sap_horizon_hcb" : "sap_horizon_hcw");
}
```

**Note:** In addition to detecting contrast mode, you need to check for light and dark modes via `prefers-color-scheme` to pick between the High Contrast Black and High Contrast White themes.

The examples above will work for initial loading. However, to react on dynamic changes of the user preferences, you need to attach for the media query `change` event, fired when the status of media query support changes.

Here is the full solution, listening for changes of the OS settings and considering light, dark and contrast preferences:

```ts
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const darkColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const prefersContrastMore = window.matchMedia("(prefers-contrast: more)");
const prefersContrastCustom = window.matchMedia("(prefers-contrast: custom)");

const applyOSThemePreferences = () => {
	if (prefersContrastMore.matches || prefersContrastCustom.matches) {
		setTheme(darkColorScheme.matches ? "sap_horizon_hcb" : "sap_horizon_hcw");
	} else {
		setTheme(darkColorScheme.matches ? "sap_horizon_dark" : "sap_horizon");
	}
}

darkColorScheme.onchange = applyOSThemePreferences;
prefersContrastMore.onchange = applyOSThemePreferences;
prefersContrastCustom.onchange = applyOSThemePreferences;

applyOSThemePreferences();
```

Although you've learned how to detect OS settings and apply the corresponding theme, we recommend allowing users to decide whether the theme should always match the OS setting OS settings by providing application settings and not forcing the OS settings by default.

## Accessibility APIs

The mapping of the accessibility APIs to ARIA attributes is described in the following table:


| UI5 Web Components Property | HTML Attribute                                    | Description                                                                                                                                                                                         |
| ------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibleName`               | `aria-label`                                      | Defines the text alternative of the component. If not provided, a default text alternative is set, if present.                                                                                      |
| `accessibleNameRef`            | `aria-label`                                      | Alternative for `aria-labelledby`. Receives ID (or many IDs) of the elements that serve as labels of the component. Those labels are passed as a concatenated string to the `aria-label` attribute. |
| `accessibleDescription`        | `aria-description`                                | Defines the description of the component.                                                                                                                                                           |
| `accessibleDescriptionRef`     | `aria-description`                                | Alternative for `aria-describedby`. Receives ID (or many IDs) of the elements that serve as descriptions of the component. Those descriptions are passed as a concatenated string to the `aria-describedby` attribute. |
| `accessibleRole`               | `role`                                            | Sets the accessible aria role of the component.                                                                                                                                                     |
| `accessibilityAttributes`      | `aria-expanded`, `aria-haspopup`, `aria-controls`, etc. | An object of strings that defines several additional accessibility attribute values for customization depending on the use case. <br/> For composite components the object provides a way to enrich the accessibility of the different elements inside the component (for example in the `ui5-shellbar`).                                                                   |                                                                                          |
| `required`                     | `aria-required`                                   | Defines whether the component is required.                                                                                                                                                          |
| `readonly`                     | `aria-readonly`                                   | Defines whether the component is read-only.                                                                                                                                                         |
| `disabled`                     | `aria-disabled`                                   | Defines whether the component is disabled.                                                                                                                                                          |
| `checked`                      | `aria-checked`                                    | Defines whether the component is checked.                                                                                                                                                           |
| `level`, `headerLevel`         | `aria-level`                                      | Defines the heading level of a title. Available options are: "H6" to "H1".                                                                                                                          |
| `interactive`                  | `tabindex`                                        | Defines if the component is interactive (focusable and pressable).                                                                                                                                  |
| `tooltip`                      | `title`                                           | Defines the tooltip of the component.

### accessibleName

Setting the property on the custom element as:
```html
<ui5-combobox accessible-name="Enter Value">
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
```

Will result in the shadow DOM as:
```html
<input role="combobox" aria-label="Enter value" ... >
```

The `accessibleName` property is currently supported in most of the available components.
Additionally `headerAccessibleName` is available for [ListItemGroup](https://ui5.github.io/webcomponents/nightly/components/ListItemGroup/) component, which gives the possibility to add accessible name to the groups headers in a list.

---

### accessibleNameRef

Setting the property on the custom element as:
```html
<ui5-label id="myLabel" for="myInput">Date of birth</ui5-label>
<ui5-input id="myInput" accessible-name-ref="myLabel"></ui5-input>
```

Will result in the shadow DOM as:
```html
<input aria-label="Date of birth" ... >
```

The `accessibleNameRef` property is currently supported in most of the available components.

---

### accessibleDescription

Setting the property on the custom element as:
```html
<ui5-list accessible-description="List of items">
    <ui5-li>Item 1</ui5-li>
    <ui5-li>Item 2</ui5-li>
</ui5-list>
```

Will result in the shadow DOM as:
```html
<ul role="list" aria-description="List of items" ... >
    ...
</ul>
```

The `accessibleDescription` property is currently supported in:
* [List](https://ui5.github.io/webcomponents/nightly/components/List/)
* [Tree](https://ui5.github.io/webcomponents/nightly/components/Tree/)
* [Input](https://ui5.github.io/webcomponents/nightly/components/Input/)
* [Select](https://ui5.github.io/webcomponents/nightly/components/Select/)
* [Popover](https://ui5.github.io/webcomponents/nightly/components/Popover/)
* [ResponsivePopover](https://ui5.github.io/webcomponents/nightly/components/ResponsivePopover/)
* [Dialog](https://ui5.github.io/webcomponents/nightly/components/Dialog/)
* [DatePicker](https://ui5.github.io/webcomponents/nightly/components/DatePicker/)
* [DateRangePicker](https://ui5.github.io/webcomponents/nightly/components/DateRangePicker/)
* [DateTimePicker](https://ui5.github.io/webcomponents/nightly/components/DateTimePicker/)
* [TimePicker](https://ui5.github.io/webcomponents/nightly/components/TimePicker/)
* [FileUploader](https://ui5.github.io/webcomponents/nightly/components/FileUploader/)

---

### accessibleDescriptionRef

Setting the property on the custom element as:
```html
<p id="description">List of items</p>
<ui5-list accessible-description-ref="description">
    <ui5-li>Item 1</ui5-li>
    <ui5-li>Item 2</ui5-li>
</ui5-list>
```

Will result in the shadow DOM as:
```html
<ul role="list" aria-description="List of items" ... >
    ...
</ul>
```

The `accessibleDescriptionRef` property is currently supported in:
* [List](https://ui5.github.io/webcomponents/nightly/components/List/)
* [Tree](https://ui5.github.io/webcomponents/nightly/components/Tree/)
* [Input](https://ui5.github.io/webcomponents/nightly/components/Input/)
* [Select](https://ui5.github.io/webcomponents/nightly/components/Select/)
* [Popover](https://ui5.github.io/webcomponents/nightly/components/Popover/)
* [ResponsivePopover](https://ui5.github.io/webcomponents/nightly/components/ResponsivePopover/)
* [Dialog](https://ui5.github.io/webcomponents/nightly/components/Dialog/)
* [DatePicker](https://ui5.github.io/webcomponents/nightly/components/DatePicker/)
* [DateRangePicker](https://ui5.github.io/webcomponents/nightly/components/DateRangePicker/)
* [DateTimePicker](https://ui5.github.io/webcomponents/nightly/components/DateTimePicker/)
* [TimePicker](https://ui5.github.io/webcomponents/nightly/components/TimePicker/)
* [FileUploader](https://ui5.github.io/webcomponents/nightly/components/FileUploader/)

---

### accessibleRole

Setting the property on the custom element as:
```html
<ui5-panel accessible-role="Complementary">
    ...
</ui5-panel>
```

Will result in the shadow DOM as:
```html
<div role="complementary" ... >
    ...
</div>
```

The `accessible-role` property is currently supported in:
* [Panel](https://ui5.github.io/webcomponents/nightly/components/Panel/)
* [List](https://ui5.github.io/webcomponents/nightly/components/List/)
* [Icon](https://ui5.github.io/webcomponents/nightly/components/Icon/)
* [Popover](https://ui5.github.io/webcomponents/nightly/components/Popover/)
* [ResponsivePopover](https://ui5.github.io/webcomponents/nightly/components/ResponsivePopover/)
* [Dialog](https://ui5.github.io/webcomponents/nightly/components/Dialog/)
* [Link](https://ui5.github.io/webcomponents/nightly/components/Link/)
* [Button](https://ui5.github.io/webcomponents/nightly/components/Button/)
* [ToggleButton](https://ui5.github.io/webcomponents/nightly/components/ToggleButton/)

---

### accessibilityAttributes

This property accepts an `object` with property values, which will be used to generate additional accessibility attributes to the root element. For more detailed information on every object property, read the API description in [Button](https://ui5.github.io/webcomponents/nightly/components/Button/).

Setting the property on the custom element as:
```html
<ui5-button id="button">...</ui5-button>
<ui5-dialog id="dialogIdentificator">...</ui5-dialog>

<script>
    const component = document.getElemetnById("button");
    component.accessibilityAttributes = {
        hasPopup: "dialog",
        controls: "dialogIdentificator"
    };
</script>
```

Will result in the shadow DOM as:
```html
<button type="button" class="ui5-button-root" part="button" aria-controls="dialogIdentificator" aria-haspopup="dialog">
	...
</button>
```

The `accessibilityAttributes` property is currently supported in:
* [Avatar](https://ui5.github.io/webcomponents/nightly/components/Avatar/)
* [AvatarGroup](https://ui5.github.io/webcomponents/nightly/components/AvatarGroup/)
* [Button](https://ui5.github.io/webcomponents/nightly/components/Button/)
* [Button](https://ui5.github.io/webcomponents/nightly/components/ai/Button/)
* [Link](https://ui5.github.io/webcomponents/nightly/components/Link/)
* [ToggleButton](https://ui5.github.io/webcomponents/nightly/components/ToggleButton/)
* [Link](https://ui5.github.io/webcomponents/nightly/components/Link/)
* List Items (for example [ListItemStandard](https://ui5.github.io/webcomponents/nightly/components/ListItemStandard/))

`accessibilityAttributes` is also supported for composite components, where the application can enrich the accessibility of elements inside the component. For a more detailed information check the documentation of the property in:
* [FlexibleColumnLayout](https://ui5.github.io/webcomponents/nightly/components/fiori/FlexibleColumnLayout/)
* [ShellBar](https://ui5.github.io/webcomponents/nightly/components/fiori/ShellBar/)
* [ShellBarItem](https://ui5.github.io/webcomponents/nightly/components/fiori/ShellBarItem/)
* [SplitButton](https://ui5.github.io/webcomponents/nightly/components/SplitButton/)
* [MenuItem](https://ui5.github.io/webcomponents/nightly/components/MenuItem/)
* [List](https://ui5.github.io/webcomponents/nightly/components/List/)

---


### level, headerLevel

Setting the property on the custom element as:
```html
<ui5-title level="H3">Title</ui5-title>
...
<ui5-panel header-text="Panel Header" header-level="H3">
</ui5-panel>
```

Will result in the shadow DOM as:
```html
<h3 class="ui5-title-root" ... >...</h3>
...
<div class="ui5-panel-root" ... >
    ...
    <div role="heading" aria-level="3" ...>
        Panel Header
    </div>
    ...
</div>
```
The `level` property is currently supported in:
 * [Title](https://ui5.github.io/webcomponents/nightly/components/Title/)

The `header-level` property is currently supported in:
 * [Panel](https://ui5.github.io/webcomponents/nightly/components/Panel/)

---

### interactive

Setting the property on the custom element as:
```html
<ui5-avatar interactive></ui5-avatar>
```

Will result in the shadow DOM as:
```html
<div tabindex="0" role="button" ... ></div>
```

The `interactive` property is currently supported in:
* [Avatar](https://ui5.github.io/webcomponents/nightly/components/Avatar/)

---


### tooltip

Setting the property on the custom element as:
```html
<ui5-button icon="sap-icon://edit" tooltip="Edit"></ui5-button>
```

Will result in the shadow DOM as:
```html
<button title="Edit" ... ></button>
```

*Note: Do not set `title` attribute directly on custom element as this could result in repetitive speech output or incorrect accessibility tree mapping.*

---

### Icon Modes

The `ui5-icon` component has a `mode` property, which provides additional accessibility depending on the mode.

Setting the property to "Decorative":
```html
<ui5-icon mode="Decorative"></ui5-icon>
```

Will result in the shadow DOM as:
```html
<svg role="presentation" aria-hidden="true" ... ></svg>
```

Setting the property to "Interactive":
```html
<ui5-icon mode="Interactive"></ui5-icon>
```

Will result in the shadow DOM as:
```html
<svg tabindex="0" role="button" ... ></svg>
```

Setting the property to "Image":
```html
<ui5-icon mode="Image"></ui5-icon>
```

Will result in the shadow DOM as:
```html
<svg role="img" ... ></svg>
```

---

## Testing Accessibility

UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA 1.2, and WCAG 2.2 standards. All screen readers that follow those standards should work fine. Nevertheless, there are deviations in the interpretation depending on the combination of browser and screen reader. UI5 Web Components focus on compliance with the standards by performing automated checks for accessibility and manual tests with reference testing environments.

For Screen Reader Support, we recommend using JAWS 2025 + Chrome (latest), and for HTML/ARIA validation the recommended testing tool is Access Assistant. UI5 Web Components support other environments to the extent of providing a valid HTML and ARIA 1.2 implementation following the WCAG 2.2 standards.

Please note that reference testing environments may change over time to reflect changes in the usage of different browsers, their maintenance period, and increased accessibility compliance.

When reporting issues with different testing environments, please ensure that the issue is not false positive, a real accessibility concern is present, and there is an impact on the users. Therefore, we recommend to retest the issue using the mentioned reference testing tools and additionally with plain HTML.

In order to process the issues correctly, we would like to have the following information provided:
* Issue description
* Reference to the suspected violated accessibility requirement (e.g. Web Content Accessibility Guidelines WCAG 2.2, BITV 2.0, EN 301 549)
* Isolated example
* Steps to reproduce
* UI5 Web Components version
* OS/Platform: \{...\}
* Browser: \{...\}
* Testing Tool

## Note

Have in mind that UI5 Web Components is optimized for the High Contrast mode of Windows when using Chrome and Edge. If you have enabled both the Windows High Contrast setting and the UI5 High Contrast theme and you are using browser different from Chrome and Edge, this may cause conflicts and deficiencies in the theme can occur. In such cases, please switch off the Windows High Contrast setting or use different browser.
