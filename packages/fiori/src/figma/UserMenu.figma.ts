/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "User Menu".
 * Node: 286950:9373. Emits <ui5-user-menu>.
 *
 * Figma exposes: ✏️ User Name / 1st-3rd Subline → map to <ui5-user-menu-account> slot props.
 * Action Button (boolean) → showEditButton.
 * Header Content Area (True/False) — Figma presentation only, ignored.
 * Menu items are slotted — not readable from Figma.
 * Form Factor ignored (global density).
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=286950-9373",
  {
    props: {
      userName: figma.string("✏️ User Name"),
      subline1: figma.string("✏️ 1st Subline"),
      showEditButton: figma.boolean("Action Button", {
        true: "show-edit-button",
        false: "",
      }),
    },
    example: ({ userName, subline1, showEditButton }) =>
      html`<ui5-user-menu ${showEditButton}>
  <ui5-user-menu-account slot="accounts"
    title-text="${userName}"
    subtitle-text="${subline1}"
    selected>
  </ui5-user-menu-account>
  <ui5-user-menu-item text="Settings"></ui5-user-menu-item>
  <ui5-user-menu-item text="Sign Out"></ui5-user-menu-item>
</ui5-user-menu>`,
  }
);
