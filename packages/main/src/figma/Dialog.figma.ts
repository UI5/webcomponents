/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Dialog".
 * Node: 1101:2510. Emits <ui5-dialog>.
 *
 * Figma exposes: Scrollable Content (boolean) — visual annotation only.
 * headerText, footer, content are all slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1101-2510",
  {
    props: {},
    example: () =>
      html`<ui5-dialog header-text="Dialog Title">
  <p>Dialog content goes here.</p>
  <div slot="footer">
    <ui5-button design="Emphasized">Confirm</ui5-button>
    <ui5-button>Cancel</ui5-button>
  </div>
</ui5-dialog>`,
  }
);
