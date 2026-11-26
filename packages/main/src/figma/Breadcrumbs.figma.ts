/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Breadcrumb".
 * Node: 153806:1972. Emits <ui5-breadcrumbs>.
 *
 * Figma exposes: Overflow (boolean — visual state only), Popover (boolean — runtime state).
 * Neither maps to a settable WC prop. Items are slotted — not readable.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=153806-1972",
  {
    props: {},
    example: () =>
      html`<ui5-breadcrumbs>
  <ui5-breadcrumbs-item href="/">Home</ui5-breadcrumbs-item>
  <ui5-breadcrumbs-item href="/section">Section</ui5-breadcrumbs-item>
  <ui5-breadcrumbs-item>Current Page</ui5-breadcrumbs-item>
</ui5-breadcrumbs>`,
  }
);
