# TOPIC P Open Issues — Filtered (Unassigned + Mine)

> Showing only issues with **no assignee** or assigned to **dobrinyonkov**.
> Excludes issues assigned exclusively to others.

### Legend
- 🟢 = pattern exists on sibling component, no design needed
- 🟡 = partially exists, minor design clarification needed
- 🔴 = needs design decision (or has `Design Pending` label)
- **PR:** linked pull requests with status (open/merged/closed)
- **Jira:** BGSOFUIPIRIN ticket reference (status unavailable — `jira-mcp` user needs project access)

---

## Easy (CSS fixes, small API additions, documentation)

| # | Type | Title | Status | Design? | PR | Jira |
|---|------|-------|--------|---------|-----|------|
| [#13056](https://github.com/SAP/ui5-webcomponents/issues/13056) | bug | [ui5-illustrated-message]: remove declared --sap parameters | unassigned | 🟢 | — | — |
| [#12499](https://github.com/SAP/ui5-webcomponents/issues/12499) | bug | [ui5-shellbar]: Incorrect spacing between logo and title | **mine** | 🟢 | — | — |

## Medium (Targeted logic changes, single-component feature additions)

| # | Type | Title | Status | Design? | PR | Jira |
|---|------|-------|--------|---------|-----|------|
| [#13374](https://github.com/SAP/ui5-webcomponents/issues/13374) | bug | [Breadcrumb]: Same page link announced in VPC mode | unassigned | 🟢 already uses `aria-current` | — | — |
| [#13308](https://github.com/SAP/ui5-webcomponents/issues/13308) | bug | [Select]: Semantic Message in Dropdown | unassigned | 🟢 ComboBox has this | — | — |
| [#13264](https://github.com/SAP/ui5-webcomponents/issues/13264) | FR | [ListItem]: Expose `accessibleRole` | unassigned | 🟢 already private, just expose | [#13463](https://github.com/SAP/ui5-webcomponents/pull/13463) (open) | [BGSOFUIPIRIN-7043](https://jira.tools.sap/browse/BGSOFUIPIRIN-7043) |
| [#13070](https://github.com/SAP/ui5-webcomponents/issues/13070) | FR | [ToolbarButton]: Missing accessibleRole prop | unassigned | 🟢 Button has `accessibleRole` | — | — |
| [#12673](https://github.com/SAP/ui5-webcomponents/issues/12673) | FR | IllustratedMessage: Doesn't resize on height change | unassigned | 🟢 ResizeObserver already there | [#13035](https://github.com/SAP/ui5-webcomponents/pull/13035) (closed), [#12872](https://github.com/SAP/ui5-webcomponents/pull/12872) (closed) | [BGSOFUIPIRIN-7054](https://jira.tools.sap/browse/BGSOFUIPIRIN-7054) |
| [#12045](https://github.com/SAP/ui5-webcomponents/issues/12045) | FR | Add live region for selectable List | unassigned | 🟡 Input has aria-live, List doesn't | — | [BGSOFUIPIRIN-7045](https://jira.tools.sap/browse/BGSOFUIPIRIN-7045) |
| [#11968](https://github.com/SAP/ui5-webcomponents/issues/11968) | FR | [Toolbar]: Customize accessible name of overflow button | unassigned | 🟡 Toolbar has `accessibleName` but not overflow btn | [#13416](https://github.com/SAP/ui5-webcomponents/pull/13416) (merged) ✅ | [BGSOFUIPIRIN-7044](https://jira.tools.sap/browse/BGSOFUIPIRIN-7044) |
| [#11909](https://github.com/SAP/ui5-webcomponents/issues/11909) | FR | Checkbox Label required styling | **mine** | 🔴 `Design Pending` label | — | — |
| [#11490](https://github.com/SAP/ui5-webcomponents/issues/11490) | FR | `focus` method should focus one of the items | **mine** | 🟡 needs alignment on which item | [#11762](https://github.com/SAP/ui5-webcomponents/pull/11762), [#11869](https://github.com/SAP/ui5-webcomponents/pull/11869), [#11997](https://github.com/SAP/ui5-webcomponents/pull/11997), [#12668](https://github.com/SAP/ui5-webcomponents/pull/12668) (all merged) ✅ | [BGSOFUIPIRIN-6862](https://jira.tools.sap/browse/BGSOFUIPIRIN-6862) |
| [#11218](https://github.com/SAP/ui5-webcomponents/issues/11218) | bug | [AvatarGroup]: Unable to make non-interactive | **mine** | 🔴 `Design Pending` label | — | — |
| [#10732](https://github.com/SAP/ui5-webcomponents/issues/10732) | FR | [Avatar] Deal with loading big image or slow connection | **mine** | 🔴 `Design Pending` label | — | — |
| [#10666](https://github.com/SAP/ui5-webcomponents/issues/10666) | FR | [ui5-list]: Checkbox accessible names not unique | unassigned | 🔴 `Design Pending` label | — | [ACC-264](https://jira.tools.sap/browse/ACC-264) |
| [#10636](https://github.com/SAP/ui5-webcomponents/issues/10636) | FR | [List]: list item has no border when nested in panel | **mine** | 🔴 `Design Pending` label | — | — |
| [#9875](https://github.com/SAP/ui5-webcomponents/issues/9875) | FR | [Avatar]: decorative property should be supported | unassigned | 🔴 `Design Pending` — but `mode="Decorative"` already exists! | — | — |

## Hard (Multi-component, architectural, or design-pending)

| # | Type | Title | Status | Design? | PR | Jira |
|---|------|-------|--------|---------|-----|------|
| [#12557](https://github.com/SAP/ui5-webcomponents/issues/12557) | FR | [DynamicPage]: Customize accessibility role | unassigned | 🔴 Dialog/Panel have it, DynamicPage needs design | — | [BGSOFUIPIRIN-7046](https://jira.tools.sap/browse/BGSOFUIPIRIN-7046) |
| [#12513](https://github.com/SAP/ui5-webcomponents/issues/12513) | FR | [UI5-List]: Auto-switch growing mode based on page size | **mine** | 🔴 `Design Pending` label | — | — |
| [#12004](https://github.com/SAP/ui5-webcomponents/issues/12004) | FR | Add accessibleNameRef/DescriptionRef to multiple components | **mine** | 🟡 pattern exists, scope needs alignment | [#11831](https://github.com/SAP/ui5-webcomponents/pull/11831), [#12081](https://github.com/SAP/ui5-webcomponents/pull/12081), [#12470](https://github.com/SAP/ui5-webcomponents/pull/12470) (all merged) ✅ | [BGSOFUIPIRIN-6901](https://jira.tools.sap/browse/BGSOFUIPIRIN-6901) |
| [#11948](https://github.com/SAP/ui5-webcomponents/issues/11948) | FR | [ui5-dynamic-page]: Update "expanded header region" a11y | **mine** | 🔴 `Design Pending` label | — | — |
| [#11837](https://github.com/SAP/ui5-webcomponents/issues/11837) | FR | Virtualization for Tree component | **mine** | 🔴 architectural decision | — | [BGSOFUIPIRIN-6880](https://jira.tools.sap/browse/BGSOFUIPIRIN-6880) |
| [#11714](https://github.com/SAP/ui5-webcomponents/issues/11714) | bug | [ShellBar]: A11y 300% zoom level support | unassigned | 🔴 needs responsive breakpoint design | — | — |
| [#9907](https://github.com/SAP/ui5-webcomponents/issues/9907) | FR | [List] Forms mode navigation enablement | **mine** | 🔴 new nav pattern needs full spec | [#9904](https://github.com/SAP/ui5-webcomponents/pull/9904) (closed) | — |
| [#9864](https://github.com/SAP/ui5-webcomponents/issues/9864) | FR | ProductSwitch: Items per line responsive | **mine** | 🔴 `Design Pending` label | — | — |
| [#9551](https://github.com/SAP/ui5-webcomponents/issues/9551) | FR | Navigation Bar in Dynamic Page | **mine** | 🔴 entirely new sub-component | — | — |
| [#8250](https://github.com/SAP/ui5-webcomponents/issues/8250) | FR | New focus handling behaviour | unassigned | 🔴 architectural change | [#8253](https://github.com/SAP/ui5-webcomponents/pull/8253) (closed), [#8590](https://github.com/SAP/ui5-webcomponents/pull/8590) (merged) ✅ | [BGSOFUIPIRIN-6469](https://jira.tools.sap/browse/BGSOFUIPIRIN-6469) |
| [#8006](https://github.com/SAP/ui5-webcomponents/issues/8006) | FR | [Flexible Column Layout]: Hide start column | **mine** | 🔴 needs design for column visibility | — | [BGSOFUIPIRIN-6623](https://jira.tools.sap/browse/BGSOFUIPIRIN-6623) |
| [#7722](https://github.com/SAP/ui5-webcomponents/issues/7722) | FR | ShellBar items cannot hold data-help-ids | **mine** | 🟡 `data-ui5-stable` exists, generic forwarding doesn't | — | — |
| [#7243](https://github.com/SAP/ui5-webcomponents/issues/7243) | FR | [List]: Optimize performance with lots of items | unassigned | 🔴 tied to virtualization architecture | — | — |

---

## Summary

| Complexity | 🟢 No design | 🟡 Minor | 🔴 Needs design | Total |
|------------|-------------|----------|----------------|-------|
| Easy | 2 | 0 | 0 | **2** |
| Medium | 5 | 3 | 5 | **13** |
| Hard | 0 | 2 | 11 | **13** |
| **Total** | **7** | **5** | **16** | **28** |

| | bug | FR | Total |
|---|---|---|---|
| Easy | 2 | 0 | 2 |
| Medium | 2 | 11 | 13 |
| Hard | 1 | 12 | 13 |

---

## Likely Closeable (PRs already merged)

| # | Title | Merged PRs | Note |
|---|-------|-----------|------|
| [#11968](https://github.com/SAP/ui5-webcomponents/issues/11968) | Toolbar overflow button accessible name | #13416 | Verify fix covers requirement |
| [#11490](https://github.com/SAP/ui5-webcomponents/issues/11490) | focus() should focus items | #11762, #11869, #11997, #12668 | 4 PRs merged — likely done |
| [#12004](https://github.com/SAP/ui5-webcomponents/issues/12004) | accessibleNameRef/DescriptionRef | #11831, #12081, #12470 | Partial — check remaining components |
| [#8250](https://github.com/SAP/ui5-webcomponents/issues/8250) | New focus handling behaviour | #8590 | May be partially addressed |

## Actionable Now (no design needed, no PR yet)

| # | Type | Title | Pattern Source |
|---|------|-------|---------------|
| [#13056](https://github.com/SAP/ui5-webcomponents/issues/13056) | bug | Remove declared --sap parameters | CSS cleanup |
| [#12499](https://github.com/SAP/ui5-webcomponents/issues/12499) | bug | ShellBar spacing fix | CSS fix |
| [#13374](https://github.com/SAP/ui5-webcomponents/issues/13374) | bug | Breadcrumb VPC link announcement | Already has `aria-current` |
| [#13308](https://github.com/SAP/ui5-webcomponents/issues/13308) | bug | Select: Semantic Message in Dropdown | ComboBox has it |
| [#13070](https://github.com/SAP/ui5-webcomponents/issues/13070) | FR | ToolbarButton accessibleRole | Button has `accessibleRole` |
| [#12673](https://github.com/SAP/ui5-webcomponents/issues/12673) | FR | IllustratedMessage height resize | ResizeObserver already in place (2 prior PRs closed) |

## Has Open PR

| # | Title | PR |
|---|-------|----|
| [#13264](https://github.com/SAP/ui5-webcomponents/issues/13264) | ListItem expose `accessibleRole` | [#13463](https://github.com/SAP/ui5-webcomponents/pull/13463) (open) |
