import "./utils/legacy-suffix.js";
import Table from "../../src/Table.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import TableColumn from "../../src/TableColumn.js";
import modifyTag from "./utils/modifyTag.js";

describe("Package compatibility scoping", () => {
	it("Compat suffix", () => {
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
		].map(tag => modifyTag(tag, "compat"))
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