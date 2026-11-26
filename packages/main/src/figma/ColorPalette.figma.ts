/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Color Palette".
 * Node: 382873:412. Emits <ui5-color-palette>.
 *
 * Figma exposes: Form Factor (ignored). Color swatches are slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=382873-412",
  {
    props: {},
    example: () =>
      html`<ui5-color-palette>
  <ui5-color-palette-item value="gold"></ui5-color-palette-item>
  <ui5-color-palette-item value="crimson"></ui5-color-palette-item>
  <ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
</ui5-color-palette>`,
  }
);
