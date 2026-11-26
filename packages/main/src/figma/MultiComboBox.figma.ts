/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Multi Combobox".
 * Node: 212722:56058. Emits <ui5-multi-combobox>.
 *
 * Figma exposes: Drop-Down (boolean — runtime state), Form Factor (ignored).
 * Items are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=212722-56058",
  {
    props: {},
    example: () =>
      html`<ui5-multi-combobox placeholder="Select options...">
  <ui5-mcb-item text="Option 1"></ui5-mcb-item>
  <ui5-mcb-item text="Option 2"></ui5-mcb-item>
  <ui5-mcb-item text="Option 3"></ui5-mcb-item>
</ui5-multi-combobox>`,
  }
);
