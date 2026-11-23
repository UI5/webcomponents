# Debugging Tests

## Flaky / intermittent failures

Common causes of intermittent failures in Cypress UI5 tests:

1. **Async focus / stale alias.** Always verify that focus has landed on the expected element before continuing with the next interaction (e.g. `cy.realType()`, `cy.realPress()`) — this confirms the navigation was correct and prevents the next action from firing on a stale or wrong target. Prefer `.should("be.focused")` on a specific selected element — you already have a handle on it, so identity is implicit. Use `cy.focused()` only after Tab navigation or other cases where you don't have a direct handle on the landing element; always follow it with an assertion that uniquely identifies the expected target (e.g. `aria-colindex`, a unique `aria-label` value) — a generic attribute check passes even if the wrong element is focused.

2. **Animation.** `setAnimationMode(None)` disables JS-triggered animations and injects `transition-duration: 0s !important; animation-duration: 0s !important;` on all components, which suppresses CSS `@keyframes` as well. A component that waits for `animationend` must still branch on `getAnimationMode()` because the event may fire immediately with zero duration rather than not firing at all.

3. **Deferred focus after render.** A handler that focuses in `onAfterRendering` can land after your assertion. On the test side, assert the focus condition with `cy.focused()` and let `should` retry — don't paper over it with a fixed wait. Note: `getFocusDomRef().focus()` can itself be async when `getFocusDomRef()` returns a web component, as focus delegation may involve an inner element.

4. **A real race in the component.** Reproduce with CDP CPU throttling — if it reproduces at 5–6× it is a product bug:

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

3. **Property not reflecting to the DOM attribute.** Properties declared with `@property({ noAttribute: true })` do not reflect to an attribute. Assert on the property via `.invoke("prop", "...")` rather than the attribute for such properties.

4. **Async base-API call not awaited.** Calls like `setLanguage()`, `setTheme()`, or `applyDirection()` are async. Wrap them so the test waits:
   ```typescript
   cy.wrap({ fn: setLanguage }).then(async ({ fn }) => { await fn("de"); });
   ```
   Reset global config changes in `afterEach`.

5. **Assertion too weak.** Every test must have a meaningful assertion beyond `"exist"`. A test that only checks `exist` can pass even when the feature is broken. Assert visible text, ARIA attributes, or a public property value.

6. **i18n text mismatch.** Hard-coded translated strings break when the locale changes. Read the key from `packages/{package}/src/generated/i18n/i18n-defaults.js` and use the key value in the assertion rather than the translated string.

7. **Custom command not found.** Check `packages/{package}/cypress/support/commands/` for the commands file and that it is imported (alphabetically) in `commands.ts`.

8. **Event fires but targets the wrong element.** A keydown handler on a container receives events from every descendant — if the test asserts on the wrong item being activated, the component is likely using `e.target` instead of resolving the intended item through `event.composedPath()`.

---

## Component bug suspected

If all of the above are ruled out and the test still fails, the problem is likely an unhandled case in the component itself. To investigate:

1. **Reproduce in the browser.** Run `yarn start` from the repo root and open the component's sample page. Reproduce the failing scenario manually — this confirms whether it is a test-only issue or a real product bug.

2. **Add a `debugger` statement.** Place `debugger` inside the relevant handler in the component source (e.g. `onkeydown`, `onAfterRendering`). With DevTools open, trigger the scenario — the debugger will pause at the handler so you can inspect state, `event.composedPath()`, and control flow.

3. **Check for unhandled branches.** Most test failures at this stage trace to a missing `if` branch, an early `return`, or a guard that over-excludes. Look for conditions that silently swallow the event or skip the state update.

4. **Fix in the component, not the test.** If the scenario is valid but the component does not handle it, the fix belongs in the component source. Only after the fix is in place should the test be updated or unblocked.
