/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Slider".
 * Node: 25168:10849. Emits <ui5-slider>.
 *
 * Figma exposes: Interaction State (Regular/Disabled), Form Factor (ignored — global density).
 * value is encoded in the variant name as a percentage — not a readable Figma property.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=25168-10849",
  {
    props: {
      disabled: figma.enum("Interaction State", {
        Regular: "",
        Disabled: "disabled",
      }),
    },
    example: ({ disabled }) =>
      html`<ui5-slider min="0" max="100" value="50" ${disabled}></ui5-slider>`,
  }
);
