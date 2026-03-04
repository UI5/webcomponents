import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/customer.js";

const SideNavigation = createComponent(SideNavigationClass);
const SideNavigationGroup = createComponent(SideNavigationGroupClass);
const SideNavigationItem = createComponent(SideNavigationItemClass);
const SideNavigationSubItem = createComponent(SideNavigationSubItemClass);

function App() {

  return (
    <>
      <style>{`
        ui5-side-navigation {
            height: 600px;
        }
      `}</style>
      <SideNavigation style={{ height: "600px" }}>
    		<SideNavigationItem text="Home" icon="home" />
    		<SideNavigationGroup text="Group 1" expanded={true}>
    			<SideNavigationItem text="People" expanded={true} icon="group">
    				<SideNavigationSubItem text="From My Team" />
    				<SideNavigationSubItem text="From Other Teams" />
    			</SideNavigationItem>
    		</SideNavigationGroup>
    		<SideNavigationGroup text="Group 2" expanded={true}>
    			<SideNavigationItem text="Locations" icon="locate-me" selected={true} />
    			<SideNavigationItem text="Locations" disabled={true} icon="locate-me" />
    			<SideNavigationItem text="Events" icon="calendar">
    				<SideNavigationSubItem text="Local" />
    				<SideNavigationSubItem text="Others" />
    			</SideNavigationItem>
    		</SideNavigationGroup>
    		<SideNavigationItem slot="fixedItems" text="Useful Links" icon="chain-link">
    			<SideNavigationSubItem text="External Link" href="https://sap.com" target="_blank" unselectable={true} />
    		</SideNavigationItem>
    		<SideNavigationItem slot="fixedItems" text="History" icon="history" />
    		<SideNavigationItem slot="fixedItems" text="External Link 1" icon="chain-link" href="https://sap.com" target="_blank" unselectable={true} />
    		<SideNavigationItem slot="fixedItems" text="External Link 2" icon="chain-link" href="https://sap.com" target="_blank" unselectable={true} />
        </SideNavigation>
    </>
  );
}

export default App;
