import { assert } from "chai";

describe("Table general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/TableGrouping.html`);
	});

	it("Table group rows should be rendered", async () => {
		const groupRows = await browser.$$("ui5-table-group-row");
		assert.strictEqual(groupRows.length, 4, "There should be 4 group rows rendered.");
	});

	it("Colspan attribute should be calculated correctly for multi and single table modes.", async () => {
		const groupRows = await browser.$$("ui5-table-group-row");
		const colSpanSingleMode = await groupRows[0].shadow$("td").getAttribute("colspan");
		const colSpanMultiMode = await groupRows[2].shadow$("td").getAttribute("colspan");
		assert.strictEqual(colSpanSingleMode, '3', "The first table should have attribute 'colspan' of 3 on the group row's 'td' element");
		assert.strictEqual(colSpanMultiMode, '4', "The second table should have attribute 'colspan' of 4 on the group row's 'td' element");
	});

	it("ARIA - aria-label should be calculated correctly.", async () => {
		const groupRows = await browser.$$("ui5-table-group-row");
		const ariaText1 = "Group Header Row Country: Bulgaria. 2 of 7";
		const ariaLabel1 = await groupRows[0].shadow$("tr").getAttribute("aria-label");
		const ariaText2 = "Group Header Row Country: USA. 5 of 7";
		const ariaLabel2 = await groupRows[1].shadow$("tr").getAttribute("aria-label");

		assert.strictEqual(ariaLabel1, ariaText1, "Initially the aria-label is set correctly.");
		assert.strictEqual(ariaLabel2, ariaText2, "Initially the aria-label is set correctly.");
	});
});
