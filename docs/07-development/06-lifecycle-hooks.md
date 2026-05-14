# Lifecycle Methods

UI5 Web Components are built on top of the native browser APIs, so they naturally support all regular lifecycle hooks such as `constuctor`, `attributeChangedCallback,`, `connectedCallback`, `disconnectedCallback`, etc.
However, to ensure that the state of the component is managed properly, the UI5 Web Components framework offers its own lifecycle methods in place of the original ones, as well as some additional rendering-related ones.

## DOM-related lifecycle hooks

### onEnterDOM
Use instead of `connectedCallback`. This method is called every time the component is connected to the DOM. It is important to note that this method can be called multiple times whenever the element is attached or moved in the DOM. For logic that needs to run each time the element is attached or moved, it is best practice to use this lifecycle method.

**Note:** This method is often used to attach event listeners to observe the component size. Keep in mind that it is best practice to detach all event listeners when the component is disconnected from the DOM.

### onExitDOM
Use instead of `disconnectedCallback`. This method is called every time the component is disconnected from the DOM. It is important to clean up any resources or detach any event listeners when this method is called to avoid memory leaks and ensure proper cleanup.

## Rendering-related lifecycle hooks

### onBeforeRendering
This method is called right before the component is rendered or re-rendered. It is triggered whenever the component state changes (e.g., when a property or slot is changed).

**Note:** Do not access the shadow root in this method, as it won't be available before the first rendering. Use this method only to prepare private state for the purpose of rendering.

### onAfterRendering
This method is called right after the component is rendered. You can safely access the shadow root in this method.

