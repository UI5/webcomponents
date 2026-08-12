/**
 * React Code Connect mapping for the SAP Web UI Kit "Select". Node 181557:7507.
 * Mirrors Select.figma.ts. Largely static — see FIGMA_CODE_CONNECT.md § Select.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Select, Option } from "@ui5/webcomponents-react";

figma.connect(
  Select,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=181557-7507",
  {
    props: {
      // Value-state message text from the nested "Input Message Popover"
      // instance (top-level prop → resolved {msg.text}, same as Input).
      msg: figma.nestedProps("Input Message Popover", {
        text: figma.string("✏️ Text"),
      }),
    },
    example: ({ msg }) => (
      <Select valueStateMessage={<div>{msg.text}</div>}>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Select>
    ),
  }
);
