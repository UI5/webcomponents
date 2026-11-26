/**
 * React Code Connect mapping for the SAP Web UI Kit "AI Writing Assistant".
 * Node 371473:25232. Mirrors WritingAssistant.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WritingAssistant } from "@ui5/webcomponents-ai-react";

figma.connect(
  WritingAssistant,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-25232",
  {
    props: {},
    example: () => <WritingAssistant />,
  }
);
