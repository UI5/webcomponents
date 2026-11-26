/**
 * React Code Connect mapping for the SAP Web UI Kit "Text Area".
 * Node 148569:1916. Mirrors TextArea.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextArea } from "@ui5/webcomponents-react";

figma.connect(
  TextArea,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=148569-1916",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: "None",
        Negative: "Negative",
        Critical: "Critical",
        Information: "Information",
        Positive: "Positive",
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
      <TextArea
        placeholder="Enter text..."
        valueState={valueState}
        disabled={disabled}
        readonly={readonly}
      />
    ),
  }
);
