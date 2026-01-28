import { isValidColumnWidth } from "../../src/TableUtils.js";
import { isInstanceOfTable } from "../../src/utils/InstanceChecks.js";
import Table from "../../src/Table.js";
import TableRow from "../../src/TableRow.js";

describe("#isInstanceOfTable", () => {
	it("object is Table", () => {
		const obj = new Table();
		cy.wrap({ isInstanceOfTable })
			.invoke("isInstanceOfTable", obj)
			.should("be.true");
	});

	it("object is not Table", () => {
		const obj = new TableRow();
		cy.wrap({ isInstanceOfTable })
			.invoke("isInstanceOfTable", obj)
			.should("be.false");
	});

	it("object is undefined", () => {
		const obj = undefined;
		cy.wrap({ isInstanceOfTable })
			.invoke("isInstanceOfTable", obj)
			.should("be.false");
	});
});

describe("#isValidColumnWidth", () => {
	it("px", () => {
		const width = "100px";
		cy.wrap({ isValidColumnWidth })
			.invoke("isValidColumnWidth", width)
			.should("be.true");
	});

	it("rem", () => {
		const width = "10rem";
		cy.wrap({ isValidColumnWidth })
			.invoke("isValidColumnWidth", width)
			.should("be.true");
	});

	it("%", () => {
		const width = "100%";
		cy.wrap({ isValidColumnWidth })
			.invoke("isValidColumnWidth", width)
			.should("be.true");
	});

	it("auto", () => {
		const width = "auto";
		cy.wrap({ isValidColumnWidth })
			.invoke("isValidColumnWidth", width)
			.should("be.false");
	});

	it("empty", () => {
		const width = "";
		cy.wrap({ isValidColumnWidth })
			.invoke("isValidColumnWidth", width)
			.should("be.false");
	});
});
