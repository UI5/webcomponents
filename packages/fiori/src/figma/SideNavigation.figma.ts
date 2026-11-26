/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Side Navigation".
 * Node: 283218:5691. Emits <ui5-side-navigation>.
 *
 * Figma exposes: Type (Collapsed/Expanded/Floating), Form Factor (ignored).
 * Navigation items are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=283218-5691",
  {
    props: {
      collapsed: figma.enum("Type", {
        Collapsed: "collapsed",
        Expanded: "",
        Floating: "",
      }),
    },
    example: ({ collapsed }) =>
      html`<ui5-side-navigation ${collapsed}>
  <ui5-side-navigation-item text="Home" icon="home"></ui5-side-navigation-item>
  <ui5-side-navigation-item text="Calendar" icon="calendar">
    <ui5-side-navigation-sub-item text="Week View"></ui5-side-navigation-sub-item>
  </ui5-side-navigation-item>
</ui5-side-navigation>`,
  }
);
