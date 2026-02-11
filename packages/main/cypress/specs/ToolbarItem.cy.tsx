import Toolbar from "../../src/Toolbar.js";
import ToolbarItem from "../../src/ToolbarItem.js";
import Button from "../../src/Button.js";
import Switch from "../../src/Switch.js";
import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import DatePicker from "../../src/DatePicker.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";

describe("Toolbar Item Properties", () => {
	it("Should render ui5-toolbar-item with correct properties and not suppress events", () => {
		// Mount the Toolbar with a ui5-toolbar-item wrapping a web component
		cy.mount(
			<Toolbar>
				<ToolbarItem prevent-overflow-closing overflow-priority="AlwaysOverflow">
					<Button id="innerButton" icon="employee">User Menu</Button>
				</ToolbarItem>
			</Toolbar>
		);

		// Verify the ui5-toolbar-item has the correct properties
		cy.get("[ui5-toolbar-item]").should((item) => {
			expect(item).to.have.attr("prevent-overflow-closing");
			expect(item).to.have.attr("overflow-priority", "AlwaysOverflow");
		});

		// Verify the inner component (ui5-button) is rendered
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-button]").should((button) => {
				expect(button).to.exist;
				expect(button).to.contain.text("User Menu");
			});

		// Attach a click event to the inner button
		cy.get("[ui5-button]#innerButton")
			.then(button => {
				// Add your event logic here
			});
	});
});

describe("Toolbar Item Closing Events - closeOverflowSet functionality", () => {
	it("Should close overflow popover when ui5-button 'click' event is fired", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-button-close">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<Button id="closeButton">Close Overflow</Button>
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-button-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-button-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Click the button inside the overflow
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-button]")
			.realClick();

		// Verify popover is closed
		cy.get("#toolbar-button-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should close overflow popover when ui5-select 'change' event is fired", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-select-close">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<Select id="closeSelect">
						<Option>Option 1</Option>
						<Option>Option 2</Option>
						<Option>Option 3</Option>
					</Select>
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-select-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-select-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Open the select and choose an option
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-select]")
			.realClick();

		// Select a different option
		cy.get("[ui5-option]")
			.eq(1)
			.realClick();
		
			cy.wait(500); // Wait for the change event to propagate and popover to close

		// Verify popover is closed after select change
		cy.get("#toolbar-select-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should close overflow popover when ui5-combobox 'change' event is fired", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-combobox-close">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<ComboBox id="closeComboBox" placeholder="Select item">
						<ComboBoxItem text="Item 1" />
						<ComboBoxItem text="Item 2" />
						<ComboBoxItem text="Item 3" />
					</ComboBox>
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-combobox-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-combobox-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Open the combobox by clicking the dropdown arrow icon
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-combobox]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		// Wait for combobox popover to open and select an item
		cy.get("[ui5-combobox]")
			.find("[ui5-cb-item]")
			.first()
			.realClick();

		// Verify popover is closed after combobox change
		cy.get("#toolbar-combobox-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should close overflow popover when ui5-multi-combobox 'selection-change' event is fired", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-multi-combobox-close">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<MultiComboBox id="closeMultiComboBox" placeholder="Select items">
						<MultiComboBoxItem text="Item 1" />
						<MultiComboBoxItem text="Item 2" />
						<MultiComboBoxItem text="Item 3" />
					</MultiComboBox>
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-multi-combobox-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-multi-combobox-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Open the multi-combobox
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-multi-combobox]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		// Check an item - this triggers selection-change event
		cy.get("[ui5-multi-combobox]")
			.find("[ui5-mcb-item]")
			.first()
			.realClick();

		// Verify toolbar popover is closed after multi-combobox selection-change
		cy.get("#toolbar-multi-combobox-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should close overflow popover when ui5-date-picker 'change' event is fired", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-datepicker-close">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<DatePicker id="closeDatePicker" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-datepicker-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-datepicker-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Open date picker
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-date-picker]")
			.shadow()
			.find("[ui5-icon]")
			.realClick();

		// Select today's date by clicking on today cell
		cy.get("[ui5-calendar]", { includeShadowDom: true })
			.find("[ui5-daypicker]", { includeShadowDom: true })
			.shadow()
			.find(".ui5-dp-item--now")
			.realClick();

		// Verify popover is closed after date picker change
		cy.get("#toolbar-datepicker-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should close overflow popover when ui5-switch 'change' event is fired", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-switch-close">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<Switch id="closeSwitch" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-switch-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-switch-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Toggle the switch using realClick
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-switch]")
			.shadow()
			.find(".ui5-switch-root")
			.realClick();

		// Verify popover is closed after switch change
		cy.get("#toolbar-switch-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should NOT close overflow popover when preventOverflowClosing is set", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-prevent-close">
				<ToolbarItem overflow-priority="AlwaysOverflow" prevent-overflow-closing>
					<Button id="noCloseButton">Keep Open</Button>
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-prevent-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-prevent-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Click the button inside the overflow
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-button]")
			.realClick();

		// Verify popover is still open
		cy.get("#toolbar-prevent-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);
	});

	it("Should NOT close overflow popover when preventOverflowClosing is set on ui5-switch", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-switch-prevent-close">
				<ToolbarItem overflow-priority="AlwaysOverflow" prevent-overflow-closing>
					<Switch id="noCloseSwitch" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-switch-prevent-close")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-switch-prevent-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Toggle the switch
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-switch]")
			.realClick();

		// Verify popover is still open since preventOverflowClosing is set
		cy.get("#toolbar-switch-prevent-close")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);
	});

	it("Should fire close-overflow event when closing event is triggered", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-close-event">
				<ToolbarItem overflow-priority="AlwaysOverflow" id="testToolbarItem">
					<Button id="eventButton">Fire Event</Button>
				</ToolbarItem>
			</Toolbar>
		);

		// Add event listener for close-overflow
		cy.get("#testToolbarItem")
			.then($item => {
				$item.get(0).addEventListener("close-overflow", cy.stub().as("closeOverflowStub"));
			});

		// Open overflow popover
		cy.get("#toolbar-close-event")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Click the button to trigger closing
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-button]")
			.realClick();

		// Verify close-overflow event was fired
		cy.get("@closeOverflowStub")
			.should("have.been.calledOnce");
	});

	it("Should handle multiple components with different closing events in toolbar", () => {
		cy.viewport(200, 600);

		cy.mount(
			<Toolbar id="toolbar-multiple-components">
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<Button id="multiButton1">Button 1</Button>
				</ToolbarItem>
				<ToolbarItem overflow-priority="AlwaysOverflow">
					<Switch id="multiSwitch" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-multiple-components")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-multiple-components")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Toggle the switch (fires 'change' event)
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-switch]")
			.shadow()
			.find(".ui5-switch-root")
			.realClick();

		// Verify popover is closed
		cy.get("#toolbar-multiple-components")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);

		// Re-open overflow popover
		cy.get("#toolbar-multiple-components")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open again
		cy.get("#toolbar-multiple-components")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Click the button (fires 'click' event)
		cy.get("[ui5-toolbar-item]")
			.find("[ui5-button]")
			.realClick();

		// Verify popover is closed
		cy.get("#toolbar-multiple-components")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should return correct closing events via getClosingEvents for button", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem id="buttonToolbarItem">
					<Button>Test Button</Button>
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("#buttonToolbarItem")
			.then($item => {
				const toolbarItem = $item.get(0) as ToolbarItem;
				const closingEvents = toolbarItem.getClosingEvents();
				expect(closingEvents).to.include("click");
			});
	});

	it("Should return correct closing events via getClosingEvents for select", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem id="selectToolbarItem">
					<Select>
						<Option>Option 1</Option>
					</Select>
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("#selectToolbarItem")
			.then($item => {
				const toolbarItem = $item.get(0) as ToolbarItem;
				const closingEvents = toolbarItem.getClosingEvents();
				expect(closingEvents).to.include("change");
			});
	});

	it("Should return correct closing events via getClosingEvents for switch", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem id="switchToolbarItem">
					<Switch />
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("#switchToolbarItem")
			.then($item => {
				const toolbarItem = $item.get(0) as ToolbarItem;
				const closingEvents = toolbarItem.getClosingEvents();
				expect(closingEvents).to.include("change");
			});
	});
});

/**
 * Custom component that implements IOverflowToolbarItem with overflowCloseEvents
 * This simulates a component that defines its own custom closing events
 */
class CustomOverflowComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot!.innerHTML = `
			<button id="customBtn">Custom Component</button>
		`;
	}

	// Implements IOverflowToolbarItem.overflowCloseEvents
	get overflowCloseEvents(): string[] {
		return ["custom-action", "custom-change"];
	}

	fireCustomAction() {
		this.dispatchEvent(new CustomEvent("custom-action", { bubbles: true }));
	}

	fireCustomChange() {
		this.dispatchEvent(new CustomEvent("custom-change", { bubbles: true }));
	}
}

// Register the custom element if not already registered
if (!customElements.get("custom-overflow-component")) {
	customElements.define("custom-overflow-component", CustomOverflowComponent);
}

/**
 * Custom component that implements IOverflowToolbarItem with additional custom events
 * Used to test combining predefined closeOverflowSet events with component's overflowCloseEvents
 */
class CustomButtonWithExtraEvents extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot!.innerHTML = `<button>Custom Button</button>`;
	}

	get overflowCloseEvents(): string[] {
		return ["extra-event"];
	}

	fireExtraEvent() {
		this.dispatchEvent(new CustomEvent("extra-event", { bubbles: true }));
	}
}

// Register the custom element if not already registered
if (!customElements.get("custom-button-extra")) {
	customElements.define("custom-button-extra", CustomButtonWithExtraEvents);
}

// @ts-ignore - Custom element JSX type
const CustomOverflowComponentRenderer = (props: { id: string }) => <custom-overflow-component id={props.id} />;

describe("Toolbar Item Closing Events - overflowCloseEvents functionality (IOverflowToolbarItem)", () => {
	it("Should close overflow popover when custom component fires 'custom-action' event from overflowCloseEvents", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-custom-action">
				<ToolbarItem overflow-priority="AlwaysOverflow" id="customActionItem">
					<CustomOverflowComponentRenderer id="customComponent1" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-custom-action")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-custom-action")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Fire the custom-action event from the component
		cy.get("#customComponent1")
			.then($el => {
				const component = $el.get(0) as CustomOverflowComponent;
				component.fireCustomAction();
			});

		// Verify popover is closed
		cy.get("#toolbar-custom-action")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should close overflow popover when custom component fires 'custom-change' event from overflowCloseEvents", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-custom-change">
				<ToolbarItem overflow-priority="AlwaysOverflow" id="customChangeItem">
					<CustomOverflowComponentRenderer id="customComponent2" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-custom-change")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-custom-change")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Fire the custom-change event from the component
		cy.get("#customComponent2")
			.then($el => {
				const component = $el.get(0) as CustomOverflowComponent;
				component.fireCustomChange();
			});

		// Verify popover is closed
		cy.get("#toolbar-custom-change")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", false);
	});

	it("Should return custom closing events via getClosingEvents for component with overflowCloseEvents", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem id="customToolbarItem">
					<CustomOverflowComponentRenderer id="customComponent3" />
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("#customToolbarItem")
			.then($item => {
				const toolbarItem = $item.get(0) as ToolbarItem;
				const closingEvents = toolbarItem.getClosingEvents();
				expect(closingEvents).to.include("custom-action");
				expect(closingEvents).to.include("custom-change");
			});
	});

	it("Should NOT close overflow popover with custom events when preventOverflowClosing is set", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-custom-prevent">
				<ToolbarItem overflow-priority="AlwaysOverflow" prevent-overflow-closing id="customPreventItem">
					<CustomOverflowComponentRenderer id="customComponent4" />
				</ToolbarItem>
			</Toolbar>
		);

		// Open overflow popover
		cy.get("#toolbar-custom-prevent")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Verify popover is open
		cy.get("#toolbar-custom-prevent")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);

		// Fire the custom-action event from the component
		cy.get("#customComponent4")
			.then($el => {
				const component = $el.get(0) as CustomOverflowComponent;
				component.fireCustomAction();
			});

		// Verify popover is still open since preventOverflowClosing is set
		cy.get("#toolbar-custom-prevent")
			.shadow()
			.find("[ui5-popover]")
			.should("have.prop", "open", true);
	});

	it("Should fire close-overflow event when custom overflowCloseEvents event is triggered", () => {
		cy.viewport(300, 600);

		cy.mount(
			<Toolbar id="toolbar-custom-event-fire">
				<ToolbarItem overflow-priority="AlwaysOverflow" id="customEventItem">
					<CustomOverflowComponentRenderer id="customComponent5" />
				</ToolbarItem>
			</Toolbar>
		);

		// Add event listener for close-overflow
		cy.get("#customEventItem")
			.then($item => {
				$item.get(0).addEventListener("close-overflow", cy.stub().as("closeOverflowStub"));
			});

		// Open overflow popover
		cy.get("#toolbar-custom-event-fire")
			.shadow()
			.find(".ui5-tb-overflow-btn")
			.realClick();

		// Fire the custom-action event from the component
		cy.get("#customComponent5")
			.then($el => {
				const component = $el.get(0) as CustomOverflowComponent;
				component.fireCustomAction();
			});

		// Verify close-overflow event was fired
		cy.get("@closeOverflowStub")
			.should("have.been.calledOnce");
	});

	it("Should combine predefined closeOverflowSet events with component's overflowCloseEvents", () => {
		// @ts-ignore - Custom element JSX type
		const CustomButtonExtraRenderer = (props: { id: string }) => <custom-button-extra id={props.id} />;

		cy.mount(
			<Toolbar>
				<ToolbarItem id="combinedEventsItem">
					<CustomButtonExtraRenderer id="customButtonExtra" />
				</ToolbarItem>
			</Toolbar>
		);

		cy.get("#combinedEventsItem")
			.then($item => {
				const toolbarItem = $item.get(0) as ToolbarItem;
				const closingEvents = toolbarItem.getClosingEvents();
				// Should include the custom overflowCloseEvents
				expect(closingEvents).to.include("extra-event");
			});
	});
});