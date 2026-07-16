import ProductSwitch from "../../../src/ProductSwitch.js";
import ProductSwitchItem from "../../../src/ProductSwitchItem.js";
import Avatar from "@ui5/webcomponents/dist/Avatar.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import palette from "@ui5/webcomponents-icons/dist/palette.js";
import contacts from "@ui5/webcomponents-icons/dist/contacts.js";
import creditCard from "@ui5/webcomponents-icons/dist/credit-card.js";
import cart3 from "@ui5/webcomponents-icons/dist/cart-3.js";
import flight from "@ui5/webcomponents-icons/dist/flight.js";
import shippingStatus from "@ui5/webcomponents-icons/dist/shipping-status.js";
import customer from "@ui5/webcomponents-icons/dist/customer.js";

describe("ProductSwitch visual", () => {
	it("basic state — 3-column layout", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon={home} />
				<ProductSwitchItem titleText="Analytics" subtitleText="Analytics Cloud" icon={palette} />
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon={contacts} />
				<ProductSwitchItem titleText="Guided Buying" icon={creditCard} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("4-column layout — more than 6 items", () => {
		cy.mount(
			<ProductSwitch desktopColumns={4}>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon={home} />
				<ProductSwitchItem titleText="Analytics" subtitleText="Analytics Cloud" icon={palette} />
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon={contacts} />
				<ProductSwitchItem titleText="Guided Buying" icon={creditCard} />
				<ProductSwitchItem titleText="Strategic Procurement" icon={cart3} />
				<ProductSwitchItem titleText="Travel & Expense" subtitleText="Concur" icon={flight} />
				<ProductSwitchItem titleText="Vendor Management" subtitleText="Fieldglass" icon={shippingStatus} />
				<ProductSwitchItem titleText="Human Capital" icon={customer} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("item — title only, no subtitle", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="Home" icon={home} />
				<ProductSwitchItem titleText="Analytics" icon={palette} />
				<ProductSwitchItem titleText="Catalog" icon={contacts} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("item — title and subtitle", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon={home} />
				<ProductSwitchItem titleText="Analytics" subtitleText="Analytics Cloud" icon={palette} />
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon={contacts} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("item — custom image slot overrides icon", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="With Avatar" subtitleText="Custom image" icon={home}>
					<Avatar slot="image" size="XS" initials="AB" colorScheme="Accent1" />
				</ProductSwitchItem>
				<ProductSwitchItem titleText="Another" subtitleText="Also custom" icon={palette}>
					<Avatar slot="image" size="XS" initials="CD" colorScheme="Accent2" />
				</ProductSwitchItem>
				<ProductSwitchItem titleText="Icon only" subtitleText="No image" icon={contacts} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("item — as link (targetSrc set)", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="Home" subtitleText="Go home" icon={home} targetSrc="https://www.sap.com" target="_blank" />
				<ProductSwitchItem titleText="Catalog" subtitleText="Browse" icon={contacts} targetSrc="https://www.sap.com/catalog" />
				<ProductSwitchItem titleText="No link" subtitleText="Plain div" icon={palette} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("item — focused state", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem id="psi1" titleText="Home" subtitleText="Central Home" icon={home} />
				<ProductSwitchItem titleText="Analytics" subtitleText="Analytics Cloud" icon={palette} />
				<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon={contacts} />
			</ProductSwitch>,
		);
		cy.get("#psi1").shadow().find("[data-sap-focus-ref]").focus();
		cy.screenshot();
	});

	it("single item", () => {
		cy.mount(
			<ProductSwitch>
				<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon={home} />
			</ProductSwitch>,
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ProductSwitch>
					<ProductSwitchItem titleText="Home" subtitleText="Central Home" icon={home} />
					<ProductSwitchItem titleText="Analytics" subtitleText="Analytics Cloud" icon={palette} />
					<ProductSwitchItem titleText="Catalog" subtitleText="Ariba" icon={contacts} />
					<ProductSwitchItem titleText="Guided Buying" icon={creditCard} />
				</ProductSwitch>
			</div>,
		);
		cy.screenshot();
	});
});
