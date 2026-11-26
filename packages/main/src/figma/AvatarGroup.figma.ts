/**
 * Web Components Code Connect mapping for the SAP Web UI Kit "Avatar Group".
 * Node: 320294:7646. Part of the Avatar page. Emits <ui5-avatar-group>.
 *
 * Figma exposes: Type (Group/Individual), Size (XS/S/M/L/XL),
 * Interaction State (Disabled only maps), Overflow Button (visual — no WC prop).
 * Avatars inside are slotted — not readable from Figma.
 */
import figma, { html } from "@figma/code-connect/html";

figma.connect(
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=320294-7646",
  {
    props: {
      type: figma.enum("Type", {
        Group: 'type="Group"',
        Individual: 'type="Individual"',
      }),
      size: figma.enum("Size", {
        XS: 'size="XS"',
        S: 'size="S"',
        M: 'size="M"',
        L: 'size="L"',
        XL: 'size="XL"',
      }),
      disabled: figma.enum("Interaction State", {
        Regular: "",
        Hover: "",
        Active: "",
        "Toggled Hover": "",
        Disabled: "disabled",
      }),
    },
    example: ({ type, size, disabled }) =>
      html`<ui5-avatar-group ${type} ${size} ${disabled}>
  <ui5-avatar initials="JD"></ui5-avatar>
  <ui5-avatar initials="AB"></ui5-avatar>
  <ui5-avatar initials="CD"></ui5-avatar>
</ui5-avatar-group>`,
  }
);
