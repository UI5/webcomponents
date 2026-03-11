import { assert } from "chai";


describe("BusyIndicator general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/BusyIndicator.html`);
	});

	it("tests event propagation", async () => {
		const dynamicItem = await browser.$(">>>#busy-tree [ui5-tree-item] ui5-icon.ui5-li-tree-toggle-icon");
		const input = await browser.$("#tree-input");

		await dynamicItem.click();
		await dynamicItem.keys("Space");

		assert.strictEqual(await input.getProperty("value"), "0", "itemClick is not thrown");
	});

	it("test activation", async () => {
		const busyIndicator = await browser.$("#busy-container");
		const busyArea = await busyIndicator.shadow$(".ui5-busy-indicator-busy-area");

		assert.notOk(await busyArea.isExisting(), "busy area is not yet created");

		await busyIndicator.setAttribute("active", "");

		await busyArea.waitForExist({
			timeout: 3000,
			timeoutMsg: "Busy area must be created after 3000ms"
		});

		// reset
		await busyIndicator.removeAttribute("active");
		assert.notOk(await busyArea.isExisting(), "busy area is removed");
	});

	it("tests focus handling", async () => {
		const busyIndicator = await browser.$("#indicator1");
		await busyIndicator.click();

		let innerFocusElement = await browser.custom$("activeElement", "#indicator1");

		innerFocusElement = await browser.$(innerFocusElement);

		assert.ok((await innerFocusElement.getAttribute("class")).includes("ui5-busy-indicator-busy-area"), "The correct inner element is focused");
	});

	it("tests internal focused element attributes", async () => {
		const busyIndicator = await browser.$("#indicator1");
		await busyIndicator.click();
		const innerFocusElement = await busyIndicator.shadow$(".ui5-busy-indicator-busy-area");

		assert.strictEqual(await innerFocusElement.getAttribute("role"), "progressbar", "Correct 'role' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("tabindex"), "0", "Correct 'tabindex' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("aria-valuemin"), "0", "Correct 'aria-valuemin' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("aria-valuemax"), "100", "Correct 'aria-valuemax' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("aria-valuetext"), "Busy", "Correct 'aria-valuetext' is set");
	});

	it("tests content is not reachable with keyboard when active in both directions", async () => {
		const beforeBusyIndicator = await browser.$("#beforeIndicatorWithBtn");
		const busyIndicator = await browser.$("#indicatorWithBtn");
		const afterBusyIndicator = await browser.$("#afterIndicatorWithBtn");

		await beforeBusyIndicator.click();
		await browser.keys("Tab");
		let activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await busyIndicator.getAttribute("id"), "Correct element is focused with TAB");

		await browser.keys("Tab");
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await afterBusyIndicator.getAttribute("id"), "Correct element is focused with TAB");

		await browser.keys(["Shift", "Tab"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await busyIndicator.getAttribute("id"), "Correct element is focused with SHIFT + TAB");

		await browser.keys(["Shift", "Tab"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await beforeBusyIndicator.getAttribute("id"), "Correct element is focused with SHIFT + TAB");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", async () => {
		await browser.$("#open-dialog-inactive-indicator").click();

		const activeElement = await browser.getActiveElement();
		assert.strictEqual(
			await browser.$(activeElement).getAttribute("id"),
			await browser.$("#dialog-inactive-indicator-focused-button").getAttribute("id"),
			"Correct element from default slot is focused"
		);

		await browser.keys("Escape");
	});

	it("delayed indicator in dialog - shouldn't attempt to focus before the indicator is visible", async () => {
		await browser.$("#open-dialog-delayed-indicator").click();

		const activeElement = await browser.getActiveElement();
		assert.strictEqual(
			await browser.$(activeElement).getAttribute("id"),
			"dialog-delayed-indicator-focus-stop",
			"Correct element is focused"
		);

		await browser.keys("Escape");
	});

	it("Height of the root element depends on the height of the Busy Indicator - issue 6668", async () => {
		const busyIndicator = await browser.$("#busy-indicator-height");
		const height = parseInt((await busyIndicator.shadow$(".ui5-busy-indicator-root").getCSSProperty("height")).value);

		assert.equal(height, 144, "Height of the root element inherits the height of the Busy Indicator");
	});
});
