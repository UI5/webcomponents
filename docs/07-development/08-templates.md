---
sidebar_label: Templates
---
# JSX Templates

## Intro
JSX is an embeddable XML-like syntax that is transformed into valid JavaScript. TypeScript supports embedding, type checking, and compiling JSX directly to JavaScript.

Basic example:
```tsx
<div class="header">Hello World!</div>
```

gets compiled to
```ts
import { jsx as _jsx } from "@ui5/webcomponents-base/jsx-runtime";
_jsx("div", { class: "header", children: "Hello World!" });
```

Code inside JSX is special code and not JavaScript. To jump out of JSX and use JavaScript into the template, you can use the `{}` notation

```tsx
const myClass = "header"
const name = "World";

<div class={myClass}>Hello {name}</div>
```

## Writing a component template

```tsx
// PanelTemplate.tsx
import type Panel from "./Panel.js";

export default function (this: Panel) {
    return <div>{this.headerText}</div>;
}
```

Component templates should export a function as a default export. The framework will call the template with the component instance bound to `this` so you should describe the type of the `this` parameter like in the example above. After that, you get full type checking and code completion inside the template.

## Using components in templates

TypeScript treats lower-case element names as intrinsic (known to the browser). Upper-case element names are value based and looked up as a variable in the JS scope. In order to render a web component, you should import it and use its class as a value in JSX

```tsx
import Button from "@ui5/webcomponents/dist/Button.js"
<Button design="Positive">Submit</Button>
```

The component model comes from the browser, so the JSX runtime is not doing anything special with this value, other than rendering the real tag in the DOM. Behind the scenes, the above code get converted to
```tsx
<ui5-button design="Positive">Submit</ui5-button>
```

While you can technically use web component tags directly, they are not added to the `JSX.IntrinsicElements` set and TypeScript will show errors for them.

## Properties vs attributes

TypeScript will check the types of intrinsic elements for known attributes (like `<div aria-role="link">`) and the runtime will correctly set them as attributes. For web components, the DOM operation will always use a property setter which works correctly for booleans and numbers

```tsx
<MyComponent
    boolProp={false}
    numberProp={5}
></MyComponent>
```

since the types are known for all components, TypeScript will do the type checking and the runtime will check if a property exists and use it
```tsx
if ("boolProp" in domEl) {
    domEl["boolProp"] = false;
}
```

This simplifies templates a lot - there is no need to make a distinction between boolean attributes and string attributes - properties are always used and always type checked.

**Pitfall**: Using dashes in JSX. When a property name is not a valid JS identifier, TypeScript will not check its type, and it will be assigned to the dom element as an attribute instead of a property.

Don't:
```tsx
<Icon show-tooltip={false} />
// this will result in the string "false" being assigned and treated as `true`
```

Do:
```tsx
<Icon showTooltip={false} />
```

Always use camel case property names when working with components. There will also be a warning in the console if an existing property is used via its attribute.

### `class` and `style` properties

Classes can be set as a string or as an object, where the key is the class that will be added if the value is truthy.

```tsx
<div
    class={{
        "ui5-vsd-content": true,
        "ui5-vsd-content-expand": this.expandContent,
    }}
>
```

Styles are also directly set as objects
```tsx
<div
    style={{
        "display": this._contentExpanded ? "block" : "none",
    }}
>
```

## Conditional rendering (if/else)

Since JSX is compiled to JavaStcript, there is no need for special conditional syntax - just use JavaScript

```tsx
{this.icon &&
    <Icon name={this.icon} />
}
```

If the condition evaluates to false, the second expression will not be rendered.

**Pitfall**: If you are checking an array and put the array length in the condional check, the framework will render a `0` instead of rendering nothing. Always check array length by comparing to 0, so the result of the expression is boolean
```tsx
{this.rows.length > 0 &&
    <CheckBox ... />
}
```

For if/else branches, use a ternary operator:

```tsx
{this.icon ?
    <Icon class="ui5-tli-icon" name={this.icon}/>
    :
    <div class="ui5-tli-dummy-icon-container"></div>
}
```

For more complex logic, you can extract the template in a function and use JavaScript

## Iteration (loop)

Like conditionals, iteration is also achieved with plain JavaScript. Use the `Array.map` function to return a list of templates

```tsx
{this.items.map(item =>
    <li class="ui5-timeline-list-item">
        {item.text}
    </li>
}
```

### Keyed vs non-keyed iteration

The code above is an example of a non-keyed iteartion. Most of the time, rendering lists directly is fine, but updating them will update the content of the elements instead of moving the actual elements around (for example deleting the first item will actually render the content of the second item in the first element and the last element will be removed from the DOM).

For performance reasons, or if you keep references to the items and expect the same item after DOM operations, you should always add a key.

```tsx
this.tokens
    .filter(token => token._isVisible)
    .map(token => <ListItemStandard key={String(token._id)}
```

If you are iterating over other webcomponent instances, you can use the stable key generated by the framework for each element instance available via `this._id`. Otherwise, make sure the key is unique and stable - do not use the array index as a key.

## Partials

Partials again show the strength of JSX - use JavaScript for all standard concepts (like conditionals and iteration in the previous sections).

Template partials in this case are just function calls that return other templates

```tsx
{this._isSideContentFirst ?
    <>
        { sideContent.call(this) }
        { mainContent.call(this) }
    </>
    :
    <>
        { mainContent.call(this) }
        { sideContent.call(this) }
    </>
```

**Note: Fragments**
In the exaple above, we used a construct called a fragment. Use this in places where a single element is expected by the syntax, instead of wrapping the elements you have in unnecessary `span` elements.

```tsx
<></>
```

### Injecting content when using templates with partials

Other templating engines have mechanisms to include a template and replace part of it with a parital. In JSX, including a template is simply importing the module and calling the template function. Templates that provide partials for replacement, expect the partials to be passed as additional optional parameters

```tsx
export default BaseTemplate(this: ComponentClass, headerContent?: Function) {
    return <div>
        {headerContent ?
            headerContent.call(this)
            :
            <span>default header content</span
        }
    </div>
}
```

## Events

Event handlers are attached with the convention `onEventName`. Any property that starts with `on` is treated as an event handler and the rest of the string is taken as the event name. Standard DOM events are correctly converted from PascalCase to the DOM event name.

```
onClick -> click
onInput -> input
onMouseMove -> mousemove
```

Custom events dispatched from the web components follow the same convention when written in the template, with the difference that they are attached directly with the event name as it is and the framework takes care to match it by firing all events with PascalCase as well.

In template:
```
onSeclectionChange -> SelectionChange
~~~~~~~~~~~~~~~~~~    ~~~~~~~~~~~~~~~
     prop             event attached
```

Event description in component
```ts
eventDetails!: {
    "selection-change": void
}
```

When fired at runtime:
```ts
// fires `SelectionChange` as well so the TSX handler will work
fireDecoratorEvent("selection-change")
```

In order for components to be usable in TSX templates, all events must be described in the `eventDetails` field of the class. This will generate the necessary types for the event handler property names.

### Event handler parameter types

When writing an event handler inline, the type of the event parameter will be inferred from the template usage

```tsx
<ResponsivePopover
    onBeforeClose={e => e.detail.escPressed}
//                               ~~~~~~~~~~
//                    (property) escPressed: boolean
/>
```

If however, you specify the handler as a method in the component, you have to provide the event parameter type yourself. For custom events, you can use the `UI5CustomEvent` type helper by providing two generic parameters - the component class and the event name

```tsx
<ResponsivePopover
    onBeforeClose={this._beforeCloseHandler}
/>

import { type UI5CustomEvent } from "@ui5/webcomponents-base";
class MyCompponent {
    _beforePopoverClose(e: UI5CustomEvent<ResponsivePopover, "before-close">) {
        e.detail.escPressed;
//               ~~~~~~~~~~
//      (property) escPressed: boolean
    }
}
```

For native browser events, the most common way is to simply specify `KeyboardEvent` or `MouseEvent`

### Event handler `.currentTarget`

When writing an inline event handler, `e.currentTarget` will be set to the element on which the handler is attached, and it will have the correct type. This removes the necessity to use type assertions which also might be wrong in case the same event handler is attached to a different element.

```tsx
// Before
<Input onClick={(e => (e.target as Input))} />
                     // ^^^^^^^^^^^^^^^^
                     // Casting the event target to input might be wrong and is not checked

// After
<Input onClick={(e => e.currentTarget)} />
                     // ^^^^^^^^^^^^^
                     // instance of `Input` class
```

The same typing information is also available via the `UI5CustomEvent` type helper

```ts
// Before
handleInput(e: CustomEvent) {
    console.log(e.target as Input);
    //          ^^^^^^^^^^^^^^^^^
    //          this is of type Input, but TypeScript will not check in case the handler is attached to a Slider
}

// After
handleInput(e: UI5CustomEvent<Input, "input">) {
    console.log(e.currentTarget);
    //          ^^^^^^^^^^^^^^^
    //          this is of type Input and checked
}
```

Typescript will check that the `handleInput` handler can only be attached on an Input element. If the same handler is attached on a Slider, you you will have to add it in the parameters
```tsx
handleInput(e: UI5CustomEvent<Input, "input"> | UI5CustomEvent<Slider, "input">) {
    console.log(e.currentTarget);
    //          ^^^^^^^^^^^^^^^
    //          Input | Slider
    console.log(e.currentTarget.value);
    //          ^^^^^^^^^^^^^^^^^^^^^
    //          string | number
}
```

### Event handlers and `this`

UI5 Web Components are authored as classes and event handlers are methods, they usually access the component state via `this.prop`. In order for this to work when event handlers are attached to the DOM, the framework automatically binds all event handlers to the instance that is being rendered, so accessing `this` from the event handlers works as expected without any additional work.

### Event bubbling

Event handler property names are only available on the component instance, it is not possible to use them on another component with event bubbling. Consider the following example:

```tsx
<div
    onDetailClick={this.handleDetailClick} // TS error - div does not have a `detail-click` event, so no `onDetailClick` property
>
    <ListItem
        onDetailClick={this.handleDetailClick} // this works, the ListItem has an `onDetailClick` property
    ></ListItem>
</div>
```

The list item fires a `detail-click` event, the `ListItem` class correctly get a property `onDetailClick`, but if you want to attach the same handler higher in the DOM (to take advantage of event bubbling), you cannot use the same property name `onDetailClick` on another element like the `div`.

This is an example where using a dash in the property name is allowed - all custom events are also fired with a `ui5-` prefix and it is an allowed usage:
```tsx
<div
    onui5-detail-click={this.handleDetailClick} // no error when using a dash (-), the event will be subscribed as `ui5-detail-click`
>
    <ListItem
        onDetailClick={this.handleDetailClick}
    ></ListItem>
</div>
```

Another realistic example of this pattern is for events coming from child components in slots - they are coming from the light DOM of the component and there is no way to attach handlers to them in the template, but bubbling works.

```tsx
<List
    // handles event from slotted children
    onui5-close-menu={this._close}
>
    <slot></slot>
</List>
```

## Refs

It is sometimes necessary to get a reference to a DOM element in the code of the component, for example to associate the web component instance that rendered a specific DOM element. While it was previously possible to assign any propererty to any element in the template, with TSX you can no longer assign non-existant properties.

```tsx
<div
    associatedItem={this} // TS error - divs don't have such a property
></div>
```

The way to achieve the same in TSX is to use a `ref`

`ref` properties accept an object with a `obj.current` property that will be assigned the DOM element, or a callback that will be executed with the element passed as an argument

```tsx
<div
    ref={this.captureRef}
></div>
```

```ts
class MyComponent {
    captureRef(ref: HTMLElement & { associatedItem?: UI5Element} | null) {
        if (ref) {
            ref.associatedItem = this;
        }
    }
}
```

Most of the time you want to pass an additional parameter besides the element that has a ref. This is done by binding the method (either `this` or an element that is iterated). Unlike event handlers, refs are never bound automatically, so make sure to use `.bind()` to set the correct `this`.

```tsx
<ul
    // captureListRef will be called with a `<ul>` as a parameter and `this` will be the element that renders the template
    ref={this.captureListRef.bind(this)}
    {this.items.map(item => (
        // captureItemRef will be called with a `<li>` as a parameter and `this` will be the `item` that is iterated
        <li ref={this.captureItemRef.bind(item)}></li>
    ))}
></ul>
```
