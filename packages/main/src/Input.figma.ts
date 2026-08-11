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
    },
    // CANNOT MAP (see FIGMA_CODE_CONNECT_FINDINGS.md § Input):
    //  - `Content` (Placeholder vs Typed Text) can't pick which text to emit,
    //    so both are emitted;
    //  - `Trailing Action`, `2nd Action` reference slotted icon content;
    //  - `Description Text` has no ui5-input attr;
    //  - valueStateMessage: the nested "Input Message Popover" DOES expose a
    //    readable ✏️ Text, BUT it cannot be emitted into a `<div slot=…>`
    //    wrapper — a figma.* call nested inside a template literal emits
    //    VERBATIM (prints the source, not the value). It also only exists on
    //    Active-state variants. Not practically mappable — omitted.
    example: ({ valueState, stateAttr, placeholder, value }) =>
      html`<ui5-input value="${value}" placeholder="${placeholder}" ${valueState} ${stateAttr}></ui5-input>`,
  }
);
