/**
 * React Code Connect mapping for the SAP Web UI Kit "Popover".
 * Node 153790:2065. Mirrors Popover.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Popover } from "@ui5/webcomponents-react";

figma.connect(
  Popover,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=153790-2065",
  {
    props: {},
    example: () => (
      <Popover headerText="Popover Title" opener="opener-id">
        {/* popover content */}
      </Popover>
    ),
  }
);
