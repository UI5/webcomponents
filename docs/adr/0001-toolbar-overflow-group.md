# Toolbar overflow group: string-typed, non-contiguous, mixed-priority banned

`ui5-toolbar-item` (and its subclasses) gain a public `overflowGroup: string` property (default `""`, empty = no group). Items sharing a non-empty `overflowGroup` overflow as one atomic unit — when any member must move to the overflow popover, all members go. Group members do **not** need to be contiguous in the DOM; the visible bar preserves slot order, and grouped items become adjacent only inside the popover. Items in a group must have `overflowPriority = "Default"` — `AlwaysOverflow` and `NeverOverflow` are forbidden inside groups; violations emit a one-shot `console.warn` and the offending item's priority is treated as `Default`.

## Considered Options

- **`number`-typed `overflowGroup` (SAPUI5 parity).** Rejected. HTML attributes are strings natively; `string` lets developers use meaningful names (`overflow-group="filters"` vs. `overflow-group="3"`); empty-string-as-absent matches existing UI5 WC conventions (`accessibleName` etc.); avoids the `0`-as-sentinel footgun. Behavioral parity with SAPUI5 is preserved — only the JS type differs.

- **Contiguous-only groups.** Rejected. SAPUI5 allows non-contiguous group members and yokes the overflow decision without reordering the visible bar; matching that behavior makes migration friction-free. The cost is a slightly more complex distribution algorithm (bucket grouped items into virtual units), but the public-facing contract is simpler.

- **Allow `AlwaysOverflow`/`NeverOverflow` in groups; group inherits strongest priority.** Rejected. The combinations are not strictly incoherent (a group could in principle adopt the most restrictive priority among its members), but allowing them would silently promote `overflowPriority` from a per-item statement to a group-level statement, breaking the "priority is per-item, group is a co-overflow tag" mental model. Banning the combination keeps the two concepts orthogonal and the API explainable in one sentence.

- **DOM reordering to keep group members visually adjacent in the bar.** Rejected outright. Reordering slotted children silently breaks tab order, screen-reader narration, and any caller assumption that visible order equals slot order — a much larger feature than grouping, and one this ticket does not motivate.

## Consequences

- The JS-property type of `overflowGroup` diverges from SAPUI5 (`string` vs. `int`). Migrating apps must change `overflowGroup={1}` to `overflowGroup="1"`; the attribute form (`overflow-group="1"`) is unchanged.
- Developers cannot use `overflowGroup` to promote a single item's priority to a group-level priority. If that becomes a real need, it requires a new API decision (not a behavior tweak inside this one).
- The distribution algorithm (`Toolbar.distributeItems`) gains a pre-step that buckets grouped movable items into virtual units. Each virtual unit's slot position is the rightmost member's index; its width is the sum of member widths. Pushing a group into overflow is atomic and can over-shoot the recovered-width target — accepted by design.
- `minContentWidth` (sum of `NeverOverflow` item widths) is unaffected, since groups cannot contain `NeverOverflow` items.
