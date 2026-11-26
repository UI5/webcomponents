/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Bars" — Header.
 * Node: 1101:2416. Emits <ui5-bar design="Header|Subheader|...">
 *
 * Figma "Type" maps to ui5-bar design prop.
 * Content slots (startContent, default, endContent) are slotted — not readable.
 * Form Factor ignored (global density).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=1101-2416",
  {
    props: {
      design: figma.enum("Type", {
        Title: 'design="Header"',
        "Title with back button": 'design="Header"',
        Error: 'design="Header"',
        Warning: 'design="Header"',
        Success: 'design="Header"',
        Information: 'design="Header"',
        Confirmation: 'design="Header"',
      }),
    },
    example: ({ design }) =>
      html`<ui5-bar ${design}>
  <!-- startContent slot: <ui5-button slot="startContent">Back</ui5-button> -->
  <span>Title</span>
  <!-- endContent slot: <ui5-button slot="endContent">Action</ui5-button> -->
</ui5-bar>`,
  }
);
