/**
 * React Code Connect mapping for the SAP Web UI Kit "Link".
 * Node 187:305. Mirrors Link.figma.ts. See FIGMA_CODE_CONNECT.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "@ui5/webcomponents-react";

figma.connect(
  Link,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=187-305",
  {
    props: {
      design: figma.enum("Type", {
        Regular: "Default",
        Emphasized: "Emphasized",
        Subtle: "Subtle",
        "Icon Link": "Default",
      }),
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
        Visited: false,
        Down: false,
      }),
      label: figma.textContent("Text"),
      // Icon Position → icon (Left) / endIcon (Right). Name is a placeholder
      // ("inspect") — the Icon instance-swap name isn't readable.
      icon: figma.enum("Icon Position", {
        Left: "inspect",
        Right: undefined,
        "N/A": undefined,
      }),
      endIcon: figma.enum("Icon Position", {
        Right: "inspect",
        Left: undefined,
        "N/A": undefined,
      }),
    },
    example: ({ design, disabled, label, icon, endIcon }) => (
      <Link design={design} disabled={disabled} icon={icon} endIcon={endIcon}>
        {label}
      </Link>
    ),
  }
);
