/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Toast".
 * Node: 126132:18899. Emits <ui5-toast>.
 *
 * The Figma component has a single "Type=Regular" variant with just a text property.
 * ui5-toast has no visible props beyond its text content (duration/placement are runtime).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=126132-18900",
  {
    props: {
      text: figma.string("✏️ Text"),
    },
    example: ({ text }) => html`<ui5-toast>${text}</ui5-toast>`,
  }
);
