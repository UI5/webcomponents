---
name: ui5-api-review
description: Reviews public API (properties, slots, events, methods) of UI5 Web Components for naming correctness, consistency with codebase conventions, and JSDoc completeness. Use this skill whenever someone asks to "check", "review", or "validate" a component API item — e.g. "check DateRangePicker#showTwoMonths", "review ViewSettingsDialog#reset-click", "check all new API on ViewSettingsDialog", or "does this property name follow project guidelines". Trigger on any reference in the form Component#apiName, a file path with a property/event/slot, or a request to validate naming conventions on new API before a release.
---

# UI5 Web Components — API Review Skill

You are reviewing public API items in the UI5 Web Components monorepo for naming quality, convention consistency, and JSDoc completeness before a release.

## How to use this skill

**Input forms you'll receive:**
- `ComponentName#apiName` — e.g. `ViewSettingsDialog#reset-click`
- `ComponentName` alone — review all new API (typically `@since` the current release)
- A file path + property name
- Multiple items at once — e.g. "check enableReset, customTabs, and reset-click on ViewSettingsDialog"

**Your job for each item:**
1. Locate the definition in the codebase
2. Classify the API type (property, slot, event, method)
3. Validate naming against conventions (see below)
4. Validate JSDoc completeness
5. Check consistency with sibling API on the same component
6. Output a verdict and, if needed, a concrete fix

---

## Step 1 — Locate and classify

Find the exact definition: decorator, type, default value, JSDoc, and where it is used in the template and component logic.

For a batch request ("all new API on X"), find everything marked `@since <current-version>` on the component and its companion elements.

**API types:**
| Type | Decorator | Identifies as |
|------|-----------|---------------|
| Property | `@property(...)` | A configurable attribute |
| Slot | `@slot(...)` | Accepted child elements |
| Event | `@event(...)` | A fired notification |
| Method | `public methodName(` | A callable action |

---

## Step 2 — Validate naming

### Start with the reference

Read `references/naming-patterns.md` first. It contains curated patterns for the most common cases. If the pattern you need is there, use it directly — no codebase search needed.

### Search the codebase when the pattern is missing

If the naming pattern isn't in the reference (e.g. a novel kind of property or an unusual event shape), search `packages/main/src` and `packages/fiori/src` for comparable API. Look for:
- Properties with a similar semantic intent
- Events on the same component or sibling components
- Slots serving a similar structural role

### Naming rules to apply

**Properties — visibility/rendering:**
- Default-off visibility → `show*` (e.g. `showClearIcon`, `showFooter`)
- Default-on visibility → `hide*` (e.g. `hideWeekNumbers`, `hideArrow`)
- Never `enable*`/`disable*` for visibility

**Properties — behavioral:**
- Preventing a physical interaction → `disable*` (e.g. `disableResizing`)
- Standard disabled state → `disabled`
- Never `enable*` — it implies toggling a feature's existence

**Properties — icon accessible name:**
- On a host component exposing accessible text for an internal icon → `iconAccessibleName`
- Not `iconTooltip` (misleading — the value also drives screen reader output)

**Events:**
- Named dialog/component actions → plain action verb: `confirm`, `cancel`, `reset`, `close`, `delete`
- Clicks on specific icon buttons or UI elements → `*-click`: `notifications-click`, `detail-click`
- **Never mix** these two patterns on the same component
- Consistency check: compare with sibling events on the same component

**Slots:**
- Collections → plural noun: `sortItems`, `tabs`, `actions`
- User-extensible additions to built-in items → `additional*` preferred over `custom*`
- Structural/positional → semantic name: `header`, `footer`, `startContent`

**General:**
- camelCase for properties and slots
- kebab-case for events
- Names must describe what the API does, not how it is implemented

---

## Step 3 — Validate JSDoc

Every `@public` API item must have:
- [ ] `@public` tag
- [ ] `@since X.Y.Z` tag
- [ ] `@default <value>` for properties (not slots/events)
- [ ] Description that explains **what** it does
- [ ] For non-obvious behavior: a `**Note:**` explaining **when** to use it or what caveats exist
- [ ] For slots: mention of the accepted element type and, if a companion element needs importing, a note with the import path
- [ ] For events with a detail payload: the payload fields documented

---

## Step 4 — Check sibling consistency

Before finalizing, check how the new API sits alongside existing API on the same component:
- Do events follow the same naming style as existing events?
- Do properties follow the same prefix/pattern as existing properties of the same semantic category?
- If a slot was added alongside a new companion element, do they form a coherent API pair?

---

## Step 5 — Output

For each API item, write a free-form analysis followed by a verdict tag.

**Verdict tags:**
- `[PASS]` — naming and JSDoc are correct, no action needed
- `[FLAG]` — a concern worth discussing before release (inconsistency, ambiguity, minor JSDoc gap)
- `[RENAME]` — the name is wrong; a concrete alternative must be provided

**For every `[FLAG]` or `[RENAME]`**, always include:
1. What is wrong and why (reference the relevant convention)
2. A concrete proposed fix (new name or JSDoc rewrite)
3. If a rename: note that tests, templates, and any documentation samples using the old name will also need updating

**Format example:**

---
### `ComponentName#apiName` — [VERDICT]

*Analysis paragraph explaining the finding.*

**Proposed fix:** rename to `newName` because [reason tied to convention].

**Files to update:** template, cypress tests, website samples if any.

---

## Batch requests

When reviewing multiple related API items (e.g. all new API on a component), review them individually first, then add a short **Overall picture** section at the end summarizing:
- Which items need action before release
- Whether the items form a coherent feature API together (naming style, interaction model)
- Any cross-item inconsistencies not visible when reviewing items in isolation

---

## Silent failure check

While reviewing, also check:
- Does any slot silently ignore items that are missing a required property (e.g. filtering without a warning)? If so, flag it — a `console.warn` should be added.
- Does the component rely on a property being set for correct behavior but not document this as a `**Note:**`? Flag it.
