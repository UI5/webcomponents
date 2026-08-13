/**
 * React Code Connect mapping for the SAP Web UI Kit "Avatar".
 * Node 573:3623. Mirrors Avatar.figma.ts. See FIGMA_CODE_CONNECT_FINDINGS.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Avatar, AvatarBadge } from "@ui5/webcomponents-react";

figma.connect(
  Avatar,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=573-3623",
  {
    props: {
      size: figma.enum("Size", {
        XS: "XS",
        S: "S",
        M: "M",
        L: "L",
        XL: "XL",
      }),
      colorScheme: figma.enum("Color", {
        "1": "Accent1",
        "2": "Accent2",
        "3": "Accent3",
        "4": "Accent4",
        "5": "Accent5",
        "6": "Accent6",
        "7": "Accent7",
        "8": "Accent8",
        "9": "Accent9",
        "10": "Accent10",
        Transparent: "Transparent",
        Placeholder: "Placeholder",
        Image: undefined,
        Tile: undefined,
      }),
      shape: figma.enum("Content", {
        Person: "Circle",
        Object: "Square",
      }),
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
        Active: false,
        "Toggled Hover": false,
      }),
      initials: figma.string("✏️ Initials"),
      // Type=Icon → icon="employee" (WC default). Name is a placeholder —
      // Person/Object Icon are instance-swaps, not readable. Icon type only.
      icon: figma.enum("Type", {
        Icon: "employee",
        Image: undefined,
        Initials: undefined,
      }),
      // Type=Image → slotted <img> placeholder (actual fill not readable).
      image: figma.enum("Type", {
        Image: <img src="https://via.placeholder.com/48" />,
        Icon: undefined,
        Initials: undefined,
      }),
      // Badge boolean → <AvatarBadge icon="edit"> placeholder (content not readable).
      badge: figma.boolean("Badge", {
        true: <AvatarBadge icon="edit" />,
        false: undefined,
      }),
    },
    example: ({ size, colorScheme, shape, disabled, initials, icon, image, badge }) => (
      <Avatar size={size} shape={shape} colorScheme={colorScheme} disabled={disabled} initials={initials} icon={icon} badge={badge}>
        {image}
      </Avatar>
    ),
  }
);
