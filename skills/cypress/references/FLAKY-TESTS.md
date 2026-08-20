# Flaky Tests

Common causes of intermittent failures in Cypress UI5 tests:

1. **Async focus / stale alias.** Use `cy.focused()` instead of asserting `have.focus` on a saved alias.

2. **Animation.** `setAnimationMode(None)` disables JS-triggered animations but not CSS `@keyframes`. A component that waits for `animationend` must also branch on `getAnimationMode()`.

3. **Deferred focus after render.** A handler that focuses in `onAfterRendering` can land after your assertion — insert `cy.waitRenderFinished()` before asserting. In component code prefer `getFocusDomRef().focus()` over `UI5Element.focus()`: it is synchronous and the caller stays in the stack trace.

4. **`forcedTabIndex` re-render.** `ItemNavigation.setCurrentItem()` changes `forcedTabIndex`, which schedules an async re-render that races a synchronous focus call.

5. **Container keydown handler.** A handler on a container receives events from every descendant — resolve the intended item through `event.composedPath()`, never `e.target`.

6. **Preact event proxy.** Move the handler to a wrapper `div`.

7. **A real race in the component.** Reproduce with CDP CPU throttling — if it reproduces at 5–6× it is a product bug:

```typescript
cy.wrap(null).then(() =>
  Cypress.automation("remote:debugger:protocol", {
    command: "Emulation.setCPUThrottlingRate",
    params: { rate: 6 },
  })
);
```
