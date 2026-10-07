import { assert } from "chai";

describe.skip("Select mobile general interaction", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
		await browser.url(`test/pages/Select.html`);
	});

	it("Changes selection in Dialog", async () => {
		// assert default
		const select = await browser.$("#mySelect");
		const selectText = await select.shadow$(".ui5-select-label-root");
		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, "Condensed", "The current selection is 'Condensed'");

		// act - open as dialog
		select.click();

		// act - move the focus to the first item
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mySelect");
		const selectedItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-li:last-child");
		selectedItem.keys("ArrowUp");
		selectedItem.keys("ArrowUp");

		// act - press the first item
		selectedItem.keys("Enter");

		// assert - selection changed from "Condensed" to "Cozy"
		const selectTextAfter = await select.shadow$(".ui5-select-label-root");
		const selectTextHtmlAfter = await selectTextAfter.getHTML(false);
		assert.include(selectTextHtmlAfter, "Cozy", "The 'Cozy' item has been selected");
	});
});
