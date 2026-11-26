/**
 * React Code Connect mapping for the SAP Web UI Kit "AI Prompt Input".
 * Node 371473:17866. Mirrors PromptInput.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PromptInput } from "@ui5/webcomponents-ai-react";

figma.connect(
  PromptInput,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-17866",
  {
    props: {},
    example: () => <PromptInput placeholder="Ask me anything..." />,
  }
);
