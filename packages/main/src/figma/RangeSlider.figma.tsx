/**
 * React Code Connect mapping for the SAP Web UI Kit "Range Slider".
 * Node 25168:11050. Mirrors RangeSlider.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RangeSlider } from "@ui5/webcomponents-react";

figma.connect(
  RangeSlider,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=25168-11050",
  {
    props: {
      disabled: figma.enum("Interaction State", {
        Regular: false,
        Disabled: true,
      }),
    },
    example: ({ disabled }) => (
      <RangeSlider min={0} max={100} startValue={25} endValue={75} disabled={disabled} />
    ),
  }
);
