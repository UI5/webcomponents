/**
 * React Code Connect mapping for the SAP Web UI Kit "List".
 * Node 155542:3875. Mirrors List.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { List, ListItemStandard } from "@ui5/webcomponents-react";

figma.connect(
  List,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=155542-3875",
  {
    props: {},
    example: () => (
      <List headerText="List Title">
        <ListItemStandard>List Item 1</ListItemStandard>
        <ListItemStandard>List Item 2</ListItemStandard>
        <ListItemStandard>List Item 3</ListItemStandard>
      </List>
    ),
  }
);
