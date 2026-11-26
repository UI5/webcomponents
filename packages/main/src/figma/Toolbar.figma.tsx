/**
 * React Code Connect mapping for the SAP Web UI Kit "Toolbar".
 * Node 183497:6191. Mirrors Toolbar.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toolbar, ToolbarButton, ToolbarSpacer } from "@ui5/webcomponents-react";

figma.connect(
  Toolbar,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=183497-6191",
  {
    props: {},
    example: () => (
      <Toolbar>
        <ToolbarButton text="Action 1" icon="add" />
        <ToolbarButton text="Action 2" icon="edit" />
        <ToolbarSpacer />
        <ToolbarButton text="Settings" icon="action-settings" />
      </Toolbar>
    ),
  }
);
