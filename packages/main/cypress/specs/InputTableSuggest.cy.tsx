import InputTableSuggest from "../../src/InputTableSuggest.js";
import InputTableSuggestHeaderRow from "../../src/InputTableSuggestHeaderRow.js";
import InputTableSuggestHeaderCell from "../../src/InputTableSuggestHeaderCell.js";
import InputTableSuggestRow from "../../src/InputTableSuggestRow.js";
import InputTableSuggestCell from "../../src/InputTableSuggestCell.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

describe("InputTableSuggest - Basic Rendering", () => {
	it("renders with tabular suggestions", () => {
		cy.mount(
			<InputTableSuggest>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
					<InputTableSuggestHeaderCell>Country</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
					<InputTableSuggestCell>USA</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
					<InputTableSuggestCell>UK</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]").should("exist");
		cy.get("[ui5-input-table-suggest]").find("[ui5-table-header-cell]").should("have.length", 2);
		cy.get("[ui5-input-table-suggest]").find("[ui5-table-row]").should("have.length", 2);
	});

	it("owned row/cell types reflect both their own tag and the base table attribute", () => {
		cy.mount(
			<InputTableSuggest>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		// The owned elements carry their own registered tag as an attribute...
		cy.get("[ui5-input-table-suggest]").find("[ui5-input-table-suggest-header-row]").should("have.length", 1);
		cy.get("[ui5-input-table-suggest]").find("[ui5-input-table-suggest-header-cell]").should("have.length", 1);
		cy.get("[ui5-input-table-suggest]").find("[ui5-input-table-suggest-row]").should("have.length", 1);
		cy.get("[ui5-input-table-suggest]").find("[ui5-input-table-suggest-cell]").should("have.length", 1);

		// ...and re-toggle the base table attribute so InputTableSuggest's
		// attribute-based lookups and the table CSS keep working unchanged.
		cy.get("[ui5-input-table-suggest]").find("[ui5-table-header-row]").should("have.length", 1);
		cy.get("[ui5-input-table-suggest]").find("[ui5-table-header-cell]").should("have.length", 1);
		cy.get("[ui5-input-table-suggest]").find("[ui5-table-row]").should("have.length", 1);
		cy.get("[ui5-input-table-suggest]").find("[ui5-table-cell]").should("have.length", 1);
	});


	it("opens suggestions popover on focus and type", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("closes suggestions popover on Escape", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.realPress("Escape");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});
});

describe("InputTableSuggest - Keyboard Navigation", () => {
	it("navigates through rows with Arrow Down/Up", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jack</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");
		cy.get("@input").should("have.value", "John");

		cy.realPress("ArrowDown");
		cy.get("@input").should("have.value", "Jane");

		cy.realPress("ArrowDown");
		cy.get("@input").should("have.value", "Jack");

		cy.realPress("ArrowUp");
		cy.get("@input").should("have.value", "Jane");
	});

	it("selects text during navigation", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");

		cy.get("@input").should("have.value", "John");

		cy.window().then(win => {
			const selection = win.getSelection()?.toString();
			expect(selection).to.contain("ohn");
		});
	});

	it("moves visual focus back to the input when typing after navigating", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.find("[ui5-table-row].ui5-input-table-suggest-row--focused")
			.should("exist");

		cy.get("@input").realType("a");

		cy.get("@input")
			.find("[ui5-table-row].ui5-input-table-suggest-row--focused")
			.should("not.exist");
	});

	it("keeps the popover open when navigating to a row whose first cell has no text", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Icon</InputTableSuggestHeaderCell>
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell></InputTableSuggestCell>
					<InputTableSuggestCell>Alice</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell></InputTableSuggestCell>
					<InputTableSuggestCell>Anna</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("a");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@input")
			.find("[ui5-table-row].ui5-input-table-suggest-row--focused")
			.should("exist");
	});

	it("restores typed value when pressing Arrow Up from first row", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.realPress("ArrowDown");
		cy.get("@input").should("have.value", "John");

		cy.realPress("ArrowUp");
		cy.get("@input").should("have.value", "jo");
	});

	it("selects row with Enter key", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<InputTableSuggest showSuggestions onSelectionChange={onSelectionChange}>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");
		cy.realPress("Enter");

		cy.get("@input").should("have.value", "John");
		cy.get("@onSelectionChange").should("have.been.called");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});
});

describe("InputTableSuggest - Row Selection", () => {
	it("selects row on click", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<InputTableSuggest showSuggestions onSelectionChange={onSelectionChange} noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.find("[ui5-table-row]")
			.eq(1)
			.realClick();

		cy.get("@input").should("have.value", "Jane");
		cy.get("@onSelectionChange").should("have.been.called");
	});

	it("fires selection-change event during navigation", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<InputTableSuggest showSuggestions onSelectionChange={onSelectionChange}>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");
		cy.get("@onSelectionChange").should("have.been.called");
	});

	it("does not fire duplicate selection-change when pressing Enter on already focused row", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<InputTableSuggest showSuggestions onSelectionChange={onSelectionChange} noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		// Navigate to first row - this fires selection-change once
		cy.realPress("ArrowDown");
		cy.get("@onSelectionChange").should("have.been.calledOnce");

		// Press Enter on the already focused row - should NOT fire selection-change again
		cy.realPress("Enter");
		cy.get("@input").should("have.value", "John");
		cy.get("@onSelectionChange").should("have.been.calledOnce");
	});
});

describe("InputTableSuggest - Typeahead", () => {
	it("performs typeahead with first matching row", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "john");

		cy.window().then(win => {
			const selection = win.getSelection()?.toString();
			expect(selection).to.contain("hn");
		});
	});

	it("resets row selection on backspace after typeahead", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "john");

		// The matching row is selected after typeahead
		cy.get("@input")
			.find("[ui5-table-row]")
			.first()
			.should("have.prop", "selected", true);

		cy.realPress("Backspace");

		// The autocompleted portion is removed and the selection is reset
		cy.get("@input").should("have.value", "jo");

		cy.get("@input")
			.find("[ui5-table-row]")
			.first()
			.should("have.prop", "selected", false);
	});

	it("keeps the row selected when the typed value matches a row exactly", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("john");

		cy.get("@input").should("have.value", "john");

		cy.get("@input")
			.find("[ui5-table-row]")
			.first()
			.should("have.prop", "selected", true);
	});

	it("disables typeahead with noTypeahead property", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "jo");
	});
});

describe("InputTableSuggest - Clear Icon", () => {
	it("shows clear icon when value is present", () => {
		cy.mount(
			<InputTableSuggest showSuggestions showClearIcon>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("test");

		cy.get("@input")
			.shadow()
			.find(".ui5-input-clear-icon-wrapper")
			.should("exist");
	});

	it("clears value when clicking clear icon", () => {
		cy.mount(
			<InputTableSuggest showSuggestions showClearIcon>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("test");

		cy.get("@input")
			.shadow()
			.find(".ui5-input-clear-icon-wrapper")
			.realClick();

		cy.get("@input").should("have.value", "");
	});
});

describe("InputTableSuggest - Value State", () => {
	it("displays value state", () => {
		cy.mount(
			<InputTableSuggest showSuggestions valueState="Negative">
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.should("have.attr", "value-state", "Negative");
	});

	it("shows value state header in suggestions popover", () => {
		cy.mount(
			<InputTableSuggest showSuggestions valueState="Negative">
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover] [slot='header']")
			.should("exist")
			.find("[ui5-icon]")
			.should("exist");
	});

	it("shows custom value state message from slot", () => {
		cy.mount(
			<InputTableSuggest showSuggestions valueState="Information">
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<div slot="valueStateMessage">Custom info message</div>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover] [slot='header'] slot[name='valueStateMessage']")
			.should("exist");
	});

	it("shows standalone value state popover when focused without typing", () => {
		cy.mount(
			<InputTableSuggest showSuggestions valueState="Negative">
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.have.attr", "open");

		cy.get("@input")
			.shadow()
			.find("[ui5-popover].ui5-valuestatemessage-popover")
			.should("have.attr", "open");
	});
});

describe("InputTableSuggest - showSuggestions Property", () => {
	it("does not open suggestions popover when showSuggestions is false", () => {
		cy.mount(
			<InputTableSuggest showSuggestions={false}>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("does not open suggestions popover when showSuggestions is not set (defaults to false)", () => {
		cy.mount(
			<InputTableSuggest>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("opens suggestions popover when showSuggestions is true", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("performs typeahead and row selection with the popover closed when showSuggestions is false", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<InputTableSuggest showSuggestions={false} onSelectionChange={onSelectionChange}>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "john");

		cy.get("@input")
			.find("[ui5-table-row]")
			.first()
			.should("have.prop", "selected", true);
		cy.get("@onSelectionChange").should("have.been.called");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("shows value state popover when showSuggestions is false and has value state", () => {
		cy.mount(
			<InputTableSuggest showSuggestions={false} valueState="Negative">
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find("[ui5-popover].ui5-valuestatemessage-popover")
			.should("have.attr", "open");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});
});

describe("InputTableSuggest - Disabled and Readonly", () => {
	it("does not open popover when disabled", () => {
		cy.mount(
			<InputTableSuggest showSuggestions disabled>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick({ force: true });

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("does not open popover when readonly", () => {
		cy.mount(
			<InputTableSuggest showSuggestions readonly>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});
});

describe("InputTableSuggest - Popover open (app-owned filtering)", () => {
	it("opens popover with all items even when the typed value matches no row", () => {
		cy.mount(
			<InputTableSuggest showSuggestions>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("x");

		// Filtering is the app's responsibility; the component opens with all rows.
		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@input")
			.find("[ui5-table-row]")
			.should("have.length", 2);
	});

	it("keeps popover open when the value no longer matches any row", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("@input").realType("x");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("does not open popover when the app hides all rows", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input");

		// Simulate app-side filtering: hide every row. The rows are the app's own
		// elements projected into the internal table, so they remain in the light DOM;
		// setting `hidden` on them filters them out.
		cy.get("@input").then($input => {
			const host = $input[0];
			const rows = host.querySelectorAll<HTMLElement>("[ui5-table-row]");
			rows.forEach(row => {
				row.hidden = true;
			});
		});

		cy.get("@input").realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("closes popover when the value is deleted (empty)", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.realPress("Backspace");

		cy.get("@input").should("have.value", "");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});
});

describe("InputTableSuggest - Live slotted content", () => {
	it("reflects app-driven cell mutations without re-mounting (real elements, not clones)", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.find("[ui5-table-row] [ui5-table-cell]")
			.first()
			.should("have.text", "John");

		cy.get("@input")
			.find("[ui5-table-row] [ui5-table-cell]")
			.first()
			.then($cell => {
				$cell[0].textContent = "Johnny";
			});

		cy.get("@input")
			.find("[ui5-table-row] [ui5-table-cell]")
			.first()
			.should("have.text", "Johnny");
	});

	it("navigation uses the mutated cell value", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.find("[ui5-table-row] [ui5-table-cell]")
			.first()
			.then($cell => {
				$cell[0].textContent = "Johnny";
			});

		cy.realPress("ArrowDown");
		cy.get("@input").should("have.value", "Johnny");
	});
});

describe("InputTableSuggest - Accessibility", () => {
	it("announces row position and all column values during navigation", () => {
		cy.mount(
			<InputTableSuggest showSuggestions noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
					<InputTableSuggestHeaderCell>Country</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>John</InputTableSuggestCell>
					<InputTableSuggestCell>USA</InputTableSuggestCell>
				</InputTableSuggestRow>
				<InputTableSuggestRow>
					<InputTableSuggestCell>Jane</InputTableSuggestCell>
					<InputTableSuggestCell>UK</InputTableSuggestCell>
				</InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.shadow()
			.find("#selectionText")
			.should("contain.text", "Row 1 of 2")
			.and("contain.text", "Name: John")
			.and("contain.text", "Country: USA");

		cy.realPress("ArrowDown");

		cy.get("@input")
			.shadow()
			.find("#selectionText")
			.should("contain.text", "Row 2 of 2")
			.and("contain.text", "Name: Jane")
			.and("contain.text", "Country: UK");
	});
});

describe("InputTableSuggest - change event", () => {
	it("fires change once on typeahead + blur when showSuggestions is false", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<InputTableSuggest showSuggestions={false} onChange={onChange}>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow><InputTableSuggestCell>John</InputTableSuggestCell></InputTableSuggestRow>
				<InputTableSuggestRow><InputTableSuggestCell>Jane</InputTableSuggestCell></InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]").as("input").realClick();
		cy.get("@input").realType("jo");
		cy.get("@input").should("have.value", "john");

		cy.realPress("Tab");
		cy.get("@onChange").should("have.been.calledOnce");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("fires change once on row click (no duplicate on the following blur)", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<InputTableSuggest showSuggestions onChange={onChange} noTypeahead>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow><InputTableSuggestCell>John</InputTableSuggestCell></InputTableSuggestRow>
				<InputTableSuggestRow><InputTableSuggestCell>Jane</InputTableSuggestCell></InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]").as("input").realClick();
		cy.get("@input").realType("j");
		cy.get("@input").find("[ui5-table-row]").eq(1).realClick();
		cy.get("@input").should("have.value", "Jane");

		cy.realPress("Tab");
		cy.get("@onChange").should("have.been.calledOnce");
	});

	it("fires change once on Enter selection (no duplicate on the following blur)", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<InputTableSuggest showSuggestions onChange={onChange}>
				<InputTableSuggestHeaderRow slot="headerRow">
					<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
				</InputTableSuggestHeaderRow>
				<InputTableSuggestRow><InputTableSuggestCell>John</InputTableSuggestCell></InputTableSuggestRow>
				<InputTableSuggestRow><InputTableSuggestCell>Jane</InputTableSuggestCell></InputTableSuggestRow>
			</InputTableSuggest>
		);

		cy.get("[ui5-input-table-suggest]").as("input").realClick();
		cy.get("@input").realType("j");
		cy.realPress("ArrowDown");
		cy.realPress("Enter");
		cy.get("@input").should("have.value", "Jane");

		cy.realPress("Tab");
		cy.get("@onChange").should("have.been.calledOnce");
	});

	it("fires change once when blurring outside with the popover open", () => {
		const onChange = cy.spy().as("onChange");
		cy.mount(
			<>
				<InputTableSuggest showSuggestions onChange={onChange}>
					<InputTableSuggestHeaderRow slot="headerRow">
						<InputTableSuggestHeaderCell>Name</InputTableSuggestHeaderCell>
					</InputTableSuggestHeaderRow>
					<InputTableSuggestRow><InputTableSuggestCell>John</InputTableSuggestCell></InputTableSuggestRow>
					<InputTableSuggestRow><InputTableSuggestCell>Jane</InputTableSuggestCell></InputTableSuggestRow>
				</InputTableSuggest>
				<button id="outside">outside</button>
			</>
		);

		cy.get("[ui5-input-table-suggest]").as("input").realClick();
		cy.get("@input").realType("jo");
		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");

		cy.get("#outside").realClick();
		cy.get("@onChange").should("have.been.calledOnce");
	});
});
