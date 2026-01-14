import type UI5Element from "@ui5/webcomponents-base";
import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import ListItemGroup from "../../src/ListItemGroup.js";
import Title from "../../src/Title.js";
import Avatar from "../../src/Avatar.js";
import ListItemCustom from "../../src/ListItemCustom.js";
import Button from "../../src/Button.js";
import Breadcrumbs from "../../src/Breadcrumbs.js";
import BreadcrumbsItem from "../../src/BreadcrumbsItem.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";
import CheckBox from "../../src/CheckBox.js";
import Bar from "../../src/Bar.js";

function getGrowingWithScrollList(length: number, height: string = "100px") {
	return (
		<List growing="Scroll" style={{ height }}>
			{Array.from({ length }, (_, index) => (
				<ListItemStandard key={index}>Item {index + 1}</ListItemStandard>
			))}
		</List>
	);
}

describe("List Tests", () => {
	it("Arrow down and up navigation between last item and growing button", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.as("list");

		// Click the last item to set focus
		cy.get("@list")
			.find("ui5-li")
			.last()
			.click();

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");

		// Press arrow down once to move focus to the growing button
		cy.realPress("ArrowDown");

		// Verify the growing button is focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		// Arrow up once to move focus back to the last item
		cy.realPress("ArrowUp");

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");
	});

	it("Home key on growing button moves focus to first item", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.as("list");

		// Click the growing button to set focus
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.click();

		// Wait for the growing button to be focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");

		// Press Home key to move focus to the first item
		cy.realPress("Home");

		// Verify the first item is focused
		cy.get("@list")
			.find("ui5-li")
			.first()
			.should("be.focused");
	});

	it("End key navigation moves focus from first item to last item and then to growing button", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.as("list");

		// Click the first item to set focus
		cy.get("@list")
			.find("ui5-li")
			.first()
			.click();

		// Wait for the first item to be focused
		cy.get("@list")
			.find("ui5-li")
			.first()
			.should("be.focused");

		// Press End key to move focus to the last item
		cy.realPress("End");

		// Verify the last item is focused
		cy.get("@list")
			.find("ui5-li")
			.last()
			.should("be.focused");

		// Press End key again to move focus to the growing button
		cy.realPress("End");

		// Verify the growing button is focused
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("be.focused");
	});

	it("tests growing button accessible name property", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
	
		cy.get("[ui5-list]")
			.as("list");
	
		cy.get("@list").invoke('prop', 'accessibilityAttributes', {
			growingButton: {
				name: "Load more products from catalog"
			}
		});

		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("have.attr", "aria-label", "Load more products from catalog");
	
		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("not.have.attr", "aria-labelledby");
	});

	it("tests growing button accessible description property", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Product 1</ListItemStandard>
				<ListItemStandard>Product 2</ListItemStandard>
				<ListItemStandard>Product 3</ListItemStandard>
			</List>
		);
	
		cy.get("[ui5-list]")
			.as("list");

		cy.get("@list").invoke('prop', 'accessibilityAttributes', {
			growingButton: {
				description: "This button will load additional products to the list. Click or press Enter to see more items."
			}
		});

		cy.get("@list")
			.shadow()
			.find("[id$='growing-btn']")
			.should("have.attr", "aria-describedby");

		cy.get("@list")
			.shadow()
			.find("[id$='growingButton-description']")
			.should("exist")
			.should("have.class", "ui5-hidden-text")
			.should("contain.text", "This button will load additional products to the list. Click or press Enter to see more items.");
	});
});

describe("List - Growing with scroll", () => {
	it("tests 'loadMore' event not fired initially when the list did not overflow", () => {
		cy.mount(
			<div>
				<input value="0" />
				<List growing="Scroll">
					<ListItemGroup headerText="New Items" />
				</List>
			</div>
		);

		cy.get("input").should("have.value", "0");
	});
	it("tests start marker is present in DOM", () => {
		cy.mount(getGrowingWithScrollList(5));
		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-start-marker")
			.should("exist")
			.should("have.attr", "tabindex", "-1")
			.should("have.attr", "aria-hidden", "true");
	});

	it("tests end marker is present in DOM", () => {
		cy.mount(getGrowingWithScrollList(5));
		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-end-marker")
			.should("exist")
			.should("have.attr", "tabindex", "-1")
			.should("have.attr", "aria-hidden", "true");
	});

	it("End marker has correct CSS properties", () => {
		cy.mount(getGrowingWithScrollList(5));
		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-end-marker")
			.should("have.css", "display", "inline-block");
	});

	it("tests start marker observation works when scrolled", () => {
		cy.mount(getGrowingWithScrollList(5));
		cy.get("[ui5-list]").as("list");

		// Initially, start marker should be in view, so _startMarkerOutOfView should be false
		cy.get<List>("@list")
			.should(($el) => {
				const list = $el.get(0);
				expect(list._startMarkerOutOfView).to.be.false;
			});

		// Scroll down so start marker goes out of view
		cy.get("@list")
			.shadow()
			.find(".ui5-list-scroll-container")
			.scrollTo(0, 200, { duration: 100 });

		cy.get<List>("@list")
			.should(($el) => {
				const list = $el.get(0);
				expect(list._startMarkerOutOfView).to.be.true;
			});
	});

	it("tests end marker observation works when scrolled to bottom as load-more is being fired", () => {
		cy.mount(getGrowingWithScrollList(5));
		cy.get("[ui5-list]").as("list");

		cy.get<List>("@list")
			.then(list => {
				list.get(0)?.addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			});

		// Scroll to bottom so end marker becomes visible
		cy.get("@list")
			.shadow()
			.find(".ui5-list-scroll-container")
			.scrollTo("bottom", { duration: 100 });

		// The load-more event should be fired when end marker becomes visible
		// (assuming start marker is also out of view due to scrolling)
		cy.get("@loadMore")
			.should("have.been.called");
	});

	it("tests rerender/content change does not fire load-more event if conditions are met", () => {
		cy.mount(
			<div style="height: 6rem; overflow: auto; border: 1px solid black">
				{getGrowingWithScrollList(5, "")}
			</div>
		);

		cy.get("[ui5-list]").as("list");

		cy.get<List>("@list")
			.then(list => {
				list.get(0)?.addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			});

		// Scroll the container to bottom to meet the conditions
		cy.get("@list")
			.parent()
			.scrollTo("bottom", { duration: 100 });

		cy.get("@loadMore").invoke("resetHistory");

		// Simulate rerender by replacing content
		cy.get<List>("@list")
			.then(($list) => {
				$list[0].innerHTML = '<ui5-li>New Item</ui5-li>';
			});

		cy.get("@loadMore")
			.should("not.have.been.called");
	});

	it("tests load-more event fires when the scrollable container is a parent element", () => {
		cy.mount(
			<div id="scrollable-container" style="height: 150px; overflow-y: auto;">
				<List growing="Scroll">
					{getGrowingWithScrollList(5, "")}
				</List>
			</div>
		);

		cy.get("[ui5-list]").as("list");

		// Set up load-more event listener
		cy.get<List>("@list")
			.then(list => {
				list.get(0)?.addEventListener("ui5-load-more", cy.stub().as("loadMore"));
			});

		// Scroll the parent container (not the list itself) to bottom
		cy.get("#scrollable-container")
			.scrollTo("bottom", { duration: 100 });

		// The load-more event should still fire because intersection observers use viewport
		cy.get("@loadMore")
			.should("have.been.called");
	});
});

describe("List - Accessibility", () => {
	it("tests active state announcement", () => {
		cy.mount(
			<List>
				<ListItemStandard type="Active" id="active">Laptop Lenovo</ListItemStandard>
				<ListItemStandard type="Inactive" id="inactive">Laptop Lenovo</ListItemStandard>
			</List>
		);

		// assert
		cy.get("#active").invoke("prop", "_id").then(_id => {
			cy.get("#active")
				.shadow()
				.find(`#${_id}-invisibleText`)
				.should("have.text", "Is Active");
		});

		cy.get("#inactive").invoke("prop", "_id").then(_id => {
			cy.get("#inactive")
				.shadow()
				.find(`#${_id}-invisibleText`)
				.should("not.have.text", "Is Active");
		});
	});
});

describe("List - Wrapping Behavior", () => {
	it("renders list items with wrapping functionality", () => {
		const longText = "This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components; This is a very long text that should demonstrate the wrapping functionality of ListItemStandard components";
		const longDescription = "This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well; This is an even longer description text to verify that wrapping works correctly for the description part of the list item as well";

		cy.mount(
			<List>
				<ListItemStandard id="wrapping-item" wrappingType="Normal" text={longText} description={longDescription}></ListItemStandard>
				<ListItemGroup id="lig" wrapping-type="Normal" header-text={longText}>
					<ListItemStandard>1. Bulgaria</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		// Check wrapping attributes are set correctly
		cy.get("#wrapping-item")
			.should("have.attr", "wrapping-type", "Normal");

		// Check that ExpandableText components are present in the wrapping item
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.should("exist")
			.and("have.length", 2);

		cy.get("#lig")
			.should("have.attr", "wrapping-type", "Normal")
			.shadow()
			.find("ui5-li-group-header")
			.should("have.attr", "wrapping-type", "Normal")
			.shadow()
			.find("ui5-expandable-text")
			.should("exist")
			.and("have.length", 1);

	});

	it("uses maxCharacters of 300 on desktop viewport for wrapping list items", () => {
		const longText = "This is a very long text that exceeds 100 characters but is less than 300 characters. This sentence is just to add more text to ensure we pass the 100 character threshold. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly.";

		cy.mount(
			<List>
				<ListItemStandard id="wrapping-item" wrappingType="Normal" text={longText}></ListItemStandard>
				<ListItemGroup id="lig" wrapping-type="Normal" header-text={longText}>
					<ListItemStandard>1. Bulgaria</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		// Check that ExpandableText is created with maxCharacters prop of 300
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.first()
			.invoke('prop', 'maxCharacters')
			.should('eq', 300);

		cy.get("#lig")
			.shadow()
			.find("ui5-li-group-header")
			.shadow()
			.find("ui5-expandable-text")
			.invoke('prop', 'maxCharacters')
			.should('eq', 300);
	});

	it("should render different nodes based on wrappingType prop", () => {
		const longText = "This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. This is a very long text that should be wrapped when the wrapping prop is enabled, and truncated when it's disabled. And now we're adding even more text to be extra certain that we have enough content to demonstrate the behavior properly.";

		// First render with wrapping enabled
		cy.mount(
			<List>
				<ListItemStandard id="wrapping-item" wrappingType="Normal" text={longText}></ListItemStandard>
			</List>
		);

		// Check that wrapping-type attribute is set to Normal
		cy.get("#wrapping-item")
			.should("have.attr", "wrapping-type", "Normal");

		// Should have expandable text component when wrapping is enabled
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.should("exist");

		// Set wrappingType to None
		cy.get("#wrapping-item")
			.then($el => {
				$el[0].setAttribute("wrapping-type", "None");
			});

		// Check that wrapping-type attribute is set to None
		cy.get("#wrapping-item")
			.should("have.attr", "wrapping-type", "None");

		// Should not have expandable text component when wrapping is disabled
		cy.get("#wrapping-item")
			.shadow()
			.find("ui5-expandable-text")
			.should("not.exist");
	});
});

describe("List - getFocusDomRef Method", () => {
	it("should return undefined when the list is empty", () => {
		cy.mount(<List></List>);

		cy.get<List>("[ui5-list]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<List>
				<ListItemStandard id="item1">Item 1</ListItemStandard>
				<ListItemStandard>Item 2</ListItemStandard>
				<ListItemStandard>Item 3</ListItemStandard>
			</List>
		);

		cy.get<UI5Element>("[ui5-list], #item1")
			.then(($el) => {
				const list = $el[0];
				const item = $el[1];

				expect(list.getFocusDomRef()).to.equal(item.getFocusDomRef());
			});
	});

	it("should return last focused item in the list", () => {
		cy.mount(
			<List>
				<ListItemStandard>Item 1</ListItemStandard>
				<ListItemStandard id="item2">Item 2</ListItemStandard>
				<ListItemStandard>Item 3</ListItemStandard>
			</List>
		);

		cy.get("#item2").click();
		cy.get("#item2").should("be.focused");

		cy.get<UI5Element>("[ui5-list], #item2")
			.then(($el) => {
				const list = $el[0];
				const item = $el[1];

				expect(list.getFocusDomRef()).to.equal(item.getFocusDomRef());
			});
	});
});

describe("List Tests", () => {
	it("List is rendered", () => {
		cy.mount(
			<List growing="Scroll">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>DVD set</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>Last Item</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-root")
			.should("exist");

		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-loading-row")
			.should("not.exist");
	});

	it("itemClick and selectionChange events are fired in Single selection", () => {
		cy.mount(
			<div>
				<List selectionMode="SingleEnd">
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemStandard selected>Bulgaria</ListItemStandard>
					<ListItemStandard>China</ListItemStandard>
					<ListItemStandard type="Inactive">Portugal</ListItemStandard>
				</List>
				<input placeholder="itemClick result" />
				<input placeholder="selectionChange result" />
				<input placeholder="selectionComponentPressed result" />
			</div>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			$list[0].addEventListener("ui5-item-click", cy.stub().as("itemClickStub"));
			$list[0].addEventListener("ui5-selection-change", cy.stub().as("selectionChangeStub"));
		});
	
		cy.get("[ui5-li]").first().click();
	
		cy.get("@itemClickStub").should("have.been.calledOnce");
		cy.get("@selectionChangeStub").should("have.been.calledOnce");
	
		cy.get("[ui5-li]").eq(1)
			.shadow()
			.find("ui5-radio-button")
			.click();
	
		cy.get("@itemClickStub").should("have.been.calledOnce");
		cy.get("@selectionChangeStub").should("have.been.calledTwice");
		cy.get("@selectionChangeStub").should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("selectionComponentPressed", true)));
	});

	it("itemClick and selectionChange events are fired in Multi selection", () => {
		cy.mount(
			<div>
				<List selectionMode="Multiple">
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemStandard selected>Bulgaria</ListItemStandard>
					<ListItemStandard>China</ListItemStandard>
					<ListItemStandard>Portugal</ListItemStandard>
				</List>
				<input placeholder="itemClick result" />
				<input placeholder="selectionChange result" />
			</div>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			$list[0].addEventListener("ui5-item-click", cy.stub().as("itemClickStub"));
			$list[0].addEventListener("ui5-selection-change", cy.stub().as("selectionChangeStub"));
		});
	
		cy.get("[ui5-li]").first().click();
	
		cy.get("@itemClickStub").should("have.been.calledOnce");
		cy.get("@selectionChangeStub").should("have.been.calledOnce");
	});

	it("selectionChange events provides previousSelection item", () => {
		cy.mount(
			<div>
				<List selectionMode="SingleEnd">
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemStandard selected>Bulgaria</ListItemStandard>
					<ListItemStandard>China</ListItemStandard>
					<ListItemStandard type="Inactive">Portugal</ListItemStandard>
				</List>
				<input placeholder="selectionChange previousSelection result" />
			</div>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			$list[0].addEventListener("ui5-selection-change", cy.stub().as("selectionChangeStub"));
		});
	
		cy.get("[ui5-li]").first().click();
	
		cy.get("@selectionChangeStub").should("have.been.calledOnce");
		cy.get("@selectionChangeStub").should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("previouslySelectedItems")));
		cy.get("[ui5-li]").eq(1).should("exist");
	});

	it("selection is reverted if selectionChange event is prevented and the selectionMode is Single", () => {
		cy.mount(
			<List selectionMode="Single" headerText="Prevent ui5-selection-change on Single">
				<ListItemStandard>Argentina</ListItemStandard>
				<ListItemStandard>Bulgaria</ListItemStandard>
				<ListItemStandard selected>China</ListItemStandard>
			</List>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			const stub = cy.stub().as("selectionChangeStub");
			stub.callsFake((event) => {
				event.preventDefault();
			});
			$list[0].addEventListener("ui5-selection-change", stub);
		});
	
		cy.get("[ui5-li]").eq(2).should("have.attr", "selected");
	
		cy.get("[ui5-li]").first().click();
	
		cy.get("@selectionChangeStub").should("have.been.calledOnce");
		cy.get("[ui5-li]").first().should("not.have.attr", "selected");
		cy.get("[ui5-li]").eq(2).should("have.attr", "selected");
	});

	it("selection is reverted if selectionChange event is prevented and the selectionMode is Multiple", () => {
		cy.mount(
			<List selectionMode="Multiple" headerText="Prevent ui5-selection-change on Multiple">
				<ListItemStandard>Argentina</ListItemStandard>
				<ListItemStandard selected>Bulgaria</ListItemStandard>
				<ListItemStandard selected>China</ListItemStandard>
			</List>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			const stub = cy.stub().as("selectionChangeStub");
			stub.callsFake((event) => {
				event.preventDefault();
			});
			$list[0].addEventListener("ui5-selection-change", stub);
		});
	
		cy.get("[ui5-li]").first().should("not.have.attr", "selected");
		cy.get("[ui5-li]").eq(1).should("have.attr", "selected");
		cy.get("[ui5-li]").eq(2).should("have.attr", "selected");
	
		cy.get("[ui5-li]").first().click();
	
		cy.get("@selectionChangeStub").should("have.been.calledOnce");
		cy.get("[ui5-li]").first().should("not.have.attr", "selected");
		cy.get("[ui5-li]").eq(1).should("have.attr", "selected");
		cy.get("[ui5-li]").eq(2).should("have.attr", "selected");
	});

	it("No data text is shown", () => {
		cy.mount(
			<List
				headerText="API: noDataText"
				separators="None"
				noDataText="No Data Available"
			>
			</List>
		);

		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-nodata-text")
			.should("exist");
	});

	it("Tests header text", () => {
		cy.mount(
			<List headerText="API: ListItemGroupHeader">
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Laptop HP</ListItemStandard>
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>IPhone 3</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Discounted Items">
					<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-header")
			.should("exist")
			.should("have.class", "ui5-list-header")
			.should("contain.text", "API: ListItemGroupHeader");
	});

	it("Tests header slot", () => {
		cy.mount(
			<List
				selectionMode="Multiple"
				headerText="Text when no header provided"
				footerText="Copyright"
				noDataText="No data"
			>
				<div slot="header">
					<Title>List Title Here</Title>
				</div>
			</List>
		);

		cy.get("[ui5-list]")
			.shadow()
			.find("slot[name='header']")
			.should("exist");

		cy.get("[ui5-title]")
			.should("exist")
			.should("contain.text", "List Title Here");
	});

	it("Test default slot", () => {
		cy.mount(
			<List selectionMode="Single">
				<ListItemStandard>Option #1</ListItemStandard>
				<ListItemStandard>Option #2</ListItemStandard>
				<ListItemStandard>Option #3</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.should("have.length", 3);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("contain.text", "Option #1");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.last()
			.should("contain.text", "Option #3");
	});

	it("Tests rendering of image slot with avatar", () => {
		cy.mount(
			<List>
				<ListItemStandard>
					Avatar inside image slot
					<Avatar slot="image">
						<img src="./img/woman_avatar_5.png" alt="Woman image" />
					</Avatar>
				</ListItemStandard>
			</List>
		);

		cy.get("[ui5-li]")
			.shadow()
			.find("slot[name='image']")
			.should("exist");

		cy.get("[ui5-avatar]")
			.should("exist");
	});

	it("Tests rendering of image slot with img", () => {
		cy.mount(
			<List>
				<ListItemStandard>
					Img tag inside image slot
					<img slot="image" src="./img/woman_avatar_5.png" alt="Woman image" />
				</ListItemStandard>
			</List>
		);

		cy.get("[ui5-li]")
			.shadow()
			.find("slot[name='image']")
			.should("exist");

		cy.get("[ui5-li]")
			.find("img[slot='image']")
			.should("exist")
			.should("have.attr", "src", "./img/woman_avatar_5.png");
	});

	it("Clicking on inactive items does not change single selection", () => {
		cy.mount(
			<List headerText="API: ListItem type='Inactive'" selectionMode="SingleStart">
				<ListItemStandard type="Inactive">Inactive item</ListItemStandard>
				<ListItemStandard type="Inactive">Inactive item</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.last()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("not.have.attr", "selected");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.last()
			.should("not.have.attr", "selected");
	});

	it("Clicking on inactive items does not change multi selection", () => {
		cy.mount(
			<List selectionMode="Multiple">
				<ListItemStandard type="Inactive">Option #1</ListItemStandard>
				<ListItemStandard type="Inactive">Option #2</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.last()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("not.have.attr", "selected");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.last()
			.should("not.have.attr", "selected");
	});

	it("selectionMode: none. clicking item does not select it", () => {
		cy.mount(
			<List headerText="API: ListItemGroupHeader">
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Laptop HP</ListItemStandard>
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>IPhone 3</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Discounted Items">
					<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.get("[ui5-list]")
			.should("have.prop", "selectionMode", "None");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("not.have.attr", "selected");
	});

	it("selectionMode: Single. clicking item selects it", () => {
		cy.mount(
			<List selectionMode="Single" headerText="API: ListItemGroupHeader">
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Laptop HP</ListItemStandard>
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>IPhone 3</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Discounted Items">
					<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("have.attr", "selected");
	});

	it("selectionMode: single. clicking another item deselects the first", () => {
		cy.mount(
			<List selectionMode="Single" headerText="API: ListItemGroupHeader">
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Laptop HP</ListItemStandard>
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>IPhone 3</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Discounted Items">
					<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.should("have.attr", "selected");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("not.have.attr", "selected");
	});

	it("selectionMode: Multiple. clicking every item selects it independently from the other items", () => {
		cy.mount(
			<List selectionMode="Multiple" headerText="API: ListItemGroupHeader">
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Laptop HP</ListItemStandard>
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>IPhone 3</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Discounted Items">
					<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("have.attr", "selected");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.should("have.attr", "selected");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("have.attr", "selected");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.should("not.have.attr", "selected");
	});

	it("selectionMode: delete. items have X buttons which delete them", () => {
		cy.mount(
			<div>
				<List selectionMode="Delete" headerText="API: ListItemGroupHeader">
					<ListItemGroup headerText="New Items">
						<ListItemStandard>Laptop HP</ListItemStandard>
						<ListItemStandard>Laptop Lenovo</ListItemStandard>
						<ListItemStandard>IPhone 3</ListItemStandard>
					</ListItemGroup>
					<ListItemGroup headerText="Discounted Items">
						<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
						<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
						<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
					</ListItemGroup>
				</List>
				<label>0</label>
			</div>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			$list[0].addEventListener("ui5-item-delete", cy.stub().as("itemDeleteStub"));
		});
	
		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();
	
		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("not.have.attr", "selected");
	
		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.shadow()
			.find("ui5-button")
			.should("exist");
	
		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.shadow()
			.find("ui5-button")
			.click();
	
		cy.get("@itemDeleteStub").should("have.been.calledOnce");
		cy.get("@itemDeleteStub").should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("selectionMode: delete. DELETE key press - deletes item", () => {
		cy.mount(
			<div>
				<List selectionMode="Delete" headerText="API: ListItemGroupHeader">
					<ListItemGroup headerText="New Items">
						<ListItemStandard>Laptop HP</ListItemStandard>
						<ListItemStandard>Laptop Lenovo</ListItemStandard>
						<ListItemStandard>IPhone 3</ListItemStandard>
					</ListItemGroup>
					<ListItemGroup headerText="Discounted Items">
						<ListItemStandard icon="navigation-right-arrow">HP Monitor 24</ListItemStandard>
						<ListItemStandard icon="navigation-right-arrow">Audio cabel</ListItemStandard>
						<ListItemStandard icon="navigation-right-arrow">DVD set</ListItemStandard>
					</ListItemGroup>
				</List>
				<label>0</label>
			</div>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			$list[0].addEventListener("ui5-item-delete", cy.stub().as("itemDeleteStub"));
		});
	
		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();
	
		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should("not.have.attr", "selected");
	
		cy.realPress("Delete");
	
		cy.get("@itemDeleteStub").should("have.been.calledOnce");
		cy.get("@itemDeleteStub").should("have.been.calledWith", Cypress.sinon.match.has("detail", Cypress.sinon.match.has("item")));
	});

	it("item size and classes, when an item has both text and description", () => {
		const EXPECTED_HEIGHT = 80;

		cy.mount(
			<List>
				<ListItemStandard description="2GB RAM, Intel i7 4.5 GHz">
					Laptop HP
					<Avatar slot="image" shape="Square">
						<img src="./img/HT-1000.jpg" alt="Woman image" />
					</Avatar>
				</ListItemStandard>
				<ListItemStandard description="2GB RAM, Intel i7 4.5 GHz">
					Audio cabel
					<Avatar slot="image" shape="Square">
						<img src="./img/HT-2026.jpg" alt="Woman image" />
					</Avatar>
				</ListItemStandard>
				<ListItemStandard description="2GB RAM, Intel i7 4.5 GHz">
					DVD set
					<Avatar slot="image" shape="Square">
						<img src="./img/HT-2002.jpg" alt="Woman image" />
					</Avatar>
				</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.should(($item) => {
				const height = $item.height();
				expect(height).to.be.closeTo(EXPECTED_HEIGHT, 2);
			});
	});

	it("keyboard handling on SHIFT + TAB", () => {
		cy.mount(
			<div>
				<button>Before button</button>
				<List growing="Button">
					<div slot="header">
						<Button design="Positive">Export</Button>
					</div>
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemCustom selected>
						<button>Click me</button>
						<a href="https://www.google.bg" target="_blank">UI5 link</a>
						<button disabled>Disabled</button>
						<input type="radio" name="option" />
					</ListItemCustom>
					<ListItemStandard>China</ListItemStandard>
					<ListItemCustom selected>
						<input type="radio" name="option2" disabled />
					</ListItemCustom>
				</List>
				<button>After button</button>
			</div>
		);

		cy.get("button").last().click();
		cy.get("button").last().should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.get("[ui5-list]")
			.shadow()
			.find('[id$="growing-btn"]')
			.should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.get("[ui5-li]").first().should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.get("[ui5-button]").should("be.focused");

		cy.realPress(["Shift", "Tab"]);
		cy.get("button").first().should("be.focused");
	});

	it("keyboard handling on TAB", () => {
		cy.mount(
			<div>
				<button>Before button</button>
				<List growing="Button">
					<div slot="header">
						<Button design="Positive">Export</Button>
					</div>
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemCustom selected>
						<button>Click me</button>
						<a href="https://www.google.bg" target="_blank">UI5 link</a>
						<button disabled>Disabled</button>
						<input type="radio" name="option" />
					</ListItemCustom>
					<ListItemStandard>China</ListItemStandard>
					<ListItemCustom selected>
						<input type="radio" name="option2" disabled />
					</ListItemCustom>
				</List>
				<button>After button</button>
			</div>
		);

		cy.get("button").first().click();
		cy.get("button").first().should("be.focused");

		cy.realPress("Tab");
		cy.get("[ui5-button]").should("be.focused");

		cy.realPress("Tab");
		cy.get("[ui5-li]").first().should("be.focused");

		cy.get("[ui5-li-custom]").first().click();
		cy.get("[ui5-li-custom]").first().should("be.focused");

		cy.realPress("Tab");
		cy.get("[ui5-li-custom]").first().find("button").first().should("be.focused");

		cy.realPress("Tab");
		cy.get("[ui5-li-custom]").first().find("a").should("be.focused");

		cy.realPress("Tab");
		cy.get("[ui5-li-custom]").first().find("input[type='radio']").should("be.focused");

		cy.get("[ui5-li]").first().click();
		cy.realPress("Tab");
		cy.get("[ui5-list]")
			.shadow()
			.find('[id$="growing-btn"]')
			.should("be.focused");

		cy.realPress("Tab");
		cy.get("button").last().should("be.focused");
	});

	it("keyboard handling on F2", () => {
		cy.mount(
			<div>
				<button>Before button</button>
				<List growing="Button">
					<div slot="header">
						<Button design="Positive">Export</Button>
					</div>
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemCustom selected>
						<button>Click me</button>
						<a href="https://www.google.bg" target="_blank">UI5 link</a>
						<button disabled>Disabled</button>
						<input type="radio" name="option" />
					</ListItemCustom>
					<ListItemStandard>China</ListItemStandard>
					<ListItemCustom selected>
						<input type="radio" name="option2" disabled />
					</ListItemCustom>
				</List>
				<button>After button</button>
			</div>
		);

		cy.get("[ui5-li-custom]").first().click();
		cy.get("[ui5-li-custom]").first().should("be.focused");

		cy.realPress("F2");
		cy.get("[ui5-li-custom]").first().find("button").first().should("be.focused");

		cy.realPress("F2");
		cy.get("[ui5-li-custom]").first().should("be.focused");
	});

	it("keyboard handling on F7", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>First</Button>
					<Button>Second</Button>
				</ListItemCustom>
			</List>
		);

		cy.get("[ui5-li-custom]").realClick();
		cy.get("[ui5-li-custom]").should("be.focused");

		// F7 goes to first focusable element
		cy.realPress("F7");
		cy.get("[ui5-button]").first().should("be.focused");

		// Tab to second button
		cy.realPress("Tab");
		cy.get("[ui5-button]").last().should("be.focused");

		// F7 returns to list item
		cy.realPress("F7");
		cy.get("[ui5-li-custom]").should("be.focused");

		// F7 remembers last focused element (second button)
		cy.realPress("F7");
		cy.get("[ui5-button]").last().should("be.focused");
	});

	it("keyboard handling on F7 after TAB navigation", () => {
		cy.mount(
			<div>
				<button>Before</button>
				<List>
					<ListItemCustom>
						<Button>First</Button>
						<Button>Second</Button>
					</ListItemCustom>
				</List>
			</div>
		);

		cy.get("button").realClick();
		cy.get("button").should("be.focused");

		// Tab into list item
		cy.realPress("Tab");
		cy.get("[ui5-li-custom]").should("be.focused");

		// Tab into internal elements (goes to first button)
		cy.realPress("Tab");
		cy.get("[ui5-button]").first().should("be.focused");

		// Tab to second button
		cy.realPress("Tab");
		cy.get("[ui5-button]").last().should("be.focused");

		// F7 should store current element and return to list item
		cy.realPress("F7");
		cy.get("[ui5-li-custom]").should("be.focused");

		// F7 should remember the second button (not go to first)
		cy.realPress("F7");
		cy.get("[ui5-button]").last().should("be.focused");
	});

	it("keyboard handling on F7 maintains focus position across list items", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>Item 1 - First</Button>
					<Button>Item 1 - Second</Button>
					<Button>Item 1 - Third</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Item 2 - First</Button>
					<Button>Item 2 - Second</Button>
					<Button>Item 2 - Third</Button>
				</ListItemCustom>
			</List>
		);

		// Focus first list item
		cy.get("[ui5-li-custom]").first().realClick();
		cy.get("[ui5-li-custom]").first().should("be.focused");

		// F7 to enter (should go to first button)
		cy.realPress("F7");
		cy.get("[ui5-button]").eq(0).should("be.focused");

		// Tab to second button
		cy.realPress("Tab");
		cy.get("[ui5-button]").eq(1).should("be.focused");

		// F7 to exit back to list item
		cy.realPress("F7");
		cy.get("[ui5-li-custom]").first().should("be.focused");

		// Navigate to second list item with ArrowDown
		cy.realPress("ArrowDown");
		cy.get("[ui5-li-custom]").last().should("be.focused");

		// F7 should focus the second button (same index as previous item)
		cy.realPress("F7");
		cy.get("[ui5-button]").eq(4).should("be.focused").and("contain", "Item 2 - Second");
	});

	it("arrow down navigates to same-index element in next custom item", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>Item 1 - First</Button>
					<Button>Item 1 - Second</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Item 2 - First</Button>
					<Button>Item 2 - Second</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Item 3 - First</Button>
					<Button>Item 3 - Second</Button>
				</ListItemCustom>
			</List>
		);

		// Focus first button in first item
		cy.get("[ui5-button]").first().realClick();
		cy.get("[ui5-button]").first().should("be.focused");

		// Arrow down should move to first button in second item
		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").eq(2).should("be.focused").and("contain", "Item 2 - First");

		// Arrow down again should move to first button in third item
		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").eq(4).should("be.focused").and("contain", "Item 3 - First");
	});

	it("arrow up navigates to same-index element in previous custom item", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>Item 1 - First</Button>
					<Button>Item 1 - Second</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Item 2 - First</Button>
					<Button>Item 2 - Second</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Item 3 - First</Button>
					<Button>Item 3 - Second</Button>
				</ListItemCustom>
			</List>
		);

		// Focus second button in last item
		cy.get("[ui5-button]").eq(5).realClick();
		cy.get("[ui5-button]").eq(5).should("be.focused");

		// Arrow up should move to second button in second item
		cy.realPress("ArrowUp");
		cy.get("[ui5-button]").eq(3).should("be.focused").and("contain", "Item 2 - Second");

		// Arrow up again should move to second button in first item
		cy.realPress("ArrowUp");
		cy.get("[ui5-button]").eq(1).should("be.focused").and("contain", "Item 1 - Second");
	});

	it("arrow navigation skips standard list items", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>Custom 1</Button>
				</ListItemCustom>
				<ListItemStandard>Standard Item</ListItemStandard>
				<ListItemStandard>Another Standard</ListItemStandard>
				<ListItemCustom>
					<Button>Custom 2</Button>
				</ListItemCustom>
			</List>
		);

		// Focus button in first custom item
		cy.get("[ui5-button]").first().realClick();
		cy.get("[ui5-button]").first().should("be.focused");

		// Arrow down should skip standard items and focus button in second custom item
		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").last().should("be.focused").and("contain", "Custom 2");

		// Arrow up should skip standard items and return to first custom item
		cy.realPress("ArrowUp");
		cy.get("[ui5-button]").first().should("be.focused").and("contain", "Custom 1");
	});

	it("arrow navigation works across groups", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>Before Group</Button>
				</ListItemCustom>
				<ListItemGroup headerText="Group 1">
					<ListItemCustom>
						<Button>In Group 1</Button>
					</ListItemCustom>
				</ListItemGroup>
				<ListItemGroup headerText="Group 2">
					<ListItemCustom>
						<Button>In Group 2</Button>
					</ListItemCustom>
				</ListItemGroup>
				<ListItemCustom>
					<Button>After Group</Button>
				</ListItemCustom>
			</List>
		);

		// Focus button before groups
		cy.get("[ui5-button]").first().realClick();

		// Navigate down through groups
		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").eq(1).should("be.focused").and("contain", "In Group 1");

		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").eq(2).should("be.focused").and("contain", "In Group 2");

		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").last().should("be.focused").and("contain", "After Group");
	});

	it("arrow navigation handles items with different element counts", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>Item 1 - A</Button>
					<Button>Item 1 - B</Button>
					<Button>Item 1 - C</Button>
					<Button>Item 1 - D</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Item 2 - A</Button>
					<Button>Item 2 - B</Button>
				</ListItemCustom>
			</List>
		);

		// Focus fourth button (index 3) in first item
		cy.get("[ui5-button]").eq(3).realClick();
		cy.get("[ui5-button]").eq(3).should("be.focused");

		// Arrow down should focus last button in second item (index clamped to 1)
		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").eq(5).should("be.focused").and("contain", "Item 2 - B");
	});

	it("arrow navigation does nothing at list boundaries", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<Button>First Item</Button>
				</ListItemCustom>
				<ListItemCustom>
					<Button>Last Item</Button>
				</ListItemCustom>
			</List>
		);

		// Focus first button
		cy.get("[ui5-button]").first().realClick();

		// Arrow up should do nothing (at top boundary)
		cy.realPress("ArrowUp");
		cy.get("[ui5-button]").first().should("be.focused");

		// Focus last button
		cy.get("[ui5-button]").last().realClick();

		// Arrow down should do nothing (at bottom boundary)
		cy.realPress("ArrowDown");
		cy.get("[ui5-button]").last().should("be.focused");
	});

	it("keyboard handling on TAB when 2 level nested UI5Element is focused", () => {
		cy.mount(
			<div>
				<List>
					<ListItemStandard>Test</ListItemStandard>
					<ListItemStandard>
						<div style={{ maxWidth: "20px" }}>
							<Breadcrumbs>
								<BreadcrumbsItem href="#">Link1</BreadcrumbsItem>
								<BreadcrumbsItem>Location</BreadcrumbsItem>
							</Breadcrumbs>
						</div>
					</ListItemStandard>
				</List>
				<Button>After button</Button>
			</div>
		);

		cy.get("[ui5-li]").eq(1).click();
		cy.get("[ui5-li]").eq(1).should("be.focused");

		cy.realPress("Tab");
		cy.get("ui5-breadcrumbs").should("be.focused");

		cy.realPress("Tab");
		cy.get("[ui5-button]").should("be.focused");
	});

	it("does not focus next / prev item when right / left arrow is pressed", () => {
		cy.mount(
			<List selectionMode="SingleEnd">
				<ListItemStandard>Argentina</ListItemStandard>
				<ListItemStandard selected>Bulgaria</ListItemStandard>
				<ListItemStandard>China</ListItemStandard>
				<ListItemStandard type="Inactive">Portugal</ListItemStandard>
			</List>
		);

		cy.get("[ui5-li]").first().click();

		cy.realPress("ArrowRight");

		cy.get("[ui5-li]").first().should("be.focused");
		cy.get("[ui5-li]").eq(1).should("not.be.focused");

		cy.realPress("ArrowLeft");

		cy.get("[ui5-li]").first().should("be.focused");
	});

	it("detailPress event is fired", () => {
		cy.mount(
			<div>
				<span>0</span>
				<List headerText="API: ListItem type='Detail'">
					<ListItemStandard type="Detail">Detail item</ListItemStandard>
					<ListItemStandard>Normal item</ListItemStandard>
				</List>
			</div>
		);
	
		cy.get("[ui5-li]").first().then(($item) => {
			$item[0].addEventListener("ui5-detail-click", cy.stub().as("detailClickStub"));
		});
	
		cy.get("[ui5-li]").first()
			.shadow()
			.find(".ui5-li-detailbtn")
			.click();
	
		cy.get("@detailClickStub").should("have.been.calledOnce");
	});

	it("tests aria-labelledby", () => {
		cy.mount(
			<div>
				<List headerText="Test aria">
					<ListItemStandard>item</ListItemStandard>
					<ListItemStandard>item</ListItemStandard>
				</List>

				<List accessibleName="Test aria">
					<div slot="header">
						<h2>Test aria</h2>
					</div>
					<ListItemStandard>item</ListItemStandard>
					<ListItemStandard>item</ListItemStandard>
				</List>
			</div>
		);

		cy.get("[ui5-list]").first().then(($list) => {
			const listId = ($list[0] as any)._id;

			cy.get("[ui5-list]").first()
				.shadow()
				.find(".ui5-list-ul")
				.should("not.have.attr", "aria-label");

			cy.get("[ui5-list]").first()
				.shadow()
				.find(".ui5-list-ul")
				.should("have.attr", "aria-labelledby", `${listId}-header`);
		});

		const EXPECTED_ARIA_LABEL_TXT = "Test aria";

		cy.get("[ui5-list]").eq(1)
			.shadow()
			.find(".ui5-list-ul")
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL_TXT);

		cy.get("[ui5-list]").eq(1)
			.shadow()
			.find(".ui5-list-ul")
			.should("not.have.attr", "aria-labelledby");
	});

	it("tests aria-labelledby for mode label", () => {
		cy.mount(
			<div>
				<List>
					<ListItemStandard>Argentina</ListItemStandard>
				</List>
				<List selectionMode="Delete">
					<ListItemStandard>Argentina</ListItemStandard>
				</List>
				<List selectionMode="Delete">
				</List>
				<List selectionMode="Multiple">
					<ListItemStandard>Argentina</ListItemStandard>
				</List>
				<List selectionMode="Single">
					<ListItemStandard>Argentina</ListItemStandard>
				</List>
			</div>
		);

		cy.get("[ui5-list]").first()
			.should("have.prop", "ariaLabelModeText", "");

		cy.get("[ui5-list]").eq(2)
			.should("have.prop", "ariaLabelModeText", "");

		cy.get("[ui5-list]").eq(1)
			.should(($list) => {
				const ariaText = $list.prop("ariaLabelModeText");
				expect(ariaText).to.include("Deletable");
			});

		cy.get("[ui5-list]").eq(3)
			.should(($list) => {
				const ariaText = $list.prop("ariaLabelModeText");
				expect(ariaText).to.include("Multi");
			});

		cy.get("[ui5-list]").eq(4)
			.should(($list) => {
				const ariaText = $list.prop("ariaLabelModeText");
				expect(ariaText).to.include("Selectable");
			});
	});

	it("tests aria-setsize and aria-posinset attributes", () => {
		cy.mount(
			<List growing="Scroll">
				<ListItemGroup headerText="New Items">
					<ListItemStandard icon="navigation-right-arrow" additionalText="Available">
						Voluptate do eu cupidatat elit est culpa.
					</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow" additionalText="Re-stock" description="#12331232131" additionalTextState="Negative">
						Laptop Lenovo
					</ListItemStandard>
					<ListItemStandard icon="navigation-right-arrow" additionalText="Re-stock" description="#12331232131" additionalTextState="Information">
						IPhone 3
					</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Discounted Items">
					<ListItemStandard iconEnd icon="navigation-right-arrow" description="#12331232131" additionalText="Required" additionalTextState="Negative">
						HP Monitor 24
					</ListItemStandard>
					<ListItemStandard iconEnd icon="navigation-right-arrow" description="#12331232131" additionalText="Available" additionalTextState="Positive">
						Audio cabel
					</ListItemStandard>
					<ListItemStandard iconEnd icon="navigation-right-arrow" additionalText="Required" additionalTextState="Critical">
						DVD set
					</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-li]").eq(2).then(($item) => {
			($item[0] as any).accessibilityAttributes = {
				ariaSetsize: 200,
				ariaPosinset: 3,
			};
		});

		cy.get("[ui5-li]").eq(2)
			.shadow()
			.find("li")
			.should("have.attr", "aria-setsize", "200")
			.should("have.attr", "aria-posinset", "3");
	});

	it("tests title is updated, when initially empty", () => {
		cy.mount(
			<div>
				<List>
					<ListItemStandard></ListItemStandard>
					<ListItemStandard>IPhone 3</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
				</List>
				<Button>Change empty item text</Button>
			</div>
		);
	
		const NEW_TEXT = "updated";
	
		cy.get("[ui5-li]").first()
			.should("have.prop", "innerHTML", "");
	
		cy.get("[ui5-li]").first()
			.shadow()
			.find("slot")
			.should(($slot) => {
				const assignedNodes = ($slot[0] as any).assignedNodes();
				expect(assignedNodes.length).to.equal(0);
			});
	
		cy.get("[ui5-button]").then(($btn) => {
			const stub = cy.stub().as("buttonClickStub");
			stub.callsFake(() => {
				const emptyItem = document.querySelector("ui5-li");
				if (emptyItem) {
					emptyItem.textContent = NEW_TEXT;
				}
			});
			$btn[0].addEventListener("click", stub);
		});
	
		cy.get("[ui5-button]").click();
	
		cy.get("@buttonClickStub").should("have.been.calledOnce");
		cy.get("[ui5-li]").first()
			.should("have.prop", "innerHTML", NEW_TEXT);
	
		cy.get("[ui5-li]").first()
			.shadow()
			.find("slot")
			.should(($slot) => {
				const assignedNodes = ($slot[0] as any).assignedNodes();
				expect(assignedNodes.length).to.equal(1);
			});
	});

	it("tests the prevention of the ui5-itemClick event", () => {
		cy.mount(
			<div>
				<List selectionMode="Single">
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemStandard selected>Bulgaria</ListItemStandard>
				</List>
				<input placeholder="itemClick prevented result" />
			</div>
		);
	
		cy.get("[ui5-list]").then(($list) => {
			const stub = cy.stub().as("itemClickStub");
			stub.callsFake((event) => {
				event.preventDefault();
			});
			$list[0].addEventListener("ui5-item-click", stub);
		});
	
		cy.get("[ui5-li]").first().click();
	
		cy.get("@itemClickStub").should("have.been.calledOnce");
		cy.get("[ui5-li]").first().should("not.have.attr", "selected");
	});

	it("Popover with List opens without errors", () => {
		cy.mount(
			<div>
				<Button>Open popup with List</Button>
				<ResponsivePopover placement="Bottom">
					<List>
						<div slot="header">
							<Button icon="refresh"></Button>
						</div>
					</List>
					<List growing="Scroll" noDataText="No data">
						<ListItemStandard>Test</ListItemStandard>
					</List>
				</ResponsivePopover>
			</div>
		);

		cy.get("[ui5-button]").first().then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const popup = document.querySelector("ui5-responsive-popover") as any;
				popup.opener = $btn[0];
				popup.open = true;
			});
		});

		cy.get("[ui5-button]").first().click();

		cy.get("[ui5-button]").eq(1)
			.should("be.focused");
	});

	it("focusable list-items are correctly disabled", () => {
		cy.mount(
			<List>
				<ListItemStandard>Laptop HP</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>DVD set</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.click();

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.invoke("prop", "disabled", true);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.shadow()
			.find("li")
			.should("have.prop", "tabIndex", -1);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.shadow()
			.find("li")
			.should("have.class", "ui5-li-root")
			.should("not.have.class", "ui5-li-focusable");
	});

	it("disabled list-items are skipped on navigation", () => {
		cy.mount(
			<List>
				<ListItemStandard>Laptop HP</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>DVD set</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(1)
			.invoke("prop", "disabled", true);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.click();

		cy.realPress("ArrowDown");

		cy.get("[ui5-list]")
			.find("ui5-li")
			.eq(2)
			.should("be.focused");
	});

	it("should include selected state text", () => {
		cy.mount(
			<div>
				<List>
					<ListItemStandard>Argentina</ListItemStandard>
				</List>
				<List selectionMode="Multiple">
					<ListItemGroup headerText="New Items">
						<ListItemStandard>Argentina</ListItemStandard>
						<ListItemStandard selected>Bulgaria</ListItemStandard>
					</ListItemGroup>
				</List>
			</div>
		);

		cy.get("[ui5-list]").first().find("[ui5-li]").should(($el) => {
			const ariaSelectedText = ($el[0] as any).ariaSelectedText;
			expect(ariaSelectedText).to.be.oneOf([null, undefined, ""]);
		});

		cy.get("[ui5-list]").eq(1).find("[ui5-li]").first().should(($el) => {
			const ariaSelectedText = ($el[0] as any).ariaSelectedText;
			expect(ariaSelectedText).to.equal("Not Selected");
		});

		cy.get("[ui5-list]").eq(1).find("[ui5-li]").eq(1).should(($el) => {
			const ariaSelectedText = ($el[0] as any).ariaSelectedText;
			expect(ariaSelectedText).to.equal("Selected");
		});
	});

	it('group headers should be rendered as LI', () => {
		cy.mount(
			<List selectionMode="Multiple">
				<ListItemGroup headerText="New Items">
					<ListItemStandard>Argentina</ListItemStandard>
					<ListItemStandard selected>Bulgaria</ListItemStandard>
				</ListItemGroup>
			</List>
		);

		cy.get("[ui5-li-group]")
			.shadow()
			.find("div.ui5-group-li-root")
			.should("exist");
	});

	it('anchor tabs should be accessible within list items', () => {
		cy.mount(
			<List>
				<ListItemStandard>
					<a href="https://ui5.github.io/webcomponents/playground/components" target="_blank">
						Link to UI5 Playground
					</a>
				</ListItemStandard>
			</List>
		);

		cy.get("[ui5-li]").click();

		cy.get("[ui5-li]")
			.find("a")
			.should("have.attr", "href", "https://ui5.github.io/webcomponents/playground/components")
			.should("have.attr", "target", "_blank");

		cy.get("[ui5-li]")
			.find("a")
			.should("be.visible");
	});

	it('should not try to fire item-close if a select is closed from custom list item', () => {
		cy.mount(
			<div>
				<List>
					<ListItemCustom>
						<Select>
							<Option>Option 1</Option>
							<Option>Option 2</Option>
							<Option>Option 3</Option>
						</Select>
					</ListItemCustom>
				</List>
				<input value="0" />
			</div>
		);
	
		cy.get("[ui5-select]").then(($select) => {
			const listItem = $select.closest("ui5-li-custom")[0];
			if (listItem) {
				listItem.addEventListener("ui5-item-close", cy.stub().as("itemCloseStub"));
			}
		});
	
		cy.get("[ui5-select]").click();
	
		cy.realPress("Escape");
	
		cy.get("@itemCloseStub").should("not.have.been.called");
	});

	it("List item fires request-tabindex-change event and updates tabindex when inner element receives focus", () => {
		cy.mount(
			<List>
				<ListItemCustom>
					<button>Focus me</button>
					<span>Some text content</span>
				</ListItemCustom>
				<ListItemStandard>Other item</ListItemStandard>
			</List>
		);

		cy.get("[ui5-li-custom]")
			.find("button")
			.click();

		cy.get("[ui5-li-custom]")
			.shadow()
			.find(".ui5-li-root")
			.should("have.attr", "tabindex", "0");
	});

	it("Checks if tooltip property value equals the title of li element", () => {
		cy.mount(
			<List headerText="API: ListItem tooltip">
				<ListItemStandard tooltip="Option #1">Option 1</ListItemStandard>
				<ListItemStandard tooltip="Option #2">Option 2</ListItemStandard>
				<ListItemStandard tooltip="Option #3">Option 3</ListItemStandard>
			</List>
		);

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.as("listItem");

		cy.get("@listItem").should(($el) => {
			const rootTooltip = $el.prop("tooltip");
			expect(rootTooltip).to.equal("Option #1");
		});

		cy.get("@listItem")
			.shadow()
			.find("li")
			.should("have.attr", "title", "Option #1");

		const newTooltip = "Updated tooltip";
		cy.get("@listItem")
			.invoke("prop", "tooltip", newTooltip);

		cy.get("@listItem").should(($el) => {
			const rootTooltip = $el.prop("tooltip");
			expect(rootTooltip).to.equal(newTooltip);
		});

		cy.get("@listItem")
			.shadow()
			.find("li")
			.should("have.attr", "title", newTooltip);
	});

	it("Tests the highlight property", () => {
		cy.mount(
			<List>
				<ListItemStandard highlight="Negative">Laptop HP</ListItemStandard>
				<ListItemStandard highlight="Information">laptop Lenovo</ListItemStandard>
				<ListItemStandard highlight="Positive">IPhone 3</ListItemStandard>
				<ListItemStandard highlight="Critical">DVD set</ListItemStandard>
			</List>
		);

		const initialValueState = "Negative";

		cy.get("[ui5-list]")
			.find("ui5-li")
			.first()
			.as("listItem");

		cy.get("@listItem").should(($el) => {
			const highlightValue = $el.prop("highlight");
			expect(highlightValue).to.equal(initialValueState);
		});

		const newValueState = "Information";
		cy.get("@listItem")
			.invoke("prop", "highlight", newValueState);

		cy.get("@listItem").should(($el) => {
			const highlightValue = $el.prop("highlight");
			expect(highlightValue).to.equal(newValueState);
		});
	});

	it("Tests the growingButtonText property", () => {
		cy.mount(
			<List growing="Button" growingButtonText="Custom text">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>IPhone 3</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>DVD set</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Audio cabel</ListItemStandard>
				<ListItemStandard>Last Item</ListItemStandard>
			</List>
		);

		const btnText = "Custom text";

		cy.get("[ui5-list]").should(($el) => {
			const growingBtnText = $el.prop("growingButtonText");
			expect(growingBtnText).to.equal(btnText);
		});

		const newBtnText = "New custom text";
		cy.get("[ui5-list]")
			.invoke("prop", "growingButtonText", newBtnText);

		cy.get("[ui5-list]").should(($el) => {
			const growingBtnText = $el.prop("growingButtonText");
			expect(growingBtnText).to.equal(newBtnText);
		});
	});
});

describe("List - Drag and Drop", () => {
	const compareItemsOrder = (listSelector, expectedOrder) => {
		return cy.get(listSelector).find("[ui5-li]").then($items => {
			const actualOrder = Array.from($items);
			return expectedOrder.every((expectedEl, index) => {
				const expectedId = typeof expectedEl === 'string' ? expectedEl : expectedEl.id;
				return actualOrder[index] && actualOrder[index].id === expectedId;
			});
		});
	};

	beforeEach(() => {
		cy.mount(
			<div>
				<CheckBox text="Movable items" checked />
				<CheckBox text="Compact density" />

				<section>
					<h2>Drag and drop</h2>
					<List headerText="List 1">
						<ListItemStandard movable>1. Bulgaria</ListItemStandard>
						<ListItemStandard movable>1. Germany</ListItemStandard>
						<ListItemStandard movable>1. Spain</ListItemStandard>
					</List>
				</section>

				<section>
					<List headerText="List 2">
						<ListItemStandard movable>2. Bulgaria</ListItemStandard>
						<ListItemStandard movable data-allows-nesting>2. Germany (Allows nesting)</ListItemStandard>
						<ListItemStandard movable>2. Spain</ListItemStandard>
					</List>
				</section>
			</div>
		);

		cy.get("[ui5-list]").first().then(($list) => {
			const list = $list[0];
			const handleMoveOver = (e) => {
				const { destination, source } = e.detail;
				if (!list.contains(source.element)) return;
				if (destination.placement === "Before" || destination.placement === "After") {
					e.preventDefault();
				}
			};
			const handleMove = (e) => {
				const { destination, source } = e.detail;
				switch (destination.placement) {
					case "Before": destination.element.before(source.element); break;
					case "After": destination.element.after(source.element); break;
					case "On": destination.element.prepend(source.element); break;
				}
			};
			list.addEventListener("ui5-move-over", handleMoveOver);
			list.addEventListener("ui5-move", handleMove);
		});

		cy.get("[ui5-list]").eq(1).then(($list) => {
			const list = $list[0];
			const handleMoveOver = (e) => {
				const { destination, source } = e.detail;
				if (destination.placement === "Before" || destination.placement === "After") {
					e.preventDefault();
				}
				if (destination.placement === "On" && "allowsNesting" in destination.element.dataset) {
					e.preventDefault();
				}
			};
			const handleMove = (e) => {
				const { destination, source } = e.detail;
				switch (destination.placement) {
					case "Before": destination.element.before(source.element); break;
					case "After": destination.element.after(source.element); break;
					case "On": destination.element.prepend(source.element); break;
				}
			};
			list.addEventListener("ui5-move-over", handleMoveOver);
			list.addEventListener("ui5-move", handleMove);
		});
	});

	it("Moving item After another", () => {
		cy.get("[ui5-list]").first().find("[ui5-li]").then($items => {
			const firstItem = $items[0];
			const secondItem = $items[1];
			const thirdItem = $items[2];

			const dataTransfer = new DataTransfer();

			cy.get("[ui5-li]").first()
				.trigger("dragstart", { dataTransfer });

			cy.get("[ui5-li]").eq(1)
				.trigger("dragover", { dataTransfer })
				.trigger("drop", { dataTransfer });

			cy.get("[ui5-li]").first()
				.trigger("dragend", { dataTransfer });

			compareItemsOrder("[ui5-list]", [secondItem, firstItem, thirdItem]).then(isCorrect => {
				expect(isCorrect).to.be.true;
			});

			const dataTransfer2 = new DataTransfer();

			cy.get("[ui5-li]").eq(1)
				.trigger("dragstart", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-li]").eq(2)
				.trigger("dragover", { dataTransfer: dataTransfer2 })
				.trigger("drop", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-li]").eq(1)
				.trigger("dragend", { dataTransfer: dataTransfer2 });

			compareItemsOrder("[ui5-list]", [secondItem, thirdItem, firstItem]).then(isCorrect => {
				expect(isCorrect).to.be.true;
			});
		});
	});

	it("Moving item Before another", () => {
		cy.get("[ui5-list]").first().find("[ui5-li]").then($items => {
			const secondItem = $items[1];
			const thirdItem = $items[2];
			const firstItem = $items[0];

			const dataTransfer = new DataTransfer();

			cy.get("[ui5-li]").first()
				.trigger("dragstart", { dataTransfer });

			cy.get("[ui5-li]").eq(2)
				.trigger("dragover", { dataTransfer })
				.trigger("drop", { dataTransfer });

			cy.get("[ui5-li]").first()
				.trigger("dragend", { dataTransfer });

			compareItemsOrder("[ui5-list]", [secondItem, firstItem, thirdItem]).then(isCorrect => {
				expect(isCorrect).to.be.true;
			});

			const dataTransfer2 = new DataTransfer();

			cy.get("[ui5-li]").eq(1)
				.trigger("dragstart", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-li]").first()
				.trigger("dragover", { dataTransfer: dataTransfer2 })
				.trigger("drop", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-li]").eq(1)
				.trigger("dragend", { dataTransfer: dataTransfer2 });

			compareItemsOrder("[ui5-list]", [firstItem, secondItem, thirdItem]).then(isCorrect => {
				expect(isCorrect).to.be.true;
			});
		});
	});

	it("Moving item ON another", () => {
		cy.get("[ui5-list]").eq(1).find("[ui5-li]").then($items => {
			const firstItem = $items[0];
			const secondItem = $items[1];
			const thirdItem = $items[2];

			const dataTransfer = new DataTransfer();

			cy.get("[ui5-list]").eq(1).find("[ui5-li]").first()
				.trigger("dragstart", { dataTransfer })
				.trigger("dragover", { dataTransfer })
				.trigger("drop", { dataTransfer })
				.trigger("dragend", { dataTransfer });

			compareItemsOrder("[ui5-list]:nth-child(2)", [firstItem, secondItem, thirdItem]).then(isCorrect => {
				expect(isCorrect).to.be.true;
			});

			const dataTransfer2 = new DataTransfer();

			cy.get("[ui5-list]").eq(1).find("[ui5-li]").first()
				.trigger("dragstart", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-list]").eq(1).find("[ui5-li]").eq(1)
				.trigger("dragover", { dataTransfer: dataTransfer2 })
				.trigger("drop", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-list]").eq(1).find("[ui5-li]").first()
				.trigger("dragend", { dataTransfer: dataTransfer2 });

			cy.get("[ui5-list]").eq(1).children("[ui5-li]").then($children => {
				if ($children.length === 2) {
					cy.get("[ui5-list]").eq(1).children("[ui5-li]").should("have.length", 2);
				} else {
					compareItemsOrder("[ui5-list]:nth-child(2)", [firstItem, secondItem, thirdItem]).then(isCorrect => {
						expect(isCorrect).to.be.true;
					});
				}
			});
		});
	});

	it("Moving item from one list to another", () => {
		const dataTransfer = new DataTransfer();

		cy.get("[ui5-list]").eq(1).find("[ui5-li]").first()
			.trigger("dragstart", { dataTransfer });

		cy.get("[ui5-list]").first().find("[ui5-li]").first()
			.trigger("dragover", { dataTransfer })
			.trigger("drop", { dataTransfer });

		cy.get("[ui5-list]").eq(1).find("[ui5-li]").first()
			.trigger("dragend", { dataTransfer });

		cy.get("[ui5-list]").first().find("[ui5-li]").should("have.length.at.least", 3);
		cy.get("[ui5-list]").eq(1).find("[ui5-li]").should("have.length.at.least", 2);
	});
});

describe("List keyboard drag and drop tests", () => {
	beforeEach(() => {
		cy.mount(
			<div>
				<List>
					<ListItemStandard id="bg1" movable>1. Bulgaria</ListItemStandard>
					<ListItemStandard id="de1" movable>1. Germany</ListItemStandard>
					<ListItemStandard id="es1" movable>1. Spain</ListItemStandard>
				</List>
			</div>
		);

		cy.get("[ui5-list]").then(($list) => {
			const list = $list[0];
			
			list.addEventListener("keydown", (e) => {
				if (e.ctrlKey) {
					const focusedItem = document.activeElement as HTMLElement;
					if (!focusedItem || !focusedItem.matches("[ui5-li]")) return;
					
					let targetItem = null;
					
					switch (e.key) {
						case "ArrowRight":
						case "ArrowDown":
							targetItem = focusedItem.nextElementSibling;
							if (targetItem) {
								targetItem.after(focusedItem);
								focusedItem.focus();
							}
							break;
						case "ArrowLeft":
						case "ArrowUp":
							targetItem = focusedItem.previousElementSibling;
							if (targetItem) {
								targetItem.before(focusedItem);
								focusedItem.focus();
							}
							break;
					}
					e.preventDefault();
				}
			});
		});
	});

	it("Moving items with arrow keys", () => {
		cy.get("#bg1").click();

		cy.realPress(["Control", "ArrowRight"]);
		cy.get("#bg1").prev().should("have.id", "de1");

		cy.realPress(["Control", "ArrowDown"]);
		cy.get("#bg1").prev().should("have.id", "es1");

		cy.realPress(["Control", "ArrowLeft"]);
		cy.get("#bg1").prev().should("have.id", "de1");

		cy.realPress(["Control", "ArrowUp"]);
		cy.get("#bg1").prev().should("not.exist");
	});

	it("Moving strip items when there are fixed tabs", () => {
		cy.mount(
			<div>
				<List>
					<ListItemStandard id="item1" movable>item1</ListItemStandard>
					<ListItemStandard id="item2" movable>item2</ListItemStandard>
					<ListItemStandard id="item3" movable>item3</ListItemStandard>
					<ListItemStandard id="item4">item4 (fixed)</ListItemStandard>
					<ListItemStandard id="item5" movable>item5</ListItemStandard>
					<ListItemStandard id="item6" movable>item6</ListItemStandard>
					<ListItemStandard id="item7" movable>item7</ListItemStandard>
					<ListItemStandard id="item8" movable>item8</ListItemStandard>
					<ListItemStandard id="item9" movable>item9</ListItemStandard>
				</List>
			</div>
		);

		cy.get("[ui5-list]").then(($list) => {
			const list = $list[0];
			
			list.addEventListener("keydown", (e) => {
				if (e.ctrlKey) {
					const focusedItem = document.activeElement as HTMLElement;
					if (!focusedItem || !focusedItem.matches("[ui5-li]")) return;
					
					let targetItem = null;
					
					switch (e.key) {
						case "ArrowUp":
							targetItem = focusedItem.previousElementSibling as HTMLElement;
							if (targetItem && !targetItem.hasAttribute("movable")) {
								e.preventDefault();
								return;
							}
							if (targetItem) {
								targetItem.before(focusedItem);
								focusedItem.focus();
							}
							break;
						case "ArrowDown":
							targetItem = focusedItem.nextElementSibling as HTMLElement;
							if (targetItem && !targetItem.hasAttribute("movable")) {
								e.preventDefault();
								return;
							}
							if (targetItem) {
								targetItem.after(focusedItem);
								focusedItem.focus();
							}
							break;
					}
					e.preventDefault();
				}
			});
		});

		cy.get("#item9").click();

		for (let i = 0; i < 20; i++) {
			cy.realPress(["Control", "ArrowUp"]);
		}

		cy.get("#item9").prev().should("have.id", "item4");
	});
});

describe("List sticky header", () => {
	it("sticks default header", () => {
		cy.mount(
			<div id="scrollContainer" style="height: 100px;overflow: auto;">
				<List headerText="Sticky Header" stickyHeader>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</List>
				<div id="bottomSpacer" style={{ height: "1000px" }}></div>
			</div>
		);

		cy.get("#scrollContainer")
			.as("container");

		cy.get("[ui5-list]")
			.shadow()
			.find(".ui5-list-header")
			.as("header");

		cy.get("@header")
			.then(($headerBefore) => {
				const headerTopBefore = $headerBefore[0].getBoundingClientRect().top;
	
				cy.get("@container")
					.scrollTo(0, 50);
	
				cy.get("@header")
					.should(($headerAfter) => {
						const headerTopAfter = $headerAfter[0].getBoundingClientRect().top;
						expect(headerTopAfter).to.eq(headerTopBefore);
					});
			});
	});

	it("sticks custom header", () => {
		cy.mount(
			<div id="scrollContainer" style="height: 100px;overflow: auto;">
				<List stickyHeader>
					<Bar slot="header">
						<Title>Sticky Header Bar</Title>
					</Bar>
					<ListItemStandard>Item 1</ListItemStandard>
					<ListItemStandard>Item 2</ListItemStandard>
					<ListItemStandard>Item 3</ListItemStandard>
				</List>
				<div id="bottomSpacer" style={{ height: "1000px" }}></div>
			</div>
		);

		cy.get("#scrollContainer")
			.as("container");

		cy.get("[ui5-bar]")
			.as("header");

		cy.get("@header")
			.then(($headerBefore) => {
				const headerTopBefore = $headerBefore[0].getBoundingClientRect().top;
	
				cy.get("@container")
					.scrollTo(0, 50);
	
				cy.get("@header")
					.should(($headerAfter) => {
						const headerTopAfter = $headerAfter[0].getBoundingClientRect().top;
						expect(headerTopAfter).to.eq(headerTopBefore);
					});
			});
	});
});