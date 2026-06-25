# Context

Glossary of domain terms used across the UI5 Web Components repo. One entry per term. No implementation details.

## Toolbar

### Toolbar item
An element placed in a `ui5-toolbar` that participates in its overflow layout. Concrete kinds include `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator`, `ui5-toolbar-spacer`, and the generic `ui5-toolbar-item` wrapper. Every toolbar item inherits from `ToolbarItemBase` and has an `overflowPriority`.

### Overflow priority
Per-item layout hint that controls whether a toolbar item can be moved into the overflow popover when space is tight. Values: `Default`, `NeverOverflow`, `AlwaysOverflow`.

### Overflow popover
The popup attached to the toolbar's overflow button that hosts items pushed out of the visible bar.

### Overflow group
A **layout-only co-overflow tag** on a toolbar item. Items that share the same tag are guaranteed to overflow together — either all visible in the bar or all in the popover, never split. The tag is not a semantic group: it does not imply ARIA grouping, keyboard scoping, or any visual cluster affordance. Items in the same overflow group may be otherwise unrelated; the developer is asserting "yoke these for overflow purposes," nothing more.

The tag is a **free-form string** (`overflowGroup`). The empty string (the default) means "no group" — the item overflows independently. Any non-empty string is a group identifier; two items belong to the same group iff their `overflowGroup` strings are equal (exact match, case-sensitive). Group names are opaque labels: `"filters"`, `"search"`, `"1"` are all valid and carry no ordering.

**Priority restriction.** Items in a non-empty overflow group must have `overflowPriority = "Default"`. `AlwaysOverflow` and `NeverOverflow` are forbidden inside a group, by design — not because the combinations are logically impossible (a group could in principle inherit the strongest priority among its members), but because allowing them would silently promote `overflowPriority` from a per-item statement to a group-level statement, breaking the "priority is per-item, group is a co-overflow tag" mental model. When the rule is violated, the toolbar emits a one-shot `console.warn` for the offending item and treats its priority as `Default` for layout purposes.

**Subclass applicability.** `overflowGroup` is declared on `ToolbarItemBase` so every toolbar item carries it, but the semantics differ by subclass:
- **Content items** (`ToolbarItem`, `ToolbarButton`, `ToolbarSelect`): full participation. Group membership controls overflow as described above.
- **`ToolbarSeparator`**: full participation. Separators can be group members (the typical label-separator-control cluster relies on this). The separator's existing in-popover visibility rules still apply.
- **`ToolbarSpacer`**: the property is accepted but **ignored** by the overflow algorithm — spacers don't carry user-meaningful content, and `getItemWidth` already treats them as ignore-space. Setting a non-empty `overflowGroup` on a spacer triggers a one-shot `console.warn`.

**Contiguity.** Group members are **not** required to be contiguous in the DOM (matches SAPUI5 `OverflowToolbar`). When a group must overflow, **all** of its members go to the popover together, regardless of where they sit in slot order; ungrouped items between them keep their slot positions in the visible bar. The visible bar is never reordered. In the popover, group members appear adjacent to each other. The overflow algorithm treats each group as a single virtual movable unit whose position is the rightmost member's slot index.

**Group priority.** Since all members of a group are forced to `Default` priority (see "Priority restriction" above), every group's collective priority is `Default`. Groups mix with ungrouped `Default` items during overflow distribution and are ordered by rightmost slot index. There is no notion of "group A is more important than group B."

**Popover order.**
- Members of a group appear in **slot order** within the popover.
- The group is positioned among other overflowed items by the **rightmost member's slot index**.
- When `reverseOverflow` is true (popover placed above the toolbar), the whole popover list reverses; the group stays as a contiguous block, with its internal order reversed alongside everything else.

**Width budgeting.** Groups are atomic during overflow distribution: when the algorithm picks the next unit to push into overflow and that unit is a group, the **entire group** is pushed in one step, deducting the sum of its members' widths from the remaining overflow budget. This can over-shoot (recover more width than needed), leaving extra empty space in the visible bar. The over-shoot is accepted by design — the group is indivisible by the developer's request. No fallback to "skip this group and try a smaller candidate" logic.
