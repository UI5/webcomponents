import { assert } from "chai";

describe.skip("Mobile: TabContainer general interaction", () => {
	before(async () => {
		await browser.url("test/pages/TabContainer.html");
		await browser.emulateDevice("iPhone X");
	});

	it("should close the overflow popover when pressing the cancel button", async () => {
		const moreButton = await browser.$("#tabContainerNestedTabs").shadow$(`[data-ui5-stable="overflow-end"]`);
		await moreButton.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerNestedTabs");
		let overflow = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const closeButton = await overflow.$("ui5-button");

		assert.ok(await overflow.getProperty("open"), "Overflow is opened");

		await closeButton.click();

		assert.notOk(await overflow.getProperty("open"), "Overflow is closed");
	});
});