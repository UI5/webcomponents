import list from "../pageobjects/ListTestPage.js";
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

describe("List Tests", () => {
	before(async () => {
		await browser.url(`test/pages/List_test_page.html`);
	});

	it("List is rendered", async () => {
		const list = await browser.$("#infiniteScrollEx").shadow$(".ui5-list-root");
		const busyInd = await browser.$("#infiniteScrollEx").shadow$(".ui5-list-busy-row");

		assert.ok(await list.isExisting(), "List is rendered");
		assert.notOk(await busyInd.isExisting(), "Busy indicator is not rendered, when List is not busy");
	});

	it("itemClick and selectionChange events are fired in Single selection", async () => {
		const itemClickResultField = await browser.$("#itemClickResultField");
		const selectionChangeResultField = await browser.$("#selectionChangeResultField");
		const selectionChangeResultFieldRadio = await browser.$("#selectionChangeResultFieldRadio");
		const firstItem = await browser.$("#listEvents #country1");
		const secondItemRadio = await browser.$("#listEvents #country2").shadow$("ui5-radio-button");

		await firstItem.click();

		assert.strictEqual(await itemClickResultField.getProperty("value"), "1", "itemClick event has been fired once");
		assert.strictEqual(await selectionChangeResultField.getProperty("value"), "1", "selectionChange event has been fired.");

		await secondItemRadio.click();
		assert.strictEqual(await itemClickResultField.getProperty("value"), "2", "itemClick event has been fired second time");
		assert.strictEqual(await selectionChangeResultField.getProperty("value"), "2", "selectionChange event has been fired second time.");
		assert.strictEqual(await selectionChangeResultFieldRadio.getProperty("value"), "true", "selectionChange event correct detail - selectionComponentPressed.");

	});

	it("itemClick and selectionChange events are fired in Multi selection", async () => {
		const itemClickResultField2 = await browser.$("#itemClickResultField2");
		const selectionChangeResultField2 = await browser.$("#selectionChangeResultField2");
		const firstItem = await browser.$("#listEvents2 #country11");

		await firstItem.click();

		assert.strictEqual(await itemClickResultField2.getProperty("value"), "1", "itemClick event has been fired once");
		assert.strictEqual(await selectionChangeResultField2.getProperty("value"), "1", "selectionChange event has been fired.");
	});

	it("selectionChange events provides previousSelection item", async () => {
		const selectionChangeResultPreviousItemsParameter = await browser.$("#selectionChangeResultPreviousItemsParameter");
		const firstItem = await browser.$("#listEvents #country1");
		const secondItem = await browser.$("#listEvents #country2");

		await firstItem.click();

		assert.strictEqual(await secondItem.getProperty("id"), await selectionChangeResultPreviousItemsParameter.getProperty("value"));
	});

	it("selection is reverted if selectionChange event is prevented and the mode is SingleSelect", async () => {
		const firstItem = await browser.$("#listPreventSelectionChangeSingleSelect #country1");
		const thirdItem = await browser.$("#listPreventSelectionChangeSingleSelect #country3");

		assert.ok(await thirdItem.getAttribute("selected"), "The third item is initially selected");

		await firstItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is not selected (prevented)");
		assert.ok(await thirdItem.getAttribute("selected"), "Selection reverted to third item");
	});

	it("selection is reverted if selectionChange event is prevented  and the mode is MultiSelect", async () => {
		const firstItem = await browser.$("#listPreventSelectionChangeMultiSelect #country1");
		const secondItem = await browser.$("#listPreventSelectionChangeMultiSelect #country2");
		const thirdItem = await browser.$("#listPreventSelectionChangeMultiSelect #country3");

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is initially not selected");
		assert.ok(await secondItem.getAttribute("selected"), "The second item is initially selected");
		assert.ok(await thirdItem.getAttribute("selected"), "The third item is initially selected");

		await firstItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is not selected (prevented)");
		assert.ok(await secondItem.getAttribute("selected"), "The second item is still selected");
		assert.ok(await thirdItem.getAttribute("selected"), "The third item is still selected");
	});

	it("No data text is shown", async () => {
		const noDataText = await browser.$("#no-data-list").shadow$(".ui5-list-nodata-text");

		assert.ok(noDataText, "No data text is shown");
	});

	it("Tests header text", async () => {
		list.id = "#list1";

		const header = await list.getHeader();

		assert.ok(await header.hasClass("ui5-list-header"), "header has the right classes");
		assert.ok(await header.getHTML(false), "API: GroupHeaderListItem");
	});

	it("Tests header slot", async () => {
		const headerSlotContent = await browser.executeAsync(done => {
			done(document.getElementById("header-slot-list").shadowRoot.querySelector("slot[name='header']").assignedNodes()[0].querySelector("#header-slot-title"));
		});

		assert.ok(headerSlotContent, "header slot content is rendered");
	});

	it("Test default slot", async () => {
		const listItemsLength = await browser.executeAsync(done => {
			const slots = document.getElementById("default-slot-test").shadowRoot.querySelector("slot").assignedNodes();

			const result = slots.filter(slot => {
				return slot.tagName === "UI5-LI";
			});

			done(result.length);
		});

		assert.strictEqual(listItemsLength, 3, "List items are rendered");
	});

	it("Tests rendering of imageContent slot", async () => {
		const imageContentSlot = await browser.executeAsync(done => {
			done(document.getElementById("imageContent-slot-li").shadowRoot.querySelector("slot[name='imageContent']").assignedNodes()[0].querySelector("#imageContent-slot-avatar"));
		});

		assert.ok(imageContentSlot, "the content of imageContent slot is rendered");
	});

	it("Clicking on inactive items does not change single selection", async () => {
		list.id = "#inactiveSingleSelect";
		const firstItem = await list.getItem(0);
		const secondItem = await list.getItem(1);

		await firstItem.click();
		await secondItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is not selected");
		assert.notOk(await secondItem.getAttribute("selected"), "The second item is not selected");
	});

	it("Clicking on inactive items does not change multi selection", async () => {
		list.id = "#inactiveMultiSelect";
		const firstItem = await list.getItem(0);
		const secondItem = await list.getItem(1);

		await firstItem.click();
		await secondItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is not selected");
		assert.notOk(await secondItem.getAttribute("selected"), "The second item is not selected");
	});

	it("mode: none. clicking item does not select it", async () => {
		list.id = "#list1";

		const firstItem = await list.getItem(0);
		await firstItem.click();

		const root = await list.getRoot();
		assert.equal(await root.getProperty("mode"), "None", "default mode is None");
		assert.notOk(await firstItem.getAttribute("selected"), "item is not selected");
	});

	it("mode: singleselect. clicking item selects it", async () => {
		const root = await list.getRoot();
		await root.setProperty("mode", "SingleSelect");

		const firstItem = await list.getItem(0);
		await firstItem.click();

		assert.ok(await firstItem.getAttribute("selected"), "item is selected");
	});

	it("mode: singleselect. clicking another item selects deselects the first", async () => {
		const firstItem = await list.getItem(0);
		const secondItem = await list.getItem(1);
		await secondItem.click();

		assert.ok(await secondItem.getAttribute("selected"), "second item is selected");
		assert.notOk(await firstItem.getAttribute("selected"), "first item is not selected");
	});

	it("mode: multiselect. clicking every item selects it independently from the other items", async () => {
		await browser.url(`test/pages/List_test_page.html`);
		const root = await list.getRoot();
		await root.setProperty("mode", "MultiSelect");

		const firstItem = await list.getItem(0);
		const secondItem = await list.getItem(1);
		await firstItem.click();
		await secondItem.click();

		assert.ok(await firstItem.getAttribute("selected"), "item is selected");
		assert.ok(await secondItem.getAttribute("selected"), "item is selected");

		await secondItem.click();

		assert.ok(await firstItem.getAttribute("selected"), "item is selected");
		assert.notOk(await secondItem.getAttribute("selected"), "item is not selected");
	});

	it("mode: delete. items have X buttons which delete them", async () => {
		await browser.url(`test/pages/List_test_page.html`);
		const root = await list.getRoot();
		await root.setProperty("mode", "Delete");

		const firstItem = await list.getItem(0);
		await firstItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "item is selected");

		const itemDeleteButton = await firstItem.shadow$('ui5-button');
		assert.ok(await itemDeleteButton.isExisting(), "there is a delete button");

		await itemDeleteButton.click();
		assert.equal(await browser.$('#lblResult').getHTML(false), "Laptop HP: 1", "itemDelete event was fired for the right item");
	});

	it("mode: delete. DELETE key press - deletes item", async () => {
		await browser.url(`test/pages/List_test_page.html`);
		const root = await list.getRoot();
		await root.setProperty("mode", "Delete");

		const firstItem = await list.getItem(0);
		await firstItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "item is selected");

		await firstItem.keys("Delete")
		assert.equal(await browser.$('#lblResult').getHTML(false), "Laptop HP: 1", "itemDelete event was fired for the right item");
	});

	it("item size and classed, when an item has both text and description", async () => {
		const ITEM_WITH_DESCRIPTION_AND_TITLE_HEIGHT = 80;
		const firstItem = await browser.$("#listWithDesc ui5-li:first-child");
		const firstItemHeight = await firstItem.getSize("height");

		assert.strictEqual(firstItemHeight, ITEM_WITH_DESCRIPTION_AND_TITLE_HEIGHT, "The size of the item is : " + firstItemHeight);
	});

	it("keyboard handling on SHIFT + TAB", async () => {
		const list = await browser.$("#keyboardTestList");
		const growingBtn = await list.shadow$('[id$="growing-btn"]');
		const headerBtn = await browser.$("#headerBtn");
		const firstItem = await browser.$("ui5-li.firstItem");
		const afterBtn = await browser.$("#afterBtn");
		const beforeBtn = await browser.$("#beforeBtn");

		await afterBtn.click();
		assert.ok(await afterBtn.isFocused(), "after btn is focused");

		// act: Shift + Tab from element outside of the list -> tab should go to growing button if exist
		await afterBtn.keys(["Shift", "Tab"]);
		assert.ok(await growingBtn.isFocusedDeep(), "growing buton is focused");

		// act: Shift + Tab from growing button -> should focus previously focused item or first item
		await growingBtn.keys(["Shift", "Tab"]);
		assert.ok(await firstItem.isFocused(), "first item is focused");

		// act: Shift + Tab from first item -> focus should go to the header content (if there is tabbable element)
		await firstItem.keys(["Shift", "Tab"]);
		assert.ok(await headerBtn.isFocused(), "header button item is focused");

		// act: Shift + Tab from the growing button - the focus should leave the ui5-list
		// and before button should be focused
		await headerBtn.keys(["Shift", "Tab"]);
		assert.ok(await beforeBtn.isFocused(), "first item is focused");
	});

	it("keyboard handling on TAB", async () => {
		const list = await browser.$("#keyboardTestList");
		const growingBtn = await list.shadow$('[id$="growing-btn"]');
		const headerBtn = await browser.$("#headerBtn");
		const firstItem = await browser.$("ui5-li.firstItem");
		const afterBtn = await browser.$("#afterBtn");
		const beforeBtn = await browser.$("#beforeBtn");
		const item = await browser.$("ui5-li-custom.item");
		const itemBtn = await browser.$("ui5-button.itemBtn");
		const itemLink = await browser.$("ui5-link.itemLink");
		const itemRadioBtn = await browser.$("ui5-radio-button.itemRadio");

		await beforeBtn.click();
		assert.ok(await beforeBtn.isFocused(), "before button is focused");

		// act: Tab from element outside of the list -> focus should go to the header content (if there is tabbable element)
		await beforeBtn.keys("Tab");
		assert.ok(await headerBtn.isFocused(), "header button is focused");

		// act: TAB from headerButton -> the focus should go to the 1st item
		await headerBtn.keys("Tab");
		assert.ok(await firstItem.isFocused(), "first item is focused");

		await firstItem.keys("ArrowDown");
		assert.ok(await item.isFocused(), "custom item is focused");

		// act: TAB from item -> the focus should go to "Click me" button
		await item.keys("Tab");
		assert.ok(await itemBtn.isFocused(), "the 1st tabbable element (button) is focused");

		// act: TAB from the "Click me" button - the the focus should go to "UI5 Link" anchor
		await itemBtn.keys("Tab");
		assert.ok(await itemLink.isFocused(), "the 2nd tabbable element (link) is focused");

		// act: TAB from the "UI5 Link" anchor - the the focus should skip the "Disabled" button
		// and go to the "Option B" radio button
		await itemLink.keys("Tab");
		assert.ok(await itemRadioBtn.isFocused(), "the last tabbable element (radio) is focused");

		await firstItem.keys("Tab");
		assert.ok(await growingBtn.isFocusedDeep(), "growing buton is focused");

		// act: TAB from the growing button - the focus should leave the ui5-list
		// and after button should be focused
		await growingBtn.keys("Tab");
		assert.ok(await afterBtn.isFocused(), "element outside of the list is focused");
	});

	it("keyboard handling on TAB when 2 level nested UI5Element is focused", async () => {
		const list = await browser.$("#focusAfterList");
		const breadcrumbsItem = await list.$(".breadcrumbsItem");
		const breadcrumb = await list.$("ui5-breadcrumbs");
		const afterBtn = await browser.$('#afterFocusListBtn');

		// act: click on the item
		await breadcrumbsItem.click();
		assert.ok(await breadcrumbsItem.isFocused(), "breadcrumb is focused");

		// act: Tab from list item to breadcrumbs
		await breadcrumbsItem.keys("Tab");
		assert.ok(await breadcrumb.isFocused(), "breadcrumb is focused");

		// act: Tab to element outside of the list -> focus should go to after button
		await breadcrumb.keys("Tab");
		assert.ok(await afterBtn.isFocused(), "after button is focused");
	});

	it("does not focus next / prev item when right / left arrow is pressed", async () => {
		const firstListItem = await browser.$("#country1");
		const secondListItem = await browser.$("#country2");

		await firstListItem.click();

		await firstListItem.keys("ArrowRight");

		assert.ok(await firstListItem.isFocused(), "First item remains focussed");
		assert.notOk(await secondListItem.isFocused(), "Second list item not should be focused");

		await firstListItem.keys("ArrowLeft");

		assert.ok(await firstListItem.isFocused(), "First item remains focussed");
	});

	it("tests 'loadMore' event not fired initially when the list did not overflow", async () => {
		const loadMoreResult = await browser.$("#growingScrollTestCounter");
		assert.strictEqual(await loadMoreResult.getAttribute("value"), "0", "The event loadMore has not been fired.");
	});

	it("tests 'loadMore' event fired upon infinite scroll", async () => {
		const btn = await browser.$("#btnTrigger");
		const loadMoreResult = await browser.$("#loadMoreResult");

		await btn.click();

		await browser.waitUntil(async () => await loadMoreResult.getProperty("value") === "1", {
			timeout: 5000,
			timeoutMsg: "The event loadMore must be fired"
		});
	});

	it("detailPress event is fired", async () => {
		const detailCounterResult = await browser.$("#detailPressCounter");
		const firstItem = await browser.$("#detailListItem");
		const detailButton = await firstItem.shadow$(".ui5-li-detailbtn");

		await detailButton.click();

		assert.strictEqual(await detailCounterResult.getProperty("innerHTML"), "1", "detailClick event has been fired once");
	});

	it("tests aria-labelledby", async () => {
		const listWithInternalHeader = await browser.$("#listWithInternalHeader");
		const listWithCustomHeader = await browser.$("#listWithCustomHeader");
		const ulInternalHeader = await listWithInternalHeader.shadow$(".ui5-list-ul");
		const ulCustomHeader = await listWithCustomHeader.shadow$(".ui5-list-ul");

		// assert: List with internal header
		const listWithInternalHeaderId = await listWithInternalHeader.getProperty("_id");
		assert.strictEqual(await ulInternalHeader.getAttribute("aria-label"),
			null, "aria-label is not present");

		assert.strictEqual(await ulInternalHeader.getAttribute("aria-labelledby"),
			`${listWithInternalHeaderId}-header`, "aria-labelledby is correct");

		// assert: List with custom header
		const EXPECTED_ARIA_LABEL_TXT = "Test aria";

		assert.strictEqual(await ulCustomHeader.getAttribute("aria-label"),
			EXPECTED_ARIA_LABEL_TXT, "aria-label is correct");
		assert.strictEqual(await ulCustomHeader.getAttribute("aria-labelledby"),
			null, "aria-labelledby is not present");
	});

	it("tests aria-labelledby for mode label", async () => {
		const justList = await browser.$("#justList");
		const listDelete = await browser.$("#listDelete");
		const emptyListDelete = await browser.$("#emptyListDelete");
		const listMultiSelect = await browser.$("#listMultiSelect");
		const listSingleSelect = await browser.$("#listSingleSelect");

		const keys = [
			"ARIA_LABEL_LIST_SELECTABLE",
			"ARIA_LABEL_LIST_MULTISELECTABLE",
			"ARIA_LABEL_LIST_DELETABLE",
		];
		const texts = await getResourceBundleTexts({ keys, id: "justList" });

		assert.strictEqual(await justList.getProperty("ariaLabelModeText"), "", "aria-label mode message is correct");
		assert.strictEqual(await emptyListDelete.getProperty("ariaLabelModeText"), "", "aria-label mode message is empty when there are no items");
		assert.strictEqual(await listDelete.getProperty("ariaLabelModeText"), texts.ARIA_LABEL_LIST_DELETABLE, "aria-label mode message is correct");
		assert.strictEqual(await listMultiSelect.getProperty("ariaLabelModeText"), texts.ARIA_LABEL_LIST_MULTISELECTABLE, "aria-label mode message is correct");
		assert.strictEqual(await listSingleSelect.getProperty("ariaLabelModeText"), texts.ARIA_LABEL_LIST_SELECTABLE, "aria-label mode message is correct");
	});


	it("tests aria-setsize and aria-posinset attributes", async () => {
		const listItem = await browser.$("#listItem").shadow$("li");
		const ariaSetSize = "200";
		const ariaPosInSet = "3";

		assert.strictEqual(await listItem.getAttribute("aria-setsize"), ariaSetSize, "The aria-setsize is correct.");
		assert.strictEqual(await listItem.getAttribute("aria-posinset"), ariaPosInSet, "The aria-posinset is correct.");

	});

	it("tests title is updated, when initially empty", async () => {
		const btnChangeEmptyItem = await browser.$("#changeEmptyItem");
		const emptyItem = await browser.$("#emptyItem");
		const NEW_TEXT = "updated";
		const assignedNodesBefore = await browser.executeAsync(done => {
			done(document.getElementById("emptyItem").shadowRoot.querySelector("slot").assignedNodes().length);
		});

		// assert default
		assert.strictEqual(await emptyItem.getProperty("innerHTML"), "",
			"The value is empty string");
		assert.strictEqual(assignedNodesBefore, 0,
			"No slotted elements as no text is present.");

		// act
		await btnChangeEmptyItem.click();	// update the item textContent

		const assignedNodesAfter = await browser.executeAsync(done => {
			done(document.getElementById("emptyItem").shadowRoot.querySelector("slot").assignedNodes().length);
		});

		// assert
		assert.strictEqual(await emptyItem.getProperty("innerHTML"), NEW_TEXT, "The value is updated");
		assert.strictEqual(assignedNodesAfter, 1, "The new text is slotted.");
	});

	it("tests events for ui5-li-custom", async () => {
		const button = await browser.$("#liBtn1");
		const input = await browser.$("#customListItemEvents");

		await button.click();

		await browser.keys("Enter");
		await browser.keys("Space");

		assert.strictEqual(await input.getProperty("value"), "0", "item-click event is not fired when the button is pressed.");
	});

	it("tests the prevention of the ui5-itemClick event", async () => {
		list.id = "#listPreventClickEvent";
		const input = await browser.$("#itemClickPreventedResultField");
		const firstItem = await list.getItem(0);

		await firstItem.click();

		assert.notOk(await firstItem.getAttribute("selected"), "The first item is not selected when we prevent the click event.");
		assert.strictEqual(await firstItem.getProperty("id"), await input.getProperty("value"));
	});

	it("Popover with List opens without errors", async () => {
		const btnPopupOpener = await browser.$("#btnOpenPopup");
		const btnInListHeader = await browser.$("#btnInHeader");

		await btnPopupOpener.click();
		assert.ok(await btnInListHeader.isFocused(), "The List header btn is focused.");
	});

	it('focusable list-items are correctly disabled', async () => {
		const item2 = await browser.$('#basicList ui5-li:nth-child(2)');

		// focus the second item
		await item2.click();

		// disable the second item
		await browser.$("#basicList ui5-li:nth-child(2)").setProperty("disabled", true);

		assert.strictEqual(await item2.shadow$('li').getProperty("tabIndex"), -1, "disabled item is no longer focusable");
		assert.strictEqual(await item2.shadow$('li').getAttribute("class"), "ui5-li-root", "disabled item no longer styled as focusable");
	});

	it('disabled list-items are skipped on navigation', async () => {
		const item1 = await browser.$('#basicList ui5-li:nth-child(1)'),
			item3 = await browser.$('#basicList ui5-li:nth-child(3)');

		// ensure the second item is disabled
		await browser.$("#basicList ui5-li:nth-child(2)").setProperty("disabled", true);

		// navigate from the first item to the next focusable item
		await item1.click();
		await item1.keys("ArrowDown");

		assert.ok(await item3.getProperty("focused"), "disabled item is skipped");
	});

	it('should include selected state text', async () => {
		const item = await browser.$("#justList #justList-country");
		const notSelectedItem = await browser.$("#listSelectedItem #not-selected-country");
		const selectedItem = await browser.$("#listSelectedItem #selected-country");

		let ariaSelectedText = await item.getProperty("ariaSelectedText");
		assert.strictEqual(ariaSelectedText, null, "List is not in select mode, no selected state should be spoken");

		ariaSelectedText = await notSelectedItem.getProperty("ariaSelectedText");
		assert.strictEqual(ariaSelectedText, "Not Selected", "Selected false state text is correct");

		ariaSelectedText = await selectedItem.getProperty("ariaSelectedText");
		assert.strictEqual(ariaSelectedText, "Selected", "Selected state text is correct");
	});

	it('group headers should not be with role options', async () => {
		const groupHeader = await browser.$("#listSelectedItem #group-header").shadow$(".ui5-ghli-root");

		assert.strictEqual(await groupHeader.getAttribute("role"), "group", "Item label is empty");
	});

	it('anchor tabs should be accessible within list items', async () => {
		const listItem = await browser.$("#linkInListItem");

		await listItem.click();
		const url = await browser.getUrl();
		assert.strictEqual(url, "https://ui5.github.io/webcomponents/playground/components", "Link target is accessible");

		await browser.url(`test/pages/List_test_page.html`);
	});

	it('should not try to fire item-close if a select is closed from custom list item', async () => {
		const select = await browser.$("#selectInLiCustom");
		const itemCloseResult = await browser.$("#customListItemSelectResult");

		await select.click();
		await select.keys("Escape");

		assert.strictEqual(await itemCloseResult.getProperty("value"), "0", "item-close event is not fired when the button is pressed.");
	});

	it("List item fires _request-tabindex-change event and updates tabindex when inner element receives focus", async () => {
		const innerElement = await browser.$("#effectiveTabindexChange #country11 button");
		const listItem = await browser.$("#effectiveTabindexChange #country11");
		const rootItemElement = await listItem.shadow$(".ui5-li-root");

		// Focus on the target list item
		await innerElement.click();

		const newTabIndex = await rootItemElement.getAttribute("tabindex");

		assert.equal(newTabIndex , "0", "The tabIndex of the list item root should be '0' when inner element receives focus.");
	});

	it("End marker has correct CSS properties", async () => {
		const list = await browser.$(".list_test_page2auto");
		const endMarker = await list.shadow$(".ui5-list-end-marker");
		const display = await endMarker.getCSSProperty("display");

		assert.strictEqual(display.value, 'inline-block', "The end marker is displayed");
	});

	it("Checks if tooltip property value equals the title of li element", async () => {
		const listItem = await browser.$("#myList7 ui5-li");

		let rootTooltip = await listItem.getProperty("tooltip");
		let innerTooltip = await listItem.shadow$("li").getAttribute("title");

		assert.strictEqual(rootTooltip, innerTooltip, "Tooltip of root element and title of inner li element are equal.");

		const newTooltip = "Updated tooltip";
		await listItem.setProperty("tooltip", newTooltip);

		rootTooltip = await listItem.getProperty("tooltip");
		innerTooltip = await listItem.shadow$("li").getAttribute("title");

		assert.strictEqual(rootTooltip, newTooltip, "Tooltip of root element is updated correctly at runtime.");
		assert.strictEqual(rootTooltip, innerTooltip, "Tooltip of root element and title of inner li element are equal after runtime change.");
	});

	it("Tests the highlight property", async () => {
		const listItem = await browser.$("#highlight ui5-li:nth-child(1)");
		const initialValueState = "Error";
		let highlightValue = await listItem.getProperty("highlight");

		assert.strictEqual(highlightValue, initialValueState, "Highlight property is correctly set to the list item.");

		const newValueState = "Information";
		await listItem.setProperty("highlight", "Information");
		highlightValue = await listItem.getProperty("highlight");

		assert.strictEqual(highlightValue, newValueState, "Highlight property is correctly changed.");

	});

	it("Tests the growingButtonText property", async () => {
		const list = await browser.$("#infiniteScrollEx2");
		const btnText = "Custom text"
		let growingBtnText = await list.getProperty("growingButtonText");

		assert.strictEqual(growingBtnText, btnText, "GrowingButtonText property is correctly set to the list.");

		const newBtnText = "New custom text";
		await list.setProperty("growingButtonText", newBtnText);
 		growingBtnText = await list.getProperty("growingButtonText");

		assert.strictEqual(growingBtnText, newBtnText, "GrowingButtonText property is correctly changed.");

	});
});

describe("List drag and drop tests", () => {
	const getDragOffset = async (draggedElement, dropTargetElement, targetPosition) => {
		const EXTRA_OFFSET = 5;
		const draggedRectangle = {
			...await draggedElement.getLocation(),
			...await draggedElement.getSize()
		};

		const dropTargetElementRectangle = {
			...await dropTargetElement.getLocation(),
			...await dropTargetElement.getSize()
		}

		const draggedElementCenter = (draggedRectangle.y + draggedRectangle.height / 2);
		const droppedElementCenter = (dropTargetElementRectangle.y + dropTargetElementRectangle.height / 2);

		let offsetToCenter = Math.round(droppedElementCenter - draggedElementCenter);

		if (targetPosition === "Before") {
			offsetToCenter -= EXTRA_OFFSET
		} else if (targetPosition === "After") {
			offsetToCenter += EXTRA_OFFSET;
		}

		return offsetToCenter;
	};

	const compareItemsOrder = async (listId, expectedItems) => {
		const listItems = await browser.$$(`#${listId} > *`);
		const results = await Promise.all(expectedItems.map((item, i) => item.isEqual(listItems[i])));

		return results.every(value => value);
	};

	before(async () => {
		await browser.url(`test/pages/ListDragAndDrop.html`);
	});

	it("Moving item After another", async () => {
		const [firstItem, secondItem, thirdItem] = await browser.$$("#listDnd1 [ui5-li]");

		let dragOffset = await getDragOffset(firstItem, secondItem, "After");
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [secondItem, firstItem, thirdItem]), "Items order has changed");
		assert.ok(await firstItem.isFocused(), "Item is focused");

		dragOffset = await getDragOffset(firstItem, thirdItem, "After");
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [secondItem, thirdItem, firstItem]), "Items order has changed");
		assert.ok(await firstItem.isFocused(), "Item is focused");
	});

	it("Moving item Before another", async () => {
		const [secondItem, thirdItem, firstItem] = await browser.$$("#listDnd1 [ui5-li]");

		let dragOffset = await getDragOffset(firstItem, thirdItem, "Before");
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [secondItem, firstItem, thirdItem]), "Items order has changed");

		dragOffset = await getDragOffset(firstItem, secondItem, "Before")
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [firstItem, secondItem, thirdItem]), "Items order has changed");
	});

	it("Moving item ON another", async () => {
		const [firstItem, secondItem, thirdItem] = await browser.$$("#listDnd2 [ui5-li]");

		await firstItem.dragAndDrop({ x: 0, y: 0 });
		assert.ok(await compareItemsOrder("listDnd2", [firstItem, secondItem, thirdItem]), "Items order has NOT changed");
		assert.ok(await firstItem.isFocused(), "Item is focused");

		const dragOffset = await getDragOffset(firstItem, secondItem);
		await firstItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd2", [secondItem, thirdItem]), "Items order has changed");
		assert.ok(await secondItem.$("[ui5-li]").isEqual(firstItem), "First item is nested in second item");
		assert.ok(await firstItem.isFocused(), "Item is focused");
	});

	it("Moving item from one list to another", async () => {
		const [listOneFirstItem, listOneSecondItem, listOneThirdItem] = await browser.$$("#listDnd1 [ui5-li]");
		const listTwoItem = await browser.$("#bg2")

		const dragOffset = await getDragOffset(listTwoItem, listOneFirstItem, "After");
		await listTwoItem.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [listOneFirstItem, listTwoItem, listOneSecondItem, listOneThirdItem]), "Items order has changed");
		assert.ok(await listTwoItem.isFocused(), "Item is focused");
	});

	it("Moving link to list that doesn't accept it", async () => {
		const [firstItem, secondItem, thirdItem] = await browser.$$("#listDnd1 [ui5-li]");
		const link = await browser.$("#link")

		const dragOffset = await getDragOffset(link, firstItem, "After");
		await link.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd1", [firstItem, secondItem, thirdItem]), "Items order has NOT changed");
	});

	it("Moving link to list that accepts it", async () => {
		const [firstItem, secondItem] = await browser.$$("#listDnd2 [ui5-li]");
		const link = await browser.$("#link")

		const dragOffset = await getDragOffset(link, secondItem, "Before");
		await link.dragAndDrop({ x: 0, y: dragOffset});
		assert.ok(await compareItemsOrder("listDnd2", [firstItem, link, secondItem]), "Items order has changed");
	});
});
