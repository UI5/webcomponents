/**
 * React Code Connect mapping for the SAP Web UI Kit "Tokenizer".
 * Node 202050:805. Mirrors Tokenizer.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tokenizer, Token } from "@ui5/webcomponents-react";

figma.connect(
  Tokenizer,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=202050-805",
  {
    props: {},
    example: () => (
      <Tokenizer>
        <Token text="Token 1" />
        <Token text="Token 2" />
      </Tokenizer>
    ),
  }
);
