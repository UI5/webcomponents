/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Carousel".
 * Node: 24267:10388. Emits <ui5-carousel>.
 *
 * Figma exposes: Indicator Position (Top/Bottom), Buttons Position (On Bar/On Image),
 * On Content (boolean). None map to direct WC props — these are layout annotations.
 * Carousel items are slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24267-10388",
  {
    props: {},
    example: () =>
      html`<ui5-carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</ui5-carousel>`,
  }
);
