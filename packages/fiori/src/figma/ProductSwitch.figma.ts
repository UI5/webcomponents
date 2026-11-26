/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Product Switch".
 * Node: 454469:7014. Emits <ui5-product-switch>.
 *
 * Figma exposes: Size (Large/Small), Scrollbar (boolean — runtime). Items are slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=454469-7014",
  {
    props: {},
    example: () =>
      html`<ui5-product-switch>
  <ui5-product-switch-item title-text="Home" subtitle-text="Central Home" icon="home"></ui5-product-switch-item>
  <ui5-product-switch-item title-text="Analytics" subtitle-text="Data Analysis" icon="business-objects-experience"></ui5-product-switch-item>
</ui5-product-switch>`,
  }
);
