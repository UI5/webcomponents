import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationGroup from "../../src/SideNavigationGroup.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";

describe("Component Behavior", () => {
	describe("Main functionality", () => {
		it("rendering", () => {
			cy.mount(
				<SideNavigation style="height: 90vh; " id="sn1" collapsed={false}>
					<SideNavigationItem text="Item" />
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.should("exist");

			cy.get("#sn1").invoke("prop", "collapsed", true);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.should("not.exist");
		});

		it("Tests that visualization is correct when two groups are next to each other", () => {
			cy.mount(
				<SideNavigation id="sn1" collapsed={false}>
					<SideNavigationGroup id="group1" text="Group 1">
						<SideNavigationItem text="Item 1.1" icon="group"></SideNavigationItem>
					</SideNavigationGroup>
					<SideNavigationGroup id="group2" text="Group 2">
						<SideNavigationItem text="Item 2.1" icon="locate-me" selected></SideNavigationItem>
					</SideNavigationGroup>
					<SideNavigationItem text="Item" icon="locate-me"></SideNavigationItem>
					<SideNavigationGroup id="group3" text="Group 3">
						<SideNavigationItem text="Item 3.1" icon="locate-me"></SideNavigationItem>
					</SideNavigationGroup>
				</SideNavigation>
			);

			cy.get("#group2")
				.should("have.prop", "belowGroup", true);

			cy.get("#group2")
				.shadow()
				.find(".ui5-sn-item-separator").eq(0)
				.should("not.be.visible");

			cy.get("#group3")
				.should("have.prop", "belowGroup", false);

			cy.get("#group3")
				.shadow()
				.find(".ui5-sn-item-separator").eq(0)
				.should("be.visible");
		});

		it("collapse/expand", () => {
			cy.mount(
				<SideNavigation style="height: 90vh; " id="sn1">
					<SideNavigationItem text="Item" />
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
					<SideNavigationItem text="Item" />
					<SideNavigationGroup id="group2" disabled text="Group">
						<SideNavigationItem text="Home 2"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>);

			cy.get("#group1").should("have.prop", "expanded", true);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.realClick();
			cy.get("#group1").should("have.prop", "expanded", false);

			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item")
				.realClick();
			cy.get("#group1").should("have.prop", "expanded", true);
		});

		it("Tests expanding of groups with ArrowRight", () => {
			cy.mount(
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationGroup id="group1" text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("ArrowRight");

			cy.get("#group1").should("have.attr", "expanded");
		});

		it("Tests collapsing of groups with ArrowLeft", () => {
			cy.mount(
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("ArrowLeft");

			cy.get("#group1").should("not.have.attr", "expanded");
		});

		it("Tests expanding of groups with ArrowLeft for rtl", () => {
			cy.mount(
				<div dir="rtl">
					<SideNavigation id="sn">
						<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
						<SideNavigationGroup id="group1" text="Group">
							<SideNavigationItem text="Home 1"
								icon="home"
								href="#home"
								title="Home tooltip" />
						</SideNavigationGroup>
					</SideNavigation>
				</div>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("ArrowLeft");

			cy.get("#group1").should("have.attr", "expanded");
		});

		it("Tests expanding of groups with ArrowRight for rtl", () => {
			cy.mount(
				<div dir="rtl">
					<SideNavigation id="sn">
						<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
						<SideNavigationGroup id="group1" expanded text="Group">
							<SideNavigationItem text="Home 1"
								icon="home"
								href="#home"
								title="Home tooltip" />
						</SideNavigationGroup>
					</SideNavigation>
				</div>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("ArrowRight");

			cy.get("#group1").should("not.have.attr", "expanded");

		});

		it("Tests expanding of groups with Plus", () => {
			cy.mount(
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationGroup id="group1" text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("+");

			cy.get("#group1").should("have.attr", "expanded");
		});

		it("Tests collapsing of groups with Minus", () => {
			cy.mount(
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("-");

			cy.get("#group1").should("not.have.attr", "expanded");
		});

		it("Tests expanding of groups with Plus for rtl", () => {
			cy.mount(
				<div dir="rtl">
					<SideNavigation id="sn">
						<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
						<SideNavigationGroup id="group1" text="Group">
							<SideNavigationItem text="Home 1"
								icon="home"
								href="#home"
								title="Home tooltip" />
						</SideNavigationGroup>
					</SideNavigation>
				</div>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("+");

			cy.get("#group1").should("have.attr", "expanded");

		});

		it("Tests collapsing of groups with Minus for rtl", () => {
			cy.mount(
				<div dir="rtl">
					<SideNavigation id="sn">
						<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
						<SideNavigationGroup id="group1" expanded text="Group">
							<SideNavigationItem text="Home 1"
								icon="home"
								href="#home"
								title="Home tooltip" />
						</SideNavigationGroup>
					</SideNavigation>
				</div>
			);

			cy.get("#focusStart").realClick();
			cy.realPress("ArrowDown");
			cy.realPress("-");

			cy.get("#group1").should("not.have.attr", "expanded");

		});

		it("Tests disabled group items", () => {
			cy.mount(
				<SideNavigation id="sn1">
					<SideNavigationGroup id="group1" expanded text="Group">
						<SideNavigationItem text="Home 1"
							icon="home"
							href="#home"
							title="Home tooltip" />
					</SideNavigationGroup>
				</SideNavigation>);

			cy.get("#group1").invoke("prop", "disabled", true);

			cy.get<SideNavigationGroup>("#group1").then(($itemRef) => {
				const item = $itemRef[0];
				cy.wrap(item.items).each((item) => {
					cy.wrap(item).should("have.prop", "effectiveDisabled", true);
				});
			});
		});

		it("Tests focus of disabled groups", () => {
			cy.mount(
				<SideNavigation id="sideNav">
					<SideNavigationItem id="item" text="1"></SideNavigationItem>
					<SideNavigationGroup id="group1" disabled={true} text="Group">
						<SideNavigationItem id="item" text="1"></SideNavigationItem>
					</SideNavigationGroup>
				</SideNavigation>
			);

			cy.get("#item").realClick();

			cy.get("#item")
				.should("be.focused")
			cy.get("#item")
				.shadow()
				.find(".ui5-sn-item")
				.should("have.attr", "tabindex", "0");

			cy.realPress("ArrowDown");

			cy.get("#group1")
				.should("be.focused")
			cy.get("#group1")
				.shadow()
				.find(".ui5-sn-item.ui5-sn-item-group")
				.should("have.attr", "tabindex", "0");
		});
	});
});