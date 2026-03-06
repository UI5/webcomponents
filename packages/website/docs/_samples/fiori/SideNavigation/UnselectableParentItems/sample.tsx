import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";

const SideNavigation = createComponent(SideNavigationClass);
const SideNavigationItem = createComponent(SideNavigationItemClass);
const SideNavigationSubItem = createComponent(SideNavigationSubItemClass);

function App() {
  return (
    <>
      <style>{`
        [ui5-side-navigation] {
        	height: 600px;
        }
      `}</style>
      <SideNavigation>
        <SideNavigationItem text="Home" icon="home" />
        <SideNavigationItem
          text="People"
          expanded={true}
          icon="group"
          unselectable={true}
        >
          <SideNavigationSubItem text="From My Team" />
          <SideNavigationSubItem text="From Other Teams" />
        </SideNavigationItem>
        <SideNavigationItem
          text="Locations"
          icon="locate-me"
          unselectable={true}
        >
          <SideNavigationSubItem text="Office" />
          <SideNavigationSubItem text="Home" />
        </SideNavigationItem>
        <SideNavigationItem
          slot="fixedItems"
          text="History"
          expanded={true}
          icon="history"
          unselectable={true}
        >
          <SideNavigationSubItem text="Today" />
          <SideNavigationSubItem text="Yesterday" />
        </SideNavigationItem>
      </SideNavigation>
    </>
  );
}

export default App;
