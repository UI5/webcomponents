import { createReactComponent } from "@ui5/webcomponents-base";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";

const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);

function App() {

  return (
    <>
      <SideNavigation>
    		<SideNavigationItem text="Home" icon="home" />
    		<SideNavigationItem text="People" expanded={true} icon="group" unselectable={true}>
    			<SideNavigationSubItem text="From My Team" />
    			<SideNavigationSubItem text="From Other Teams" />
    		</SideNavigationItem>
    		<SideNavigationItem text="Locations" icon="locate-me" unselectable={true}>
    			<SideNavigationSubItem text="Office" />
    			<SideNavigationSubItem text="Home" />
    		</SideNavigationItem>
    		<SideNavigationItem slot="fixedItems" text="History" expanded={true} icon="history" unselectable={true}>
    			<SideNavigationSubItem text="Today" />
    			<SideNavigationSubItem text="Yesterday" />
    		</SideNavigationItem>
    	</SideNavigation>
    </>
  );
}

export default App;
