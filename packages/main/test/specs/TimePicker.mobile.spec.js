import { assert } from "chai";

/**
 *
 * @param {Array} options.keys The bundle keys of the texts
 * @param {String} options.id ID of the component to get the texts from
 * @returns
 */
async function getResourceBundleTexts(options) {
	return browser.executeAsync((options, done) => {
		const component = document.getElementById(options.id);

		const texts = options.keys.reduce((result, key) => {
			result[key] = component.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts[key])
			return result;
		}, {});
		done(texts);

	}, options);
}

describe.skip("TimePicker on phone - general interactions", () => {
	before(async () => {
		await browser.url(`test/pages/TimePicker.html?sap-ui-language=bg`);
		await browser.emulateDevice('iPhone X');
	});

	it("opening of popover with numeric inputs", async () => {
		const timePicker = await browser.$("#timepicker");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker");
		const timePickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const timeSelectionInputs = await timePickerPopover.$('div.popover-content').$('ui5-time-selection-inputs');
		const components = await timeSelectionInputs.shadow$$('ui5-input');
		const hoursInnerInput = await components[0].shadow$("input");
		const minutesInnerInput = await components[1].shadow$("input");
		const secondsInnerInput = await components[2].shadow$("input");

		// act
		await timePicker.setProperty("value", "11:12:13");
		await timePicker.shadow$("ui5-input").click();

		// assert
		assert.ok(await timePickerPopover.getAttribute("open"), "Popover found");
		assert.ok(await timeSelectionInputs, "TimeSelectionInputs found");
		assert.strictEqual(await components.length, 3, "Found 3 Inputs");
		assert.strictEqual(await hoursInnerInput.getValue(), "11", "Correct hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "12", "Correct minutes value is set");
		assert.strictEqual(await secondsInnerInput.getValue(), "13", "Correct seconds value is set");
	});

	it("value change with numeric inputs on OK and Cancel button press", async () => {
		const timePicker = await browser.$("#timepicker3");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker3");
		const timePickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const timePickerPopoverButtons = await timePickerPopover.$('div.ui5-time-picker-footer').$$("ui5-button");
		const timeSelectionInputs = await timePickerPopover.$('div.popover-content').$('ui5-time-selection-inputs');
		const components = await timeSelectionInputs.shadow$$('ui5-input');
		const hoursInnerInput = await components[0].shadow$("input");
		const minutesInnerInput = await components[1].shadow$("input");
		const secondsInnerInput = await components[2].shadow$("input");
		const amPmButton = await timeSelectionInputs.shadow$('ui5-segmented-button');
		const amPmButtonItems = await amPmButton.$$("ui5-segmented-button-item");

		// act
		await timePicker.setProperty("value", "10:20:30 AM");
		await timePicker.shadow$("ui5-input").click();

		await hoursInnerInput.setValue("11");
		await minutesInnerInput.setValue("22");
		await secondsInnerInput.setValue("33");
		await amPmButtonItems[1].click(); // click on PM button

		// assert
		assert.strictEqual(await hoursInnerInput.getValue(), "11", "Correct new hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "22", "Correct new minutes value is set");
		assert.strictEqual(await secondsInnerInput.getValue(), "33", "Correct new seconds value is set");

		// act
		await timePickerPopoverButtons[0].click(); // click on OK button

		// assert
		assert.strictEqual((await timePicker.getAttribute("value")).toUpperCase(), "11:22:33 PM", "Correct new time is set to the TimePicker");

		// act
		await timePicker.shadow$("ui5-input").click();
		await hoursInnerInput.setValue("10");
		await minutesInnerInput.setValue("20");
		await secondsInnerInput.setValue("30");

		// assert
		assert.strictEqual(await hoursInnerInput.getValue(), "10", "Correct new hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "20", "Correct new minutes value is set");
		assert.strictEqual(await secondsInnerInput.getValue(), "30", "Correct new seconds value is set");

		// act
		await timePickerPopoverButtons[1].click(); // click on Cancel button

		// assert
		assert.strictEqual((await timePicker.getAttribute("value")).toUpperCase(), "11:22:33 PM", "New time is not set to the TimePicker");
	});

	it("direct number typing", async () => {
		const timePicker = await browser.$("#timepicker");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker");
		const timePickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const timePickerPopoverButtons = await timePickerPopover.$('div.ui5-time-picker-footer').$$("ui5-button");
		const timeSelectionInputs = await timePickerPopover.$('div.popover-content').$('ui5-time-selection-inputs');
		const components = await timeSelectionInputs.shadow$$('ui5-input');
		const hoursInnerInput = await components[0].shadow$("input");
		const minutesInnerInput = await components[1].shadow$("input");
		const secondsInnerInput = await components[2].shadow$("input");

		// act
		await timePicker.setProperty("value", "10:20:30 AM");
		await timePicker.shadow$("ui5-input").click();
		await browser.keys(["0", "8", "2", "4", "1", "3"]);

		// assert
		assert.strictEqual(await hoursInnerInput.getValue(), "08", "Correct new hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "24", "Correct new minutes value is set");
		assert.strictEqual(await secondsInnerInput.getValue(), "13", "Correct new seconds value is set");

		// act
		await timePickerPopoverButtons[0].click(); // click on OK button

		// assert
		assert.strictEqual((await timePicker.getAttribute("value")).toUpperCase(), "08:24:13", "New time is not set to the TimePicker");

		// act
		await timePicker.shadow$("ui5-input").click();
		await browser.keys(["3", "6", "8"]);

		// assert
		assert.strictEqual(await hoursInnerInput.getValue(), "03", "Correct new hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "06", "Correct new minutes value is set");
		assert.strictEqual(await secondsInnerInput.getValue(), "08", "Correct new seconds value is set");

		// act
		await timePickerPopoverButtons[0].click(); // click on OK button

		// assert
		assert.strictEqual((await timePicker.getAttribute("value")).toUpperCase(), "03:06:08", "New time is not set to the TimePicker");

		// act
		await timePicker.shadow$("ui5-input").click();
		await browser.keys(["4", "5"]);

		// assert
		assert.strictEqual(await hoursInnerInput.getValue(), "04", "Correct new hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "05", "Correct new minutes value is set");

		// act
		await browser.pause(1500); // simulate cooldown
		await browser.keys(["3", "2", "1", "0"]);

		// assert
		assert.strictEqual(await hoursInnerInput.getValue(), "04", "Correct new hours value is set");
		assert.strictEqual(await minutesInnerInput.getValue(), "32", "Correct new minutes value is set");
		assert.strictEqual(await secondsInnerInput.getValue(), "10", "Correct new seconds value is set");


		// act
		await timePickerPopoverButtons[0].click(); // click on OK button

		// assert
		assert.strictEqual((await timePicker.getAttribute("value")).toUpperCase(), "04:32:10", "New time is not set to the TimePicker");
	});

});

describe.skip("TimePicker on phone - accessibility and other input attributes", () => {
	before(async () => {
		await browser.url(`test/pages/TimePicker.html?sap-ui-language=bg`);
		await browser.emulateDevice('iPhone X');
	});

	it("accessibility attributes of numeric inputs", async () => {
		const timePicker = await browser.$("#timepicker");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker");
		const timePickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const timeSelectionInputs = await timePickerPopover.$('div.popover-content').$('ui5-time-selection-inputs');
		const components = await timeSelectionInputs.shadow$$('ui5-input');
		const hoursInnerInput = await components[0].shadow$("input");
		const minutesInnerInput = await components[1].shadow$("input");
		const secondsInnerInput = await components[2].shadow$("input");

		const keys = [
			"TIMEPICKER_INPUTS_ENTER_HOURS",
			"TIMEPICKER_INPUTS_ENTER_MINUTES",
			"TIMEPICKER_INPUTS_ENTER_SECONDS",
		];
		const texts = await getResourceBundleTexts({ keys, id: "timepicker" });

		// act
		await timePicker.shadow$("ui5-input").click();

		// assert
		assert.strictEqual(await hoursInnerInput.getAttribute("step"), "1", "Correct hours 'step' attribute");
		assert.strictEqual(await hoursInnerInput.getAttribute("min"), "0", "Correct hours 'min' attribute");
		assert.strictEqual(await hoursInnerInput.getAttribute("max"), "23", "Correct hours 'max' attribute");
		assert.strictEqual(await hoursInnerInput.getAttribute("aria-label"), texts.TIMEPICKER_INPUTS_ENTER_HOURS, "Correct hours 'aria-label' attribute");

		assert.strictEqual(await minutesInnerInput.getAttribute("step"), "1", "Correct minutes 'step' attribute");
		assert.strictEqual(await minutesInnerInput.getAttribute("min"), "0", "Correct minutes 'min' attribute");
		assert.strictEqual(await minutesInnerInput.getAttribute("max"), "59", "Correct minutes 'max' attribute");
		assert.strictEqual(await minutesInnerInput.getAttribute("aria-label"), texts.TIMEPICKER_INPUTS_ENTER_MINUTES, "Correct minutes 'aria-label' attribute");

		assert.strictEqual(await secondsInnerInput.getAttribute("step"), "1", "Correct seconds 'step' attribute");
		assert.strictEqual(await secondsInnerInput.getAttribute("min"), "0", "Correct seconds 'min' attribute");
		assert.strictEqual(await secondsInnerInput.getAttribute("max"), "59", "Correct seconds 'max' attribute");
		assert.strictEqual(await secondsInnerInput.getAttribute("aria-label"), texts.TIMEPICKER_INPUTS_ENTER_SECONDS, "Correct seconds 'aria-label' attribute");
	});

	it("other important attributes of numeric inputs", async () => {
		const timePicker = await browser.$("#timepicker");
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#timepicker");
		const timePickerPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");
		const timeSelectionInputs = await timePickerPopover.$('div.popover-content').$('ui5-time-selection-inputs');
		const components = await timeSelectionInputs.shadow$$('ui5-input');
		const hoursInnerInput = await components[0].shadow$("input");
		const minutesInnerInput = await components[1].shadow$("input");
		const secondsInnerInput = await components[2].shadow$("input");

		// act
		await timePicker.shadow$("ui5-input").click();

		// assert
		assert.strictEqual(await hoursInnerInput.getAttribute("type"), "number", "Correct hours 'type' attribute");
		assert.strictEqual(await hoursInnerInput.getAttribute("autocomplete"), "off", "Correct hours 'autocomplete' attribute");
		assert.strictEqual(await hoursInnerInput.getAttribute("pattern"), "[0-9]*", "Correct hours 'pattern' attribute");
		assert.strictEqual(await hoursInnerInput.getAttribute("inputmode"), "numeric", "Correct hours 'inputmode' attribute");

		assert.strictEqual(await minutesInnerInput.getAttribute("type"), "number", "Correct minutes 'type' attribute");
		assert.strictEqual(await minutesInnerInput.getAttribute("autocomplete"), "off", "Correct minutes 'autocomplete' attribute");
		assert.strictEqual(await minutesInnerInput.getAttribute("pattern"), "[0-9]*", "Correct minutes 'pattern' attribute");
		assert.strictEqual(await minutesInnerInput.getAttribute("inputmode"), "numeric", "Correct minutes 'inputmode' attribute");

		assert.strictEqual(await secondsInnerInput.getAttribute("type"), "number", "Correct seconds 'type' attribute");
		assert.strictEqual(await secondsInnerInput.getAttribute("autocomplete"), "off", "Correct seconds 'autocomplete' attribute");
		assert.strictEqual(await secondsInnerInput.getAttribute("pattern"), "[0-9]*", "Correct seconds 'pattern' attribute");
		assert.strictEqual(await secondsInnerInput.getAttribute("inputmode"), "numeric", "Correct seconds 'inputmode' attribute");
	});

});
