/**
 * React Code Connect mapping for the SAP Web UI Kit "Step Input".
 * Node 148569:1727. Mirrors StepInput.figma.ts. See FIGMA_CODE_CONNECT_FINDINGS.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StepInput } from "@ui5/webcomponents-react";

figma.connect(
  StepInput,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=148569-1727",
  {
    props: {
      valueState: figma.enum("Value State", {
        None: undefined,
        Negative: "Negative",
        Critical: "Critical",
        Positive: "Positive",
        Information: "Information",
      }),
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
        Active: false,
        "Read Only": false,
      }),
      readonly: figma.enum("Interaction State", {
        "Read Only": true,
        Regular: false,
        Hover: false,
        Active: false,
        Disabled: false,
      }),
      value: figma.string("✏️ Value"),
      // Value-state message text from the nested "Input Message Popover"
      // instance (top-level prop → resolved {msg.text}, same as Input).
      msg: figma.nestedProps("Input Message Popover", {
        text: figma.string("✏️ Text"),
      }),
    },
    example: ({ value, valueState, disabled, readonly, msg }) => (
      <StepInput
        value={value}
        valueState={valueState}
        disabled={disabled}
        readonly={readonly}
        valueStateMessage={<div>{msg.text}</div>}
      />
    ),
  }
);
