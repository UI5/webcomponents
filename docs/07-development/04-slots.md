# Slots

In this article, we will discuss slots in the context of UI5 Web Components.

Components often need to render children in specific locations in their shadow root, allowing applications to supply child content when using the component.

Currently, there are two types of slots: "named" and "unnamed". The difference between these types is that named slots have accessors as class members, while unnamed slots do not.

## Unnamed slots

Use unnamed slots when your component doesn't need to be aware of or interact with the children passed to a specific slot.
To define an unnamed slot, simply add a `<slot>` element within your template. For example:

```tsx
export default function MyDemoComponentTemplate() {
	return <div><slot name="mySlot"></slot></div>;
}
```

On the consuming side, elements can be passed to this slot using the `slot` attribute:

```html
<!-- index.html -->
<my-demo-component>
    <span slot="mySlot">Hello World</span>
</my-demo-component>
```


**Note:** It is recommended to describe your unnamed slots inside a JSDoc comment that describes your class using the `@slot` tag, following the pattern `@slot {type} name - description`.

## Named slots and the `@slot` decorator

Contrary to unnamed slots, named slots are used whenever the component must interact with its children in order to render itself properly.

To define your own named slot, you need to:
- Use the `slot` decorator.
- Define a class member.

The `slot` decorator is a property decorator that takes one optional argument as an object literal containing configuration options for the slot.

Defining a slot with the `slot` decorator means that this slot will be managed by the library. This means:
- If any of this UI5 Web Component's children are custom elements, the framework will wait until they are all defined and upgraded before rendering the component.
- The library will invalidate this UI5 Web Component whenever its children are added, removed, or rearranged (and additionally when invalidated, if `invalidateOnChildChange` is set).

```ts
import type { Slot} from "@ui5/webcomponents-base/dist/UI5Element.js"
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot()
    mySlot!: Slot<HTMLElement>;
}
```

You can see the available options below.

### Type
The `type` option accepts a type constructor (e.g., `HTMLElement`, `Node`) and is used to define the type of children that can be slotted inside the slot.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement })
    mySlot!: Slot<HTMLElement>;;
}
```

Available types:
| Type        | Description                      |
|-------------|----------------------------------|
| HTMLElement | Accepts HTML Elements only       |
| Node        | Accepts both Text nodes and HTML Elements |

**Note**: If the slot configuration object is not provided (e.g. `@slot()`), `HTMLElement` will be used as the default type.


### Default Slot

The `"default"` option accepts a boolean value and is used to define whether this slot is the default one.

**Note:** The default slot is defined simply as an empty slot tag `<slot></slot>` (without a `name` attribute) in the component's template.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement, "default": true })
    mySlot!: Slot<HTMLElement>;;
}
```

**Note:** The `Slot<T>` and `DefaultSlot<T>` marker types were introduced in version 2.20. In previous versions, slots were typed as `Array<T>` (e.g., `mySlot!: Array<HTMLElement>`). The new types enable better slot discoverability in TypeScript environments while the array is now part of the type itself.


### Individual Slots

The `individualSlots` option accepts a boolean value and determines whether each child will have its own slot, allowing you to arrange or wrap the children arbitrarily. This means that you need to handle the rendering on your own.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement, individualSlots: true })
    mySlot!: Slot<HTMLElement>;;
}
```

To render individual slots, you have to iterate all children in that slot and use the `_individualSlot` property that the framework sets automatically on each child:

```tsx
export default function MyDemoComponentTemplate() {
	return (
		<div>
			{ this.mySlot.map(mySlotEl => <slot name={mySlotEl._individualSlot}></slot>)}
		</div>
	);
}
```

**Note:** When this option is set to `true`, the `_individualSlot` property is set to each direct child, where `_individualSlot` returns a string following the pattern `{nameOfTheSlot}-{index}` and the slot attribute is changed based on that pattern.

### Invalidation upon child changes

The `invalidateOnChildChange` option accepts a boolean value or an object literal containing a configuration with more specific settings, determining whether the component should be invalidated on child change.

**Note**: `invalidateOnChildChange` is not meant to be used with standard DOM elements and is not to be confused with MutationObserver-like functionality. It targets the use case of components that slot UI5Element instances and require invalidation whenever these items are invalidated.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-demo-component")
class MyDemoComponent extends UI5Element {
    @slot({ type: HTMLElement, invalidateOnChildChange: true })
    mySlot!: Slot<HTMLElement>;;

    @slot({ type: HTMLElement, invalidateOnChildChange: { properties: true, slots: false }})
    mySlot2!: Slot<HTMLElement>;;

    @slot({ type: HTMLElement, invalidateOnChildChange: { properties: ["myProp"], slots: ["anotherSlot"] }})
    mySlot3!: Slot<HTMLElement>;;
}
```