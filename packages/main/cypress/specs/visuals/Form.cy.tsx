import Form from "../../../src/Form.js";
import FormGroup from "../../../src/FormGroup.js";
import FormItem from "../../../src/FormItem.js";
import Label from "../../../src/Label.js";
import Text from "../../../src/Text.js";
import Input from "../../../src/Input.js";

describe("Form visual", () => {
	it("basic state — with header and grouped items", () => {
		cy.mount(
			<Form headerText="Supplier">
				<FormGroup headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Text>Red Point Stores</Text>
					</FormItem>
					<FormItem>
						<Label slot="labelContent">ZIP Code/City</Label>
						<Text>411 Maintown</Text>
					</FormItem>
				</FormGroup>

				<FormGroup headerText="Contact">
					<FormItem>
						<Label slot="labelContent">Twitter</Label>
						<Text>@sap</Text>
					</FormItem>
					<FormItem>
						<Label slot="labelContent">Email</Label>
						<Text>john.smith@sap.com</Text>
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("without groups — flat form items", () => {
		cy.mount(
			<Form headerText="Basic Info">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
				<FormItem>
					<Label slot="labelContent">Street</Label>
					<Text>Main St 1618</Text>
				</FormItem>
				<FormItem>
					<Label slot="labelContent">Country</Label>
					<Text>Germany</Text>
				</FormItem>
			</Form>
		);
		cy.screenshot();
	});

	it("without header text", () => {
		cy.mount(
			<Form>
				<FormGroup headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Text>Red Point Stores</Text>
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("edit mode — inputs instead of text", () => {
		cy.mount(
			<Form headerText="Edit Supplier" accessibleMode="Edit">
				<FormGroup headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Input value="Red Point Stores" />
					</FormItem>
					<FormItem>
						<Label slot="labelContent">ZIP Code/City</Label>
						<Input value="411" />
						<Input value="Maintown" />
					</FormItem>
				</FormGroup>

				<FormGroup headerText="Contact">
					<FormItem>
						<Label slot="labelContent">Twitter</Label>
						<Input value="@sap" />
					</FormItem>
					<FormItem>
						<Label slot="labelContent">Email</Label>
						<Input value="john.smith@sap.com" />
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("labels on top — labelSpan S12 M12 L12 XL12", () => {
		cy.mount(
			<Form headerText="Labels on Top" layout="S1 M2 L2 XL3" labelSpan="S12 M12 L12 XL12">
				<FormItem>
					<Label slot="labelContent">Name</Label>
					<Text>Red Point Stores</Text>
				</FormItem>
				<FormItem>
					<Label slot="labelContent">ZIP Code/City</Label>
					<Text>411 Maintown</Text>
				</FormItem>
				<FormItem>
					<Label slot="labelContent">Street</Label>
					<Text>Main St 1618</Text>
				</FormItem>
				<FormItem>
					<Label slot="labelContent">Country</Label>
					<Text>Germany</Text>
				</FormItem>
			</Form>
		);
		cy.screenshot();
	});

	it("multi-column layout — S1 M2 L3 XL4", () => {
		cy.mount(
			<Form headerText="Supplier (multi-column)" layout="S1 M2 L3 XL4">
				<FormGroup headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Text>Red Point Stores</Text>
					</FormItem>
				</FormGroup>

				<FormGroup headerText="Contact">
					<FormItem>
						<Label slot="labelContent">Twitter</Label>
						<Text>@sap</Text>
					</FormItem>
					<FormItem>
						<Label slot="labelContent">Email</Label>
						<Text>john.smith@sap.com</Text>
					</FormItem>
				</FormGroup>

				<FormGroup headerText="Other Info">
					<FormItem>
						<Label slot="labelContent">Website</Label>
						<Text>www.sap.com</Text>
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("FormGroup without header text", () => {
		cy.mount(
			<Form headerText="Supplier">
				<FormGroup>
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Text>Red Point Stores</Text>
					</FormItem>
					<FormItem>
						<Label slot="labelContent">Country</Label>
						<Text>Germany</Text>
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("item-spacing Large", () => {
		cy.mount(
			<Form headerText="Large Spacing" item-spacing="Large">
				<FormGroup headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Text>Red Point Stores</Text>
					</FormItem>
					<FormItem>
						<Label slot="labelContent">Country</Label>
						<Text>Germany</Text>
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("custom header slot", () => {
		cy.mount(
			<Form>
				<div slot="header" style={{ padding: "0.5rem 0", fontSize: "1.25rem", fontWeight: "bold" }}>Custom Header</div>
				<FormGroup headerText="Address">
					<FormItem>
						<Label slot="labelContent">Name</Label>
						<Text>Red Point Stores</Text>
					</FormItem>
				</FormGroup>
			</Form>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Form headerText="Compact Form">
					<FormGroup headerText="Address">
						<FormItem>
							<Label slot="labelContent">Name</Label>
							<Text>Red Point Stores</Text>
						</FormItem>
						<FormItem>
							<Label slot="labelContent">Country</Label>
							<Text>Germany</Text>
						</FormItem>
					</FormGroup>

					<FormGroup headerText="Contact">
						<FormItem>
							<Label slot="labelContent">Email</Label>
							<Text>john.smith@sap.com</Text>
						</FormItem>
					</FormGroup>
				</Form>
			</div>
		);
		cy.screenshot();
	});
});
