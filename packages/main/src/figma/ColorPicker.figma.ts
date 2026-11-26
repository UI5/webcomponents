/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Color Picker".
 * Node: 23541:11038. Emits <ui5-color-picker>.
 *
 * Figma exposes: Gradient Field color variants (Blue Hue/Red Hue) — visual only.
 * No settable design-time props map to WC attributes.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=23541-11038",
  {
    props: {},
    example: () => html`<ui5-color-picker value="rgba(255, 0, 0, 1)"></ui5-color-picker>`,
  }
);
