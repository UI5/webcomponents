/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Time Picker".
 * Node: 194605:104343. Emits <ui5-time-picker>.
 *
 * Figma exposes: Dropdown (boolean — runtime state), Form Factor (ignored).
 * No settable design-time props.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=194605-104343",
  {
    props: {},
    example: () => html`<ui5-time-picker></ui5-time-picker>`,
  }
);
