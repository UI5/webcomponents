import TabularInput from "../../src/TabularInput.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import type ResponsivePopover from "../../src/ResponsivePopover.js";

describe("TabularInput - Basic Rendering", () => {
	it("renders with tabular suggestions", () => {
		cy.mount(
			<TabularInput>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableHeaderCell slot="suggestionColumns">Country</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
					<TableCell>USA</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
					<TableCell>UK</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]").should("exist");
		cy.get("[ui5-tabular-input]").find("[ui5-table-header-cell]").should("have.length", 2);
		cy.get("[ui5-tabular-input]").find("[ui5-table-row]").should("have.length", 2);
	});

	it("opens suggestions popover on focus and type", () => {
		cy.mount(
			<TabularInput showSuggestions>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

describe("TabularInput - Highlighting", () => {
	it("highlights matching text in cells", () => {
		cy.mount(
			<TabularInput showSuggestions>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John Smith</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("john");

		cy.get("@input")
			.shadow()
			.find("[ui5-table-cell]")
			.first()
			.find("b")
			.should("exist")
			.and("have.text", "John");
	});
});

describe("TabularInput - Keyboard Navigation", () => {
	it("navigates through rows with Arrow Down/Up", () => {
		cy.mount(
			<TabularInput showSuggestions noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jack</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

	it("restores typed value when pressing Arrow Up from first row", () => {
		cy.mount(
			<TabularInput showSuggestions noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions onSelectionChange={onSelectionChange}>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

describe("TabularInput - Row Selection", () => {
	it("selects row on click", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<TabularInput showSuggestions onSelectionChange={onSelectionChange} noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find("[ui5-table-row]")
			.eq(1)
			.realClick();

		cy.get("@input").should("have.value", "Jane");
		cy.get("@onSelectionChange").should("have.been.called");
	});

	it("fires selection-change event during navigation", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<TabularInput showSuggestions onSelectionChange={onSelectionChange}>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.realPress("ArrowDown");
		cy.get("@onSelectionChange").should("have.been.called");
	});

	it("does not fire duplicate selection-change when pressing Enter on already focused row", () => {
		const onSelectionChange = cy.spy().as("onSelectionChange");

		cy.mount(
			<TabularInput showSuggestions onSelectionChange={onSelectionChange} noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

describe("TabularInput - Typeahead", () => {
	it("performs typeahead with first matching row", () => {
		cy.mount(
			<TabularInput showSuggestions>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "john");

		cy.window().then(win => {
			const selection = win.getSelection()?.toString();
			expect(selection).to.contain("hn");
		});
	});

	it("disables typeahead with noTypeahead property", () => {
		cy.mount(
			<TabularInput showSuggestions noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "jo");
	});
});

describe("TabularInput - Clear Icon", () => {
	it("shows clear icon when value is present", () => {
		cy.mount(
			<TabularInput showSuggestions showClearIcon>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions showClearIcon>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

describe("TabularInput - Overflow Mode", () => {
	it("renders with Popin overflow mode by default", () => {
		cy.mount(
			<TabularInput>
				<TableHeaderCell slot="suggestionColumns" width="100px">Col1</TableHeaderCell>
				<TableHeaderCell slot="suggestionColumns" width="100px">Col2</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>Cell1</TableCell>
					<TableCell>Cell2</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.should("have.attr", "overflow-mode", "Popin");
	});

	it("accepts Scroll overflow mode", () => {
		cy.mount(
			<TabularInput overflowMode="Scroll">
				<TableHeaderCell slot="suggestionColumns" width="100px">Col1</TableHeaderCell>
				<TableHeaderCell slot="suggestionColumns" width="100px">Col2</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>Cell1</TableCell>
					<TableCell>Cell2</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.should("have.attr", "overflow-mode", "Scroll");
	});
});

describe("TabularInput - Value State", () => {
	it("displays value state", () => {
		cy.mount(
			<TabularInput showSuggestions valueState="Negative">
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.should("have.attr", "value-state", "Negative");
	});

	it("shows value state header in suggestions popover", () => {
		cy.mount(
			<TabularInput showSuggestions valueState="Negative">
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions valueState="Information">
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
				<div slot="valueStateMessage">Custom info message</div>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions valueState="Negative">
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

describe("TabularInput - showSuggestions Property", () => {
	it("does not open suggestions popover when showSuggestions is false", () => {
		cy.mount(
			<TabularInput showSuggestions={false}>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
			<TabularInput showSuggestions>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("j");

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("have.attr", "open");
	});

	it("does not perform typeahead when showSuggestions is false", () => {
		cy.mount(
			<TabularInput showSuggestions={false}>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input").realType("jo");

		cy.get("@input").should("have.value", "jo");
	});

	it("shows value state popover when showSuggestions is false and has value state", () => {
		cy.mount(
			<TabularInput showSuggestions={false} valueState="Negative">
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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

describe("TabularInput - Disabled and Readonly", () => {
	it("does not open popover when disabled", () => {
		cy.mount(
			<TabularInput showSuggestions disabled>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick({ force: true });

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});

	it("does not open popover when readonly", () => {
		cy.mount(
			<TabularInput showSuggestions readonly>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
			.as("input")
			.realClick();

		cy.get("@input")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.should("not.have.attr", "open");
	});
});

describe("TabularInput - Accessibility", () => {
	it("announces row position and all column values during navigation", () => {
		cy.mount(
			<TabularInput showSuggestions noTypeahead>
				<TableHeaderCell slot="suggestionColumns">Name</TableHeaderCell>
				<TableHeaderCell slot="suggestionColumns">Country</TableHeaderCell>
				<TableRow slot="suggestionRows">
					<TableCell>John</TableCell>
					<TableCell>USA</TableCell>
				</TableRow>
				<TableRow slot="suggestionRows">
					<TableCell>Jane</TableCell>
					<TableCell>UK</TableCell>
				</TableRow>
			</TabularInput>
		);

		cy.get("[ui5-tabular-input]")
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
