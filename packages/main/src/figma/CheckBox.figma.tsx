/**
 * React Code Connect mapping for the SAP Web UI Kit "Check Box". Node 154589:905.
 * Mirrors CheckBox.figma.ts under the "React" label. See FIGMA_CODE_CONNECT_FINDINGS.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CheckBox } from "@ui5/webcomponents-react";

figma.connect(
  CheckBox,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=154589-905",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: undefined,
        Negative: "Negative",
        Critical: "Critical",
        Positive: "Positive",
        Information: "Information",
      }),
      checked: figma.enum("Check", {
        Checked: true,
        Tristate: false,
        Unchecked: false,
      }),
      indeterminate: figma.enum("Check", {
        Tristate: true,
        Checked: false,
        Unchecked: false,
      }),
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
        "Read Only": false,
        "Display Only": false,
      }),
      readonly: figma.enum("Interaction State", {
        "Read Only": true,
        "Display Only": true,
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
    example: ({ text, checked, indeterminate, valueState, disabled, readonly }) => (
      <CheckBox
        text={text}
        checked={checked}
        indeterminate={indeterminate}
        valueState={valueState}
        disabled={disabled}
        readonly={readonly}
      />
    ),
  }
);
