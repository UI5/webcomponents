/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "AI Prompt Input".
 * Node: 371473:17866. Emits <ui5-ai-prompt-input>.
 *
 * Figma node has no top-level props — it's a wrapper symbol.
 * PromptInput props: placeholder, label, disabled, readonly, showClearIcon, showExceededText.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-17866",
  {
    props: {},
    example: () =>
      html`<ui5-ai-prompt-input placeholder="Ask me anything..."></ui5-ai-prompt-input>`,
  }
);
