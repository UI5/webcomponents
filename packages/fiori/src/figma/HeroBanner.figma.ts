/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Banner" (Hero Banner).
 * Node: 232871:2737. Part of the Card page. Emits <ui5-hero-banner>.
 *
 * Figma exposes: ✏️ Title → headerText, ✏️ Text → overlineText,
 * Type (Text Block with Image / Text Container on Image / Text on Colorful Background)
 * — layout variant with no direct WC prop equivalent.
 * The nested Button is slotted content — not mapped.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=232871-2737",
  {
    props: {
      headerText: figma.string("✏️ Title"),
      overlineText: figma.string("✏️ Text"),
    },
    example: ({ headerText, overlineText }) =>
      html`<ui5-hero-banner header-text="${headerText}" overline-text="${overlineText}">
  <ui5-button slot="action" design="Emphasized">Get Started</ui5-button>
</ui5-hero-banner>`,
  }
);
