/**
 * React Code Connect mapping for the SAP Web UI Kit "Multi Input".
 * Node 212341:2965. Mirrors MultiInput.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MultiInput, Token } from "@ui5/webcomponents-react";

figma.connect(
  MultiInput,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=212341-2965",
  {
    props: {
      readonly: figma.enum("Display Only", {
        True: true,
        False: false,
      }),
    },
    example: ({ readonly }) => (
      <MultiInput placeholder="Enter value..." readonly={readonly}>
        <Token slot="tokens" text="Token 1" />
      </MultiInput>
    ),
  }
);
