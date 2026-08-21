import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import TagClass from "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/bar-chart.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/business-objects-experience.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Tag = createReactComponent(TagClass);

function App() {
  return (
    <>
      <style>{`
        ui5-side-navigation {
          height: 600px;
        }
        /* Recommended max-width for tags (4rem / 64px) */
        ui5-side-navigation-item ui5-tag,
        ui5-side-navigation-sub-item ui5-tag {
          max-width: 4rem;
        }
      `}</style>
      <SideNavigation>
        <SideNavigationItem text="Home" icon="home" selected={true} />

        <SideNavigationItem text="Dashboard" icon="bar-chart">
          <Tag slot="tag" design="Set2" colorScheme="5" hideStateIcon={true}>New</Tag>
        </SideNavigationItem>

        <SideNavigationItem text="Reports" icon="document" expanded={true}>
          <Tag slot="tag" design="Set2" colorScheme="6" hideStateIcon={true}>Beta</Tag>
          <SideNavigationSubItem text="Sales Reports" />
          <SideNavigationSubItem text="Financial Reports">
            <Tag slot="tag" design="Set2" colorScheme="7" hideStateIcon={true}>Alpha</Tag>
          </SideNavigationSubItem>
          <SideNavigationSubItem text="Custom Reports" />
        </SideNavigationItem>

        <SideNavigationItem text="Analytics" icon="business-objects-experience" unselectable={true} expanded={true}>
          <Tag slot="tag" design="Set2" colorScheme="8" hideStateIcon={true}>Preview</Tag>
          <SideNavigationSubItem text="Overview" />
          <SideNavigationSubItem text="Insights">
            <Tag slot="tag" design="Set2" colorScheme="9" hideStateIcon={true}>Dev</Tag>
          </SideNavigationSubItem>
        </SideNavigationItem>

        <SideNavigationItem text="Legacy Tools" icon="chain-link">
          <Tag slot="tag" design="Set2" colorScheme="10" hideStateIcon={true}>Sunset</Tag>
        </SideNavigationItem>

        <SideNavigationItem slot="fixedItems" text="Settings" icon="action-settings" />
        <SideNavigationItem slot="fixedItems" text="Help" icon="sys-help">
          <Tag slot="tag" design="Set2" colorScheme="5" hideStateIcon={true}>New</Tag>
        </SideNavigationItem>
      </SideNavigation>
    </>
  );
}

export default App;
