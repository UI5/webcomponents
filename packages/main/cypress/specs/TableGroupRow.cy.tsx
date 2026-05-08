import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import Text from "../../src/Text.js";
import * as Translations from "../../src/generated/i18n/i18n-defaults.js";

const {
	TABLE_GROUP_ROW: { defaultText: GROUP_ROW },
	TABLE_ROW: { defaultText: ROW },
	TABLE_ROW_SELECTED: { defaultText: SELECTED },
	TABLE_COLUMN_HEADER_ROW: { defaultText: COLUMN_HEADER_ROW },
} = Translations;

describe("TableGroupRow - Rendering", () => {
	it("renders group row with correct attributes", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
					<TableHeaderCell><span>Age</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Country: Germany</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>John</Text></TableCell>
					<TableCell><Text>25</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]").should("exist");
		cy.get("[ui5-table-group-row]").should("have.attr", "role", "row");
		cy.get("[ui5-table-group-row]").should("have.attr", "aria-roledescription", GROUP_ROW);
	});

	it("group row spans all columns", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
					<TableHeaderCell><span>Age</span></TableHeaderCell>
					<TableHeaderCell><span>City</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Country: Germany</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>John</Text></TableCell>
					<TableCell><Text>25</Text></TableCell>
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]")
			.shadow()
			.find("#group-cell")
			.should("have.attr", "aria-colspan", "3");
	});

	it("group row displays slotted content", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Country: Germany</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>John</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]").should("contain.text", "Country: Germany");
	});
});

describe("TableGroupRow - ARIA", () => {
	it("aria-rowcount includes all rows (header + group + data)", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
				<TableGroupRow>Group B</TableGroupRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Row 2</Text></TableCell>
				</TableRow>
				<TableRow rowKey="row3">
					<TableCell><Text>Row 3</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table").shadow().find("#table").should("have.attr", "aria-rowcount", "6");
	});
});

describe("TableGroupRow - Selection", () => {
	it("group row is not selectable with multi selection", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionMulti slot="features" id="selection"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Row 2</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]").shadow().find("#selection-component").should("not.exist");
	});

	it("select all selects only data rows", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionMulti slot="features" id="selection"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Row 2</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-header-row]").shadow().find("#selection-component").realClick();
		cy.get("#selection").invoke("prop", "selected").should("equal", "row1 row2");
	});

	it("group row is not selectable with single selection", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionSingle slot="features" id="selection"></TableSelectionSingle>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]").shadow().find("#selection-component").should("not.exist");
	});
});

describe("TableGroupRow - Custom Announcement", () => {
	function checkAnnouncement(expectedText: string, focusAgain = false) {
		if (focusAgain) {
			cy.realPress("ArrowUp");
			cy.realPress("ArrowDown");
		}

		cy.get("body").then($body => {
			expect($body.find("#ui5-invisible-text").text()).to.contain(expectedText);
		});
	}

	it("announces group row on focus", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Country: Germany</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>John</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]").realClick();
		checkAnnouncement(`${GROUP_ROW} . Country: Germany`);
	});

	it("announces group context when data row is focused", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Country: Germany</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>John</Text></TableCell>
				</TableRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Jane</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-row]").first().realClick();
		checkAnnouncement(`${ROW} . 3 of 4 . Country: Germany`);
	});

	it("announces correct data row index excluding group rows", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
				<TableGroupRow>Group B</TableGroupRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Row 2</Text></TableCell>
				</TableRow>
				<TableRow rowKey="row3">
					<TableCell><Text>Row 3</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-row]").eq(2).realClick();
		checkAnnouncement(`${ROW} . 6 of 6 . Group B`);
	});

	it("row without preceding group row has no group context", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Row 2</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-row]").first().realClick();
		checkAnnouncement(`${ROW} . 2 of 4`);
		cy.get("body").then($body => {
			expect($body.find("#ui5-invisible-text").text()).to.not.contain("Group A");
		});
	});
});

describe("TableGroupRow - Navigation", () => {
	it("group row is navigable with keyboard", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-group-row]").realClick();
		cy.focused().should("have.attr", "ui5-table-group-row");

		cy.realPress("ArrowDown");
		cy.focused().should("have.attr", "ui5-table-row");

		cy.realPress("ArrowUp");
		cy.focused().should("have.attr", "ui5-table-group-row");
	});
});

describe("TableGroupRow - Alternation", () => {
	it("alternation is applied only to data rows", () => {
		cy.mount(
			<Table id="table" alternateRowColors={true}>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>Name</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Group A</TableGroupRow>
				<TableRow rowKey="row1">
					<TableCell><Text>Row 1</Text></TableCell>
				</TableRow>
				<TableRow rowKey="row2">
					<TableCell><Text>Row 2</Text></TableCell>
				</TableRow>
				<TableGroupRow>Group B</TableGroupRow>
				<TableRow rowKey="row3">
					<TableCell><Text>Row 3</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table").then($table => {
			const dataRows = $table.find("[ui5-table-row]").get();
			const row1Bg = getComputedStyle(dataRows[0]).backgroundColor;
			const row2Bg = getComputedStyle(dataRows[1]).backgroundColor;
			const row3Bg = getComputedStyle(dataRows[2]).backgroundColor;

			expect(row1Bg).to.not.equal(row2Bg);
			expect(row1Bg).to.equal(row3Bg);
		});
	});
});
