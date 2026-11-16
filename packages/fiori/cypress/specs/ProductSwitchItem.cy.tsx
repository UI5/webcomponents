import ProductSwitchItem from "../../src/ProductSwitchItem.js";

describe("ProductSwitchItem general interaction", () => {
	it("tests rendering", () => {
		cy.mount(
			<ProductSwitchItem 
				titleText="Test Title" 
				subtitleText="Test Subtitle" 
				icon="home"
			></ProductSwitchItem>
		);

		cy.get("[ui5-product-switch-item]")
			.shadow()
			.find(".ui5-product-switch-item-icon")
			.should("exist");

		cy.get("[ui5-product-switch-item]")
			.shadow()
			.find(".ui5-product-switch-item-title")
			.should("exist");

		cy.get("[ui5-product-switch-item]")
			.shadow()
			.find(".ui5-product-switch-item-subtitle")
			.should("exist");
	});
});

describe("ProductSwitchItem ARIA attributes", () => {
	it("items role set correctly", () => {
		cy.mount(
			<ProductSwitchItem titleText="Test Title"></ProductSwitchItem>
		);

		cy.get("[ui5-product-switch-item]")
			.shadow()
			.find(".ui5-product-switch-item-root")
			.should("have.attr", "role", "listitem");
	});
});