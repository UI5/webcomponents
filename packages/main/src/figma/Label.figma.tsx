/**
 * React Code Connect mapping for the SAP Web UI Kit "Label".
 * Node 23480:10812. Mirrors Label.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Label } from "@ui5/webcomponents-react";

figma.connect(
  Label,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=23480-10811",
  {
    props: {
      required: figma.boolean("Required"),
      text: figma.string("✏️ Label"),
    },
    example: ({ required, text }) => <Label required={required}>{text}</Label>,
  }
);
