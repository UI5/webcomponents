/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Tokenizer".
 * Node: 202050:805. Emits <ui5-tokenizer>.
 *
 * Figma exposes: Type (Single Line/Multiline), Input (boolean), Form Factor (ignored).
 * Tokens are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=202050-805",
  {
    props: {},
    example: () =>
      html`<ui5-tokenizer>
  <ui5-token text="Token 1"></ui5-token>
  <ui5-token text="Token 2"></ui5-token>
</ui5-tokenizer>`,
  }
);
