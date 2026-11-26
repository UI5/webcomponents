/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Text".
 * Node: 224294:203. Emits <ui5-text>.
 *
 * Figma exposes: Selected (boolean) — this is a visual annotation in the kit,
 * not a real ui5-text property. No mappable props.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=224294-203",
  {
    props: {},
    example: () => html`<ui5-text>Text content</ui5-text>`,
  }
);
