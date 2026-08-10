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
    },
    example: ({ design, disabled, label }) => (
      <Link design={design} disabled={disabled}>
        {label}
      </Link>
    ),
  }
);
