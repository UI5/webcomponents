# Debugging Tests

## Flaky / intermittent failures

Common causes of intermittent failures in Cypress UI5 tests:

1. **Async focus / stale alias.** Prefer `.should("be.focused")` on a specific selected element — you already have a handle on it, so identity is implicit. Use `cy.focused()` only after Tab navigation or other cases where you don't have a direct handle on the landing element; always follow it with an assertion that uniquely identifies the expected target (e.g. `aria-colindex`, a unique `aria-label` value) — a generic attribute check passes even if the wrong element is focused.

2. **Animation.** `setAnimationMode(None)` disables JS-triggered animations but not CSS `@keyframes`. A component that waits for `animationend` must also branch on `getAnimationMode()`.

3. **Deferred focus after render.** A handler that focuses in `onAfterRendering` can land after your assertion. Prefer fixing it in the component: use the synchronous `getFocusDomRef().focus()` instead of the async `UI5Element.focus()`, so focus lands in the same tick and the caller stays in the stack trace. On the test side, assert the focus condition with `cy.focused()` and let `should` retry — don't paper over it with a fixed wait.

4. **`forcedTabIndex` re-render.** `ItemNavigation.setCurrentItem()` changes `forcedTabIndex`, which schedules an async re-render that races a synchronous focus call.

5. **Preact event proxy.** Move the handler to a wrapper `div`.

6. **A real race in the component.** Reproduce with CDP CPU throttling — if it reproduces at 5–6× it is a product bug:

```typescript
cy.wrap(null).then(() =>
  Cypress.automation("remote:debugger:protocol", {
    command: "Emulation.setCPUThrottlingRate",
    params: { rate: 6 },
  })
);
```

## Deterministic failures

Tests that fail consistently (not a race condition) — work through these in order:

1. **Wrong selector.** Components must be selected by attribute, never tag name: `cy.get("[ui5-button]")` not `cy.get("ui5-button")`. Same rule inside `.find()`. Check the rendered shadow DOM in the browser to confirm the attribute exists.

2. **Asserting the wrong DOM node.** Shadow DOM is not pierced by default. If you need a shadow child, chain `.shadow().find(...)`. If the assertion target is a slot (light DOM child), select it directly rather than going through shadow.

3. **Property not reflecting to the DOM attribute.** Not all properties reflect — only those declared with `@property({ reflect: true })`. Assert on the property via `.invoke("prop", "...")` rather than the attribute if the component doesn't reflect it.

4. **Async base-API call not awaited.** Calls like `setLanguage()`, `setTheme()`, or `applyDirection()` are async. Wrap them so the test waits:
   ```typescript
   cy.wrap({ fn: setLanguage }).then(async ({ fn }) => { await fn("de"); });
   ```
   Reset global config changes in `afterEach`.

5. **Assertion too weak.** Every test must have a meaningful assertion beyond `"exist"`. A test that only checks `exist` can pass even when the feature is broken. Assert visible text, ARIA attributes, or a public property value.

6. **i18n text mismatch.** Hard-coded translated strings break when the locale changes. Read the key from `packages/{package}/src/generated/i18n/i18n-defaults.js` and use the key value in the assertion rather than the translated string.

7. **Custom command not found.** Check `packages/{package}/cypress/support/commands/` for the commands file and that it is imported (alphabetically) in `commands.ts`.

8. **Event fires but targets the wrong element.** A keydown handler on a container receives events from every descendant — if the test asserts on the wrong item being activated, the component is likely using `e.target` instead of resolving the intended item through `event.composedPath()`.
