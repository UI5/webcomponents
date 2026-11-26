/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Menu".
 * Node: 449947:614. Emits <ui5-menu>.
 *
 * Figma exposes: Form Factor (ignored — global density).
 * Menu items are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=449947-614",
  {
    props: {},
    example: () =>
      html`<ui5-menu header-text="Menu Title">
  <ui5-menu-item text="Item 1" icon="add"></ui5-menu-item>
  <ui5-menu-item text="Item 2" icon="edit"></ui5-menu-item>
  <ui5-menu-item text="Item 3" icon="delete"></ui5-menu-item>
</ui5-menu>`,
  }
);
