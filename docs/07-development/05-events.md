# Events

In this article, we will discuss events in the context of UI5 Web Components.

Components use `CustomEvent` to inform developers of important state changes in the components. For example, the `change` event is fired whenever the value of a `ui5-input` is changed.

## The `@event` Decorator

There are two `@event` decorators available with the following imports:
```ts
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js"; // recommended for new develompent
// or
import event from "@ui5/webcomponents-base/dist/decorators/event.js"; // deprecated
```

To define your own custom event, you need to use the `@event` decorator.

The `event` decorator is a class decorator that takes one required argument as a string to define the event name

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

@customElement("my-demo-component")
@event("change")
class MyDemoComponent extends UI5Element {}
```

**Note:** This decorator is used only to describe the events of the component and is not meant to create emitters. See `fireDecoratorEvent` below.

## Usage

As mentioned earlier, the `@event` decorator doesn't create event emitters. To notify developers of component changes, we have to fire events ourselves. This can be done using the `fireEventDecoratorEvent` and the deprecated `fireEvent` methods that come from the `UI5Element` class. The difference between the methods is explained below.

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

@customElement("my-demo-component")
@event("change")
class MyDemoComponent extends UI5Element {
    @property()
    value = "";

    onNativeInputChange(e) {
        this.value = e.target.value;
        this.fireDecoratorEvent("change"); // or this.fireEvent("change");
    }
}
```

**Note:** By default, the `fireDecoratorEvent` (and `fireEvent`) method returns a boolean value that helps you understand whether the event was canceled (i.e., if the `preventDefault` method was called).

## `eventDetails` (recommended)
The `eventDetails` class field is used to describe the types of events that the component emits. The strict event decorator is using this information for type checking the names.

```ts
class MyComponent extends UI5Element {
  eventDetails!: {
    "selection-change": SelectionChangeDetails
    "delete": void
  }
}
```

This field doesn't have runtime semantics, it is only used to provide type information about the events that the component is firing and the corresponding types of the detail parameter.

### Extending the `eventDetails` with more events
If your component extends another component and you try to add new events, you will get a TypeScript error that the new events cannot be assigned to the same field in the base class

```ts
class TimeSelectionClocks extends TimePickerInternals {
  eventDetails!: { // ts-error
    "close-picker": void,
  };

// Property 'eventDetails' in type 'TimeSelectionClocks' is not assignable to the same property in base type 'TimePickerInternals'.
```

In order to correctly extend the base class events, you need to add them as a type as well like this TimePickerInternals["eventDetails"]

```ts
class TimeSelectionClocks extends TimePickerInternals {
  eventDetails!: TimePickerInternals["eventDetails"] & {
    "close-picker": void,
  };
}
```

## Event Detail (deprecated)

The `@event` decorator is generic and accepts a TypeScript type that describes its detail. This type is crucial for preventing incorrect detail data when the event is fired using `fireDecoratorEvent` and `fireEvent` methods (both generic) and for ensuring type safety when listening for the event, so you know what kind of detail data to expect.

**Note:** It's required to export all types that describe specific event details for all public events.

Here's an example implementation:

```typescript
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

// Define the event detail type
export type MyDemoComponentChangeEventDetail = {
    valid: boolean;
};

@customElement("my-demo-component")
@event<MyDemoComponentChangeEventDetail>("change", {
    detail: {
        valid: { type: Boolean },
    },
})
class MyDemoComponent extends UI5Element {
    @property()
    value = "";

    onNativeInputChange(e: Event) {
        this.fireEvent("change", {
            valid: true,
        });
    }
}

export { MyDemoComponent };
```

## Event Configuration (both event decorators)

### Bubbling and Preventing

Whether the events should be cancelable or able to bubble is configurable.
by setting `cancelable` and `bubbles` in the `@event` decorator.

- `cancelable: true` means the event can be prevented by calling the native `preventDefault()` method in the event handler- by default it's `false`.

- `bubbles: true` means the event will bubble - by default it's `false`.

Since `v2.4.0` this can be configured in the `@event` decorator:

```ts
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

@customElement("my-demo-component")
@event("change", {
    bubbles: true // false by default
    cancelable: true // false by default
})
class MyDemoComponent extends UI5Element {

    onSomeAction() {
        this.fireDecoratorEvent("change")
    }
}
```

### The `fireDecoratorEvent` method

The method is available since version `v2.4.0` and it fires a custom event and gets the configuration for the event from the `@event` decorator. It also strictly checks the details parameter agains the `eventDetails` type for the same event name.

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

### The `fireEvent` method

The method is available since the very beginning of the project and like `fireDecoratorEvent` fires a custom event, but does not consider the settings in the `@event` decorator. So, if you set `cancelable` and `bubbles` in the `@event` decorator, but fire the component events via `fireEvent`, the configured values won't be considered.

Another difference is the default values of the event settings. When using `fireEvent` by default it assumes the event is bubbling (bubbles: true) and not preventable (cancelable: false).

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

### noConflict mode

By default, UI5 Web Components fire all custom events twice: once with their name (e.g., `change`) and once more with a `ui5-` prefix (e.g., `ui5-change`). For example, when the `ui5-switch` is toggled, it fires a `change` event and a `ui5-change` event.

This `noConflict` setting allows us to prevent clashes between native and custom events.

The `noConflict` setting (`@ui5/webcomponents-base/config/NoConflict.js`) controls this behavior:
- **`false` (default)**: Events fire both with and without the `ui5-` prefix.
- **`true`**: Events fire only with the `ui5-` prefix, avoiding name collisions with third-party libraries.
- **Object**: Specific events listed in the object fire only with the `ui5-` prefix, while all other events fire both ways. Example:
  ```json
  {
      "events": ["selection-change", "header-click"]
  }
  ```
  In this case, only `selection-change` and `header-click` fire with the `ui5-` prefix, leaving these names available for other uses.

**Note:** With this setting, when attaching an event listener to a UI5 web component used inside a template, the event name must be specified with the ui5- prefix.