/**
 * React Code Connect mapping for the SAP Web UI Kit "Side Navigation".
 * Node 283218:5691. Mirrors SideNavigation.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SideNavigation, SideNavigationItem, SideNavigationSubItem } from "@ui5/webcomponents-react";

figma.connect(
  SideNavigation,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=283218-5691",
  {
    props: {
      collapsed: figma.enum("Type", {
        Collapsed: true,
        Expanded: false,
        Floating: false,
      }),
    },
    example: ({ collapsed }) => (
      <SideNavigation collapsed={collapsed}>
        <SideNavigationItem text="Home" icon="home" />
        <SideNavigationItem text="Calendar" icon="calendar">
          <SideNavigationSubItem text="Week View" />
        </SideNavigationItem>
      </SideNavigation>
    ),
  }
);
