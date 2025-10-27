import "./utils/suffix.js";
import Table from "../../src/Table.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import TableColumn from "../../src/TableColumn.js";
import modifyTag from "./utils/modifyTag.js";

describe("Table", () => {
	it("tests doesn't fire loadMore with ArrowDown on last row", () => {
		cy.mount(
			<Table>
				<TableColumn slot="columns">
					Product
				</TableColumn>

				<TableGroupRow>Group</TableGroupRow>

				<TableRow>
					<TableCell>
						Product 1
					</TableCell>
				</TableRow>
			</Table>
		);

		[
			Table.getMetadata().getPureTag(),
			TableCell.getMetadata().getPureTag(),
			TableRow.getMetadata().getPureTag(),
			TableGroupRow.getMetadata().getPureTag(),
			TableColumn.getMetadata().getPureTag()
		].map(tag => modifyTag(tag, undefined, "demo"))
			.forEach(tag => {
				cy.get(tag)
					.should("exist");

				cy.get(tag)
					.shadow()
					.find("*")
					.should("exist");
			})
	});
});