import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Label from "../../src/Label.js";

describe("TableCellBase - Horizontal alignment", () => {
	function check(id: string, index: number, alignment: string) {
		cy.get(id)
			.should("have.css", "justify-content", alignment)
			.should("have.css", "text-align", alignment === "normal" ? "start" : alignment);

		cy.get("[ui5-table-row]")
			.get(`[ui5-table-cell]:nth-of-type(${index})`)
			.should("have.css", "justify-content", alignment)
			.should("have.css", "text-align", alignment === "normal" ? "start" : alignment);
	}

	beforeEach(() => {
		cy.mount(
			<Table id="table" overflowMode="Popin" style={{ width: "1120px" }}>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="productCol" width="300px"><span>Product</span></TableHeaderCell>
					<TableHeaderCell id="supplierCol" horizontalAlign="Center" width="200px">Supplier</TableHeaderCell>
					<TableHeaderCell id="dimensionsCol" horizontalAlign="Right" width="300px">Dimensions</TableHeaderCell>
					<TableHeaderCell id="weightCol" width="100px">Weight</TableHeaderCell>
					<TableHeaderCell id="priceCol" width="220px">Price</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 15</b><br></br>HT-1000</Label></TableCell>
					<TableCell><Label>Very Best Screens</Label></TableCell>
					<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
					<TableCell><Label><b>956</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 17</b><br></br>HT-1001</Label></TableCell>
					<TableCell><Label>Smartcards</Label></TableCell>
					<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
					<TableCell><Label><b>1249</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell class="productCol"><Label><b>Notebook Basic 18</b><br></br>HT-1002</Label></TableCell>
					<TableCell class="supplierCol"><Label>Technocom</Label></TableCell>
					<TableCell class="dimensionsCol"><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell class="weightCol"><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
					<TableCell class="priceCol"><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
	});

	it("default alignment when horizotal align is not set", () => {
		check("#productCol", 1, "normal");
	});

	it("alignment is set correctly during runtime", () => {
		const alignments = ["Left", "Start", "Right", "End", "Center"];

		alignments.forEach(alignment => {
			cy.get("#productCol")
				.invoke("attr", "horizontal-align", alignment)
				.should("have.attr", "horizontal-align", alignment);
			check("#productCol", 1, alignment.toLowerCase());
		});
	});

	it("alignment is normal if set to unknown value", () => {
		cy.get("#productCol")
			.invoke("attr", "horizontal-align", "UnknownValue")
			.should("have.attr", "horizontal-align", "UnknownValue");
		check("#productCol", 1, "normal");
	});

	it("alignment cells have same alignment as header cell on init time", () => {
		check("#supplierCol", 2, "center");
		check("#dimensionsCol", 3, "right");
	});

	it("cells should change alignment when changing headerCell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("#supplierCol")
			.invoke("attr", "horizontal-align", "End");

		cy.get("#supplierCol")
			.should("have.attr", "horizontal-align", "End");

		check("#supplierCol", 2, "end");
	});

	it("single cell alignment does not affect other cells and is not affected by header cell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("[ui5-table-row]:nth-of-type(2) > [ui5-table-cell]:nth-child(2)")
			.invoke("attr", "horizontal-align", "Start");

		cy.get("[ui5-table-row]:nth-of-type(2) > [ui5-table-cell]:nth-child(2)")
			.should("have.attr", "horizontal-align", "Start")
			.should("have.css", "justify-content", "start");

		cy.get("#supplierCol")
			.should("have.css", "justify-content", "center");

		cy.get("[ui5-table-row]:nth-of-type(3) > [ui5-table-cell]:nth-child(2)")
			.should("have.css", "justify-content", "center");

		cy.get("[ui5-table-row]:nth-of-type(1) > [ui5-table-cell]:nth-child(2)")
			.should("have.css", "justify-content", "center");

		// Change alignment of header cell => should not affect custom cell alignment
		cy.get("#supplierCol")
			.invoke("attr", "horizontal-align", "End");

		cy.get("#supplierCol")
			.should("have.attr", "horizontal-align", "End");

		cy.get("[ui5-table-row]:nth-of-type(2) > [ui5-table-cell]:nth-child(2)")
			.should("have.attr", "horizontal-align", "Start")
			.should("have.css", "justify-content", "start");

		cy.get("[ui5-table-row]:nth-of-type(3) > [ui5-table-cell]:nth-child(2)")
			.should("have.css", "justify-content", "end");

		cy.get("[ui5-table-row]:nth-of-type(1) > [ui5-table-cell]:nth-child(2)")
			.should("have.css", "justify-content", "end");
	});

	it.skip("alignment with popin", () => {
		const testWidths = [
			{ width: 1120, poppedIn: [] },
			{ width: 900, poppedIn: ["priceCol"] },
			{ width: 800, poppedIn: ["priceCol", "weightCol"] },
			{ width: 500, poppedIn: ["priceCol", "weightCol", "dimensionsCol"] },
			{ width: 300, poppedIn: ["priceCol", "weightCol", "dimensionsCol", "supplierCol"] },
		];
		const alignments = {
			"productCol": "normal",
			"supplierCol": "center",
			"dimensionsCol": "right",
			"weightCol": "normal",
			"priceCol": "normal",
			"none": "",
		};

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("[ui5-table]").then($table => {
				$table.css("width", `${width}px`);
			});

			cy.get("[ui5-table-header-cell]").each(($cell, index) => {
				const id = $cell.attr("id") as keyof typeof alignments ?? "none";
				const shouldBePoppedIn = poppedIn.includes(id);

				if (shouldBePoppedIn) {
					check(`#${id}`, index + 1, "normal");
					cy.get(`.${id}`).should("have.css", "justify-content", "normal");
				} else {
					check(`#${id}`, index + 1, alignments[id]);
					cy.get(`.${id}`).should("have.css", "justify-content", alignments[id]);
				}
			});
		});
	});
});
