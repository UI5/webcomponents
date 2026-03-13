import { assert } from "chai";

describe("Select Menu general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/SelectMenu.html`);
	});

	it("first option is selected by default", async () => {
		const select = await browser.$("#selTest");
		const selectText = select.shadow$(".ui5-select-label-root");
		const EXPECTED_SELECTION_TEXT = "item1";

		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Select label is correct.");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT, "The 'value' property is correct.");
	});

	it("fires 'open' and 'close' events", async () => {
		const select = await browser.$("#selTest");
		const inpTestOpen = await browser.$("#testOpen");
		const inpTestClose = await browser.$("#testClose");

		await select.click();
		assert.strictEqual(await inpTestOpen.getProperty("value"), "1", "Fired 'open' event once.");

		await select.click();
		assert.strictEqual(await inpTestClose.getProperty("value"), "1", "Fired 'close' event once.");
	});

	it("changes selection with Arrow Up/Down when menu is closed", async () => {
		const select = await browser.$("#selTest");
		const selectText = select.shadow$(".ui5-select-label-root");
		const inpTestChange = await browser.$("#testChange");
		
		const EXPECTED_SELECTION_TEXT1 = "item2";
		const EXPECTED_SELECTION_TEXT2 = "item1";

		// make sure focus is on closed select
		await select.click();
		await select.keys("Escape");

		await select.keys("ArrowDown");
		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT1, "Arrow Up should change selected item");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT1, "The 'value' property is correct.");

		await select.keys("ArrowUp");
		selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT2, "Arrow Down should change selected item");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT2, "The 'value' property is correct.");

		assert.strictEqual(await inpTestChange.getProperty("value"), "2", "Change event should have fired twice");
	});

	it("fires 'change' and 'live-change' on click", async () => {
		const btnRest = await browser.$("#clearCounter");
		await btnRest.click();

		const select = await browser.$("#selTest");
		const selectText = select.shadow$(".ui5-select-label-root");
		const secondItem = await browser.$("#selOption2");
		const EXPECTED_SELECTION_TEXT = "item2";
		const inpTestChange = await browser.$("#testChange");
		const inpTestPreviewChange = await browser.$("#testPreview");

		await select.click();
		await secondItem.click();

		assert.strictEqual(await inpTestPreviewChange.getProperty("value"), "1", "Fired 'live-change' event once.");
		assert.strictEqual(await inpTestChange.getProperty("value"), "1", "Fired 'change' event once.");

		const selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT, "Select label is correct.");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT, "The 'value' property is correct.");
	});

	it("fires 'change' and 'live-change' on Arrow Down, Arrow Up", async () => {
		const btnRest = await browser.$("#clearCounter");
		await btnRest.click();

		const select = await browser.$("#selTest");
		const selectText = select.shadow$(".ui5-select-label-root");

		const inpTestChange = await browser.$("#testChange");
		const inpTestPreviewChange = await browser.$("#testPreview");

		const EXPECTED_SELECTION_TEXT1 = "item3";
		const EXPECTED_SELECTION_TEXT2 = "item2";

		await select.click();
		await select.keys("ArrowDown");
		await select.keys("Enter");

		assert.strictEqual(await inpTestPreviewChange.getProperty("value"), "1", "Fired 'live-change' event once.");
		assert.strictEqual(await inpTestChange.getProperty("value"), "1", "Fired 'change' event once.");
		let selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT1, "Select label is correct.");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT1, "The 'value' property is correct.");

		await select.click();
		await select.keys("ArrowUp");
		await select.keys("Space");

		assert.strictEqual(await inpTestPreviewChange.getProperty("value"), "2", "Fired 'live-change' once more.");
		assert.strictEqual(await inpTestChange.getProperty("value"), "2", "Fired 'change' event once more.");
		selectTextHtml = await selectText.getHTML(false);
		assert.include(selectTextHtml, EXPECTED_SELECTION_TEXT2, "Select label is correct.");
		assert.strictEqual(await select.getProperty("value"), EXPECTED_SELECTION_TEXT2, "The 'value' property is correct.");
	});

	it("reverts value on ESC key", async () => {
		const btnRest = await browser.$("#clearCounter");
		await btnRest.click();

		const inpTestChange = await browser.$("#testChange");
		const inpTestPreviewChange = await browser.$("#testPreview");

		const select = await browser.$("#selTest");
		const selectText = select.shadow$(".ui5-select-label-root");
		const selectTextHtml = await selectText.getHTML(false);
		const selectedOption = await browser.$("#selectOptionsTest ui5-select-menu-option[selected]");

		await select.click();
		await select.keys("ArrowDown");
		await select.keys("Escape");

		const selectTextAfterEscape = await select.shadow$(".ui5-select-label-root").getHTML(false);

		assert.ok(await selectedOption.getProperty("selected"), "Initially selected item should remain selected");
		assert.strictEqual(await inpTestChange.getProperty("value"), "0", "Change event is not fired");
		assert.strictEqual(await inpTestPreviewChange.getProperty("value"), "2", "Fired 'live-change' twice - ArrDown and ESC.");
		assert.strictEqual(selectTextAfterEscape, selectTextHtml, "Select label is correct.");
	});

	it("fires 'change' event after preview selection + focusout", async () => {
		const btnRest = await browser.$("#clearCounter");
		await btnRest.click();

		const select = await browser.$("#selTest");
		const btn = await browser.$("#btnFocusOut");
		const inpTestChange = await browser.$("#testChange");
		const inpTestPreviewChange = await browser.$("#testPreview");

		await select.click();
		await select.keys("ArrowUp");
		assert.strictEqual(await inpTestPreviewChange.getProperty("value"), "1", "Fired live-change event once.");

		// focus out select
		await btn.click();

		assert.strictEqual(await inpTestChange.getProperty("value"), "1", "Change event should be fired after focus out");
	});

	it("Tests accessible-name on SelectMenuOption", async () => {
		const menu = await browser.$("#selectOptions");
		const options = await menu.$$("ui5-select-menu-option");

		const EXPECTED_FIRST_OPTION_ACCESSIBLE_NAME = "T-shirt size S";
		const EXPECTED_SECOND_OPTION_ACCESSIBLE_NAME = "Dress size M";
		const EXPECTED_THIRD_OPTION_ACCESSIBLE_NAME = "Skirt size L";

		assert.strictEqual(await options[0].getProperty("accessibleName"), EXPECTED_FIRST_OPTION_ACCESSIBLE_NAME,
			"The accessible-name property on first ui5-select-menu-option is correctly set.");
		assert.strictEqual(await options[1].getProperty("accessibleName"), EXPECTED_SECOND_OPTION_ACCESSIBLE_NAME,
			"The accessible-name property on second ui5-select-menu-option is correctly set.");
		assert.strictEqual(await options[2].getProperty("accessibleName"), EXPECTED_THIRD_OPTION_ACCESSIBLE_NAME,
			"The accessible-name property on third ui5-select-menu-option is correctly set.");
	});
});
