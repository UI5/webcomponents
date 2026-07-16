import Wizard from "../../../src/Wizard.js";
import WizardStep from "../../../src/WizardStep.js";
import product from "@ui5/webcomponents-icons/dist/product.js";
import person from "@ui5/webcomponents-icons/dist/person-placeholder.js";
import card from "@ui5/webcomponents-icons/dist/credit-card.js";
import confirm from "@ui5/webcomponents-icons/dist/accept.js";

describe("Wizard visual", () => {
	it("basic state — step 1 selected, steps with icons", () => {
		cy.mount(
			<Wizard style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" subtitleText="Step 1" icon={product} selected>
					<p>Select the product type to proceed.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" subtitleText="Step 2" icon={person} disabled>
					<p>Enter personal information.</p>
				</WizardStep>
				<WizardStep titleText="Payment" subtitleText="Step 3" icon={card} disabled>
					<p>Choose payment method.</p>
				</WizardStep>
				<WizardStep titleText="Confirmation" subtitleText="Step 4" icon={confirm} disabled>
					<p>Review and confirm your order.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("step 2 selected — progress bar advances", () => {
		cy.mount(
			<Wizard style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" icon={product}>
					<p>Product type content.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person} selected>
					<p>Personal info content.</p>
				</WizardStep>
				<WizardStep titleText="Payment" icon={card} disabled>
					<p>Payment content.</p>
				</WizardStep>
				<WizardStep titleText="Confirmation" icon={confirm} disabled>
					<p>Confirmation content.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("steps without icons — numbers shown", () => {
		cy.mount(
			<Wizard style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" selected>
					<p>Select the product type.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" disabled>
					<p>Enter personal info.</p>
				</WizardStep>
				<WizardStep titleText="Payment" disabled>
					<p>Choose payment method.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("contentLayout — SingleStep", () => {
		cy.mount(
			<Wizard contentLayout="SingleStep" style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" icon={product} selected>
					<p>Only the selected step's content is shown.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person} disabled>
					<p>Hidden in SingleStep mode.</p>
				</WizardStep>
				<WizardStep titleText="Payment" icon={card} disabled>
					<p>Hidden in SingleStep mode.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("branching step — dashed separator after current step", () => {
		cy.mount(
			<Wizard style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" icon={product} selected branching>
					<p>The next step depends on your choice here.</p>
				</WizardStep>
				<WizardStep titleText="Option A" icon={person} disabled>
					<p>Path A content.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("two steps — minimal wizard", () => {
		cy.mount(
			<Wizard style={{ height: "300px" }}>
				<WizardStep titleText="Step One" icon={product} selected>
					<p>First step content.</p>
				</WizardStep>
				<WizardStep titleText="Step Two" icon={confirm} disabled>
					<p>Second step content.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("last step selected — all steps completed", () => {
		cy.mount(
			<Wizard style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" icon={product}>
					<p>Done.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person}>
					<p>Done.</p>
				</WizardStep>
				<WizardStep titleText="Payment" icon={card}>
					<p>Done.</p>
				</WizardStep>
				<WizardStep titleText="Confirmation" icon={confirm} selected>
					<p>All steps completed — confirmation view.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("narrow viewport — steps collapse into groups", () => {
		cy.viewport(480, 600);
		cy.mount(
			<Wizard style={{ height: "400px" }}>
				<WizardStep titleText="Product Type" icon={product} selected>
					<p>Step 1 content.</p>
				</WizardStep>
				<WizardStep titleText="Personal Info" icon={person} disabled>
					<p>Step 2 content.</p>
				</WizardStep>
				<WizardStep titleText="Payment" icon={card} disabled>
					<p>Step 3 content.</p>
				</WizardStep>
				<WizardStep titleText="Confirmation" icon={confirm} disabled>
					<p>Step 4 content.</p>
				</WizardStep>
			</Wizard>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Wizard style={{ height: "350px" }}>
					<WizardStep titleText="Product Type" icon={product} selected>
						<p>Compact step 1.</p>
					</WizardStep>
					<WizardStep titleText="Personal Info" icon={person} disabled>
						<p>Compact step 2.</p>
					</WizardStep>
					<WizardStep titleText="Confirmation" icon={confirm} disabled>
						<p>Compact step 3.</p>
					</WizardStep>
				</Wizard>
			</div>
		);
		cy.screenshot();
	});
});
