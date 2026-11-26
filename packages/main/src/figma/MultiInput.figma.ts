/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Multi Input".
 * Node: 212341:2965. Emits <ui5-multi-input>.
 *
 * Figma exposes: Display Only (boolean), Form Factor (ignored).
 * Tokens are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=212341-2965",
  {
    props: {
      readonly: figma.enum("Display Only", {
        True: "readonly",
        False: "",
      }),
    },
    example: ({ readonly }) =>
      html`<ui5-multi-input placeholder="Enter value..." ${readonly}>
  <ui5-token slot="tokens" text="Token 1"></ui5-token>
</ui5-multi-input>`,
  }
);
