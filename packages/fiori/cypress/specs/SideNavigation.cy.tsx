import SideNavigation from "../../src/SideNavigation.js";
import SideNavigationItem from "../../src/SideNavigationItem.js";
import SideNavigationGroup from "../../src/SideNavigationGroup.js";
import SideNavigationSubItem from "../../src/SideNavigationSubItem.js";
import group from "@ui5/webcomponents-icons/dist/group.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import employeeApprovals from "@ui5/webcomponents-icons/dist/employee-approvals.js";
import { SIDE_NAVIGATION_OVERFLOW_ITEM_LABEL } from "../../src/generated/i18n/i18n-defaults.js";
import { NAVIGATION_MENU_POPOVER_HIDDEN_TEXT } from "../../src/generated/i18n/i18n-defaults.js";
import { NAVIGATION_MENU_SELECTABLE_ITEM_HIDDEN_TEXT } from "../../src/generated/i18n/i18n-defaults.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";

describe("Side Navigation Rendering", () => {
	it("Tests rendering in collapsed mode", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="1" id="parentItem">
					<SideNavigationSubItem text="1.1" />
					<SideNavigationSubItem text="1.2" design="Action" />
				</SideNavigationItem>
				<SideNavigationItem text="2" id="parentItem2" design="Action">
					<SideNavigationSubItem text="2.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#parentItem").realClick();
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.2']")
			.should("have.attr", "design", "Action");

		cy.get("#parentItem2").realClick();
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='2']")
			.should("have.attr", "design", "Action");
	});

	it("Tests rendering of overflow items", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="dummy item"></SideNavigationItem>
				<SideNavigationItem text="1" design="Action"></SideNavigationItem>
				<SideNavigationItem text="2" href="https://sap.com" target="_blank" design="Action"></SideNavigationItem>
				<SideNavigationItem text="3">
					<SideNavigationSubItem text="3.1" design="Action"></SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 100px");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow:not(.ui5-sn-item-hidden)")
			.realClick();

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='1']")
			.should("have.attr", "design", "Action");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='2']")
			.should("have.attr", "design", "Action");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='3.1']")
			.should("have.attr", "design", "Action");
	});

	it("Tests accessibility", () => {
		cy.mount(
			<SideNavigation id="sideNav" accessibleName="Main">
			</SideNavigation>
		);

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-root")
			.should("have.attr", "aria-label", "Main");
	});

	it("Tests header visibility", () => {
		cy.mount(
			<SideNavigation id="sn1" accessibleName="Main" collapsed={false}>
				<div slot="header" class="header">
					<Title>William Brown</Title>
					<Label>UX expert</Label>
				</div>
			</SideNavigation>);

		cy.get("#sn1").should("have.prop", "showHeader", true);

		cy.get("#sn1").invoke("prop", "collapsed", true);

		cy.get("#sn1").should("have.prop", "showHeader", false);
	});

	it("Tests tooltips", () => {
		const TOOLTIP_TEXT = "From My Team tooltip";
		cy.mount(
			<SideNavigation id="sn1" accessibleName="Main" collapsed={false}>
				<SideNavigationItem id="item1" text="People" icon="{group}" expanded={true}>
					<SideNavigationSubItem id="item11" text="From My Team" icon="{employeeApprovals}" tooltip={TOOLTIP_TEXT}></SideNavigationSubItem>
					<SideNavigationSubItem id="item21" text="From My Team" icon="{employeeApprovals}"></SideNavigationSubItem>
				</SideNavigationItem>
				<SideNavigationItem id="item2" text="People" expanded icon="{group}" tooltip={TOOLTIP_TEXT} />
			</SideNavigation>);

		cy.get("#item1").should("not.have.attr", "tooltip");
		cy.get("#item2").should("have.attr", "tooltip", TOOLTIP_TEXT);

		cy.get("#item11").should("have.attr", "tooltip", TOOLTIP_TEXT);
		cy.get("#item21").should("not.have.attr", "tooltip");
	});

	it("Tests disabled parent item", () => {
		cy.mount(
			<SideNavigation id="sn1">
				<SideNavigationItem id="parent" expanded={true} text="Group 1">
					<SideNavigationSubItem text="child 1" />
					<SideNavigationSubItem disabled={true} text="child 2" />
				</SideNavigationItem>
			</SideNavigation>);

		cy.get("#parent").invoke("prop", "disabled", true);

		cy.get<SideNavigationItem>("#parent").then(($itemRef) => {
			const item = $itemRef[0];
			cy.wrap(item.items).each((item) => {
				cy.wrap(item).should("have.prop", "effectiveDisabled", true);
			});
		});
	});

});

describe("Side Navigation interaction", () => {
	it("Tests expanding and collapsing of items", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" icon={group}>
					<SideNavigationSubItem id="subItem1" text="1.1" />
					<SideNavigationSubItem id="subItem2" text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("have.attr", "expanded");

		// act
		cy.get("#subItem1").realClick();
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("not.have.attr", "expanded");
		cy.get("#item1").shadow().find(".ui5-sn-item-level1").should("have.class", "ui5-sn-item-selected");
		cy.get("#item1").should("not.have.attr", "selected");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").shadow().find(".ui5-sn-item-level1").should("not.have.class", "ui5-sn-item-selected");

	});

	it("Tests expanding and collapsing of unselectable items", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" unselectable={true}>
					<SideNavigationSubItem text="2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-toggle-icon").realClick();

		// assert
		cy.get("#item1").should("not.have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-text").realClick();

		// assert
		cy.get("#item1").should("have.attr", "expanded");

		// act
		cy.get("#item1").shadow().find(".ui5-sn-item-text").realClick();

		// assert
		cy.get("#item1").should("not.have.attr", "expanded");
	});

	it("Tests not expanding and collapsing of unselectable items with Space and Enter", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1" unselectable={true}>
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		// act
		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("not.have.attr", "expanded");

		// act
		cy.realPress("Space");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("not.have.attr", "expanded");

		// act
		cy.realPress("Enter");

		// assert
		cy.get("#unselectableItem").should("be.focused").and("not.have.attr", "expanded");
	});

	it("Tests expanding of items with ArrowRight", () => {
		cy.mount(
			<SideNavigation id="sn">
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1">
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("ArrowRight");

		cy.get("#unselectableItem").should("have.attr", "expanded");
	});

	it("Tests collapsing of items with ArrowLeft", () => {
		cy.mount(
			<SideNavigation id="sn">
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1" expanded>
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("ArrowLeft");

		cy.get("#unselectableItem").should("not.have.attr", "expanded");

	});

	it("Tests expanding of items with ArrowRight on collapsed sn", () => {
		cy.mount(
			<SideNavigation id="sn" collapsed={true}>
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1">
					<SideNavigationSubItem id="snn1" text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#unselectableItem").realClick();

		cy.get("#sn")
			.shadow()
			.find(`[ui5-side-navigation-item][text="1"]`)
			.should('be.focused');

		cy.realPress("ArrowLeft");
		cy.get("#unselectableItem").should('be.focused');

		cy.realPress("ArrowRight");
		cy.get("#sn")
			.shadow()
			.find(`[ui5-side-navigation-item][text="1"]`)
			.should('be.focused');

		cy.get("#sn")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
	});

	it("Tests collapsing of items with ArrowLeft on collapsed sn", () => {
		cy.mount(
			<SideNavigation id="sn" collapsed={true}>
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1">
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#unselectableItem").realClick();

		cy.get("#sn")
			.shadow()
			.find(`[ui5-side-navigation-item][text="1"]`)
			.should('be.focused'); // Фокуса на правилното място ли е след, като съм отворил popover?

		cy.realPress("ArrowLeft"); // Ако фокуса е на правилното място, натисни ArrowLeft

		cy.get("#unselectableItem").should('be.focused'); // След като съм натиснал ArrowLeft, провери дали фокуса е на правилното място

		cy.get("#sn")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed(); // Ако фокуса е на правилното място провери дали popover-a е затворен, защото така очаквам
	});

	it("Tests expanding of items with ArrowLeft for rtl", () => {
		cy.mount(
			<div dir="rtl">
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationItem id="unselectableItem" text="1">
						<SideNavigationSubItem text="1.2" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("ArrowLeft");

		cy.get("#unselectableItem").should("have.attr", "expanded");
	});

	it("Tests collapsing of items with ArrowRight for rtl", () => {
		cy.mount(
			<div dir="rtl">
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationItem id="unselectableItem" text="1">
						<SideNavigationSubItem text="1.2" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);

		cy.get("#unselectableItem").realClick();
		cy.get("#unselectableItem").realPress("ArrowRight");

		cy.get("#unselectableItem").should("not.have.attr", "expanded");

	});

	it("Tests expanding of items with ArrowLeft on collapsed sn for rtl", () => {
		cy.mount(
			<div dir="rtl">
				<SideNavigation id="sn" collapsed={true}>
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationItem id="unselectableItem" text="1">
						<SideNavigationSubItem text="1.2" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);

		cy.get("#unselectableItem").realClick();

		cy.get("#sn")
			.shadow()
			.find(`[ui5-side-navigation-item][text="1"]`)
			.should('be.focused');

		cy.realPress("ArrowRight");

		cy.get("#unselectableItem").should('be.focused');

		cy.realPress("ArrowLeft");
		cy.get("#sn")
			.shadow()
			.find(`[ui5-side-navigation-item][text="1"]`)
			.should('be.focused');

		cy.get("#sn")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
	});

	it("Tests collapsing of items with ArrowRight on collapsed sn for rtl", () => {
		cy.mount(
			<div dir="rtl">
				<SideNavigation id="sn" collapsed={true}>
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationItem id="unselectableItem" text="1">
						<SideNavigationSubItem text="1.2" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);

		cy.get("#unselectableItem").realClick();
		cy.get("#sn")
			.shadow()
			.find(`[ui5-side-navigation-item][text="1"]`)
			.should('be.focused');

		cy.realPress("ArrowRight");

		cy.get("#sn")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();
	});

	it("Tests expanding of items with Plus", () => {
		cy.mount(
			<SideNavigation id="sn">
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1">
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("+");

		cy.get("#unselectableItem").should("have.attr", "expanded");

	});

	it("Tests collapsing of items with Minus", () => {
		cy.mount(
			<SideNavigation id="sn">
				<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
				<SideNavigationItem id="unselectableItem" text="1">
					<SideNavigationSubItem text="1.2" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#unselectableItem").realClick();
		cy.realPress("-");

		cy.get("#unselectableItem").should("not.have.attr", "expanded");

	});

	it("Tests expanding of items with Plus for rtl", () => {
		cy.mount(
			<div dir="rtl">
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationItem id="unselectableItem" text="1">
						<SideNavigationSubItem text="1.2" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("+");

		cy.get("#unselectableItem").should("have.attr", "expanded");
	});

	it("Tests collapsing of items with Minus for rtl", () => {
		cy.mount(
			<div dir="rtl">
				<SideNavigation id="sn">
					<SideNavigationItem id="focusStart" text="focus start"></SideNavigationItem>
					<SideNavigationItem id="unselectableItem" text="1">
						<SideNavigationSubItem text="1.2" />
					</SideNavigationItem>
				</SideNavigation>
			</div>
		);
		cy.get("#unselectableItem").realClick();
		cy.realPress("-");

		cy.get("#unselectableItem").should("not.have.attr", "expanded");
	});

	it("Tests expanding and collapsing of unselectable parent item when SideNavigation is collapsed", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item1" text="1" unselectable={true}>
					<SideNavigationSubItem text="1.1"></SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

		// act
		cy.get("#item1").realClick();

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		// assert
		cy.get("@popover")
			.should("be.visible");

		cy.get("@popover")
			.find("[ui5-side-navigation-item][text='1']")
			.should("be.visible");

		cy.get("@popover")
			.find("[ui5-side-navigation-sub-item][text='1.1']")
			.should("be.visible");

		// act
		cy.get("@popover")
			.find("[ui5-side-navigation-item][text='1']")
			.realClick();

		// assert
		cy.get("@popover")
			.should("be.visible");

		// act
		cy.get("@popover")
			.find("[ui5-side-navigation-sub-item][text='1.1']")
			.realClick();

		// assert
		cy.get("@popover")
			.should("not.be.visible");
	});

	it("Tests isSelectable", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" />
				<SideNavigationItem id="item2" text="2" disabled />
				<SideNavigationItem id="item3" text="3" design="Action" />
				<SideNavigationItem id="item4" text="4" href="https://sap.com" />
				<SideNavigationItem id="item5" text="5" unselectable={true} />
				<SideNavigationItem>
					<SideNavigationSubItem id="item6" text="6" />
					<SideNavigationSubItem id="item7" text="7" unselectable={true} />
				</SideNavigationItem>
			</SideNavigation>
		);

		// assert
		[
			{ id: "item1", expectedIsSelectable: true },
			{ id: "item2", expectedIsSelectable: false },
			{ id: "item3", expectedIsSelectable: true },
			{ id: "item4", expectedIsSelectable: true },
			{ id: "item5", expectedIsSelectable: false },
			{ id: "item6", expectedIsSelectable: true },
			{ id: "item7", expectedIsSelectable: false },
		].forEach(({ id, expectedIsSelectable }) => {
			cy.get(`#${id}`)
				.invoke("prop", "isSelectable")
				.should("equal", expectedIsSelectable);
		});
	});

	it("Tests 'click' event", () => {
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
				<SideNavigationItem id="parentItem" text="3">
					<SideNavigationSubItem text="3.1" />
				</SideNavigationItem>
				<SideNavigationItem text="4" expanded={true}>
					<SideNavigationSubItem id="childItem" text="4.1" />
				</SideNavigationItem>
				<SideNavigationItem id="unselectableParentItem" text="5" unselectable={true}>
					<SideNavigationSubItem id="text9" text="5.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		[
			{ element: cy.get("#item"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableItem"), expectedCallCount: 1 },
			{ element: cy.get("#parentItem"), expectedCallCount: 1 },
			{ element: cy.get("#childItem"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableParentItem"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableParentItem").shadow().find(".ui5-sn-item-toggle-icon"), expectedCallCount: 0 },
		].forEach(({ element, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("click", cy.stub().as("clickHandler"));
				});
			// act
			element.realClick();

			// assert
			cy.get("@clickHandler").should("have.callCount", expectedCallCount);
		});
	});

	it("Tests 'click' event with Enter and Space", () => {
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
				<SideNavigationItem id="parentItem" text="3">
					<SideNavigationSubItem text="3.1" />
				</SideNavigationItem>
				<SideNavigationItem text="4" expanded={true}>
					<SideNavigationSubItem id="childItem" text="4.1" />
				</SideNavigationItem>
				<SideNavigationItem id="unselectableParentItem" text="5" unselectable={true}>
					<SideNavigationSubItem id="text9" text="5.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		[
			{ selector: "#item", expectedCallCount: 2 },
			{ selector: "#unselectableItem", expectedCallCount: 1 },
			{ selector: "#parentItem", expectedCallCount: 2 },
			{ selector: "#childItem", expectedCallCount: 2 },
			{ selector: "#unselectableParentItem", expectedCallCount: 1 },
		].forEach(({ selector, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("click", cy.stub().as("clickHandler"));
				});

			cy.get(selector)
				.shadow()
				.find(".ui5-sn-item")
				.as("sn-item")
				.should("have.attr", "tabindex");

			// act
			cy.get("@sn-item")
				.focus();

			cy.realPress("Space")
				.realPress("Enter");

			// assert
			cy.get("@clickHandler").should("have.callCount", expectedCallCount);
		});
	});

	it("Tests link opening with mouse click", () => {
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItemWithLink" text="external link" unselectable={true} href="#test" />
			</SideNavigation>
		);

		cy.url().should("not.include", "#test");

		cy.get("#unselectableItemWithLink").realClick();

		cy.url().should("include", "#test");

		// Remove #test from the URL
		cy.window().then(win => {
			win.history.back();
		});

		cy.url().should("not.include", "#test");
	});

	it("Tests link opening with Enter", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="focusStart" text="focus start" />
				<SideNavigationItem text="link" href="#test" />
			</SideNavigation>
		);

		cy.url().should("not.include", "#test");

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("Enter");

		cy.url().should("include", "#test");

		// Remove #test from the URL
		cy.window().then(win => {
			win.history.back();
		});

		cy.url().should("not.include", "#test");
	});

	it("Tests link opening with Space", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="focusStart" text="focus start" />
				<SideNavigationItem id="linkItem" text="external link" unselectable={true} href="#test" />
			</SideNavigation>
		);

		cy.url().should("not.include", "#test");

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("Space");

		cy.url().should("include", "#test");

		// Remove #test from the URL
		cy.window().then(win => {
			win.history.back();
		});

		cy.url().should("not.include", "#test");

		cy.get("#focusStart").realClick();
		cy.realPress("ArrowDown");
		cy.get("#linkItem").should("be.focused");

		// act
		cy.focused().trigger("keyup", {
			key: " ",
		});

		cy.url().should("include", "#test");

		// Remove #test from the URL
		cy.window().then(win => {
			win.history.back();
		});

		cy.url().should("not.include", "#test");
	});

	it("Tests preventDefault of 'click' event", () => {
		const handleClick = (event: Event) => {
			event.preventDefault();
		};

		const handleSelectionChange = cy.stub().as("selectionChangeHandler");

		cy.mount(
			<SideNavigation id="sideNav" onClick={handleClick} onSelectionChange={handleSelectionChange}>
				<SideNavigationItem id="linkItem" text="external link" unselectable={true} href="#preventDefault" />
				<SideNavigationItem id="item" text="item"/>
			</SideNavigation>
		);

		cy.url()
			.should("not.include", "#preventDefault");

		// Act
		cy.get("#linkItem").realClick();

		// Assert
		cy.get("@selectionChangeHandler").should("not.have.been.called");
		cy.url()
			.should("not.include", "#preventDefault");

		cy.get("#item").realClick();

		// Assert
		cy.get("@selectionChangeHandler").should("not.have.been.called");
		cy.url()
			.should("not.include", "#preventDefault");
	});

	it("Tests preventDefault of items in overflow menu", () => {
		const handleClick = (event: Event) => {
			event.preventDefault();
		};

		const handleSelectionChange = cy.stub().as("selectionChangeHandler");

		cy.mount(
			<SideNavigation id="sideNav" collapsed={true} onClick={handleClick} onSelectionChange={handleSelectionChange}>
				<SideNavigationItem text="home"></SideNavigationItem>
				<SideNavigationItem unselectable={true} href="#test" text="link"></SideNavigationItem>
				<SideNavigationItem text="item"></SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 120px");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow")
			.realClick();

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='link']")
			.realClick();

		cy.url()
			.should("not.include", "#test");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow")
			.realClick();

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='item']")
			.realClick();

		cy.get("@selectionChangeHandler", {timeout: 1000 }).should("not.have.been.called");
	});

	it("Tests preventDefault on child items in collapsed side navigation", () => {
		const handleClick = (event: Event) => {
			event.preventDefault();
		};

		const handleSelectionChange = cy.stub().as("selectionChangeHandler");

		cy.mount(
			<SideNavigation  onClick={handleClick} onSelectionChange={handleSelectionChange} id="sideNav" collapsed={true}>
				<SideNavigationItem id="parentItem" text="2">
					<SideNavigationItem text="child" />
					<SideNavigationItem href="#test" text="link"></SideNavigationItem>
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#parentItem")
			.realClick();

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='child']")
			.realClick();

		// Assert
		cy.get("@selectionChangeHandler").should("not.have.been.called");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='link']")
			.realClick();

		cy.get("@selectionChangeHandler").should("not.have.been.called");
		cy.url()
			.should("not.include", "#test");
	});

	it("Tests key modifiers when item is clicked", () => {
		const handleClick = cy.stub().as("clickHandler");

		cy.mount(
			<SideNavigation id="sideNav" onClick={e => {e.preventDefault(); handleClick(e);}}>
				<SideNavigationItem id="linkItem" text="external link"/>
			</SideNavigation>
		);

		const keyModifiers = [
			{ key: "ctrlKey", options: { ctrlKey: true } },
			{ key: "metaKey", options: { metaKey: true } },
			{ key: "altKey", options: { altKey: true } },
			{ key: "shiftKey", options: { shiftKey: true } },
		];

		keyModifiers.forEach(({ key, options }) => {
			cy.get("#sideNav").realClick(options);
			cy.get("@clickHandler").should("be.calledWithMatch", { detail: { [key]: true } });
		});
	});

	it("Tests 'selection-change' event", () => {
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
				<SideNavigationItem id="parentItem" text="3">
					<SideNavigationSubItem text="3.1" />
				</SideNavigationItem>
				<SideNavigationItem text="4" expanded={true}>
					<SideNavigationSubItem id="childItem" text="4.1" />
				</SideNavigationItem>
				<SideNavigationItem id="unselectableParentItem" text="5" unselectable={true}>
					<SideNavigationSubItem id="text9" text="5.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		[
			{ element: cy.get("#item"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableItem"), expectedCallCount: 0 },
			{ element: cy.get("#parentItem"), expectedCallCount: 1 },
			{ element: cy.get("#childItem"), expectedCallCount: 1 },
			{ element: cy.get("#unselectableParentItem"), expectedCallCount: 0 },
			{ element: cy.get("#unselectableParentItem").shadow().find(".ui5-sn-item-toggle-icon"), expectedCallCount: 0 },
		].forEach(({ element, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("ui5-selection-change", cy.stub().as("selectionChangeHandler"));
				});
			// act
			element.realClick();

			// assert
			cy.get("@selectionChangeHandler").should("have.callCount", expectedCallCount);
		});
	});

	it("Tests 'selection-change' event when SideNavigation is collapsed", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="1" />
				<SideNavigationItem id="parentItem" text="2">
					<SideNavigationSubItem text="2.1" />
					<SideNavigationSubItem text="2.2" unselectable={true} />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#parentItem").realClick();
		[
			{
				element: cy.get("#sideNav").shadow().find("[ui5-responsive-popover] [ui5-side-navigation-item][text='2']").shadow()
					.find(".ui5-sn-item"),
				expectedCallCount: 1,
			},
			{
				element: cy.get("#sideNav").shadow().find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='2.1']"),
				expectedCallCount: 1,
			},
			{
				element: cy.get("#sideNav").shadow().find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='2.2']"),
				expectedCallCount: 0,
			},
		].forEach(({ element, expectedCallCount }) => {
			cy.get("#sideNav")
				.then(sideNav => {
					sideNav.get(0).addEventListener("ui5-selection-change", cy.stub().as("selectionChangeHandler"));
				});

			// act
			cy.get("#parentItem").realClick();
			element.realClick();

			// assert
			cy.get("@selectionChangeHandler", { timeout: 1000 }).should("have.callCount", expectedCallCount);
		});
	});

	it("tests avoiding re-selecting already selected item", () => {
		const selectionChangeHandler = cy.stub().as("selectionChangeHandler");
		cy.mount(
			<SideNavigation id="sideNav" onSelectionChange={selectionChangeHandler}>
				<SideNavigationItem id="item" text="1" />
			</SideNavigation>
		);

		cy.get("#item").realClick();
		cy.get("#item").realClick();

		cy.get("@selectionChangeHandler").should("have.been.calledOnce");
	});

	it("tests selecting items in overflow menu", () => {
		cy.mount(
			<SideNavigation style="height: 200px" id="sideNav" collapsed={true}>
				<SideNavigationItem icon={home} text="Home"></SideNavigationItem>
				<SideNavigationItem icon={home} text="Home 1"></SideNavigationItem>
				<SideNavigationItem icon={home} text="Home 2"></SideNavigationItem>
				<SideNavigationItem icon={home} text="Home 3"></SideNavigationItem>
				<SideNavigationItem icon={home} text="Home 4"></SideNavigationItem>
				<SideNavigationItem icon={home} text="Home 5"></SideNavigationItem>
				<SideNavigationItem id="home6" icon={home} text="Home 6"></SideNavigationItem>
				<SideNavigationItem id="home7" icon={home} text="Home 7" unselectable></SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow")
			.as("itemOverflow");

		cy.get("@itemOverflow")
			.should("be.visible");

		cy.get("@itemOverflow")
			.realClick()
			.realClick();

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu")
			.as("overflowMenu");

		cy.get("@overflowMenu")
			.should("be.visible");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='Home 6']")
			.realClick();

		cy.get("@overflowMenu")
			.should("be.not.visible");

		cy.get("[ui5-side-navigation-item][text='Home 6']")
			.should("be.focused");

		cy.get("@itemOverflow")
			.realClick()
			.realClick();

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='Home 7']")
			.realClick();

		cy.get("@itemOverflow")
			.should("be.focused");
	});
});

describe("Side Navigation Accessibility", () => {
	it("SideNavigationItem ariaHasPopup", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" />
				<SideNavigationItem id="item2" text="2" expanded={true}>
					<SideNavigationSubItem id="childItem" text="2.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#item1")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("SideNavigationItem with sub items ariaHasPopup in collapsed SideNavigation", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item1" text="1">
					<SideNavigationSubItem id="childItem" text="1.1" />
				</SideNavigationItem>
			</SideNavigation>
		);
		cy.get("#item1").realClick();

		// assert
		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "tree");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		// act
		cy.get("#item1")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});
		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		// reopen the popover
		cy.get("#item1").realClick().realClick();

		// assert
		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "tree");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("SideNavigationItem ariaHasPopup in overflow", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item" text="1"></SideNavigationItem>
				<SideNavigationItem id="parentItem" text="2">
					<SideNavigationSubItem id="childItem" text="2.1"></SideNavigationSubItem>
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu")
			.as("overflowMenu");

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 100px");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow:not(.ui5-sn-item-hidden)")
			.realClick();

		// assert
		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("not.have.attr", "aria-haspopup");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "menu");

		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2.1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("not.have.attr", "aria-haspopup");

		// act
		cy.get("#item")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#parentItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		// assert
		cy.get("@overflowMenu")
			.find("[ui5-navigation-menu-item][text='2']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "menu");
	});

	it("SideNavigationItem description", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="item1" text="1" selected={true}/>
				<SideNavigationItem id="item2" text="2" expanded={true}>
					<SideNavigationSubItem id="childItem" text="2.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-describedby");

		cy.get("#item2")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-describedby", "To navigate to navigation item 2, press Spacebar or Enter.");

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-expanded");

		cy.get("#item2")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-expanded", "true");

		cy.get("#item1")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#item1")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");

		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#childItem")
			.invoke("prop", "accessibilityAttributes", {
				hasPopup: "dialog",
			});

		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-haspopup", "dialog");
	});

	it("SideNavigationItem aria attributes in collapsed SideNavigation", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
			</SideNavigation>
		);

		// assert
		cy.get("#item")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "role", "menuitemradio");

		cy.get("#unselectableItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "role", "menuitem");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-root")
			.should("have.prop", "tagName", "NAV");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-flexible")
			.should("have.attr", "aria-roledescription", "Navigation List Menu Bar");

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 100px");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-side-navigation-item][is-overflow]")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-label", SIDE_NAVIGATION_OVERFLOW_ITEM_LABEL.defaultText);
	});

	it("SideNavigationItem aria-checked in collapsed SideNavigation", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="item" text="1" />
				<SideNavigationItem id="unselectableItem" text="2" unselectable={true} />
			</SideNavigation>
		);

		// assert
		cy.get("#item")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "aria-checked");

		cy.get("#unselectableItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "aria-checked");
	});

	it("Tests accessible-name of overflow menu and sub menu", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem text="No children"></SideNavigationItem>
				<SideNavigationItem text="Parent 1">
					<SideNavigationSubItem text="1.1" />
				</SideNavigationItem>
				<SideNavigationItem text="Parent 2 unselectable" unselectable={true}>
					<SideNavigationSubItem text="2.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#sideNav")
			.invoke("attr", "style", "height: 100px");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-sn-item-overflow")
			.realClick();
	
		// Assert
		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu")
			.shadow()
			.find(".ui5-menu-rp")
			.invoke("attr", "accessible-name-ref")
			.should("match", /navigationMenuPopoverText$/);


		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu")
			.shadow()
			.find(".ui5-menu-rp")
			.find(".ui5-hidden-text")
			.should("have.text", NAVIGATION_MENU_POPOVER_HIDDEN_TEXT.defaultText);

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu")
			.shadow()
			.find(".ui5-menu-rp")
			.should("have.attr", "accessible-role", "Dialog");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='No children']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("not.have.attr", "aria-haspopup");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "menu");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 2 unselectable']")
			.shadow()
			.find(".ui5-navigation-menu-item-root")
			.should("have.attr", "aria-haspopup", "menu");

		cy.get("#sideNav")
				.shadow()
				.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 1']")
				.shadow()
				.find(".ui5-navigation-menu-item-root")
				.invoke("attr", "aria-describedby")
				.should("match", /invisibleText-describedby$/);

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 1']")
			.shadow()
			.find(".ui5-navigation-menu-item-root .ui5-hidden-text")
			.next()
			.should("have.text", NAVIGATION_MENU_SELECTABLE_ITEM_HIDDEN_TEXT.defaultText);

		// Act - open sub menu
		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 1']")
			.realClick();

		// Assert
		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 1']")
			.shadow()
			.find(".ui5-menu-rp")
			.should("have.attr", "accessible-name", "Parent 1");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 2 unselectable']")
			.shadow()
			.find(".ui5-menu-rp")
			.should("have.attr", "accessible-name", "Parent 2 unselectable");

		cy.get("#sideNav")
			.shadow()
			.find(".ui5-side-navigation-overflow-menu [ui5-navigation-menu-item][text='Parent 1']")
			.find("[ui5-navigation-menu-item][text='Parent 1']")
			.should("exist");
	});

	it("Tests SideNavigationGroup group accessibility attributes", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem text="Home"></SideNavigationItem>
				<SideNavigationGroup id="group" expanded={true} text="Group">
					<SideNavigationItem text="1" />
					<SideNavigationItem text="2" />
				</SideNavigationGroup>
			</SideNavigation>
		);

		// assert
		cy.get("#group")
			.shadow()
			.find(".ui5-sn-item-group")
			.should("have.attr", "role", "treeitem");

		cy.get("#group")
			.shadow()
			.find(".ui5-sn-item-group")
			.should("not.have.attr", "aria-description");

		cy.get("#group")
			.shadow()
			.find(".ui5-sn-item-ul")
			.should("have.attr", "role", "group")
			.should("have.attr", "aria-label", "Group");
	});

	it("Tests Primary and Footer Navigation Lists accessibility", () => {
		cy.mount(
			<SideNavigation id="sn">
				<SideNavigationItem text="Home"></SideNavigationItem>
				<SideNavigationItem text="1" />
				<SideNavigationItem slot="fixedItems" text="2" />
				<SideNavigationItem slot="fixedItems" text="3" />
			</SideNavigation>
		);

		// assert
		cy.get("#sn")
			.shadow()
			.find(".ui5-sn-flexible")
			.should("have.attr", "aria-label", "Primary Navigation Menu");

			cy.get("#sn")
			.shadow()
			.find(".ui5-sn-fixed")
			.should("have.attr", "aria-label", "Footer Navigation Menu");
	});
});

describe("Focusable items", () => {
	it("Tests focusable items in popover", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="parentItem" text="1">
					<SideNavigationSubItem text="1.1" />
					<SideNavigationSubItem text="1.2" disabled={true} />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#parentItem").realClick();
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "0");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "-1");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.2']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "-1");
	});

	it("Tests focus of disabled items", () => {
		cy.mount(
			<SideNavigation id="sideNav">
				<SideNavigationItem id="item" text="1"></SideNavigationItem>
				<SideNavigationItem disabled={true} id="parentItem" expanded={true} text="2">
					<SideNavigationSubItem id="childItem" text="2.1" disabled={true} />
				</SideNavigationItem>
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

		cy.get("#parentItem")
			.should("be.focused")
		cy.get("#parentItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "0");

		cy.realPress("ArrowDown");

		cy.get("#childItem")
			.should("be.focused")
		cy.get("#childItem")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "0");
	});

	it("Tests focusable items in popover of unselectable parent", () => {
		cy.mount(
			<SideNavigation id="sideNav" collapsed={true}>
				<SideNavigationItem id="unselectableParentItem" text="1" unselectable={true}>
					<SideNavigationSubItem text="1.1" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#unselectableParentItem").realClick();
		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-item][text='1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("not.have.attr", "tabindex");

		cy.get("#sideNav")
			.shadow()
			.find("[ui5-responsive-popover] [ui5-side-navigation-sub-item][text='1.1']")
			.shadow()
			.find(".ui5-sn-item")
			.should("have.attr", "tabindex", "0");
	});

	it("Tests external link items", () => {
		cy.mount(
			<SideNavigation>
				<SideNavigationItem id="externalLinkItem" text="External Link Unselectable" icon="{home}" href="https://sap.com" unselectable target="_blank" />
			</SideNavigation>);

		cy.get("#externalLinkItem")
			.shadow()
			.find(".ui5-sn-item-external-link-icon")
			.should("exist");
	});
});
