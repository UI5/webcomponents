/**
 * React Code Connect mapping for the SAP Web UI Kit "Menu".
 * Node 449947:614. Mirrors Menu.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Menu, MenuItem } from "@ui5/webcomponents-react";

figma.connect(
  Menu,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=449947-614",
  {
    props: {},
    example: () => (
      <Menu headerText="Menu Title">
        <MenuItem text="Item 1" icon="add" />
        <MenuItem text="Item 2" icon="edit" />
        <MenuItem text="Item 3" icon="delete" />
      </Menu>
    ),
  }
);
