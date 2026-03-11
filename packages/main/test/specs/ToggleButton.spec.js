import { assert } from "chai";

describe("ToggleButton general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/ToggleButton.html`);
	});

	it("should fire click event on a normal togglebutton", async () => {
		const toggleButton = await browser.$("#toggle-button");
		const result = await browser.$("#click-result");

		await toggleButton.click();
		assert.strictEqual(await result.getText(), "ToggleButton: true", "click event changed pressed state");

		await toggleButton.keys("Space");
		assert.strictEqual(await result.getText(), "ToggleButton: false", "Space triggered click and changed pressed state");

		await toggleButton.keys("Enter");
		assert.strictEqual(await result.getText(), "ToggleButton: true", "Enter triggered click and changed pressed state");
	});

	it("should not fire click event on a disabled togglebutton", async () => {
		const toggleButton = await browser.$("#disabled-toggle-button").shadow$("button");
		const result = await browser.$("#click-result");

		assert.strictEqual(await result.getText(), "ToggleButton: true", "toggle state should not change");

		// don't test space and enter, as wdio always fires a click but the browser not.

		// await toggleButton.keys("Space");
		// assert.strictEqual(await result.getText(), "ToggleButton: true", "2Press event is fired with: { pressed: true }");

		// await toggleButton.keys("Enter");
		// assert.strictEqual(await result.getText(), "ToggleButton: true", "3Press event is fired with: { pressed: true }");
	});
});
