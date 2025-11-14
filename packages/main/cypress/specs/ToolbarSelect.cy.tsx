import Toolbar from "../../src/Toolbar.js";
import ToolbarSelect from "../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../src/ToolbarSelectOption.js";
import Button from "../../src/Button.js";

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

	it("Should render the select with the correct attributes inside the popover", () => {
		cy.mount(
			<div style="width: 250px;">
				<Toolbar id="otb_e">
					<ToolbarSelect value-state="Critical" accessible-name="Add" accessible-name-ref="title" id="toolbar-select">
						<ToolbarSelectOption>1</ToolbarSelectOption>
						<ToolbarSelectOption selected>2</ToolbarSelectOption>
						<ToolbarSelectOption>3</ToolbarSelectOption>
					</ToolbarSelect>


					<ToolbarSelect disabled class="custom-class">
						<ToolbarSelectOption>1</ToolbarSelectOption>
						<ToolbarSelectOption selected>2</ToolbarSelectOption>
						<ToolbarSelectOption>3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			</div>
		);

		const otb = cy.get("#otb_e").as("otb");

		cy.get("@otb")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.click();
		const overflowButton = otb.shadow().find(".ui5-tb-overflow-btn");

		cy.get("@otb")
			.shadow()
			.find(".ui5-overflow-popover").as("popover")
			.should("have.attr", "open", "open");
		overflowButton.click();
		cy.wait(500);

		cy.get("@otb")
			.find("#toolbar-select")
			.should("have.attr", "value-state", "Critical")

			.should("have.attr", "accessible-name", "Add")

			.should("have.attr", "accessible-name-ref", "title")

		cy.get("@otb")
			.find(".custom-class")
			.should("have.attr", "disabled", "disabled");

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

	describe("value and label properties", () => {
		it("Should verify the initial value of the ToolbarSelect", () => {
			// Mount the Toolbar with a ToolbarSelect component
			cy.mount(
				<Toolbar>
					<ToolbarSelect value="Option 2">
						<span slot="label">Select an Option:</span>
						<ToolbarSelectOption>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption>Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			);

			// Verify the initial value of the ToolbarSelect
			cy.get("ui5-select", { includeShadowDom: true })
				.should("have.attr", "value", "Option 2");
		});

		it("Should verify the label slot content", () => {
			// Mount the Toolbar with a ToolbarSelect component
			cy.mount(
				<Toolbar>
					<ToolbarSelect value="Option 2">
						<span slot="label">Select an Option:</span>
						<ToolbarSelectOption>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption>Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			);

			// Verify the label slot content
			cy.get("ui5-toolbar-select")
				.find("span[slot='label']")
				.should("contain.text", "Select an Option:");
		});

		it("Should change the value and update the selection", () => {
			// Mount the Toolbar with a ToolbarSelect component
			cy.mount(
				<Toolbar>
					<ToolbarSelect value="Option 2">
						<ToolbarSelectOption>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption>Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			);

			// Change the value of the ToolbarSelect
			cy.get("ui5-select", { includeShadowDom: true })
				.realClick()
				.find("ui5-option")
				.contains("Option 3")
				.realClick();

			// Verify the updated value of the ToolbarSelect
			cy.get("ui5-select", { includeShadowDom: true })
				.should("have.attr", "value", "Option 3");
		});

		it("Should handle a value with no corresponding option", () => {
			// Mount the Toolbar with a ToolbarSelect component
			cy.mount(
				<Toolbar>
					<ToolbarSelect value="NonExistentOption">
						<ToolbarSelectOption>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption>Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			);

			// Verify that no option is selected when the value does not match any option
			cy.get("ui5-select", { includeShadowDom: true })
				.should("have.attr", "value", "NonExistentOption");
		});

		it("Should update the value programmatically and reflect the selection", () => {
			// Mount the Toolbar with a ToolbarSelect component
			cy.mount(
				<Toolbar>
					<ToolbarSelect value="Option 1">
						<ToolbarSelectOption>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption>Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			);

			// Update the value programmatically
			cy.get("ui5-toolbar-select").invoke("attr", "value", "Option 3");

			// Verify the updated value and selection
			cy.get("ui5-select", { includeShadowDom: true })
				.should("have.attr", "value", "Option 3");
		});
	});

	it("Should handle toolbar-select with width larger than the toolbar", async () => {
		cy.mount(
			<Toolbar id="otb_d">
				<ToolbarSelect style="width: 201px;" id="toolbar-select">
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption selected>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.viewport(220, 1080); // Set a small viewport width to trigger overflow

		// Add a toolbar-select element with a large width
		cy.get("#otb_d").shadow().within(() => {
			cy.wait(2000);
			// Click the overflow button
			cy.get(".ui5-tb-overflow-btn").click();
		});

		// Verify the toolbar-select is rendered inside the popover
		cy.get("ui5-toolbar-select").should("be.visible");
	});

	it("Should update ToolbarSelect value when option selected property changes via button click", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect id="testSelect">
						<ToolbarSelectOption id="opt1" selected>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption id="opt2">Option 2</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<Button id="btnNext">Next Step</Button>
			</>
		);

		// Wait for component to render
		cy.wait(500);

		// Initial check - Option 1 should be selected
		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.should("have.prop", "value", "Option 1");

		// Set up button click handler
		cy.get("[ui5-button]").then($btn => {
			$btn.get(0).addEventListener("click", () => {
				const opt1 = document.getElementById("opt1") as ToolbarSelectOption;
				const opt2 = document.getElementById("opt2") as ToolbarSelectOption;
				opt1.selected = false;
				opt2.selected = true;
			});
		});

		// Click the button
		cy.get("[ui5-button]").realClick();

		// Wait for update
		cy.wait(200);

		// Verify the ToolbarSelect value property updated
		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.should("have.prop", "value", "Option 2");
	});
});