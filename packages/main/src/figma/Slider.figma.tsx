/**
 * React Code Connect mapping for the SAP Web UI Kit "Slider".
 * Node 25168:10849. Mirrors Slider.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Slider } from "@ui5/webcomponents-react";

figma.connect(
  Slider,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=25168-10849",
  {
    props: {
      disabled: figma.enum("Interaction State", {
        Regular: false,
        Disabled: true,
      }),
    },
    example: ({ disabled }) => (
      <Slider min={0} max={100} value={50} disabled={disabled} />
    ),
  }
);
