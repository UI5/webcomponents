/**
 * React Code Connect mapping for the SAP Web UI Kit "Input". Node 148569:1004.
 * Mirrors Input.figma.ts under the "React" label. See FIGMA_CODE_CONNECT.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@ui5/webcomponents-react";

figma.connect(
  Input,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=148569-1004",
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
      placeholder: figma.string("✏️ Placeholder"),
      value: figma.string("✏️ Typed Text"),
      // Value-state message from the nested "Input Message Popover" instance;
      // gate the whole slot element on the Message Popover boolean (the parser
      // rejects a ternary in the example, so resolve it into the prop here).
      valueStateMessage: figma.boolean("Message Popover", {
        true: (
          <div>
            {figma.nestedProps("Input Message Popover", {
              text: figma.string("✏️ Text"),
            }).text}
          </div>
        ),
        false: undefined,
      }),
    },
    example: ({ value, placeholder, valueState, disabled, readonly, valueStateMessage }) => (
      <Input
        value={value}
        placeholder={placeholder}
        valueState={valueState}
        disabled={disabled}
        readonly={readonly}
        valueStateMessage={valueStateMessage}
      />
    ),
  }
);
