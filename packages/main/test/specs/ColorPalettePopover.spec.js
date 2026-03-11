import { assert } from "chai";

describe("ColorPalette interactions", () => {
	before(async () => {
		await browser.url(`test/pages/ColorPalettePopover.html`);
	});

	it("Test if focusing first element works on initial open", async () => {
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest");
		const responsivePopover = await colorPalettePopover.shadow$("[ui5-responsive-popover]")
		const colorPalette = await responsivePopover.$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		// assert - default btn is focused
		assert.ok(await defaultButton.matches(":focus"),  "The first element is focused");

		// act - close popover
		await defaultButton.click();
	});

	it("Test if default color functionality works", async () => {
		const DEFAULT_COLOR =  "green";
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest2");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest2");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		// act - activate default color
		await defaultButton.keys("Space");

		// assert - "green" is selected as default color
		assert.strictEqual(await colorPalette.getProperty("selectedColor"), DEFAULT_COLOR, "The selected value is green");
	});

	it("Test if keyboard navigation on elements works", async () => {
		const EXPTECTED_COLOR = "pink"
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest3");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest3");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const colorPaletteEntries = await colorPalette.shadow$$("[ui5-color-palette-item]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");
		const item = colorPaletteEntries[0];

		// act - navigate to a color with "ArrowDown"
		await defaultButton.keys("ArrowDown");
		await item.keys("Space");

		// assert - "pink" is selected with "SPACE"
		assert.strictEqual(await colorPalette.getProperty("selectedColor"), EXPTECTED_COLOR, "The selected value is pink");
	});

	it("Test if keyboard navigation on elements works", async () => {
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest4");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest4");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const moreColorsButton = await colorPalette.shadow$(".ui5-cp-more-colors");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		await defaultButton.keys("ArrowUp");

		// assert - MoreColors button is focused
		assert.ok(await moreColorsButton.matches(":focus"),  "Button 'MoreColors' is focused");

		// act - close popover
		await defaultButton.click();
	});

	it("Tests navigation with recent colors", async () => {
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest5");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest5");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");
		const moreColorsButton = await colorPalette.shadow$(".ui5-cp-more-colors");
		const firstRecentColorsElement = await colorPalette.shadow$(".ui5-cp-recent-colors-container [ui5-color-palette-item]");

		// act - press default color btn and re-open color palette popover
		await defaultButton.keys("Space");
		await colorPaletteButton.click();

		// act - navigate to recent colors
		await defaultButton.keys("ArrowUp");
		await firstRecentColorsElement.keys("ArrowUp");

		// assert - MoreColors is focused
		assert.ok(await moreColorsButton.matches(":focus"),  "Check if more colors button is focused");

		// act - close popover
		await defaultButton.click();
	});

	it("Test 'close' event fired when popover closes", async () => {
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest6");
		const btnFocusOut = await browser.$("#btnFocusOut");
		const inpOpenChangeCounter = await browser.$("#inpOpenChangeCounter");

		// act - open color palette popover and click outside
		await colorPaletteButton.click();
		await btnFocusOut.click();

		// assert
		assert.ok(await inpOpenChangeCounter.getProperty("value"), "1", "Event 'close' fired when popover closes.");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest6");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");
		const defaultButton = await colorPalette.shadow$(".ui5-cp-default-color-button");

		// act - select default color
		await defaultButton.click();

		// assert
		assert.ok(await inpOpenChangeCounter.getProperty("value"), "2", "Event 'close' fired when popover closes.");
	});

	it("Test attribute propagation propagation", async () => {
		const colorPaletteButton = await browser.$("#colorPaletteBtnTest");

		// act - open color palette popover
		await colorPaletteButton.click();

		const colorPalettePopover = await browser.$("#colorPalettePopoverTest");
		const colorPalette = await colorPalettePopover.shadow$("[ui5-responsive-popover]").$("[ui5-color-palette]");

		// assert
		assert.ok(await colorPalette.getProperty("showDefaultColor"), "Check if default color is on");
		assert.ok(await colorPalette.getProperty("showRecentColors"), "Check if recent colors is on");
		assert.ok(await colorPalette.getProperty("showMoreColors"), "Check if more colors is on");
	})

});
