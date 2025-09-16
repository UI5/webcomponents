import { assert } from "chai";

const getVisibleItems = async (combo) => {
	const items = await combo.$$("ui5-cb-item");
	const filteredItems = await Promise.all(items.map(async item => {
			return (await item.getProperty("_isVisible")) ? item : null;
	}));

	// filter out null values
	return filteredItems.filter(item => item !== null);
};

const getVisibleGroupItems = async (combo) => {
	const items = await combo.$$("ui5-cb-item-group");
	const filteredItems = await Promise.all(items.map(async item => {
			return (await item.getProperty("_isVisible")) ? item : null;
	}));

	// filter out null values
	return filteredItems.filter(item => item !== null);
};

describe("Basic mobile picker rendering and interaction", () => {
	beforeEach(async () => {
		await browser.url("test/pages/ComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should render properly the mobile picker", async () => {
		const combo = await browser.$("#combo2");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]");
		assert.ok(await dialogInput.isDisplayed(), "Input is displayed");

		const dialogCloseButton = await combo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		assert.ok(await dialogCloseButton.isDisplayed(), "Close icon is displayed");

		const dialogOkButton = await combo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		assert.ok(await dialogOkButton.isDisplayed(), "Ok button is displayed");
	});

	it("Should close the mobile picker dialog when pressing the close button", async () => {
		const combo = await $("#combo2");

		await combo.click();

		const picker = await combo.shadow$("ui5-responsive-popover");
		const dialogCloseButton = await picker.$(".ui5-responsive-popover-close-btn");
		
		assert.ok(await picker.isDisplayed(), "Picker is still opened");

		await dialogCloseButton.click();

		assert.notOk(await picker.isDisplayedInViewport(), "Picker is closed now");
	});

	it("Should close the mobile picker dialog when pressing the OK button", async () => {
		const combo = await browser.$("#combo2");
		const picker =  await combo.shadow$("ui5-responsive-popover");
		const dialogOkButton = await combo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");

		await combo.scrollIntoView();
		await combo.click();

		assert.ok(await picker.isDisplayed(), "Picker is opened");

		await dialogOkButton.click();

		assert.notOk(await picker.isDisplayedInViewport(), "Picker is closed now");
	});

	it("Should propagate the placeholder to the internal input", async () => {
		const combo = await browser.$("#placeholder_test");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await browser.$(`#placeholder_test`).shadow$("ui5-responsive-popover").$("[ui5-input]");
		assert.strictEqual(await dialogInput.getAttribute("placeholder"), await combo.getAttribute("placeholder"), "Correct placeholder shown");

		// close the suggestions
		await browser.keys("Escape");
	});

	it("Should open and close the mobile picker with value state", async () => {
		const comboBoxError = await browser.$("#value-state-error");

		await comboBoxError.scrollIntoView();
		await comboBoxError.click();

		const dialogInput = await comboBoxError.shadow$("ui5-responsive-popover").$("[ui5-input]").shadow$("input");
		await dialogInput.click();
		await dialogInput.keys("A");

		const popover = await comboBoxError.shadow$("ui5-responsive-popover");
		assert.ok(await popover.hasAttribute("open"), "Suggestions are open");

		// clear the input
		await dialogInput.keys("Escape");
		// close the suggestions
		await browser.keys("Escape");
		assert.notOk(await popover.hasAttribute("open"), "Suggestions are closed");
	});
});

describe("Eventing", () => {
	before(async () => {
		await browser.url("test/pages/ComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should fire change event with correct parameters on item press", async () => {
		const combo = await browser.$("#change-cb");

		await combo.scrollIntoView();
		await combo.click();

		const suggestionItem = (await getVisibleItems(combo))[1];
		await suggestionItem.click();

		assert.strictEqual(await combo.getAttribute("value"), "Bulgaria", "The combo box's value is updated properly");

		const changeText = await browser.$("#change-placeholder").getText();
		assert.strictEqual(changeText, "Bulgaria", "Change event value property was correct");

		const changeCountText = await browser.$("#change-count").getText();
		assert.strictEqual(changeCountText, "1", "Change was fired once");
	});

	it("Should fire input event with correct parameters when typing in internal input", async () => {
		const combo = await browser.$("#input-cb");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]").shadow$("input");

		await dialogInput.keys("A");
		await dialogInput.keys("B");
		await dialogInput.keys("C");

		const inputText = await browser.$("#input-placeholder").getText();
		assert.strictEqual(inputText, "ABC", "Input event value property was correct");

		const inputCountText = await browser.$("#input-count").getText();
		assert.strictEqual(inputCountText, "3", "Change was fired once");

		await combo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn").click();
	});

	it("Should not fire change event when pressing the picker's Close button", async () => {
		await browser.url("test/pages/ComboBox.html");
		const combo = await browser.$("#change-cb");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]");
		const closeButton = await combo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");

		await dialogInput.shadow$("input").keys("A");
		await closeButton.click();

		assert.notOk(await combo.getAttribute("value"), "The combo box does not have value attribute");

		const changeText = await browser.$("#change-placeholder").getText();
		assert.notOk(changeText, "No change in this field as no change event was fired");

		const changeCountText = await browser.$("#change-count").getText();
		assert.strictEqual(changeCountText, "0", "Change was fired once");
	});

	it("Should fire change event when pressing the picker's OK button", async () => {
		const combo = await browser.$("#change-cb");
		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]");
		const dialogOkButton = await combo.shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");

		await dialogInput.setProperty("value", "");
		await dialogInput.shadow$("input").keys("A");
		await dialogOkButton.click();

		assert.strictEqual(await combo.getAttribute("value"), "Argentina", "The combo box have correct value attribute");
		const changeText = await browser.$("#change-placeholder").getText();

		assert.strictEqual(changeText, "Argentina", "The field was changed as change event was fired");
		const changeCountText = await browser.$("#change-count").getText();

		assert.strictEqual(changeCountText, "1", "Change was fired once");
		assert.strictEqual(await combo.getValue(), "Argentina", "The original value was changed");

	});

	it ("When select an item, then open the dialog again and delete the text, then press OK button, the value should be deleted.", async ()=> {
		const cb = await browser.$("#combo2");

		await cb.click();

		const resPopover = await cb.shadow$("ui5-responsive-popover");
		const dialogInput = await resPopover.$("[ui5-input]");
		const okBtn = await resPopover.$(".ui5-responsive-popover-footer").$("ui5-button");

		await dialogInput.shadow$("input").click();
		await dialogInput.setProperty("value", '');
		await dialogInput.shadow$("input").keys('A');
		await okBtn.click();

		assert.strictEqual(await cb.getProperty("value"), "Algeria", "Value should be Algeria.");

		await cb.click();
		await dialogInput.shadow$("input").keys('Backspace');
		await dialogInput.shadow$("input").keys('Backspace');
		await dialogInput.shadow$("input").keys('Backspace');
		await dialogInput.shadow$("input").keys('Backspace');
		await dialogInput.shadow$("input").keys('Backspace');
		await dialogInput.shadow$("input").keys('Backspace');
		await dialogInput.shadow$("input").keys('Backspace');
		await okBtn.click();

		assert.strictEqual(await cb.getProperty("value"), "", "Value should be empty.");
	});

	it ("Should set clear icon to dialog's input", async () => {
		const cb = await $("#clear-icon-cb");

		await cb.shadow$("input").click();

		const resPopover = await cb.shadow$("ui5-responsive-popover");
		const dialogInput = await resPopover.$("[ui5-input]");

		assert.ok(await dialogInput.getProperty("showClearIcon"), "Clear icon should be propagated to internal ui5-input")
	});
});

describe("Typeahead", () => {
	before(async () => {
		await browser.url("test/pages/ComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should autocomplete the first matched suggestion item", async () => {
		const combo = await browser.$("#combo2");
		const sExpected = "Bulgaria";

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]");

		await dialogInput.shadow$("input").click();

		await browser.keys("B");
		await browser.keys("u");

		assert.strictEqual(await dialogInput.getProperty("value"), sExpected, "Value is autocompleted");
	});

	it("Should not perform typeahead when it is disabled", async () => {
		await browser.url("test/pages/ComboBox.html");

		const combo = await browser.$("#combo-without-type-ahead");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]").shadow$("input");
		await dialogInput.keys("b");
		assert.strictEqual(await dialogInput.getProperty("value"), "b", "Value is not autocompleted");
	});
});

describe("Picker filtering", () => {
	before(async () => {
		await browser.url("test/pages/ComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should filter items", async () => {
		const combo = await browser.$("#value-state-grouping");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]");

		assert.strictEqual((await getVisibleItems(combo)).length, 9, "All of the items are shown (8)");
		await dialogInput.keys("B");
		assert.strictEqual((await getVisibleItems(combo)).length, 4, "There are 4 filtered items");
	});

	it("Should filter group header list items", async () => {
		await browser.url("test/pages/ComboBox.html");

		const combo = await browser.$("#value-state-grouping");

		await combo.scrollIntoView();
		await combo.click();

		const dialogInput = await combo.shadow$("ui5-responsive-popover").$("[ui5-input]");

		assert.strictEqual((await getVisibleGroupItems(combo)).length, 3, "All of the group header list items are shown (3)");
		await dialogInput.keys("B");
		assert.strictEqual((await getVisibleGroupItems(combo)).length, 2, "There is only 1 visible group");
	});
});


describe("Value state header", () => {
	before(async () => {
		await browser.url("test/pages/ComboBox.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should show value state header inside mobile dialog", async () => {
		const combo = await browser.$("#value-state-grouping");

		await combo.scrollIntoView();
		await combo.click();

		const dialogStateHeader = await combo.shadow$("ui5-responsive-popover").$(".ui5-valuestatemessage-header");

		assert.strictEqual(await dialogStateHeader.isDisplayed(), true, "The value state header is shown");
	});
});
