/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "File Uploader".
 * Node: 175454:1328. Emits <ui5-file-uploader>.
 *
 * Figma exposes: Text (Placeholder/Uploaded File) — visual state only, not a prop.
 * Form Factor ignored (global density).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=175454-1328",
  {
    props: {},
    example: () =>
      html`<ui5-file-uploader placeholder="Choose a file">
  <ui5-button icon="upload">Upload</ui5-button>
</ui5-file-uploader>`,
  }
);
