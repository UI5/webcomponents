import { assert } from "chai";

describe.skip("ResponsivePopover mobile general interaction", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
		await browser.url(`test/pages/ResponsivePopover.html`);
	});

	it("tests opening a popover from a responsive popover", async () => {
		const btnOpenRP = await browser.$("#btnRpWithPopover");

		await btnOpenRP.click();

		const btnOpenPopover = await browser.$("#btnRpWithPopoverOpener");
		await btnOpenPopover.click();

		const popover = await browser.$("#btnRpWithPopoverInnerPopover");
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");
	});
});

describe.skip("Acc", () => {
	before(async () => {
		await browser.emulateDevice('iPhone X');
		await browser.url(`test/pages/ResponsivePopover.html`);
	});

	it("tests accessible-role", async () => {
		const respPopover = await browser.$("#respPopover");

		assert.strictEqual(await respPopover.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("role"), "dialog","The default role is applied.");
		assert.strictEqual(await respPopover.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal=true is applied.");

		const respPopoverAlertRole = await browser.$("#rPAlertRole");

		assert.strictEqual(await respPopoverAlertRole.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("role"), "alertdialog", "role='alertdialog' is applied.");
		assert.strictEqual(await respPopoverAlertRole.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("aria-modal"), "true", "aria-modal=true is applied.");

		const respPopoverNoneRole = await browser.$("#rPNoneRole");

		assert.notOk(await respPopoverNoneRole.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("role"), "role is not set.");
		assert.notOk(await respPopoverNoneRole.shadow$("[ui5-dialog]").shadow$(".ui5-popup-root").getAttribute("aria-modal"), "aria-modal not set.");
	});

	it("tests initial focus", async () => {
		await browser.$("#btnOpen").click();

		assert.ok(await browser.$("#emailInput").isFocused(), "focus is correct.");
		await browser.keys("Escape");
	});
});