/**
 * React Code Connect mapping for the SAP Web UI Kit "Panel".
 * Node 24070:10588. Mirrors Panel.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Panel } from "@ui5/webcomponents-react";

figma.connect(
  Panel,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24070-10588",
  {
    props: {
      fixed: figma.enum("Fixed", {
        True: true,
        False: false,
      }),
      collapsed: figma.enum("Collapsed", {
        True: true,
        False: false,
      }),
    },
    example: ({ fixed, collapsed }) => (
      <Panel headerText="Panel Title" fixed={fixed} collapsed={collapsed}>
        {/* panel content */}
      </Panel>
    ),
  }
);
