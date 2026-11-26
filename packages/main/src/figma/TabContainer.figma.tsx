/**
 * React Code Connect mapping for the SAP Web UI Kit "Tab Bar".
 * Node 24850:11169. Mirrors TabContainer.figma.ts.
 */
import figma from "@figma/code-connect/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TabContainer, Tab } from "@ui5/webcomponents-react";

figma.connect(
  TabContainer,
  "https://www.figma.com/design/SILcWzK5uFghKun9jx6D7c/SAP-Web-UI-Kit?node-id=24850-11169",
  {
    props: {},
    example: () => (
      <TabContainer>
        <Tab text="Tab 1" selected />
        <Tab text="Tab 2" />
        <Tab text="Tab 3" />
      </TabContainer>
    ),
  }
);
