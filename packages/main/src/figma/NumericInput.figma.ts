/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Numeric Input".
 * Node: 486895:1475. Emits <ui5-numeric-input>.
 *
 * Figma exposes: Value State, Interaction State (Disabled/Read Only),
 * Unit of Measurement (boolean + text).
 * ✏️ Value is a display annotation — not a settable WC prop at design time.
 * Form Factor / Hover / Active ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=486895-1475",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "",
        Negative: 'value-state="Negative"',
        Critical: 'value-state="Critical"',
        Positive: 'value-state="Positive"',
        Information: 'value-state="Information"',
      }),
      disabled: figma.enum("Interaction State", {
        Regular: "",
        Hover: "",
        Active: "",
        Disabled: "disabled",
        "Read Only": "",
      }),
      readonly: figma.enum("Interaction State", {
        Regular: "",
        Hover: "",
        Active: "",
        Disabled: "",
        "Read Only": "readonly",
      }),
    },
    example: ({ valueState, disabled, readonly }) =>
      html`<ui5-numeric-input ${valueState} ${disabled} ${readonly}></ui5-numeric-input>`,
  }
);
