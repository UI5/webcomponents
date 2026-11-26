/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Step Input".
 * Node: 148569:1727. Emits <ui5-step-input>.
 *
 * See FIGMA_CODE_CONNECT_FINDINGS.md § StepInput. Form Factor + Hover/Active ignored.
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
      // Value-state message text from the nested "Input Message Popover"
      // instance (same pattern as Input). MUST be a top-level prop — a figma.*
      // call inlined in the template emits verbatim. Referenced as ${msg.text}.
      msg: figma.nestedProps("Input Message Popover", {
        text: figma.string("✏️ Text"),
      }),
    },
    // CANNOT MAP (FIGMA_CODE_CONNECT_FINDINGS.md § StepInput): min/max/step are
    // not in Figma; the +/- button icons are instance-swaps (registry problem).
    // NOTE: valueStateMessage slot is always emitted (gating + resolved text
    // can't coexist); text resolves empty on non-popover variants.
    example: ({ valueState, stateAttr, value, msg }) =>
      html`<ui5-step-input value="${value}" ${valueState} ${stateAttr}><div slot="valueStateMessage">${msg.text}</div></ui5-step-input>`,
  }
);
