/**
 * React Code Connect mapping for the SAP Web UI Kit "Toast".
 * Node 126132:18899. Mirrors Toast.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toast } from "@ui5/webcomponents-react";

figma.connect(
  Toast,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=126132-18900",
  {
    props: {
      text: figma.string("✏️ Text"),
    },
    example: ({ text }) => <Toast>{text}</Toast>,
  }
);
