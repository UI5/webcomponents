/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Form".
 * Node: 237212:14330. Emits <ui5-form>.
 *
 * Figma exposes: Type (layout variant), Display Mode, Form Factor (ignored).
 * Form items are fully slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=237212-14329",
  {
    props: {},
    example: () =>
      html`<ui5-form header-text="Personal Data">
  <ui5-form-item>
    <ui5-label slot="labelContent" required>Name</ui5-label>
    <ui5-input></ui5-input>
  </ui5-form-item>
  <ui5-form-item>
    <ui5-label slot="labelContent">Email</ui5-label>
    <ui5-input type="Email"></ui5-input>
  </ui5-form-item>
</ui5-form>`,
  }
);
