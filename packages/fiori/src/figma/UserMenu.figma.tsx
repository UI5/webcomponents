/**
 * React Code Connect mapping for the SAP Web UI Kit "User Menu".
 * Node 286950:9373. Mirrors UserMenu.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserMenu, UserMenuAccount, UserMenuItem } from "@ui5/webcomponents-react";

figma.connect(
  UserMenu,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=286950-9373",
  {
    props: {
      userName: figma.string("✏️ User Name"),
      subline1: figma.string("✏️ 1st Subline"),
      showEditButton: figma.boolean("Action Button"),
    },
    example: ({ userName, subline1, showEditButton }) => (
      <UserMenu showEditButton={showEditButton}>
        <UserMenuAccount
          slot="accounts"
          titleText={userName}
          subtitleText={subline1}
          selected
        />
        <UserMenuItem text="Settings" />
        <UserMenuItem text="Sign Out" />
      </UserMenu>
    ),
  }
);
