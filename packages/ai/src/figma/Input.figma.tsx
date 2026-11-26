/**
 * React Code Connect mapping for the SAP Web UI Kit "AI Input".
 * Node 371473:25228. Mirrors Input.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@ui5/webcomponents-ai-react";

figma.connect(
  Input,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-25228",
  {
    props: {},
    example: () => <Input placeholder="Ask me anything..." />,
  }
);
