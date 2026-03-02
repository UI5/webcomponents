import { createReactComponent } from "@ui5/webcomponents-base";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";

const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);

function App() {

  return (
    <>
      <SideNavigation>
    		<SideNavigationItem text="Home" icon="home" />
    		<SideNavigationItem text="Resource Planning and Business Management Solutions" icon="bbyd-dashboard" />
    		<SideNavigationGroup text="System & Administration Management" expanded={true}>
    			<SideNavigationItem text="Analytics and Data Visualization Tools" icon="bar-chart" />
    			<SideNavigationItem text="System Administration and Configuration Management" icon="wrench">
    				<SideNavigationSubItem text="Environment Settings" />
    				<SideNavigationSubItem text="Audit Log and Security Monitoring Dashboard" />
    			</SideNavigationItem>
    		</SideNavigationGroup>
    		<SideNavigationGroup text="Business Operations">
    			<SideNavigationItem text="Business Partners" icon="address-book" selected={true} />
    			<SideNavigationItem text="Sales Management and Revenue Operations" icon="area-chart" />
    		</SideNavigationGroup>
    		<SideNavigationItem text="SAP Support Portal and Technical Assistance" href="https://openui5.hana.ondemand.com/demoapps" target="_blank" icon="message-information" />
    		<SideNavigationItem slot="fixedItems" text="History" icon="history" />
    	</SideNavigation>
    </>
  );
}

export default App;
