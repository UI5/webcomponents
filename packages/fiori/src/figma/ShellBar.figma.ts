/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Shell Bar".
 * Node: 285220:5418. Emits <ui5-shellbar>.
 *
 * Figma exposes: Size (S/M/L/XL/XXL), Hamburger (boolean) — layout/responsive concerns.
 * Content (logo, search, items) is fully slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=285220-5418",
  {
    props: {},
    example: () =>
      html`<ui5-shellbar primary-title="App Title" secondary-title="Subtitle">
  <img slot="logo" src="logo.svg" alt="Logo" />
  <ui5-shellbar-item slot="items" icon="add" text="Add"></ui5-shellbar-item>
</ui5-shellbar>`,
  }
);
