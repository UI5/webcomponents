/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Text Area".
 * Node: 148569:1916. Emits <ui5-textarea>.
 *
 * Figma exposes: Value State (None/Negative/Critical/Information/Positive),
 * Interaction State (Regular/Hover/Active/Disabled/Read Only), Content (Placeholder/Typed Text).
 * Hover/Active are visual pseudo-states — ignored.
 * placeholder text is slotted as a Figma annotation — not a readable property.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=148569-1916",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "",
        Negative: 'value-state="Negative"',
        Critical: 'value-state="Critical"',
        Information: 'value-state="Information"',
        Positive: 'value-state="Positive"',
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
      html`<ui5-textarea placeholder="Enter text..." ${valueState} ${disabled} ${readonly}></ui5-textarea>`,
  }
);
