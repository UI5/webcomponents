/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "AI Writing Assistant".
 * Node: 371473:25232. Emits <ui5-ai-writing-assistant>.
 *
 * Part of the AI Writing Assistant page. Figma node is a wrapper — no top-level props.
 * WritingAssistant props: loading, promptDescription.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=371473-25232",
  {
    props: {},
    example: () =>
      html`<ui5-ai-writing-assistant></ui5-ai-writing-assistant>`,
  }
);
