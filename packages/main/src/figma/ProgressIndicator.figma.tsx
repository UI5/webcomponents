/**
 * React Code Connect mapping for the SAP Web UI Kit "Progress Indicator".
 * Node 578:5150. Mirrors ProgressIndicator.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ProgressIndicator } from "@ui5/webcomponents-react";

figma.connect(
  ProgressIndicator,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=578-5151",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "None",
        Information: "Information",
        Positive: "Positive",
        Critical: "Critical",
        Negative: "Negative",
      }),
      disabled: figma.enum("Interaction State", {
        Regular: false,
        Disabled: true,
      }),
      hideValue: figma.boolean("Text", {
        true: false,
        false: true,
      }),
      displayValue: figma.string("✏️ Text Value"),
    },
    example: ({ valueState, disabled, hideValue, displayValue }) => (
      <ProgressIndicator
        value={60}
        displayValue={displayValue}
        valueState={valueState}
        hideValue={hideValue}
        disabled={disabled}
      />
    ),
  }
);
