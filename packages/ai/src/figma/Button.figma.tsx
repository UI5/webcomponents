/**
 * React Code Connect mapping for the SAP Web UI Kit "AI Button".
 * Node 371473:15343. Mirrors Button.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@ui5/webcomponents-ai-react";

figma.connect(
  Button,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-15343",
  {
    props: {},
    example: () => <Button>AI Action</Button>,
  }
);
