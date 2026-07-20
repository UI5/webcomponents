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

	it("Should expose value and selectedToolbarOption in change event detail", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect id="ts">
						<ToolbarSelectOption value="opt1">Option 1</ToolbarSelectOption>
						<ToolbarSelectOption value="opt2" selected>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption value="opt3">Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<input data-testid="result-value" />
				<input data-testid="result-toolbar-option" />
			</>
		);

		cy.get("[ui5-toolbar-select]").then($select => {
			$select.get(0).addEventListener("ui5-change", (e: Event) => {
				const ce = e as CustomEvent;
				(document.querySelector("[data-testid='result-value']") as HTMLInputElement).value = ce.detail.selectedOption.value;
				(document.querySelector("[data-testid='result-toolbar-option']") as HTMLInputElement).value = ce.detail.selectedToolbarOption.value;
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

		cy.get("[data-testid='result-value']").should("have.prop", "value", "opt1");
		cy.get("[data-testid='result-toolbar-option']").should("have.prop", "value", "opt1");
	});

	it("Should expose selectedToolbarOption as the actual element reference with correct id and value", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect id="ts-verify-sync">
						<ToolbarSelectOption id="opt-1" value="value1">First</ToolbarSelectOption>
						<ToolbarSelectOption id="opt-2" value="value2" selected>Second</ToolbarSelectOption>
						<ToolbarSelectOption id="opt-3" value="value3">Third</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<div data-testid="selected-element-id"></div>
			</>
		);

		cy.get("[ui5-toolbar-select]").then($select => {
			$select.get(0).addEventListener("ui5-change", (e: Event) => {
				const ce = e as CustomEvent;
				const selectedToolbarOption = ce.detail.selectedToolbarOption as HTMLElement;
				const testDiv = document.querySelector("[data-testid='selected-element-id']") as HTMLElement;
				testDiv.setAttribute("data-selected-id", selectedToolbarOption.id);
				testDiv.setAttribute("data-selected-value", (selectedToolbarOption as any).value || "");
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
			.realPress("ArrowDown");

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("Enter");

		cy.get("[data-testid='selected-element-id']")
			.should("have.attr", "data-selected-id", "opt-3")
			.should("have.attr", "data-selected-value", "value3");
	});

	it("Should correctly identify selectedToolbarOption when option text does not match value", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect id="ts-mismatch">
						<ToolbarSelectOption value="internal_1">Display Text 1</ToolbarSelectOption>
						<ToolbarSelectOption value="internal_2" selected>Display Text 2</ToolbarSelectOption>
						<ToolbarSelectOption value="internal_3">Display Text 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<input data-testid="value-match-test" />
				<input data-testid="text-match-test" />
			</>
		);

		cy.get("[ui5-toolbar-select]").then($select => {
			$select.get(0).addEventListener("ui5-change", (e: Event) => {
				const ce = e as CustomEvent;
				const selectedToolbarOption = ce.detail.selectedToolbarOption as any;
				(document.querySelector("[data-testid='value-match-test']") as HTMLInputElement).value = selectedToolbarOption.value || "";
				(document.querySelector("[data-testid='text-match-test']") as HTMLInputElement).value = selectedToolbarOption.textContent?.trim() || "";
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
			.realPress("ArrowDown");

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("Enter");

		cy.get("[data-testid='value-match-test']").should("have.prop", "value", "internal_3");
		cy.get("[data-testid='text-match-test']").should("have.prop", "value", "Display Text 3");
	});

	it("Should expose correct selectedToolbarOption for duplicate text options", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect id="ts-dup">
						<ToolbarSelectOption value="pending-normal">Pending</ToolbarSelectOption>
						<ToolbarSelectOption value="active" selected>Active</ToolbarSelectOption>
						<ToolbarSelectOption value="pending-urgent">Pending</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<input data-testid="dup-result-value" />
			</>
		);

		cy.get("[ui5-toolbar-select]").then($select => {
			$select.get(0).addEventListener("ui5-change", (e: Event) => {
				const ce = e as CustomEvent;
				(document.querySelector("[data-testid='dup-result-value']") as HTMLInputElement).value = ce.detail.selectedToolbarOption.value;
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
			.realPress("ArrowDown");

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("ArrowDown");

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("Enter");

		cy.get("[data-testid='dup-result-value']").should("have.prop", "value", "pending-urgent");
	});

	it("Should work correctly when options have no value property set", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect>
						<ToolbarSelectOption selected>Option A</ToolbarSelectOption>
						<ToolbarSelectOption>Option B</ToolbarSelectOption>
						<ToolbarSelectOption>Option C</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<input data-testid="no-value-result" />
			</>
		);

		cy.get("[ui5-toolbar-select]").then($select => {
			$select.get(0).addEventListener("ui5-change", (e: Event) => {
				const ce = e as CustomEvent;
				(document.querySelector("[data-testid='no-value-result']") as HTMLInputElement).value = ce.detail.selectedToolbarOption.textContent?.trim() ?? "";
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
			.realPress("ArrowDown");

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realPress("Enter");

		cy.get("[data-testid='no-value-result']").should("have.prop", "value", "Option B");

		// Verify the internal select still shows the correct option selected
		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.find("[ui5-option]")
			.eq(1)
			.should("have.attr", "selected");
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

	it("Should update selection when option's selected property is changed programmatically", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect>
						<ToolbarSelectOption>1</ToolbarSelectOption>
						<ToolbarSelectOption id="opt2">2</ToolbarSelectOption>
						<ToolbarSelectOption>3</ToolbarSelectOption>
						<ToolbarSelectOption>4</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<Button id="btn">select option 2</Button>
			</>
		);

		// Attach click handler via document to avoid jQuery wrapping issues
		cy.document().then(doc => {
			const btn = doc.getElementById("btn");
			btn?.addEventListener("click", () => {
				const select = doc.querySelector("ui5-toolbar-select");
				const options = select?.querySelectorAll("ui5-toolbar-select-option");
				options?.forEach(opt => {
					(opt as ToolbarSelectOption).selected = false;
				});
				const opt2 = doc.getElementById("opt2") as ToolbarSelectOption;
				opt2.selected = true;
			});
		});

		// Verify initial state - option 2 is not selected (default selection is option 1)
		cy.get("#opt2")
			.should("not.have.attr", "selected");

		// Click button using realClick
		cy.get("#btn").realClick();

		// Verify option 2 is now selected (explicit selection reflects to the light-DOM option)
		cy.get("#opt2")
			.should("have.attr", "selected");

		// The rendered select reflects option 2 as the selected value
		cy.get("ui5-select", { includeShadowDom: true })
			.should("have.attr", "value", "2");
	});

	it("Should ensure only one option is selected at any time", () => {
		cy.mount(
			<>
				<Toolbar>
					<ToolbarSelect>
						<ToolbarSelectOption id="opt1">1</ToolbarSelectOption>
						<ToolbarSelectOption id="opt2">2</ToolbarSelectOption>
						<ToolbarSelectOption id="opt3">3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
				<Button id="selectMultiple">Select Multiple</Button>
			</>
		);

		// Set up button to attempt selecting multiple options
		cy.document().then(doc => {
			const btn = doc.getElementById("selectMultiple");
			btn?.addEventListener("click", () => {
				const opt1 = doc.getElementById("opt1") as ToolbarSelectOption;
				const opt2 = doc.getElementById("opt2") as ToolbarSelectOption;
				const opt3 = doc.getElementById("opt3") as ToolbarSelectOption;

				// Try to select multiple options
				opt1.selected = true;
				opt2.selected = true;
				opt3.selected = true; // This should be the final selection
			});
		});

		// Click button to attempt multiple selections
		cy.get("#selectMultiple").realClick();

		// Verify only the last option (opt3) is selected
		cy.get("[ui5-toolbar-select-option]").eq(2).should("have.attr", "selected");
		cy.get("[ui5-toolbar-select-option]").eq(0).should("not.have.attr", "selected");
		cy.get("[ui5-toolbar-select-option]").eq(1).should("not.have.attr", "selected");
		cy.get("ui5-select", { includeShadowDom: true }).should("have.attr", "value", "3");
	});
});