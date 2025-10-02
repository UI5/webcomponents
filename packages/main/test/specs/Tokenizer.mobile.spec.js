import { assert } from "chai";

async function getResourceBundleTexts(keys) {
	return browser.executeAsync((keys, done) => {
		const tokenizer = document.getElementById("nmore-tokenizer");

		const texts = keys.reduce((result, key) => {
			result[key] = tokenizer.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key], 3)
			return result;
		}, {});
		done(texts);

	}, keys);
}

describe("Tokenizer general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("n-more picker dialog is properly rendered", async () => {
		const tokenizer = await browser.$("#nmore-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");
		const keys = [
			"TOKENIZER_POPOVER_REMOVE",
		];
		const texts = await getResourceBundleTexts(keys);

		await nMoreLabel.click();

		const nMoreDialog = await tokenizer.shadow$("ui5-responsive-popover");

		assert.ok(await nMoreDialog.getProperty("open"), "More Popover should be open");
		assert.ok(await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button[design='Emphasized']").isDisplayed(), "More Popover OK button is shown");
		assert.ok(await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button[design='Transparent']").isDisplayed(), "More Popover Cancel button is shown");
		assert.strictEqual(await nMoreDialog.$(".ui5-responsive-popover-header .ui5-responsive-popover-header-text").getText(), texts.TOKENIZER_POPOVER_REMOVE, "More Popover title is correctly translated");
	});
});

describe("Deleting tokens", () => {
	beforeEach(async () => {
		await browser.url(`test/pages/Tokenizer.html`);
		await browser.emulateDevice('iPhone X');
	});

	it("Should fire the ui5-token-delete event when the 'X' is pressed in the n-more picker and confirmed with OK", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const nMoreDialog = await tokenizer.shadow$("ui5-responsive-popover");
		const firstlistItemDeleteButton = await nMoreDialog.$$("ui5-li")[0].shadow$('.ui5-li-deletebtn ui5-button');
		const secondlistItemDeleteButton = await nMoreDialog.$$("ui5-li")[1].shadow$('.ui5-li-deletebtn ui5-button');

		await firstlistItemDeleteButton.click();
		await secondlistItemDeleteButton.click();
		await nMoreDialog.$(".ui5-responsive-popover-footer ui5-button").click();

		const deletedTokensLabel = await browser.$("#deletedTokensLabel");
		const deleteFiredLabel = await browser.$("#deleteFiredLabel");

		const tokens = await tokenizer.$$("ui5-token");

		assert.equal(await deletedTokensLabel.getText(), "Event [token-delete] :: Andora, Bulgaria", "should have 2 deleted tokens");
		assert.equal(await deleteFiredLabel.getText(), "Event [token-delete] counter :: 1", "Event should be fired once");
		assert.equal(tokens.length, 3, "should have 3 tokens");

		await nMoreLabel.click();

		assert.ok(await nMoreDialog.getProperty("open"), "Popover should be opened.");
		assert.strictEqual(await nMoreDialog.$$("ui5-li").length, 3, "3 items should be present");
		assert.ok(await nMoreDialog.$("ui5-li").matches(":focus"), "First item should be focused on open");
	});

	it("Should NOT fire the ui5-token-delete event when no items are deleted and OK is pressed", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const nMoreDialog = await tokenizer.shadow$("ui5-responsive-popover");

		await nMoreDialog.$$(".ui5-responsive-popover-footer ui5-button")[1].click();

		const deletedTokensLabel = await browser.$("#deletedTokensLabel");
		const deleteFiredLabel = await browser.$("#deleteFiredLabel");

		const tokens = await tokenizer.$$("ui5-token");

		assert.equal(await deletedTokensLabel.getText(), "Event [token-delete] :: N/A", "should have no deleted tokens");
		assert.equal(await deleteFiredLabel.getText(), "Event [token-delete] counter :: N/A", "Event should not be fired");
		assert.equal(tokens.length, 5, "should have 5 tokens");
	});

	it("Should NOT fire the ui5-token-delete event when the 'X' is pressed in the n-more picker and canceled", async () => {
		const tokenizer = await browser.$("#delete-tokenizer");
		const nMoreLabel = await tokenizer.shadow$(".ui5-tokenizer-more-text");

		await nMoreLabel.click();

		const nMoreDialog = await tokenizer.shadow$("ui5-responsive-popover");
		const firstlistItemDeleteButton = await nMoreDialog.$$("ui5-li")[0].shadow$('.ui5-li-deletebtn ui5-button');
		const secondlistItemDeleteButton = await nMoreDialog.$$("ui5-li")[1].shadow$('.ui5-li-deletebtn ui5-button');

		await firstlistItemDeleteButton.click();
		await secondlistItemDeleteButton.click();
		await nMoreDialog.$$(".ui5-responsive-popover-footer ui5-button")[1].click();

		const deletedTokensLabel = await browser.$("#deletedTokensLabel");
		const deleteFiredLabel = await browser.$("#deleteFiredLabel");

		const tokens = await tokenizer.$$("ui5-token");

		assert.equal(await deletedTokensLabel.getText(), "Event [token-delete] :: N/A", "should have no deleted tokens");
		assert.equal(await deleteFiredLabel.getText(), "Event [token-delete] counter :: N/A", "Event should not be fired");
		assert.equal(tokens.length, 5, "should have 5 tokens");

		await nMoreLabel.click();

		assert.ok(await nMoreDialog.getProperty("open"), "Popover should be opened.");
		assert.strictEqual(await nMoreDialog.$$("ui5-li").length, 5, "All items should be present");
		assert.ok(await nMoreDialog.$("ui5-li").matches(":focus"), "First item should be focused on open");
	});
});