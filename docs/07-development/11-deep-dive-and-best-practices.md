# Deep dive and best practices

This tutorial will cover some finer details and best practices when designing and developing UI5 Web Components.

## Metadata deep dive <a name="metadata"></a>

The metadata defines the public API of your component. Among other things, here you define:
 - the tag name
 - what properties/attributes (and of what type) your component supports
 - what slots your component supports
 - what events your component fires

### Tag <a name="metadata_tag"></a>

The tag name must include a `-` as required for any custom element. The tag is declared using `@customElement` decorator: 

```ts
@custom("my-component")
//or
@custom({
	tag: "my-component"
})
```
and then the usage is:

```html
<my-component></my-component>
```

The `tag`, as defined is referred to as the "pure tag", meaning it is not suffixed (scoping is not used).

Important: the pure tag name of every UI5 Web Component is always set as an **attribute** to the component too.

For example, when you create a `ui5-button`:

```html
<ui5-button id="b1" class="button1" design="Emphasized"></ui5-button>
```

the framework will create an empty attribute with the name `ui5-button` too, so the actual DOM would look like this:

```html
<ui5-button id="b1" class="button1" design="Emphasized" ui5-button></ui5-button>
```

Even if a suffix for tag names is configured (when scoping is enabled), the attribute with the pure tag name will be the same.

For example, if the configured suffix is `-demo` and all components are used with this suffix:

```html
<ui5-button-demo id="b1" class="button1" design="Emphasized" ui5-button></ui5-button-demo>
```

the **attribute** will still be the same (`ui5-button` as opposed to the tag name of `ui5-button-demo`).

Therefore, the best practice when developing UI5 Web Components is to write CSS selectors for the shadow roots using
attribute selectors, instead of tag selectors.

For example, if the `MyComponentTemplate.tsx` file looks like this:

```tsx
export default function MyComponentTemplate() {
    return (
       <div class="my-component">
			<Button id="openBtn">Open</Button>
			<div>
				<slot></slot>
			</div>
			<List></List>
		</div>
    );
}
```

you should not write selectors by tag name for other components in the `Demo.css` file:

```css
ui5-button {
	width: 50px;
}
```

because, as stated above, the tag name could be suffixed and is not guaranteed to always be the same as the pure tag name.

Instead, use the attribute selector:

```css
[ui5-button] {
	width: 50px;
}
```

or another type of selector (for example by ID):

```css
#openBtn {
	width: 50px;
}
```

### Properties <a name="metadata_properties"></a>

#### Properties are managed state

The framework will create a getter/setter pair on your component's prototype for each property, defined with `@property` decorator.

For example, defining `text` property:

```ts
@property()
text = ""
```

you can use the `text` getter/setter on this component's instances:

```ts
let t = myComponent.text;
myComponent.text = "New text";
```

Whenever `text` is read or set, the framework-defined getter/setter will be called and thus the framework will be in control of the property.

#### Properties vs attributes

The `properties` defined via the `@property` decorator results in both properties and attributes for your component. By default, for each property (`camelCase` name) an attribute with the
same name but in `kebab-case` is supported. Properties of type `Object` have no attribute counterparts. If you wish to not have an attribute for a given property regardless of type, you can configure it with `noAttribute: true` setting.

For example, defining `headerText` property:

```ts
@property()
headerText = ""
```

you can use both the `headerText` property and `header-text` attribute:

```ts
let t = myComponent.text;
myComponent.headerText = "New text";
myComponent.setAttrbite("header-text", "New text");
```


#### Public vs private properties

The framework does not distinguish between *public* and *private* properties. You can treat some properties as private in a sense that you can document them as such and not advertise them to users.
The usual convention is that private properties start with an `_`, but this is not mandatory. In the end, all properties defined in the metadata, public or private,
are *component state*, therefore cause the component to be invalidated and subsequently re-rendered, when changed.

#### Property types and default values

The most common types of properties are `String`, `Boolean`, `Object`and `Number`.

Most property types can have a default value, but `Boolean `properties should always default to `false`. When a boolean attribute is absent, it's treated as false, therefore, the default value of an attribute must be always false.

For example, defining different types of properties:

```ts
class MyComponent extends UI5Element {
	@property()
	text = "Hello";

	@property({ type: Number, noAttribute: true })
	width = 1024;

	@property({ type: Number })
	scale = 0.5;

	@property({ type: Object })
	data = {};

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_isPhone = false;
}
```

Here `text`, `width`, `scale` and `data` are public properties, and `_isPhone` private, but only by convention. If the user (or the component internally) changes any of these properties, the component will be invalidated.

#### Best practices for using properties

- **Аvoid directly modifying public properties** from within a component, as these properties are typically controlled by the parent application. The only exception to this rule is when the property change results directly from user interaction (e.g., updating a value after a user types in an input field, or toggling a checked property after a user clicks a checkbox). Additionally, whenever you modify a public property due to user interaction, it's important to **fire an event** to notify the parent application. This ensures that the application can synchronize its state accordingly.

- As for private properties, the best practice is to **only** change them internally and never let the application know about their existence.

- Using attribute selectors instead of setting and using CSS classes on your component. Both public and private properties are great ways to create CSS selectors for your component with the `:host()` selector. The `:host()` selector targets the custom element itself, and can be combined with other selectors.

For example, using the `size` property (respectively the attribute with the same name) to change component's dimensions for certain values - `size="XS"`:


```css
:host {
	height: 5rem;
	width: 5rem;
}

:host([size="XS"]) {
	height: 2rem;
	width: 2rem;
}
```

```html
<my-comopnent size="XS"></my-comopnent> <!-- :host() targets my-component -->
```


#### Metadata properties vs standard JS properties

It is important not to confuse properties defined with `@property` decorator  with regular Javascript properties.
You can create any number of properties on your component's instance, f.e.:

```ts
constructor() {
	super();
	this._isMobile = false;
}
```

However, only metadata-defined properties are managed by the framework: cause invalidation and are converted to/from attributes.
Feel free to create as many regular JS properties for the purpose of your component's functionality as you need, but bear in mind
that they will not be managed by the framework.


## Events

Most UI5 components emit events to inform the application about user interactions. Defining and firing events involves several key aspects:

### Describing the Event

Use the `@event` decorator to define the event. If the event name consists of multiple words, use kebab-case:

```ts
@event("selection-change", {
	detail: {
		valid: { type: Boolean },
	},
})
class MyComponent extends UI5Element {
}
```

### Firing the Event


#### The `fireEvent` method

Use the `UI5Element#fireEvent` method to trigger the event:

```ts
@event("selection-change", {
	detail: {
		valid: { type: Boolean },
	},
})
class MyComponent extends UI5Element {
	onItemSelected(e: Event) {
		this.fireEvent("selection-change", {
			valid: true,
		});
	}
}
```

By defualt when using `fireEvent` it assumes the event is bubbling (bubbles: true) and not preventable (cancelable: false).

- Fire event with default configuration

```ts
// Fires the event as NOT preventable and bubbling
this.fireEvent("change");
```

- Fire event with non-default configuration

The method allows configuring the `cancelable` and `bubbles` fields via function arguments - the third and fourth parameters respectively.

```ts
// Fires the event as preventable and non-bubbling
this.fireEvent("change", {}, true, false);
```

#### The `fireDecoratorEvent` method

Use the `UI5Element#fireDecoratorEvent` method to trigger the event.

The method is available since version `v2.4.0` and it is similar to `fireEvent`. It fires a custom event, but gets the configuration for the event from the `@event` decorator. In case you rely on the decorator settings, you must use the `fireDecoratorEvent` method.

Keep in mind that `cancelable` and `bubbles` are `false` by default and you must explicitly enable them in the `@event` decorator if required.

- Fire event with default configuration

```ts
@event("change")
```

```ts
// Fires the event as NOT preventable and NOT bubbling
this.fireDecoratorEvent("change");
```

- Fire event with non-default configuration

```ts
@event("change", {
    bubbles: true // false by default
    cancelable: true // false by default
})
```

```ts
// Fires the event as preventable and bubbling
this.fireDecoratorEvent("change");
```

**Note:** since `v2.4.0` it's recommended to describe the event in the `@event` decorator and use the `fireDecoratorEvent` method. 


### Describing the Event Detail

When an event includes a detail it's recommended to create a TypeScript type that describes the event detail and use it in the `fireEvent` or `fireDecoratorEvent` (as generic methods) to force static checks ensuring that proper event detail is passed.
The naming convention for the type is a combination of the component class name ("MyComponent"), the event name ("SelectionChange"), followed by "EventDetail", written in PascalCase, e.g "MyComponentSelectionChangeEventDetail":


```ts
export type MyComponentSelectionChangeEventDetail = {
	valid: boolean;
};


@event<MyComponentSelectionChangeEventDetail>("selection-change", {
	detail: {
		valid: { type: Boolean },
	},
})
class MyComponent extends UI5Element {

	onItemSelected(e: Event) {
		this.fireDecoratorEvent<MyComponentSelectionChangeEventDetail>("selection-change", {
			valid: true,
		});
	}
}
```

**Note:** it's a best practice to export the type to make it available for outside usage.


### Handling Events in Templates

When attaching event handlers within your component's template for events fired by other web components, use the `on` prefix + the event name in `PascalCase`.
For example, if a ui5-list component emits a `selection-change` event, in the template attach `onSelectionChange`.

```tsx
// DemoTemplate.tsx
export default function MyComponentTemplate() {
    return <div class="my-component">
		<List onSelectionChange={this.onSelectionChange}></List>
	</div>;
}
```

By default, events are fired in pairs: one with the standard name and another prefixed with `ui5-`. While the `ui5-` prefixed event is always emitted, the non-prefixed event can be suppressed if the `noConflict` configuration setting is enabled. In this case, only the prefixed event will be triggered. For more details on the `noConflict` setting, refer to the [Configuration](../2-advanced/01-configuration.md) section.

### Preventable Events 

It's common to prevent certain events in an application. You must configure the `cancelable` setting in the `@event` decorator to make the event preventable. 

```ts
@event("change", {
    cancelable: true // false by default
})
```

You most likely will need to update (or revert) the component's state when an event is prevented by the consuming side. To determine if an event was prevented, check the return value of the `fireDecoratorEvent` method. It returns false if the event was cancelled (`preventDefault` was called) and true otherwise:

```ts
@event("change", {
    cancelable: true // false by default
})
class Switch extends UI5Element {
	toggle() {
		this.checked = !this.checked;
		const changePrevented = !this.fireDecoratorEvent("change");

		if (changePrevented) {
			this.checked = !this.checked;
		}
	}
}
```

## Slots

Web Components offer a `slot` mechanism for component composition, allowing components to render children
or other components in specific locations within their shadow root.

To enable slotting for your component, simply add a `<slot>` element within your template. 
This acts as a placeholder that can be filled with any HTML markup.

```tsx
export default function MyComponentTemplate() {
	return (
		<div class="my-component-root">
			<slot></slot>
		</div>
	);
}
```

On the consuming side, you can insert HTML elements into your component:

```html
<!-- index.html -->
<my-component>
	<span>Hello World</span>
</my-component>
```

For documentation purposes and to inform component consumers about the available slot,
we should describe it with a brief JSDoc comment at component class level as shown below:

```ts
/*
 * @slot {Array<Node>} default - Defines the content of the component.
 */
@customElement({
	tag: "ui5-demo-component",
})
class MyComponent extends UI5Element {}
```

### Slot as Class Member

We can define our slots as class members via the `@slot` decorator as follows: 
```ts
import type { Slot} from "@ui5/webcomponents-base/dist/UI5Element.js"
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
	@slot()
	items!: Slot<HTMLElement>;;
}
```

Defining a slot with the `@slot` decorator means that this slot will be managed by the framework:
- If any of the children are custom elements, the framework will wait until they are all defined and upgraded before rendering the component.
- The component will be re-rendered when its children are added, removed, or rearranged.

Also, we define slots as class members when we need to access the slotted children for some reason.
For example, to get the slotted elements count:

```ts
const itemsCount = this.items.length;
```

Or, to read some state of the slotted elements:


```ts
const hasDisabledItem = this.items.some(el => el.disabled);
```

Or, sometimes even set some private state on the slotted elements:

```ts
this.items.forEach((item, key) => {
	const isLastChild = key === this.items.length - 1;
	item.showBorder = isLastChild;
});
```

All slots, declared with the `@slot` decorator, are arrays with elements of type Node or HTMLElement.
So, you can safely and **must** declare slots (by convention) with `!:` as the accessor will return an empty array in the worst case.

Also, when you declare slots as class members, you can document them in place - you don't need to describe them at class level as mentioned in the previous section.

```ts
/**
 * Defines the items of the component.
 * @public
 */
@slot()
items: Array<HTMLElement>
```


### Default and Named Slot

Default slot is the one that can be used without setting the `slot` attribute of the slotted elements, while 
named slot requires setting the `slot` attribute: 

- Default slot

```tsx
export default function MyComponentTemplate() {
	return (
		<div class="my-component-root">
			<slot></slot>
		</div>
	);
}
```


```html
<!-- index.html -->
<my-component>
	<span>Hello World</span>
</my-component>
```

- Named slot

The named slot requires a small change in the component's template. You must pass the `name` attrbite to the `slot` element:

```tsx
// DemoTemplate.tsx
export default function () {
	return (
		<div class="my-component-root">
			<slot name="content"></slot>
		</div>
	);
}
```

```html
<!-- index.html -->
<my-component>
	<span slot="content">Hello World</span>
</my-component>
```


- Declare default slot

All slots are named if you simply use the `@slot` decorator without any settings, while the default slots must be explicitly marked as such with the `"default"` setting:

```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;
}
```

- Declare named slot

Simply use the `@slot` decorator without any settings:

```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
	@slot()
	content!: Array<HTMLElement>;
}
```
	
It's a good practice is to make use of the default slot as it requires less code to use your component.
And, if your component has multiple slots - to pick the most important and used one as the default.

For example, here we assume that the "content" slot is more important and we declared it as default.


```tsx
export default function MyComponentTemplate() {
	return (
		<div class="my-component-root">
			<div class="my-component-heading">
				<slot name="heading"></slot>
			</div>

			<slot></slot>
		</div>
	);
}
```

```html
<!-- index.html -->
<my-component>
	<h1 slot="heading">Heading</h1>
	<span>Hello World</span>
</my-component>
```

```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	@slot()
	heading!: Array<HTMLElement>;
}
```

**Note:** If the slot configuration object is not provided (e.g. `@slot()`), `HTMLElement` will be used as the default type.
However, if you provide this object, the `type` field is mandatory.


### Individual Slots

The `@slot` decorator provides an option called `individualSlots`, which is of boolean type. This option determines if each child element will be placed in its own slot, allowing for flexible arrangement or wrapping of the children within the component. When `individualSlots` is enabled, the framework assigns a unique `_individualSlot` property to each child element. This property can then be used within the component's template, as shown in the following example.

First, enable `individualSlots` by setting it to `true`:
```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
	@slot({ type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;
}
```

Next, iterate over the child elements in the template, using the `_individualSlot` property in the name attribute of the slot element:

```tsx
export default function MyComponentTemplate() {
	return (
		<div>
			{ this.content.map(contentEl => <slot name={contentEl._individualSlot}></slot>)}
		</div>
	);
}
```

Here is an example using the `Carousel` web component, which leverages `individualSlots` to wrap each slotted child within the content slot to achieve a specific design:
```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("ui5-carousel")
class Carousel extends UI5Element {
	@slot({ type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;
}
```

```tsx
export default function CarouselTemplate(this: Carousel) {
	return (
		<div>
			{ this.content.map(contentEl =>
				<div
					class="ui5-carousel-item"
					role="option"
					aria-posinset={contentEl.posinset}
					aria-setsize={contentEl.setsize}
					aria-selected={contentEl.selected}
				>
					<slot name={contentEl.item._individualSlot}></slot>
				</div>
			)}
		</div>
	);
}
```


**Note**: When `individualSlots` is enabled, the `_individualSlot` property is assigned to each direct child. The value of `_individualSlot` follows the pattern `{nameOfTheSlot}-{index}`, and the slot attribute is updated accordingly.


### Invalidation on Child Change

The `@slot` decorator offers an `invalidateOnChildChange` option, which can be set as a boolean or a configuration object. This option determines whether a component should be invalidated when changes occur within its child elements.

By default, if child elements are added or removed from a slot, the component will be invalidated automatically. The `invalidateOnChildChange` option goes a step further by triggering invalidation even when properties or slots of the child elements change. This is useful if the state of parent component depends on the state of its children.

The simplest way to use this option is to set `invalidateOnChildChange` to `"true"`. This configuration ensures that the `my-component` web component will be invalidated whenever any of the UI5Element instances slotted into the content slot are updated, whether due to a property or slot change.


```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
    @slot({ type: HTMLElement, invalidateOnChildChange: true })
    content!: Array<HTMLElement>;
}
```

For more specific scenarios, you can use a more detailed configuration. The following example demonstrates how to invalidate the `"my-component"` web component only when certain properties or slots of the slotted UI5Element instances change. In this case, the component will be invalidated if the "myProp" property or the "mySlot" slot of the child elements are modified.

```ts
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement("my-component")
class MyComponent extends UI5Element {
	@slot({ type: HTMLElement, invalidateOnChildChange: { properties: ["myProp"], slots: ["mySlot"] }})
	content!: Array<HTMLElement>;
}
```

The `invalidateOnChildChange` option is especially useful when working with "abstract" elements option is particularly useful when dealing with "abstract" elements, such as UI5Element instances that do not have their own templates. In these cases, the parent component is responsible for rendering the content based on the state of its child elements.

For instance, consider a `Wizard` web component that accepts `WizardStep` elements in its `"steps"` slot. Since `WizardStep` does not have its own template, the `Wizard` must handle rendering based on the properties and state of the steps. Therefore, the `Wizard` needs to be invalidated whenever any changes occur within its child elements to ensure proper rendering.

```ts
class Wizard extends UI5Element {
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	steps!: Array<WizardStep>
}
```

```html
<ui5-wizard>
	<ui5-wizard-step title-text="Product type" icon="sap-icon://product" selected></ui5-wizard-step>
	<ui5-wizard-step title-text="Options"></ui5-wizard-step>
	<ui5-wizard-step title-text="Pricing" disabled></ui5-wizard-step>
</ui5-wizard>
```

```tsx
export default function WizardTemplate(this: Wizard) {
	return (
		<div>
			{ this._steps.map(step =>
				<div class="ui5-wiz-step-root"></div>
			)}
		</div>
	);
}
```

**Note**: The `invalidateOnChildChange` option is meant to be used with slots that are UI5Element instances.

### Styling of Slotted Children 

The `:slotted` CSS selector applies to any element that has been placed into a slot.
It works when used inside CSS placed within the shadow DOM of the component that offers the slot.

For example:

```html
<!-- index.html -->
<my-component>
	<h1 slot="heading">Heading</h1>
	<span>Hello World</span>
</my-component>
```

```css
/* MyComponent.css */
::slotted([slot="heading"]) {
	width: 200px;
	height: 100px;
}
```

## Understanding rendering

### What is rendering? <a name="rendering_def"></a>

In the context of UI5 Web Components the notion of **rendering** means **creating the content of a shadow root** (building the shadow DOM).

### Physical and logical components <a name="rendering_physical_logical"></a>

Each component that has a `template` described in `@customElement` decorator will be rendered (will have its shadow DOM built) initially and every time it gets invalidated.

Example:

```ts
import MyComponentTemplate from "./generated/templates/MyComponentTemplate.lit.js";

@customElement({
	template: MyComponentTemplate
})
```

Components that do not have `template` defined in `@customElement` decorator are considered *logical* or *marker* elements only. These components are never rendered (do not have a shadow root at all)
and their only purpose is to serve as items for higher-order components. The classical example of a logical component is a select option.

Example:

```html
<ui5-calendar>
	<ui5-date></ui5-date>
</ui5-calendar>
```

The `ui5-date` component does not have template, and is therefore never rendered. However, the `ui5-calendar` component, which is a physical component that has a template, 
renders HTML corresponding to each of its children (`ui5-date` instances) as part of its own shadow DOM.

### What is invalidation? <a name="invalidation"></a>

Invalidation means scheduling an already rendered component for asynchronous re-rendering (in the next animation frame). If an already invalidated component gets changed
again, before having been re-rendered, this will have no downside - it's in the queue of components to be re-rendered anyway.

**Important:** when a component is re-rendered, only the parts of its shadow DOM, dependent on the changed properties/slots are changed, which makes most updates very fast.

A component becomes *invalidated* whenever:
 - a *metadata-defined* **property** changes (not regular properties that f.e. you define in the constructor)
 - children are added/removed/rearranged in any **slot** declared with `@slot` decorator.
 - a slotted child in a **slot** configured with `invalidateOnChildChange: true` is invalidated.

Changes to properties always cause an invalidation. No specific metadata configuration is needed.

```ts
@property()
text?: string;
```

Whenever `text` changes, the component will be invalidated.

As we defined earlier there two kind of slots - unnamed and named. Unnamed slots do not cause an invalidation. Most components do not need to render differently based on whether they have any slotted children or not. This component will not invalidate when children are added/removed from any of its unnamed slots.

However, some components render differently based on whether they have children or not (e.g. show counters/other UX elements for the number of children, f.e. carousel; or have special styles when empty or have a child in a specific slot, f.e. button with an icon).
If that is the case for the component you're building, you need to define slot using `slot` decorator. Thus, your component will become invalidated whenever children are added, removed or swap places in any of its slots.

```ts
@slot({ type: HTMLElement, "default": true })
content!: Array<HTMLElement>;

@slot()
header!: Array<HTMLElement>;

@slot()
footer!: Array<HTMLElement>;
```

Now that this component has slots defined with `@slot` decorator, changes to each of these slots will trigger an invalidation.

And finally, there are components that not only need to render differently based on the number/type of children they have, but they must also get invalidated
whenever their children change. This holds true for all components that work with abstract items (such as select with options, combo box with combo box items)
because these abstract items do not have a template (do not render themselves) and therefore rely on their parent to render some DOM for them in its own shadow root. So, when they get invalidated, they must also invalidate their parent.

```ts
@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
content!: Array<HTMLElement>;
@slot()
header!: Array<HTMLElement>;
@slot()
footer!: Array<HTMLElement>;
```

Only changes to children in the "content" slot will trigger invalidation for this component. Note that `invalidateOnChildChange` is defined per slot.
Finally, `invalidateOnChildChange` allows for more fine-granular rules when exactly children can invalidate their parents.

## Lifecycle hooks

Using the right lifecycle hook for the task is crucial to a well-designed and performant component.

### `constructor`

Use the constructor for one-time initialization tasks.

What to do:
 - bind functions to `this` (very common when using the `ResizeHandler` helper class)
 - do one-time work when the first instance of a given component is created (f.e. instantiate a helper class or attach a special event listener to the `window` object)

What not to do:
 - anything rendering-related (use `onBeforeRendering`/`onAfterRendering`)
 - anything related to the state (use `onBeforeRendering`)
 - anything requiring DOM manipulation (the component isn't attached to the DOM yet - use `onAfterRendering` or `onEnterDOM`/`onExitDOM`)

Example:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";


@customElement({
    tag: "my-component",
})
class MyComponent extends UI5Element {
	_itemNavigation: ItemNavigation;
	_handleResizeBound: ResizeObserverCallback;

	constructor() {
		super();
		// bind a method once so that you can pass the same function to register/deregister-based helpers
		this._handleResizeBound = this._handleResize.bind(this); 

		// do one-time work when the first instance of a component is created
		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);
			isGlobalHandlerAttached = true;
		}

		// initialize a helper class for the instance
		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Horizontal,
			getItemsCallback: () => this._getFocusableItems(),
		});
	}
}
```

### `onBeforeRendering`

Use `onBeforeRendering` to prepare variables to be used in the component's template.

What to do:
 - prepare calculated (derived) state for use in the renderer

What not to do:
 - do not try to access the DOM (use `onAfterRendering` instead)

Let's take for example a component with the following metadata:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";

@customElement({
    tag: "my-component",
})
class MyComponent extends UI5Element {
	@property()
	filter = "";

	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<HTMLElement>
}
```

This component has a `filter` property and a `default` slot that we want to call `items` (thus accessible with `this.items`).

Let's imagine we want to only show the items whose `name` property matches the value of our `filter` property - so we filter the items by name.

```ts
class MyComponent extends UI5Element {
	@property()
	filter = "";

	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<HTMLElement>

	this._filteredItems = [];

	onBeforeRendering() {
		this._filteredItems = this.items.filter(item => item.name.includes(this.filter));
	}
}
```

In `onBeforeRendering` we prepare a `_filteredItems` array with some of the component's children (only the ones that have the `this.filter` text as part of their `name` property)

And finally, in the components's template we have for example:

```tsx
export default function MyComponentTemplate() {
    return (
		<div class="my-filter-component">
			{ this._filteredItems.map(item =>
				<div class="my-filtered-item">
					<slot name={item._individualSlot}></slot>
				</div>
			)}
		</div>
	);
}
```

We loop over the `_fiteredItems` array that we prepared in `onBeforeRendering` and for each child we render a `slot` based on the child's `_individualSlot` property,
created automatically by the framework due to the default slot's metadata configuration (`individualSlots: true`).

The usage of this component would be for example:

```html
<my-filter-component filter="John">
	<my-filter-item name="John Smith"></my-filter-item>
	<my-filter-item name="Jane Doe"></my-filter-item>
	<my-filter-item name="Jack Johnson"></my-filter-item>
</my-filter-component>
```

The user would only see the first and third items as these are the only ones we rendered an individual slot for (the ones matching the `filter` value of "John").

In summary: `onBeforeRendering` is the best place to prepare all the variables you are going to need in the component's template.

### `onAfterRendering`

The `onAfterRendering` lifecycle hook allows you to access the DOM every time the component is rendered.

You should avoid using this method whenever possible. It's best to delegate all HTML manipulation to the framework: change the state of the component,
the component will be invalidated, the template will be executed with the latest state, and DOM will be updated accordingly.
It is an anti-pattern to manually change the DOM.

In some cases, however, you must directly access the DOM since certain operations can only be performed imperatively (and not via the template):
 - setting the focus;
 - manually scrolling an element to a certain position;
 - calling a public method on a DOM Element (for example, to close a popup);
 - reading the sizes of DOM Elements;

Example:

```html
<div class="my-component">
	<input id="first">
	<input id="second">
</div>
```

```ts
onAfterRendering() {
	this.shadowRoot.querySelector("#second").focus();
	this._totalWidth = this.shadowRoot.querySelector("div.my-component").offsetWidth;
}
```

### `onEnterDOM` and `onExitDOM`

Unlike `onBeforeRendering` and `onAfterRendering`, which sound like parts of the same flow (but are not, and are actually used for completely independent tasks),
`onEnterDOM` and `onExitDOM` should almost always be used together, therefore they are presented as a whole in this article.

 - `onEnterDOM` is executed during the web component's standard `connectedCallback` method's execution
 - `onExitDOM` is executed during the web component's standard `disconnectedCallback` method's execution

If you have prior experience with web component development, you could think of `onEnterDOM` as `connectedCallback` and of `onExitDOM` as `disconnectedCallback`.

Note that these hooks are completely independent of the component's rendering lifecycle, and are solely related to its insertion and removal from DOM.

Normally, when a web component is created, for example:

```ts
const b = document.createElement("my-component");
```

it is already fully operational, although it isn't in DOM yet. Therefore, you should use `onEnterDOM` and `onExitDOM` only for functionality, related to
the component being in the DOM tree at all (and not to rendering, stying or anything related to the shadow root).

Common use cases are:
 - registering/de-registering a ResizeHandler
 - working with Intersection observer
 - any work you want to carry out only if the component is in the DOM;

Probably the best example of these hooks is the usage of the `ResizeHandler` helper class.

The component has a private `_width` property, defined and the following code in its class:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

@customElement({
    tag: "my-component",
})
class MyComponent extends UI5Element {
	@property({ type: Number })
	_width = 0;

	constructor() {
		super();
		this._fnOnResize = this._onResize.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._fnOnResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._fnOnResize);
	}

	_onResize() {
		this._width = this.offsetWidth;
	}

	get styles() {
		return {
			valueStateMsgPopover: {
				"max-width": `${this._width}px`,
			},
		};
	}
}
```

In the `constructor` we bind the `_onResize` method to the component's instance to get a function with the correct context,
and then in `onEnterDOM` and `onExitDOM` we register/deregister this function with the `ResizeHandler` helper class.

Then, whenever the component resizes, the `ResizeHandler` will trigger the callback, the metadata `_width` property will be updated to a new value in `_onResize`,
the component will be invalidated, and the template will be executed with the new value of `_width`, respectively `styles`. 
