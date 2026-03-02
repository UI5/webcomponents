import { createReactComponent } from "@ui5/webcomponents-base";
import NavigationLayoutClass from "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";

const NavigationLayout = createReactComponent(NavigationLayoutClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

function App() {

  const handleClick = () => {
    nl1.mode = nl1.isSideCollapsed() ? NavigationLayoutMode.Expanded : NavigationLayoutMode.Collapsed;
  };

  const handleSelectionChange = (e) => {
    if (e.detail.item.getAttribute("target")) {
		return;
  };

  return (
    <>
      <NavigationLayout id="nl1">
    		<ShellBar slot="header" notifications-count={72} show-notifications={true}>
                <Button icon="menu2" slot="startButton" id="startButton" />
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
    		<SideNavigation id="sn1" slot="sideContent">
    			<!-- Items -->
    			<SideNavigationItem text="Home" href="#home" icon="home" />
    			<SideNavigationGroup text="Group 1" expanded={true}>
    				<SideNavigationItem text="Item 1" href="#item1" icon="locate-me" expanded={true}>
    					<SideNavigationSubItem text="Sub Item 1" href="#subitem1" />
    					<SideNavigationSubItem text="Sub Item 2" href="#subitem2" />
    				</SideNavigationItem>
    				<SideNavigationItem text="Item 2" href="#item2" icon="calendar" expanded={true}>
    					<SideNavigationSubItem text="Sub Item 3" href="#subitem3" />
    					<SideNavigationSubItem text="Sub Item 4" href="#subitem4" />
    				</SideNavigationItem>
    				<SideNavigationItem text="Item 3" href="#item2" icon="activity-assigned-to-goal" expanded={true}>
    					<SideNavigationSubItem text="Sub Item 5" href="#subitem5" />
    					<SideNavigationSubItem text="Sub Item 6" href="#subitem6" />
    				</SideNavigationItem>
    			</SideNavigationGroup>
    			<SideNavigationGroup text="Group 2" expanded={true}>
    				<SideNavigationItem text="Item 4" href="#item4" icon="history" />
    				<SideNavigationItem text="Item 5" href="#item5" icon="source-code" />
    				<SideNavigationItem text="Item 6" href="#item6" icon="background" />
    			</SideNavigationGroup>
    			<!-- Fixed Items -->
    			<SideNavigationItem slot="fixedItems" text="Legal" href="https://www.sap.com/about/legal/impressum.html" target="_blank" unselectable={true} icon="compare" />
    			<SideNavigationItem slot="fixedItems" text="Privacy" href="https://www.sap.com/about/legal/privacy.html" target="_blank" unselectable={true} icon="locked" />
    			<SideNavigationItem slot="fixedItems" text="Terms of Use" href="https://www.sap.com/terms-of-use" target="_blank" unselectable={true} icon="document-text" />
    		</SideNavigation>
    		<div className="content">
    			<div id="contHome" className="contentItem contentItemVisible">
    				<Title>Home</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem1" className="contentItem">
    				<Title>Item 1</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem2" className="contentItem">
    				<Title>Item 2</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem3" className="contentItem">
    				<Title>Item 3</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem4" className="contentItem">
    				<Title>Item 4</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contItem5" className="contentItem">
    				<Title>Item 5</Title>
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
    				<Title>Sub Item 1</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem2" className="contentItem">
    				<Title>Sub Item 2</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem3" className="contentItem">
    				<Title>Sub Item 3</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem4" className="contentItem">
    				<Title>Sub Item 4</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem5" className="contentItem">
    				<Title>Sub Item 5</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    			<div id="contSubitem6" className="contentItem">
    				<Title>Sub Item 6</Title>
    				<br />
    				<Text>
    					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    				</Text>
    			</div>
    		</div>
    	</NavigationLayout>
    </>
  );
}

export default App;
