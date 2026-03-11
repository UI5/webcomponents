import { assert } from "chai";

describe("Wizard general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Wizard_test.html`);
	});

	it("test initial state", async () => {
		const wiz = await browser.$("#wizTest");
		const step1 = await browser.$("#st1");
		const step1InHeader = await wiz.shadow$(`[data-ui5-index="1"]`);

		// assert - that first step in the content and in the header are properly selected
		assert.strictEqual(await step1.getAttribute("selected"), "true",
			"First step in the content is selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), "true",
			"First step  in the header is selected.");
	});

	it("ARIA Attributes", async () => {
		const wiz = await browser.$("#wizTest");
		const wizRoot = await wiz.shadow$(".ui5-wiz-root");
		const wizNav = await wiz.shadow$(".ui5-wiz-nav");
		const wizList = await wiz.shadow$(".ui5-wiz-nav-list");
		const wizStep = await wiz.shadow$(".ui5-wiz-content-item");

		const wizRootText = "Wizard";
		const wizNavText = "Wizard Progress Bar";
		const wizListDescribedbyId = "wiz-nav-descr";
		const wizListText = "Wizard Steps";

		const step1InHeader = await wiz.shadow$(`[data-ui5-index="1"]`);
		const step1InHeaderRoot = await wiz.shadow$(`[data-ui5-index="1"]`).shadow$(`.ui5-wiz-step-root`);
		const step2InHeaderRoot = await wiz.shadow$(`[data-ui5-index="2"]`).shadow$(`.ui5-wiz-step-root`);
		const step1Text = "Step 1 Product type Active";
		const step2Text = "Step 2 Product Information Inactive";

		assert.strictEqual(await wizRoot.getAttribute("role"), "region",
			"Wizard has role set.");
		assert.strictEqual(await wizRoot.getAttribute("aria-label"), wizRootText,
			"Wizard has aria-label set.");
		assert.strictEqual(await wizNav.getAttribute("aria-label"), wizNavText,
			"Wizard nav has aria-label set.");
		assert.strictEqual(await wizList.getAttribute("aria-describedby"), wizListDescribedbyId,
			"Wizard nav has aria-label set.");
		assert.strictEqual(await wizList.getAttribute("role"), "list",
			"Wizard list has role set..");
		assert.strictEqual(await wizList.getAttribute("aria-controls"), `${await wiz.getProperty("_id")}-wiz-content`,
			"Wizard list has aria-controls set.");
		assert.strictEqual(await wizList.getAttribute("aria-label"), wizListText,
			"Wizard list has aria-label set.");

		assert.strictEqual(await step1InHeaderRoot.getAttribute("aria-label"), step1Text,
			"First step in the header has aria-label.");
		assert.strictEqual(await step2InHeaderRoot.getAttribute("aria-label"), step2Text,
			"Second step (inactive) in the header has aria-label.");

		assert.strictEqual(await wizStep.getAttribute("role"), "region",
			"Step has role 'region'");
		assert.strictEqual(await wizStep.getAttribute("aria-label"), `Step 1 ${await step1InHeader.getProperty("titleText")}`,
			"Step has aria-label set to the number of the step and its title.");
	});

	it("Disabled step should not be interactive", async () => {
		const wiz = await $("#wizTest");
		const disabledStep = await wiz.shadow$(`[data-ui5-index="2"]`);

		await disabledStep.click();

		const isTabActiveElement = await browser.executeAsync((done) => {
			done(document.activeElement.shadowRoot.activeElement === document.querySelector("#wizTest").shadowRoot.querySelector("[data-ui5-index='2']"));
		});

		assert.notOk(isTabActiveElement, "Second tab should not be active element");
	});

	it("move to next step by API", async () => {
		const wiz = await browser.$("#wizTest");
		const btnToStep2 = await browser.$("#toStep2");
		const step1 = await browser.$("#st1");
		const step2 = await browser.$("#st2");
		const step1InHeader = await wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = await wiz.shadow$(`[data-ui5-index="2"]`);
		const step1InHeaderRoot = await step1InHeader.shadow$(`.ui5-wiz-step-root`);

		// act - the click handler calls the API
		await btnToStep2.click();

		// assert - that first step in the content and in the header are not selected
		assert.strictEqual(await step1.getAttribute("selected"), null,
			"First step in the content is not selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), null,
			"First step  in the header not is selected.");

		// assert - check if aria-attributes are applied correctly when step is not selected
		assert.strictEqual(await step1InHeaderRoot.getAttribute("role"), "listitem",
			"First step in the header has role.");

		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(await step2.getAttribute("selected"), "true",
			"Second step in the content is selected.");
		assert.strictEqual(await step2InHeader.getAttribute("selected"),
			"true", "Second step in the header is selected.");
		assert.strictEqual(await step2.getAttribute("disabled"), null,
			"Second step is enabled.");
		assert.strictEqual(await step2InHeader.getAttribute("disabled"), null,
			"Second step in header is enabled.");
	});

	it("move to next step by click", async () => {
		const wiz = await browser.$("#wizTest");
		const step1 = await browser.$("#st1");
		const step2 = await browser.$("#st2");

		const step1InHeader = await wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = await wiz.shadow$(`[data-ui5-index="2"]`);
		const inpStepChangeCounter =  await browser.$("#inpStepChangeCounter");
		const inpStepChangeCause =  await browser.$("#inpStepChangeCause");

		const wizardStep = await browser.$("ui5-wizard-step");
		const messageStrip = await wizardStep.shadow$("ui5-message-strip")
		const firstFocusableElement = await messageStrip.shadow$(`ui5-button`);

		// act - click on the first step in the header
		await step1InHeader.click();

		// assert - that first step in the content and in the header are selected
		assert.strictEqual(await step1.getAttribute("selected"), "true",
			"First step in the content is selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), "true",
			"First step in the header is selected.");
		assert.strictEqual(await step1.getAttribute("disabled"), null,
			"First step is enabled.");
		assert.strictEqual(await step1InHeader.getAttribute("disabled"), null,
			"First step in header is enabled.");

		assert.ok(await firstFocusableElement.matches(":focus"), "The First focusable element in the step content is focused.");

		await step1InHeader.keys(["Shift", "Tab"]);
		await step2InHeader.keys("Space");
		assert.ok(await firstFocusableElement.matches(":focus"), "The First focusable element in the step content is focused.");

		await step1InHeader.keys(["Shift", "Tab"]);
		await step2InHeader.keys("Enter");
		assert.ok(await firstFocusableElement.matches(":focus"), "The First focusable element in the step content is focused.");

		// assert - that second step in the content and in the header are not selected
		assert.strictEqual(await step2.getAttribute("selected"), null,
			"Second step in the content is not selected.");
		assert.strictEqual(await step2InHeader.getAttribute("selected"), null,
			"Second step in the header is not selected.");

		// assert - step-change fired once
		assert.strictEqual(await inpStepChangeCounter.getProperty("value"), "1",
			"Event step-change fired once.");
		// assert - step-change fired due to user click
		assert.strictEqual(await inpStepChangeCause.getProperty("value"), "true",
			"Event step-change fired due to click.");
	});

	it("move to next step by SPACE/ENTER", async () => {
		const wiz = await browser.$("#wizTest");
		const step1 = await browser.$("#st1");
		const step2 = await browser.$("#st2");
		const step1InHeader = await wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = await wiz.shadow$(`[data-ui5-index="2"]`);
		const inpStepChangeCounter =  await browser.$("#inpStepChangeCounter");

		// act - bring the focus to the first step in the header
		// act - use keyboard to move to step2
		await step1InHeader.click();
		await step1InHeader.keys(["Shift", "Tab"]);
		await step1InHeader.keys("ArrowRight");
		await step2InHeader.keys("Space");

		// assert - that first step in the content and in the header are not selected
		assert.strictEqual(await step1.getAttribute("selected"), null, "First step in the content is not selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), null, "First step  in the header not is selected.");

		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(await step2.getAttribute("selected"), "true",
			"Second step in the content is selected.");
		assert.strictEqual(await step2InHeader.getAttribute("selected"), "true",
			"Second step in the header is selected.");
		assert.strictEqual(await step2.getAttribute("disabled"), null,
			"Second step is enabled.");
		assert.strictEqual(await step2InHeader.getAttribute("disabled"), null,
			"Second step in header is enabled.");

		// assert - step-change second time
		assert.strictEqual(await inpStepChangeCounter.getProperty("value"), "2", "Event step-change fired 2nd time.");

		// act - move back to step1 then move the focus to the step 2 and press enter
		await step1InHeader.click();
		await step1InHeader.keys(["Shift", "Tab"]);
		await step1InHeader.keys("ArrowRight");
		await step1InHeader.keys("Enter");

		// assert - that first step in the content and in the header are  selected
		assert.strictEqual(await step2.getAttribute("selected"), "true",
			"First step in the content is not selected.");
		assert.strictEqual(await step2InHeader.getAttribute("selected"), "true",
			"First step  in the header not is selected.");
		assert.strictEqual(await step2.getAttribute("disabled"), null,
			"First step is enabled.");
		assert.strictEqual(await step2InHeader.getAttribute("disabled"), null,
			"First step in header is enabled.");

		// assert - that first step in the content and in the header are not selected
		assert.strictEqual(await step1.getAttribute("selected"), null,
			"Second step in the content is not selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), null,
			"Second step in the header is not selected.");

		// assert - step-change second time
		assert.strictEqual(await inpStepChangeCounter.getProperty("value"), "4",
			"Event step-change fired 4th time.");

		// Activate the first step for the next tests
		await step1InHeader.click();
	});

	it("move to next step by scroll", async () => {
		const wiz = await browser.$("#wizTest");
		const step2 = await browser.$("#st2");
		const scrollMarker = await browser.$("#scrollMarkerSt2");
		const step2InHeader = await wiz.shadow$(`[data-ui5-index="2"]`);
		const inpStepChangeCounter = await browser.$("#inpStepChangeCounter");
		const inpStepChangeCause = await browser.$("#inpStepChangeCause");

		// act - scroll the 2nd step into view
		// Note: scrollIntoView works in Chrome, but if we start executing the test on every browser,
		// this test should be reworked.
		await scrollMarker.scrollIntoView();

		// assert - that second step in the content and in the header are properly selected
		assert.strictEqual(await step2.getAttribute("selected"), "true", "Second step in the content is selected.");
		assert.strictEqual(await step2InHeader.getAttribute("selected"), "true", "Second step in the header is selected.");
		assert.strictEqual(await step2.getAttribute("disabled"), null, "Second step is enabled.");
		assert.strictEqual(await step2InHeader.getAttribute("disabled"), null, "Second step in header is enabled.");

		assert.strictEqual(await inpStepChangeCounter.getProperty("value"), "6",
			"Event step-change fired 6th time due to scrolling.");

		// assert - step-change fired not because of user click
		assert.strictEqual(await inpStepChangeCause.getProperty("value"), "false",
			"Event step-change fired not because of user click, but scrolling");
	});

	it("tests dynamically increase step size and move to next step", async () => {
		const wiz = await browser.$("#wizTest");
		const sw = await browser.$("#sw");
		const btnToStep2 = await browser.$("#toStep22");
		const btnToStep3 = await browser.$("#toStep3");
		const step3 = await browser.$("#st3");
		const scrollMarker = await browser.$("#scrollMarkerSt3");
		const step3InHeader = await wiz.shadow$(`[data-ui5-index="3"]`);
		const inpStepChangeCounter =  await browser.$("#inpStepChangeCounter");

		await btnToStep3.click(); // click to enable step 3
		await btnToStep2.click(); // click to get back to step 2
		await sw.click(); // click to dynamically expand content in step 2
		await scrollMarker.scrollIntoView(); // scroll to step 3

		assert.strictEqual(await step3.getAttribute("selected"), "true",
			"Third step in the content is selected.");
		assert.strictEqual(await step3InHeader.getAttribute("selected"), "true",
			"Third step in the header is selected.");
		assert.strictEqual(await inpStepChangeCounter.getProperty("value"), "7",
			"Event step-change fired once for 7th time due to scrolling.");
	});

	it("Tests long text on wizard step to be truncated correctly", async () => {
		const wiz = await browser.$("#wizTest");

		const step5InHeader = await wiz.shadow$(`[data-ui5-index="5"]`);
		const scrollMarker = await browser.$("#scrollMarkerSt5");

		const btnToStep4 = await browser.$("#toStep4");
		const btnToStep5 = await browser.$("#toStep5");

		await browser.setWindowSize(1000, 1200);
		const step4ScrollHeight = await wiz.shadow$(`[data-ui5-index="4"]`).shadow$(".ui5-wiz-step-title-text").getProperty("scrollHeight");
		const step5ScrollHeight = await wiz.shadow$(`[data-ui5-index="5"]`).shadow$(".ui5-wiz-step-title-text").getProperty("scrollHeight");

		// act - click on the steps in the header
		await btnToStep4.click(); // click to enable step 4
		await step5InHeader.click();
		await btnToStep5.click(); // click to enable step 5

		await scrollMarker.scrollIntoView();

		assert.strictEqual(await step5InHeader.getAttribute("selected"), "true",
			"Fifth step in the content is selected.");
		assert.strictEqual(await step5InHeader.getAttribute("subtitle-text"), "(Optional)",
			"Fifth step in the header is selected.");
		assert.ok(step4ScrollHeight < step5ScrollHeight, "Fifth step scrollWidth should be bigger then the fourth step because of the truncation");
	});

	it("tests no scrolling to step, if the step was not changed", async () => {
		await browser.url(`test/pages/Wizard_test.html`);

		const wizard = await browser.$("#wizTest");
		const wizardContentDOM = await wizard.shadow$(".ui5-wiz-content");
		const btnToStep2 = await browser.$("#toStep2");

		// (1) - go to step 2
		await btnToStep2.click();

		// (2) - scroll a bit upwards to get back to step 1 (at least its bottom part)
		await btnToStep2.scrollIntoView();

		// (3) store the scroll position after scrolling upwards
		const scrolPosBefore = await browser.executeAsync((wizardContentDOM, done) => {
			done(wizardContentDOM.scrollTop);
		}, wizardContentDOM);

		// (4) simulate re-rendering
		await browser.executeAsync((wizard, done) => {
			wizard.onAfterRendering();
			done();
		}, wizard);

		// (5) store the scroll position after re-rendering
		const scrolPosAfter = await browser.executeAsync((wizardContentDOM, done) => {
			done(wizardContentDOM.scrollTop);
		}, wizardContentDOM);

		// assert - The Wizard did not scroll to the very top of the step 1
		assert.strictEqual(scrolPosBefore, scrolPosAfter,
			"No scrolling occures after re-rendering when the selected step remains the same.");
	});

	it("Tests if initial focus is set on the second (selected) step", async () => {
		browser.url("test/pages/WizardPageMode_test.html");

		const wiz = await browser.$("#wiz2");

		// open the dialog
		const btnOpenDialog = await browser.$("#button");
		await btnOpenDialog.click();

		// go to second step
		const step2 = await browser.$("#nextButton");
		await step2.click();

		// close the dialog by escape
		await browser.keys("Escape");

		// open the dialog again
		await btnOpenDialog.click();

		// check if second wizard tab is focused
		const isTabActiveElement = await browser.executeAsync((done) => {
			done(document.activeElement.shadowRoot.activeElement === document.querySelector("#wiz2").shadowRoot.querySelector("[data-ui5-index='2']"));
		});

		assert.ok(isTabActiveElement, "Second step is focused.");
	});

	it("Tests if second step is scrolled into view when first step's height is bigger than viewport", async () => {
		await browser.url(`test/pages/WizardScrolling.html`);

		const btnToStep2 = await browser.$("#toStep2");

		await btnToStep2.scrollIntoView();
		await btnToStep2.click();

		let isDisplayedInViewport = await browser.$("#step2").isDisplayedInViewport();

		assert.ok(isDisplayedInViewport, "Step2 is scrolled into view.");
	});

	it("tests small screen", async () => {
		await browser.url(`test/pages/Wizard_test_mobile.html`);

		const wizard = await browser.$("#wizTest");
		const wizardDisabled = await browser.$("#wizTest2");
		const groupedStep = await wizard.shadow$(`[data-ui5-index="3"]`);
		const groupedStepDisabled = await wizardDisabled.shadow$(`[data-ui5-index="3"]`);

		// act - click on the stack of steps
		await groupedStep.shadow$(`.ui5-wiz-step-root`).click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#wizTest")
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		// assert - the popup is open
		assert.ok(await popover.isDisplayedInViewport(), "Popover is opened.");


		// act - click on the disabled stack of steps
		await groupedStepDisabled.shadow$(`.ui5-wiz-step-root`).click();

		const staticAreaItemClassName2 = await browser.getStaticAreaItemClassName("#wizTest2")
		const disabledPopover = await browser.$(`.${staticAreaItemClassName2}`).shadow$("ui5-responsive-popover");

		// assert - the popup is open
		assert.ok(await disabledPopover.isDisplayedInViewport(), "Popover is opened.");
	});

	it("tests responsive paddings", async () => {
		await browser.url(`test/pages/Wizard.html`);
		const wizard = $("#wiz");

		// resize window S
		await browser.setWindowSize(500, 1000);
		assert.strictEqual(await wizard.getProperty("_breakpoint"), "S", "Small breakpoint is enabled");

		// resize window M
		await browser.setWindowSize(1000, 1000);
		assert.strictEqual(await wizard.getProperty("_breakpoint"), "M", "Medium breakpoint is enabled");

		// resize window L
		await browser.setWindowSize(1200, 1000);
		assert.strictEqual(await wizard.getProperty("_breakpoint"), "L", "Large breakpoint is enabled");

		// resize window XL
		await browser.setWindowSize(1600, 1000);
		assert.strictEqual(await wizard.getProperty("_breakpoint"), "XL", "Extra Large breakpoint is enabled");
	});

	it("WizardPageMode: move to next step", async () => {
		await browser.url(`test/pages/WizardPageMode_test.html`);

		const btnOpenDialog = await browser.$("#button");

		await btnOpenDialog.click();

		const wiz = await browser.$("#wiz2");
		const step1 = await browser.$("#dialogStep1");
		const step2 = await browser.$("#dialogStep2");
		const step1InHeader = await wiz.shadow$(`[data-ui5-index="1"]`);
		const step2InHeader = await wiz.shadow$(`[data-ui5-index="2"]`);

		const nextStepButton = await browser.$("#nextButton");
		const previousStepButton = await browser.$("#prevButton");

		// assert - that first step in the content and in the header are selected
		assert.strictEqual(await step1.getAttribute("selected"), "true",
			"First step in the content is selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), "true",
			"First step in the header is selected.");

		// act - click on the first step in the header
		await nextStepButton.click();

		// assert - that second step in the content and in the header are not selected
		assert.strictEqual(await step2.getAttribute("selected"), "true",
			"Second step in the content is not selected.");
		assert.strictEqual(await step2InHeader.getAttribute("selected"), "true",
			"Second step in the header is not selected.");
		assert.strictEqual(await step1.getAttribute("selected"), null,
			"First step in the content is not selected.");
		assert.strictEqual(await step1.isDisplayedInViewport(), false,
			"First step should not be visible.");

		await previousStepButton.click();

		// assert - that second step in the content and in the header are not selected
		assert.strictEqual(await step1.getAttribute("selected"), "true",
			"First step in the content is not selected.");
		assert.strictEqual(await step1InHeader.getAttribute("selected"), "true",
			"First step in the header is not selected.");
		assert.strictEqual(await step2.getAttribute("selected"), null,
			"Second step in the content is not selected.");
		assert.strictEqual(await step2.isDisplayedInViewport(), false,
			"Second step should not be visible.");
	});
});
