/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Panel".
 * Node: 24070:10588. Emits <ui5-panel>.
 *
 * Figma exposes: Fixed (boolean), Collapsed (boolean), Form Factor (ignored — global density).
 * headerText is a slot in Figma (not a readable text property).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24070-10588",
  {
    props: {
      fixed: figma.enum("Fixed", {
        True: "fixed",
        False: "",
      }),
      collapsed: figma.enum("Collapsed", {
        True: "collapsed",
        False: "",
      }),
    },
    example: ({ fixed, collapsed }) =>
      html`<ui5-panel header-text="Panel Title" ${fixed} ${collapsed}>
  <!-- panel content -->
</ui5-panel>`,
  }
);
