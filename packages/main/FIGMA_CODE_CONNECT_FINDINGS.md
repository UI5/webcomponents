# Figma Code Connect — API ↔ Figma Findings

**Purpose:** the deliverable is the *misalignments*. For each connected component, this
walks **every public API property** of the web component and cross-references it against
the **live** SAP Web UI Kit Figma properties (read via `get_context_for_code_connect`,
file `SILcWzK5uFghKun9jx6D7c`). Each row gets a verdict + evidence.

**Verdicts:**
- ✅ **mapped** — emitted dynamically, reflects the selected variant; mapping confirmed correct.
- ⚠️ **partial** — mapped but with a caveat (approximation, ungated, presence-only).
- ❌ **can't map** — no honest Figma source (not modelled / slotted / instance-swap / behavioral).
- 🔴 **misalignment** — Figma and the WC model the concept differently, or Figma exposes something the WC doesn't (and vice-versa). *These are the findings.*

**Evidence column:** `figma-props` = from the live property dump; `screenshot` = visually
confirmed; `source` = from the `.ts` API. Assumptions are called out explicitly.

**Verification status (2026-08-11):** all 11 component sets were screenshot-verified this pass
(node renders compared against the mapping). Defects found & fixed: Avatar `disabled` (missing),
Switch `design` (wrong Type→Textual/Graphical mapping, removed). MessageStrip
ColorSet1/2↔Indication/Indication-b direction confirmed via CSS-token names.

**Global conventions (apply to every component):**
- **Form Factor (Compact/Cozy)** → ❌ density is a global UI5 setting, not a per-element attr.
- **Interaction State = Hover/Active/Down/Focus/Visited** → ❌ visual pseudo-states, no attr. Only `Disabled`→`disabled`, `Read Only`→`readonly` are real.
- **accessible\* / accessibilityAttributes / tooltip / name / form** → ❌ a11y or form-association metadata, never modelled in the kit. Omitted from per-component tables unless notable.

---

## Button — ui5-button (node 91702:11733)
Figma props: Type, Interaction State, Toggled, Counter Badge, Attention Badge, Icon (INSTANCE_SWAP), Icon Left, ✏️ Text, Form Factor.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `design` | Type (Primary/Secondary/Tertiary/Accept/Reject/Attention) | ✅ mapped | figma-props; enum→Emphasized/Default/Transparent/Positive/Negative/Attention |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `text` (slot) | ✏️ Text | ✅ mapped | figma-props; `figma.textContent` |
| `icon` | Icon (INSTANCE_SWAP) + Icon Left | ❌ can't map | figma-props; swapped icon name not readable → hardcoded `globe` |
| `endIcon` | — | ❌ can't map | source; kit has single Icon slot |
| `badge` (slot) | Counter Badge + Attention Badge (2 booleans) | 🔴 misalignment | figma-props; WC badge has 3 designs (Inline/Overlay/AttentionDot) + count; Figma = 2 booleans, count in nested layer → design & text hardcoded |
| `type`,`form`,`tooltip`,`loading`,`accessible*` | — | ❌ can't map | source; behavioral/a11y |
| — | Toggled (True/False) | 🔴 misalignment | figma-props; **Figma-only** — ui5-button has no toggle (that's ui5-toggle-button) |

## Input — ui5-input (node 148569:1004)
Figma props: Content, Value State, Interaction State, ✏️ Placeholder, ✏️ Typed Text, Trailing Action, 2nd Action, Message Popover, Description Text (+✏️), Form Factor.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `value` | ✏️ Typed Text | ✅ mapped | figma-props |
| `placeholder` | ✏️ Placeholder | ✅ mapped | figma-props |
| `valueState` | Value State (None/Negative/Critical/Positive/Information) | ✅ mapped | figma-props; 1:1 |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `readonly` | Interaction State=Read Only | ✅ mapped | figma-props |
| `valueStateMessage` (slot) | Message Popover (BOOLEAN) → nested `✏️ Text`+`Value State` | 🔴 misalignment | figma-props; the popover instance **does** expose readable Text+Value State — currently only detected as presence; text could be mapped (improvement owed) |
| `icon` (slot) | 2nd Action (BOOLEAN) | ❌ can't map | figma-props; slotted, instance-swap |
| `showClearIcon` | Trailing Action (BOOLEAN) | ⚠️ partial | figma-props; approximated — Trailing Action is generic |
| — | Content (Placeholder/Typed Text) | 🔴 misalignment | figma-props; Figma-only display toggle; can't gate which text emits → both attrs always emitted |
| — | Description Text (+✏️) | 🔴 misalignment | figma-props; Figma-only, no ui5-input equivalent |
| `type`,`name`,`required`,`maxlength`,`noTypeahead`,`showSuggestions`,`open`,`filter` | — | ❌ can't map | source; behavioral |

## CheckBox — ui5-checkbox (node 154589:905)
Figma props: Label (BOOLEAN), ✏️ Text, Value State, Interaction State (incl. Display Only), Check (Unchecked/Checked/Tristate), Form Factor.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `text` | ✏️ Text (gated by Label boolean) | ✅ mapped | figma-props; gated via `figma.boolean("Label",…)` |
| `checked` | Check=Checked | ✅ mapped | figma-props |
| `indeterminate` | Check=Tristate | ⚠️ partial | figma-props; WC indeterminate is independent of checked; single Figma "Tristate" can't express both |
| `valueState` | Value State | ✅ mapped | figma-props; 1:1 |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `readonly` | Interaction State=Read Only | ✅ mapped | figma-props |
| `displayOnly` | Interaction State=Display Only | ✅ mapped | figma-props; **Figma has Display Only** — maps 1:1 (earlier "no display-only mode" note was WRONG) |
| `required`,`wrappingType`,`name`,`value`,`accessible*` | — | ❌ can't map | source |

## RadioButton — ui5-radio-button (node 154597:1967)
Figma props: Label (BOOLEAN), ✏️ Text, Value State, Interaction State, Selected (True/False), Form Factor.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `text` | ✏️ Text (gated by Label) | ✅ mapped | figma-props |
| `checked` | Selected=True | ✅ mapped | figma-props |
| `valueState` | Value State | ✅ mapped | figma-props; 1:1 |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `readonly` | Interaction State=Read Only | ✅ mapped | figma-props |
| `name`,`value`,`required`,`wrappingType`,`accessible*` | — | ❌ can't map | source; `name`/`value` are form-grouping (app-level) |

Cleanest component — every visual prop maps, no misalignments.

## StepInput — ui5-step-input (node 148569:1727)
Figma props: ✏️ Value, Value State, Interaction State, Message Popover, Description Text (+✏️), Form Factor; descendants Subtract/Add Button with Icon (INSTANCE_SWAP).

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `value` | ✏️ Value | ✅ mapped | figma-props |
| `valueState` | Value State | ✅ mapped | figma-props; 1:1 |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `readonly` | Interaction State=Read Only | ✅ mapped | figma-props |
| `valueStateMessage` (slot) | Message Popover (BOOLEAN) | ❌ can't map | figma-props; nested text |
| `min`,`max`,`step`,`placeholder`,`name`,`required`,`accessible*` | — | ❌ can't map | source; behavioral (not visual) |
| +/- button icons | Subtract/Add Button → Icon (INSTANCE_SWAP) | ❌ can't map | figma-props; icon names not readable |
| — | Description Text (+✏️) | 🔴 misalignment | figma-props; Figma-only |

## MessageStrip — ui5-message-strip (node 910:2517)
Figma props: Value State (incl. Indication Color), Color (None + Indication 1..10 / 1b..10b), Icon (True/False), Close Button (BOOLEAN); descendant Icon (INSTANCE).

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `design` | Value State (Information/Positive/Critical/Negative) | ✅ mapped | figma-props; semantic 1:1 |
| `design`=ColorSet1/2 | Color axis (Indication 1..10 / 1b..10b) | ✅ mapped (WC) | figma-props + CSS-token correspondence: Figma "Indication N" ↔ `--sapIndicationColor_N` = **ColorSet1**; "Nb" ↔ MessageStrip's private set-2 tokens = **ColorSet2**. Direction confirmed |
| `colorScheme` ("1".."10") | Color axis | ✅ mapped (WC) | figma-props; folded into the Color enum output |
| `hideIcon` | Icon=False | ✅ mapped | figma-props |
| `hideCloseButton` | Close Button=False | ✅ mapped | figma-props |
| `icon` (slot) | Icon (INSTANCE) | ❌ can't map | figma-props; slotted custom icon |
| default text slot | — | ❌ can't map | source; slotted (placeholder) |
| React variant ColorSet2 | Color axis | 🔴 misalignment | React parser can't merge 2 axes into one `design` → ColorSet2 unreachable in React only |

## Select — ui5-select (node 181557:7507)
Figma props: **only** Form Factor + Drop-Down. Value State/Interaction State/options live on a NESTED Input instance, not the Select's own props.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `disabled` | (nested Input) Interaction State=Disabled | ⚠️ partial | figma-props; only via embedded Input instance |
| `readonly` | (nested Input) Interaction State=Read Only | ⚠️ partial | figma-props; via embedded Input |
| `valueState` | (nested Input) Value State | ⚠️ partial | figma-props; via embedded Input |
| `options` (slot) | — | ❌ can't map | figma-props; slotted, no option list |
| — | Drop-Down (True/False) | 🔴 misalignment | figma-props; runtime open state, no WC prop |
| — | Value State/Interaction State on Select itself | 🔴 misalignment | figma-props; **absent** on the Select component — owner should add axes like Input |
| `icon`,`name`,`required`,`textSeparator`,`label`(slot),`accessible*` | — | ❌ can't map | source |

## SegmentedButton — ui5-segmented-button (node 91702:11986)
Figma props: 3rd/4th/5th Button (BOOLEAN), ⿻ Text/Icon Segments (SLOT), Type (Text/Icon), Form Factor.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `items` (slot) — segment count | 3rd/4th/5th Button booleans | ⚠️ partial | figma-props; presence adds/removes placeholder items |
| `items` — labels/icons | ⿻ Text/Icon Segments (SLOT) | ❌ can't map | figma-props; slotted content not readable → placeholders |
| — item content type | Type (Text/Icon) | 🔴 misalignment | figma-props; per-item in WC (slotted), component-level axis in Figma |
| selected item | — | ❌ can't map | source; not a readable prop (first item marked selected) |
| `selectionMode`,`itemsFitContent`,`accessible*` | — | ❌ can't map | source |

## Switch — ui5-switch (node 24087:10369)
Figma props: Type (Non-Semantic/Semantic), Interaction State, Checked (True/False), Form Factor; descendant Icon (INSTANCE).

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `checked` | Checked=True | ✅ mapped | figma-props |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `design` (Textual/Graphical) | — | ❌ can't map | **screenshot-verified** (node 24087:10369): ALL Figma switches render icons (✓/✗) = all effectively `Graphical`; not derivable. Earlier `Type→design` mapping was WRONG, removed |
| `textOn`/`textOff` | — | ❌ can't map | source; not modelled in Figma |
| — | Type (Non-Semantic/Semantic) | 🔴 misalignment | figma-props+screenshot; Figma `Type` = colour semantics (neutral vs green/red); ui5-switch has **no** property for this |
| `readonly` | — | 🔴 misalignment | source; WC has `readonly`, Figma Switch has no Read Only state |
| `required`,`name`,`tooltip`,`accessible*` | — | ❌ can't map | source |

## Link — ui5-link (node 187:305)
Figma props: ✏️ Text, Icon (INSTANCE_SWAP), Type (Regular/Emphasized/Subtle/Icon Link), Interaction State, Icon Position (Left/Right/N/A).

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| text (slot) | ✏️ Text | ✅ mapped | figma-props |
| `design` | Type (Emphasized/Subtle; Regular→Default) | ✅ mapped | figma-props; Icon Link→Default (no design equiv) |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props |
| `icon`/`endIcon` | Icon (INSTANCE_SWAP) + Icon Position | ❌ can't map | figma-props; swapped icon name not readable |
| — | Type=Icon Link + Icon Position | 🔴 misalignment | figma-props; Figma models icon-only/position as Type variants; WC uses `icon`/`endIcon` slots — no clean bridge |
| `href`,`target`,`wrappingType`,`interactiveAreaSize`,`accessible*` | — | ❌ can't map | source |

## Avatar — ui5-avatar (node 573:3623)
Figma props: Type (Image/Icon/Initials), Content (Person/Object), Size, Color, Interaction State, Badge (BOOLEAN), Optional Border (BOOLEAN), Person/Object Icon (INSTANCE_SWAP), ✏️ Initials.

| WC API prop | Figma property | Verdict | Evidence / note |
|---|---|---|---|
| `size` | Size (XS–XL) | ✅ mapped | figma-props; 1:1 |
| `colorScheme` | Color (1..10, Transparent, Placeholder) | ✅ mapped | figma-props; 1..10→Accent1..10; `Auto` default absent; Image/Tile→none |
| `shape` | Content (Person→Circle, Object→Square) | ✅ mapped | **screenshot-verified** (node 573:3623: Person col=circles, Object col=squares) |
| `disabled` | Interaction State=Disabled | ✅ mapped | figma-props (was missing, fixed) |
| `initials` | ✏️ Initials | ⚠️ partial | figma-props; emitted regardless of Type (cross-axis gate not possible) |
| `mode` | Type (Image/Icon/Initials) | 🔴 misalignment | figma-props; Figma "Type"=content source, WC `mode`=a11y role (Image/Decorative/Interactive) — different concepts |
| `shape` vs `mode`/content | Content axis | 🔴 misalignment | screenshot; Figma COUPLES shape to content (Person=circle), WC treats `shape` as INDEPENDENT — Figma can't express a square person |
| `icon`/`fallbackIcon` | Person/Object Icon (INSTANCE_SWAP) | ❌ can't map | figma-props; icon name not readable |
| `image` (slot) | Type=Image | ❌ can't map | source; slotted image |
| `badge` (slot) | Badge (BOOLEAN) | ⚠️ partial | figma-props; presence only, not content |
| — | Optional Border (BOOLEAN) | 🔴 misalignment | figma-props; **Figma-only**, no WC prop |
| `accessible*` | — | ❌ can't map | source |

---

## Cross-cutting findings (recurring misalignments)

1. **Instance-swap icons** (Button, Link, StepInput, Avatar) — the selected icon's registry
   name is never readable from a swapped instance. Blocks every `icon=`/`endIcon=` mapping.
   *Fix: owner adds an `Icon Name` text prop, or generate per-icon Code Connect entries.*
2. **Slotted content** (MessageStrip text, Select options, SegmentedButton labels, Input/StepInput
   value-state message) — light-DOM projection isn't a readable prop.
3. **Figma-only properties with no WC equivalent** — Button `Toggled`, Input/StepInput
   `Description Text`, Avatar `Optional Border`, Select `Drop-Down`. These are pure Figma-side
   modelling that the component API doesn't have.
4. **WC props absent from Figma** — Switch `readonly`, Select's own Value/Interaction State
   (only on nested Input). Owner should add the axes.
5. **Concept mismatches** — Avatar `mode` (a11y role) vs Figma `Type` (content source);
   Avatar shape/content coupling; Link icon-as-Type vs icon-as-slot.
6. **Parser asymmetry** — the React parser can't merge two Figma axes into one prop, so
   MessageStrip ColorSet2 is unreachable in React (works in WC).

## Open TODOs surfaced by this audit
- **Switch `design`** — RESOLVED: verified not mappable (screenshot), wrong mapping removed.
- **Input `valueStateMessage`** — the popover text IS readable; upgrade from presence-only to mapping the text.
