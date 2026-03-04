import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import PageClass from "@ui5/webcomponents-fiori/dist/Page.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/write-new.js";
import "@ui5/webcomponents-icons/dist/widgets.js";
import "@ui5/webcomponents-icons/dist/compare.js";
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const Page = createReactComponent(PageClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Avatar = createReactComponent(AvatarClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {
  const quickActionDialogRef = useRef(null);
  const respPopoverRef = useRef(null);

  const handleMenuBtnClick = () => {
    respPopoverRef.current!.open = !respPopoverRef.current!.open;
  };

  const handleSideNavigationSelectionChange = (e) => {
    if (e.detail.item.getAttribute("target")) {
		respPopoverRef.current!.open=false;
		return;
    }
  };

  const handleQuickActionClick = () => {
    quickActionDialogRef.current!.open = true;
  };

  const handleQuickActionCloseBtnClick = () => {
    quickActionDialogRef.current!.open = false;
  };

  return (
    <>
      <style>{`
        #respPopover::part(content) {
        	padding: 0;
        	overflow-x: visible;
        	overflow-y: hidden
        }

        .content {
        	padding: 2rem;
        }

        .contentItem {
        	display: none;
        }

        .contentItemVisible {
        	display: block;
        }

        #sideNavigation {
        	width: 18rem;
        	box-shadow: none;
        	border-inline-end: none;
        }

        ui5-page::part(content) {
        	padding: 0;
        }
      `}</style>
      <Page style={{ height: "500px" }}>
    		<ShellBar notificationsCount={72} showNotifications={true}>
                <Button icon="menu2" slot="startButton" id="menuBtn" onClick={handleMenuBtnClick} />
                <ShellBarBranding slot="branding">
                    Product Identifier
                    <img slot="logo" src="/images/sap-logo-svg.svg" />
                </ShellBarBranding>
                <ShellBarSearch slot="searchField" showClearIcon={true} placeholder="Search Apps, Products" />

                <ShellBarItem icon="sys-help" text="Help" />
                <ToggleButton icon="sap-icon://da" tooltip="Joule" slot="assistant" />
                <Avatar slot="profile">
                    <img src="/images/avatars/man_avatar_3.png"/>
                </Avatar>
            </ShellBar>
    		<ResponsivePopover ref={respPopoverRef} id="respPopover" opener="menuBtn" placement="Bottom" accessibleName="Main Navigation">
    			<SideNavigation id="sideNavigation" onSelectionChange={handleSideNavigationSelectionChange}>
    				{/* Items */}
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
    				{/* Fixed Items */}
    				<SideNavigationItem slot="fixedItems" id="quickAction" text="Create" design="Action" unselectable={true} icon="write-new" onClick={handleQuickActionClick} />
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

    		<Dialog headerText="Create New Item" draggable={true} resizable={true} ref={quickActionDialogRef} id="quickActionDialog">
    			<Text>Create new item...</Text>
    			<Bar slot="footer" design="Footer">
    				<Button slot="endContent" design="Emphasized">Create</Button>
    				<Button slot="endContent" id="quickActionCloseBtn" onClick={handleQuickActionCloseBtnClick}>Close</Button>
    			</Bar>
    		</Dialog>
    	</Page>
    </>
  );
}

export default App;
