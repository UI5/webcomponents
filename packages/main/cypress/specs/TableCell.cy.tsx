import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableHeaderCellActionAI from "../../src/TableHeaderCellActionAI.js";
import Label from "../../src/Label.js";

const TRANSPARENT = "rgba(0, 0, 0, 0)";

describe("TableCell - Merged", () => {
	function mountMergedTable(overflowMode: "Scroll" | "Popin" = "Scroll") {
		cy.mount(
			<Table id="table" overflowMode={overflowMode}>
				<TableSelectionMulti id="selection" slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="200px">Column A</TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="150px">Column C</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell id="r1cA"><Label>SAP</Label></TableCell>
					<TableCell id="r1cB"><Label>100</Label></TableCell>
					<TableCell id="r1cC"><Label>X</Label></TableCell>
				</TableRow>
				<TableRow id="row2">
					<TableCell id="r2cA" merged><Label>SAP</Label></TableCell>
					<TableCell id="r2cB"><Label>200</Label></TableCell>
					<TableCell id="r2cC" merged><Label>X</Label></TableCell>
				</TableRow>
				<TableRow id="row3">
					<TableCell id="r3cA" merged><Label>SAP</Label></TableCell>
					<TableCell id="r3cB"><Label>300</Label></TableCell>
					<TableCell id="r3cC"><Label>Y</Label></TableCell>
				</TableRow>
			</Table>
		);
	}

	it("should have transparent border on merged cells and selection cell", () => {
		mountMergedTable();

		// Merged cell should have transparent top border
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#r2cA").find("[ui5-label]").should("have.css", "opacity", "0");

		// Non-merged cell should not have transparent border
		cy.get("#r2cB").should("not.have.css", "border-top-color", TRANSPARENT);
		cy.get("#r2cB").find("[ui5-label]").should("have.css", "opacity", "1");

		// Selection cell should have transparent border when first cell is merged
		cy.get("#row2").shadow().find("#selection-cell").should("have.attr", "data-border-merged");
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);

		// Selection cell should NOT have transparent border when first cell is not merged
		cy.get("#row1").shadow().find("#selection-cell").should("not.have.attr", "data-border-merged");
		cy.get("#row1").shadow().find("#selection-cell").should("not.have.css", "border-top-color", TRANSPARENT);
	});

	it("should disable merged styles when row has popin", () => {
		mountMergedTable("Popin");

		// At full width, merged styles should be active
		cy.get("[ui5-table]").invoke("css", "width", "600px");
		cy.get("#r2cA").find("[ui5-label]").should("have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);

		// Shrink table to trigger popin
		cy.get("[ui5-table]").invoke("css", "width", "250px");

		// Merged cell border should fall back to normal border color (not transparent)
		cy.get("#row2").should("have.attr", "_has-popin");
		cy.get("#r2cA").should("not.have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("not.have.css", "border-top-color", TRANSPARENT);

		// Merged cell content should be fully visible (opacity back to 1)
		cy.get("#r2cA").find("[ui5-label]").should("have.css", "opacity", "1");

		// Expand table again, merged styles should re-activate
		cy.get("[ui5-table]").invoke("css", "width", "600px");

		cy.get("#r2cA").find("[ui5-label]").should("have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);
	});

	it("should toggle merged styles at runtime", () => {
		mountMergedTable();

		// Initially merged
		cy.get("#r3cA").find("[ui5-label]").should("have.css", "opacity", "0");

		// Remove merged attribute
		cy.get("#r3cA").invoke("removeAttr", "merged");
		cy.get("#r3cA").find("[ui5-label]").should("have.css", "opacity", "1");
		cy.get("#r3cA").should("not.have.css", "border-top-color", TRANSPARENT);

		// Re-add merged attribute
		cy.get("#r3cA").invoke("prop", "merged", true);
		cy.get("#r3cA").find("[ui5-label]").should("have.css", "opacity", "0");
		cy.get("#r3cA").should("have.css", "border-top-color", TRANSPARENT);
	});

	it("should disable merged styles on focus", () => {
		mountMergedTable();

		// Before hover: merged styles active
		cy.get("#r2cA").find("[ui5-label]").should("have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);

		// On focus: merged cell content should become visible but border should remain transparent
		cy.get("#row2").realClick();
		cy.get("#r2cA").find("[ui5-label]").should("not.have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);
	});
});

describe("TableCell - Popin header content", () => {
	beforeEach(() => {
		cy.mount(
			<Table overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px">Column A</TableHeaderCell>
					<TableHeaderCell minWidth="200px" sortIndicator="Ascending">
						<Label required wrappingType="None">Column B</Label>
						<TableHeaderCellActionAI slot="action"></TableHeaderCellActionAI>
					</TableHeaderCell>
					<TableHeaderCell minWidth="150px" popinText="Popin Text">
						<Label required>Column C</Label>
					</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
					<TableCell>Cell C</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
					<TableCell>Cell C</TableCell>
				</TableRow>
			</Table>
		);
		cy.get("[ui5-table]").as("table").children("[ui5-table-row]").as("rows");
		cy.get("@table").children("[ui5-table-header-row]").first().as("headerRow");
		cy.get("@headerRow").get("[ui5-table-header-cell]").each(($headerCell, index) => {
			cy.wrap($headerCell).as(`headerCell${index + 1}`);
		});
		cy.get("@rows").each(($row, index) => {
			cy.wrap($row).as(`row${index + 1}`);
		});
	});

	it("clones header content and preserves label properties or uses popinText", () => {
		cy.get("@table").invoke("css", "width", "250px");

		cy.get("@row1").find("[ui5-table-cell][_popin]").as("row1popins");
		cy.get("@row1popins").first().as("row1popinB");
		cy.get("@row1popinB").shadow().find("[ui5-label]").as("row1popinBlabel");
		cy.get("@row1popinBlabel").contains("Column B");
		cy.get("@row1popinBlabel").should("have.attr", "wrapping-type", "None");
		cy.get("@row1popinBlabel").should("have.attr", "required");

		cy.get("@row1popins").last().as("row1popinC");
		cy.get("@row1popinC").shadow().find("[ui5-label]").should("not.exist");
		cy.get("@row1popinC").shadow().should("have.text", "Popin Text:");
		cy.get("@row1popinC").should("have.text", "Cell C");
	});
});
