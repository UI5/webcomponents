# Properties

In this article, we will discuss properties in the context of UI5 Web Components.

## Properties and Attributes

Properties allow you to configure the state of your component.

By default, for each property, there is an equivalent attribute. Attributes have the same names as properties but in `kebab-case` rather than `camelCase`. Properties of type `Object` or `Array` and properties with `noAttribute` set to `true` do not have an attribute equivalent.

## `@property` decorator

To define your own property, you need to:
- Use the `property` decorator.
- Define a class member.

The `property` decorator is a property decorator that takes one optional argument as an object literal containing configuration options for the property.

**Note:** If no argument is provided to the decorator, the property will be treated as having a `String` type.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @property({ type: Boolean })
    myProp = false;
}
```

You can see the available options below.

### type
This option is required and accepts a type constructor (e.g., `Boolean`, `String`) that will be used for attribute conversion. When converting from a property to an attribute, the framework can check the runtime type and convert it to a string, but when coming from an attribute, there is no way to know whether it is a boolean or a number, unless a type is provided.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @property({ type: Number })
    myProp = 0;
}
```

Available types:

| Type        | Class to Use | Description                                                                  |
|-------------| ------------ |------------------------------------------------------------------------------|
| string      | `String`     | This is the default type, does not need to be explicitly set             |
| boolean     | `Boolean`    | Boolean value, the presence of the attribute will set the property to `true` |
| number      | `Number`     | Number value, the attribute will be converted using `parseFloat`             |
| object      | `Object`     | JS Object, automatically applies `noAttribute: true`                         |
| array       | `Array`      | JS Array, automatically applies `noAttribute: true`                          |
| enumeration | `String`     | Enums are treated as strings, type does not accept enum types                |

### noAttribute
This option accepts a boolean value and defines whether the property should not have an equivalent attribute (f.e. for properties that do not used for CSS selectors).

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @property({ type: Number, noAttribute: true })
    myProp = 0;
}
```

### converter
This option accepts an object and allows you to define a custom property-to-attribute (and vice-versa) converter with two methods - `fromAttribute` and `toAttribute` that will receive the `type` and the `value`.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @property({
        converter: {
            toAttribute(propertyValue: string | HTMLElement) {
                if (propertyValue instanceof HTMLElement) {
                    return null;
                }
                return propertyValue;
            },
            fromAttribute(value: string | null) {
                return value;
            }
        }
    })
    myProp?: HTMLElement | string;
}
```

### Default Value
Use JavaScript property initializers to define default values.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @property()
    name = "user1";

    @property({ type: Boolean })
    collapsed = false;

    @property({ type: Number })
    maxValue = 5;

    @property({ type: Object })
    accProperties = {};

    @property({ type: Array })
    stars = [];
}
```

**Note:** due to how HTML attributes work, boolean properties can only have `false` as a default value.