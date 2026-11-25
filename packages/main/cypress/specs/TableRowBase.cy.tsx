import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Label from "../../src/Label.js";
import TableRowAction from "../../src/TableRowAction.js";

describe("TableRowBase - Dummy cell", () => {
	it("should render dummy cell with border and nofocus when all columns have fixed widths", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">Product</TableHeaderCell>
					<TableHeaderCell width="40%">Supplier</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Product 1</Label></TableCell>
					<TableCell><Label>Supplier 1</Label></TableCell>
				</TableRow>
				<TableRow id="row2" interactive>
					<TableCell><Label>Product 2</Label></TableCell>
					<TableCell><Label>Supplier 2</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell").should("exist");
		cy.get("#row1").shadow().find("#dummy-cell").should("exist");

		// Should have left border
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px");
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px");

		// Should have data-excluded-from-navigation="nofocus" and data-border-merged when no popin
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "nofocus")
			.should("have.attr", "data-border-merged");

		// Should not focus row or fire row-click when clicking dummy cell
		cy.get("#table").invoke("on", "row-click", cy.stub().as("rowClickHandler"));
		cy.get("#row2").shadow().find("#dummy-cell").realClick();
		cy.get("#row2").should("not.be.focused");
		cy.get("#row2").should("not.have.attr", "_active");
		cy.get("@rowClickHandler").should("not.have.been.called");
	});

	it("should not render dummy cell when columns are flexible", () => {
		const cases = [
			{ widths: ["200px", "auto"] },
			{ widths: ["Auto"] },
			{ widths: ["200px", undefined] },
		];

		cases.forEach(({ widths }) => {
			cy.mount(
				<Table id="table">
					<TableHeaderRow slot="headerRow">
						{widths.map((w, i) => (
							<TableHeaderCell width={w}>{`Col ${i}`}</TableHeaderCell>
						))}
					</TableHeaderRow>
					<TableRow id="row1">
						{widths.map((_, i) => (
							<TableCell><Label>{`Cell ${i}`}</Label></TableCell>
						))}
					</TableRow>
				</Table>
			);

			cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell").should("not.exist");
			cy.get("#row1").shadow().find("#dummy-cell").should("not.exist");
		});
	});

	it("should render dummy cell after actions when no popin and before actions when popin", () => {
		cy.mount(
			<Table id="table" rowActionCount={2} overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px" minWidth="200px">Product</TableHeaderCell>
					<TableHeaderCell width="200px" minWidth="200px">Supplier</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Product 1</Label></TableCell>
					<TableCell><Label>Supplier 1</Label></TableCell>
					<TableRowAction slot="actions" icon="edit" text="Edit"></TableRowAction>
					<TableRowAction slot="actions" icon="delete" text="Delete"></TableRowAction>
				</TableRow>
			</Table>
		);

		// No popin: dummy cell is after actions cell (rightmost) in both row and header row
		cy.get("#row1").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_PRECEDING).to.be.greaterThan(0);
		});
		cy.get("[ui5-table-header-row]").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_PRECEDING).to.be.greaterThan(0);
		});

		// Shrink to trigger popin: dummy cell moves before actions cell
		cy.get("[ui5-table]").invoke("css", "width", "250px");

		cy.get("#row1").should("have.attr", "_has-popin");
		cy.get("#row1").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_FOLLOWING).to.be.greaterThan(0);
		});
		cy.get("[ui5-table-header-row]").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_FOLLOWING).to.be.greaterThan(0);
		});
	});

	it("should adapt dummy cell border, navigation attribute, and custom focus outline with popin", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableSelectionMulti slot="features" />
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px" minWidth="200px">Product</TableHeaderCell>
					<TableHeaderCell width="200px" minWidth="200px">Supplier</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Product 1</Label></TableCell>
					<TableCell><Label>Supplier 1</Label></TableCell>
				</TableRow>
			</Table>
		);

		// At full width: left border visible, nofocus attribute on both row and header row
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");

		// Focus row - custom outline should be applied
		cy.get("#row1").should("have.attr", "_render-dummy-cell");
		cy.get("#row1").should("not.have.attr", "_has-popin");
		cy.realPress("Tab");
		cy.get("#row1").shadow().find("[data-ui5-custom-outline='start']").should("exist");
		cy.get("#row1").find("[data-ui5-custom-outline='end']").should("exist");
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.attr", "data-ui5-custom-outline");

		// Shrink to trigger popin to test custom outline is removed
		cy.get("[ui5-table]").invoke("css", "width", "250px");

		cy.get("#row1").should("have.attr", "_has-popin");

		// Left border removed, data-excluded-from-navigation without nofocus
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("have.css", "border-inline-start-width", "0px")
			.should("have.attr", "data-excluded-from-navigation", "");
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "");

		// Expand back - border and nofocus should return, custom outline reapplied via onAfterRendering
		cy.get("[ui5-table]").invoke("css", "width", "800px");

		cy.get("#row1").should("not.have.attr", "_has-popin");
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");
		cy.get("#row1").shadow().find("[data-ui5-custom-outline='start']").should("exist");
		cy.get("#row1").find("[data-ui5-custom-outline='end']").should("exist");
	});
});
