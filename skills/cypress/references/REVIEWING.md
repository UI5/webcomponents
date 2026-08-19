# Reviewing Existing Tests

When reviewing a test file, check:

1. **Meaningful assertions** — is every `it()` block asserting something beyond `"exist"`?
2. **Real events** — is `cy.realClick` / `cy.realPress` / `cy.realType` used instead of simulated events?
3. **Attribute selectors** — are components selected with `[ui5-button]` not `ui5-button`? Does the rule hold inside `.shadow().find(...)` too?
4. **Async safety** — are base API calls using `async .then()` with explicit `await`, not bare calls or `.then(api => api.method())`?
5. **Repetition** — are the same 3+ line interaction sequences duplicated across `it()` blocks?
6. **Shadow DOM** — when asserting on internal structure, is `.shadow().find(...)` used, or better, a POM command?
7. **Event testing** — when testing that events fire, is `cy.stub` / `cy.spy` used rather than relying on side effects? Is the payload and call count asserted?
8. **POM usage** — are raw `.shadow().find("ui5-...")` chains in the spec replaced by POM commands?
9. **TypeScript generics** — does every `cy.get()` that selects a UI5 component use `cy.get<ComponentType>()`?
10. **Unique test names** — does every `it()` block have a unique, descriptive name within its `describe` block?
11. **Alias consistency** — is the element aliased before use, and is that alias used consistently rather than re-selecting the same element?
12. **Formatting** — is every chained method on its own line with a leading tab? Are distinct steps separated by blank lines?
13. **Coverage** — are the keyboard path, disabled/read-only states, and ARIA attributes tested, not just the click path?
14. **File placement** — if all tests in the file require phone simulation, should this be a `.mobile.cy.tsx` file instead?
15. **Icon imports** — is every icon used in `cy.mount()` explicitly imported?
16. **Global state cleanup** — does every test that changes language or theme reset it in `afterEach`?

For each issue found, either fix it directly or explain what to extract and where to put it.
