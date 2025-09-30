import Input from "../../src/Input.js";
import "../../src/features/InputSuggestions.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import { INPUT_SUGGESTIONS_OK_BUTTON, INPUT_SUGGESTIONS_CANCEL_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";

describe("Input on mobile device", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});
	
	it("checks OK and Cancel button text in dialog on mobile device", () => {
		cy.mount(
			<Input showSuggestions={true}>
				<SuggestionItem text="First item"></SuggestionItem>
				<SuggestionItem text="Second item"></SuggestionItem>
			</Input>
		);

		cy.get("[ui5-input]")
			.as("input");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.invoke("attr", "open", true);

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.find("[ui5-button]")
			.eq(0)
			.should("have.text", INPUT_SUGGESTIONS_OK_BUTTON.defaultText);

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.find("[ui5-button]")
			.eq(1)
			.should("have.text", INPUT_SUGGESTIONS_CANCEL_BUTTON.defaultText);
	});
});

describe("Basic mobile picker rendering and interaction", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should render properly the mobile picker", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput2").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();
		cy.get("#myInput2").shadow().find(".ui5-input-inner-phone").should("be.visible");
		cy.get("#myInput2").shadow().find(".ui5-responsive-popover-close-btn").should("be.visible");
		cy.get("#myInput2").shadow().find(".ui5-responsive-popover-footer ui5-button").should("be.visible");
	});

	it("Should focus the input after picker is opened", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions={true}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput2").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();
		cy.get("#myInput2").shadow().find(".ui5-input-inner-phone").should("have.attr", "focused");
	});

	it("Should close the mobile picker dialog when pressing the close button", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions={true}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput2").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverOpened();
		cy.get("#myInput2").shadow().find(".ui5-responsive-popover-close-btn").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverClosed();
	});

	it("Should close the mobile picker dialog when pressing the OK button", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput2").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverOpened();
		cy.get("#myInput2").shadow().find(".ui5-responsive-popover-footer ui5-button").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverClosed();
	});

	it("Should propagate the placeholder to the internal input", () => {
		cy.mount(
			<Input id="myInput" placeholder="Enter text" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#myInput").realClick();
		cy.get("#myInput").shadow().find(".ui5-input-inner-phone").should("have.attr", "placeholder", "Enter text");
	});
});

describe("Eventing", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should fire events with correct parameters on item press", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");
		const onChange = cy.spy().as("onChange");
		const onInput = cy.spy().as("onInput");

		cy.mount(
			<>
				<Input id="myInput" showSuggestions={true} onSelectionChange={onSelectionChange} onChange={onChange} onInput={onInput}>
					<SuggestionItem text="Bulgaria" />
					<SuggestionItem text="Brazil" />
					<SuggestionItem text="Bg" />
				</Input>
			</>
		);

		cy.get("#myInput").realClick();
		cy.get("#myInput")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();

		cy.get("#myInput").shadow().find(".ui5-input-inner-phone").should("be.focused");
		cy.get("#myInput").shadow().find(".ui5-input-inner-phone").realType("b");
		cy.get("#myInput").find("ui5-suggestion-item").eq(2).realClick();

		cy.get("#myInput")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverClosed();

		cy.get("@onSelectionChange").should("have.been.called");
		cy.get("@onChange").should("have.been.called");
		cy.get("@onInput").should("have.been.called");
	});

	it("tests selection-change with custom items", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<>
				<Input id="input-custom-flat" showSuggestions onSelectionChange={onSelectionChange}>
					<SuggestionItem text="Albania" />
					<SuggestionItem text="Argentina" />
				</Input>
				<div id="custom-items-selection-change-count" />
				<div id="custom-items-selection-item-index" />
			</>
		);

		cy.get("#input-custom-flat").shadow().find("input").realClick();
		cy.get("#input-custom-flat").shadow().find(".ui5-input-inner-phone").realType("a");
		cy.get("#input-custom-flat").find("ui5-suggestion-item").first().realClick();

		cy.get("@onSelectionChange").should("have.been.calledOnce");
	});
});

describe("Typeahead", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should autocomplete the first matched suggestion item", () => {
		cy.mount(
			<Input id="myInput2" showSuggestions={true}>
				<SuggestionItem text="Cozy" />
				<SuggestionItem text="Compact" />
			</Input>
		);

		cy.get("#myInput2").realClick();
		cy.get("#myInput2")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();

		cy.get("#myInput2").shadow().find(".ui5-input-inner-phone").should("be.focused");
		cy.get("#myInput2").shadow().find(".ui5-input-inner-phone").realType("c");
		cy.get("#myInput2").shadow().find(".ui5-input-inner-phone").should("have.value", "Cozy");
	});

	it("Should not perform typeahead when it is disabled", () => {
		cy.mount(
			<Input id="input-disabled-autocomplete" showSuggestions={true} noTypeahead={true}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#input-disabled-autocomplete").realClick();
		cy.get("#input-disabled-autocomplete")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();

		cy.get("#input-disabled-autocomplete").shadow().find(".ui5-input-inner-phone").should("be.focused");
		cy.get("#input-disabled-autocomplete").shadow().find(".ui5-input-inner-phone").realType("c");
		cy.get("#input-disabled-autocomplete").shadow().find(".ui5-input-inner-phone").should("have.value", "c");
	});

	it("Tests autocomplete(type-ahead) of custom suggestions", () => {
		cy.mount(
			<Input id="input-custom-flat" showSuggestions={true}>
				<SuggestionItem text="Albania" />
				<SuggestionItem text="Argentina" />
				<SuggestionItem text="Australia" />
			</Input>
		);

		cy.get("#input-custom-flat").realClick();
		cy.get("#input-custom-flat")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();

		cy.get("#input-custom-flat").shadow().find(".ui5-input-inner-phone").should("be.focused");
		cy.get("#input-custom-flat").shadow().find(".ui5-input-inner-phone").realType("a");
		cy.get("#input-custom-flat").shadow().find(".ui5-input-inner-phone").should("have.value", "Albania");
	});
});

describe("Clear icon", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should show the clear icon of the dialog's input when text is entered", () => {
		cy.mount(
			<Input id="clear-input-suggestions" showSuggestions={true} showClearIcon={true}>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#clear-input-suggestions").realClick();
		cy.get("#clear-input-suggestions")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();

		cy.get("#clear-input-suggestions").shadow().find(".ui5-input-inner-phone").should("be.focused");
		cy.get("#clear-input-suggestions").shadow().find(".ui5-input-inner-phone").should("not.have.attr", "_effective-show-clear-icon");
		cy.get("#clear-input-suggestions").shadow().find(".ui5-input-inner-phone").realType("t");
		cy.get("#clear-input-suggestions").shadow().find(".ui5-input-inner-phone").should("have.attr", "_effective-show-clear-icon");
	});
});

describe("Picker filtering", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should filter items", () => {
		const items = [
			{ text: "Bulgaria", key: "bulgaria" },
			{ text: "Brazil", key: "brazil" },
			{ text: "Belgium", key: "belgium" },
			{ text: "Belarus", key: "belarus" },
		];

		const filterSuggestions = (e) => {
			const value = e.target.value;
			const filteredItems = items.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));
			e.target.innerHTML = "";

			filteredItems.forEach(item => {
				const suggestion = document.createElement("ui5-suggestion-item");
				(suggestion as SuggestionItem).text = item.text;
				e.target.appendChild(suggestion);
			});
		}

		cy.mount(
			<Input id="myInput" showSuggestions={true} onInput={filterSuggestions}></Input>
		);

		cy.get("#myInput").realClick();
		cy.get("#myInput")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.as("popover")
		.ui5ResponsivePopoverOpened();

		cy.get("#myInput").shadow().find(".ui5-input-inner-phone").should("be.focused");
		cy.get("#myInput").find("ui5-suggestion-item").should("have.length", 0);
		cy.get("#myInput").shadow().find(".ui5-input-inner-phone").realType("B");
		cy.get("#myInput").find("ui5-suggestion-item").should("have.length", 4);
	});
});

describe("Value state header", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Should show value state header inside mobile dialog", () => {
		cy.mount(
			<Input id="inputError" valueState="Negative" showSuggestions>
				<SuggestionItem text="China" />
				<SuggestionItem text="Chile" />
			</Input>
		);

		cy.get("#inputError").realClick();
		cy.get("#inputError").shadow().find(".ui5-valuestatemessage-header").should("be.visible");
	});
});

describe("Property open", () => {
	beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});

	it("Suggestions dialog is open when attribute open is true", () => {
		cy.mount(
			<Input id="input-suggestions-open" showSuggestions open>
				<SuggestionItem text="Item 1" />
				<SuggestionItem text="Item 2" />
				<SuggestionItem text="Item 3" />
			</Input>
		);

		cy.get("#input-suggestions-open")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverOpened();
		cy.get("#input-suggestions-open").find("ui5-suggestion-item").should("have.length", 3);
	});

	it("Suggestions dialog is closed when attribute open is set to false", () => {
		cy.mount(
			<Input id="input-suggestions-open" showSuggestions open={false}>
				<SuggestionItem text="Item 1" />
				<SuggestionItem text="Item 2" />
				<SuggestionItem text="Item 3" />
			</Input>
		);

		cy.get("#input-suggestions-open")
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverClosed();
	});
});