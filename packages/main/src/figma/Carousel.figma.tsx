/**
 * React Code Connect mapping for the SAP Web UI Kit "Carousel".
 * Node 24267:10388. Mirrors Carousel.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel } from "@ui5/webcomponents-react";

figma.connect(
  Carousel,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24267-10388",
  {
    props: {},
    example: () => (
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    ),
  }
);
