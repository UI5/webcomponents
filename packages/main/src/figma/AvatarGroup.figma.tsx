/**
 * React Code Connect mapping for the SAP Web UI Kit "Avatar Group".
 * Node 320294:7646. Mirrors AvatarGroup.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AvatarGroup, Avatar } from "@ui5/webcomponents-react";

figma.connect(
  AvatarGroup,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=320294-7646",
  {
    props: {
      type: figma.enum("Type", {
        Group: "Group",
        Individual: "Individual",
      }),
      size: figma.enum("Size", {
        XS: "XS",
        S: "S",
        M: "M",
        L: "L",
        XL: "XL",
      }),
      disabled: figma.enum("Interaction State", {
        Regular: false,
        Hover: false,
        Active: false,
        "Toggled Hover": false,
        Disabled: true,
      }),
    },
    example: ({ type, size, disabled }) => (
      <AvatarGroup type={type} size={size} disabled={disabled}>
        <Avatar initials="JD" />
        <Avatar initials="AB" />
        <Avatar initials="CD" />
      </AvatarGroup>
    ),
  }
);
