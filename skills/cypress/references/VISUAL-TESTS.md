# Visual Tests

Visual tests take screenshots and compare them against a baseline. They live in a separate location from functional specs:

```
packages/{package}/cypress/specs/visuals/{ComponentName}.cy.tsx
```

They are written using the `visual-test` skill — load it when creating a visual spec.

---

## When to add a visual test

Add or update a visual test when a new API or change affects the **rendered appearance** of a component. Ask: "would a screenshot look different before and after this change?" If yes, a visual test is needed.

Typical triggers:
- New property that changes layout, sizing, or colour (e.g. `design`, `wrappingType`, `state`)
- New slot that renders additional visual content
- CSS changes to shadow DOM parts
- New component variant or shape

Do **not** add a visual test for:
- API that only affects behaviour (events, focus, keyboard navigation) — use a functional spec instead
- Internal refactors with no visible output change

---

## Reviewing — does this change need a visual test?

When reviewing a PR that adds a new API, check:

1. Does the new property or slot change how the component looks?
2. Is there an existing visual spec for this component (`cypress/specs/visuals/{ComponentName}.cy.tsx`)?
   - Yes → does it cover the new API? If not, add a case.
   - No → is the visual change significant enough to warrant a new file? If yes, create one using the `visual-test` skill.
