/**
 * React Code Connect mapping for the SAP Web UI Kit "Text".
 * Node 224294:203. Mirrors Text.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Text } from "@ui5/webcomponents-react";

figma.connect(
  Text,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=224294-203",
  {
    props: {},
    example: () => <Text>Text content</Text>,
  }
);
