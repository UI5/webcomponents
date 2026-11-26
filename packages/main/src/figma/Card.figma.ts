/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Card".
 * Node: 323770:4366. Emits <ui5-card>.
 *
 * Figma exposes: Interactive Header (boolean), Hover/Regular interaction states.
 * No settable props map — card content is fully slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=323770-4366",
  {
    props: {},
    example: () =>
      html`<ui5-card>
  <ui5-card-header slot="header" title-text="Card Title" subtitle-text="Subtitle"></ui5-card-header>
  <!-- card content -->
</ui5-card>`,
  }
);
