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

	it("tests that initial mode=Collapsed overrides default expand/collapse behavior", () => {
		cy.mount(<SampleWithCollapsedMode />);

		cy.get("[ui5-side-navigation]")
			.should("have.prop", "collapsed", true);
	});

	it("should fire item-click event on every item click", () => {
		cy.mount(
			<NavigationLayout>
				<SideNavigation slot="sideContent">
					<SideNavigationItem text="Item 1" />
					<SideNavigationItem text="Item 2" />
				</SideNavigation>
				<div>Main content</div>
			</NavigationLayout>
		);

		// Set up event listener to track calls
		cy.get("[ui5-navigation-layout]")
			.then($navigationLayout => {
				$navigationLayout.get(0).addEventListener("item-click", cy.stub().as("itemClickNavLayout"));
			});

		// Also listen to SideNavigation to understand the event flow
		cy.get("[ui5-side-navigation]")
			.then($sideNav => {
				$sideNav.get(0).addEventListener("item-click", cy.stub().as("itemClickSideNav"));
			});

		// Click the first item
		cy.get("[ui5-side-navigation-item]").first().realClick();
		
		// Check how many times each event was fired
		cy.get("@itemClickSideNav").should("have.been.calledOnce");
		cy.get("@itemClickNavLayout").should("have.been.calledOnce");
		
		// Click the same item again
		cy.get("[ui5-side-navigation-item]").first().realClick();
		
		// Verify counts after second click
		cy.get("@itemClickSideNav").should("have.been.calledTwice");
		cy.get("@itemClickNavLayout").should("have.been.calledTwice");
	});
});

describe("Navigation Layout on Small screens (599px or less)", () => {
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

	it("tests that initial mode=Expanded overrides default expand/collapse behavior", () => {
		cy.mount(<SampleWithExpandedMode />);

		cy.get("[ui5-navigation-layout]")
			.shadow()
			.find(".ui5-nl-aside")
			.should("be.visible");
	});

	it("should collapse SideNavigation on mobile when item is selected in Auto mode", () => {
		// Set mobile viewport (width < 600px)
		cy.viewport(400, 800);

		cy.mount(<NavigationLayout mode="Auto">
			<SideNavigation slot="sideContent">
				<SideNavigationItem text="Home" />
				<SideNavigationItem text="Products" />
				<SideNavigationItem text="Settings" />
			</SideNavigation>
			<div>Main content</div>
		</NavigationLayout>);

		// Force NavigationLayout to Expanded mode first to show SideNavigation
		cy.get("[ui5-navigation-layout]").invoke("prop", "mode", "Expanded");
		cy.get("[ui5-side-navigation]").should("have.prop", "collapsed", false);

		// Reset to Auto mode
		cy.get("[ui5-navigation-layout]").invoke("prop", "mode", "Auto");
		
		// Manually expand for testing - in Auto mode on mobile it should be collapsed
		cy.get("[ui5-side-navigation]").invoke("prop", "collapsed", false);

		// Click on a SideNavigationItem
		cy.get("[ui5-side-navigation-item]").first().realClick();

		// SideNavigation should now be collapsed due to mobile view detection
		cy.get("[ui5-side-navigation]").should("have.prop", "collapsed", true);
	});

	it("should collapse SideNavigation when mode is not Auto", () => {
		// Set mobile viewport (width < 600px)
		cy.viewport(400, 800);

		cy.mount(<NavigationLayout mode="Expanded">
			<SideNavigation slot="sideContent">
				<SideNavigationItem text="Home" />
				<SideNavigationItem text="Products" />
				<SideNavigationItem text="Settings" />
			</SideNavigation>
			<div>Main content</div>
		</NavigationLayout>);

		// In Expanded mode, SideNavigation should be visible even on mobile
		cy.get("[ui5-side-navigation]").should("have.prop", "collapsed", false);

		// Click on a SideNavigationItem
		cy.get("[ui5-side-navigation-item]").first().realClick();

		// SideNavigation should remain expanded because mode is not Auto
		cy.get("[ui5-side-navigation]").should("have.prop", "collapsed", true);
	});
});

describe("Navigation Layout on Desktop screens (600px or more)", () => {
	beforeEach(() => {
		cy.viewport(1200, 800);
	});

	it("should not collapse SideNavigation on desktop when item is selected", () => {
		cy.mount(<NavigationLayout mode="Auto">
			<SideNavigation slot="sideContent">
				<SideNavigationItem text="Home" />
				<SideNavigationItem text="Products" />
				<SideNavigationItem text="Settings" />
			</SideNavigation>
			<div>Main content</div>
		</NavigationLayout>);

		// On desktop in Auto mode, SideNavigation should not be collapsed
		cy.get("[ui5-side-navigation]").should("have.prop", "collapsed", false);

		// Click on a SideNavigationItem
		cy.get("[ui5-side-navigation-item]").first().realClick();

		// SideNavigation should remain not collapsed on desktop
		cy.get("[ui5-side-navigation]").should("have.prop", "collapsed", false);
	});
});
