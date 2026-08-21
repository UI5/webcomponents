# Definition of Done

This document provides a checklist for the most common pitfalls, encountered by developers
when creating/updating UI5 Web Components.

## Properties

 - Do I **change public properties** without user interaction?
    
Public properties belong to the application. Usually applications bind components' properties to a model.
If a component changes its own public properties arbitrarily, the application model may get out of sync. Public properties
may only be changed internally upon user interaction (in combination with firing an event).

 - Have I set **noAttribute** for private properties that are not used for CSS?

To keep the components' DOM simple, it's highly recommended to set `noAttribute: true` for all private
properties that are not needed for CSS rules.

 - Does my **CSS handle the default values for enum properties**? 

If a component is styled differently according to the value of an enum property, do not forget to write
your CSS in a way that will apply the default styling even when the property is not set. For example,
if you have a `priority` enum with values `Normal` (default) and `Important`, do not apply the default styles just for
`:host[priority="Normal"]`, but also for simply `:host`.

## Events

 - Do I **fire an event** upon every user interaction? 

When the user interacts with a component, an event
must always be fired to notify the application of state changes, so that it can update its models.

 - Do I **allow the application to prevent** the default behavior of my events?

Sometimes it makes sense to allow the application to call `preventDefault()` on en event - 
e.g. if there are reasonable conditions that must be met to "allow" the user interaction. In other cases,
this is not necessary and making an event preventable would create unexpected user experience.
Consider what makes the most sense in your particular use case.

 - Did I **describe my event's details**?

If an event that your component fires has event details, you should create a Typescript type, use it in the `@event` decorator,
use it with `fireEvent` or `fireDecoratorEvent`, and finally, export it as a named type export.

## CSS

 - Did I put all **overstyling-relevant CSS properties on the host**?

It's best to style the `:host` (rather than the shadow root) as much as possible (especially for paddings, margins, borders, etc.)
so that apps can overstyle the component (in reasonable measure).

## Scoping-friendly/multiple-framework-safe code

 - Have I **hard-coded** tag names in my `.css` or `.ts` files?

Having CSS selectors by tag, such as `ui5-button.accept-btn { color: green; }` is not scoping-friendly, because tag names
may vary. Use the attribute notation: `[ui5-button].accept-btn { color: green; }` instead.

Similarly, if you have code such as `this.shadowRoot.querySelector("ui5-popover")`,
change it to: `this.shadowRoot.querySelector("[ui5-popover]")`.

 - Have I **imported all icons** that my component uses?

The test bundle imports all icons by default, but in a real-world scenario only icons imported by the app will be available.
Therefore, each component should explicitly import the icons it needs.

 - Have I **used instanceof** checks for UI5 Elements?

Checks such as `btn instanceof Button` or `el instanceof UI5Element` are not safe,
because when multiple versions of UI5 Web Components are on the same HTML page, the first to boot will upgrade
all tags, and `instanceof` checks will only work with the first framework's classes and fail for all others.
Therefore, you must use *duck-typing* instead of hard `instanceof` checks.

## Testing

 - Are my tests **reloading the page unnecessarily**?

Calling `await browser.url()` too often just to "reset" your test setup is suboptimal and makes the
whole build slower in the long run. Try to add new assertions to existing tests whenever it makes sense.

 - Are my tests **really testing my code**?

Tests that verify things such as "setting a property creates a corresponding attribute" actually test the framework,
and not the component that is being developed, and are therefore not necessary.