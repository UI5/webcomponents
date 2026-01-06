import NavigationLayout from "../../src/NavigationLayout.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import menu from "@ui5/webcomponents-icons/dist/menu.js";
import ShellBar from "../../src/ShellBar.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";
import SideNavigationGroup from "../../src/SideNavigationGroup.js";

function Sample() {
	return <NavigationLayout id="nl1">
		<ShellBar slot="header" primaryTitle="UI5 Web Components">
			<Button icon={menu} slot="startButton" id="startButton"></Button>
		</ShellBar>

		<SideNavigation id="sn1" slot="sideContent">
			<SideNavigationItem text="Home" href="#home" icon={home}></SideNavigationItem>

			<SideNavigationGroup text="Group 1" expanded={true}>
				<SideNavigationItem text="Item 1" href="#item1" icon={home}></SideNavigationItem>
				<SideNavigationItem text="Item 2" href="#item2" icon={home}></SideNavigationItem>
				<SideNavigationItem text="Item 3" href="#item3" icon={home}></SideNavigationItem>
			</SideNavigationGroup>

			<SideNavigationItem
				slot="fixedItems"
				text="Legal"
				href="https://www.sap.com/about/legal/impressum.html"
				target="_blank"
				icon={home}>
			</SideNavigationItem>
		</SideNavigation>

		<div>
			Content
		</div>
	</NavigationLayout>;
}

function SampleWithCollapsedMode() {
	return <NavigationLayout id="nl1" mode="Collapsed">
		<ShellBar slot="header" primaryTitle="UI5 Web Components">
			<Button icon={menu} slot="startButton" id="startButton"></Button>
		</ShellBar>

		<SideNavigation id="sn1" slot="sideContent">
			<SideNavigationItem text="Home" href="#home" icon={home}></SideNavigationItem>

			<SideNavigationGroup text="Group 1" expanded={true}>
				<SideNavigationItem text="Item 1" href="#item1" icon={home}></SideNavigationItem>
				<SideNavigationItem text="Item 2" href="#item2" icon={home}></SideNavigationItem>
				<SideNavigationItem text="Item 3" href="#item3" icon={home}></SideNavigationItem>
			</SideNavigationGroup>
		</SideNavigation>

		<div>
			Content
		</div>
	</NavigationLayout>;
}

function SampleWithExpandedMode() {
	return <NavigationLayout id="nl1" mode="Expanded">
		<ShellBar slot="header" primaryTitle="UI5 Web Components">
			<Button icon={menu} slot="startButton" id="startButton"></Button>
		</ShellBar>

		<SideNavigation id="sn1" slot="sideContent">
			<SideNavigationItem text="Home" href="#home" icon={home}></SideNavigationItem>

			<SideNavigationGroup text="Group 1" expanded={true}>
				<SideNavigationItem text="Item 1" href="#item1" icon={home}></SideNavigationItem>
				<SideNavigationItem text="Item 2" href="#item2" icon={home}></SideNavigationItem>
				<SideNavigationItem text="Item 3" href="#item3" icon={home}></SideNavigationItem>
			</SideNavigationGroup>
		</SideNavigation>

		<div>
			Content
		</div>
	</NavigationLayout>;
}

describe("Rendering and interaction", () => {

	it("tests initial rendering", () => {
		cy.mount(<Sample />);

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-root")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-header")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-section")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("exist");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-content")
			.should("exist");
	});

	it("tests collapsing", () => {
		cy.mount(<Sample />);

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", false);

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Collapsed");

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", true);

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Expanded");

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", false);
	});

	it("tests that initial mode=Collapsed overrides default expand/collapse behaviour", () => {
		cy.mount(<SampleWithCollapsedMode />);

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", true);
	});
});

describe("Navigation Layout on Size S", () => {
	beforeEach(() => {
		cy.viewport(500, 1080);
	});

	it("tests initial rendering", () => {
		cy.mount(<Sample />);

		cy.get("[ui5-navigation-layout]")
			.should("have.prop", "sideCollapsed", true);

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", true);

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("not.be.visible");
	});

	it("tests collapsing", () => {
		cy.mount(<Sample />);

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Expanded");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("be.visible");

		cy.get("[ui5-navigation-layout]")
			.invoke("prop", "mode", "Collapsed");

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("not.be.visible");
	});

	it("tests that initial mode=Expanded overrides default expand/collapse behaviour", () => {
		cy.mount(<SampleWithExpandedMode />);

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("be.visible");
	});
});
