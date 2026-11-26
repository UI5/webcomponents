/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Tree".
 * Node: 186218:17136. Emits <ui5-tree>.
 *
 * Figma exposes: Form Factor (ignored — global density).
 * Tree items are slotted — not readable from Figma.
 * selectionMode is a runtime concern — not shown in Figma design.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=186218-17136",
  {
    props: {},
    example: () =>
      html`<ui5-tree>
  <ui5-tree-item text="Parent Item" expanded>
    <ui5-tree-item text="Child Item 1"></ui5-tree-item>
    <ui5-tree-item text="Child Item 2"></ui5-tree-item>
  </ui5-tree-item>
</ui5-tree>`,
  }
);
