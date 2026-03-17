---
sidebar_label: To UI5 Web Components 2.0
---

# Migration to UI5 Web Components 2.0

This guide will assist you in seamlessly transitioning from UI5 Web Components version 1.x to UI5 Web Components 2.0.

## @ui5/webcomponents-base

| Changed item       | Old                 | New                             | 
|--------------------|---------------------|---------------------------------|
| Method             | `UI5Element#render` | `UI5Element#renderer`           | 
| Method             | `Device#isIE`       | `N/A` (removed)                 | 
| Module             | `CSP.js`            | `N/A` (removed)                 | 
| Feature            | `InputElementsFormSupport`  | Removed as natively supported| 
| Decorator field      | `@property({ defaltValue })` | `N/A` (removed)         |
| Decorator field      | `@property({ validator: DOMReference })` | Removed `validator`, Added `converter` - `@property({ converter: DOMReference })` |


### UI5Element

- The `UI5Element#render` method has been removed in favor of the `UI5Element#renderer` method.
 
 If you previously used `render`:
```js
class MyClass extends UI5Element {
    static get render() {
        return litRenderer;
    }
}
```

Now use `renderer` instead:
```ts
class MyClass extends UI5Element {
    static get renderer() {
        return litRenderer;
    }
}
```

### StaticArea, StaticAreaItem

| Changed item       | Old                 | New                             | 
|--------------------|---------------------|---------------------------------|
| Class              | StaticArea          | Removed                         |
| Method             | `UI5Element#getSaticAreaItemDomRef` |  Removed        |

*This change mainly manifests in component development.*

There used to be a so-called `"static area"` (`ui5-static-area`) - a DOM element directly in the `<body>` where the popups of all components were placed. This guaranteed that even if the HTML document had `overflow: hidden`, `transform`, or similar CSS rules applied, or the component was in a stacking context, its popup would still be positioned correctly.

There is no longer a need for a `"static area"` since the browser now ensures the correct positioning of popups thanks to the `popover API` that is fully adopted by the UI5 Web Components.

- The `StaticArea` has been removed as it's unnecessary.

If you previously created a web component with a popup part, you had to define `staticAreaTemplate` and `staticAreaStyles`:

```ts
@customElement({
  tag: "ui5-select",
  template: SelectTemplate,
  staticAreaTemplate: SelectPopoverTemplate,
  styles: [
     selectCss,
  ],
  staticAreaStyles: [
     selectPopoverCss,
  ],
)}
class Select extends UI5Element {
```

Now, remove the `staticAreaTemplate` and `staticAreaStyles` settings as the popup part is rendered inside the component's ShadowDOM and there is no template and style separation as before:

```ts
@customElement({
  tag: "ui5-select",
  template: SelectTemplate,
  styles: [
     selectCss,
  ],
)}
class Select extends UI5Element {
```

- The `UI5Element.getSaticAreaItemDomRef` method has been removed as it's unnecessary.

If you previously accessed the component's popup part (for example the dropdown of Select) via the StaticArea:
```ts
const staticAreaItem = await this.getSaticAreaItemDomRef();
staticAreaItem.querySelector("ui5-responsive-popover");
```

Now query the popup from inside the component's ShadowDOM directly:
```ts
this.shadowRoot.querySelector("ui5-responsive-popover");
```

### Decorators

*These changes are related to the component development.*

#### `@property#defaultValue`


The `defaultValue` field of the `@property` decorator has been removed. Providing initial (default) values for the properties used to be part of the `@property` decorator with a `defaultValue` field. The `defaultValue` used to have two mixed usages:

- to provide an **initial value** if none is given
- to provide a **fallback value** if an invalid value is given by the app developer (mostly for numbers and enum

If you have previously used the `@property` decorator and set the `defaultValue` field:

```ts
@property({ defaultValue: "abc" })
name!: string;

@property({ type: PageBackgroundDesign, defaultValue: PageBackgroundDesign.Solid })
backgroundDesign!: `${PageBackgroundDesign}`;
```


Now, component development is switching to the standard way of using property initializers:

- **Initial Values**: they are no longer magically provided by the framework. Properties should be either optional or initialized, and very rarely (for complex objects) described as non-null

- **Fallback values**: all runtime checks for properties (especially enumerations) are removed. All type-checking is left to the TypeScript compiler and assigning an invalid value to an enumeration or a number/boolean field is considered a bug that should be fixed, instead of the framework silently masking it by providing a fallback value.

```diff
- @property({ defaultValue: "abc" })
- name!: string;
+ @property()
+ name = "abc";
```

```diff
- @property({ type: PageBackgroundDesign, defaultValue: PageBackgroundDesign.Solid })
- backgroundDesign!: `${PageBackgroundDesign}`;
+ @property()
+ backgroundDesign: `${PageBackgroundDesign}` = "Solid";
```

```diff
@property({ type: Boolean })
- noScrolling!: boolean;
+ noScrolling = false;
```

#### `@property#validator`


- The `validator` field of the `@property` decorator has been removed. You can use the newly introduced `converter` field
 to define how the framework should convert the attribute to the property and vice versa. It has the following signature:
```ts
converter?: {
		fromAttribute(value: string | null, type: unknown): string | number | boolean | null | undefined,
		toAttribute(value: unknown, type: unknown): string | null,
}
```

If you previously used `validator: Integer`:
```ts
  @property({ validator: Integer, defaultValue: 0 })
  progress!: number;
```

Now use `type: Number` instead:
```ts
converter?: {
  @property({ type: Number })
  progress = 0;
```

If you previously used `validator: DOMReference`:
```ts
converter?: {
  @property({ validator: DOMReference, defaultValue: "" })
  opener!: HTMLElement | string
```

Now use the `converter` instead:
```ts
@property({ converter: DOMReference })
opener?: HTMLElement | string;
```





### Device

- The `Device#isIE` method has been removed and is no longer available - the IE browser is not supported anymore.

### CSP

- The `CSP.js` module has been removed and the creation of `<style>` and `<link>` tags, as all browsers now support `adoptedStyleSheets` and  `adoptedStyleSheets` as CSP-compliant by design. 
 
 If you previously imported:
```ts
import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
```

Now remove the imports:
```ts
// The `adoptedStyleSheets` as CSP-compliant by design
```

### InputElementsFormSupport

- The `@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js` feature has been removed. Previously, the feature was required to make all form-associated web components (CheckBox, Inpuit, Select, etc) work in HTML forms properly. Now, with adopting the `ElementInternals API` all form-associated web components work natively in HTML form elements.

If you previously imported:
```ts
import "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
```

Now remove the import as it's not available, but more importantly - it's unnecessary.
```ts
// All form elements work natively in HTML form elements
```

## @ui5/webcomponents-theming

- The `Belize` theme has been removed and is no longer available

If you previously used `Belize`:
```ts
setTheme(“sap_belize”);
```

Now the framework will fallback to `Horizon`:
```ts
setTheme(“Belize”); // fallbacks to Horizon
```

## @ui5/webcomponents

### ui5-badge

| Changed item           | Old               | New                                | 
|------------------------|-------------------|------------------------------------|
| Tag                    | `ui5-badge` | `ui5-tag`                          | 
| `design` default value | `Set3` | `Neutral`                          |
| Property      | `design` | no longer accepts `Set3` as value  |
| Property Default    | wrapping-type="Normal" | wrapping-type="None" | 

- The Badge `ui5-badge` has been renamed to Tag `ui5-tag`. 

If you previously used the `ui5-badge`:
```html
<ui5-badge></ui5-badge>
```
Now use `ui5-tag` instead:
```html
<ui5-tag></ui5-tag>
```

- The `design` property has a new default value `Neutral` instead of `Set3`. `Set3` is no longer a valid value for the `design` property. 

- The `wrappintType` default value has been changed from `None` to `Normal` and the Tag's text will wrap by default.

If you previously set `wrapping-type="Normal"`:
```html
<ui5-tag wrapping-type="Normal"></ui5-tag>
```
Now, it's not necessary and can be removed:
```html
<ui5-tag></ui5-tag>
```

If you previously did not use the property at all:
```html
<ui5-tag></ui5-tag>
```

Now, you need to set `wrapping-type="None"` to keep text truncating:
```html
<ui5-tag wrapping-type="None"></ui5-tag>
```


### ui5-breadcrumbs

| Changed item                  | Old               | New          | 
|-------------------------------|-------------------|--------------|
| Property                      | `separator-style` | `separators` | 
| `separators` type enumeration | `BreadcrumbsSeparatorStyle` | `BreadcrumbsSeparator` | 

- The `separator-style` property is renamed to  `separators` and the `BreadcrumbsSeparatorStyle` enum is renamed to `BreadcrumbsSeparator`.

If you previously used the `separator-style` property:
```html
<ui5-breadcrumbs separator-style="Slash">
```
Now use  `separators`  instead:
```html
<ui5-breadcrumbs separators="Slash">
```

### ui5-busy-indicator

| Changed item | Old    | New                                     | 
|--------------|--------|-----------------------------------------|
| Property     | `size` | values have changed, f.e. `Small` to `S` | 

- The `size` property now accepts different values. If you previously used it like:
```html
<ui5-busy-indicator size="Small"></ui5-busy-indicator>
```
Now use the new values instead:
```html
<ui5-busy-indicator size="S"></ui5-busy-indicator>
```

### ui5-button

| Changed item | Old          | New    | 
|--------------|--------------|--------|
| Property     | `iconEnd`  | `endIcon`| 

- The boolean property `iconEnd` that used to define the placement of the icon (to the start or to the end)
 has been replaced by the the string property `endIcon`, defining the icon, displayed at the end.

If you previously set `icon` and `icon-end` to display an icon after the Button's text:
```html
<ui5-button icon="home" icon-end>Button</ui5-button>
```

Now, you must use the new property:
```html
<ui5-button end-icon="home">Button</ui5-button>
```

Furthermore, this allows the displaying of two icons - to the start and to the end:
```html
<ui5-button icon="employee" end-icon="home">Button</ui5-button>
```


### ui5-calendar

| Changed item | Old                     | New                     | 
|--------------|-------------------------|-------------------------|
| Event        | `selected-dates-change` | `selection-change`      | 
| Range Selection | `ui5-date`           | `ui5-date-range`        | 

- The event `selected-dates-change ` is renamed to `selection-change`. In addition the event details
  `values` and `dates` are renamed to `selectedValues` and `selectedDateValues`.
  
  If you previously used the Calendar event as follows:
```ts
myCalendar.addEventListener("selected-dates-change", () => {
    const values = e.detail.values;
    const dates = e.detail.dates;
})
```

Now you have to use the new event name and details:
```ts
myCalendar.addEventListener("selection-change", () => {
   const values = event.detail.selectedValues;
   const dates = event.detail.selectedDateValues;
})
```

- The `dates` slot in the Calendar now works with a `ui5-date-range` when `selection-mode="Range"`.
If you previously defined date ranges as follows: 
```html
<ui5-calendar selection-mode="Range">
        <ui5-date value="Jan 20, 2021"></ui5-date>
        <ui5-date value="Jan 30, 2021"></ui5-date>
</ui5-calendar>
```

Now, they are declared using the `ui5-date-range`:
```html
<ui5-calendar selection-mode="Range">
	<ui5-date-range start-value="Jan 20, 2021" end-value="Jan 30, 2021"></ui5-date-range>
</ui5-calendar>
```

### ui5-card

| Changed item | Old       | New               | 
|--------------|-----------|-------------------|
| TS Interface | `ICardHeader`  | `CardHeader` type | 

 - The `ICardHeader` interface has been removed.
 
If you previously used the interface
```ts
import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
```
Use the CardHeader type instead:
```ts
import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
```

### ui5-card-header

| Changed item    | Old      | New                    | 
|-----------------|----------|------------------------|
| Property        | `status` | `additional-text` | 
| CSS Shadow part | `status` | `additional-text` | 

- The `status` property and its shadow part have been renamed.

If you previously used them:
```html
<style>
    .cardHeader::part(status) { ... }
</style>
<ui5-card-header status="3 of 10"></ui5-popover>
```

Now use `additionalText` instead:
```html
<style>
       .cardHeader::part(additional-text) { ... }
</style>
<ui5-card-header class="cardHeader" additional-text="3 of 10"></ui5-card-header>
```

### ui5-carousel

| Changed item | Old                                                        | New                    | 
|--------------|------------------------------------------------------------|------------------------|
| Property     | `pageIndicatorStyle`                                       | `pageIndicatorType` |
| Property     | `items-per-page-s`, `items-per-page-m`, `items-per-page-l` | `items-per-page` |


- The `pageIndicatorStyle` is no longer exists.

If you previously used it like:
```html
<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
```

Now you should use `pageIndicatorType` instead:
```html
<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
```

- Properties `items-per-page-s`, `items-per-page-m`, `items-per-page-l` are replaced by a single property `items-per-page`, which also adds `XL` size

If previously you have used:
```html
<ui5-carousel items-per-page-s="3" items-per-page-m="3" items-per-page-l="3">
```

Now use:
```html
<ui5-carousel items-per-page="S3 M3 L3 XL3">
```

### ui5-color-palette-popover

| Changed item | Old           | New           | 
|--------------|---------------|---------------|
| Method       | `openPopover` | N/A (removed) | 
| Method       | `showAt`      | N/A (removed) | 

- The `openPopover` and `showAt` methods are removed in favor of `open`  and `opener` properties.

If you previously used the imperative API:
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.showAt(this);
});
```

Now the declarative API should be used instead:
```html
<ui5-button id="opener">Open</ui5-button>
<ui5-color-palette-popover opener="opener">
```
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.open = !colorPalettePopover.open;
});
```

### ui5-color-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | `color` | `value` | 

- The property `color`  is renamed to `value`.

If you previously used the change event of the ColorPicker as follows:
```html
<ui5-color-picker color="red"></ui5-color-picker>
```

Now you have to use it like this:
```html
<ui5-color-picker value="red"></ui5-color-picker>
```


### ui5-checkbox

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 
| Property Default    | wrapping-type="Normal" | wrapping-type="None" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-checkbox value-state="Error"></ui5-checkbox>
<ui5-checkbox value-state="Warning"></ui5-checkbox>
<ui5-checkbox value-state="Success"></ui5-checkbox>
```

Now you have to use it like:
```html
<ui5-checkbox value-state="Negative"></ui5-checkbox>
<ui5-checkbox value-state="Critical"></ui5-checkbox>
<ui5-checkbox value-state="Positive"></ui5-checkbox>
```

- The `wrappintType` default value has been changed from `None` to `Normal` and the CheckBox text will wrap by default.

If you previously set `wrapping-type="Normal"`:
```html
<ui5-checkbox wrapping-type="Normal"></ui5-checkbox>
```

Now, it's unnecessary and can be removed as the text will wrap by default:
```html
<ui5-checkbox></ui5-checkbox>
```

If you previously did not use the property at all:
```html
<ui5-checkbox></ui5-checkbox>
```

Now, you need to set `wrapping-type="None"` to keep the text truncating:
```html
<ui5-checkbox wrapping-type="None"></ui5-checkbox>
```


### ui5-combobox

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" |
| Tag          | `ui5-cb-group-item`                 | `ui5-cb-item-group`                      |
| Grouping     | flat structure                      | nested structure                         |

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-combobox value-state="Error"></ui5-combobox>
<ui5-combobox value-state="Warning"></ui5-combobox>
<ui5-combobox value-state="Success"></ui5-combobox>
```

Now you have to use it like:
```html
<ui5-combobox value-state="Negative"></ui5-combobox>
<ui5-combobox value-state="Critical"></ui5-combobox>
<ui5-combobox value-state="Positive"></ui5-combobox>
```

- The `ui5-cb-group-item` web component has been replaced by `ui5-cb-item-group`. 
Furthermore, grouping is now implemented with a hierarchical structure, e.g. nesting.

If you previously used the `ui5-cb-group-item` web component as separator to define groups in a flat structure:
```html
<ui5-combobox placeholder="Select a country">
    <ui5-cb-group-item text="Asia"></ui5-cb-group-item>
    <ui5-cb-item text="Afghanistan"></ui5-cb-item>
    <ui5-cb-item text="China"></ui5-cb-item>
    <ui5-cb-group-item text="Europe"></ui5-cb-group-item>
    <ui5-cb-item text="Austria"></ui5-cb-item>
    <ui5-cb-item text="Bulgaria"></ui5-cb-item>
</ui5-combobox>
```

Now use the `ui5-cb-item-group` web component and nest `ui5-cb-item` web components inside to form a group
in a hierarchical structure:
```html
<ui5-combobox placeholder="Select a country">
    <ui5-cb-item-group header-text="Asia">
        <ui5-cb-item text="Algeria"></ui5-cb-item>
    </ui5-cb-item-group>

    <ui5-cb-item-group header-text="Europe">
        <ui5-cb-item text="Austria"></ui5-cb-item>
    </ui5-cb-item-group>
</ui5-combobox>
```

### ui5-cb-group-item

| Changed item | Old     | New       | 
|--------------|---------|-----------|
| Class        | `ComboBoxGroupItem`  `ComboBoxItemGroup ` | 
| Tag          | `ui5-cb-group-item` | `ui5-cb-item-group` |
| Property     | `text`              | `headerText`        |

Previously:
```ts
import "@ui5/webcompoennts/dist/ComboBoxGroupItem.js"
```

```html
  <ui5-cb-group-item text="Asia"></ui5-cb-group-item>
```

Now:
```ts
import "@ui5/webcompoennts/dist/ComboBoxItemGroup.js"
```

```html
  <ui5-cb-item-group header-text="Asia">
      <ui5-cb-item text="Algeria"></ui5-cb-item>
  </ui5-cb-item-group>
```


### ui5-date-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-date-picker value-state="Error"></ui5-date-picker>
<ui5-date-picker value-state="Warning"></ui5-date-picker>
<ui5-date-picker value-state="Success"></ui5-date-picker>
```

Now you have to use it like:
```html
<ui5-date-picker value-state="Negative"></date-picker>
<ui5-date-picker value-state="Critical"></date-picker>
<ui5-date-picker value-state="Positive"></ui5-date-picker>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Method     | openPicker, closePicker, isOpen| open | 


 - The methods `openPicker()`, `closePicker()` and `isOpen()` are replaced by `open` property. 

If you previously used `openPicker()`, `closePicker()` or `isOpen`:
```ts
const datePicker = document.getElementById("exampleID");
datePicker.openPicker();
datePicker.closePicker();
```

Now use the `open` property instead: 
```ts
const datePicker = document.getElementById("exampleID");
datePicker.open = true;
datePicker.open = false;
```

### ui5-date-time-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-datetime-picker value-state="Error"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Warning"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Success"></ui5-datetime-picker>
```

Now you have to use it like:
```html
<ui5-datetime-picker value-state="Negative"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Critical"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Positive"></ui5-datetime-picker>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Method     | openPicker, closePicker, isOpen| open | 

 - The methods `openPicker()`, `closePicker()` and `isOpen()` are replaced by `open` property. 

If you previously used `openPicker()`, `closePicker()` or `isOpen`:
```ts
const datetimePicker = document.getElementById("exampleID");
datetimePicker.openPicker();
datetimePicker.closePicker();
```

Now use the `open` property respectively: 
```ts
const datetimePicker = document.getElementById("exampleID");
datetimePicker.open = true;
datetimePicker.open = false;
```

### ui5-daterange-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-daterange-picker value-state="Error"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Warning"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Success"></ui5-daterange-picker>
```

Now you have to use it like:
```html
<ui5-daterange-picker value-state="Negative"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Critical"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Positive"></ui5-daterange-picker>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Method     | openPicker, closePicker, isOpen| open | 

 - The methods `openPicker()`, `closePicker()` and `isOpen()` are replaced by `open` property. 

If you previously used `openPicker()`, `closePicker()` or `isOpen`:
```ts
const dateRangePicker = document.getElementById("exampleID");
dateRangePicker.openPicker();
dateRangePicker.closePicker();
```

Now use the `open` property respectively: 
```ts
const dateRangePicker = document.getElementById("exampleID");
dateRangePicker.open = true;
dateRangePicker.open = false;
```

### ui5-dialog

| Changed item | Old                           | New                                | 
|--------------|-------------------------------|------------------------------------|
| Property     | state="Error/Warning/Success" | state="Negative/Critical/Positive" |
| Method       | isOpen, close, show           | `open` property                    |
| Property     | N/A                           | `preventInitialFocus` property     |
| Event        | after-open                    | open                               | 
| Event        | after-close                   | close                              | 

- The `show` and `close` public methods have been removed. Use the public property `open` instead.

If you previously used:

```js
dialog.show();
...
dialog.close();
```

use the `open` property instead:

```js
dialog.open = true;
...
dialog.open = false;
```


- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-dialog state="Error"></ui5-dialog>
<ui5-dialog state="Warning"></ui5-dialog>
<ui5-dialog state="Success"></ui5-dialog>
```

Now you have to use it like:
```html
<ui5-dialog state="Negative"></ui5-dialog>
<ui5-dialog state="Critical"></ui5-dialog>
<ui5-dialog state="Positive"></ui5-dialog>
```

- Methods `isOpen` and `close` are no longer present. Now `open` property can be used instead.

Previously:
```ts
let isOpen = dialog.isOpen();
dialog.close();
```
Now:
```ts
let isOpen = dialog.open;
dialog.open = false;
```

- Method `show` is no longer present. Use `open` property instead.

Previously:
```ts
dialog.show();
```
Now:
```ts
dialog.open = true;
```

- Parameter `preventInitialFocus` from method `show` is added as a property.

Previously:
```ts
dialog.show(true);
```
Now:
```ts
dialog.preventInitalFocus = true;
dialog.open = true;
```


- The events `after-close` and `after-open`  have been renamed to `open` and `close` respectively.

If you previously used the events like:
```ts
popover.addEventListener("after-open", (event) => {
});
popover.addEventListener("after-close", (event) => {
});
```
Now, you must use the new names:
```ts
popover.addEventListener("open", (event) => {
});
popover.addEventListener("close", (event) => {
});
```


### ui5-file-uploader

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-file-uploader value-state="Error"></ui5-file-uploader>
<ui5-file-uploader value-state="Warning"></ui5-file-uploader>
<ui5-file-uploader value-state="Success"></ui5-file-uploader>
```

Now you have to use it like:
```html
<ui5-file-uploader value-state="Negative"></ui5-file-uploader>
<ui5-file-uploader value-state="Critical"></ui5-file-uploader>
<ui5-file-uploader value-state="Positive"></ui5-file-uploader>
```

### ui5-icon

- The properties `interactive` and `accessibleRole`  have been removed
and replaced by property `mode` with the following values
- `Image` (default): the icon will have `role="img"`.
- `Interactive`: the icon will have `role="button"` and focus and press handling to enhance interactivity.
- `Decorative`: the icon will have `role="presentation"` and `aria-hidden="true"`, making it purely decorative without semantic content or interactivity.

If you previously used it like:
```html
<ui5-icon name="home" accessible-role="img"></ui5-icon>
<ui5-icon name="home" interactive></ui5-icon>
<ui5-icon name="home" accessible-role="presentation" aria-hidden="true"></ui5-icon>
```

Now use the new `mode` property instead:
```html
<ui5-icon name="home" mode="Image" ></ui5-icon>
<ui5-icon name="home" mode="Interactive"></ui5-icon>
<ui5-icon name="home" mode="Decorative"></ui5-icon>
```


### ui5-input

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" |
| Property     | `previewItem`                       | Removed                                  |
| Method       | `openPicker`                        | `open`                                   | 
| Event        | `suggestion-item-preview`           | `selection-change`                       | 
| Event        | `suggestion-item-select`            | Removed                                  | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-input value-state="Error"></ui5-input>
<ui5-input value-state="Warning"></ui5-input>
<ui5-input value-state="Success"></ui5-input>
```

Now you have to use it like:
```html
<ui5-input value-state="Negative"></ui5-input>
<ui5-input value-state="Critical"></ui5-input>
<ui5-input value-state="Positive"></ui5-input>
```

- The `openPicker` method has been removed and replaced by the `open` property.

If you previously used the `openPicker()` method to open the Input suggestions:
```js
input.openPicker();
```

Now, you must use the `open` property
```js
input.open = true;
```

- The `suggestion-item-preview` event has been renamed to `selection-change`

If you previously attached to the `suggestion-item-preview` event:
```js
input.addEventListener("suggestion-item-preview", event => { const { item, targetRef } = event.detail;});
```

Now you should attach to the `selection-change` event: 
```js
input.addEventListener("selection-change", event => { const { item, targetRef } = event.detail;});
```

**Note:** The event details remain the same. The only difference is that `item` and `targetRef` may be null, because the `selection-change` event is also fired when the input value no longer matches a selected suggestion.

- The `suggestion-item-select` event has been removed.

If you previously attached to the `suggestion-item-select` event to detect which suggestion item has been selected by the user: 
```js
input.addEventListener("suggestion-item-select", event => { 
	const suggestionItem = event.detail.item;
});
```

Now, attach to the `selection-change` event to get the selected item the `change` event
to check if the input value matches the selected item: 
```js
let suggestionItem;

input.addEventListener("selection-change", (event) => {
   suggestionItem = event.detail.item; 		 
});

input.addEventListener("change", (event) => {
  if(event.target.value && suggestionItem && 
     (event.target.value === suggestionItem.text)){
    // do something with the suggestion item
    console.log(suggestionItem);
  }
});
```

The property **previewItem**, which returned the current suggestion item on preview, is no longer present. The user can listen to the `selection-change` event to understand which suggestion item is on the preview. 


- The read-only property `previewItem` has been removed

If you previously used the `previewItem` read-only property to get the suggestion item under preview:
```js
const suggestionItemOnPreview = input.previewItem;
```

Now,  attach to the `selection-change` to get the previewed suggestion item: 
```js
input.addEventListener("selection-change", event => { 
	const suggestionItemOnPreview = event.detail.item;
});
```

### ui5-suggestion-item

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | `type`        | Removed| 
| Property     | `description` | Removed| 
| Property     | `icon`        | Removed| 
| Property     | `iconEnd`     | Removed| 
| Property     | `image`       | Removed|
| Property     | `additionalTextState` | Removed|

- The properties `type`, `description`, `icon`, `iconEnd`, `image`, and `additionalTextState` have been removed in favor of the newly introduced `ui5-suggestion-item-custom` web component that allows user-defined content.

If you previously used the `ui5-suggestion-item` web component and any of the removed properties:

```html
<ui5-input show-suggestions>
  <ui5-suggestion-item icon="home" description="my description"></ui5-suggestion-item>
</ui5-input>
```

Now use `ui5-suggestion-item-custom` web component with user-defined content and styles, for exmaple:
```html
<style>
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .titles {
    display: flex;
    flex-direction: column;
  }

  .green {
    color: green;
  }
</style>

<ui5-input show-suggestions>
    <ui5-suggestion-item-custom>
        <div class="content">
            <ui5-icon name="globe"></ui5-icon>
            <div class='titles'>
                <span>${generateHighlightedMarkup(country, value)}</span>
                <small>EU</small>
            </div>
      
            <span class='green'><b>EU</b></span>
        </div>
    </ui5-suggestion-item-custom>
</ui5-input>
```


### ui5-suggestion-group-item

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Class    | `SuggestionGroupItem`       | `SuggestionItemGroup`      | 
| Tag      | `ui5-suggestion-group-item` | `ui5-suggestion-group-item`| 
| Property | `text`                      | `headerText`               | 

- The `ui5-suggestion-group-item` web component has been replaced by `ui5-suggestion-item-group`. 
Furthermore, grouping is now implemented with a hierarchical structure, e.g. nesting.

If you previously used `ui5-suggestion-group-item` web component as a separator in a flat structure:
```js
import "@ui5/webcomponents/dist/SuggestionGroupItem.js";
```

```html
<ui5-input show-suggestions>
  <ui5-suggestion-group-item text="Group">
  <ui5-suggestion-item text="Group Item 1"></ui5-suggestion-item>
  <ui5-suggestion-item text="Group Item 2"></ui5-suggestion-item>
</ui5-input>
```

Now use the `ui5-suggestion-item-group` web component and nest `ui5-suggestion-item` web components inside:
```js
import "@ui5/webcomponents/dist/SuggestionItemGroup.js";
```

```html
<ui5-input show-suggestions>
  <ui5-suggestion-item-group header-text="Group">
      <ui5-suggestion-item text="Group Item 1"></ui5-suggestion-item>
      <ui5-suggestion-item text="Group Item 2"></ui5-suggestion-item>
  </ui5-suggestion-item-group>
</ui5-input>
```



### ui5-multi-combobox

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Event     | `open-change`        | `open`, `close`      |
| Tag       | `ui5-mcb-group-item` | `ui5-mcb-item-group` |
| Grouping  | flat structure       | nested structure     |
| Property  | `allowCustomValues`  | `noValidation`       |

- The `open-change` event has been replaced by `open` and `close` events, fired when the dropdown is opened or closed.

If you previously listened for `open-change`:
```js
input.addEventListener("open-change", (event) => {});
```

Now, you must attach for `open` and `close` events:
```js
input.addEventListener("open", (event) => {});
input.addEventListener("close", (event) => {});
```

- The `ui5-mcb-group-item` component has been replaced by `ui5-mcb-item-group`. 
Furthermore, grouping is now implemented with a hierarchical structure, e.g. nesting.

If you previously used the `ui5-mcb-group-item` web component as a separator to define groups in a flat structure:

```html
<ui5-multi-combobox placeholder="Select a country">
	  <ui5-mcb-group-item text="Asia"></ui5-mcb-group-item>
    <ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
    <ui5-mcb-item text="China"></ui5-mcb-item>
	  <ui5-mcb-group-item text="Europe"></ui5-mcb-group-item>
    <ui5-mcb-item text="Austria"></ui5-mcb-item>
    <ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
</ui5-multi-combobox>
```

Now, you must use the `ui5-mcb-item-group` web component and nest `ui5-mcb-item` web components inside to form a group
in a hierarchical structure:
```html
<ui5-multi-combobox placeholder="Select a country">
	<ui5-mcb-item-group text="Asia">
		<ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
		<ui5-mcb-item text="China"></ui5-mcb-item>
	</ui5-mcb-item-group>
	<ui5-mcb-item-group text="Europe">
		<ui5-mcb-item text="Austria"></ui5-mcb-item>
		<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
	</ui5-mcb-item-group>
</ui5-multi-combobox>
```


- The `allowCustomValues` property has been renamed to `noValidation`.

If you previously used the `allowCustomValues` property:

```html
<ui5-multi-combobox allow-custom-values></ui5-multi-combobox>
```

Now use `noValidation` instead:
```html
<ui5-multi-combobox no-validation></ui5-multi-combobox>
```

### ui5-multi-input

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" |
| Property     | `previewItem`                       | Removed                                  |
| Method       | `openPicker`                        | `open`                                   | 
| Event        | `suggestion-item-preview`           | `selection-change`                       | 
| Event        | `suggestion-item-select`            | Removed                                  | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-multi-input value-state="Error"></ui5-multi-input>
<ui5-multi-input value-state="Warning"></ui5-multi-input>
<ui5-multi-input value-state="Success"></ui5-multi-input>
```

Now you have to use it like:
```html
<ui5-multi-input value-state="Negative"></ui5-multi-input>
<ui5-multi-input value-state="Critical"></ui5-multi-input>
<ui5-multi-input value-state="Positive"></ui5-multi-input>
```

- The `openPicker` method has been removed and replaced by the `open` property.

If you previously used the `openPicker()` method to open the MultiInput suggestions:
```js
multiInput.openPicker();
```

Now, you must use the `open` property
```js
multiInput.open = true;
```

- The `suggestion-item-preview` event has been renamed to `selection-change`

If you previously attached to the `suggestion-item-preview` event:
```js
multiInput.addEventListener("suggestion-item-preview", event => { const { item, targetRef } = event.detail;});
```

Now you should attach to the `selection-change` event: 
```js
multiInput.addEventListener("selection-change", event => { const { item, targetRef } = event.detail;});
```

**Note:** The event details remain the same. The only difference is that `item` and `targetRef` may be null, because the `selection-change` event is also fired when the multiInput value no longer matches a selected suggestion.

- The `suggestion-item-select` event has been removed.

If you previously attached to the `suggestion-item-select` event to detect which suggestion item has been selected by the user: 
```js
multiInput.addEventListener("suggestion-item-select", event => { 
	const suggestionItem = event.detail.item;
});
```

Now, attach to the `selection-change` event to get the selected item the `change` event
to check if the multiInput value matches the selected item: 
```js
let suggestionItem;

multiInput.addEventListener("selection-change", (event) => {
   suggestionItem = event.detail.item; 		 
});

multiInput.addEventListener("change", (event) => {
  if(event.target.value && suggestionItem && 
     (event.target.value === suggestionItem.text)){
    // do something with the suggestion item
    console.log(suggestionItem);
  }
});
```

The property **previewItem**, which returned the current suggestion item on preview, is no longer present. The user can listen to the `selection-change` event to understand which suggestion item is on the preview. 


- The read-only property `previewItem` has been removed

If you previously used the `previewItem` read-only property to get the suggestion item under preview:
```js
const suggestionItemOnPreview = multiInput.previewItem;
```

Now,  attach to the `selection-change` to get the previewed suggestion item: 
```js
multiInput.addEventListener("selection-change", event => { 
	const suggestionItemOnPreview = event.detail.item;
});
```

### ui5-menu
| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | `busy` | `loading` | 
| Property     | `busyDelay` | `loadingDelay` | 
| Event     | `ater-open` | `open` | 
| Event     | `ater-close` | `close` | 

- The `busy` and `busyDelay` have been renamed to `loading` and `loadingDelay`.

If you previously used the `busy`, `busyDelay` properties:

```html
<ui5-menu header-text="My ui5-menu" busy busy-delay="100"><ui5-menu>
```

Now use `loading` and `loadingDelay` instead:

```html
<ui5-menu header-text="My ui5-menu" loading loading-delay="100"><ui5-menu>
```

- Event names `after-close` and `after-open` have been renamed `open` and `close`.

If previously subscribed to the events as follows:

```ts
menu.addEventListener("after-open", function() {
});
menu.addEventListener("after-close", function() {
});

```
Now use the new event names instead:

```ts
menu.addEventListener("open", function() {
});
menu.addEventListener("close", function() {
});
```



### ui5-menu-item
| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | `startsSection` | `ui5-menu-separator` | 
| Property     | `busy` | `loading` | 
| Property     | `busyDelay` | `loadingDelay` | 


- The `startsSection` property has been removed and replaced by a separator web component `ui5-menu-separator`.

If you previously used `startsSection` to identify the `ui5-menu-item` starts new section and draw a line before it: 
```html
<ui5-menu>
    <ui5-menu-item text="Item A"></ui5-menu-item>
    <ui5-menu-item text="Item B" starts-section></ui5-menu-item>
</ui5-menu>
```

Now, you can use the `ui5-menu-separator` as a regular item inside the `ui5-menu`:
```html
<ui5-menu>
    <ui5-menu-item text="Item A"></ui5-menu-item>
    <ui5-menu-separator></ui5-menu-separator>
    <ui5-menu-item text="Item B"></ui5-menu-item>
</ui5-menu>
```

- The `busy` and `busyDelay` have been renamed to `loading` and `loadingDelay`.

If you previously used the `busy` and `busyDelay` properties:

```html
<ui5-menu-item text="Open" icon="open-folder" busy busy-delay="100"><ui5-menu-item
```

Now use `loading` and `loadingDelay` instead:

```html
<ui5-menu-item text="Open" icon="open-folder" loading loading-delay="100"><ui5-menu-item>
```

### ui5-message-strip

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | design="Warning" | design="Critical" | 

- The property values `Warning`  are renamed to `Critical`. If you previously used it like:
```html
<ui5-message-strip design="Warning"></ui5-message-strip>
```
Now you have to use it like:
```html
<ui5-message-strip design="Critical"></ui5-message-strip>
```

### ui5-label

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property Default    | wrapping-type="Normal" | wrapping-type="None" | 

- The `wrappintType` default value has been changed from `None` to `Normal` and the Label will wrap by default.

If you previously set `wrapping-type="Normal"`:
```html
<ui5-label wrapping-type="Normal"></ui5-label>
```

Now, it's unnecessary and can be removed as the text will wrap by default:
```html
<ui5-label></ui5-label>
```

If you previously did not use the property at all:
```html
<ui5-label></ui5-label>
```

Now, you need to set `wrapping-type="None"` to keep the text truncating:
```html
<ui5-label wrapping-type="None"></ui5-label>
```


### ui5-li
| Changed item | Old     | New     | 
|--------------|---------|---------|
| Class     | StandardListItem | ListItemStandard | 
| Property     | highlight="Error/Warning/Success" | highlight="Negative/Critical/Positive" | 
| Property     | additionalTextState="Error/Warning/Success" | additional-text-state="Negative/Critical/Positive" | 
| Property | `image` | N/A (removed) | 
| Slot | `imageContent` | `image` | 
| Property Type | `accessibleRole="menuitem, listitem, treeitem"` | `accessibleRole="MenuItem, ListItem, TreeItem"` | 


- The web component class has been renamed from `StandardListItem` to `ListItemStandard`.

If you previously imported the class as follows:
```ts
import StandardListItem from "@ui5/webcomponents/StandardListItem.js";
```

Now, change the import to:
```ts
import ListItemStandard from "@ui5/webcomponents/ListItemStandard.js";
```


- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-li highlight="Error"></ui5-li>
<ui5-li highlight="Warning"></ui5-li>
<ui5-li highlight="Success"></ui5-li>
```

Now you have to use it like:
```html
<ui5-li highlight="Negative"></ui5-li>
<ui5-li highlight="Critical"></ui5-li>
<ui5-li highlight="Positive"></ui5-li>
```


- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-li additional-text-state="Error"></ui5-li>
<ui5-li additional-text-state="Warning"></ui5-li>
<ui5-li additional-text-state="Success"></ui5-li>
```

Now you have to use it like:
```html
<ui5-li additional-text-state="Negative"></ui5-li>
<ui5-li additional-text-state="Critical"></ui5-li>
<ui5-li additional-text-state="Positive"></ui5-li>
```

- The `image` property has been removed and the `imageContent` slot has been renamed to `image`.

If you previously used the `image` property:
```html
<ui5-li image="./img/HT-1022.jpg">Standard List Item</ui5-li>
```

or the `imageContent` slot:
```html
<ui5-li> Avatar inside imageContent slot
	<ui5-avatar slot="imageContent" shape="Square" initials="ABC" color-scheme="Accent2"></ui5-avatar>
</ui5-li>
```

Now use the `image` slot instead:
```html
<ui5-li> Avatar inside image slot
  <img src="" slot="image" />
</ui5-li>
```


- The `accessibleRole` property has been updated from a string type to an enum type `ListItemAccessibleRole`. The available options for the `ui5-li`:

- `ListItem`- Represents the ARIA role "listitem". (by default)
- `MenuItem`  -  Represents the ARIA role "menuitem".
- `TreeItem ` -  Represents the ARIA role "treeitem".
- `Option ` -  Represents the ARIA role "option".
- `None` - Represents the ARIA role "none".

If you previously used the lowercase values:
```html
<ui5-li accessible-role="menuitem"> List Item</ui5-li>
```

Now use the enum values instead:
```html
<ui5-li accessible-role="MenuItem"> List Item</ui5-li>
```


### ui5-li-custom

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Class     | CustomListItem | ListItemCustom | 

- The web component class has been renamed from `CustomListItem` to `ListItemCustom`.

If you previously imported the class as follows:
```ts
import CustomListItem from "@ui5/webcomponents/CustomListItem.js";
```

Now, change the import to:
```ts
import ListItemCustom from "@ui5/webcomponents/ListItemCustom.js";
```


### ui5-list

| Changed item | Old       | New                                                                  | 
|--------------|-----------|----------------------------------------------------------------------|
| Property     | `busy`      | `loading`                                                            | 
| Property     | `busyDelay` | `loadingDelay`                                                       |
| Property     | `mode`      | `selectionMode` + additionally the values of `ListMode` have changed |
| Property Type | `accessibleRole="menu, lsitbox, tree"` | `accessibleRole="Menu, ListBox, Tree"` | 
| Grouping      | flat structure | nested strucure |
| Enumaration     | `ListSeparators`      | `ListSeparator` |

 - The  `busy` and `busyDelay` properties have been renamed to `loading` and `loadingDelay`.
 
 If you previously used the `busy`, `busyDelay` properties:
```html
<ui5-list busy busy-delay="500"></ui5-list>
```

Now use  `loading` and `loadingDelay` instead:
```html
<ui5-list loading loading-delay="500"></ui5-list>
```

- The  `mode` propertie has been renamed to `selectionMode`. Additionally th mode values have changed.

If you previously used the `mode` property and the `ListMode` values:
```html
<ui5-list mode="SingleSelect">
<ui5-list mode="MultiSelect">
```

Now use `selectionMode`  and the `ListSelectionMode` values: `Single`, `Multiple`:
```html
<ui5-list selection-mode="Single">
<ui5-list selection-mode="Multiple">
```

- The enum `ListSeparators` has been renamed to `ListSeparator` (singular form).

If you previously imported the `ListSeparators`:
```ts
import ListSeparators from "@ui5/webcomponents/dist/types/ListSeparators.js";
import type ListSeparators from "@ui5/webcomponents/dist/types/ListSeparators.js";
```

Now, import the `ListSeparator` enumeration as follows:
```ts
import ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
import type ListSeparator from "@ui5/webcomponents/dist/types/ListSeparator.js";
```

- The grouping of list items is supported with different APIs - the `ui5-li-groupheader` web component is removed and groups can be formed with the `ui5-li-group`.

Instead of using `ui5-li-groupheader` as a separator in a flat structure:
```html
<ui5-list>
  <ui5-li-groupheader>Actions</ui5-li-groupheader>
  <ui5-li>Delete Product</ui5-li>
  <ui5-li>Audit Log Settings</ui5-li>
</ui5-list>
```

Use the `ui5-li-group` with the `header-text` property and nest `ui5-li` web components in the hierarchical structure:
```html
<ui5-list>
  <ui5-li-group header-text="Actions">
    <ui5-li>Delete Product</ui5-li>
    <ui5-li>Audit Log Settings</ui5-li>
  </ui5-li-group>
</ui5-list>
```

- The `accessibleRole` property has been updated from a string type to an enum type `ListAccessibleRole`. 
The available options for the `ui5-list`:
- `List`- Represents the ARIA role "list".  (by default)
- `Menu`  -  Represents the ARIA role "menu".
- `Tree` -  Represents the ARIA role "tree".
- `ListBox` - Represents the ARIA role "listbox".

If you previously used:
```html
<ui5-list accessible-role="tree"> List </ui5-list>
```
Now use the enum values instead:
```html
<ui5-list accessible-role="Tree"> List </ui5-list>
```

### ui5-link

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property Default    | wrapping-type="Normal" | wrapping-type="None" | 

- The `wrappintType` default value has been changed from `None` to `Normal` and the Link's text will wrap by default.

If you previously set `wrapping-type="Normal"`:
```html
<ui5-link wrapping-type="Normal"></ui5-link>
```
Now, it's unnecessary and can be removed as the text will wrap by default:
```html
<ui5-link></ui5-link>
```

If you previously did not use the property at all:
```html
<ui5-link></ui5-link>
```

Now, you need to set `wrapping-type="None"` to keep the text truncating:
```html
<ui5-link wrapping-type="None"></ui5-link>
```


### ui5-message-strip

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | design="Warning" | design="Critical" | 

- The property values `Warning`  are renamed to `Critical`.

If you previously used it like:
```html
<ui5-message-strip design="Warning"></ui5-message-strip>
```

Now you have to use it like:
```html
<ui5-message-strip design="Critical"></ui5-message-strip>
```



### ui5-multi-combobox

| Changed item                 | Old        | New           | 
|------------------------------|------------|---------------|
| Property                     | `allowCustomValues` | `noValidation` | 

- The `allowCustomValues` property has been renamed to `noValidation`.

If you previously used the `allowCustomValues` property
```html
<ui5-multi-combobox allow-custom-values></ui5-multi-combobox>
```

Now use `noValidation` instead:
```html
<ui5-multi-combobox no-validation></ui5-multi-combobox>
```


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-multi-combobox value-state="Error"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Warning"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Success"></ui5-multi-combobox>
```

Now you have to use it like:
```html
<ui5-multi-combobox value-state="Negative"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Critical"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Positive"></ui5-multi-combobox>
```


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Event        | `change` | `selection-change` | 

- The `change` event used to be fired while navigating between the suggestion items but not anymore since this is not considered a final change. The `change` event will be fired after the user confirms the changes in the input field - by `focusout`, pressing [Enter] key, or by selecting a suggestion item  (by clicking or pressing [Enter] key over an item).

If you previously used `change` to track live changes within the suggestions:
```ts
input.addEventListener("change", (event) => {
});
```

Now use the `selection-change` event instead:
```ts
input.addEventListener("selection-change", (event) => {
});
```


### ui5-option

| Changed item                 | Old        | New           | 
|------------------------------|------------|---------------|
| Property                     | `disabled` | N/A (removed) | 

 - The `disabled` property of the `ui5-option` is removed.

If you previously used the `disabled` property:
```html
<ui5-option disabled>Option</ui5-option>
```

Now, it won't take effect - rendering disabled options is not recommended from a UX perspective.

```html
<ui5-option>Option</ui5-option>
```

### ui5-popover

| Changed item                 | Old                    | New                                     | 
|------------------------------|------------------------|-----------------------------------------|
| Property                     | `horizontalAlign`      | values have changed, f.e. `Left` to `Start` | 
| Property                     | `placementType`        | `placement` | 
| `placement` type enumeration | `PopoverPlacementType` | `PopoverPlacement` | 
| Method                       | `isOpen`, `close`, `showAt`    | `open` property |
| Property                     | N/A                    | `preventInitialFocus` property |
| Property                     | `hideBackdrop`          | N/A (removed) |
| Event                        | after-open             | open  | 
| Event                        | after-close            | close  | 


- The `Left` and `Right` options have been renamed.

If you previously used them to set the placement or the alignment of the popover:
```html
<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
```

Now use `Start` or `End` instead:
```html
<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
```

 - The `placementType` property and the `PopoverPlacementType` enum have been renamed.

If you previously used the `placementType` property and the `PopoverPlacementType`
```html
<ui5-popover placement-type="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacementType.js";
```

Now use `placement` instead:
```html
<ui5-popover placement="Bottom"></ui5-popover>
```
```js
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
```

- Methods `isOpen` and `close` are no longer present. Use `open` property instead.

Previously:
```ts
let isOpen = popover.isOpen();
popover.close();
```
Now:
```ts
let isOpen = popover.open;
popover.open = false;
```

- Method `showAt` is no longer present. Use `open` and `opener` properties instead.

Previously:
```ts
popover.showAt(opener);
```
Now:
```ts
popover.opener = opener;
popover.open = true;
```

- Parameter `preventInitialFocus` from method `showAt` is added as a property.

Previously:
```ts
popover.showAt(opener, true);
```
Now:
```ts
popover.preventInitalFocus = true;
popover.opener = opener;
popover.open = true;
```

- Property `hideBackdrop` is removed.

Previously the application developers could define a modal popover without a visible backdrop as follows:
```html
<ui5-popover modal hide-backdrop>
```
Now the application developers can use the standard [`::backdrop` CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop)
```html
<style>
.transparentBackdrop::backdrop {
  background: transparent;
}
</style>

...

<ui5-popover modal class="transparentBackdrop">
```

- The events `after-close` and `after-open`  have been renamed to `open` and `close` respectively.

If you previously used the events like:
```ts
popover.addEventListener("after-open", (event) => {
});
popover.addEventListener("after-close", (event) => {
});
```

Now you have to use it like:
```ts
popover.addEventListener("open", (event) => {
});
popover.addEventListener("close", (event) => {
});
```

### ui5-progress-indicator

| Changed item | Old       | New          | 
|--------------|-----------|--------------|
| Property     | `disabled`  | N/A        | 

 - The `disabled` property of the `ui5-progress-indicator` is removed.

If you previously used the `disabled` property, it won't take effect:
```html
<ui5-progress-indicator disabled value="60"></ui5-progress-indicator>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-progress-indicator value-state="Error"></ui5-progress-indicator>
<ui5-progress-indicator value-state="Warning"></ui5-progress-indicator>
<ui5-progress-indicator value-state="Success"></ui5-progress-indicator>
```

Now you have to use it like:
```html
<ui5-progress-indicator value-state="Negative"></ui5-progress-indicator>
<ui5-progress-indicator value-state="Critical"></ui5-progress-indicator>
<ui5-progress-indicator value-state="Positive"></ui5-progress-indicator>
```

### ui5-radio-button


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 
| Property Default    | wrapping-type="Normal" | wrapping-type="None" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-radio-button value-state="Error"></ui5-radio-button>
<ui5-radio-button value-state="Warning"></ui5-radio-button>
<ui5-radio-button value-state="Success"></ui5-radio-button>
```
Now you have to use it like:
```html
<ui5-radio-button value-state="Negative"></ui5-radio-button>
<ui5-radio-button value-state="Critical"></ui5-radio-button>
<ui5-radio-button value-state="Positive"></ui5-radio-button>
```

- The `wrappintType` default value has been changed from `None` to `Normal` and the RadioButton text will wrap by default.
If you previously set `wrapping-type="Normal"`:
```html
<ui5-radio-button wrapping-type="Normal"></ui5-radio-button>
```
Now, it's not necessary and can be removed:
```html
<ui5-radio-button></ui5-radio-button>
```

Now, it's unnecessary and can be removed as the text will wrap by default:
```html
<ui5-radio-button></ui5-radio-button>
```

Now, you need to set `wrapping-type="None"` to keep the text truncating:
```html
<ui5-radio-button wrapping-type="None"></ui5-radio-button>
```

### ui5-select


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-select value-state="Error"></ui5-select>
<ui5-select value-state="Warning"></ui5-select>
<ui5-select value-state="Success"></ui5-select>
```

Now you have to use it like:
```html
<ui5-select value-state="Negative"></ui5-select>
<ui5-select value-state="Critical"></ui5-select>
<ui5-select value-state="Positive"></ui5-select>
```

### ui5-select-menu, ui5-select-menu-option

| Changed item    | Old               | New          | 
|-----------------|-------------------|--------------|
| Component      | `ui5-select-menu`  | Removed | 
| Component      | `ui5-select-menu-option` | `ui5-option-custom` | 


- The `ui5-select-menu` and `ui5-select-menu-option` components are removed. Custom options can now be created using the `ui5-option-custom`, directly placed inside the default slot of the `ui5-select`.

If you previously used the `ui5-select-menu` and `ui5-select-menu-option`:

```html
<ui5-select menu="selectMenu"></ui5-select>

<ui5-select-menu id="selectMenu">
    <ui5-select-menu-option>
        <div class="optionContent">custom</div>
    </ui5-select-menu-option>
</ui5-select-menu>
```

Now use `ui5-select` and `ui5-option-custom` instead:

```html
<ui5-select>
    <ui5-option-custom>
        <div class="optionContent">custom</div>
    </ui5-option-custom>
</ui5-select>
```


### ui5-segmented-button


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | mode | selectionMode |
| Property     | pressed | selected | 
| Readonly Property     | selectedItem | selectedItems | 

- The property `mode` has been renamed to `selectionMode`. The selection modes are renamed from `SingleSelect` and `MultiSelect` to `Single` and `Multiple`. 

If you previously used it as follows:
```html
<ui5-segmented-button mode="SingleSelect"></ui5-segmented-button>
<ui5-segmented-button mode="MultiSelect"></ui5-segmented-button>
```
Now you have to use:
```html
<ui5-segmented-button selection-mode="Single"></ui5-segmented-button>
<ui5-segmented-button selection-mode="Multiple"><ui5-segmented-button>
```

- The `pressed` property has been renamed `selected`.

If you previously used `pressed`:
```html
<ui5-segmented-button>
  <ui5-segmented-button-item pressed> Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 3</ui5-segmented-button-item>
</ui5-segmented-button>
```

Now use `selected` instead:
```html
<ui5-segmented-button>
  <ui5-segmented-button-item selected> Option 1</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 2</ui5-segmented-button-item>
  <ui5-segmented-button-item>Option 3</ui5-segmented-button-item>
</ui5-segmented-button>
```

- The read-only getter `selectedItem` has been replaced by `selectedItems` as multiple items can be selected.

### ui5-segmented-button-item

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | pressed | selected | 
| Property     | design | ---- | 
| Property     | iconEnd | ---- | 
| Property     | submits | ---- | 
| Property     | type | ---- | 
| Property     | accessibilityAttributes | ---- | 
| Property     | accessibleRole | ---- | 

- The property `pressed` has been renamed to `selected`.

If you previously used it as follows:
```html
<ui5-segmented-button id="segButton1">
	  <ui5-segmented-button-item>Item 1</ui5-segmented-button-item>
	  <ui5-segmented-button-item pressed>Item 2</ui5-segmented-button-item>
</ui5-segmented-button>
```

Now you have to use it as follows:
```html
<ui5-segmented-button id="segButton1">
	  <ui5-segmented-button-item>Item 1</ui5-segmented-button-item>
	  <ui5-segmented-button-item selected>Item 2</ui5-segmented-button-item>
</ui5-segmented-button>
```

- The property `design` has been inherited but never had effect and it's now removed.
- The property `iconEnd` has been inherited but never had effect and it's now removed.
- The property `submits` has been inherited but never had effect and it's now removed.
- The property `type` has been inherited but never had effect and it's now removed.
- The property `accessibilityAttributes` has been inherited but never had effect and it's now removed.
- The property `accessibleRole` has been inherited but never had effect and it's now removed.

### ui5-step-input

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-step-input value-state="Error"></ui5-step-input>
<ui5-step-input value-state="Warning"></ui5-step-input>
<ui5-step-input value-state="Success"></ui5-step-input>
```
Now you have to use it like:
```html
<ui5-step-input value-state="Negative"></ui5-step-input>
<ui5-step-input value-state="Critical"></ui5-step-input>
<ui5-step-input value-state="Positive"></ui5-step-input>
```

### ui5-split-button
| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | `activeIcon` | Removed | 

- The `activeIcon` property is no longer present as dropped by specs. The active icon used to be displayed while the SplitButton is pressed. This is a behavior that is not recommended from a UX point of view.

If you previosuly used `activeIcon`:
```html
<ui5-split-button icon="employee" active-icon="accept">Text</ui5-split-button>
```
Now, the property is not available and must not be set:
```html
<ui5-split-button icon="employee">Text</ui5-split-button>
```

### ui5-table

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Class        | `Table, TableCell, TableRow, TableColumn` | Moved | 

- The Table, TableCell, TableRow, and TableColumn that used to be part of the `@ui5/webcomponents` have been moved to a new package `@ui5/webcomponents-compat`. The classes are moved, but the tag names and the APIs remain the same.

If you previously used the Table from `@ui5/webcomponents`:
```ts
import "@ui5/webcomponents/dist/Table.js"; // ui5-table
import "@ui5/webcomponents/dist/TableColumn.js"; // ui5-table-column
import "@ui5/webcomponents/dist/TableRow.js"; // ui5-table-row`
import "@ui5/webcomponents/dist/TableGroupRow.js";` // ui5-table-group-row
import "@ui5/webcomponents/dist/TableCell.js"; // ui5-table-cell
```

Now, import the web components from `@ui5/webcomponents-compat` instead:

```ts
import "@ui5/webcomponents-compat/dist/Table.js"; // ui5-table
import "@ui5/webcomponents-compat/dist/TableColumn.js"; // ui5-table-column
import "@ui5/webcomponents-compat/dist/TableRow.js"; // ui5-table-row`
import "@ui5/webcomponents-compat/dist/TableGroupRow.js";` // ui5-table-group-row
import "@ui5/webcomponents-compat/dist/TableCell.js"; // ui5-table-cell
```

Or, switch to the new `v2 Table` - the successor or the `v1 Table`:
There is a brand new Table implementation in the `@ui5/webcomponents` package available since version 2.0 that will be the successor of the Table from version 1.0. However, for a short period the newly introduced `v2 Table` will be `experimental` (its API is subject to change) and until we productize it, we will maintain the `v1 Table` inside the `@ui5/webcomponents-compat` package.
After removing the `experimental` flag of the `v2 Table`, we will deprecate and remove the `v1 Table`.


### ui5-time-picker


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 
| Method     | `openPicker`, `closePicker` & `isOpen` | `open`| 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-time-picker value-state="Error"></ui5-time-picker>
<ui5-time-picker value-state="Warning"></ui5-time-picker>
<ui5-time-picker value-state="Success"></ui5-time-picker>
```

Now you have to use it like:
```html
<ui5-time-picker value-state="Negative"></ui5-time-picker>
<ui5-time-picker value-state="Critical"></ui5-time-picker>
<ui5-time-picker value-state="Positive"></ui5-time-picker>
```

- The methods `openPicker()`, `closePicker()`, and `isOpen()` have been removed in favor of the `open` property.

If you previously used `openPicker()` and `closePicker()` to toggle the TimePicker:
```ts
timePicker.openPicker();
timePicker.closePicker();
```

Now, you must use the `open` property to toggle the TimePicker:
```ts
timePicker.open = true;
timePicker.open = false;
```



### ui5-tab-container

| Changed item                | Old                            | New                   | 
|-----------------------------|--------------------------------|-----------------------|
| Property                    | `fixed`                        | N/A (removed)         |
| Property                    | `tabsOverflowMode`             | `overflowMode`        |
| Type for `backgroundDesign` | `TabContainerBackgroundDesign` | `BackgroundDesign`    |
| Property                    | `showOverflow`                 | `overflowButton` slot |
| TS interface                | `ITab`                         | N/A (removed)         |

 - The property `fixed` has been removed and there is no alternative provided. The TabContainer is no longer expandable/collapsible via use interaction. You can still show the TabContainer in collapsed mode via the `collapsed` property.

 - The property `tabsOverflowMode` has been renamed to `overflowMode`.

If you previously used:
```html
<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
```
Now use:
```html
<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
```

- If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.

- The `showOverflow` property has been removed removed. 

If previously you have used:
```html
<ui5-tabcontainer show-overflow></ui5-tabcontainer>
```

Now use the `overflowButton` slot instead:
```html
<ui5-tabcontainer>
	<ui5-button slot="startOverflowButton" id="startOverflowButton">Start</ui5-button>
	<ui5-button slot="overflowButton" id="endOverflowButton">End</ui5-button>
</ui5-tabcontainer>
```

 - You can no longer import and implement the `ITab` interface. TabContainer is designed to work only with Tab and TabSeparator classes and the interface has been obsolete.

### ui5-tab

| Changed item  | Old                   | New                | 
|---------------|-----------------------|--------------------|
| Method | `getTabInStripDomRef`        | `getDomRefInStrip` |
| Slot   | `subTabs`                    | `items`            |


- The `getTabInStripDomRef` method has been renamed to `getDomRefInStrip`.

If previously you have used:
```js
someTab.getTabInStripDomRef();
```
Now use:
```js
someTab.getDomRefInStrip();
```

- The `subTabs` slot has been renamed to `items`.

If you previously used:
```html
<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
```

Now use the slot name:
```html
<ui5-tab id="nestedTab" slot="items"></ui5-tab>
```

### ui5-tab-separator

| Changed item  | Old   | New | 
|---------------|-------|-----|
| Method | `getTabInStripDomRef` | `getDomRefInStrip` |

- The getTabInStripDomRef` method has been renamed to `getDomRefInStrip`.

If previously used:
```js
someTabSeparator.getTabInStripDomRef();
```

Now use:
```js
someTabSeparator.getDomRefInStrip();
```

### ui5-textarea

| Changed item | Old       | New                                                                 | 
|--------------|-----------|---------------------------------------------------------------------|
| Property     | `growingMaxLines`      | `growingMaxRows` |

 - The `growingMaxLines` property has been renamed to `growingMaxRows`.

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-textarea value-state="Error"></ui5-textarea>
<ui5-textarea value-state="Warning"></ui5-textarea>
<ui5-textarea value-state="Success"></ui5-textarea>
```

Now you have to use it like:
```html
<ui5-textarea value-state="Negative"></ui5-textarea>
<ui5-textarea value-state="Critical"></ui5-textarea>
<ui5-textarea value-state="Positive"></ui5-textarea>
```

### ui5-title

| Changed item  | Old   | New | 
|---------------|-------|-----|
| `wrappingType` default value | `None` | `Normal` |

- The default value of the `wrappingType` property has been changed from `None` to `Normal`.

Previously long texts would truncate if there is not enough space:
```html
<ui5-title>some very very very long title</ui5-title> <!-- text will truncate if there is not enough space -->
```

Now, long texts would wrap:
```html
<ui5-title>some very very very long title</ui5-title> <!-- text will wrap if there is not enough space -->
```
And you need to set `wrapping-type="None"` explicitly to make it truncate as before:
```html
<ui5-title wrapping-type="None">some very very very long title</ui5-title> <!-- will truncate the text -->
```


### ui5-tree

| Changed item | Old       | New                                                                  | 
|--------------|-----------|----------------------------------------------------------------------|
| Property     | `mode`    | `selectionMode` + additionally the values of `ListMode` have changed |


- The property `mode` has been renamed to `selectionMode`. Also, the mode values have changed.

If you previously used the `mode` property and the `ListMode` values:
```html
<ui5-tree mode="SingleSelect">
<ui5-tree mode="MultiSelect">
```

Now use `selectionMode`  and `Single`, `Multiple`, and the `ListSelectionMode` values instead:
```html
<ui5-tree selection-mode="Single">
<ui5-tree selection-mode="Multiple">
```

### ui5-tree-item


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | highlight="Error/Warning/Success" | highlight="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-tree-item highlight="Error"></ui5-tree-item>
<ui5-tree-item highlight="Warning"></ui5-tree-item>
<ui5-tree-item highlight="Success"></ui5-tree-item>
```

Now you have to use it like:
```html
<ui5-tree-item highlight="Negative"></ui5-tree-item>
<ui5-tree-item highlight="Critical"></ui5-tree-item>
<ui5-tree-item highlight="Success"></ui5-tree-item>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | additional-text-state="Error/Warning/Success" | additional-text-state="Negative/Critical/Positive" | 

- The `valueState` property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`.

If you previously used it like:
```html
<ui5-tree-item additional-text-state="Error"></ui5-tree-item>
<ui5-tree-item additional-text-state="Warning"></ui5-tree-item>
<ui5-tree-item additional-text-state="Success"></ui5-tree-item>
```

Now you have to use it like:
```html
<ui5-tree-item additional-text-state="Negative"></ui5-tree-item>
<ui5-tree-item additional-text-state="Critical"></ui5-tree-item>
<ui5-tree-item additional-text-state="Positive"></ui5-tree-item>
```

### ui5-toast

| Changed item | Old          | New    | 
|--------------|--------------|--------|
| Event        | `after-close`| `close`| 
| Method       | `show`       | `open` | 

- The `after-close` event has been renamed to `close`.

If you previously used it like:
```ts
toast.addEventListener("after-close", (event) => {
});
```

Now you have to use it like:
```ts
toast.addEventListener("close", (event) => {
});
```

- The `show` method has been replaced by `open` property.

If you previously used the `show()` method:
```ts
toast.show();
```
Now, you must use the `open` property:

```ts
toast.open=true;
```


### ui5-toolbar-button

| Changed item | Old          | New    | 
|--------------|--------------|--------|
| Property     | `iconEnd`  | `endIcon`| 

- The boolean property `iconEnd` that is used to define the placement of the icon (to the start or to the end)
 has been replaced by string property `endIcon`, defining the icon, displayed at the end.

If you previously set `icon` and `icon-end` to display an icon after the ToolbarButton's text:
```html
<ui5-toolbar-button icon="home" icon-end>Button</ui5-toolbar-button>
```

Now, you must use the new property:
```html
<ui5-toolbar-button end-icon="home">Button</ui5-toolbar-button>
```

Furhtermore, this allows the displaying of two icons - to the start and to the end:
```html
<ui5-toolbar-button icon="employee" end-icon="home">Button</ui5-toolbar-button>
```

## @ui5/webcomponents-fiori

### ui5-bar

- The `ui5-bar` component is now in `main` library.

If you previously imported  the `ui5-bar` from `fiori`:
```ts
import "@ui5/webcomponents-fiori/dist/Bar.js;
```

Now, import the `ui5-bar` from `main`:
```ts 
import "@ui5/webcomponents/dist/Bar.js";
```

### ui5-barcode-scanner-dialog

| Changed item  | Old       | New             | 
|---------------|-----------|-----------------|
| Method | `show()`  | `open` property |
| Method | `close()` | `open` property |

- The `show` and `close` public methods have been removed. Use the public property `open` instead.

If you previously used
```js
bsd.show();
bsd.close();
```

Now use the `open` property instead:
```js
bsd.open = true;
...
bsd.open = false;
```


### ui5-flexible-column-layout

| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `accessibilityTexts` | removed |
| Property     | `accessibilityRoles` | removed |
| Property     | `hideArrows` | `disableResizing` |
| Event Detail     | `arrowUsed`, `arrowsUsed`, `resize` | `separatorsUsed`, `resized` |

- The `accessibilityTexts` and `accessibilityRoles` properties of the `ui5-flexible-column-layout` have been removed.

If you previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
fcl.accessibilityTexts = {
    startColumnAccessibleName: "Products list",
    midColumnAccessibleName: "Product information",
    endColumnAccessibleName: "Product detailed information",
    startArrowLeftText: "Collapse products list",
    startArrowRightText: "Expand products list",
    endArrowLeftText: "Expand product detailed information",
    endArrowRightText: "Collapse product detailed information",
    startArrowContainerAccessibleName: "Start Arrow Container",
    endArrowContainerAccessibleName: "End Arrow Container",
}

fclAccRoles.accessibilityRoles = {
    startColumnRole: "complementary",
    startArrowContainerRole: "navigation",
    midColumnRole: "main",
    endArrowContainerRole: "navigation",
    endColumnRole: "complementary".
}
```

Now use `accessibilityAttributes` instead:
```js
fcl.accessibilityAttributes = {
    startColumn: {
      role: "complementary"
      name: "Products list",
    },
    midColumn: {
      role: "complementary"
      name: "Product information",
    },
    endColumn: {
      role: "complementary"
      name: "Product detailed information",
    },
    startSeparator: {
      role: "navigation",
      name: "Start Separator",
    },
    endSeparator: {
      role: "navigation",
      name: "End Separator",
    },
};
```

- The `arrowUsed` and `arrowsUsed` details of the `layoutChange` event have been replaced by the `separatorsUsed` detail.

If you previously used:
```js
fcl.addEventListener("layout-change", function(e) {
   const isUserInteraction = e.detail.arrowsUsed;
}
```

Now use the new parameter instead:
```js
fcl.addEventListener("layout-change", function(e) {
   const isUserInteraction = e.detail.separatorsUsed; 
}
```

- The `resize` parameter of the `layoutChange` event has been renamed to `resized`.

If you previously used:
```js
fcl.addEventListener("layout-change", function(e) {
  const isGlobalResize = e.detail.resize;
}
```

Now use the new name:

```js
fcl.addEventListener("layout-change", function(e) {
  const isGlobalResize = e.detail.resized;
}
```

- The property `hideArrows` has been renamed to `disableResizing`.

If you previously used `hideArrows`:
```html
<ui5-flexible-column-layout hide-arrows/>
```

Now use `disableResizing` instead:
```
<ui5-flexible-column-layout disable-resizing/>
```


### ui5-illustrated-message

| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `size` | `design` |
| Property     | `titleLevel` | `level` |

- The `size` property of the `ui5-illustrated-message` is renamed to `design`.

If you previously used the `size` property:
```html
<ui5-illustrated-message size="Dialog">
```
Now use `design` instead:
```html
<ui5-illustrated-message design="Dialog">
```

- The `titleLevel` property has been removed and replaced by `title` slot allowing user-defined titles with the desired title level.

If you previously used the `titleLevel` property:
```html
<ui5-illustrated-message title-level="H6></ui5-illustrated-message>
```

Now use the `title` slot and define your title and title level:

```html
<ui5-illustrated-message>
      <ui5-title slot="title" level="H3">This is a slotted title</ui5-title>
</ui5-illustrated-message>
```



### ui5-shellbar

| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `accessibilityTexts` | removed |
| Property     | `accessibilityRoles` | removed |

- The `accessibilityTexts` and `accessibilityRoles` properties of the `ui5-shellbar` are removed.

If you previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
shellbar.accessibilityTexts = {
    profileButtonTitle: "John Dow",
    logoTitle: "Custom logo title",
}

shellbar.accessibilityRoles = {
		logoRole: "link"
};
```

Now use `accessibilityAttributes` instead:
```js
shellbar.accessibilityAttributes = {
    profile: {
      name:  "John Dow",
    },
    logo: {
      role: "link"
      name: "Custom logo title"
    },
};
```

### ui5-side-navigation-item
| Changed item | Old    | New           | 
|--------------|--------|---------------|
| Property     | `wholeItemToggleable` | N/A (removed) |

- The `wholeItemToggleable` property is now removed. The functionality of clicking the whole item to show/hide the sub-items is no longer available.
- The collapsing/expanding of the item can still be done by pressing the icon.

### ui5-notification-list

- Although the `ui5-list` still exists, the new `ui5-notification-list` web component should be used as a container for `ui5-li-notification` and `ui5-li-notification-group` web components.

If you previously used notifications inside `ui5-list`:
```html
<ui5-list>
 <ui5-li-notification>
...
```

Now, for better accessibility, use the `ui5-notification-list` instead:
```html
<ui5-notification-list>
  <ui5-li-notification>
...
```

### ui5-li-notification

| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `priority` | `state` |
| Property     | `busy` | `loading` |
| Property     | `busyDelay` | `loadingDelay` |
| Property     | N/A | `importance` |
| Slot     | `actions` | `menu` |

- The `priority` property of the `ui5-li-notification` is replaced by the new property `state`.

If you previously used the `priority` property:
```html
<ui5-li-notification priority="Medium">
```

Now use `state` instead:
```html
<ui5-li-notification state="Critical">
```

 - The `busy`, `busyDelay` properties have been renamed to `loading` and `loadingDelay`.
 
 If you previously used the `busy`, `busyDelay` properties:
```html
<ui5-li-notification busy busy-delay="500"></ui5-li-notification>
```

Now you must use `loading` and `loadingDelay` properties:
```html
<ui5-li-notification loading loading-delay="500"></ui5-li-notification>
```

- The `actions` slot of the `ui5-li-notification` is replaced by the new slot `menu`.

If you previously used the `actions` slot:
```html
<ui5-li-notification>
  <ui5-notification-action slot="actions" icon="message-error"	text="Reject">
  </ui5-notification-action>
```
Now use `menu` instead:
```html
<ui5-li-notification>
  <ui5-menu slot="menu">
    <ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
  </ui5-menu>
```

### ui5-li-notification-group
| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `showClose` | N/A (removed) |
| Property     | `showCounter` | N/A (removed) |
| Property     | `priority` | N/A (removed) |
| Property     | `busy` | `loading` |
| Property     | `busyDelay` | `loadingDelay` |
| Event     | `close` | N/A (removed) |
| Slot     | `actions` | N/A (removed) |

 - The properties "showClose", "showCounter", "priority", the event "close" and the slot "actions" are removed and there are no alternatives provided. The NotificationGroup no longer shows a "Close" button, counter text, priority, and actions.

- The `busy` and `busyDelay` properties have been renamed to `loading` and `loadingDelay` properties.

If you previously used the `busy`, `busyDelay` properties:
```html
<ui5-li-notification-group busy busy-delay="500"></ui5-li-notification-group>
```

Now,  use `loading` and `loadingDelay` instead:
```html
<ui5-li-notification-group loading loading-delay="500"></ui5-li-notification-group>
```

### ui5-page
| Changed item | Old                  | New               
| Property    | `disableScrolling`    | `noScrolling`   |
| Property    | `floatingFooter`      | `fixedFooter`   |

- The `disableScrolling` property has been renamed to `noScrolling`.

If you previously used the `disableScrolling` property:
```html
<ui5-page disable-scrolling> </ui5-page>
```

Now use `noScrolling` instead:
```html
<ui5-page no-scrolling> </ui5-page>
```

- The `floatingFooter` property has been replaced by `fixedFooter` to change the default behavior.
By default, the footer will float
  
If you previously used the `floatingFooter` property to have a floating footer:
```html
<ui5-page floating-footer>
  <ui5-bar slot="footer" design="FloatingFooter"></ui5-bar>
</ui5-page>
```

Now, that is the default behavior:
```html
<ui5-page>
  <ui5-bar slot="footer" design="Footer"></ui5-bar>
</ui5-page>
```

Furthermore, to get a fixed footer that is always placed at the very bottom of the page, use `fixedFooter` instead:
```html
<ui5-page fixed-footer>
  <ui5-bar slot="footer" design="Footer"></ui5-bar>
</ui5-page>
```


### ui5-upload-collection

| Changed item            | Old                                         | New                                  | 
|-------------------------|---------------------------------------------|--------------------------------------|
| Property                | `mode`                                      | `selectionMode`                      |
| Enum `mode`             | values: `SingleSelect`, `MultiSelect`, etc. | values: `Single`, `Multiple`, etc.   |
| Property                | `selectionMode`                             | no longer accepts `Delete` value     |
| TS Interface            | `IUploadCollectionItem`                     | `UploadCollectionItem` type          |

- The `mode` property has been renamed to `selectionMode`. Also, the mode values have changed.

If you previously used the `mode` property and the `SingleSelect`, `MultiSelect` values:
```html
<ui5-upload-collection mode="SingleSelect">
<ui5-upload-collection mode="MultiSelect">
```

Now use the `selectionMode` property and `Single`, `Multiple` values instead:
```html
<ui5-upload-collection selection-mode="Single">
<ui5-upload-collection selection-mode="Multiple">

```

- The `selectionMode` property no longer accepts "Delete" as a value.

If you previously used it:
```html
<ui5-upload-collection selection-mode="Delete"></ui5-upload-collection>
```

Now omit it completely and use `hide-delete-button` on the ui5-upload-collection:
```html
<ui5-upload-collection>
   <ui5-upload-collection-item hide-delete-button>  </ui5-upload-collection-item>
</ui5-upload-collection>
```

- Removed the `IUploadCollectionItem` interface.

If you previously used the interface:
```js
import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
```

Now use the `UploadCollectionItem` type instead:
```js
import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
```

### ui5-view-settings-dialog

| Changed item  | Old       | New             | 
|---------------|-----------|-----------------|
| Method | `show()`  | `open` property |
| Method | `close()` | `open` property |

- The `show` and `close` public methods have been removed. Use the public property `open` instead.

If you previously used:
```js
vsd.show();
...
vsd.close();
```

Now use the `open` property instead:
```js
vsd.open = true;
...
vsd.open = false;
```

### ui5-wizard

| Changed item  | Old       | New             | 
|---------------|-----------|-----------------|
| Event Detail | `changeWithClick`  | `withScroll` property |

- The `changeWithClick` event detail has been renamed to `withScroll`.

If you previously listened for the `step-change` event and used the `changeWithClick`:
```ts
wizard.addEventListener("step-change", () => {
    const stepChangedWithClick = e.detail.changeWithClick;
})
```

Now you have to use the new event name and details:
```ts
wizard.addEventListener("step-change", () => {
    const stepChangedWithScroll = e.detail.withScroll;
})
```


## @ui5/webcomponents-icons

| Changed item | Old            | New           | 
|--------------|----------------|---------------|
| Icon         | `soccor`       | `soccer`      | 
| Icon         | `add-polygone` | `add-polygon` | 
| Export       | `pathData`     | `getPathData` | 

- Removed `soccor` icon. Use `soccer` instead.
- Removed `add-polygone` icon. Use `add-polygon` instead.
- Icons now export `getPathData` async method, instead of the `pathData` string.

If you imported the `pathData`, for example:
```js
import { pathData } from "@ui5/webcomponents-icons/dist/accept.js";
console.log(pathData); // String containing the SVG path
```

Now, you must change your code to, for example:
```js
import { getPathData } from "@ui5/webcomponents-icons/dist/accept.js";
getPathData().then(pathData => {
  console.log(pathData); // String containing the SVG path
});
```

## @ui5/create-webcomponents-package

| Changed item       | Old                 | New                             | 
|--------------------|---------------------|---------------------------------|
| `npm init` option  | `JavaScript`        | `N/A` (removed)                 | 

 - The JavaScript template option has been removed.

If you previously ran `npm init @ui5/webcomponents-package` to create a JS-based project
the command will create a TypeScript-based project.

- The TypEscript option `--enable-typescript` has been removed.

If you previously used `npm init @ui5/webcomponents-package --enable-typescript` to create a TypeScript-based project, now it's by default

## Other

| Changed item       | Old                 | New                             | 
|--------------------|---------------------|---------------------------------|
| Code Documentation | `API.json`          | `custom-elements-manifest.json` | 
| Assets file        | `Assets-static.js`  | `Assets.js` (dynamic)           |


 - The JSDoc plugin has been removed, and the generation of `api.json` has stopped.
 
 If you previously relied on the `{package}/dist/api.json file`, now use the `{package}/dist/custom-elements.json`.

 - All `Assets-static.js` modules have been removed.
 
 If you previously imported any `Assets-static.js` module from any package:
```ts
import "@ui5/webcomponents/dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js"
import "@ui5/webcomponents-icons-tnt/dist/Assets-static.js"
import "@ui5/webcomponents-icons-business-suite/dist/Assets-static.js"
import "@ui5/webcomponents-localization/dist/Assets-static.js"
import "@ui5/webcomponents-theming/dist/Assets-static.js"
```

Now use the dynamic equivalent of it:
```ts
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js";
import "@ui5/webcomponents-icons-tnt/dist/Assets.js";
import "@ui5/webcomponents-icons-business-suite/dist/Assets.js";
import "@ui5/webcomponents-localization/dist/Assets.js";
import "@ui5/webcomponents-theming/dist/Assets.js"
```
