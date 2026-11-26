/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Tab Bar".
 * Node: 24850:11169. Emits <ui5-tabcontainer>.
 *
 * Figma exposes: Type (Inline/Icon Only/Process Tabs/Filter Tabs/Shell Navigation),
 * Semantic, Size — none map directly to TabContainer props.
 * Tabs are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24850-11169",
  {
    props: {},
    example: () =>
      html`<ui5-tabcontainer>
  <ui5-tab text="Tab 1" selected></ui5-tab>
  <ui5-tab text="Tab 2"></ui5-tab>
  <ui5-tab text="Tab 3"></ui5-tab>
</ui5-tabcontainer>`,
  }
);
