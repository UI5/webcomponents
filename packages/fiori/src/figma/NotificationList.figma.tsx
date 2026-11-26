/**
 * React Code Connect mapping for the SAP Web UI Kit "Notifications".
 * Node 284154:14021. Mirrors NotificationList.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NotificationList, NotificationListItem } from "@ui5/webcomponents-react";

figma.connect(
  NotificationList,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=284154-14021",
  {
    props: {},
    example: () => (
      <NotificationList>
        <NotificationListItem titleText="New message" priority="High">
          You have a new message in your inbox.
        </NotificationListItem>
      </NotificationList>
    ),
  }
);
