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
      // NOTE: Figma "Type" (Non-Semantic/Semantic) = colour semantics, which
      // ui5-switch has no prop for. It does NOT map to `design`; screenshot of
      // node 24087:10369 shows all switches render icons (all `Graphical`).
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
    example: ({ checked, disabled }) => (
      <Switch checked={checked} disabled={disabled} />
    ),
  }
);
