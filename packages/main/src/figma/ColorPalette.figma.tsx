/**
 * React Code Connect mapping for the SAP Web UI Kit "Color Palette".
 * Node 382873:412. Mirrors ColorPalette.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ColorPalette, ColorPaletteItem } from "@ui5/webcomponents-react";

figma.connect(
  ColorPalette,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=382873-412",
  {
    props: {},
    example: () => (
      <ColorPalette>
        <ColorPaletteItem value="gold" />
        <ColorPaletteItem value="crimson" />
        <ColorPaletteItem value="darkblue" />
      </ColorPalette>
    ),
  }
);
