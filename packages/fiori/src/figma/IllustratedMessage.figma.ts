/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Illustrated Message".
 * Node: 321359:13754. Emits <ui5-illustrated-message>.
 *
 * Figma exposes: Size (L/M/S/XS), Form Factor (ignored).
 * Illustration name is not a Figma property — placeholder used.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=321359-13754",
  {
    props: {
      size: figma.enum("Size", {
        "Large (L)": 'size="Auto"',
        "Medium (M)": 'size="Auto"',
        "Small (S)": 'size="Auto"',
        "Extra Small (XS)": 'size="Auto"',
      }),
    },
    example: () =>
      html`<ui5-illustrated-message name="BeforeSearch" title-text="No Results" subtitle-text="Try a different search term."></ui5-illustrated-message>`,
  }
);
