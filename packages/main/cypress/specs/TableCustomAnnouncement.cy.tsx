import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableRowAction from "../../src/TableRowAction.js";
import TableRowActionNavigation from "../../src/TableRowActionNavigation.js";
import TableHeaderCellActionAI from "../../src/TableHeaderCellActionAI.js";
import Label from "../../src/Label.js";
import Button from "../../src/Button.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import edit from "@ui5/webcomponents-icons/dist/edit.js";
import "../../src/TableSelectionSingle.js";
import * as Translations from "../../src/generated/i18n/i18n-defaults.js";

const {
	TABLE_CELL_MULTIPLE_CONTROLS: { defaultText: CONTAINS_CONTROLS },
	TABLE_CELL_SINGLE_CONTROL: { defaultText: CONTAINS_CONTROL },
	TABLE_ACC_STATE_READONLY: { defaultText: READONLY },
	TABLE_ACC_STATE_DISABLED: { defaultText: DISABLED },
	TABLE_ACC_STATE_REQUIRED: { defaultText: REQUIRED },
	TABLE_ROW_SINGLE_ACTION: { defaultText: ONE_ROW_ACTION },
	TABLE_ROW_MULTIPLE_ACTIONS: { defaultText: MULTIPLE_ACTIONS },
	TABLE_ACC_STATE_EMPTY: { defaultText: EMPTY },
	TABLE_GENERATED_BY_AI: { defaultText: GENERATED_BY_AI },
	TABLE_ROW_ACTIONS: { defaultText: ROW_ACTIONS },
	TABLE_COLUMNHEADER_SELECTALL_DESCRIPTION: { defaultText: SELECT_ALL_CHECKBOX },
	TABLE_COLUMNHEADER_SELECTALL_CHECKED: { defaultText: CHECKED },
	TABLE_COLUMNHEADER_SELECTALL_NOT_CHECKED: { defaultText: NOT_CHECKED },
	TABLE_COLUMNHEADER_CLEARALL_DESCRIPTION: { defaultText: CLEAR_ALL_BUTTON },
	TABLE_SELECTION: { defaultText: SELECTION },
	TABLE_COLUMN_HEADER_ROW: { defaultText: COLUMN_HEADER_ROW },
	TABLE_ROW_SELECTED: { defaultText: SELECTED },
	TABLE_ROW_NAVIGABLE: { defaultText: NAVIGABLE },
	TABLE_ROW_NAVIGATED: { defaultText: NAVIGATED },
	TABLE_ROW_ACTIVE: { defaultText: ACTIVE },
} = Translations;

describe("Cell Custom Announcement - More details", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table0" rowActionCount={3}>
				<TableSelectionMulti slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell sort-indicator="Ascending">
						<Label required>Header1</Label>
						<TableHeaderCellActionAI slot="action"></TableHeaderCellActionAI>
					</TableHeaderCell>
					<TableHeaderCell data-ui5-table-acc-text="Header2"><input/></TableHeaderCell>
					<TableHeaderCell><div>Header3</div></TableHeaderCell>
					<TableHeaderCell sort-indicator="Descending"></TableHeaderCell>
				</TableHeaderRow>
				<TableRow navigated>
					<TableCell>
						Row1Cell1
						<div dangerouslySetInnerHTML={{ __html: "<!-- Let's make sure that comments are ignored in the announcement -->" }} />
					</TableCell>
					<TableCell><input id="row1-input1" value="Row1Input1"/><input id="row1-input2" value="Row1Input2" hidden/></TableCell>
					<TableCell><div id="row1-div"><b></b></div></TableCell>
					<TableCell><Button id="row1-button">Row1Cell3</Button></TableCell>
					<TableRowActionNavigation slot="actions" id="row1-nav-action"></TableRowActionNavigation>
					<TableRowAction slot="actions" id="row1-add-action" icon={add} text="Add"></TableRowAction>
					<TableRowAction slot="actions" id="row1-edit-action" icon={edit} text="Edit"></TableRowAction>
				</TableRow>
			</Table>
		);

		cy.get("#table0").children("ui5-table-row").as("rows");
		cy.get("#table0").children("ui5-table-header-row").first().as("headerRow");
		cy.get("#table0").shadow().find("#table").as("innerTable");
		cy.get("@rows").first().as("row1");
		cy.get("@row1").find("#row1-button").as("row1Button");
		cy.get("@row1").find("#row1-input1").as("row1Input1");
		cy.get("@row1").find("#row1-input2").as("row1Input2");
		cy.get("@row1").find("#row1-div").as("row1Div");
		cy.get("@row1").shadow().find("#navigated-cell").as("row1NavigatedCell");
	});

	function checkAnnouncement(expectedText: string, focusAgain = false) {
		if (focusAgain) {
			cy.realPress("ArrowUp");
			cy.realPress("ArrowDown");
		}

		cy.get("body").then($body => {
			debugger;
			expect($body.find("#ui5-table-invisible-text").text()).to.equal(expectedText);
		});
	}

	it("should announce table cells", () => {
		cy.get("@row1").realClick(); // row focused
		cy.focused().should("have.attr", "aria-rowindex", "2")
					.should("have.attr", "role", "row");

		cy.realPress("ArrowRight"); // selection cell focused
		checkAnnouncement("");
		cy.focused().should("have.attr", "aria-colindex", "1")
					.should("have.attr", "role", "gridcell");

		cy.realPress("ArrowRight"); // first cell focused
		checkAnnouncement("Row1Cell1");
		cy.focused().should("have.attr", "aria-colindex", "2")
					.should("have.attr", "role", "gridcell");

		cy.realPress("ArrowRight"); // second cell focused
		checkAnnouncement(CONTAINS_CONTROL);
		cy.focused().should("have.attr", "aria-colindex", "3")
					.should("have.attr", "role", "gridcell");

		cy.get("@row1Input2").invoke("removeAttr", "hidden");
		checkAnnouncement(CONTAINS_CONTROLS, true);

		cy.get("@row1Input1").invoke("attr", "data-ui5-table-acc-text", "Input with custom accessibility text");
		checkAnnouncement(`Input with custom accessibility text . ${CONTAINS_CONTROLS}`, true);

		cy.realPress("ArrowRight"); // third cell focused
		checkAnnouncement(EMPTY);
		cy.focused().should("have.attr", "aria-colindex", "4")
					.should("have.attr", "role", "gridcell");

		cy.get("@row1Div").invoke("attr", "tabindex", "0");
		cy.get("@row1Div").invoke("css", "width", "150px");
		cy.get("@row1Div").focus();
		cy.realPress("F2");
		checkAnnouncement(CONTAINS_CONTROL, true);

		cy.realPress("ArrowRight"); // fourth cell focused
		checkAnnouncement(`Button Row1Cell3 . ${CONTAINS_CONTROL}`);
		cy.focused().should("have.attr", "aria-colindex", "5")
					.should("have.attr", "role", "gridcell");

		cy.document().then((doc) => {
			const row1Button = doc.getElementById("row1-button") as Button;
			cy.stub(row1Button, "accessibilityInfo").get(() => ({
				type: "Button",
				description: "Row1Cell3Button",
				required: true,
				disabled: true,
				readonly: true,
			}));
		});
		checkAnnouncement(`Button Row1Cell3Button ${REQUIRED} ${DISABLED} ${READONLY} . ${CONTAINS_CONTROL}`, true);

		cy.get("@row1Button").invoke("attr", "data-ui5-table-acc-text", "Button with custom accessibility text");
		checkAnnouncement(`Button with custom accessibility text . ${CONTAINS_CONTROL}`, true);

		cy.realPress("ArrowRight"); // Row actions cell
		checkAnnouncement(Table.i18nBundle.getText(MULTIPLE_ACTIONS, 2));
		cy.focused().should("have.attr", "aria-colindex", "6")
					.should("have.attr", "role", "gridcell")
					.then($rowActionsCell => {
						const rowActionsCell = $rowActionsCell[0];
						const invisibleText = document.getElementById("ui5-table-invisible-text");
						expect(rowActionsCell.ariaLabelledByElements[0]).to.equal(invisibleText);
						rowActionsCell.blur();
						expect(rowActionsCell.ariaLabelledByElements).to.equal(null);
						rowActionsCell.focus();
					});

		cy.get("#row1-edit-action").invoke("remove");
		checkAnnouncement(ONE_ROW_ACTION, true);

		cy.get("#row1-add-action").invoke("remove");
		checkAnnouncement(EMPTY, true);

		cy.get("@row1NavigatedCell").should("have.attr", "role", "none")
									.should("have.attr", "aria-hidden", "true");

		cy.realPress("Home"); // selection cell focused
		checkAnnouncement("");
	});

	it("should announce table header cells", () => {
		cy.get("@headerRow").realClick(); // header row focused
		cy.focused().should("have.attr", "aria-rowindex", "1")
					.should("have.attr", "role", "row");

		cy.realPress("ArrowRight"); // selection cell focused
		checkAnnouncement("");
		cy.focused().should("have.attr", "aria-colindex", "1")
					.should("have.attr", "role", "columnheader");

		cy.realPress("ArrowRight"); // first cell focused
		checkAnnouncement(`Header1 ${GENERATED_BY_AI} . ${CONTAINS_CONTROL}`);
		cy.focused().should("have.attr", "aria-colindex", "2")
					.should("have.attr", "role", "columnheader")
					.should("have.attr", "aria-sort", "ascending");

		cy.realPress("ArrowRight"); // second cell focused
		checkAnnouncement("Header2");
		cy.focused().should("have.attr", "aria-colindex", "3")
					.should("have.attr", "role", "columnheader");

		cy.realPress("ArrowRight"); // third cell focused
		checkAnnouncement("Header3");
		cy.focused().should("have.attr", "aria-colindex", "4")
					.should("have.attr", "role", "columnheader");

		cy.realPress("ArrowRight"); // forth cell focused
		checkAnnouncement(EMPTY);
		cy.focused().should("have.attr", "aria-colindex", "5")
					.should("have.attr", "role", "columnheader")
					.should("have.attr", "aria-sort", "descending");

		cy.realPress("ArrowRight"); // row action focused
		checkAnnouncement(ROW_ACTIONS);
		cy.focused().should("have.attr", "aria-colindex", "6")
					.should("have.attr", "role", "columnheader");

		cy.realPress("Home"); // selection cell focused
		checkAnnouncement("");
	});
});

describe("Row Custom Announcement - Less details", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table0" overflowMode="Popin" rowActionCount={2} >
				<TableSelectionMulti id="selection" slot="features" selected="Row1"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px" sort-indicator="Ascending">
						<Label id="Header1Label" required>H1</Label>
						<div style={{ display: "none" }}>H1DisplayNone</div>
					</TableHeaderCell>
					<TableHeaderCell minWidth="200px">
						<div data-ui5-table-acc-text="H2">H2 Custom Text</div>
					</TableHeaderCell>
					<TableHeaderCell id="Header3" minWidth="200px">
						<div>H3<div aria-hidden="true">H3AriaHidden</div></div>
					</TableHeaderCell>
					<TableHeaderCell minWidth="150px" sort-indicator="Descending" popinText="H4Popin">
						H4
						<TableHeaderCellActionAI slot="action"></TableHeaderCellActionAI>
					</TableHeaderCell>
				</TableHeaderRow>
				<TableRow rowKey="Row1" navigated interactive>
					<TableCell>R1C1</TableCell>
					<TableCell>
						<input value="R1C2" />
						<input value="R1C2" />
					</TableCell>
					<TableCell>
						<div>
							<u data-sap-ui5-table-acc-text="R1C3"></u>
							<b aria-hidden="true">R1C3AriaHidden</b>
							<i style={{ display: "none" }}>R1C3DisplayNone</i>
						</div>
					</TableCell>
					<TableCell>
						C4
						<Button id="row1-button">C4Button</Button>
					</TableCell>
					<TableRowActionNavigation slot="actions" id="row1-nav-action"></TableRowActionNavigation>
					<TableRowAction slot="actions" id="row1-add-action" icon={add} text="Add"></TableRowAction>
				</TableRow>
			</Table>
		);

		cy.get("#table0").children("ui5-table-row").as("rows");
		cy.get("#table0").children("ui5-table-header-row").first().as("headerRow");
		cy.get("#table0").shadow().find("#table").as("innerTable");
		cy.get("@rows").first().as("row1");
		cy.get("@row1").find("#row1-button").as("row1Button");
		cy.get("@row1").find("ui5-table-cell").as("row1Cells");
		cy.get("@headerRow").find("ui5-table-header-cell").first().as("headerRowCells");

		cy.document().then((doc) => {
			const header1Label = doc.getElementById("Header1Label") as Label;
			cy.stub(header1Label, "accessibilityInfo").get(() => ({
				description: "H1",
				required: true,
			}));

			const row1Button = doc.getElementById("row1-button") as Button;
			cy.stub(row1Button, "accessibilityInfo").get(() => ({
				type: "Button",
				description: "C4Button",
				required: true,
				disabled: true,
				readonly: true,
			}));
		});
	});

	function checkAnnouncement(expectedText: string, focusAgain = false, check = "contains") {
		focusAgain && cy.focused().then($el => {
			if ($el.attr("ui5-table-header-row") !== undefined) {
				cy.realPress("ArrowDown");
				cy.realPress("ArrowUp");
			} else {
				cy.realPress("ArrowUp");
				cy.realPress("ArrowDown");
			}
		});

		cy.get("body").then($body => {
			expect($body.find("#ui5-table-invisible-text").text())[check](expectedText);
		});
	}

	it("should announce table rows", () => {
		cy.get("@row1").realClick();
		checkAnnouncement(`Row . 2 of 2 . ${SELECTED} . ${NAVIGABLE} . H1`);
		checkAnnouncement(`H1 . R1C1 . H2 . ${CONTAINS_CONTROLS} . H3 . ${EMPTY} . H4 . C4 Button C4Button`);
		checkAnnouncement(ONE_ROW_ACTION);
		cy.focused().should("have.attr", "aria-rowindex", "2")
					.should("have.attr", "role", "row");

		cy.get("#selection").invoke("attr", "selected", "");
		checkAnnouncement(`Row . 2 of 2 . ${NAVIGABLE}`, true);

		cy.get("#row1-nav-action").invoke("prop", "interactive", true);
		checkAnnouncement(`Row . 2 of 2 . ${ACTIVE} . H1`, true);
		checkAnnouncement(Table.i18nBundle.getText(MULTIPLE_ACTIONS, 2));

		cy.get("@row1").invoke("prop", "interactive", false);
		checkAnnouncement(`Row . 2 of 2 . H1`, true);

		cy.get("#table0").invoke("css", "width", "301px");
		checkAnnouncement(`Row . 2 of 2 . H1`, true);
		checkAnnouncement(`H1 . R1C1 . H2 . ${CONTAINS_CONTROLS} . H3 . ${EMPTY} . H4Popin . C4 Button C4Button`);

		cy.get("#Header3").invoke("prop", "popinHidden", true);
		checkAnnouncement(`H1 . R1C1 . H2 . ${CONTAINS_CONTROLS} . H4Popin . C4 Button C4Button`, true);

		cy.get("#row1-nav-action").invoke("remove");
		cy.get("#row1-add-action").invoke("remove");
		checkAnnouncement(`Row . 2 of 2 . H1 . R1C1 . H2 . ${CONTAINS_CONTROLS} . H4Popin . C4 Button C4Button . ${NAVIGATED}`, true, "equal");

		cy.realPress("ArrowRight"); // selection cell focused
		checkAnnouncement("");
		cy.focused().should("have.attr", "aria-colindex", "1")
					.should("have.attr", "role", "gridcell");

		cy.realPress("ArrowRight"); // first cell focused
		checkAnnouncement("R1C1", false, "equal");
		cy.focused().should("have.attr", "aria-colindex", "2")
					.should("have.attr", "role", "gridcell");

		cy.realPress("ArrowRight"); // row action cell focused
		checkAnnouncement(EMPTY, false, "equal");
		cy.focused().should("have.attr", "aria-colindex", "3")
					.should("have.attr", "role", "gridcell");

		cy.realPress("End"); // popin cell focused we need details
		checkAnnouncement(`H2 . ${CONTAINS_CONTROLS} . H4Popin ${GENERATED_BY_AI} . ${CONTAINS_CONTROL} . C4 Button C4Button ${REQUIRED} ${DISABLED} ${READONLY} . ${CONTAINS_CONTROL}`);
		cy.focused().should("have.attr", "aria-colindex", "4")
					.should("have.attr", "role", "gridcell");

		cy.get("@row1Cells").each(($cell, index) => {
			if (index === 0) return;
			cy.wrap($cell).should("have.attr", "_popin");
			cy.wrap($cell).should("not.have.attr", "role");
			cy.wrap($cell).should("not.have.attr", "aria-colindex");
		});

		cy.realPress("Home"); // selection cell focused
		cy.realPress("Home"); // row focused

		cy.get("#table0").invoke("css", "width", "1000px");
		checkAnnouncement(`Row . 2 of 2 . H1 . R1C1 . H2 . ${CONTAINS_CONTROLS} . H3 . ${EMPTY} . H4 . C4 Button C4Button . ${NAVIGATED}`, true, "equal");
		cy.get("@row1Cells").each(($cell, index) => {
			cy.wrap($cell).should("not.have.attr", "_popin");
			cy.wrap($cell).should("have.attr", "role", "gridcell");
			cy.wrap($cell).should("have.attr", "aria-colindex", `${index + 2}`);
		});

		cy.get("@row1").shadow().find("#navigated-cell").should("have.attr", "role", "none")
														.should("have.attr", "aria-hidden", "true");

		cy.get("@row1").invoke("prop", "navigated", false);
		checkAnnouncement(`Row . 2 of 2 . H1 . R1C1 . H2 . ${CONTAINS_CONTROLS} . H3 . ${EMPTY} . H4 . C4 Button C4Button`, true, "equal");

		cy.realPress("ArrowUp"); // header row focused
		cy.get("@row1").invoke("remove");
		cy.focused().click();
		cy.realPress("ArrowDown"); // nodata row focused
		checkAnnouncement("");
	});

	it("should announce table header row", () => {
		cy.get("@row1").realClick();
		cy.realPress("ArrowUp");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${SELECT_ALL_CHECKBOX} ${CHECKED} . H1 . H2 . H3 . H4 . ${ROW_ACTIONS}`);

		cy.get("#table0").invoke("attr", "row-action-count", "0");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${SELECT_ALL_CHECKBOX} ${CHECKED} . H1 . H2 . H3 . H4`, true, "equal");

		cy.get("#selection").invoke("prop", "selected", "");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${SELECT_ALL_CHECKBOX} ${NOT_CHECKED} . H1 . H2 . H3 . H4`, true, "equal");

		cy.get("#selection").invoke("attr", "header-selector", "ClearAll");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${CLEAR_ALL_BUTTON} ${DISABLED} . H1 . H2 . H3 . H4`, true, "equal");

		cy.get("#selection").invoke("prop", "selected", "Row1");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${CLEAR_ALL_BUTTON} . H1 . H2 . H3 . H4`, true, "equal");

		cy.get("#selection").invoke("remove");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . H1 . H2 . H3 . H4`, true, "equal");

		cy.get("#table0").invoke("append", '<ui5-table-selection-single slot="features"></ui5-table-selection-single>');
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${SELECTION} . H1 . H2 . H3 . H4`, true, "equal");

		cy.get("#table0").invoke("css", "width", "301px");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${SELECTION} . H1`, true, "equal");
		cy.get("@headerRowCells").each(($cell, index) => {
			if (index === 0) {
				cy.wrap($cell).should("have.attr", "role", "columnheader");
				cy.wrap($cell).should("have.attr", "aria-colindex", "2");
			} else {
				cy.wrap($cell).should("have.attr", "_popin");
				cy.wrap($cell).should("not.have.attr", "role");
				cy.wrap($cell).should("not.have.attr", "aria-colindex");
			}
		});

		cy.get("#table0").invoke("css", "width", "1000px");
		checkAnnouncement(`${COLUMN_HEADER_ROW} . ${SELECTION} . H1 . H2 . H3 . H4`, true, "equal");
		cy.get("@headerRowCells").each(($cell, index) => {
			cy.wrap($cell).should("have.attr", "role", "columnheader");
			cy.wrap($cell).should("have.attr", "aria-colindex", `${index + 2}`);
		});
	});
});
