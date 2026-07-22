# Figma Code Connect — Button: known limitations & owner actions

This documents the **Web Components** Code Connect mapping for the SAP Web UI Kit
`Button` (Figma node `91702:11733` in file `SILcWzK5uFghKun9jx6D7c`), what works,
what does **not** update dynamically when you select different button variants in
Dev Mode, **why**, and **what the Figma file owner must change** to fix it.

Mapping file: `packages/main/src/Button.figma.ts`
Config: `packages/main/figma.config.json` (`parser: "html"`, `label: "Web Components"`)

The goal is a snippet with **no hardcoded values** — selecting a different button
(different icon, different badge) in Dev Mode should be reflected in the generated
`<ui5-button>` code. Today, two things block that. Both are **Figma-side modeling
gaps**, not code bugs: Code Connect can only surface values that the Figma
component actually exposes as readable properties.

---

## ✅ What already works (dynamic)

These reflect the selected variant correctly in Dev Mode:

| Snippet output | Driven by Figma property | Notes |
|---|---|---|
| `design="…"` | `Type` variant | Primary→Emphasized, Secondary→Default, Tertiary→Transparent, Accept→Positive, Reject→Negative, Attention→Attention |
| `disabled` | `Interaction State` variant | emitted only for `Disabled` |
| button label text | `Text` layer (`figma.textContent`) | reads the actual layer string |

---

## ❌ Problem 1 — Icon is not dynamic

**Symptom:** changing the icon on a button in Figma does not change the code; the
snippet always shows `icon="globe"`.

**Why:** the icon is a Figma **instance-swap** property (`Icon`, type
`INSTANCE_SWAP`). Code Connect can read a *boolean* (`Icon Left` — is an icon
shown or not), but it **cannot read the swapped icon's name into a string**
unless the icon components in the Kit's icon library are themselves
Code-Connected to output their name. They are not. So the mapping can only toggle
the attribute on/off and must hardcode a placeholder name.

**Important context:** in code there is no per-icon *component* to import. A UI5
icon is just a **name string** in a registry (`icon="globe"`), resolved to an SVG
at runtime. That shapes who owns each fix below.

There are two ways to fix this — one is the Figma owner's, one is ours:

### Option A — `Icon Name` text property  → **Figma owner's job**
Add a plain **text property** on the Button component (e.g. `Icon Name`) holding
the icon's registry name. The mapping reads it with `figma.string("Icon Name")`
and emits `icon="…"` dynamically. Pure Figma-side change, no icon-library work.
Trade-off: it's duplicated data — the designer must keep the typed name in sync
with the icon actually shown, so it can drift.

### Option B — Code Connect the icon set  → **webcomponents / tooling team's job**
"Code-Connecting the icon library" does **not** mean mapping icons to
components — there aren't any. It means authoring one tiny Code Connect entry
**per icon** whose only output is its own registry name, so that
`figma.instance("Icon")` on the Button can pull the *selected* icon's name into
the snippet. The Kit already names its icon instances by icon
(`mainComponentName: "globe"`), so the correspondence exists; the work is
**generating** those hundreds of entries (not hand-writing them). Correct
long-term, zero designer effort, no drift. The owner's only responsibility here
is to keep the icons as real, connectable components in the Kit.

**Recommendation:** Option A for a quick owner-only fix now; Option B (generated)
as the durable solution owned by the webcomponents team.

Until either lands, `icon="globe"` is a placeholder the consumer edits by hand.

---

## ❌ Problem 2 — Badge design & text are not dynamic

**Symptom:** clicking buttons with different badges doesn't change the code; the
counter badge always renders `design="OverlayText" text="1"`, and there's no way
to get `design="InlineText"`.

**Why:** the `ui5-button-badge` web component supports **three** designs —
`InlineText`, `OverlayText`, `AttentionDot`. But in Figma the badge is modeled as
**two independent booleans**:

- `Counter Badge` (True/False)
- `Attention Badge` (True/False)

There is **no badge-`design` enum** to read, so the mapping cannot distinguish
`OverlayText` from `InlineText` — it can only detect *counter badge present*.
Likewise the counter **number** lives in a nested, unexposed text layer
(`Counter Badge` instance → child text `"72"`), so the `text="…"` value can't be
read either. Both are therefore hardcoded.

**What the Figma owner should do:**

1. **Replace the two badge booleans with a single badge `design` variant/enum**
   on the Button component, with options that map 1:1 to the web component:
   `None | InlineText | OverlayText | AttentionDot`. The mapping can then use
   `figma.enum("Badge Design", { … })` to emit the correct `design="…"` (and omit
   the badge entirely for `None`).
2. **Expose the badge text as a component text property** (e.g. a `Badge Text`
   string prop) instead of a buried nested layer, so the mapping can read it with
   `figma.string("Badge Text")` and emit `text="…"` dynamically. `AttentionDot`
   has no text and should omit it.

Until then, the badge snippet is fixed at `OverlayText` / `text="1"` for the
counter and `AttentionDot` for the attention badge.

---

## Summary for the owner

To make the Button snippet fully dynamic (no hardcoded values), the Figma
component needs:

1. **Icon:** either Code-Connect the icon library components, or add an
   `Icon Name` text property on Button.
2. **Badge design:** a single `Badge Design` enum (`None/InlineText/OverlayText/
   AttentionDot`) replacing the two booleans.
3. **Badge text:** a `Badge Text` string property replacing the nested text layer.

Once (1)–(3) exist, update `packages/main/src/Button.figma.ts` to swap the
hardcoded strings for `figma.instance`/`figma.enum`/`figma.string` reads and
re-publish.
