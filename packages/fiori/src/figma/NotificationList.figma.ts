/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Notifications".
 * Node: 284154:14021. Emits <ui5-notification-list>.
 *
 * Figma exposes: Size (S/M/L), Scrollbar (boolean — runtime). Items are slotted.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=284154-14021",
  {
    props: {},
    example: () =>
      html`<ui5-notification-list>
  <ui5-notification-list-item title-text="New message" priority="High">
    You have a new message in your inbox.
  </ui5-notification-list-item>
</ui5-notification-list>`,
  }
);
