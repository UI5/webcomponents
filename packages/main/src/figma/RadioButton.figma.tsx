/**
 * React Code Connect mapping for the SAP Web UI Kit "Radio Button".
 * Node 154597:1967. Mirrors RadioButton.figma.ts. See FIGMA_CODE_CONNECT_FINDINGS.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RadioButton } from "@ui5/webcomponents-react";

figma.connect(
  RadioButton,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=154597-1967",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: undefined,
        Negative: "Negative",
        Critical: "Critical",
        Positive: "Positive",
        Information: "Information",
      }),
      checked: figma.enum("Selected", {
        True: true,
        False: false,
      }),
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
        "Read Only": false,
      }),
      readonly: figma.enum("Interaction State", {
        "Read Only": true,
        Regular: false,
        Hover: false,
        Disabled: false,
      }),
      // Label switch gates the text: OFF → text undefined; ON → typed ✏️ Text.
      text: figma.boolean("Label", {
        true: figma.string("✏️ Text"),
        false: undefined,
      }),
    },
    example: ({ text, checked, valueState, disabled, readonly }) => (
      <RadioButton
        text={text}
        checked={checked}
        valueState={valueState}
        disabled={disabled}
        readonly={readonly}
      />
    ),
  }
);
