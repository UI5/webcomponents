/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Range Slider".
 * Node: 25168:11050. Emits <ui5-range-slider>.
 *
 * Figma exposes: Interaction State (Regular/Disabled), Form Factor (ignored).
 * startValue/endValue are encoded in the variant name — not readable Figma properties.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=25168-11050",
  {
    props: {
      disabled: figma.enum("Interaction State", {
        Regular: "",
        Disabled: "disabled",
      }),
    },
    example: ({ disabled }) =>
      html`<ui5-range-slider min="0" max="100" start-value="25" end-value="75" ${disabled}></ui5-range-slider>`,
  }
);
