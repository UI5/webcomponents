import Toolbar from "../../src/Toolbar.js";
import ToolbarSelect from "../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../src/ToolbarSelectOption.js";

describe("Toolbar general interaction", () => {
	it("Should render the select with the correct attributes", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect valueState="Critical">
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption selected>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.should("have.attr", "value-state", "Critical");
	});

	it("Should render the select with disabled property correctly", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect disabled>
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption selected>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select][disabled]")
			.shadow()
			.find("[ui5-select]")
			.should("have.attr", "disabled", "disabled");
	});

	it("Should render accessible name correctly", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect 
					accessibleName="Add"
					accessibleNameRef="title"
				>
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption selected>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.should("have.attr", "accessible-name", "Add")
			.should("have.attr", "accessible-name-ref", "title");
	});

	it("Should fire change event on selection change", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect>
						<ToolbarSelectOption>1</ToolbarSelectOption>
						<ToolbarSelectOption selected>2</ToolbarSelectOption>
						<ToolbarSelectOption>3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<input placeholder="Changed" data-testid="selectResult" />
			</>
		);

		cy.get("[ui5-toolbar-select]")
			.as("toolbarSelect")
			.then($select => {
				$select.get(0).addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@toolbarSelect").then($select => {
			$select.get(0).addEventListener("ui5-change", (e) => {
				const input = document.querySelector("[data-testid='selectResult']") as HTMLInputElement;
				input.value = "1";
			});
		});

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realClick();

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("ArrowUp");

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("Enter");

		cy.get("[data-testid='selectResult']").should("have.prop", "value", "1");

		cy.get("@changeStub").should("have.been.called");
	});
});