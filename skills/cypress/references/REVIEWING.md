# Reviewing Existing Tests

When reviewing a test file, check the items below. Work top-down: fix all **Critical** issues first, then **Important**, then **Minor**.

---

### Critical — fix before merge

1. **Real events** — is `cy.realClick` / `cy.realPress` / `cy.realType` used instead of simulated events?
2. **Attribute selectors** — are components selected with `[ui5-button]` not `ui5-button`? Does the rule hold inside `.shadow().find(...)` too?
3. **Async safety** — are base API calls using `async .then()` with explicit `await`, not bare calls or `.then(api => api.method())`?
4. **Focus assertions** — prefer `.should("be.focused")` on a specific selected element; you get identity for free because you already have a handle on the element. Use `cy.focused()` only when you don't have a handle on the element (e.g. after Tab navigation) — in that case always chain an assertion that uniquely identifies the expected target (a unique `aria-label` value, `aria-colindex`, `aria-rowindex`, etc.), not just any attribute that could match the wrong element.

   ```typescript
   // Preferred — specific element, identity is implicit
   cy.get("#btn")
       .should("be.focused");

   // cy.focused() after Tab — must identify the target uniquely
   cy.realPress("Tab");
   cy.focused()
       .should("have.attr", "aria-colindex", "2");
   ```

5. **Shadow DOM traversal** — when asserting on internal structure, is `.shadow().find(...)` used, or better, a POM command? Do not assert on the host element when the relevant state lives on a shadow child.

6. **Stray `.only` / `.skip`** — flag any `it.only` or `describe.only` as a blocker; they must be removed before merging since they silently skip everything else in CI. Flag `it.skip` as a notice, not a blocker — skipped tests are sometimes intentional while a flaky test is being investigated. Ask the author whether it is deliberate.

---

### Important — fix in same PR

1. **Meaningful assertions** — is every `it()` block asserting something beyond `"exist"`?
2. **Repetition** — are the same 3+ line interaction sequences duplicated across `it()` blocks?
3. **Event testing** — when testing that events fire, is `cy.stub` / `cy.spy` used rather than relying on side effects? Is the payload and call count asserted?
4. **Coverage** — are interactions tested end-to-end: keyboard navigation, attempting to interact with disabled/read-only states (and verifying the interaction is blocked), and ARIA attributes on the rendered shadow DOM? Avoid tests that only mount a component with a property set and assert the attribute reflects — test what the user can or cannot do as a result.
5. **Global state cleanup** — does every test that changes language or theme reset it in `afterEach`?

---

### Minor — fix opportunistically

1. **POM usage** — are raw `.shadow().find("ui5-...")` chains in the spec replaced by POM commands?
2. **TypeScript generics** — does every `cy.get()` that selects a UI5 component use `cy.get<ComponentType>()`?
3. **Unique test names** — does every `it()` block have a unique, descriptive name within its `describe` block?
4. **Alias consistency** — is the element aliased before use, and is that alias used consistently rather than re-selecting the same element?
5. **Formatting** — is every chained method on its own line with a leading tab? Are distinct steps separated by blank lines?
6. **File placement** — if all tests in the file require phone simulation, should this be a `.mobile.cy.tsx` file instead?
7. **Icon imports** — is every icon used in `cy.mount()` explicitly imported?

---

For each issue found, either fix it directly or explain what to extract and where to put it.
