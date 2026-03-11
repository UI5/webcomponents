import { assert } from "chai";

const getTokenizerPopoverId = async (mcbId) => {
	return await browser.executeAsync(async (mcbId, done) => {
		const input = document.querySelector(`[id="${mcbId}"]`);
		const staticAreaItem = await (input.shadowRoot.querySelector("ui5-tokenizer").getStaticAreaItemDomRef());

		done(staticAreaItem.host.classList[0]);
	}, mcbId);
}

describe("MultiComboBox general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/MultiComboBox.html`);
	});

	describe("toggling", () => {
		it("opens/closes", async () => {
			const icon = await browser.$("#multi1").shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi1")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await icon.click();
			assert.ok(await popover.getProperty("opened"), "Popover should be displayed in the viewport");

			await icon.click();
			assert.notOk(await popover.getProperty("opened"), "Popover should close");
		});

		it("Checks focus state", async () => {
			const mcb = await browser.$("#multi1");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");

			await input.click();

			assert.ok(await mcb.getProperty("focused"), "MultiComboBox should be focused.");

			await input.keys("ArrowLeft");

			await browser.waitUntil(async () => !(await mcb.getProperty("focused")), {
				timeout: 500,
				timeoutMsg: "MultiComboBox should no longer be focused"
			});

			await input.keys("ArrowRight");

			await browser.waitUntil(() => mcb.getProperty("focused"), {
				timeout: 500,
				timeoutMsg: "MultiComboBox should be focused again"
			});
		});

		it("Apply focus", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const focusBtn = await browser.$("#focus-mcb");

			assert.notOk(await mcb.getProperty("focused"), "MultiComboBox should not be focused.");

			await focusBtn.click();

			assert.ok(await mcb.getProperty("focused"), "MultiComboBox should be focused.");
		});


		it("MultiComboBox open property is set correctly", async () => {
			const mcb = await browser.$("#multi1");
			const icon = await browser.$("#multi1").shadow$("[input-icon]");
			const eventInput = await browser.$("#events-input");
			const callCountInput = await browser.$("#events-call-count");
			const resetBtn = await browser.$("#reset-btn");

			await resetBtn.click();
			await icon.click();
			assert.ok(await mcb.getProperty("open"), "MultiComboBox should be opened");
			assert.strictEqual(await eventInput.getValue(), "openChange", "openChange should be called");
			assert.strictEqual(await callCountInput.getValue(), "1", "Event should be called once");

			await icon.click();
			assert.notOk(await mcb.getProperty("open"), "MultiComboBox should be closed");

			assert.strictEqual(await eventInput.getValue(), "openChange", "openChange should be called");
			assert.strictEqual(await callCountInput.getValue(), "2", "Event should be called once");

			await resetBtn.click();
		});

		it("Opens selected items Popover", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			await browser.setWindowSize(400, 1250);
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi1");
			const mcb = await browser.$("#multi1");
			const showMore = mcb.shadow$(".ui5-multi-combobox-tokenizer").shadow$(".ui5-tokenizer-more-text");
			const allPopover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await mcb.scrollIntoView();
			await showMore.click();

			assert.ok(await allPopover.getProperty("opened"), "All popover should not be displayed");
		});

		it("Checks if tokenizer is expanded when adding items dynamically", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const btn = await $("#add");
			const mcb = await $("#mcb-dynamic-selection");

			await btn.click();

			const inlinedTokens = await mcb.shadow$$("ui5-token:not([overflows])");

			assert.ok(inlinedTokens.length > 0, "Token is displayed");
		});

		it("should collapse the tokenizer when the n-more popover is closed", async () => {
			const mcb = await browser.$("#mcb-select-all-vs");
			const arrow = await mcb.shadow$("ui5-icon");
			const tokenizer = await mcb.shadow$("ui5-tokenizer");
			const body = await browser.$(".multicombobox1auto");
			const nMoreText = await tokenizer.shadow$(".ui5-tokenizer-more-text");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-select-all-vs");
			const popover =  await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const firstItemCheckbox = await popover.$("ui5-list > ui5-li").shadow$("ui5-checkbox");

			await arrow.click();
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");

			// select all items
			await browser.keys("Space");

			assert.ok(await tokenizer.getProperty("expanded"), "The tokenizer is expanded");

			await body.click();
			await nMoreText.click();
			await firstItemCheckbox.click();
			await body.click();

			assert.notOk(await tokenizer.getProperty("expanded"), "The tokenizer is collapsed");
		});
	});

	describe("selection and filtering", () => {
		beforeEach(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);
		});

		it("Opens all items popover, selects and deselects the first item", async () => {
			const icon = await browser.$("#mcb").shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$("ui5-list > ui5-li");
			const firstItemCheckbox = await firstItem.shadow$("ui5-checkbox");
			const eventInput = await browser.$("#events-input");
			const paramsInput = await browser.$("#events-parameters");
			const callCountInput = await browser.$("#events-call-count");
			const resetBtn = await browser.$("#reset-btn");

			await icon.click();

			assert.ok(await popover.getProperty("opened"), "Popover should be displayed in the viewport");
			assert.equal(await firstItem.getAttribute("selected"), null, "First item should not be selected");

			await firstItemCheckbox.click();

			assert.ok(await firstItem.getAttribute("selected"), "First item should be selected");
			assert.strictEqual(await eventInput.getValue(), "selectionChange", "selectionChange should be called");
			assert.strictEqual(await paramsInput.getValue(), "1", "one parameter should be passed in event's details");
			assert.strictEqual(await callCountInput.getValue(), "1", "Event should be called once");

			await firstItemCheckbox.click();

			assert.equal(await firstItem.getAttribute("selected"), null, "First item should not be selected");
			assert.strictEqual(await eventInput.getValue(), "selectionChange", "selectionChange should be called");
			assert.strictEqual(await paramsInput.getValue(), "0", "no parameter should be passed if no items are selected");
			assert.strictEqual(await callCountInput.getValue(), "2", "Event should be called once");

			await resetBtn.click();
		});

		it("When popover is opened via icon and item is selected/deselected, focus should return to the MultiComboBox", async () => {
			const icon = await browser.$("#mcb-success").shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-success")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li");

			await icon.click();

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");

			await firstItem.click();

			assert.ok(await browser.$("#mcb-success").getProperty("focused"), "MultiComboBox should be focused.");
		});

		it("Opens all items popover when start typing and filters items", async () => {
			const input = await browser.$("#mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");

			await input.click();
			await input.keys("c");

			const list = await popover.$(".ui5-multi-combobox-all-items-list");

			assert.ok(await popover.getProperty("opened"), "Popover should be displayed in the viewport");
			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");

			await input.keys("o");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");

			await input.keys("m");

			assert.strictEqual((await list.getProperty("items")).length, 1, "1 items should be shown");

			// The first backspace deletes the autocompleted part
			await input.keys("Backspace");
			await input.keys("Backspace");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown");
		});

		it("tests built in validation by typing a non existing option", async () => {
			const mcb = await browser.$("#mcb-validation");
			const input = await browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");
			const innerInput = await browser.$("#mcb-validation").shadow$("#ui5-multi-combobox-input");

			await innerInput.click();
			await innerInput.keys("c");

			assert.strictEqual(await innerInput.getValue(), "Cosy", "Value is correct");

			await innerInput.keys("c");

			assert.strictEqual(await innerInput.getValue(), "c", "Value is still c (incorrect input is prevented)");
			assert.strictEqual(await input.getAttribute("value-state"), "Error", "Value state is changed to error");

			await browser.waitUntil(async () => {
				return await input.getAttribute("value-state") === "None";
			}, 2500, "expect value state to be different after 2.5 seconds");
		});

		it("should remove the value state header after validation reset", async () => {
			const mcb = await browser.$("#mcb-predefined-value");
			const innerInput = await browser.$("#mcb-predefined-value").shadow$("#ui5-multi-combobox-input");
			const icon = await mcb.shadow$("[input-icon]");

			await innerInput.click();
			await innerInput.keys("d");
			await icon.click();

			assert.strictEqual(await innerInput.getAttribute("value-state"), "Error", "Value state is changed to error");

			await browser.waitUntil(async () => {
				return await mcb.getAttribute("_dialog-input-value-state") === "None";
			}, 2500, "expect _dialog-input-value-state to be reset after 2.5 seconds");
		});

		it("tests if entering valid text is possible while validation is triggered", async () => {
			const mcb = await $("#mcb-validation");
			const innerInput = mcb.shadow$("#ui5-multi-combobox-input");

			await innerInput.click();
			await innerInput.keys("c");
			await innerInput.keys("c");
			await innerInput.keys("Backspace");

			assert.strictEqual(await mcb.getProperty("value"), "", "Value should be deleted");

			await innerInput.keys("c");
			await innerInput.keys("c");
			await innerInput.keys("o");

			assert.strictEqual(await mcb.getProperty("value"), "Cosy", "User should be able to type valid value");
		});

		it("tests if item is created when enter is pressed while validation is ongoing", async () => {
			const mcb = await $("#mcb-validation");
			const innerInput = mcb.shadow$("#ui5-multi-combobox-input");

			await innerInput.click();
			await innerInput.keys("c");
			await innerInput.keys("c");
			await innerInput.keys("Enter");

			const tokens = await mcb.shadow$$("[ui5-token]");

			assert.strictEqual(tokens.length, 0, "No Items are selected");
		});

		it("When item is clicked, the popover should be closed and the value in the input should be removed", async () => {
			const input = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#another-mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li");

			await input.click();
			await input.keys("c");

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");
			assert.strictEqual(await input.getValue(), "Cosy", "Value is correct");

			await firstItem.click();

			assert.notOk(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "", "When the content is clicked, the value should be the removed");
			assert.ok(await browser.$("#another-mcb").getProperty("focused"), "MultiComboBox should be focused.");
		});

		it("When item's checkbox is clicked, the popover should not be closed and the value in the input should be kept", async () => {
			const input = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#another-mcb")
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItemCheckbox = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li").shadow$("ui5-checkbox");

			await input.click();
			await input.keys("c");
			await browser.pause(500);

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");
			assert.strictEqual(await input.getValue(), "Cosy", "Value is correct");

			await firstItemCheckbox.click();

			assert.ok(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "c", "When the content is clicked, the value should be the typed-in value");
		});

		it("tests if n more is applied and corresponding popover", async () => {
			$("#more-mcb").scrollIntoView();

			const nMoreText = await browser.$("#more-mcb").shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			assert.ok(await nMoreText.getText(), "1 More", "token 1 should be visible");
		});

		it("tests if clicking n more will prefilter items before opening the popover", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const mcb = await $("#more-mcb");
			const icon = await mcb.shadow$("[input-icon]");
			const nMoreText = await mcb.shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			await mcb.scrollIntoView();
			await nMoreText.click();

			await browser.waitUntil(async () => mcb.getProperty("open"), {
				timeout: 500,
				timeoutMsg: "Popover is open"
			});

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#more-mcb")
			const popover = await $(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const list = await popover.$(".ui5-multi-combobox-all-items-list");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown (all selected)");

			await icon.click();

			await browser.waitUntil(async () => !(await mcb.getProperty("open")), {
				timeout: 500,
				timeoutMsg: "Popover should be closed"
			});

			await icon.click();

			await browser.waitUntil(async () => await mcb.getProperty("open"), {
				timeout: 500,
				timeoutMsg: "Popover should be open"
			});

			assert.strictEqual((await list.getProperty("items")).length, 4, "4 items should be shown");
		});

		it("tests if tokenizer is scrolled to the end when expanded and to start when narrowed", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await $("#more-mcb");
			const input = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await input.click();

			let tokenizerContentScrollLeft = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
			assert.notEqual(tokenizerContentScrollLeft, 0, "tokenizer is not scrolled to start");

			await input.keys('Tab');

			tokenizerContentScrollLeft = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
			assert.strictEqual(tokenizerContentScrollLeft, 0, "tokenizer is scrolled to start");
		});

		it("tests if tokenizer is scrolled on keyboard navigation through the tokens", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await $("#more-mcb");
			const input = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await input.click();
			await input.keys('ArrowLeft');

			let scrollLeftFirstToken = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);
			await input.keys('ArrowLeft');
			let scrollLeftSecondToken = await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

			assert.notEqual(scrollLeftFirstToken, scrollLeftSecondToken, "tokenizer is scrolled when navigating through the tokens");

			await input.keys('ArrowRight');
			let newScrollLeft =  await browser.execute(() => document.querySelector("#more-mcb").shadowRoot.querySelector("ui5-tokenizer").shadowRoot.querySelector(".ui5-tokenizer--content").scrollLeft);

			assert.notEqual(newScrollLeft, scrollLeftSecondToken, "tokenizer is scrolled when navigating through the tokens");
		})

		it("tests if tokenizer is not expanded/collapsed when the suggestions are opened from a selected token", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await $("#more-mcb");
			let tokenizer = await mcb.shadow$("ui5-tokenizer")
			let tokens = await browser.$("#more-mcb").shadow$$(".ui5-multi-combobox-token");
			const input = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await tokens[1].click();
			await tokens[1].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), false, "tokenizer is scrolled when navigating through the tokens");

			await tokens[1].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), false, "tokenizer is scrolled when navigating through the tokens");

			tokens = await browser.$("#more-mcb").shadow$$(".ui5-multi-combobox-token");

			await input.click();
			await tokens[2].click();
			await tokens[2].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), true, "tokenizer is scrolled when navigating through the tokens");

			await tokens[2].keys('F4');

			assert.strictEqual(await tokenizer.getProperty("expanded"), false, "tokenizer is scrolled when navigating through the tokens");
		})

		it("tests filtering of items when nmore popover is open and user types in the input fueld", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const mcb = await $("#more-mcb");
			const nMoreText = await mcb.shadow$("ui5-tokenizer").shadow$(".ui5-tokenizer-more-text");

			await mcb.scrollIntoView();

			const input = await mcb.shadow$("input");

			await nMoreText.click();

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#more-mcb")
			const popover = await $(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const list = await popover.$(".ui5-multi-combobox-all-items-list");
			const lastListItem = await list.$("ui5-li:last-child");

			await input.click();
			await input.keys("c");

			assert.strictEqual((await list.getProperty("items")).length, 3, "3 items should be shown (all selected)");
			assert.notOk(await lastListItem.getProperty("selected"), "last item should not be selected");
		})

		it("Tests autocomplete(type-ahead)", async () => {
			let hasSelection;

			const input = await browser.$("#mcb").shadow$("input");
			const EXPTECTED_VALUE = "Compact";

			await input.click();
			await input.keys("com");

			hasSelection = await browser.execute(() =>{
				const input = document.getElementById("mcb").shadowRoot.querySelector("input");
				return input.selectionEnd - input.selectionStart > 0;
			});


			assert.strictEqual(await input.getProperty("value"), EXPTECTED_VALUE, "Value is autocompleted");
			assert.strictEqual(hasSelection, true, "Autocompleted text is selected");
		});

		it("Tests disabled autocomplete(type-ahead)", async () => {
			let hasSelection;

			const input = await browser.$("#mcb-no-typeahead").shadow$("input");

			await input.click();
			await input.keys("c");

			assert.strictEqual(await input.getProperty("value"), "c", "Value is not autocompleted");
		});

		it("Should make a selection on ENTER and discard on ESC", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			let tokens;

			const mcb = await browser.$("#mcb");
			const sExpected = "Cosy";
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb")

			await mcb.click();
			await mcb.keys("c");
			await mcb.keys("Enter");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await mcb.getProperty("value"), "", "Value is autocompleted");
			assert.strictEqual(tokens.length, 1, "should have one token");

			await mcb.click();
			await mcb.keys("c");
			await mcb.keys("Escape");

			assert.strictEqual(await mcb.getProperty("value"), "c", "Value is autocompleted");
		});

		it ("should reset typeahead on item navigation and restore it on focus input", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$("[input-icon]");

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await icon.click();
			await mcb.keys("c");

			assert.equal(await mcb.getProperty("value"), "Cosy", "The input value is autocompleted");

			await mcb.keys("ArrowDown");
			const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
			assert.equal(await mcb.getProperty("value"), "c", "The input typeahead is cleared");

			await input.keys("ArrowUp");

			assert.equal(await listItem.getProperty("focused"), false, "The first item is not focused");
			assert.equal(await mcb.getProperty("value"), "Cosy", "The input value is autocompleted");
		});

		it("tests if clicking delete icon of a token removes it from the selection", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
			await browser.setWindowSize(1920, 1080);

			const mcb = $("#mcb-long-token");
			const inner = mcb.shadow$("input");

			await mcb.scrollIntoView();
			await inner.click();

			const token = await mcb.shadow$("ui5-tokenizer ui5-token");
			const deleteIcon = await token.shadow$(".ui5-token--icon");

			await deleteIcon.click();

			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 0, "Long token should be deleted" );
		});

		it("prevents selection change event when clicking an item", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = $("#mcb-prevent");
			const input = mcb.shadow$("#ui5-multi-combobox-input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-prevent")
			const popover = await $(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const firstItem = await popover.$(".ui5-multi-combobox-all-items-list > ui5-li");
			const mcbTokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(mcbTokens.length, 1, "1 token is created.");

			await input.click();
			await input.keys("i");

			assert.ok(await popover.getProperty("opened"), "The popover should be opened");
			assert.strictEqual(await input.getValue(), "Item 1", "Value is correct");

			await firstItem.click();

			assert.notOk(await popover.getProperty("opened"), "When the content is clicked, the popover should close");
			assert.strictEqual(await input.getValue(), "", "When the content is clicked, the value should be the removed");
			assert.equal(mcbTokens.length, 1, "1 token is created.");
		});

		it("prevents selection change event when deleting a token", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = $("#mcb-prevent");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			const deleteIcon = await tokens[0].shadow$("ui5-icon");

			assert.equal(await tokens.length, 1, "should have one token");

			await deleteIcon.click();

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 1, "should have one token");
		});

		it ("should prevent selection-change on CTRL+A", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = $("#mcb-prevent");
			const input = await mcb.shadow$("input");

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 1, "Should have 1 token.");

			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys(["Control", "a"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 1, "Should have 1 token.");
		});

		it ("should select all items", async () => {
			const cb = await $("#mcb-select-all-vs");
			const arrow = await cb.shadow$("[input-icon]");
			const spanRef = await $("#select-all-event");

			await arrow.click();
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");

			// select all items
			await browser.keys("Space");

			assert.strictEqual(await spanRef.getText(), "Selected items count: 27");

			// deselect all items
			await browser.keys("Space");

			assert.strictEqual(await spanRef.getText(), "Selected items count: 0");
		});

		it ("should select a few items and show Select All in selected items Popover", async () => {
			await browser.setWindowSize(1920, 1080);

			const cb = await $("#mcb-select-all-vs");
			const arrow = await cb.shadow$("[input-icon]");
			const spanRef = await $("#select-all-event");

			await arrow.click();
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");

			// select Item 1
			await browser.keys("Space");

			// select Item 2
			await browser.keys("ArrowDown");
			await browser.keys("Space");

			// select Item 3
			await browser.keys("ArrowDown");
			await browser.keys("Space");

			// select Item 4
			await browser.keys("ArrowDown");
			await browser.keys("Space");

			// select Item 5
			await browser.keys("ArrowDown");
			await browser.keys("Enter");
			await browser.keys("Tab");

			assert.strictEqual(await spanRef.getText(), "Selected items count: 5");

			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-select-all-vs");
			const popover = await $(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

			const tokenizerNMore = await cb.shadow$("[ui5-tokenizer]");
			const nMoreLabel = await tokenizerNMore.shadow$(".ui5-tokenizer-more-text");
			
			await nMoreLabel.click();

			assert.ok(await popover.$(".ui5-mcb-select-all-checkbox").getProperty("checked"), "Select All CheckBox should be selected");

			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");
			await browser.keys("Space");

			assert.notOk(await popover.$(".ui5-mcb-select-all-checkbox").getProperty("checked"), "Select All CheckBox should not be selected");
			assert.strictEqual(await spanRef.getText(), "Selected items count: 4");

			await browser.keys("ArrowUp");
			await browser.keys("Space");

			assert.ok(await popover.$(".ui5-mcb-select-all-checkbox").getProperty("checked"), "Select All CheckBox should be selected");
			assert.strictEqual(await spanRef.getText(), "Selected items count: 5");
		});
	});

	describe("keyboard handling", () => {
		before(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
		});

		it("tests backspace when combobox has an empty value", async () => {
			let tokens = await browser.$("#multi1").shadow$$(".ui5-multi-combobox-token");
			const input = await browser.$("#multi1").shadow$("input");

			await input.click();
			await input.keys('Backspace');

			assert.strictEqual(tokens.length, 3, "3 tokens are visible");

			await input.keys('Backspace');

			tokens = await browser.$("#multi1").shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 2, "2 tokens are visible");
		});

		it ("Value should be reset on ESC key", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mCombo = await browser.$("#another-mcb");
			const mCombo2 = await browser.$("#more-mcb");
			const input = await mCombo.shadow$("#ui5-multi-combobox-input");
			const input2 = await mCombo2.shadow$("#ui5-multi-combobox-input");

			await input.click();
			await input.keys("C");
			await input.keys("Escape");
			await input.keys("Escape");

			assert.strictEqual(await mCombo.getProperty("value"), "", "Value should be reset to the initial one");

			await input.click();
			await input.keys("C");

			// Move focus to another element and bring it back
			await input2.click();
			await input.click();

			await input.keys("o");
			await input.keys("Escape");
			await input.keys("Escape");

			assert.strictEqual(await mCombo.getProperty("value"), "Cosy", "Value should be reset to the initial one");

			await input2.click();
			await input2.keys("C");
			await input2.keys("Escape");

			assert.strictEqual(await mCombo2.getProperty("value"), "", "Value should be cleared on escape even if the suggesitons are openjed");
		});

		it ("selects an item when enter is pressed and value matches a text of an item in the list", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-with-placeholder");
			const input = await mcb.shadow$("input");

			await input.click();
			await input.keys(['c', 'o', 'm', 'p', 'a', 'c', 't']);
			await input.keys("Enter");

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 4, "4 tokens are visible");
			assert.strictEqual(await input.getValue(), "", "Input's value should be empty");

			await input.keys(['c', 'o', 's', 'y']);
			await input.keys("Enter");

			assert.strictEqual(await input.getValue(), "cosy", "value should remain cosy");
			assert.strictEqual(await input.getAttribute("value-state"), "Error", "Value state is changed to error");
			assert.strictEqual(await mcb.getProperty("valueStateDefaultText"), "This value is already selected.", "Value state text should be set to already selected");

			await browser.waitUntil(async() => {
				return await input.getAttribute("value-state") === "None";
			}, 2500, "expect value state to be different after 2.5 seconds");
		});

		it ("focuses the value state header and item on arrow down then the value state and the input on arrow up", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await icon.click();
			await input.keys("ArrowDown");

			let valueStateHeader = await browser.execute(staticArea => staticArea.shadowRoot.querySelector(".ui5-responsive-popover-header.ui5-valuestatemessage-root"), staticArea);
			let focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should be focused");

			await input.keys("ArrowDown");

			let listItem = await popover.$("ui5-list").$$("ui5-li")[0];
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
			assert.notEqual(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should not be focused");

			await input.keys("ArrowUp");
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item is no longer focused");
			assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header is focused again");

			await input.keys("ArrowUp");
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item should not be focused");
			assert.equal(focusedElement, null, "The value state header or item should not be focused");
		});

		it ("focuses the first item on arrow down, then the input on arrow up", async () => {
			const mcb = await browser.$("#mcb-with-placeholder");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-with-placeholder");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await icon.click();
			await mcb.keys("ArrowDown");

			const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");

			await input.keys("ArrowUp");

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item is not focused");
		});

		it ("should navigate through the items with arrow keys when the picker is closed", async () => {
			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Cosy", "The first item name is seleted");

			await mcb.keys("ArrowDown");
			assert.equal(await mcb.getProperty("value"), "Compact", "The second item name is selected");

			await mcb.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value is set back to the first item name");

			await mcb.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value remains the same when pressing arrow up while the first item is set");
		});

		it ("should only navigate through not already selected items with arrow keys when the picker is closed", async () => {
			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");

			await input.click();
			await input.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Compact", "The only not selected item is set");

			await input.keys("ArrowDown");
			assert.equal(await mcb.getProperty("value"), "Compact", "The only not selected item remains set");

			await input.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Compact", "The only not selected item remains set");
		});

		it ("should reset current navigation state on user input", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("ArrowDown");
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Compact", "The second item name is selected");

			await mcb.keys("a");
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Cosy", "The value is set to the first item name");

			await mcb.keys("ArrowDown");
			await mcb.keys("ArrowDown");

			assert.equal(await mcb.getProperty("value"), "Condensed", "The value is set to the third item name");

			await mcb.keys("a");
			await mcb.keys("ArrowUp");
			assert.equal(await mcb.getProperty("value"), "Longest word in the world 2", "The last item is selected if there is a custom value in the input");
		});

		it ("arrow up when no item is selected should go to the last item", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("ArrowUp");

			assert.equal(await mcb.getProperty("value"), "Longest word in the world 2", "Last value should be selected");
		});

		it ("Clicking delete icon should delete token and place the focus on the previous one", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const secondToken = tokens[1];
			const deleteIcon =  await tokens[0].shadow$("ui5-icon");

			await secondToken.click();
			await deleteIcon.click();

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 2, "should have two tokens");
			assert.equal(await tokens[0].getProperty("focused"), true, "Previous token is focused");
			assert.equal(await tokens[0].getProperty("text"), "Condensed", "The selected token should not be deleted.");
		});

		it ("BACKSPACE should delete token and place the focus on the previous one", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const input = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const secondToken = tokens[1];

			await secondToken.click();
			await mcb.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 2, "should have two tokens");
			assert.equal(await tokens[0].getProperty("focused"), true, "Previous token is focused");
		});

		it ("DELETE should delete token and place the focus on the next one", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys("ArrowLeft");

			await mcb.keys("Delete");

			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 2, "should have two tokens");
			assert.equal(await tokens[1].getProperty("focused"), true, "Previous token is focused");
		});

		it ("BACKSPACE should delete token all selected tokens and place the focus on the first token before the deleted ones", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-items");
			const input = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const fourthToken = tokens[3];

			await fourthToken.click();
			await mcb.keys(["Shift", "ArrowLeft"]);
			await mcb.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 3, "should have three tokens");
			assert.equal(await tokens[1].getProperty("focused"), true, "Second token is focused");
		});

		it ("DELETE should delete token all selected tokens and place the focus on the first token after the deleted ones", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-items");
			const input = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const fourthToken = tokens[3];

			await fourthToken.click();
			await mcb.keys(["Shift", "ArrowLeft"]);
			await mcb.keys("Delete");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 3, "should have two tokens");
			assert.equal(await tokens[2].getProperty("focused"), true, "Last token is focused");
		});

		it ("should focus input after all tokens are deleted", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-compact");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Shift", "ArrowLeft"]);
			await mcb.keys("Delete");

			assert.equal(await mcb.getProperty("focused"), true, "Input should be focused");
		});

		it ("first HOME should move caret to start of the input, second HOME should focus the first token, END should focus last token", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await mcb.click();
			await input.keys(['c', 'o', 'm', 'p']);
			await input.keys("Home");

			const caretPosition = await browser.executeAsync(done => {
				return done(document.querySelector("#mcb").shadowRoot.querySelector("input").selectionStart);
			});

			assert.equal(await caretPosition, 0, "The caret is at the start of the input");

			await input.keys("Home");
			assert.equal(await tokens[0].getProperty("focused"), true, "The first token is focused");

			await input.keys("End");
			assert.equal(await tokens[tokens.length - 1].getProperty("focused"), true, "The last token is focused");

			await input.keys("End");
			assert.equal(await mcb.getProperty("focused"), true, "The input is focused");
		});

		it ("CTRL + HOME focus the first token, CTRL + END should focus last token", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await input.keys(['Control','Home']);

			assert.equal(await tokens[0].getProperty("focused"), true, "The first token is focused");

			await input.keys(['Control','End']);
			assert.equal(await tokens[tokens.length - 1].getProperty("focused"), true, "The last token is focused");
		});

		it ("CTRL + HOME focus the first item, CTRL + END should focus last item", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);


			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys(['Control','End']);

			const lastItem = await popover.$("ui5-list").$$("ui5-li")[5];
			assert.equal(await lastItem.getProperty("focused"), true, "The last item is focused");

			await mcb.keys(['Control','Home']);

			const firstItem = await popover.$("ui5-list").$("ui5-li");
			assert.equal(await firstItem.getProperty("focused"), true, "The first item is focused");

		});

		it ("SHIFT + HOME should select all tokens from the current one to the first one", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const input = await mcb.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await input.keys(['Shift','Home']);

			assert.equal(await tokens[0].getProperty("focused"), true, "The first token is focused");
			assert.equal(await tokens[0].getProperty("selected"), true, "The first token is selected");
			assert.equal(await tokens[1].getProperty("selected"), true, "The second token is selected");
			assert.equal(await tokens[2].getProperty("selected"), false, "The last token is not selected");
		});

		it ("SHIFT + END should select all tokens from the current one to the last one", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const input = await mcb.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await input.keys(['Shift','End']);

			assert.equal(await tokens[2].getProperty("focused"), true, "The last token is focused");
			assert.equal(await tokens[2].getProperty("selected"), true, "The last token is selected");
			assert.equal(await tokens[1].getProperty("selected"), true, "The second token is selected");
			assert.equal(await tokens[0].getProperty("selected"), false, "The first token is not selected");
		});

		it ("should close the picker and focus the next element on TAB", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const mcb2 = await browser.$("#mcb-no-typeahead");

			await mcb.click();
			await mcb.keys("F4");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused");

			await mcb2.keys("F4");
			await mcb2.keys(["Shift", "Tab"]);

			assert.equal(await mcb2.getProperty("open"), false, "The next control is closed");
			assert.equal(await mcb.getProperty("focused"), true, "The previous control is focused");

			await mcb.keys(["a", "b", "c"]);
			await mcb.keys("F4");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed");
			assert.equal(await mcb.getProperty("value"), "abc", "The previous control value is set");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused");
		});

		it ("should close the picker and focus the next element on TAB over an item or value state header", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-warning");
			const input = await mcb.shadow$("input");
			const mcb2 = await browser.$("#mcb-error");

			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed after TAB on value state header");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused after TAB on value state header");

			await mcb2.keys("F4");
			await mcb2.keys("ArrowDown");
			await mcb2.keys("ArrowDown");
			await mcb2.keys(["Shift", "Tab"]);

			assert.equal(await mcb2.getProperty("open"), false, "The next control is closed after TAB on suggestion item");
			assert.equal(await mcb.getProperty("focused"), true, "The previous control is focused after TAB on suggestion item");

			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys("ArrowDown");
			await mcb.keys("Tab");

			assert.equal(await mcb.getProperty("open"), false, "The previous control is closed after TAB on suggestion item");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused after TAB on suggestion item");
		});

		it ("should select/unselect next/previous item on shift+arrow", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys("Space");
			await mcb.keys(["Shift", "ArrowDown"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 2, "should have two items selected");

			await mcb.keys("ArrowDown");
			await mcb.keys(["Shift", "ArrowUp"]);
			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 1, "should have two items selected");
		});

		it ("should move focus to the previous token with arrow left", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await tokens[2].getProperty("focused"), true, "Last token should be focused");

			await mcb.keys("ArrowLeft");
			assert.strictEqual(await tokens[1].getProperty("focused"), true, "Second token should be focused");

			await mcb.keys("ArrowLeft");
			assert.strictEqual(await tokens[0].getProperty("focused"), true, "First token should be focused");
		});

		it ("should select multiple tokens and move focus with shift+arrow keys", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const mcb2 = await browser.$("#mcb-warning");
			const input = await mcb.shadow$("input");
			const input2 = await mcb2.shadow$("input");


			await input.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Shift", "ArrowLeft"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
			assert.strictEqual(await tokens[1].getProperty("selected"), true, "Second token should be selected");
			assert.strictEqual(await tokens[1].getProperty("focused"), true, "Second token should be focused");

			await mcb.keys(["Shift", "ArrowLeft"]);

			assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
			assert.strictEqual(await tokens[1].getProperty("selected"), true, "Second token should be selected");
			assert.strictEqual(await tokens[0].getProperty("selected"), true, "First token should be selected");
			assert.strictEqual(await tokens[0].getProperty("focused"), true, "First token should be focused");

			await input2.click();
			await mcb2.keys("ArrowLeft");
			await mcb2.keys("ArrowLeft");
			await mcb2.keys("ArrowLeft");

			await mcb2.keys(["Shift", "ArrowRight"]);

			let tokens2 = await mcb2.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await tokens2[0].getProperty("selected"), true, "First token should be selected");
			assert.strictEqual(await tokens2[1].getProperty("selected"), true, "Second token should be selected");
			assert.strictEqual(await tokens2[1].getProperty("focused"), true, "second token should be focused");

			await mcb2.keys(["Shift", "ArrowRight"]);

			assert.strictEqual(await tokens2[2].getProperty("focused"), true, "Last token should be focused");
			assert.strictEqual(await tokens2[2].getProperty("selected"), true, "Last token should be selected");
			assert.strictEqual(await tokens2[1].getProperty("selected"), true, "Second token should be selected");
			assert.strictEqual(await tokens2[0].getProperty("selected"), true, "First token should be selected");
		});

		it ("should navigate through the items with CTRL + arrow up/down keys when the picker is closed", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");

			await mcb.click();
			await mcb.keys(["Control", "ArrowDown"]);

			assert.equal(await mcb.getProperty("value"), "Cosy", "The first item name is selected");

			await mcb.keys(["Control", "ArrowDown"]);
			assert.equal(await mcb.getProperty("value"), "Compact", "The second item name is selected");

			await mcb.keys(["Control", "ArrowUp"]);
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value is set back to the first item name");

			await mcb.keys(["Control", "ArrowUp"]);
			assert.equal(await mcb.getProperty("value"), "Cosy", "The value remains the same when pressing arrow up while the first item is set");
		});

		it ("focuses the value state header and item on CTRL + arrow down then the value state and the input on CTRL + arrow up", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");
			const icon = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			const staticArea = await browser.execute(staticAreaItemClassName => document.querySelector(`.${staticAreaItemClassName}`), staticAreaItemClassName);

			await icon.click();
			await mcb.keys(["Control", "ArrowDown"]);

			let valueStateHeader = await browser.execute(staticArea => staticArea.shadowRoot.querySelector(".ui5-responsive-popover-header.ui5-valuestatemessage-root"), staticArea);
			let focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should be focused");

			await mcb.keys(["Control", "ArrowDown"]);

			let listItem = await popover.$("ui5-list").$$("ui5-li")[0];
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
			assert.notEqual(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header should not be focused");

			await mcb.keys(["Control", "ArrowUp"]);
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), false, "The input should not be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item is no longer focused");
			assert.equal(focusedElement[Object.keys(focusedElement)[0]], valueStateHeader[Object.keys(valueStateHeader)[0]], "The value state header is focused again");

			await mcb.keys(["Control", "ArrowUp"]);
			focusedElement = await browser.execute(staticArea => staticArea.shadowRoot.activeElement, staticArea);

			assert.equal(await mcb.getProperty("focused"), true, "The input should be focused");
			assert.equal(await listItem.getProperty("focused"), false, "The first item should not be focused");
			assert.equal(focusedElement, null, "The value state header or item should not be focused");
		});

		it ("should select all filtered items on CTRL+A", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("F4");
			await mcb.keys("ArrowDown");
			await mcb.keys(["Control", "a"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 6, "All items are selected");

			await mcb.keys(["Control", "a"]);
			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 0, "All items are deselected");

			await input.click();
			await mcb.keys("c");
			await mcb.keys("ArrowDown");
			await mcb.keys(["Control", "a"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 3, "All filtered items are selected");

			await mcb.keys(["Control", "a"]);
			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.equal(await tokens.length, 0, "All selected filtered items are deselected");
		});

		it ("should copy a token with CTRL+C and paste it with CTRL+V", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "c"]);
			await input.click();
			await input.keys(["Control", "v"]);

			assert.strictEqual(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
			assert.ok(await mcb2.getProperty("open"), "Condensed", "Popover should be open");

			await input.keys(["Control", "v"]);

			assert.equal(await mcb2.getProperty("value"), "CondensedCondensed", "Pasting second time should append the as text");
		});

		it ("should not be able to paste token with CTRL+V in read only multi combo box", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#readonly-value-state-mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "c"]);
			await input.click();
			await input.keys(["Control", "v"]);

			const mcb2Tokens = await mcb2.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await mcb2.getProperty("value"), "", "Token is not pasted into the second control");
			assert.equal(mcb2Tokens.length, 0, "No token was created.");
		});

		it ("should cut a token with CTRL+X and paste it with CTRL+V", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "x"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

			await input.click();
			await input.keys(["Control", "v"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it ("should cut a token with SHIFT+DELETE and paste it with SHIFT+INSERT", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Shift", "Delete"]);

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			assert.equal(await tokens.length, 2, "One of the tokens is cut from the control");

			await input.click();
			await input.keys(["Shift", "Insert"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it ("should copy a token with CTRL+INSERT and paste it with SHIFT+INSERT", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi1");
			const mcb2 = await browser.$("#mcb");
			const input = await mcb2.shadow$("input");
			const tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[1].click();
			await tokens[1].keys(["Control", "Insert"]);
			await input.click();
			await input.keys(["Shift", "Insert"]);

			assert.equal(await mcb2.getProperty("value"), "Condensed", "Token is pasted into the second control");
		});

		it ("should select a token with CTRL+SPACE", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-error");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Control", "Space"]);

			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(await tokens[2].getProperty("selected"), true, "Last token should be selected");
		});

		it ("CTRL+SPACE should do nothing when pressed in the input field", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");

			await input.click();
			await mcb.keys(["Shift", "Space"]);

			assert.strictEqual(await mcb.getProperty("value"), "", "Input field is empty");
		});

		it ("F4 should focus the selected item or the first one if there is no selected", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

			await mcb.click();
			await mcb.keys("F4");

			const listItem = await popover.$("ui5-list").$("ui5-li");

			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");

			await mcb.keys("ArrowDown");
			await mcb.keys("Space");
			await mcb.keys("F4");
			await mcb.keys("F4");

			const listItem2 = await popover.$("ui5-list").$$("ui5-li")[1];

			assert.equal(await listItem2.getProperty("focused"), true, "The second item is focused as it is selected");
		});

		it ("Alt + Down should focus the corresponding item to the token from which the combination is pressed", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-items");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-items");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await tokens[2].click();
			await tokens[2].keys(["Alt", "ArrowDown"]);

			let listItem = await popover.$("ui5-list").$$("ui5-li")[3];

			assert.equal(await listItem.getProperty("focused"), true, "The selected item corresponding to the token is focused");
		});

		it ("Alt + Down should focus the first item if no selected items are present", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#multi-acv");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#multi-acv");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

			await mcb.click();
			await mcb.keys(["Alt", "ArrowDown"]);

			let listItem = await popover.$("ui5-list").$$("ui5-li")[0];
			assert.equal(await listItem.getProperty("focused"), true, "The first item is focused");
		});

		it ("Alt + Down should not filter items", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

			await input.click();
			await input.keys(["a", "b"]);
			await input.keys(["Alt", "ArrowDown"]);

			let listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			assert.equal(await listItem.getProperty("focused"), true, "The items are not filtered and the first item is focused");
		});

		it ("Alt + Down should focus the item corresponding to the text value", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb");
			const input = await mcb.shadow$("input");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

			await input.click();
			await input.keys("ArrowDown");
			await input.keys("ArrowDown");
			await input.keys(["Alt", "ArrowDown"]);

			let listItem = await popover.$("ui5-list").$$("ui5-li")[1];

			assert.equal(await listItem.getProperty("focused"), true, "The second item should be focused");
		});

		it ("Backspace deletes token and forwards the focus to the last token without collapsing the tokenizer", async () => {
			const mcb = await $("#n-more-many-items");
			const inner = await mcb.shadow$("input");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			await inner.click();

			assert.strictEqual(tokens.length, 7, "7 Tokens are placed in the MCB");

			await inner.keys("Backspace");
			await inner.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");

			assert.strictEqual(tokens.length, 6, "6 Tokens are placed in the MCB");
			assert.ok(await tokens[tokens.length - 1].getProperty("focused"), "Last Token is focused");
		});

		it("should open/close popover on keyboard combination ctrl + i", async () => {
			const mcb = await $("#truncated-token");
			const rpoClassName = await getTokenizerPopoverId("truncated-token");
			const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

			await mcb.click();
			await mcb.keys(["Control", "i"]);
			assert.ok(await rpo.getProperty("opened"), "Focused MCB - n-more popover should be opened");
			await mcb.click();
			await mcb.keys(["Control", "i"]);
			assert.notOk(await rpo.getProperty("opened"), "Focused MCB - n-more popover should be closed");

			await mcb.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Control", "i"]);
			assert.ok(await rpo.getProperty("opened"), "Focused Token - n-more popover should be opened");
			await mcb.click();
			await mcb.keys("ArrowLeft");
			await mcb.keys(["Control", "i"]);
			assert.notOk(await rpo.getProperty("opened"), "Focused Token - n-more popover should be closed");
		});

		it("shouldn't open popover on keyboard combination ctrl + i when there are no tokens", async () => {
			const mcb = await $("#mcb-no-typeahead");
			const rpoClassName = await getTokenizerPopoverId("mcb-no-typeahead");
			const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

			await mcb.click();
			await mcb.keys(["Control", "i"]);
			assert.notOk(await rpo.getProperty("opened"), "n-more popover should be closed since no tokens");

		});
	});

	describe("General", () => {
		before(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
		});

		it ("tests text selection on focus", async () => {
			const mcb = await browser.$("#multi-acv");
			const mcb2 = await browser.$("#mcb-with-placeholder");

			await mcb.click();

			const selectionStartIndex = await browser.execute(() => {
				return document.querySelector("#multi-acv").shadowRoot.querySelector("input").selectionStart;
			});
			const selectionEndIndex = await browser.execute(() => {
				return document.querySelector("#multi-acv").shadowRoot.querySelector("input").selectionEnd;
			});

			assert.equal(await selectionStartIndex, 0, "The selection starts from the beginning of the value");
			assert.equal(await selectionEndIndex, 3, "The whole value is selected");

			await mcb.keys("Tab");
			assert.equal(await mcb2.getProperty("focused"), true, "The next control is focused");

			await mcb2.keys(["Shift", "Tab"]);
			assert.equal(await selectionStartIndex, 0, "The selection starts from the beginning of the value");
			assert.equal(await selectionEndIndex, 3, "The whole value is selected");


		});

		it ("tests two-column layout", async () => {
			const mcb = await browser.$("#mcb-two-column-layout");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-two-column-layout");
			const icon = await mcb.shadow$("[input-icon]");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$(".ui5-multi-combobox-all-items-responsive-popover");
			const listItem = await popover.$("ui5-list").$$("ui5-li")[0];

			await icon.click();
			assert.strictEqual(await listItem.shadow$(".ui5-li-additional-text").getText(), "DZ", "Additional item text should be displayed");
			await icon.click();
		});

		it ("placeholder tests", async () => {
			const mcb1 = await browser.$("#another-mcb").shadow$("#ui5-multi-combobox-input");
			const mcb2 = await browser.$("#mcb-with-placeholder").shadow$("#ui5-multi-combobox-input");

			assert.strictEqual(await mcb1.getAttribute("placeholder"), "Some initial text", "Should have placeholder");
			assert.strictEqual(await mcb2.getAttribute("placeholder"), "", "Shouldn't have placeholder when there are tokens");
		});

		it("placeholder tests for programmatically selected items", async () => {
			const innerInputSel = "#ui5-multi-combobox-input";

			const mcb1 = await browser.$("#mcb-init-selected-item");
			let innerInput1 = await mcb1.shadow$(innerInputSel);
			const toggleItemBtn1 = await browser.$("#sel");

			const mcb2 = await browser.$("#mcb-init-nonselected-item");
			let innerInput2 = await mcb2.shadow$(innerInputSel);
			const toggleItemBtn2 = await browser.$("#sel2");

			// Preselected item
			assert.strictEqual(await innerInput1.getAttribute("placeholder"), "", "Shouldn't have placeholder as there is a preselected item");

			toggleItemBtn1.click();

			innerInput1 = await mcb1.shadow$(innerInputSel);
			assert.strictEqual(await innerInput1.getAttribute("placeholder"), "Placeholder", "Should have placeholder as the item is programmatically deselected");

			// No preselected item
			assert.strictEqual(await innerInput2.getAttribute("placeholder"), "Placeholder", "Should have placeholder as no item is selected");

			toggleItemBtn2.click();

			innerInput2 = await mcb2.shadow$(innerInputSel);
			assert.strictEqual(await innerInput2.getAttribute("placeholder"), "", "Shouldn't have placeholder as an item is programmatically selected");
		});

		it ("Should not open value state message when component is in readonly state", async () => {
			const mcb = await browser.$("#readonly-value-state-mcb");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#readonly-value-state-mcb");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

			await mcb.click();
			assert.notOk(await popover.getProperty("opened"), "Popover with valueStateMessage should not be opened.");
		});

		it("Should apply correct text to the tokens overflow indicator", async () => {
			const mcNItems = await $("#mc-items");
			const mcNMore = await $("#mc-more");
			const tokenizerNItems = await mcNItems.shadow$("ui5-tokenizer");
			const tokenizerNMore = await mcNMore.shadow$("ui5-tokenizer");
			const nItemsLabel = await tokenizerNItems.shadow$(".ui5-tokenizer-more-text");
			const nMoreLabel = await tokenizerNMore.shadow$(".ui5-tokenizer-more-text");
			let resourceBundleText = null;

			resourceBundleText = await browser.executeAsync(done => {
				const mi = document.getElementById("mc-items");
				done({
					mcItemsLabelText: mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_SHOW_ALL_ITEMS, 2),
					mcNMoreLabelText: mi.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.MULTIINPUT_SHOW_MORE_TOKENS, 1)
				});
			});
			assert.strictEqual(await nItemsLabel.getText(), resourceBundleText.mcItemsLabelText, "Text should be 2 Items");
			assert.strictEqual(await nMoreLabel.getText(), resourceBundleText.mcNMoreLabelText, "Text should be 1 More");
		});

		it ("Should check clear icon availability", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
	
			const cb = await $("#clear-icon-cb");
			const inner = cb.shadow$("input");
			const clearIcon = await cb.shadow$(".ui5-input-clear-icon-wrapper");
	
			assert.notOk(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to false when mcb has no value");

			await inner.click();
			await inner.keys("c");
	
			assert.ok(await cb.getProperty("_effectiveShowClearIcon"), "_effectiveShowClearIcon should be set to true upon typing");
		});
	
		it ("Should check clear icon events", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
	
			const cb = await $("#clear-icon-cb");
			
			await cb.shadow$("input").click();
			await cb.shadow$("input").keys("c");

			const clearIcon = await cb.shadow$(".ui5-input-clear-icon-wrapper");

			// focus out the combo
			await clearIcon.click();
	
			assert.strictEqual(await $("#clear-icon-change-count").getText(), "0", "change event is not fired");
			assert.strictEqual(await $("#clear-icon-input-count").getText(), "2", "input event is fired twice");
		});

		it("Should remove header when value state is reset", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = $("#mcb-error");
			let staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");

			// click on arrow
			await mcb.shadow$("ui5-icon").click();

			// arrow down twice
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");

			// Enter to make selection
			await browser.keys("Space");

			// get value state header
			const valueStateHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover .ui5-valuestatemessage-header");

			assert.notOk(await valueStateHeader.isExisting(), "Value state header should not be rendered");
		});
	});

	describe("MultiComboBox Truncated Token", () => {
		beforeEach(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
		});

		it("should truncate token when single token is in the multicombobox and open popover on click", async () => {
			const mcb = await $("#truncated-token");
			const token = await mcb.shadow$("ui5-token");
			const rpoClassName = await getTokenizerPopoverId("truncated-token");
			const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

			assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

			await token.click();

			assert.ok(await rpo.getProperty("opened"), "More Popover should be open");
			assert.ok(await token.getProperty("selected"), "Token should be selected");
			assert.ok(await token.getProperty("singleToken"), "Token should be single (could be truncated)");
			assert.ok(await rpo.$("ui5-li").getProperty("focused"), "Token's list item is focused");

			await token.click();

			assert.notOk(await rpo.getProperty("opened"), "More Popover should be closed");
			assert.notOk(await token.getProperty("selected"), "Token should be deselected");
			assert.ok(await token.getProperty("focused"), "Token should be focused");
		});

		it("should close truncation popover and deselect selected tokens when clicked outside the component", async () => {
			const mcb = await $("#truncated-token");
			const token = await mcb.shadow$("ui5-token");
			const rpoClassName = await getTokenizerPopoverId("truncated-token");
			const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");

			assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

			await token.click();

			await $("#dummy-btn").click();

			assert.notOk(await rpo.getProperty("opened"), "More Popover should be closed");
			assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		});

		it("should close truncation popover and deselect selected tokens when clicked in input field", async () => {
			const mcb = await $("#truncated-token");
			const token = await mcb.shadow$("ui5-token");
			const rpoClassName = await getTokenizerPopoverId("truncated-token");
			const rpo = await browser.$(`.${rpoClassName}`).shadow$("ui5-responsive-popover");
			const inner = await mcb.shadow$("input");

			assert.ok(await token.getProperty("singleToken"), "Single token property should be set");

			await inner.click();

			assert.notOk(await rpo.getProperty("opened"), "More Popover should be closed");
			assert.notOk(await token.getProperty("selected"), "Token should be deselected");
		});
	});

	describe("ARIA attributes", () => {
		before(async () => {
			await browser.url(`test/pages/MultiComboBox.html`);
		});

		it ("aria-describedby value according to the tokens count and the value state", async () => {
			const mcb = await browser.$("#mcb-error");
			const innerInput = await mcb.shadow$("input");
			const invisibleText = await mcb.shadow$(".ui5-hidden-text");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			const tokensCountITextId = `ui5-multi-combobox-hiddenText-nMore`;
			const valuestateITextId = `ui5-multi-combobox-valueStateDesc`;
			const ariaDescribedBy = `${tokensCountITextId} ${valuestateITextId}`;

			assert.strictEqual(tokens.length, 3, "should have three tokens");
			assert.strictEqual(await innerInput.getAttribute("aria-describedby"), ariaDescribedBy, "aria-describedby has a reference for the value state and the tokens count");
		});

		it ("aria-describedby value according to the tokens count", async () => {
			const mcb = await browser.$("#mcb-compact");

			await mcb.scrollIntoView();

			const innerInput = await mcb.shadow$("input");
			let invisibleText = await mcb.shadow$(".ui5-hidden-text");
			const inivisbleTextId = await invisibleText.getProperty("id");
			let tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			let resourceBundleText = null;

			assert.strictEqual(tokens.length, 2, "should have two tokens");
			assert.strictEqual(await innerInput.getAttribute("aria-describedby"), inivisbleTextId, "aria-describedby reference is correct");
			// assert.strictEqual(await invisibleText.getText(), "Contains 2 tokens", "aria-describedby text is correct");

			await innerInput.click();
			await innerInput.keys("Backspace");
			await innerInput.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			invisibleText = await mcb.shadow$(".ui5-hidden-text");

			resourceBundleText = await browser.executeAsync(done => {
				const mcb = document.getElementById("mcb-compact");
				done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN));
			});

			assert.strictEqual(tokens.length, 1, "should have one token");
			// assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");

			await innerInput.keys("Backspace");

			tokens = await mcb.shadow$$(".ui5-multi-combobox-token");
			invisibleText = await mcb.shadow$(".ui5-hidden-text");

			resourceBundleText = await browser.executeAsync(done => {
				const mcb = document.getElementById("mcb-compact");
				done(mcb.constructor.i18nBundle.getText(window["sap-ui-webcomponents-bundle"].defaultTexts.TOKENIZER_ARIA_CONTAIN_TOKEN));
			});

			assert.strictEqual(tokens.length, 0, "should not have tokens");
			// assert.strictEqual(await invisibleText.getText(), resourceBundleText, "aria-describedby text is correct");
		});

		it ("Should apply aria-label from the accessibleName property", async () => {
			const mcb = await browser.$("#multi1");
			const innerInput = await mcb.shadow$("input");

			await mcb.scrollIntoView();

			assert.strictEqual(await innerInput.getAttribute("aria-label"), "MultiComboBox with predefined values", "aria-label attribute is correct.");
		});

		it ("Should apply aria-label from the accessibleNameRef property", async () => {
			const mcb = await browser.$("#mcb-predefined-value");
			const innerInput = await mcb.shadow$("input");
			const mcbLabel = await browser.$("#mcbLabel");

			await mcb.scrollIntoView();

			assert.strictEqual(await innerInput.getAttribute("aria-label"), await mcbLabel.getHTML(false), "aria-label attribute is correct.");
		});

		it("Checks if tokenizer hidden text of tokenizer label has aria-hidden attribute", async () => {
			const mcb = await browser.$("#mcb-compact");

			await mcb.scrollIntoView();

			const ariaHiddenText = await mcb.shadow$(".ui5-multi-combobox-tokenizer").shadow$(".ui5-hidden-text");
			const ariaHiddenAttribute = await ariaHiddenText.getAttribute("aria-hidden");

			assert.strictEqual(ariaHiddenAttribute, "true", "aria-hidden of invisible text is true");
		});

		it("Value state type should be added to the screen readers default value states announcement", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mCbWarning = await browser.$("#mcb-warning");
			const mCbSuccess = await browser.$("#mcb-success");
			const mCbError = await browser.$("#mcb-error");

			let staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-warning");
			let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

			await mCbWarning.click();

			let ariaHiddenText = await mCbWarning.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);
			let valueStateText = await popover.$("div").getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
			assert.strictEqual(valueStateText.includes("Warning issued"), true, "Displayed value state message text is correct");

			await mCbWarning.keys("Escape");
			await mCbError.click();

			staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-error");
			popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-popover");

			ariaHiddenText = await mCbError.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);
			valueStateText = await popover.$("div").getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
			assert.strictEqual(valueStateText.includes("Invalid entry"), true, "Displayed value state message text is correct");

			await mCbError.keys("Escape");
			await mCbSuccess.click();

			staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-success");
			ariaHiddenText = await mCbSuccess.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
		});

		it("Value state type should be added to the screen readers custom value states announcement", async () => {
			const mCbInformation = await browser.$("#mcb-information");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-information");

			await mCbInformation.click();
			await mCbInformation.keys("a");

			const popoverHeader = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover .ui5-valuestatemessage-header");
			const valueStateText = await popoverHeader.$("div").getHTML(false);
			const ariaHiddenText = await mCbInformation.shadow$(`#ui5-multi-combobox-valueStateDesc`).getHTML(false);

			assert.strictEqual(ariaHiddenText.includes("Value State"), true, "Hidden screen reader text is correct");
			assert.strictEqual(valueStateText.includes("Extra long text used as an information message"), true, "Displayed value state message text is correct");
		});
	});

	describe("Grouping", () => {
		it ("Tests group filtering", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");
			const arrow = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-grouping");
			let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			let groupItems = await popover.$("ui5-list").$$("ui5-li-groupheader");
			let listItems = await popover.$("ui5-list").$$("ui5-li");

			await arrow.click();

			assert.strictEqual(groupItems.length, 3, "Group items should be 3");
			assert.strictEqual(listItems.length, 12, "Items should be 12");

			await input.keys("B");

			popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			groupItems = await popover.$("ui5-list").$$("ui5-li-groupheader");
			listItems = await popover.$("ui5-list").$$("ui5-li");

			assert.strictEqual(groupItems.length, 1, "Filtered group items should be 1");
			assert.strictEqual(listItems.length, 1, "Filtered items should be 1");

			await input.keys("Backspace");
			await input.keys(['E', 'u', 'r', 'o', 'p', 'e']);

			assert.equal(await popover.getProperty("opened"), false, "Popover should not be open");
		});

		it ("Tests group item focusability", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");
			const arrow = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-grouping");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			let groupItem;

			await arrow.click();
			await input.keys("ArrowDown");

			groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];

			assert.equal(await groupItem.getProperty("focused"), true, "The first group header should be focused");
		});

		it ("Group header keyboard handling", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");
			const arrow = await mcb.shadow$("[input-icon]");
			const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#mcb-grouping");
			const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
			let groupItem;

			await arrow.click();
			await input.keys("ArrowDown");


			groupItem = await popover.$("ui5-list").$$("ui5-li-groupheader")[0];
			await groupItem.keys("Enter");

			assert.equal(await groupItem.getProperty("focused"), true, "The first group header should be focused");
			assert.equal(await popover.getProperty("opened"), true, "Popover should not be open");
			assert.strictEqual(await input.getValue(), "", "The value is not updated");

			await groupItem.keys("Space");

			assert.equal(await groupItem.getProperty("focused"), true, "The first group header should be focused");
			assert.equal(await popover.getProperty("opened"), true, "Popover should not be open");
			assert.strictEqual(await input.getValue(), "", "The value is not updated)");

			await groupItem.keys("ArrowUp");

			assert.equal(await groupItem.getProperty("focused"), false, "The first group header should be focused");
			assert.equal(await mcb.getProperty("focused"), true, "The first group header should be focused");
		});

		it ("Should not select group headers", async () => {
			await browser.url(`test/pages/MultiComboBox.html`);

			const mcb = await browser.$("#mcb-grouping");
			const input = await mcb.shadow$("#ui5-multi-combobox-input");

			await input.click();
			await mcb.setProperty("value", "Asia");
			await mcb.keys("Enter");

			let tokens = await browser.$("#mcb-grouping").shadow$$(".ui5-multi-combobox-token");
			let selectionChangeFired = await browser.execute(() => document.getElementById("selection-change-events-fired").textContent);

			assert.strictEqual(await input.getValue(), "Asia", "The value remains");
			assert.strictEqual(tokens.length, 0, "The group header is not tokenized");
			assert.strictEqual(selectionChangeFired, "", "SelectionChange event is not fired");
		});
	});
});
