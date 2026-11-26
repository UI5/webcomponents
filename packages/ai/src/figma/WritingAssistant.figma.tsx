/**
 * React Code Connect mapping for the SAP Web UI Kit "AI Text Area".
 * Node 371473:25230. Mirrors WritingAssistant.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextArea } from "@ui5/webcomponents-ai-react";

figma.connect(
  TextArea,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-25230",
  {
    props: {},
    example: () => <AITextArea placeholder="Enter text..." />,
  }
);
