/**
 * React Code Connect mapping for the SAP Web UI Kit "Token".
 * Node 32:27727. Mirrors Token.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Token } from "@ui5/webcomponents-react";

figma.connect(
  Token,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=32-27727",
  {
    props: {
      text: figma.string("✏️ Text"),
      selected: figma.enum("Interaction State", {
        Regular: false,
        Hover: false,
        Selected: true,
        "Selected Hover": true,
        "Read Only": false,
      }),
      readonly: figma.enum("Interaction State", {
        Regular: false,
        Hover: false,
        Selected: false,
        "Selected Hover": false,
        "Read Only": true,
      }),
    },
    example: ({ text, selected, readonly }) => (
      <Token text={text} selected={selected} readonly={readonly} />
    ),
  }
);
