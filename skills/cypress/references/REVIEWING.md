# Reviewing Existing Tests

When reviewing a test file, check:

1. **Meaningful assertions** — is every `it()` block asserting something beyond `"exist"`?
2. **Real events** — is `cy.realClick` / `cy.realPress` / `cy.realType` used instead of simulated events?
3. **Attribute selectors** — are components selected with `[ui5-button]` not `ui5-button`?
4. **Async safety** — are base API calls using `async .then()` with explicit `await`, not bare calls or `.then(api => api.method())`?
5. **Repetition** — are the same 3+ line interaction sequences duplicated across `it()` blocks?
6. **Shadow DOM** — when asserting on internal structure, is `.shadow().find(...)` used, or better, a POM command?
7. **Event testing** — when testing that events fire, is `cy.stub` / `cy.spy` used rather than relying on side effects?
8. **POM usage** — are raw `.shadow().find("ui5-...")` chains in the spec replaced by POM commands?
9. **TypeScript generics** — does every `cy.get()` that selects a UI5 component use `cy.get<ComponentType>()`?
10. **Unique test names** — does every `it()` block have a unique, descriptive name within its `describe` block?
11. **Alias consistency** — is the element aliased before use, and is that alias used consistently rather than re-selecting the same element?

For each issue found, either fix it directly or explain what to extract and where to put it.
