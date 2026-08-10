/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Select".
 * Node: 181557:7507. Emits <ui5-select>.
 *
 * ⚠️ LARGELY UNMAPPABLE — see FIGMA_CODE_CONNECT.md § Select. The only Figma
 * axes are `Form Factor` (global density, ignored) and `Drop-Down` (open/closed
 * popover — a runtime visual state, NOT a component prop). The options are a
 * slotted Input instance with no readable option list. So there is nothing
 * dynamic to map; this emits a representative static example.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=181557-7507",
  {
    props: {},
    example: () =>
      html`<ui5-select>
  <ui5-option>Option 1</ui5-option>
  <ui5-option>Option 2</ui5-option>
  <ui5-option>Option 3</ui5-option>
</ui5-select>`,
  }
);
