import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import ToolbarSelect from "../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../src/ToolbarSelectOption.js";
import ToolbarSeparator from "../../src/ToolbarSeparator.js";
import ToolbarSpacer from "../../src/ToolbarSpacer.js";
import ToolbarItem from "../../src/ToolbarItem.js";
import type ToolbarItemBase from "../../src/ToolbarItemBase.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";
import Button from "../../src/Button.js";
import Dialog from "../../src/Dialog.js";

describe("Toolbar general interaction", () => {
	it("Should not return null upon calling getDomRef for all direct child items", () => {
		cy.mount(
			<Toolbar id="otb_standard">
				<ToolbarButton text="Button 1"></ToolbarButton>
				<ToolbarButton text="Button 2"></ToolbarButton>
				<ToolbarButton text="Button 3"></ToolbarButton>
				<ToolbarSelect>
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
				<ToolbarSeparator></ToolbarSeparator>
				<ToolbarButton text="Button 4"></ToolbarButton>
				<ToolbarButton text="Button 5"></ToolbarButton>
				<ToolbarButton text="Button 6"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#otb_standard")
			.as("toolbar");

		cy.get("@toolbar")
			.should("exist");

		cy.get("@toolbar")
			.children()
			.each($el => {
				const toolbarItem = $el[0] as ToolbarItem;
				cy.wrap(toolbarItem.getDomRef())
					.should("not.be.null")
					.should("not.be.undefined");
			});
	});

	it("shouldn't have toolbar button as popover opener when there is spacer before last toolbar item", () => {
		cy.mount(
			<Toolbar id="otb_spacer">
				<ToolbarButton icon={add} text="Plus" design="Default"></ToolbarButton>
				<ToolbarButton icon={employee} text="Hire"></ToolbarButton>
				<ToolbarSeparator></ToolbarSeparator>
				<ToolbarButton icon={add} text="Add"></ToolbarButton>
				<ToolbarButton icon={decline} text="Decline"></ToolbarButton>
				<ToolbarSpacer></ToolbarSpacer>
				<ToolbarButton icon={add} text="Append"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#otb_spacer")
			.as("toolbar");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("Should apply fixed spacer widths without enabling flexible full-width layout", () => {
		cy.mount(
			<Toolbar id="otb_fixed_spacers">
				<ToolbarSpacer width="50px"></ToolbarSpacer>
				<ToolbarButton text="Left"></ToolbarButton>
				<ToolbarSpacer width="100px"></ToolbarSpacer>
				<ToolbarButton text="Right"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#otb_fixed_spacers")
			.as("toolbar");

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-items")
			.should("not.have.class", "ui5-tb-items-full-width");

		cy.get("@toolbar")
			.then($toolbar => {
				const toolbar = $toolbar[0] as Toolbar;
				const fixedSpacers = Array.from(toolbar.querySelectorAll("ui5-toolbar-spacer")) as ToolbarSpacer[];

				expect(fixedSpacers).to.have.length(2);
				expect(fixedSpacers[0].hasFlexibleWidth).to.be.false;
				expect(fixedSpacers[1].hasFlexibleWidth).to.be.false;

				cy.get("@toolbar")
					.shadow()
					.find(`#${fixedSpacers[0]._individualSlot}`)
					.should("have.css", "width", "50px");

				cy.get("@toolbar")
					.shadow()
					.find(`#${fixedSpacers[1]._individualSlot}`)
					.should("have.css", "width", "100px");
			});
	});

	it("shouldn't show overflow button if there is enough space", () => {
		cy.mount(
			<Toolbar style={{ width: "fit-content", " max-width": "100%;" }}>
				<ToolbarButton icon={decline}>
				</ToolbarButton>

				<ToolbarButton icon={add}>
				</ToolbarButton>

				<ToolbarButton icon={employee}>
				</ToolbarButton>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.as("toolbar");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("shouldn't display the overflow button when initially rendered in a hidden container and later made visible", () => {
		cy.mount(
			<div id="otb_hidden_container" style="display:none;">
				<Toolbar id="otb_hidden">
					<ToolbarButton icon={add} text="Append"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("#otb_hidden_container")
			.as("hiddenContainer");

		// show the hidden container
		cy.get("@hiddenContainer")
			.invoke("show");

		// overflowbutton should not be rendered
		cy.get("#otb_hidden")
			.shadow()
			.find(".ui5-tb-overflow-btn-hidden")
			.should("exist", "hidden class attached to tb button, meaning it's not shown as expected");
	});

	it("Should call event handlers on item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Button 1"></ToolbarButton>
				<ToolbarSelect>
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption selected={true}>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("ui5-toolbar-button[text='Button 1']")
			.then(button => {
				button.get(0).addEventListener("click", cy.stub().as("clicked"));
			});

		cy.get("ui5-button", { includeShadowDom: true }).contains("Button 1")
			.realClick();

		cy.get("@clicked")
			.should("have.been.calledOnce");

		cy.get("ui5-toolbar-select")
			.then(select => {
				select.get(0).addEventListener("ui5-click", cy.stub().as("clicked"));
				select.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
				select.get(0).addEventListener("ui5-open", cy.stub().as("opened"));
				select.get(0).addEventListener("ui5-close", cy.stub().as("closed"));
			});

		cy.get("ui5-select", { includeShadowDom: true })
			.realClick();

		cy.get("@clicked")
			.should("have.been.calledOnce");
		cy.get("@opened")
			.should("have.been.calledOnce");

		cy.get("ui5-option", { includeShadowDom: true })
			.first()
			.realClick();

		cy.get("@changed")
			.should("have.been.calledOnce");
		cy.get("@closed")
			.should("have.been.calledOnce");
	});

	it("Should move button with alwaysOverflow priority to overflow popover", () => {

		cy.mount(
			<Toolbar>
				<ToolbarButton text="Add" icon={add} overflow-priority="AlwaysOverflow" stableDomRef="tb-button-add-d"></ToolbarButton>
				<ToolbarButton text="Employee" icon={employee} overflow-priority="AlwaysOverflow" stableDomRef="tb-button-employee-d"></ToolbarButton>
			</Toolbar>
		);

		// Wait for the toolbar to render
		cy.wait(500);

		// Select the toolbar by tag name
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify the overflow popover is open
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "open", "open");
		cy.wait(500);

		// Verify the popover contains the correct number of items
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-popover-item")
			.should("have.length", 2);

		// Verify the specific button is in the popover
		cy.get("[ui5-toolbar]")
			.find(`[stabledomref="tb-button-employee-d"]`)
			.shadow()
			.find(`[ui5-button]`)
			.should("have.class", "ui5-tb-popover-item");
	});

	it("Should place AlwaysOverflow items in overflow from first render without flash", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Visible" icon="add" overflow-priority="NeverOverflow"></ToolbarButton>
				<ToolbarButton text="Test 2" icon="employee" overflow-priority="AlwaysOverflow"></ToolbarButton>
				<ToolbarButton text="Test 3" icon="decline" overflow-priority="AlwaysOverflow"></ToolbarButton>
			</Toolbar>
		);

		// Verify state immediately after mount, before any waiting
		// AlwaysOverflow items should already be in itemsToOverflow array
		cy.get("[ui5-toolbar]").then($toolbar => {
			const toolbar = $toolbar[0] as Toolbar;
			const alwaysBtn1 = document.querySelector("[ui5-toolbar-button][text='Test 2']") as ToolbarButton;
			const alwaysBtn2 = document.querySelector("[ui5-toolbar-button][text='Test 3']") as ToolbarButton;
			const neverBtn = document.querySelector("[ui5-toolbar-button][text='Visible']") as ToolbarButton;

			// AlwaysOverflow items should be in itemsToOverflow from the start
			expect(toolbar.itemsToOverflow).to.include(alwaysBtn1);
			expect(toolbar.itemsToOverflow).to.include(alwaysBtn2);

			// NeverOverflow item should NOT be in itemsToOverflow
			expect(toolbar.itemsToOverflow).to.not.include(neverBtn);

			// Verify standardItems only contains the NeverOverflow button
			expect(toolbar.standardItems).to.have.length(1);
			expect(toolbar.standardItems[0]).to.equal(neverBtn);
		});

		// Wait for any potential re-renders
		cy.wait(500);

		// Verify overflow button is visible (not hidden)
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("exist")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden");

		// Verify the visible button is in the toolbar (not in overflow popover wrapper)
		cy.get("[ui5-toolbar-button][text='Visible']")
			.shadow()
			.find("[ui5-button]")
			.should("not.have.class", "ui5-tb-popover-item");

		// Open overflow popover
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify the AlwaysOverflow items are in the popover
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-popover-item")
			.should("have.length", 2);

		// Verify specific items are in overflow
		cy.get("[ui5-toolbar-button][text='Test 2']")
			.shadow()
			.find("[ui5-button]")
			.should("have.class", "ui5-tb-popover-item");

		cy.get("[ui5-toolbar-button][text='Test 3']")
			.shadow()
			.find("[ui5-button]")
			.should("have.class", "ui5-tb-popover-item");
	});

	it("Should place dynamically added AlwaysOverflow items in overflow without flash", () => {
		// Start with a toolbar that already has an AlwaysOverflow item in overflow
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First Always" icon="employee" overflow-priority="AlwaysOverflow"></ToolbarButton>
			</Toolbar>
		);

		// Wait for initial render to complete
		cy.wait(500);

		// Verify initial state - first AlwaysOverflow item is in overflow
		cy.get("[ui5-toolbar-button][text='First Always']")
			.shadow()
			.find("[ui5-button]")
			.should("have.class", "ui5-tb-popover-item");

		// Overflow button should be visible (not hidden)
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden");

		// Now dynamically add ANOTHER AlwaysOverflow item while overflow is non-empty
		cy.get("[ui5-toolbar]").then($toolbar => {
			const toolbar = $toolbar[0] as Toolbar;
			const newButton = document.createElement("ui5-toolbar-button") as ToolbarButton;
			newButton.text = "Dynamic Always";
			newButton.icon = "decline";
			newButton.overflowPriority = "AlwaysOverflow";
			toolbar.appendChild(newButton);
		});

		// Verify the dynamically added item is placed in the overflow (has popover class)
		cy.get("[ui5-toolbar-button][text='Dynamic Always']")
			.shadow()
			.find("[ui5-button]")
			.should("have.class", "ui5-tb-popover-item");

		// The first AlwaysOverflow item should still be in overflow
		cy.get("[ui5-toolbar-button][text='First Always']")
			.shadow()
			.find("[ui5-button]")
			.should("have.class", "ui5-tb-popover-item");

		// Open overflow popover and verify both AlwaysOverflow items are there
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-popover-item")
			.should("have.length", 2);
	});

	it("Should properly prevent the closing of the overflow menu when preventClosing = true", () => {
		cy.mount(
			<div style="width: 250px;">
				<Toolbar id="testEventpreventClosing-toolbar">
					<ToolbarButton text="Some longer title text">

					</ToolbarButton>
					<ToolbarSelect>
						<ToolbarSelectOption>
							test
						</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			</div>
		)

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(1000);

		cy.get("#testEventpreventClosing-toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();
		cy.get("[ui5-toolbar-select]")
			.shadow()
			.find("[ui5-select]")
			.realClick();

		cy.get("#testEventpreventClosing-toolbar")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "open", "open");
	});

	it("Should close the popover when interacting with item in the overflow menu", () => {
		cy.viewport(300, 1080);

		cy.mount(
			<Toolbar>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
				<ToolbarButton text="Example Button"></ToolbarButton>
			</Toolbar>
		);


		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.as("overflowButton")

		cy.get("@overflowButton")
			.should("exist");

		cy.get("@overflowButton")
			.realClick();

		cy.get("[ui5-toolbar]")
			.shadow()
			.find("[ui5-popover]")
			.as("popover")

		cy.get("@popover")
			.should("have.prop", "open", true);

		cy.get("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("[ui5-button]")
			.realClick();

		cy.get("@popover")
			.should("have.prop", "open", false);
	});

	it("Should focus on the last interactive element outside the overflow popover when overflow button disappears", () => {
		// Mount the Toolbar with multiple buttons
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Button 1" />
				<ToolbarButton text="Button 2" />
				<ToolbarButton text="Button 3" />
				<ToolbarButton text="Button 4" />
				<ToolbarButton text="Button 5" />
			</Toolbar>
		);

		// Set initial viewport size to ensure the overflow button is visible
		cy.viewport(300, 1080);

		// Focus on the overflow button
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick()
			.realClick()
			.should("be.focused");

		// Resize the viewport to make the overflow button disappear
		cy.viewport(800, 1080);

		// Verify the focus shifts to the last interactive element outside the overflow popover
		cy.get("[ui5-toolbar-button]")
			.last()
			.should("be.focused");
	});

	it("Should render ui5-button by toolbar template, when slotting ui5-toolbar-button elements", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton
					icon="decline"
					stableDomRef="tb-button-decline"
					overflowPriority="NeverOverflow"
					text="Left 2"
				/>
				<ToolbarButton
					icon="employee"
					overflowPriority="NeverOverflow"
					text="Left 3"
				/>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-button]")
			.first()
			.shadow()
			.find("ui5-button")
			.should("have.prop", "tagName", "UI5-BUTTON");

		cy.viewport(200, 400);

		cy.get("[ui5-toolbar]")
			.find("[ui5-toolbar-button][overflow-priority='NeverOverflow']")
			.should("be.visible")
			.should("have.length", 2);
	});

	it("Should call child events only once", () => {
		cy.mount(
			<>
				<Toolbar data-testid="clickCountToolbar">
					<ToolbarButton
						icon="add"
						text="Left 1 (long)"
						data-testid="clickCounter"
					/>
					<ToolbarButton
						icon="decline"
						text="Left 2"
						data-testid="clearCounter"
					/>
				</Toolbar>
				<input data-testid="input" defaultValue="0" />
			</>
		);

		// Create stubs for event tracking
		cy.get("[data-testid='clickCountToolbar']")
			.as("toolbar")
			.then($toolbar => {
				$toolbar.get(0).addEventListener("click", cy.stub().as("toolbarClickStub"));
			});

		cy.get("[data-testid='clickCounter']")
			.as("clickCounter")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("counterClickStub"));
			});

		cy.get("[data-testid='clearCounter']")
			.as("clearCounter")
			.then($button => {
				$button.get(0).addEventListener("click", cy.stub().as("clearClickStub"));
			});

		// Set up input manipulation logic
		cy.get("@toolbar").then($toolbar => {
			$toolbar.get(0).addEventListener("click", (e) => {
				const input = document.querySelector("[data-testid='input']") as HTMLInputElement;
				const target = e.target as HTMLElement;

				if (target.dataset.testid === "clearCounter") {
					input.value = "0";
				} else if (target.dataset.testid === "clickCounter") {
					let currentValue = parseInt(input.value);
					input.value = `${++currentValue}`;
				}
			});
		});

		cy.get("[data-testid='input']").invoke("val", "0");

		cy.get("@clickCounter").realClick();

		cy.get("[data-testid='input']").should("have.prop", "value", "1");

		cy.get("@toolbarClickStub").should("have.been.calledOnce");
		cy.get("@counterClickStub").should("have.been.calledOnce");

		cy.get("[data-testid='input']").invoke("val", "0");
	});
});

describe("Accessibility", () => {
	it("Should apply accessibile-name to the popover", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Button 1"></ToolbarButton>
				<ToolbarButton text="Button 2"></ToolbarButton>
				<ToolbarButton text="Button 3"></ToolbarButton>
				<ToolbarSelect accessibleName="Select">
					<ToolbarSelectOption>1</ToolbarSelectOption>
					<ToolbarSelectOption>2</ToolbarSelectOption>
					<ToolbarSelectOption>3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.wait(1000);

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "accessible-name", "Available Values");
	});
});

describe("Toolbar in Dialog", () => {
	it("Should correctly process overflow layout when rendered inside a dialog", () => {
		cy.viewport(400, 600);

		cy.mount(
			<div>
				<Button id="open-dialog-button" onClick={() => {
					const dialog = document.getElementById("dialog") as Dialog;
					dialog.open = true;
				}}>Open Dialog</Button>

				<Dialog id="dialog">
					<Toolbar id="toolbar-in-dialog">
						<ToolbarButton icon={add} text="Plus" design="Default"></ToolbarButton>
						<ToolbarButton icon={employee} text="Hire"></ToolbarButton>
						<ToolbarSeparator></ToolbarSeparator>
						<ToolbarButton icon={add} text="Add"></ToolbarButton>
						<ToolbarButton icon={decline} text="Decline"></ToolbarButton>
						<ToolbarSpacer></ToolbarSpacer>
						<ToolbarButton icon={add} text="Append"></ToolbarButton>
						<ToolbarButton icon={employee} text="More"></ToolbarButton>
						<ToolbarButton icon={decline} text="Extra"></ToolbarButton>
						<ToolbarButton icon={add} text="Final"></ToolbarButton>
						<ToolbarButton icon={employee} text="Last"></ToolbarButton>
						<ToolbarButton icon={decline} text="Final"></ToolbarButton>
						<ToolbarButton icon={add} text="Plus"></ToolbarButton>
					</Toolbar>
				</Dialog>
			</div>
		);

		// Open dialog
		cy.get("#open-dialog-button").realClick();
		cy.get<Dialog>("#dialog").ui5DialogOpened();

		// Verify toolbar is rendered inside the dialog
		cy.get("#toolbar-in-dialog")
			.should("exist")
			.should("be.visible");

		// Check that overflow processing has occurred by verifying overflow button exists and is visible
		// Since we have many items in a constrained width, some should overflow
		cy.get("#toolbar-in-dialog")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("exist")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden");
	});
});

describe("ToolbarButton", () => {
	beforeEach(() => {

		cy.mount(
			<Toolbar>
				<ToolbarButton
					text="Back"
					design="Emphasized"
					disabled
					icon="sap-icon://add"
					endIcon="sap-icon://employee"
					tooltip="Add"
				></ToolbarButton>

				<ToolbarButton
					icon="sap-icon://add"
					accessible-name="Add"
					accessible-name-ref="btn"
					accessibilityAttributes={{ expanded: "true", controls: "btn", hasPopup: "dialog" }}
				></ToolbarButton>
			</Toolbar>
		);
	});

	it("Should render the button with the correct accessible name inside the popover", () => {
		cy.viewport(100, 1080);

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		cy.get("[ui5-toolbar-button][accessible-name]").shadow().find(".ui5-tb-button")
			.should("have.attr", "accessible-name", "Add")
			.should("have.attr", "accessible-name-ref", "btn");
	});

	it("Should render the button with the correct accessibilityAttributes inside the popover", () => {
		cy.viewport(100, 1080);

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		cy.get("[ui5-toolbar-button][accessible-name]").shadow().find(".ui5-tb-button")
			.should("have.prop", "accessibilityAttributes")
			.should("deep.include", { expanded: "true", controls: "btn", hasPopup: "dialog" });
	});

	it("Should not recalculate overflow when button state changes without affecting width", () => {
		cy.mount(
			<Toolbar id="state-change-toolbar">
				<ToolbarButton text="Bold" icon="bold-text"></ToolbarButton>
				<ToolbarButton text="Italic" icon="italic-text"></ToolbarButton>
				<ToolbarButton text="Underline" icon="underline-text"></ToolbarButton>
				<ToolbarButton id="add-btn" text="Add" icon="add" disabled></ToolbarButton>
				<ToolbarButton text="More" icon="employee"></ToolbarButton>
			</Toolbar>
		);

		cy.viewport(800, 600);
		cy.get("[ui5-toolbar]").as("toolbar");

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("have.class", "ui5-tb-overflow-btn-hidden");

		cy.viewport(300, 600);

		cy.get("@toolbar")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden");

		cy.get("@toolbar").then($toolbar => {
			const toolbar = $toolbar[0] as Toolbar;
			const addButton = document.getElementById("add-btn") as ToolbarButton;

			expect(toolbar.itemsToOverflow.includes(addButton)).to.be.true;

			const initialOverflowCount = toolbar.itemsToOverflow.length;
			const initialItemsWidth = toolbar.itemsWidth;

			addButton.disabled = !addButton.disabled;

			cy.get("@toolbar").then($toolbarAfter => {
				const toolbarAfter = $toolbarAfter[0] as Toolbar;
				expect(toolbarAfter.itemsToOverflow.length).to.equal(initialOverflowCount);
				expect(toolbarAfter.itemsWidth).to.equal(initialItemsWidth);
			});
		});
	});

	it("Should display text only in overflow when showOverflowText is true", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton
					icon={add}
					text="Add Document"
					showOverflowText={true}
				></ToolbarButton>

				<ToolbarButton
					icon={employee}
					text="Employee"
					showOverflowText={false}
				></ToolbarButton>

				<ToolbarButton
					icon={decline}
					text="Decline Item"
				></ToolbarButton>
			</Toolbar>
		);

		cy.viewport(800, 600);

		cy.get("[ui5-toolbar-button][text='Add Document']")
			.should("have.prop", "isOverflowed", false)
			.shadow()
			.find("[ui5-button]")
			.should("not.contain.text", "Add Document");

		cy.get("[ui5-toolbar-button][text='Employee']")
			.should("have.prop", "isOverflowed", false)
			.shadow()
			.find("[ui5-button]")
			.should("contain.text", "Employee");

		cy.get("[ui5-toolbar-button][text='Decline Item']")
			.should("have.prop", "isOverflowed", false)
			.shadow()
			.find("[ui5-button]")
			.should("contain.text", "Decline Item");

		cy.viewport(100, 600);

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden")
			.realClick();

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-overflow-popover")
			.should("have.attr", "open", "open");

		cy.get("[ui5-toolbar-button][text='Add Document']")
			.should("have.prop", "isOverflowed", true)
			.shadow()
			.find("[ui5-button]")
			.should("contain.text", "Add Document");

		cy.get("[ui5-toolbar-button][text='Employee']")
			.should("have.prop", "isOverflowed", true)
			.shadow()
			.find("[ui5-button]")
			.should("contain.text", "Employee");

		cy.get("[ui5-toolbar-button][text='Decline Item']")
			.should("have.prop", "isOverflowed", true)
			.shadow()
			.find("[ui5-button]")
			.should("contain.text", "Decline Item");
	});
});

describe("Toolbar overflow button accessible name", () => {
	it("should use the default i18n accessible name when overflowButtonAccessibleName is not set", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Add" icon="add" overflow-priority="AlwaysOverflow"></ToolbarButton>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden")
			.should("have.attr", "accessible-name", "Additional Options");
	});

	it("should use the custom accessible name when overflowButtonAccessibleName is set", () => {
		cy.mount(
			<Toolbar overflow-button-accessible-name="More actions for Opportunity 123">
				<ToolbarButton text="Add" icon="add" overflow-priority="AlwaysOverflow"></ToolbarButton>
			</Toolbar>
		);

		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.should("not.have.class", "ui5-tb-overflow-btn-hidden")
			.should("have.attr", "accessible-name", "More actions for Opportunity 123");
	});
});

describe("Toolbar overflow group", () => {
	it("overflows both members of a contiguous group together when only one would otherwise overflow", () => {
		// Four buttons + one container width chosen so that without grouping
		// the rightmost button (and only the rightmost) would overflow. With both
		// "GroupA"/"GroupB" tagged into the same group, both must overflow together.
		cy.mount(
			<div style="width: 260px;">
				<Toolbar id="otb_contiguous_group">
					<ToolbarButton text="Solo1" stableDomRef="solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// Both grouped items must overflow together. At this container width an
		// ungrouped clone would overflow exactly one item (the rightmost one);
		// with the group present, BOTH must move into the popover.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='Solo1']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='Solo2']")
			.should("have.prop", "isOverflowed", false);
	});

	it("keeps an ungrouped item between non-contiguous group members in the bar while both group members overflow", () => {
		// Source order: [GroupA(g), Solo2(ungrouped), Solo3(ungrouped), GroupB(g)].
		// With the chosen width, only the rightmost button would overflow naturally.
		// With grouping, the entire group (A and B) goes to the popover and the
		// ungrouped Solo2/Solo3 between them keep their slot positions in the bar.
		cy.mount(
			<div style="width: 290px;">
				<Toolbar id="otb_noncontiguous_group">
					<ToolbarButton text="Solo1" stableDomRef="ncg-solo1"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="ncg-ga"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="ncg-solo2"></ToolbarButton>
					<ToolbarButton text="Solo3" stableDomRef="ncg-solo3"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="ncg-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// Group members both in popover.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);
		// Ungrouped items between them stay in the visible bar.
		cy.get("[ui5-toolbar-button][text='Solo2']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='Solo3']")
			.should("have.prop", "isOverflowed", false);

		// In the popover, group members appear adjacent and in slot order
		// (GroupA before GroupB), regardless of where ungrouped items sit
		// between them in the source.
		cy.get("#otb_noncontiguous_group").then($tb => {
			const tb = $tb[0] as Toolbar;
			const order = tb.overflowItems.map(it => (it as ToolbarButton).text);
			expect(order).to.deep.equal(["GroupA", "GroupB"]);
		});
	});

	it("returns both group members to the bar when the toolbar widens enough to fit them again", () => {
		// Start wide enough so the group fits, narrow so both group members
		// overflow together, then widen again — both members must come back.
		cy.mount(
			<div id="otb_resize_host" style="width: 600px;">
				<Toolbar id="otb_resize_group">
					<ToolbarButton text="Solo1" stableDomRef="rs-solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="rs-solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="rs-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="rs-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// At 600px, both group members fit in the bar.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", false);

		// Narrow the host — both group members must overflow together.
		cy.get("#otb_resize_host").invoke("attr", "style", "width: 220px;");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);

		// Widen the host — both group members must return to the bar.
		cy.get("#otb_resize_host").invoke("attr", "style", "width: 600px;");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", false);
	});

	it("mirrors the popover order in reverse-overflow mode while keeping the group contiguous", () => {
		// A two-member group + ungrouped items, narrow enough that the group overflows.
		// With reverseOverflow=true (popover placed above the toolbar) the popover list
		// is mirrored: [GroupA, GroupB] becomes [GroupB, GroupA], but the group stays
		// adjacent.
		cy.mount(
			<div style="width: 260px;">
				<Toolbar id="otb_reverse_group">
					<ToolbarButton text="Solo1" stableDomRef="rv-solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="rv-solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="rv-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="rv-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// Flip reverseOverflow on and force a re-render via processOverflowLayout.
		cy.get("#otb_reverse_group").then($tb => {
			const tb = $tb[0] as Toolbar;
			tb.reverseOverflow = true;
		});
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		// The popover items should appear in mirrored order: GroupB before GroupA.
		cy.get("#otb_reverse_group").then($tb => {
			const tb = $tb[0] as Toolbar;
			const order = tb.overflowItems.map(it => (it as ToolbarButton).text);
			expect(order).to.deep.equal(["GroupB", "GroupA"]);
		});
	});

	it("re-distributes when overflowGroup changes on an item at runtime", () => {
		// Start grouped: at this width both grouped items overflow together.
		cy.mount(
			<div style="width: 260px;">
				<Toolbar id="otb_runtime_group">
					<ToolbarButton text="Solo1" stableDomRef="rt-solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="rt-solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="rt-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="rt-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// Baseline: both group members overflow.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);

		// Remove the group from GroupA at runtime. The pair is no longer yoked,
		// and only the rightmost item should remain in the popover.
		cy.get("[ui5-toolbar-button][text='GroupA']").then($el => {
			($el[0] as ToolbarItemBase).overflowGroup = "";
		});
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);
	});

	it("preserves slot order in the visible bar regardless of grouping", () => {
		// Layout in source order: [Solo1, GroupA(g), Solo2, Solo3, GroupB(g)].
		// At the chosen width, the group (A+B) overflows together. The visible bar
		// must keep Solo1, Solo2, Solo3 in that slot order — never reordered to put
		// the group's "remaining" member next to its sibling.
		cy.mount(
			<div style="width: 290px;">
				<Toolbar id="otb_slot_order">
					<ToolbarButton text="Solo1" stableDomRef="so-solo1"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="so-ga"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="so-solo2"></ToolbarButton>
					<ToolbarButton text="Solo3" stableDomRef="so-solo3"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="so-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// The visible bar's standardItems (items not in overflow) must be in slot order.
		cy.get("#otb_slot_order").then($tb => {
			const tb = $tb[0] as Toolbar;
			const barOrder = tb.standardItems.map(it => (it as ToolbarButton).text);
			expect(barOrder).to.deep.equal(["Solo1", "Solo2", "Solo3"]);
		});
	});

	it("pushes a whole group into overflow even when one member's worth of width would have sufficed (atomic over-shoot)", () => {
		// Five buttons in source order: [Solo1, Solo2, GroupA, GroupB, GroupC] where
		// GroupA/B/C share `overflow-group="g"`. At the chosen container width an
		// ungrouped clone would overflow ONLY the rightmost button (GroupC) — that's
		// the worth of width the overflow algorithm "needs" to recover. With the group
		// in place, the entire group (≈3× one button's width) must move to the popover
		// atomically. The over-shoot is accepted by design (ADR-0001).
		cy.mount(
			<div style="width: 340px;">
				<Toolbar id="otb_overshoot_group">
					<ToolbarButton text="Solo1" stableDomRef="ovs-solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="ovs-solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="ovs-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="ovs-gb"></ToolbarButton>
					<ToolbarButton text="GroupC" overflow-group="g" stableDomRef="ovs-gc"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// All three group members go to overflow, not just the rightmost one.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupC']")
			.should("have.prop", "isOverflowed", true);
		// Solo items remain in the bar — extra empty space is the accepted cost.
		cy.get("[ui5-toolbar-button][text='Solo1']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='Solo2']")
			.should("have.prop", "isOverflowed", false);
	});

	it("warns once for AlwaysOverflow on a grouped item and treats its priority as Default for the layout pass", () => {
		// GroupA has both `overflow-group="g"` AND `overflowPriority="AlwaysOverflow"`.
		// ADR-0001 forbids this combination: the warning fires once, the priority is
		// dropped to `Default` for the layout pass, and the group's atomic-overflow
		// contract is preserved (GroupA and GroupB go together — decided by space,
		// not by the now-ignored absolute priority).
		cy.window().then(win => {
			cy.stub(win.console, "warn").as("warn");
		});

		cy.mount(
			<div style="width: 600px;">
				<Toolbar id="otb_priority_violation_always">
					<ToolbarButton text="Solo1" stableDomRef="pva-solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="pva-solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" overflow-priority="AlwaysOverflow" stableDomRef="pva-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="pva-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// At 600px both group members fit in the bar — the AlwaysOverflow priority
		// would otherwise force GroupA into the popover; under the validation rule
		// it is dropped to Default and the whole group stays atomically in the bar.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", false);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", false);

		// Force another layout pass — the warning must NOT re-fire.
		cy.get("#otb_priority_violation_always").then($tb => {
			($tb[0] as Toolbar).onResize();
		});
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		// Exactly one warning, naming the offending element and the rule.
		cy.get("@warn").should("have.been.calledOnce");
		cy.get("@warn").its("firstCall.args.0").should("match", /overflow-group/i);
		cy.get("@warn").its("firstCall.args.0").should("match", /AlwaysOverflow|priority/i);
	});

	it("warns once for NeverOverflow on a grouped item and treats its priority as Default for the layout pass", () => {
		// GroupA has both `overflow-group="g"` AND `overflowPriority="NeverOverflow"`.
		// Under the ADR-0001 rule, the warning fires once and the priority is dropped
		// to `Default` for the layout pass — so when the toolbar is narrowed enough
		// for the group to need overflow, GroupA can in fact overflow (alongside GroupB).
		cy.window().then(win => {
			cy.stub(win.console, "warn").as("warn");
		});

		cy.mount(
			<div style="width: 260px;">
				<Toolbar id="otb_priority_violation_never">
					<ToolbarButton text="Solo1" stableDomRef="pvn-solo1"></ToolbarButton>
					<ToolbarButton text="Solo2" stableDomRef="pvn-solo2"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" overflow-priority="NeverOverflow" stableDomRef="pvn-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="pvn-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// With the priority dropped, both grouped items overflow atomically.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);

		// Force another layout pass — the warning must NOT re-fire.
		cy.get("#otb_priority_violation_never").then($tb => {
			($tb[0] as Toolbar).onResize();
		});
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		// Exactly one warning, naming the offending element and the rule.
		cy.get("@warn").should("have.been.calledOnce");
		cy.get("@warn").its("firstCall.args.0").should("match", /overflow-group/i);
		cy.get("@warn").its("firstCall.args.0").should("match", /NeverOverflow|priority/i);
	});

	it("warns once for a spacer with overflow-group and leaves the spacer's overflow behavior unchanged (not yoked to the group)", () => {
		// A fixed-width spacer tagged with the same group as two buttons. The buttons
		// overflow together; the spacer is NOT yoked — it stays in the visible bar.
		// One spacer-rule warning fires once across re-renders.
		cy.window().then(win => {
			cy.stub(win.console, "warn").as("warn");
		});

		cy.mount(
			<div style="width: 220px;">
				<Toolbar id="otb_spacer_violation">
					<ToolbarButton text="Solo1" stableDomRef="spv-solo1"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="g" stableDomRef="spv-ga"></ToolbarButton>
					<ToolbarSpacer width="40px" overflow-group="g"></ToolbarSpacer>
					<ToolbarButton text="GroupB" overflow-group="g" stableDomRef="spv-gb"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// Both grouped buttons overflow.
		cy.get("[ui5-toolbar-button][text='GroupA']")
			.should("have.prop", "isOverflowed", true);
		cy.get("[ui5-toolbar-button][text='GroupB']")
			.should("have.prop", "isOverflowed", true);

		// The spacer is NOT yoked — it stays in the bar (its existing overflow
		// behavior is unaffected by the group tag).
		cy.get("#otb_spacer_violation").then($tb => {
			const tb = $tb[0] as Toolbar;
			const spacer = tb.items.find(it => it.isSpacer)!;
			expect(spacer.isOverflowed, "spacer must not be yoked into the group's overflow").to.equal(false);
			expect(tb.standardItems, "spacer must remain a standard (visible) item").to.include(spacer);
		});

		// Force another layout pass — the spacer warning must NOT re-fire.
		cy.get("#otb_spacer_violation").then($tb => {
			($tb[0] as Toolbar).onResize();
		});
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		// Exactly one warning, naming the spacer and the rule.
		cy.get("@warn").should("have.been.calledOnce");
		cy.get("@warn").its("firstCall.args.0").should("match", /overflow-group/i);
		cy.get("@warn").its("firstCall.args.0").should("match", /spacer/i);
	});

	it("warns for the canonical flex-spacer case (no width, default priority) with a non-empty overflow-group", () => {
		// The default `<ui5-toolbar-spacer>` has no width and `overflow-priority="Default"` —
		// so it sits in `movableItems` like a normal item. Putting `overflow-group` on it must
		// still trip the spacer-rule warning even though `ignoreSpace` removes it from the
		// popover render and visible bar regardless of the group.
		cy.window().then(win => {
			cy.stub(win.console, "warn").as("warn");
		});

		cy.mount(
			<div style="width: 600px;">
				<Toolbar id="otb_spacer_violation_flex">
					<ToolbarButton text="Solo1" stableDomRef="spvf-solo1"></ToolbarButton>
					<ToolbarSpacer overflow-group="g"></ToolbarSpacer>
					<ToolbarButton text="Solo2" stableDomRef="spvf-solo2"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		cy.get("@warn").should("have.been.calledOnce");
		cy.get("@warn").its("firstCall.args.0").should("match", /spacer/i);
	});

	it("does not warn for valid configurations: grouped Default-priority items and ungrouped spacers", () => {
		// All combinations here are valid by ADR-0001: two items share a non-empty
		// group with the default priority, and a spacer carries no group tag.
		// The toolbar must remain silent — no `console.warn` calls.
		cy.window().then(win => {
			cy.stub(win.console, "warn").as("warn");
		});

		cy.mount(
			<div style="width: 600px;">
				<Toolbar id="otb_no_warnings">
					<ToolbarButton text="Solo1" stableDomRef="nw-solo1"></ToolbarButton>
					<ToolbarButton text="GroupA" overflow-group="filters" stableDomRef="nw-ga"></ToolbarButton>
					<ToolbarButton text="GroupB" overflow-group="filters" stableDomRef="nw-gb"></ToolbarButton>
					<ToolbarSpacer></ToolbarSpacer>
					<ToolbarButton text="Solo2" overflow-priority="NeverOverflow" stableDomRef="nw-solo2"></ToolbarButton>
				</Toolbar>
			</div>
		);

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);

		// Trigger an extra layout pass for good measure.
		cy.get("#otb_no_warnings").then($tb => {
			($tb[0] as Toolbar).onResize();
		});
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(200);

		cy.get("@warn").should("not.have.been.called");
	});
});
