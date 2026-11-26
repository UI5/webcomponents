/**
 * React Code Connect mapping for the SAP Web UI Kit "Tree".
 * Node 186218:17136. Mirrors Tree.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tree, TreeItem } from "@ui5/webcomponents-react";

figma.connect(
  Tree,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=186218-17136",
  {
    props: {},
    example: () => (
      <Tree>
        <TreeItem text="Parent Item" expanded>
          <TreeItem text="Child Item 1" />
          <TreeItem text="Child Item 2" />
        </TreeItem>
      </Tree>
    ),
  }
);
