/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Token".
 * Node: 32:27727. Emits <ui5-token>.
 *
 * Part of the Tokenizer page. Figma exposes:
 *   ✏️ Text → text
 *   Interaction State=Selected → selected
 *   Interaction State=Read Only → readonly
 *   Hover/Selected Hover are visual pseudo-states — ignored.
 *   Form Factor — global density, ignored.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=32-27727",
  {
    props: {
      text: figma.string("✏️ Text"),
      selected: figma.enum("Interaction State", {
        Regular: "",
        Hover: "",
        Selected: "selected",
        "Selected Hover": "selected",
        "Read Only": "",
      }),
      readonly: figma.enum("Interaction State", {
        Regular: "",
        Hover: "",
        Selected: "",
        "Selected Hover": "",
        "Read Only": "readonly",
      }),
    },
    example: ({ text, selected, readonly }) =>
      html`<ui5-token text="${text}" ${selected} ${readonly}></ui5-token>`,
  }
);
