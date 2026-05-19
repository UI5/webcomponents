# Development

In this section, you will learn how to create your own custom UI5 Web Components packages and develop your own UI5 Web Components. This section will cover how UI5 Web Components work, how to manage their states, and understand their lifecycle.

All UI5 Web Components are built on top of the `UI5Element` class, which extends `HTMLElement`.

The entire API provided by UI5 Web Components can be condensed into a set of base classes, decorators, lifecycle hooks, and rendering methods.

## UI5Element
`UI5Element` is a class provided by the `@ui5/webcomponents-base` package. This class enhances the `HTMLElement` class by adding basic state management functionality and runtime context to all UI5 Web Components.

## Decorators
- `@customElement` - Declares a new UI5 Web Component.
- `@property` - Declares a property.
- `@slot` - Declares a slot.
- `@event` - Declares a DOM event fired by the component.

## Lifecycle Methods
- `onEnterDOM` - Called when the component is added to the DOM.
- `onBeforeRendering` - Called before the component is rendered.
- `onAfterRendering` - Called after the component is rendered.
- `onExitDOM` - Called when the component is removed from the DOM.
