/**
 * React Code Connect mapping for the SAP Web UI Kit "Color Picker".
 * Node 23541:11038. Mirrors ColorPicker.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ColorPicker } from "@ui5/webcomponents-react";

figma.connect(
  ColorPicker,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=23541-11038",
  {
    props: {},
    example: () => <ColorPicker value="rgba(255, 0, 0, 1)" />,
  }
);
