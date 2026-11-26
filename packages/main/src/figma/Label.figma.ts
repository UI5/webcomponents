/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Label".
 * Node: 23480:10812. Emits <ui5-label>.
 *
 * Figma exposes: Required (boolean), ✏️ Label (text).
 * "Type=Regular" is the only variant — no design axis.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=23480-10811",
  {
    props: {
      required: figma.boolean("Required", {
        true: "required",
        false: "",
      }),
      text: figma.string("✏️ Label"),
    },
    example: ({ required, text }) =>
      html`<ui5-label ${required}>${text}</ui5-label>`,
  }
);
