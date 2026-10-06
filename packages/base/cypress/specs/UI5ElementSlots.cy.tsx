import Generic from "../../test/test-elements/Generic.js";

describe("Slots work properly", () => {
	it("Tests that properties exist on the element for each slot", () => {
		cy.mount(
			<Generic>
				Default slot text
				<span>Default slot content</span>
				<span slot="other">Other slot content 1</span>
				<span slot="other">Other slot content 2</span>
				<span slot="individual">Individual slot content 1</span>
				<span slot="individual">Individual slot content 2</span>
				<span slot="named">Item in slot with propertyName</span>
				<span slot="named">Item in slot with propertyName</span>
				<span slot="row-header">Item in slot row-header</span>
				<span slot="row-header">Item in slot row-header</span>
			</Generic>
		);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "content")
			.then(value => {
				return (value as Array<unknown>).length;
			})
			.should("be.greaterThan", 0);

		cy.get("@testGeneric")
			.invoke("prop", "other")
			.should("have.length", 2);

		cy.get("@testGeneric")
			.invoke("prop", "individual")
			.should("have.length", 2);

		cy.get("@testGeneric")
			.invoke("prop", "row-header")
			.should("have.length", 2);

		cy.get("@testGeneric")
			.invoke("prop", "named")
			.should("be.undefined");

		cy.get<Generic>("[ui5-test-generic]").should($el => {
			expect($el[0].getSlottedNodes("other")).to.have.length(2);
			expect($el[0].getSlottedNodes("items"), "reads the slot by its property name").to.have.length(2);
			expect($el[0].getSlottedNodes("named"), "unknown property name resolves to an empty array").to.deep.equal([]);
		});
	});

	it("Tests that properties exist on the element for each slot", () => {
		cy.mount(
			<Generic>
				<span slot="individual">Individual slot content 1</span>
				<span slot="individual">Individual slot content 2</span>
			</Generic>
		);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]");

		cy.get("[slot=individual]")
			.should("not.exist");

		cy.get("[slot=individual-1]")
			.should("exist");

		cy.get("[slot=individual-2]")
			.should("exist");
	});

	it("Tests that changing the slot attribute of children redistributes them across slot accessors", () => {
		let defaultSlotLength = 0;

		cy.mount(
			<Generic>
				<span>Default slot content</span>
				<span slot="other" id="o1">Other slot content 1</span>
				<span slot="other" id="o2">Other slot content 2</span>
				<span slot="named">Item in slot with propertyName</span>
				<span slot="named">Item in slot with propertyName</span>
			</Generic>
		);

		cy.get<Generic>("[ui5-test-generic]")
			.should($el => {
				expect($el[0].getDomRef()).to.exist;
			});

		cy.get("[ui5-test-generic]")
			.as("testGeneric");

		cy.get("@testGeneric")
			.invoke("prop", "content")
			.then(value => {
				defaultSlotLength = value.length;

				return defaultSlotLength;
			})
			.should("be.greaterThan", 0);

		cy.get("@testGeneric")
			.invoke("prop", "other")
			.should("have.length", 2);

		cy.get("@testGeneric")
			.invoke("prop", "items")
			.should("have.length", 2);

		cy.get("#o1")
			.invoke("removeAttr", "slot");

		cy.get("#o2")
			.invoke("attr", "slot", "named");

		cy.get("@testGeneric")
			.then($testGeneric => {
				cy.wrap($testGeneric)
					.invoke("prop", "content")
					.should("have.length", defaultSlotLength + 1);
			});

		cy.get("@testGeneric")
			.invoke("prop", "other")
			.should("have.length", 0);

		cy.get("@testGeneric")
			.invoke("prop", "items")
			.should("have.length", 3);
	});
});
