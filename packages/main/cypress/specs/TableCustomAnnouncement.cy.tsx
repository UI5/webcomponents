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
					<TableHeaderCell></TableHeaderCell>
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
	});

	function checkAnnouncement(expectedText: string, focusAgain = false) {
		if (focusAgain) {
			cy.realPress("ArrowUp");
			cy.realPress("ArrowDown");
		}

		cy.get("body").then($body => {
			expect($body.find("#ui5-table-invisible-text").text()).to.equal(expectedText);
		});
	}

	it("should announce table cells", () => {
		cy.get("@row1").realClick(); // row focused
		cy.realPress("ArrowRight"); // selection cell focused
		checkAnnouncement("");

		cy.realPress("ArrowRight"); // first cell focused
		checkAnnouncement("Row1Cell1");

		cy.realPress("ArrowRight"); // second cell focused
		checkAnnouncement("Contains Control");

		cy.get("@row1Input2").invoke("removeAttr", "hidden");
		checkAnnouncement("Contains Controls", true);

		cy.get("@row1Input1").invoke("attr", "data-ui5-table-acc-text", "Input with custom accessibility text");
		checkAnnouncement("Input with custom accessibility text . Contains Controls", true);

		cy.realPress("ArrowRight"); // third cell focused
		checkAnnouncement("Empty");

		cy.get("@row1Div").invoke("attr", "tabindex", "0");
		cy.get("@row1Div").invoke("css", "width", "150px");
		cy.get("@row1Div").focus();
		cy.realPress("F2");
		checkAnnouncement("Contains Control", true);

		cy.realPress("ArrowRight"); // fourth cell focused
		checkAnnouncement("Row1Cell3 . Contains Control");

		cy.document().then((doc) => {
			const row1Button = doc.getElementById("row1-button") as Button;
			cy.stub(row1Button, "accessibilityInfo").get(() => ({
				type: "Button",
				description: "Row1Cell4",
				required: true,
				disabled: true,
				readonly: true,
			}));
		});
		checkAnnouncement("Button Row1Cell4 Required Disabled Read Only . Contains Control", true);

		cy.get("@row1Button").invoke("attr", "data-ui5-table-acc-text", "Button with custom accessibility text");
		checkAnnouncement("Button with custom accessibility text . Contains Control", true);

		cy.realPress("ArrowRight"); // row actions cell
		checkAnnouncement("2 row actions available");
		cy.get("#row1-edit-action").invoke("remove");
		checkAnnouncement("1 row action available", true);

		cy.get("#row1-add-action").invoke("remove");
		checkAnnouncement("Empty", true);

		cy.realPress("Home"); // selection cell focused
		checkAnnouncement("");
	});

	it("should announce table header cells", () => {
		cy.get("@headerRow").realClick(); // header row focused
		cy.realPress("ArrowRight"); // selection cell focused
		checkAnnouncement("");

		cy.realPress("ArrowRight"); // first cell focused
		checkAnnouncement("Header1 Generated by AI . Contains Control");

		cy.realPress("ArrowRight"); // second cell focused
		checkAnnouncement("Header2");

		cy.realPress("ArrowRight"); // third cell focused
		checkAnnouncement("Header3");

		cy.realPress("ArrowRight"); // forth cell focused
		checkAnnouncement("Empty");

		cy.realPress("ArrowRight"); // forth cell focused
		checkAnnouncement("Row Actions");

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
		checkAnnouncement("Row . 2 of 2 . Selected . Has Details . H1");
		checkAnnouncement("H1 . R1C1 . H2 . Contains Controls . H3 . Empty . H4 . C4 Button C4Button");
		checkAnnouncement("1 row action available");

		cy.get("#selection").invoke("attr", "selected", "");
		checkAnnouncement("Row . 2 of 2 . Has Details", true);

		cy.get("#row1-nav-action").invoke("prop", "interactive", true);
		checkAnnouncement("Row . 2 of 2 . Is Active . H1", true);
		checkAnnouncement("2 row actions available");

		cy.get("@row1").invoke("prop", "interactive", false);
		checkAnnouncement("Row . 2 of 2 . H1", true);

		cy.get("#table0").invoke("css", "width", "301px");
		checkAnnouncement("Row . 2 of 2 . H1", true);
		checkAnnouncement("H1 . R1C1 . H2 . Contains Controls . H3 . Empty . H4Popin . C4 Button C4Button");
		checkAnnouncement("2 row actions available");

		cy.get("#Header3").invoke("prop", "popinHidden", true);
		checkAnnouncement("H1 . R1C1 . H2 . Contains Controls . H4Popin . C4 Button C4Button", true);

		cy.get("#row1-nav-action").invoke("remove");
		cy.get("#row1-add-action").invoke("remove");
		checkAnnouncement("Row . 2 of 2 . H1 . R1C1 . H2 . Contains Controls . H4Popin . C4 Button C4Button", true, "equal");

		cy.realPress("ArrowRight"); // selection cell focused
		checkAnnouncement("");

		cy.realPress("End"); // popin cell focused we need details
		checkAnnouncement("H2 . Contains Controls . H4Popin Generated by AI . Contains Control . C4 Button C4Button Required Disabled Read Only . Contains Control");

		cy.realPress("Home"); // selection cell focused
		cy.realPress("Home"); // row focused
		cy.get("#table0").invoke("css", "width", "1000px");
		checkAnnouncement("Row . 2 of 2 . H1 . R1C1 . H2 . Contains Controls . H3 . Empty . H4 . C4 Button C4Button", true, "equal");

		cy.realPress("ArrowUp"); // header row focused
		cy.get("@row1").invoke("remove");
		cy.focused().click();
		cy.realPress("ArrowDown"); // nodata row focused
		checkAnnouncement("");
	});

	it("should announce table header row", () => {
		cy.get("@row1").realClick();
		cy.realPress("ArrowUp");
		checkAnnouncement("Column Header Row . Select All Checkbox Checked . H1 . H2 . H3 . H4 . Row Actions");

		cy.get("#table0").invoke("attr", "row-action-count", "0");
		checkAnnouncement("Column Header Row . Select All Checkbox Checked . H1 . H2 . H3 . H4", true, "equal");

		cy.get("#selection").invoke("attr", "selected", "");
		checkAnnouncement("Column Header Row . Select All Checkbox Not Checked . H1 . H2 . H3 . H4", true, "equal");

		cy.get("#selection").invoke("remove");
		checkAnnouncement("Column Header Row . H1 . H2 . H3 . H4", true, "equal");

		cy.get("#table0").invoke("append", '<ui5-table-selection-single slot="features"></ui5-table-selection-single>');
		checkAnnouncement("Column Header Row . Selection . H1 . H2 . H3 . H4", true, "equal");
	});
});
