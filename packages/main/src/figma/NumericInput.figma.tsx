/**
 * React Code Connect mapping for the SAP Web UI Kit "Numeric Input".
 * Node 486895:1475. Mirrors NumericInput.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NumericInput } from "@ui5/webcomponents-react";

figma.connect(
  NumericInput,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=486895-1475",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "None",
        Negative: "Negative",
        Critical: "Critical",
        Positive: "Positive",
        Information: "Information",
      }),
      disabled: figma.enum("Interaction State", {
        Regular: false,
        Hover: false,
        Active: false,
        Disabled: true,
        "Read Only": false,
      }),
      readonly: figma.enum("Interaction State", {
        Regular: false,
        Hover: false,
        Active: false,
        Disabled: false,
        "Read Only": true,
      }),
    },
    example: ({ valueState, disabled, readonly }) => (
      <NumericInput valueState={valueState} disabled={disabled} readonly={readonly} />
    ),
  }
);
