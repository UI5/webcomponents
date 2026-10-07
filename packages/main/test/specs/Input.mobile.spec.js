import { assert } from "chai";

describe.skip("Basic mobile picker rendering and interaction", () => {
	before(async () => {
		await browser.url("test/pages/Input.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should render properly the mobile picker", async () => {
		const input = await browser.$("#myInput2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		assert.ok(await dialogInput.isDisplayed(), "Input is displayed");

		const dialogCloseButton = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");
		assert.ok(await dialogCloseButton.isDisplayed(), "Close icon is displayed");

		const dialogOkButton = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");
		assert.ok(await dialogOkButton.isDisplayed(), "Ok button is displayed");
	});

	it("Should focus the input after picker is opened", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2")

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		assert.ok(await dialogInput.isDisplayed(), "Input is displayed");

		assert.strictEqual(await dialogInput.getAttribute("focused"), "", "Input is focused");
	});

	it("Should close the mobile picker dialog when pressing the close button", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2");
		const picker =  await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const dialogCloseButton = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-close-btn");

		assert.ok(await picker.isDisplayed(), "Picker is still opened");

		await dialogCloseButton.click();

		assert.notOk(await picker.isDisplayedInViewport(), "Picker is closed now");
	});

	it("Should close the mobile picker dialog when pressing the OK button", async () => {
		const input = await browser.$("#myInput2");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2");
		const picker =  await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const dialogOkButton = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-responsive-popover-footer").$("ui5-button");

		await input.scrollIntoView();
		await input.click();

		assert.ok(await picker.isDisplayed(), "Picker is opened");

		await dialogOkButton.click();

		assert.notOk(await picker.isDisplayedInViewport(), "Picker is closed now");
	});

	it("Should propagate the placeholder to the internal input", async () => {
		const input = await browser.$("#myInput");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput");

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		assert.strictEqual(await dialogInput.getAttribute("placeholder"), await input.getAttribute("placeholder"), "Correct placeholder shown");
	});
});

describe.skip("Eventing", () => {
	before(async () => {
		await browser.url("test/pages/Input.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should fire events with correct parameters on item press", async () => {
		const input = await browser.$("#myInput");
		const sExpectedSelectedKey = "Bg";
		const sChangeText = "Bulgaria";
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		await dialogInput.keys("b");

		const suggestionItem = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$$("ui5-li-suggestion-item")[2];
		await suggestionItem.click();


		const selectedKey = await browser.$("#myLabel").getText();
		assert.strictEqual(selectedKey.split(" :: ")[1], sExpectedSelectedKey, "Selected key event property was correct");

		const change = await browser.$("#myLabelChange").getText();
		assert.strictEqual(change.split(" :: ")[1], sChangeText, "Change event property was correct");

		const liveChange = await browser.$("#myLabelLiveChange").getText();
		assert.strictEqual(liveChange.split(" :: ")[1], sChangeText, "liveChange event property was correct");
	});
});

describe.skip("Typeahead", () => {
	before(async () => {
		await browser.url("test/pages/Input.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should autocomplete the first matched suggestion item", async () => {
		const input = await browser.$("#myInput2");
		const sExpected = "Cozy";
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput2")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		await dialogInput.keys("c");
		assert.strictEqual(await dialogInput.getProperty("value"), sExpected, "Value is autocompleted");
	});

	it("Should not perform typeahead when it is disabled", async () => {
		await browser.url("test/pages/Input.html");

		const input = await browser.$("#input-disabled-autocomplete");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#input-disabled-autocomplete")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		await dialogInput.keys("c");

		assert.strictEqual(await dialogInput.getProperty("value"), "c", "Value is not autocompleted");
	});
});

describe.skip("Clear icon", () => {
	before(async () => {
		await browser.url("test/pages/Input.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Showld show the clear icon of the dialog's input when text is entered", async () => {
		const input = await browser.$("#clear-input-suggestions");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#clear-input-suggestions")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");

		assert.strictEqual(await dialogInput.getAttribute("_effective-show-clear-icon"), null, "There is no clear icon initially");
		await dialogInput.keys("t");

		assert.strictEqual(await dialogInput.getAttribute("_effective-show-clear-icon"), "", "Clear icon is shown");
	});
});

describe.skip("Picker filtering", () => {
	before(async () => {
		await browser.url("test/pages/Input.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should filter items", async () => {
		const input = await browser.$("#myInput");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput")

		await input.scrollIntoView();
		await input.click();

		const dialogInput = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-input-inner-phone");
		const dialogList = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$('ui5-list')

		assert.strictEqual(await dialogList.$$('ui5-li-suggestion-item').length, 0, "There are no filtered items initially");
		await dialogInput.keys("B");
		assert.strictEqual(await dialogList.$$('ui5-li-suggestion-item').length, 4, "There are 4 filtered items");
	});

	it("Should filter group header list items", async () => {
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#myInput")
		const dialogList = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$('ui5-list')

		assert.strictEqual(await dialogList.$$('ui5-li-groupheader').length, 1, "There is 1 filtered group header");
	});
});

describe.skip("Value state header", () => {
	before(async () => {
		await browser.url("test/pages/Input.html");
		await browser.emulateDevice('iPhone X');
	});

	it("Should show value state header inside mobile dialog", async () => {
		const input = await browser.$("#inputError");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#inputError")

		await input.scrollIntoView();
		await input.click();

		const dialogStateHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover").$(".ui5-valuestatemessage-header");

		assert.strictEqual(await dialogStateHeader.isDisplayed(), true, "The value state header is shown");
	});
});