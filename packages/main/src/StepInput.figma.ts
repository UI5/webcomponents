/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Step Input".
 * Node: 148569:1727. Emits <ui5-step-input>.
 *
 * See FIGMA_CODE_CONNECT.md § StepInput. Form Factor + Hover/Active ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=148569-1727",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "",
        Negative: 'value-state="Negative"',
        Critical: 'value-state="Critical"',
        Positive: 'value-state="Positive"',
        Information: 'value-state="Information"',
      }),
      stateAttr: figma.enum("Interaction State", {
        Disabled: "disabled",
        "Read Only": "readonly",
        Regular: "",
        Hover: "",
        Active: "",
      }),
      // Numeric value (Figma stores it as a text prop).
      value: figma.string("✏️ Value"),
    },
    // CANNOT MAP (FIGMA_CODE_CONNECT.md § StepInput): min/max/step are not in
    // Figma; `Message Popover` boolean references slotted content; the +/-
    // button icons are instance-swaps (registry problem).
    example: ({ valueState, stateAttr, value }) =>
      html`<ui5-step-input value="${value}" ${valueState} ${stateAttr}></ui5-step-input>`,
  }
);
