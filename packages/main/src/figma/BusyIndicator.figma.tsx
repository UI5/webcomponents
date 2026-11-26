/**
 * React Code Connect mapping for the SAP Web UI Kit "Busy Indicator".
 * Node 23575:10459. Mirrors BusyIndicator.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BusyIndicator } from "@ui5/webcomponents-react";

figma.connect(
  BusyIndicator,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=23575-10458",
  {
    props: {
      size: figma.enum("Size", {
        Small: "S",
        Medium: "M",
        Large: "L",
      }),
      text: figma.boolean("Text", {
        true: figma.string("✏️ Text Value"),
        false: undefined,
      }),
    },
    example: ({ size, text }) => (
      <BusyIndicator size={size} text={text} active />
    ),
  }
);
