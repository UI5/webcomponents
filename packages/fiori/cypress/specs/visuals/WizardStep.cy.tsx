import Wizard from "../../../src/Wizard.js";
import WizardStep from "../../../src/WizardStep.js";
import product from "@ui5/webcomponents-icons/dist/product.js";
import person from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import card from "@ui5/webcomponents-icons/dist/credit-card.js";

describe("WizardStep visual", () => {
	it("selected step — active appearance in nav header", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Product Type" icon={product} selected>
					<p>Selected step content.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person} disabled>
					<p>Next step content.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("disabled step — inactive appearance in nav header", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Product Type" icon={product} selected>
					<p>Active step content.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person} disabled>
					<p>Disabled — cannot be navigated to.</p>
				</WizardStep>
				<WizardStep titleText="Payment" icon={card} disabled>
					<p>Also disabled.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("step with icon", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Product Type" subtitleText="Choose category" icon={product} selected>
					<p>Icon visible in navigator.</p>
				</WizardStep>
				<WizardStep titleText="Payment" subtitleText="Enter details" icon={card} disabled>
					<p>Second step.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("step without icon — number shown", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Product Type" selected>
					<p>Step number displayed instead of icon.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" disabled>
					<p>Second step.</p>
				</WizardStep>
				<WizardStep titleText="Payment" disabled>
					<p>Third step.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("step with titleText and subtitleText", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Product Type" subtitleText="Choose a category" icon={product} selected>
					<p>Both title and subtitle visible in nav header.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" subtitleText="Fill in your details" icon={person} disabled>
					<p>Second step.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("branching step — dashed line separator", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Choose Path" icon={product} selected branching>
					<p>Branching indicator shown after this step in the nav header.</p>
				</WizardStep>
				<WizardStep titleText="Option A" icon={person} disabled>
					<p>Path dependent on previous step.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("previously visited step — highlighted separator", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Product Type" icon={product}>
					<p>Already visited.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person} selected>
					<p>Currently selected step.</p>
				</WizardStep>
				<WizardStep titleText="Payment" icon={card} disabled>
					<p>Not yet visited.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});
});
