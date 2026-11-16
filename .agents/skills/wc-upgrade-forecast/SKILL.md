---
name: wc-upgrade-forecast
description: 'Provide missed-change knowledge for UI5 Web Components upgrade forecasts across any version range.'
argument-hint: 'Application path and source/target UI5 Web Components versions'
user-invocable: true
---

# UI5 Web Components Upgrade Forecast Knowledge

Use this skill as supplemental knowledge when forecasting an application upgrade across any version range. Keep the result application-specific and use the target release as the source of truth.

## Before analysing: locate the changelog

Check these sources in order for the version range being analysed:

1. **Local CHANGELOG.md** — search from the application directory upward; extract all entries between the source and target versions.
2. **GitHub releases** — `https://github.com/SAP/ui5-webcomponents/releases` covers every release; fetch the relevant release pages.
3. **No changelog found** — rely on library knowledge and mark every finding as **inferred**.

Use the changelog as the authoritative list of changes; do not assume a fixed set of breaking changes.

## Missed-change knowledge

When analyzing an application, explicitly check these surfaces because ordinary migration-guide scans often miss them regardless of version:

1. **Module renames**: search imports and dist filenames separately from HTML tags; a renamed module breaks the import silently until runtime.
2. **New required imports**: verify that every used custom-element tag has a corresponding import; components extracted into sub-packages often require a new import statement.
3. **Default flips**: check absent attributes whose defaults changed between versions; the omitted attribute can silently alter behavior.
4. **Deleted enum values**: verify literal attribute values, not only property names; a removed enum value is a runtime error, not a build error.
5. **Minor-version thresholds**: record the minimum target minor version required for any replacement API. Mark a proposed replacement **Uncertain** when the target is below that threshold.
6. **False positives**: confirm that a rename or removal in one component does not incorrectly apply to a similarly-named API in another component.
7. **String dependencies**: check icon names, asset URLs, CSS parts, slots, event names, and dynamically constructed module paths as well as typed APIs.

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
