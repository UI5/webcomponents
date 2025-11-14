# Custom Elements Manifest

This article describes the prerequisites for **Custom Elements Manifest** generation and how the custom analyzer works for UI5 Web Components project and third-party projects.

To produce a `custom-elements.json` file for a specific package, all public and exported classes, enumerations, interfaces, etc. must have valid JSDoc based on the guidelines in this article. The analyzer doesn't fully rely on TypeScript, so some aspects need to be described explicitly with JSDoc.

**Note:** The generated `custom-elements.json` contains only public API - everything else is stripped out.

## JSDoc Validation

UI5 Web Components packages that have JSDoc can be validated to ensure they follow the correct format and completeness. This validation can be enabled by setting `dev` to `true` inside the `package-scripts.js` file in the root folder.

```json
const options = {
	...
	dev: true,
	...
};

```

## JSDoc Tags Reference

### Table of Contents

1. [Class tags](#class-tags)
2. [Property and getter (readonly property) tags](#property-and-getter-readonly-property-tags)
3. [Slot tags](#slot-tags)
   - [Property slot](#property-slot)
   - [Unnamed slot](#unnamed-slot)
4. [Event tags](#event-tags)
   - [Event declaration tags](#event-declaration-tags)
   - [Event parameter tags](#event-parameter-tags)
5. [Method tags](#method-tags)
6. [CSS Part](#css-part)
7. [Enum and enum member tags](#enum-and-enum-member-tags)
8. [Interface tags](#interface-tags)

---


### Class tags

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@class` | Defines the constructor | boolean | `@class` |
| `@constructor` | Alternative to `@class` | boolean | `@constructor` |
| `@public` / `@protected` / `@private` | Defines the privacy of the class | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the class was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the class is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |
| `@abstract` | Defines whether the component is abstract (doesn't have ShadowDOM) | boolean | `@abstract` |
| `@implements` | Defines the interfaces that the component implements | - | `@implements {ShowcaseType}` |
| `@extends` | Defines the superclass of the component | - | `@extends ShowcaseType` |
| `@slot` | Defines unnamed slots | - | [See unnamed slot section](#unnamed-slot) |
| `@csspart` | Defines CSS parts | - | [See CSS part section](#css-part) |

```ts
/**
 * @class
 * Class description showcase
 *
 * @slot {ShowcaseType[]} default - Unnamed slot description showcase
 *
 * @csspart testPart - CSS Part description showcase
 *
 * @constructor
 * @extends UI5Element
 * @since 1.2.0
 * @deprecated 1.4.0
 * @public
 * @abstract
 * @implements {ShowcaseType}
 * @implements {ShowcaseType2}
 */
@customElement("ui5-test-component")
class TestComponent extends UI5Element implements ShowcaseType, ShowcaseType2 {
```

**Notes:**
- If the component implements more than 1 interface, use `@implements` tag for every interface instead of separating them with commas

### Property and getter (readonly property) tags

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@public` / `@protected` / `@private` | Defines the privacy of the property | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the property was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the property is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |
| `@default` (required for public properties/getters) | Defines the default value of the property | string | `@default "myDefaultValue"` |
| `@formProperty` | Defines whether the property value should be used in a form (Angular / React) | boolean | `@formProperty` |
| `@formEvents` | Defines which events should change property value | string | `@formEvents change input` |

```ts
/**
 * Property description showcase
 *
 * @public
 * @since 1.2.0
 * @deprecated 1.4.0
 * @default "myDefaultValue"
 * @formProperty
 * @formEvents change input
 */
@property()
property!: string;
```

**Notes:**
- Type is automatically calculated from the accessor name
- Default value is automatically calculated from the accessor name

### Slot tags

#### Property slot

A property slot is a slot that has an accessor.

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@public` / `@protected` / `@private` | Defines the privacy of the slot | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the slot was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the slot is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |

```ts
/**
 * Property slot description showcase
 *
 * @public
 * @since 1.2.0
 * @deprecated 1.4.0
 */
@slot({ type: HTMLElement, "default": true })
propertySlot!: Array<IIcon>;
```

**Notes:**
- Type is automatically calculated from the accessor type
- If the **default** is set to true inside the decorator, the slot will appear as default

#### Unnamed slot

An unnamed slot is the default slot that doesn't have an accessor. This slot is declared inside the class comment using the `@slot` tag.

```ts
/**
 * @class
 * ...
 *
 * @slot {ShowcaseType[]} default - Unnamed slot description showcase
 * ...
 */
@customElement("ui5-test-component")
class TestComponent extends UI5Element {
```

#### Event declaration tags

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@param` | Defines the event details parameters | - | `@param {ShowcaseType} testParameter description` |
| `@public` / `@protected` / `@private` | Defines the privacy of the event | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the event was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the event is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |
| `@allowPreventDefault` | Defines whether the event is preventable | boolean | `@allowPreventDefault` |
| `@native` | Defines whether the event is a native event | boolean | `@native` |

```ts
/**
 * Event description showcase
 * @public
 * @since 1.2.0
 * @deprecated 1.4.0
 * @param {ShowcaseType} testParameter description
 * @allowPreventDefault
 * @native
 */
@event("eventWithDetails", {
	detail: {
		/**
		 * @public
		 * @since 1.2.0
		 * @deprecated 1.4.0
		 */
		testParameter: { type: HTMLElement }
	},
})
class TestComponent extends UI5Element {
    eventDetails!: {
        "click": ClickEventDetail,
    };
```

By default, all events are treated as custom events without specific type for the event deatils. If you need to provide custom event details types, they should be described in the `eventDetails` property of the class.


#### Event parameter tags

You can specify additional metadata for event parameters:

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@public` / `@protected` / `@private` (required if there is a `@param` tag with the same name) | Defines the privacy of the event parameter | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the event parameter was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the event parameter is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |

```ts
@event("eventWithDetails", {
	detail: {
		/**
		 * @public
		 * @since 1.2.0
		 * @deprecated 1.4.0
		 */
		testParameter: { type: HTMLElement }
	},
})
class TestComponent extends UI5Element {
```

**Notes:**
- With these tags, only deprecated, since, and privacy status can be changed. If you want to change the description, use the `@param` tag in the event description
- You must specify the privacy of the parameter with a privacy tag and also describe the parameter in the event comment

### Method tags

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@param` | Defines the method's parameters | - | `@param param1 parameter description showcase` <br /> `@param {ShowcaseType} [param2] optional parameter description showcase` |
| `@public` / `@protected` / `@private` | Defines the privacy of the method | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the method was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the method is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |
| `@returns` | Defines the return value description | - | `@returns return description showcase` |

```ts
/**
 * Shows the popover.
 * @param param1 parameter description showcase
 * @param [param2] optional parameter description showcase
 * @public
 * @since 1.2.0
 * @deprecated 1.4.0
 * @returns description of return
 */
static methodName(param1: Array<ShowcaseType>, param2 = ShowcaseType.Type1): boolean {}
```

**Notes:**
- Parameter types and return types are generated automatically

### CSS Part

You can define CSS parts inside the class comment using the `@csspart` tag.

```ts
/**
 * @class
 * ...
 *
 * @csspart testPart - CSS Part description showcase
 * ...
 */
@customElement("ui5-test-component")
class TestComponent extends UI5Element {
```

### Enum and enum member tags

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@public` / `@protected` / `@private` (required for enum members) | Defines the privacy of the enum / enum member | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the enum / enum member was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the enum / enum member is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |

```ts
/**
 * Enum description showcase
 *
 * @public
 * @since 1.2.0
 * @deprecated 1.4.0
 */
enum ShowcaseType {
	/**
	 * Enum member description showcase
	 *
	 * @public
	 * @since 1.2.0
	 * @deprecated 1.4.0
	 */
	Type1 = "Type1",
}
```

### Interface tags

| Tag | Description | Accepted types | Examples |
|---|---|---|---|
| `@public` / `@protected` / `@private` | Defines the privacy of the interface | - | `@public` <br /> `@protected` <br /> `@private` |
| `@since` | Defines the version when the interface was introduced | string | `@since 1.2.0` |
| `@deprecated` | Defines whether the interface is deprecated | boolean \| string | `@deprecated` <br /> `@deprecated version 1.4.0` |

```ts
/**
 * Interface description showcase
 *
 * @public
 * @since 1.2.0
 * @deprecated 1.4.0
 */
interface ShowcaseType {
	property: string;
}
```