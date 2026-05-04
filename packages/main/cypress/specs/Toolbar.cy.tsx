import Toolbar from "../../src/Toolbar.js";
import ToolbarButton from "../../src/ToolbarButton.js";
import ToolbarSelect from "../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../src/ToolbarSelectOption.js";
import ToolbarSeparator from "../../src/ToolbarSeparator.js";
import ToolbarSpacer from "../../src/ToolbarSpacer.js";
import ToolbarItem from "../../src/ToolbarItem.js";
import CheckBox from "../../src/CheckBox.js";
import Input from "../../src/Input.js";
import RadioButton from "../../src/RadioButton.js";
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

	it("Should navigate between items with arrow keys", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarButton text="Second"></ToolbarButton>
				<ToolbarButton text="Third"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button")
			.first()
			.shadow()
			.find("ui5-button")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-toolbar-button")
			.eq(1)
			.shadow()
			.find("ui5-button")
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-toolbar-button")
			.eq(2)
			.shadow()
			.find("ui5-button")
			.should("be.focused");
	});

	it("Should navigate with Home and End keys", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarButton text="Second"></ToolbarButton>
				<ToolbarButton text="Third"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button")
			.first()
			.shadow()
			.find("ui5-button")
			.realClick()
			.should("be.focused");

		cy.realPress("End");
		cy.get("ui5-toolbar-button")
			.eq(2)
			.shadow()
			.find("ui5-button")
			.should("be.focused");

		cy.realPress("Home");
		cy.get("ui5-toolbar-button")
			.first()
			.shadow()
			.find("ui5-button")
			.should("be.focused");
	});

	it("Should restore last focused item on re-entry", () => {
		cy.mount(
			<div>
				<input data-testid="before" />
				<Toolbar>
					<ToolbarButton text="First"></ToolbarButton>
					<ToolbarButton text="Second"></ToolbarButton>
					<ToolbarButton text="Third"></ToolbarButton>
				</Toolbar>
				<input data-testid="after" />
			</div>
		);

		// Focus second button
		cy.get("ui5-toolbar-button")
			.eq(1)
			.shadow()
			.find("ui5-button")
			.realClick()
			.should("be.focused");

		// Tab out
		cy.realPress("Tab");

		// Tab back in - should restore second button
		cy.realPress(["Shift", "Tab"]);
		cy.get("ui5-toolbar-button")
			.eq(1)
			.shadow()
			.find("ui5-button")
			.should("be.focused");
	});

	it("Should let ToolbarSelect handle its own arrow keys", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Before"></ToolbarButton>
				<ToolbarSelect>
					<ToolbarSelectOption>One</ToolbarSelectOption>
					<ToolbarSelectOption selected>Two</ToolbarSelectOption>
					<ToolbarSelectOption>Three</ToolbarSelectOption>
				</ToolbarSelect>
				<ToolbarButton text="After"></ToolbarButton>
			</Toolbar>
		);

		// Focus the select
		cy.get("ui5-toolbar-select")
			.shadow()
			.find("ui5-select")
			.realClick();

		// ArrowDown should stay on the select (select handles it), not move to "After"
		cy.realPress("ArrowDown");
		cy.get("ui5-toolbar-button")
			.last()
			.should("not.be.focused");
	});

	it("Should keep selected radio when moving to next toolbar item with ArrowRight", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<RadioButton name="group1" text="Option 1" />
					<RadioButton name="group1" text="Option 2" />
					<RadioButton name="group1" text="Option 3" checked />
				</ToolbarItem>
				<ToolbarItem>
					<CheckBox text="Checkbox 1"></CheckBox>
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-radio-button[text='Option 3']")
			.realClick()
			.should("be.focused")
			.and("have.prop", "checked", true);

		cy.realPress("ArrowRight");

		cy.get("ui5-checkbox[text='Checkbox 1']")
			.should("be.focused");

		cy.get("ui5-radio-button[text='Option 3']")
			.should("have.prop", "checked", true);
		cy.get("ui5-radio-button[text='Option 1']")
			.should("have.prop", "checked", false);
	});

	it("Should navigate within radio group before moving to next toolbar item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<RadioButton name="group1" text="Option 1" checked />
					<RadioButton name="group1" text="Option 2" />
					<RadioButton name="group1" text="Option 3" />
				</ToolbarItem>
				<ToolbarItem>
					<CheckBox text="Checkbox 1"></CheckBox>
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-radio-button[text='Option 1']")
			.realClick()
			.should("be.focused")
			.and("have.prop", "checked", true);

		cy.realPress("ArrowRight");

		cy.get("ui5-radio-button[text='Option 2']")
			.and("have.prop", "checked", true);
		cy.get("ui5-radio-button[text='Option 1']")
			.should("have.prop", "checked", false);

		cy.get("ui5-checkbox[text='Checkbox 1']")
			.should("not.be.focused");
	});

	it("Should select last radio when entering radio group backwards", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<RadioButton name="group1" text="Option 1" checked />
					<RadioButton name="group1" text="Option 2" />
					<RadioButton name="group1" text="Option 3" />
				</ToolbarItem>
				<ToolbarItem>
					<Input placeholder="Next input" />
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("ui5-radio-button[text='Option 3']")
			.should("have.prop", "checked", true)
			.and("be.focused");
		cy.get("ui5-radio-button[text='Option 1']")
			.should("have.prop", "checked", false);
	});

	it("Should keep navigation inside radio group from middle item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<RadioButton name="group1" text="Option 1" />
					<RadioButton name="group1" text="Option 2" checked />
					<RadioButton name="group1" text="Option 3" />
				</ToolbarItem>
				<ToolbarItem>
					<CheckBox text="Checkbox 1"></CheckBox>
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-radio-button[text='Option 2']")
			.realClick()
			.should("be.focused")
			.and("have.prop", "checked", true);

		cy.realPress("ArrowRight");

		cy.get("ui5-radio-button[text='Option 3']")
			.should("be.focused")
			.and("have.prop", "checked", true);

		cy.get("ui5-checkbox[text='Checkbox 1']")
			.should("not.be.focused");
	});

	it("Should navigate within checkbox group before moving to next toolbar item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<CheckBox text="Checkbox 1" />
					<CheckBox text="Checkbox 2" />
					<CheckBox text="Checkbox 3" />
				</ToolbarItem>
				<ToolbarItem>
					<Input placeholder="Next input" />
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-checkbox[text='Checkbox 1']")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-checkbox[text='Checkbox 2']")
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-checkbox[text='Checkbox 3']")
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-input")
			.shadow()
			.find("input")
			.should("be.focused");
	});

	it("Should enter checkbox group from the end when navigating backwards", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<CheckBox text="Checkbox 1" />
					<CheckBox text="Checkbox 2" />
					<CheckBox text="Checkbox 3" />
				</ToolbarItem>
				<ToolbarItem>
					<Input placeholder="Next input" />
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("ui5-checkbox[text='Checkbox 3']")
			.should("be.focused");
	});

	it("Should navigate between toolbar-item wrapped controls with arrow keys", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem><Button>First</Button></ToolbarItem>
				<ToolbarItem><Button>Second</Button></ToolbarItem>
				<ToolbarItem><Button>Third</Button></ToolbarItem>
			</Toolbar>
		);

		cy.get("ui5-button")
			.first()
			.shadow()
			.find("button")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-button")
			.eq(1)
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-button")
			.last()
			.should("be.focused");
	});

	it("Should exit toolbar with Tab from generic toolbar-item", () => {
		cy.mount(
			<div>
				<Toolbar>
					<ToolbarItem>
						<CheckBox text="Checkbox 1"></CheckBox>
						<CheckBox text="Checkbox 2" checked></CheckBox>
						<CheckBox text="Checkbox 3"></CheckBox>
					</ToolbarItem>
					<ToolbarItem>
						<Input placeholder="Enter text"></Input>
					</ToolbarItem>
				</Toolbar>
				<input data-testid="after-toolbar" />
			</div>
		);

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress("Tab");

		cy.get("[data-testid='after-toolbar']")
			.should("be.focused");
	});

	it("Should exit toolbar with Shift+Tab from generic toolbar-item", () => {
		cy.mount(
			<div>
				<input data-testid="before-toolbar" />
				<Toolbar>
					<ToolbarItem>
						<CheckBox text="Checkbox 1"></CheckBox>
					</ToolbarItem>
					<ToolbarItem>
						<Input placeholder="Enter text"></Input>
					</ToolbarItem>
				</Toolbar>
			</div>
		);

		cy.get("ui5-input")
			.shadow()
			.find("input")
			.realClick();

		cy.realPress(["Shift", "Tab"]);

		cy.get("[data-testid='before-toolbar']")
			.should("be.focused");
	});

	it("Should skip non-interactive items during navigation", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarSeparator></ToolbarSeparator>
				<ToolbarSpacer></ToolbarSpacer>
				<ToolbarButton text="Last"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button")
			.first()
			.shadow()
			.find("ui5-button")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-toolbar-button")
			.last()
			.shadow()
			.find("ui5-button")
			.should("be.focused");
	});

	it("Should swap arrow behavior in RTL", () => {
		cy.mount(
			<Toolbar dir="rtl">
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarButton text="Second"></ToolbarButton>
				<ToolbarButton text="Third"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button")
			.first()
			.shadow()
			.find("ui5-button")
			.realClick()
			.should("be.focused");

		// In RTL, ArrowLeft moves forward
		cy.realPress("ArrowLeft");
		cy.get("ui5-toolbar-button")
			.eq(1)
			.shadow()
			.find("ui5-button")
			.should("be.focused");
	});

	it("Should exit input at end boundary with ArrowRight to next toolbar item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<Input id="inp1" value="hello"></Input>
				</ToolbarItem>
				<ToolbarButton id="after-btn" text="After"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#inp1").shadow().find("input")
			.realClick()
			.then($input => {
				const input = $input[0] as HTMLInputElement;
				input.setSelectionRange(input.value.length, input.value.length);
			});

		cy.realPress("ArrowRight");

		cy.get("#after-btn")
			.should("be.focused");
	});

	it("Should NOT exit input when ArrowRight is pressed and caret is not at end", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<Input id="inp2" value="hello"></Input>
				</ToolbarItem>
				<ToolbarButton id="after-btn2" text="After"></ToolbarButton>
			</Toolbar>
		);

		cy.get("#inp2").shadow().find("input")
			.realClick()
			.then($input => {
				const input = $input[0] as HTMLInputElement;
				input.setSelectionRange(1, 1);
			});

		cy.realPress("ArrowRight");

		cy.get("#inp2").shadow().find("input")
			.should("be.focused");
	});

	it("Should exit input at start boundary with ArrowLeft to previous toolbar item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton id="before-btn" text="Before"></ToolbarButton>
				<ToolbarItem>
					<Input id="inp3" value="hello"></Input>
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("#inp3").shadow().find("input")
			.realClick()
			.then($input => {
				const input = $input[0] as HTMLInputElement;
				input.setSelectionRange(0, 0);
			});

		cy.realPress("ArrowLeft");

		cy.get("#before-btn")
			.should("be.focused");
	});

	it("Should wrap from last to first item with ArrowRight", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarButton text="Second"></ToolbarButton>
				<ToolbarButton text="Third"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button").last().shadow().find("ui5-button")
			.realClick().should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-toolbar-button").first().shadow().find("ui5-button")
			.should("be.focused");
	});

	it("Should wrap from first to last item with ArrowLeft", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarButton text="Second"></ToolbarButton>
				<ToolbarButton text="Third"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button").first().shadow().find("ui5-button")
			.realClick().should("be.focused");

		cy.realPress("ArrowLeft");
		cy.get("ui5-toolbar-button").last().shadow().find("ui5-button")
			.should("be.focused");
	});

	it("Should use Home/End for toolbar navigation when ToolbarSelect is closed", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="First"></ToolbarButton>
				<ToolbarSelect>
					<ToolbarSelectOption>One</ToolbarSelectOption>
					<ToolbarSelectOption selected>Two</ToolbarSelectOption>
				</ToolbarSelect>
				<ToolbarButton text="Last"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button").first().shadow().find("ui5-button")
			.realClick().should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-toolbar-select").shadow().find("ui5-select")
			.should("be.focused");

		cy.realPress("Home");
		cy.get("ui5-toolbar-button").first().shadow().find("ui5-button")
			.should("be.focused");
	});

	it("Should mark disabled toolbar items with aria-disabled and exclude from tab order", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Enabled"></ToolbarButton>
				<ToolbarButton text="Disabled" disabled></ToolbarButton>
				<ToolbarButton text="Also Enabled"></ToolbarButton>
			</Toolbar>
		);

		cy.get("ui5-toolbar-button[text='Disabled']")
			.shadow()
			.find("ui5-button")
			.should("have.attr", "aria-disabled", "true")
			.and("have.prop", "tabIndex", -1);

		cy.get("ui5-toolbar-button[text='Enabled']")
			.shadow()
			.find("ui5-button")
			.realClick()
			.should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("ui5-toolbar-button[text='Also Enabled']")
			.shadow()
			.find("ui5-button")
			.should("be.focused");
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
		cy.get("[ui5-toolbar]")
			.shadow()
			.find(".ui5-tb-item")
			.eq(3)
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

