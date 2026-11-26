/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Busy Indicator".
 * Node: 23575:10459. Emits <ui5-busy-indicator>.
 *
 * Figma exposes: Size (Small/Medium/Large), Text (boolean), ✏️ Text Value.
 * Size maps: Small→S, Medium→M, Large→L.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=23575-10458",
  {
    props: {
      size: figma.enum("Size", {
        Small: 'size="S"',
        Medium: 'size="M"',
        Large: 'size="L"',
      }),
      text: figma.boolean("Text", {
        true: figma.string("✏️ Text Value"),
        false: "",
      }),
    },
    example: ({ size, text }) =>
      html`<ui5-busy-indicator ${size} text="${text}" active></ui5-busy-indicator>`,
  }
);
