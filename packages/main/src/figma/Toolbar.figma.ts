/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Toolbar".
 * Node: 183497:6191. Emits <ui5-toolbar>.
 *
 * Figma exposes: Form Factor (ignored — global density).
 * Toolbar items are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=183497-6191",
  {
    props: {},
    example: () =>
      html`<ui5-toolbar>
  <ui5-toolbar-button text="Action 1" icon="add"></ui5-toolbar-button>
  <ui5-toolbar-button text="Action 2" icon="edit"></ui5-toolbar-button>
  <ui5-toolbar-spacer></ui5-toolbar-spacer>
  <ui5-toolbar-button text="Settings" icon="action-settings"></ui5-toolbar-button>
</ui5-toolbar>`,
  }
);
