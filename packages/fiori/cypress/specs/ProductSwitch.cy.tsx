import ProductSwitch from "../../src/ProductSwitch.js";
import ProductSwitchItem from "../../src/ProductSwitchItem.js";
import Avatar from "../../../main/src/Avatar.js";
import type UI5Element from "@ui5/webcomponents-base";

describe("List - getFocusDomRef Method", () => {
	it("should return undefined when the ProductSwitch is empty", () => {
		cy.mount(<ProductSwitch></ProductSwitch>);

		cy.get<ProductSwitch>("[ui5-product-switch]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
		<ProductSwitch>
			<ProductSwitchItem id="psi1" titleText="Item 1"></ProductSwitchItem>
			<ProductSwitchItem titleText="Item 2"></ProductSwitchItem>
		</ProductSwitch>
		);

		cy.get<UI5Element>("[ui5-product-switch], #psi1")
			.then(($el) => {
				const ps = $el[0];
				const psItem = $el[1];

				expect(ps.getFocusDomRef()).to.equal(psItem.getFocusDomRef());
			});
	});

	it("should return last focused item in the ProductSwitch", () => {
		cy.mount(
		<ProductSwitch>
			<ProductSwitchItem titleText="Item 1"></ProductSwitchItem>
			<ProductSwitchItem id="psi2" titleText="Item 2"></ProductSwitchItem>
		</ProductSwitch>
		);

		cy.get("#psi2").click();
		cy.get("#psi2").should("be.focused");

		cy.get<UI5Element>("[ui5-product-switch], #psi2")
			.then(($el) => {
				const ps = $el[0];
				const psItem = $el[1];

				expect(ps.getFocusDomRef()).to.equal(psItem.getFocusDomRef());
			});
	});

	describe("image slot", () => {
		it("should render custom content in the image slot and not render the icon", () => {
			cy.mount(
				<ProductSwitch>
					<ProductSwitchItem
						titleText="With Avatar"
						icon="file"
					>
						<Avatar slot="image" size="XS" />
					</ProductSwitchItem>
				</ProductSwitch>
			);

			cy.get("ui5-product-switch-item").within(() => {
				cy.get("ui5-avatar").should("exist");
				cy.get("ui5-icon").should("not.exist");
			});
		});
	});
});

describe("ProductSwitch general interaction", () => {
	it("tests 3-column desktop layout", () => {
		cy.mount(
			<ProductSwitch desktopColumns={3}>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home"></ProductSwitchItem>
				<ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience"></ProductSwitchItem>
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon="contacts"></ProductSwitchItem>
				<ProductSwitchItem titleText="Guided Buying" icon="credit-card"></ProductSwitchItem>
			</ProductSwitch>
		);

		cy.get("[ui5-product-switch]")
			.should("have.attr", "desktop-columns", "3")
			.invoke("prop", "items")
			.should("have.length", 4)
			.should("have.length.at.most", 6);
	});

	it("tests 4-column desktop layout", () => {
		cy.mount(
			<ProductSwitch desktopColumns={4}>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home"></ProductSwitchItem>
				<ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience"></ProductSwitchItem>
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon="contacts"></ProductSwitchItem>
				<ProductSwitchItem titleText="Guided Buying" icon="credit-card"></ProductSwitchItem>
				<ProductSwitchItem titleText="Strategic Procurement" icon="cart-3"></ProductSwitchItem>
				<ProductSwitchItem titleText="Travel & Expense" subtitleText="Concur" icon="flight"></ProductSwitchItem>
				<ProductSwitchItem titleText="Vendor Management" subtitleText="Fieldglass" icon="shipping-status"></ProductSwitchItem>
				<ProductSwitchItem titleText="Human Capital Management" icon="customer"></ProductSwitchItem>
				<ProductSwitchItem titleText="Sales Cloud" subtitleText="Sales Cloud" icon="sales-notification"></ProductSwitchItem>
				<ProductSwitchItem titleText="Commerce Cloud" subtitleText="Commerce Cloud" icon="retail-store"></ProductSwitchItem>
				<ProductSwitchItem titleText="Marketing Cloud" subtitleText="Marketing Cloud" icon="marketing-campaign"></ProductSwitchItem>
				<ProductSwitchItem titleText="Service Cloud" icon="family-care"></ProductSwitchItem>
				<ProductSwitchItem titleText="Customer Data Cloud" icon="customer-briefing"></ProductSwitchItem>
				<ProductSwitchItem titleText="S/4HANA" icon="batch-payments"></ProductSwitchItem>
			</ProductSwitch>
		);

		cy.get("[ui5-product-switch]")
			.should("have.attr", "desktop-columns", "4")
			.invoke("prop", "items")
			.should("have.length", 14)
			.should("have.length.above", 6);
	});
});

describe("ProductSwitch ARIA attributes", () => {
	it("role and aria-label set correctly", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home"></ProductSwitchItem>
				<ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience"></ProductSwitchItem>
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon="contacts"></ProductSwitchItem>
				<ProductSwitchItem titleText="Guided Buying" icon="credit-card"></ProductSwitchItem>
			</ProductSwitch>
		);

		cy.get("[ui5-product-switch]")
			.shadow()
			.find(".ui5-product-switch-root")
			.should("have.attr", "role", "list")
			.should("have.attr", "aria-label", "Products");
	});
});

describe("ProductSwitch styles", () => {
	it("tests root element inherit styles", () => {
		cy.mount(
			<ProductSwitch style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon="home"></ProductSwitchItem>
				<ProductSwitchItem titleText="Analytics Cloud" subtitleText="Analytics Cloud" icon="business-objects-experience"></ProductSwitchItem>
			</ProductSwitch>
		);

		cy.get("[ui5-product-switch]")
			.shadow()
			.find(".ui5-product-switch-root")
			.should("have.css", "justify-content", "center")
			.should("have.css", "align-items", "center");
	});
});
