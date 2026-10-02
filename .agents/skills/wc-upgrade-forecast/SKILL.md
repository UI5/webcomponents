---
name: wc-upgrade-forecast
description: 'Provide missed-change knowledge for UI5 Web Components upgrade forecasts, especially v1 to v2 migrations.'
argument-hint: 'Application path and source/target UI5 Web Components versions'
user-invocable: true
---

# UI5 Web Components Upgrade Forecast Knowledge

Use this skill as supplemental knowledge when forecasting an application upgrade. Keep the result application-specific and use the target release as the source of truth. The patterns below were derived from comparing independent upgrade analyses; do not perform or report a model comparison unless the user explicitly asks for one.

## Missed-change knowledge

When analyzing an application, explicitly check these surfaces because ordinary migration-guide scans often miss them:

1. **Module renames**: `dist/Badge.js` to `dist/Tag.js`; `dist/StandardListItem.js` to `dist/ListItemStandard.js`. Search imports and filenames separately from HTML tags.
2. **New required imports**: verify imports for components such as `AvatarBadge.js` and `ShellBarSearch.js` whenever their tags are used.
3. **Default flips**: check absent attributes whose defaults changed. For example, `ui5-tag` wrapping changed from `None` to `Normal`; add `wrapping-type="None"` when preserving truncation is required.
4. **Deleted enum values**: verify literal values, not only property names. `ui5-tag design="Set3"` has no v2 equivalent.
5. **Minor-version thresholds**: record the minimum target minor for newly introduced APIs. Treat a proposed replacement as **Uncertain** when the target is below that threshold.
6. **False positives**: do not apply ValueState renames to unrelated enums. `ui5-button design="Positive|Negative|Attention"` remains valid.
7. **String dependencies**: check icon names, asset URLs, CSS parts, slots, events, and dynamically constructed module paths as well as typed APIs.

## Evidence and classification

Classify every application-specific finding as exactly one of:

- **Required**: removed, renamed, invalid, missing, or behavior-breaking.
- **Deprecation cleanup**: still supported but deprecated.
- **Modernization**: optional newer API; the old API remains supported.
- **Unchanged**: verified valid in the target.
- **Uncertain**: evidence or target-version applicability is incomplete.

Also classify the change category separately as exactly one of:

- **Breaking change**: the application can fail to build, load, register a component, resolve a module, accept a value, or execute the affected API when unchanged.
- **Non-breaking change**: the existing application continues to work, but its behavior, appearance, accessibility, or maintainability may change, or an optional modernization is available.
- **Uncertain change**: the available evidence cannot establish whether the unchanged application will fail or only change behavior.

Do not infer the change category only from the migration classification. For example, a removed import is **Required / Breaking change**, while a changed default value is usually **Modernization / Non-breaking change**. A deprecated API is normally **Deprecation cleanup / Non-breaking change** unless target-release evidence shows that it was removed.

Never present an optional modernization as a required migration. Verify claims with the exact target release's source, custom-elements metadata, changelog, tests, or fresh runtime evidence. If evidence cannot decide, use **Uncertain**.

## Forecast output

The result must be table-first. Include one concise application-specific table where every row explicitly describes whether the finding is a breaking or non-breaking change:

| Change category | Priority | Component/API | Description | Current usage | Required action | Evidence |
| --- | --- | --- | --- | --- | --- | --- |

Use **Breaking change**, **Non-breaking change**, or **Uncertain change** in the `Change category` column. Keep the migration classification (`Required`, `Deprecation cleanup`, `Modernization`, `Unchanged`, or `Uncertain`) in the description or action when it adds useful context.
Add focused validation commands for required findings, including module resolution, literal-token scans, icon and asset existence, and a fresh browser-context smoke test when runtime delivery is relevant. Record remaining uncertainty.

The report must state the exact source and target versions. Do not claim completion unless breaking findings are resolved, non-breaking risks are documented or intentionally accepted, old-token scans are clean, referenced modules/icons exist, and relevant runtime checks pass.
