import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/action.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);

function App() {
  return (
    <>
      <style>{`
        ui5-side-navigation {
            height: 600px;
        }
      `}</style>
      <SideNavigation style={{ height: "600px" }}>
        {/* Navigation item with accessible name for screen readers */}
        <SideNavigationItem
          text="Home"
          icon="home"
          accessibleName="Navigate to Home Dashboard"
        />

        {/* Parent item with accessible name */}
        <SideNavigationItem
          text="Team"
          icon="group"
          accessibleName="View and manage team members"
          expanded={true}
        >
          {/* Sub-items with descriptive accessible names */}
          <SideNavigationSubItem
            text="Members"
            accessibleName="View all team members and their roles"
          />
          <SideNavigationSubItem
            text="Permissions"
            accessibleName="Manage team access and permissions"
          />
        </SideNavigationItem>

        {/* Navigation item with accessibility for reporting section */}
        <SideNavigationItem
          text="Reports"
          icon="action"
          accessibleName="Access reports and analytics dashboard"
        >
          <SideNavigationSubItem
            text="Sales"
            accessibleName="View sales performance reports"
          />
          <SideNavigationSubItem
            text="Revenue"
            accessibleName="View revenue and financial reports"
          />
        </SideNavigationItem>

        {/* Settings with detailed accessible description */}
        <SideNavigationItem
          slot="fixedItems"
          text="Settings"
          icon="action-settings"
          accessibleName="Open application settings and preferences"
        />

        {/* Help link with accessible context */}
        <SideNavigationItem
          slot="fixedItems"
          text="Help"
          icon="sys-help"
          href="https://help.example.com"
          target="_blank"
          unselectable={true}
          accessibleName="Open help documentation in new window"
        />
      </SideNavigation>
    </>
  );
}

export default App;
