/**
 * React Code Connect mapping for the SAP Web UI Kit "Banner" (Hero Banner).
 * Node 232871:2737. Mirrors HeroBanner.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeroBanner, Button } from "@ui5/webcomponents-react";

figma.connect(
  HeroBanner,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=232871-2737",
  {
    props: {
      headerText: figma.string("✏️ Title"),
      overlineText: figma.string("✏️ Text"),
    },
    example: ({ headerText, overlineText }) => (
      <HeroBanner headerText={headerText} overlineText={overlineText}>
        <Button slot="action" design="Emphasized">Get Started</Button>
      </HeroBanner>
    ),
  }
);
