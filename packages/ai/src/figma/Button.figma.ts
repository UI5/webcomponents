/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "AI Button".
 * Node: 371473:15343. Emits <ui5-ai-button>.
 *
 * Figma node is a wrapper — no top-level props (Type is fixed to "Primary").
 * Text is a nested layer — read via textContent.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-15343",
  {
    props: {},
    example: () => html`<ui5-ai-button>AI Action</ui5-ai-button>`,
  }
);
