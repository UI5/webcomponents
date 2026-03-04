import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef, useState } from "react";
import NavigationLayoutClass from "@ui5/webcomponents-fiori/dist/NavigationLayout.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import ShellBarItemClass from "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import ShellBarSearchClass from "@ui5/webcomponents-fiori/dist/ShellBarSearch.js";
import SideNavigationClass from "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import SideNavigationGroupClass from "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";
import SideNavigationItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import SideNavigationSubItemClass from "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import ToggleButtonClass from "@ui5/webcomponents/dist/ToggleButton.js";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/source-code.js";
import "@ui5/webcomponents-icons/dist/background.js";
import "@ui5/webcomponents-icons/dist/activity-assigned-to-goal.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/document-text.js";
import "@ui5/webcomponents-icons/dist/compare.js";
import "@ui5/webcomponents-icons/dist/locked.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/da.js";

const NavigationLayout = createReactComponent(NavigationLayoutClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const ShellBarItem = createReactComponent(ShellBarItemClass);
const ShellBarSearch = createReactComponent(ShellBarSearchClass);
const SideNavigation = createReactComponent(SideNavigationClass);
const SideNavigationGroup = createReactComponent(SideNavigationGroupClass);
const SideNavigationItem = createReactComponent(SideNavigationItemClass);
const SideNavigationSubItem = createReactComponent(SideNavigationSubItemClass);
const Avatar = createReactComponent(AvatarClass);
const Button = createReactComponent(ButtonClass);
const Text = createReactComponent(TextClass);
const Title = createReactComponent(TitleClass);
const ToggleButton = createReactComponent(ToggleButtonClass);

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const contentPages = [
  { id: "home", title: "Home" },
  { id: "item1", title: "Item 1" },
  { id: "item2", title: "Item 2" },
  { id: "item3", title: "Item 3" },
  { id: "item4", title: "Item 4" },
  { id: "item5", title: "Item 5" },
  { id: "item6", title: "Item 6" },
  { id: "subitem1", title: "Sub Item 1" },
  { id: "subitem2", title: "Sub Item 2" },
  { id: "subitem3", title: "Sub Item 3" },
  { id: "subitem4", title: "Sub Item 4" },
  { id: "subitem5", title: "Sub Item 5" },
  { id: "subitem6", title: "Sub Item 6" },
];

function App() {
  const navLayoutRef = useRef(null);
  const [activePage, setActivePage] = useState("home");

  const handleStartButtonClick = () => {
    const nl = navLayoutRef.current;
    nl.mode = nl.isSideCollapsed() ? "Expanded" : "Collapsed";
  };

  const handleSelectionChange = (event) => {
    if (event.detail.item.getAttribute("target")) {
      return;
    }
    const href = event.detail.item.getAttribute("href");
    if (href) {
      const pageId = href.replace("#", "");
      setActivePage(pageId);
    }
  };

  return (
    <>
      <style>{`
        .content {
        	padding: 1rem;
        }

        .contentItem {
        	display: none;
        }

        .contentItemVisible {
        	display: block;
        }
      `}</style>
      <NavigationLayout ref={navLayoutRef} id="nl1">
    		<ShellBar slot="header" notificationsCount={72} showNotifications={true}>
                <Button icon="menu2" slot="startButton" id="startButton" onClick={handleStartButtonClick} />
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
    		<SideNavigation id="sn1" slot="sideContent" onSelectionChange={handleSelectionChange}>
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
    			<SideNavigationItem slot="fixedItems" text="Legal" href="https://www.sap.com/about/legal/impressum.html" target="_blank" unselectable={true} icon="compare" />
    			<SideNavigationItem slot="fixedItems" text="Privacy" href="https://www.sap.com/about/legal/privacy.html" target="_blank" unselectable={true} icon="locked" />
    			<SideNavigationItem slot="fixedItems" text="Terms of Use" href="https://www.sap.com/terms-of-use" target="_blank" unselectable={true} icon="document-text" />
    		</SideNavigation>
    		<div className="content">
          {contentPages.map((page) => (
            <div key={page.id} id={"cont" + page.id.charAt(0).toUpperCase() + page.id.slice(1)} className={`contentItem${activePage === page.id ? " contentItemVisible" : ""}`}>
              <Title>{page.title}</Title>
              <br />
              <Text>{loremIpsum}</Text>
            </div>
          ))}
    		</div>
    	</NavigationLayout>
    </>
  );
}

export default App;
