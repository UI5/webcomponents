import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import PageClass from "@ui5/webcomponents-fiori/dist/Page.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";

const Bar = createReactComponent(BarClass);
const Page = createReactComponent(PageClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {

  const handleClick = () => {
    respPopover.open = !respPopover.open;
  };

  const handleSelectionChange = (e) => {
    if (e.detail.item.getAttribute("target")) {
		respPopover.open=false;
		return;
  };

  const handleClick = () => {
    quickActionDialog.open = true;
  };

  const handleClick = () => {
    quickActionDialog.open = false;
  };

  return (
    <>
      <Page style={{ height: "500px" }}>
    		<ShellBar notifications-count={72} show-notifications={true}>
                <Button icon="menu2" slot="startButton" id="menuBtn" />
                <ui5-shellbar-branding slot="branding">
                    Product Identifier
                    <img slot="logo" src="/images/sap-logo-svg.svg" />
                </ui5-shellbar-branding>
                <ui5-shellbar-search slot="searchField" show-clear-icon placeholder="Search Apps, Products"></ui5-shellbar-search>

                <ShellBarItem icon="sys-help" text="Help" />
                <ToggleButton icon="sap-icon://da" tooltip="Joule" slot="assistant" />
                <Avatar slot="profile">
                    <img src="/images/avatars/man_avatar_3.png"/>
                </Avatar>
            </ShellBar>
    		<ResponsivePopover id="respPopover" opener="menuBtn" placement="Bottom" accessible-name="Main Navigation">
    			<SideNavigation id="sideNavigation">
    				<!-- Items -->
    				<SideNavigationItem text="Home" href="#contHome" icon="home" selected={true} />
    				<SideNavigationGroup text="Group 1" expanded={true}>
    					<SideNavigationItem text="People" href="#contItem1" icon="group">
    						<SideNavigationSubItem text="From My Team" href="#contSubitem1" />
    						<SideNavigationSubItem text="From Other Teams" href="#contSubitem2" />
    					</SideNavigationItem>
    					<SideNavigationItem text="Recent Applications for user role" href="#contItem2" icon="history" />
    				</SideNavigationGroup>
    				<SideNavigationGroup text="Group 2" expanded={true}>
    					<SideNavigationItem text="Locations" href="#contItem3" icon="locate-me" />
    					<SideNavigationItem text="Events" expanded={true} unselectable={true} icon="calendar">
    						<SideNavigationSubItem text="Local" href="#contSubitem3" />
    						<SideNavigationSubItem text="Others" href="#contSubitem4" />
    					</SideNavigationItem>
    				</SideNavigationGroup>
    				<!-- Fixed Items -->
    				<SideNavigationItem slot="fixedItems" id="quickAction" text="Create" design="Action" unselectable={true} icon="write-new" />
    				<SideNavigationItem slot="fixedItems" text="App Finder" href="https://openui5.hana.ondemand.com/demoapps" target="_blank" icon="widgets" />
    				<SideNavigationItem slot="fixedItems" text="Legal" href="https://www.sap.com/about/legal/impressum.html" target="_blank" icon="compare" />
    			</SideNavigation>
    		</ResponsivePopover>
    		<div className="content">
    			<div id="contHome" className="contentItem contentItemVisible">
    				<Title>Home</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem1" className="contentItem">
    				<Title>People</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem2" className="contentItem">
    				<Title>Recent Applications for user role</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem3" className="contentItem">
    				<Title>Locations</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem6" className="contentItem">
    				<Title>Item 6</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem1" className="contentItem">
    				<Title>From My Team</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem2" className="contentItem">
    				<Title>From Other Teams</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem3" className="contentItem">
    				<Title>Local Events</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem4" className="contentItem">
    				<Title>Other Events</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    		</div>

    		<Dialog header-text="Create New Item" draggable={true} resizable={true} id="quickActionDialog">
    			<Text>Create new item...</Text>
    			<Bar slot="footer" design="Footer">
    				<Button slot="endContent" design="Emphasized">Create</Button>
    				<Button slot="endContent" id="quickActionCloseBtn">Close</Button>
    			</Bar>
    		</Dialog>
    	</Page>
    </>
  );
}

export default App;
