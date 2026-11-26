/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "AI Text Area".
 * Node: 371473:25230. Emits <ui5-ai-textarea>.
 *
 * Figma node is a wrapper — no top-level props.
 * Key AITextArea props: loading, promptDescription.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-25230",
  {
    props: {},
    example: () =>
      html`<ui5-ai-textarea placeholder="Enter text..."></ui5-ai-textarea>`,
  }
);
