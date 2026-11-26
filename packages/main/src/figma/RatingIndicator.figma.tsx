/**
 * React Code Connect mapping for the SAP Web UI Kit "Rating Indicator".
 * Node 24494:10444. Mirrors RatingIndicator.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RatingIndicator } from "@ui5/webcomponents-react";

figma.connect(
  RatingIndicator,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24494-10444",
  {
    props: {
      disabled: figma.enum("Interaction State", {
        Regular: false,
        "Read Only": false,
        Disabled: true,
      }),
      readonly: figma.enum("Interaction State", {
        Regular: false,
        "Read Only": true,
        Disabled: false,
      }),
    },
    example: ({ disabled, readonly }) => (
      <RatingIndicator value={3} max={5} readonly={readonly} disabled={disabled} />
    ),
  }
);
