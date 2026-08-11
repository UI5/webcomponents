/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Input".
 * Node: 148569:1004. Emits <ui5-input> under the "Web Components" label.
 *
 * Every READABLE Figma property is mapped dynamically below. Properties that
 * cannot be made dynamic are listed in FIGMA_CODE_CONNECT.md § Input with the
 * reason. Form Factor (Compact/Cozy) and the Hover/Active visual states are
 * intentionally ignored (density is global in UI5; pseudo-states have no attr).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=148569-1004",
  {
    props: {
      // Value State → value-state (1:1).
      valueState: figma.enum("Value State", {
        None: "",
        Negative: 'value-state="Negative"',
        Critical: 'value-state="Critical"',
        Positive: 'value-state="Positive"',
        Information: 'value-state="Information"',
      }),
      // Interaction State → disabled / readonly (Regular/Hover/Active ignored).
      stateAttr: figma.enum("Interaction State", {
        Disabled: "disabled",
        "Read Only": "readonly",
        Regular: "",
        Hover: "",
        Active: "",
      }),
      // Text properties.
      placeholder: figma.string("✏️ Placeholder"),
      value: figma.string("✏️ Typed Text"),
      // Value-state message text from the nested "Input Message Popover"
      // instance. MUST be a TOP-LEVEL prop (not inlined in the template) — a
      // figma.* call nested inside html`` emits verbatim. Referenced below as
      // the plain resolved value ${msg.text}.
      msg: figma.nestedProps("Input Message Popover", {
        text: figma.string("✏️ Text"),
      }),
    },
    // CANNOT MAP (see FIGMA_CODE_CONNECT_FINDINGS.md § Input):
    //  - `Content` (Placeholder vs Typed Text) can't pick which text to emit,
    //    so both are emitted;
    //  - `Trailing Action`, `2nd Action` reference slotted icon content;
    //  - `Description Text` has no ui5-input attr.
    // NOTE: the value-state message slot is ALWAYS emitted (can't be gated on
    // the Message Popover boolean without re-breaking the text — gating +
    // resolved-text can't coexist). The text only has meaningful content on
    // variants where the popover exists; elsewhere it resolves to empty.
    example: ({ valueState, stateAttr, placeholder, value, msg }) =>
      html`<ui5-input value="${value}" placeholder="${placeholder}" ${valueState} ${stateAttr}><div slot="valueStateMessage">${msg.text}</div></ui5-input>`,
  }
);
