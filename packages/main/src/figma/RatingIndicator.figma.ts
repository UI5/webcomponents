/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Rating Indicator".
 * Node: 24494:10444. Emits <ui5-rating-indicator>.
 *
 * Figma exposes: Interaction State (Regular/Read Only/Disabled), Form Factor (ignored — global density).
 * value and max are not Figma properties — placeholder values used.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24494-10444",
  {
    props: {
      disabled: figma.enum("Interaction State", {
        Regular: "",
        "Read Only": "",
        Disabled: "disabled",
      }),
      readonly: figma.enum("Interaction State", {
        Regular: "",
        "Read Only": "readonly",
        Disabled: "",
      }),
    },
    example: ({ disabled, readonly }) =>
      html`<ui5-rating-indicator value="3" max="5" ${readonly} ${disabled}></ui5-rating-indicator>`,
  }
);
