/**
 * React Code Connect mapping for the SAP Web UI Kit "Switch".
 * Node 24087:10369. Mirrors Switch.figma.ts. See FIGMA_CODE_CONNECT.md.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Switch } from "@ui5/webcomponents-react";

figma.connect(
  Switch,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24087-10369",
  {
    props: {
      // Figma "Type" → design. Non-Semantic (neutral ✓/dash icons) → Textual;
      // Semantic (green ✓ / red ✗) → Graphical. "Textual" still renders icons
      // in blue/grey when no textOn/textOff — matches the Non-Semantic group.
      design: figma.enum("Type", {
        "Non-Semantic": "Textual",
        Semantic: "Graphical",
      }),
      checked: figma.enum("Checked", {
        True: true,
        False: false,
      }),
      disabled: figma.enum("Interaction State", {
        Disabled: true,
        Regular: false,
        Hover: false,
      }),
    },
    example: ({ design, checked, disabled }) => (
      <Switch design={design} checked={checked} disabled={disabled} />
    ),
  }
);
