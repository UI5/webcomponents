/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Drop-Down".
 * Node: 182813:5890. Emits <ui5-combobox>.
 *
 * The Figma "Drop-Down" page maps to ui5-combobox (free-text + suggestions).
 * Items are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=182813-5890",
  {
    props: {},
    example: () =>
      html`<ui5-combobox placeholder="Select or type...">
  <ui5-cb-item text="Option 1"></ui5-cb-item>
  <ui5-cb-item text="Option 2"></ui5-cb-item>
  <ui5-cb-item text="Option 3"></ui5-cb-item>
</ui5-combobox>`,
  }
);
