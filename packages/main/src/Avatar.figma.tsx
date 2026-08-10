/**
 * React Code Connect mapping for the SAP Web UI Kit "Avatar".
 * Node 573:3623. Mirrors Avatar.figma.ts. See FIGMA_CODE_CONNECT.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Avatar } from "@ui5/webcomponents-react";

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
      initials: figma.string("✏️ Initials"),
    },
    example: ({ size, colorScheme, initials }) => (
      <Avatar size={size} colorScheme={colorScheme} initials={initials} />
    ),
  }
);
