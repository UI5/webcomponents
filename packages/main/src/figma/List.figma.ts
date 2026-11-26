/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "List".
 * Node: 155542:3875. Emits <ui5-list>.
 *
 * Figma exposes: Form Factor (ignored — global density).
 * List items are slotted — not readable from Figma.
 * selectionMode is a runtime concern.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=155542-3875",
  {
    props: {},
    example: () =>
      html`<ui5-list header-text="List Title">
  <ui5-li>List Item 1</ui5-li>
  <ui5-li>List Item 2</ui5-li>
  <ui5-li>List Item 3</ui5-li>
</ui5-list>`,
  }
);
