/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Popover".
 * Node: 153790:2065. Emits <ui5-popover>.
 *
 * Figma exposes: Arrow (boolean), Arrow Position, Resize Handle Position, Form Factor.
 * None of these map directly to ui5-popover attributes (placement is runtime, not design-time).
 * The component is shown as a static design-time placeholder only.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=153790-2065",
  {
    props: {},
    example: () =>
      html`<ui5-popover header-text="Popover Title" opener="opener-id">
  <!-- popover content -->
</ui5-popover>`,
  }
);
