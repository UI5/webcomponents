import { assert } from "chai";
import tabContainer from "../pageobjects/TabContainerTestPage.js";

describe("TabContainer general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/TabContainer.html`);
	});

	it("tests initially selected tab", async () => {
		const tabContainer = await browser.$("#tabContainer1");
		const selectedTab = await tabContainer.$("[selected]");
		const selectedFilter = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");
		const SELECTION_CSS_CLASS = "ui5-tab-strip-item--selected";

		const selectedFilterHtml = await selectedFilter.getHTML();
		assert.include(selectedFilterHtml, SELECTION_CSS_CLASS, "The item has the selection css class set.");
		assert.strictEqual(selectedFilter.id, selectedTab.id, "The IDs of the ui5-tab and the rendered tab matches.");
	});

	it("tests initially no explicitly selected tab", async () => {
		const tabContainer = await browser.$("#tabContainerIconOnly");
		const selectedSlot = await tabContainer.shadow$('slot[name="default-1"]');

		assert.ok(await selectedSlot.isExisting(), "selected slot is correct");
	});

	it("tests empty tab container", async () => {
		assert.ok(await browser.$("#tabContainerEmpty").isDisplayed(), "Empty tab container is rendered.");
	});

	it("tests tabSelect event", async () => {
		const item = await browser.$("#tabContainer1").shadow$(".ui5-tab-strip-item:nth-child(3)");
		const result = await browser.$("#result");
		const resultIdx = await browser.$("#resultIdx");

		const SELECTED_TAB_TEXT = "Laptops";
		const SELECTED_TAB_INDEX = "2";

		await item.click();

		assert.strictEqual(await result.getText(), SELECTED_TAB_TEXT, "Tab text is retrieved correctly.");
		assert.strictEqual(await resultIdx.getText(), SELECTED_TAB_INDEX, "Tab index is retrieved correctly.");
	});

	it("tests preventing tabSelect", async() => {
		// Setup
		const cbPrevent = await browser.$("#cbPrevent");
		await cbPrevent.click();

		const selectedTab = await browser.$("#tabContainer1").shadow$(".ui5-tab-strip-item--selected");
		const newTab = await browser.$("#tabContainer1").shadow$(".ui5-tab-strip-item:nth-child(1)");

		assert.notStrictEqual(await newTab.getProperty("id"), await selectedTab.getProperty("id"), "tabs to test are different");

		// Act
		await newTab.click();

		// Assert
		assert.ok(await selectedTab.hasClass("ui5-tab-strip-item--selected"), "previously selected tab is still selected");
		assert.notOk(await newTab.hasClass("ui5-tab-strip-item--selected"), "clicked tab is not selected");

		// Clean-up
		await cbPrevent.click();
	});

	it("tests custom media ranges", async () => {
		await browser.setWindowSize(520, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "S", "media-range=S");

		await browser.setWindowSize(650, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "M", "media-range=M");

		await browser.setWindowSize(1350, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "L", "media-range=L");

		await browser.setWindowSize(1650, 1080);
		assert.strictEqual(await browser.$("#tabContainerIconOnly").getAttribute("media-range"), "XL", "media-range=XL");
	});

	it("tests if content is scrollable when tabcontainer takes limited height by its parent", async () => {
		const { tcHeight, tcScrollHeight } = await browser.executeAsync(done => {
			const scrollableContent = document.getElementById("tc-scrollable-child");

			done({
				tcHeight: scrollableContent.offsetHeight,
				tcScrollHeight: scrollableContent.scrollHeight,
			});
		});

		const { tabHeight, tabScrollHeight } = await browser.executeAsync(done => {
			const scrollableContent = document.getElementById("scrollable-tab").shadowRoot.querySelector("div");

			done({
				tabHeight: scrollableContent.offsetHeight,
				tabScrollHeight: scrollableContent.scrollHeight,
			});
		});

		assert.isBelow(tabHeight, tabScrollHeight, "Tab Content is scrollable");
		assert.isAtLeast(tcHeight, tcScrollHeight, "TabContainer is not scrollable");
	});

	it("tests aria attrs", async () => {
		const tabContainer = await browser.$("#tabContainer1");
		const tab4 = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");

		assert.notOk(await tabContainer.shadow$(".ui5-tc__tabStrip").getAttribute("aria-describedby"),"aria-describedby is not set");
		assert.notOk(await tabContainer.shadow$(".ui5-hidden-text").isExisting(),"hidden text is not created");

		// assert: The TabContainer has 8 children, 7 tabs and 1 separator (at position 2)
		// and the separator should be skipped in terms of aria-posinset and aria-setsize,
		// so for child number 4 ("Monitors") we expect the following attributes aria-posinset="3" and aria-setsize="7".
		assert.strictEqual(await tab4.getAttribute("aria-posinset"), "3", "The aria-posinset is correct.");
		assert.strictEqual(await tab4.getAttribute("aria-setsize"), "7", "The aria-setsize is correct.");
		assert.strictEqual(await tab4.getAttribute("role"), "tab", "Tab role is correct");
		assert.notOk(await tab4.getAttribute("aria-roledescription"),"aria-roledescription is not set");
	});

	it("tests aria attrs when sub tabs", async () => {
		const tabContainer = await browser.$("#tabContainerNestedTabs");

		const tab1 = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(1)");
		const tab2 = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(3)");
		const tab3 = await tabContainer.shadow$(".ui5-tab-strip-item:nth-child(4)");

		const tablistAriaDescribedBy = await tabContainer.shadow$(".ui5-tc__tabStrip").getAttribute("aria-describedby");
		const hiddenTextId = await tabContainer.shadow$(".ui5-hidden-text").getAttribute("id");

		assert.ok(tablistAriaDescribedBy,"aria-describedby is set");
		assert.ok(hiddenTextId,"hidden text is created");
		assert.strictEqual(tablistAriaDescribedBy, hiddenTextId, "aria-describedby equals to hidden text id");

		assert.notOk(await tab1.getAttribute("aria-haspopup"),"The aria-haspopup is not set.");
		assert.notOk(await tab2.getAttribute("aria-haspopup"),"The aria-haspopup is not set.");
		assert.ok(await tab3.getAttribute("aria-haspopup"),"The aria-haspopup is set.");
	});

	it("tests start and end overflow behavior", async () => {

		assert.strictEqual(await browser.$("#tabContainerStartAndEndOverflow").getAttribute("tabs-overflow-mode"), "StartAndEnd", "overflow mode is set to StartAndEnd");

		// Resize
		await browser.setWindowSize(1000, 1080);
		const tabcontainer = await browser.$("#tabContainerStartAndEndOverflow");
		const startOverflow = await tabcontainer.shadow$(".ui5-tc__overflow--start");
		assert.strictEqual(await startOverflow.getProperty("innerText"), "+12", "12 tabs in start overflow");

		await browser.setWindowSize(800, 1080);
		assert.strictEqual(await startOverflow.getProperty("innerText"), "+14", "14 tabs in start overflow");

		// Select
		const initiallySelectedItem = await tabcontainer.$("[selected]");
		assert.strictEqual(await initiallySelectedItem.getProperty("text"), "Twenty", "Initially selected item is Twenty");

		await startOverflow.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerStartAndEndOverflow");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const item = await (await popover.$("ui5-list").$$("ui5-li-custom"))[0];

		assert.strictEqual(await item.getProperty("innerText"), "One", "First item in overflow is 1");

		await item.click()
		const newlySelectedItem = await tabcontainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "One", "Newly selected item is One");
	});

	it("tests end overflow behavior", async () => {

		await browser.setWindowSize(1000, 1080);

		const tabcontainer = await browser.$("#tabContainerEndOverflow");
		const endOverflow = await tabcontainer.shadow$(".ui5-tc__overflow--end");

		// Select
		const initiallySelectedItem = await tabcontainer.$("[selected]");
		assert.strictEqual(await initiallySelectedItem.getProperty("text"), "Thirteen", "Initially selected item is 13");

		await endOverflow.click();

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerEndOverflow");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();

		const newlySelectedItem = await tabcontainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "Eleven", "The first item in the overflow is 11");

	});

	it("tests removing of responsive paddings for the content", async () => {
		const tabContainer = await browser.$(".tabContainerNoContentPaddings");
		const expectedContentPadding = "0px";
		const actualContentPadding = await tabContainer.shadow$(".ui5-tc__content").getCSSProperty("padding-left");

		assert.strictEqual(actualContentPadding.value, expectedContentPadding, "tabContainer has correct padding set on the content");
	});

	it.skip("tests nested tabs", async () => {
		const tabContainer = await browser.$("#tabContainerNestedTabs");
		const expandButton = await tabContainer.shadow$(".ui5-tab-expand-button [ui5-button]");

		assert.ok(await expandButton.getAttribute("tooltip"), "Expand button tooltip is set");

		await expandButton.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerNestedTabs");

		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		assert.notOk(await browser.$("#button21").isDisplayed(), "Content for tab 2.1 is not displayed");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();
		let newlySelectedItem = await tabContainer.$("[selected]");
		assert.strictEqual(await newlySelectedItem.getProperty("text"), "2.1", "Sub tabs are selectable and the selected tab is 2.1");
		assert.ok(await browser.$("#button21").isDisplayed(), "Proper content for tab 2.1 is displayed");

		assert.notOk(await browser.$("#button211").isDisplayed(), "Content for tab 2.1.1 is not displayed");
		await expandButton.click();
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[1].click();
		newlySelectedItem = await tabContainer.$("[selected]");
			assert.notOk(await browser.$("#button21").isDisplayed(), "Content for tab 2.1 is not displayed");
		assert.strictEqual(await newlySelectedItem.getProperty("text"), "2.1.1", "Sub tabs are selectable and the selected tab is 2.1.1");
		assert.ok(await browser.$("#button211").isDisplayed(), "Proper content for tab 2.1.1 is displayed");

		assert.notOk(await browser.$("#button2121").isDisplayed(), "Content for tab 2.1.2.1 is not displayed");
		await expandButton.click();
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[4].click();
		newlySelectedItem = await tabContainer.$("[selected]");
		assert.notOk(await browser.$("#button21").isDisplayed(), "Content for tab 2.1 is not displayed");
		assert.notOk(await browser.$("#button211").isDisplayed(), "Content for tab 2.1.1 is not displayed");
		assert.strictEqual(await newlySelectedItem.getProperty("text"), "2.1.2.1", "Sub tabs are selectable and the selected tab is 2.1.2.1");
		assert.ok(await browser.$("#button2121").isDisplayed(), "Proper content for tab 2.1.2.1 is displayed")
	});

	it("tests custom overflow buttons via slots", async () => {
		await browser.setWindowSize(1000, 1080);

		const tabContainer = await browser.$("#tabContainerCustomOverflowButtons");
		const startOverflow = await tabContainer.shadow$("slot[name=startOverflowButton]");
		const endOverflow = await tabContainer.shadow$("slot[name=overflowButton]");

		assert.ok(startOverflow.isExisting(), "tabContainer has custom start overflow button");
		assert.ok(endOverflow.isExisting(), "tabContainer has custom end overflow button");

		assert.ok(startOverflow.isDisplayed(), "tabContainer has custom start overflow button displayed");
		assert.ok(endOverflow.isDisplayed(), "tabContainer has custom end overflow button displayed ");

		const startButton = await browser.$("#startOverflowButton");
		startButton.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerCustomOverflowButtons");
		let popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();

		let newlySelectedItem = await tabContainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "One", "The first item in the overflow is 1");

		const endButton = await browser.$("#endOverflowButton");
		endButton.click();
		popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		await (await popover.$("ui5-list").$$("ui5-li-custom"))[0].click();

		newlySelectedItem = await tabContainer.$("[selected]");

		assert.strictEqual(await newlySelectedItem.getProperty("text"), "Thirteen", "The first item in the overflow is 13");
	});

	it("selecting a tab programatically will update the tab strip", async () => {
		// Setup
		const getTabInStripDomRef = tab => tab.getTabInStripDomRef();
		const getElementInBrowser = el => document.querySelector(el);

		const tabContainer = await browser.$("#tcSmall");
		await tabContainer.scrollIntoView();

		const firstTab = await browser.execute(getElementInBrowser, "#firstTab");
		const firstTabInStrip = await browser.$(await browser.execute(getTabInStripDomRef, firstTab));

		const lastTab = await browser.execute(getElementInBrowser, "#lastTab");
		const lastTabInStrip = await browser.$(await browser.execute(getTabInStripDomRef, lastTab));

		const nestedTabParentTab = await browser.execute(getElementInBrowser, "#nestedTabParent");
		const nestedTabParentInTabStrip = await browser.$(await browser.execute(getTabInStripDomRef, nestedTabParentTab));

		// Assert
		assert.notOk(await lastTabInStrip.isDisplayed(), "last tab in strip is not visible");

		// Act
		await browser.$("#selectLast").click();

		// Assert
		assert.ok(await lastTabInStrip.isDisplayed(), "last tab in strip is visible");
		assert.ok(await lastTabInStrip.hasClass("ui5-tab-strip-item--selected"), "last tab is selected");

		// Act
		await browser.$("#selectFirst").click();

		// Assert
		assert.notOk(await lastTabInStrip.isDisplayed(), "last tab in strip is visible");
		assert.notOk(await lastTabInStrip.hasClass("ui5-tab-strip-item--selected"), "last tab is selected");
		assert.ok(await firstTabInStrip.isDisplayed(), "last tab in strip is visible");
		assert.ok(await firstTabInStrip.hasClass("ui5-tab-strip-item--selected"), "last tab is selected");

		// Act
		await browser.$("#selectNested").click();

		// Assert
		assert.notOk(await firstTabInStrip.isDisplayed(), "last tab in strip is visible");
		assert.notOk(await firstTabInStrip.hasClass("ui5-tab-strip-item--selected"), "last tab is selected");
		assert.ok(await nestedTabParentInTabStrip.isDisplayed(), "last tab in strip is visible");
		assert.ok(await nestedTabParentInTabStrip.hasClass("ui5-tab-strip-item--selected"), "last tab is selected");
	});

	it("tests effective selected tab", async () => {
		const tabContainer = await browser.$("#tabContainerAddTabsProgrammatically");
		const allInitialTabs = await tabContainer.$$("ui5-tab");

		// Assert
		assert.ok(await allInitialTabs[0].getProperty("selected"), "The first tab should be selected");
		assert.notOk(await allInitialTabs[1].getProperty("selected"), "The second tab should not be selected");

		// Act
		await browser.$("#buttonAddTabs").click();
		const allTabs = await tabContainer.$$("ui5-tab");

		// Assert
		assert.notOk(await allTabs[0].getProperty("selected"), "The first tab should not be selected");
		assert.notOk(await allTabs[1].getProperty("selected"), "The second tab should not be selected");
		assert.ok(await allTabs[2].getProperty("selected"), "Only the third tab should be selected");
		assert.notOk(await allTabs[3].getProperty("selected"), "The fourth tab should not be selected");
		assert.notOk(await allTabs[4].getProperty("selected"), "The fifth tab should not be selected");
	});

	it("tests tabs dom ref", async () => {
		const productsTabDomRef = await browser.$(() => document.querySelector("[stable-dom-ref='products-ref']").getDomRef());
		const productsTabStableDomRef = await browser.$(() => document.querySelector("[stable-dom-ref='products-ref']").shadowRoot.firstElementChild);

		// Assert
		assert.ok(productsTabDomRef.isEqual(productsTabStableDomRef) , "Stable dom ref of the tab is the same as its dom ref");

		const productsTabDomRefInStrip = await browser.$(() => document.querySelector("[stable-dom-ref='products-ref']").getTabInStripDomRef());
		const productsTabDomRefInStripExpected = await browser.$(() => document.getElementById("tabContainer1").getDomRef().querySelector(".ui5-tab-strip-item:first-child"));

		// Assert
		assert.ok(productsTabDomRefInStrip.isEqual(productsTabDomRefInStripExpected) , "Tab dom ref in strip should be the first child of the tab container's strip");
	});

	it("tests inline visualization", async () => {
		const tabContainer = await browser.$("#tabContainerInlineTab");
		const firstTabItemText = await tabContainer.shadow$(".ui5-tab-strip-itemText");

		// Assert
		assert.notOk(await tabContainer.shadow$(".ui5-tab-strip-itemAdditionalText").isExisting(), "There is no additional text.");
		assert.strictEqual(await firstTabItemText.getProperty("innerText"), "Tab 1 (123)" , "The inline number is added to the text.");
	});

	it("test that tab can be focused right after is inserted in the tab container", async () => {
		await browser.$("#insertAndFocusNewTab").click();
		const isNewTabFocused = await browser.executeAsync((done) => {
			const tabInStripDomRef = document.getElementById("newlyInsertedFocusedTab").getTabInStripDomRef();
			const activeElement = document.activeElement.shadowRoot.activeElement;

			done(tabInStripDomRef === activeElement);
		});

		assert.ok(isNewTabFocused, "Tab should be focused");
	});
});

describe("TabContainer keyboard handling", () => {
	before(async () => {
		await browser.url(`test/pages/TabContainer.html`);
	});

	it("[Arrow Down] on two-click area tab", async () => {
		const tabcontainer = await browser.$("#tabContainerNestedTabs");
		const item = tabcontainer.shadow$$(".ui5-tab-strip-item")[3];

		assert.strictEqual(await item.getProperty("innerText"), "Four", "Correct tab is found");

		await item.click();
		await item.keys("ArrowDown");

		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerNestedTabs");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		assert.ok(await popover.isDisplayed(), "Popover is opened");
	});
});

describe("TabContainer popover", () => {
	before(async () => {
		await browser.url(`test/pages/TabContainer.html`);
		await browser.setWindowSize(860, 1000);
	});

	it("tests popover after new tab is inserted", async () => {
		const tabcontainer = await browser.$("#tabContainerEndOverflow");
		const endOverflow = await tabcontainer.shadow$(".ui5-tc__overflow--end");
		await endOverflow.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerEndOverflow");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");
		const listItemsCount = await popover.$$("[ui5-li-custom]").length;

		assert.ok(listItemsCount > 0, "There are items in the overflow");

		// Act
		await browser.executeAsync((done) => {
			const newTab = document.createElement("ui5-tab");
			newTab.setAttribute("text", "New Tab");
			document.getElementById("tabContainerEndOverflow").insertBefore(newTab, null);
			done();
		});

		const newListItemsCount = await popover.$$("[ui5-li-custom]").length;

		assert.strictEqual(newListItemsCount, listItemsCount + 1, "Overflow list displays all its items");
	});

	it("tests popover items indentation", async () => {
		const tabcontainer = await browser.$("#tabContainerNestedTabs");
		const endOverflow = await tabcontainer.shadow$(".ui5-tc__overflow--end");
		await endOverflow.click();
		const staticAreaItemClassName = await browser.getStaticAreaItemClassName("#tabContainerNestedTabs");
		const popover = await browser.$(`.${staticAreaItemClassName}`).shadow$("ui5-responsive-popover");

		const tabAssertions = [
			{ tabText: "Ten", expectedIndent: 0 },
			{ tabText: "Ten 1", expectedIndent: 8 },
			{ tabText: "Ten 1.1", expectedIndent: 16 },
			{ tabText: "Ten 1.1.1", expectedIndent: 24 },
			{ tabText: "Ten 1.1.1.1", expectedIndent: 32 }
		].map(async ({ tabText, expectedIndent}) => {
			const tab = await popover.$(`[ui5-li-custom]=${tabText}`)
			const wrapper = await tab.$(".ui5-tab-overflow-itemContent-wrapper")
			const paddingLeft = await wrapper.getCSSProperty("padding-left");

			assert.strictEqual(paddingLeft.parsed.value, expectedIndent, "Tab indentation is correct");

			return paddingLeft.parsed.value;
		});

		const paddings = await Promise.all(tabAssertions);
		const sortedPaddings = [...paddings].sort((a, b) => a - b);

		assert.deepEqual(paddings, sortedPaddings, "Indentation hierarchy is correct");
	});
});

describe("TabContainer drag and drop tests", () => {
	const getDragOffset = async (draggedElement, dropTargetElement, targetPosition) => {
		const OFFSET = 5;
		const draggedRectangle = {
			...await draggedElement.getLocation(),
			...await draggedElement.getSize()
		};

		const dropTargetElementRectangle = {
			...await dropTargetElement.getLocation(),
			...await dropTargetElement.getSize()
		};

		const draggedElementXCenter = draggedRectangle.x + draggedRectangle.width / 2;
		const draggedElementYCenter = draggedRectangle.y + draggedRectangle.height / 2;

		let dropTargetX;
		let dropTargetY;

		if (targetPosition === "Before") {
			dropTargetX = dropTargetElementRectangle.x + OFFSET;
			dropTargetY = dropTargetElementRectangle.y + OFFSET;
		} else if (targetPosition === "After") {
			dropTargetX = dropTargetElementRectangle.x + dropTargetElementRectangle.width - OFFSET;
			dropTargetY = dropTargetElementRectangle.y + dropTargetElementRectangle.height - OFFSET;
		} else { // "On"
			dropTargetX = dropTargetElementRectangle.x + dropTargetElementRectangle.width / 2;
			dropTargetY = dropTargetElementRectangle.y + dropTargetElementRectangle.height / 2;
		}

		const offsetToX = Math.round(dropTargetX - draggedElementXCenter);
		const offsetToY = Math.round(dropTargetY - draggedElementYCenter);

		return {
			x: offsetToX,
			y: offsetToY
		};
	};

	const moveElementById = (arr, id1, id2) => {
		const newArr = [...arr];
		const index1 = newArr.indexOf(id1);
		const index2 = newArr.indexOf(id2);

		const [item] = newArr.splice(index1, 1);
		newArr.splice(index2, 0, item);

		return newArr;
	};

	const dragAndDropInStrip = async (stripItemToDrag, stripDropTarget, placement) => {
		const dragOffset = await getDragOffset(stripItemToDrag, stripDropTarget, placement);

		await stripItemToDrag.dragAndDrop({ x: dragOffset.x, y: 0 });
	}

	const dragAndDropInPopover = async (popoverItemToDrag, popoverDropTarget, placement) => {
		const dragOffset = await getDragOffset(popoverItemToDrag, popoverDropTarget, placement);

		await popoverItemToDrag.dragAndDrop({ x: 0, y: dragOffset.y });
	}

	before(async () => {
		await browser.url(`test/pages/TabContainerDragAndDrop.html`);
		await browser.setWindowSize(1024, 1000);
	});

	it("Moving item After another", async () => {
		await browser.$("#tabContainerDnd")
		await tabContainer.getStartOverflow("tabContainerDnd")
		await tabContainer.getEndOverflow("tabContainerDnd")
		let displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		let draggedStripItem = displayedStripItems[0];
		let dropTargetStripItem = displayedStripItems[1];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "After");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem));
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");

		displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		draggedStripItem = displayedStripItems[1];
		dropTargetStripItem = displayedStripItems[displayedStripItems.length - 1];
		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "After");
		expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem));
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item Before another", async () => {
		let displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		let draggedStripItem = displayedStripItems[displayedStripItems.length - 1];
		let dropTargetStripItem = displayedStripItems[displayedStripItems.length - 2];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "Before");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem));
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");

		displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		draggedStripItem = displayedStripItems[displayedStripItems.length - 1];
		dropTargetStripItem = displayedStripItems[0];
		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "Before");
		expectedOrder = moveElementById(expectedOrder, await tabContainer.getRealTabId(draggedStripItem), await tabContainer.getRealTabId(dropTargetStripItem));
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it ("Moving item On another", async () => {
		let displayedStripItems = await tabContainer.getDisplayedTabStripItems("tabContainerDnd");
		let draggedStripItem = displayedStripItems[5];
		let draggedStripItemId = await tabContainer.getRealTabId(draggedStripItem);
		let dropTargetStripItem = displayedStripItems[6];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInStrip(draggedStripItem, draggedStripItem, "On");
		let expectedOrder = currentOrder;
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has NOT changed");

		await dragAndDropInStrip(draggedStripItem, dropTargetStripItem, "On");
		expectedOrder = currentOrder.filter(id => id !== draggedStripItemId);
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item After another in end overflow popover", async () => {
		await tabContainer.getEndOverflow("tabContainerDnd").click();

		let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainerDnd");
		let draggedPopoverItem = displayedPopoverItems[0];
		let dropTargetPopoverItem = displayedPopoverItems[2];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInPopover(draggedPopoverItem, dropTargetPopoverItem, "After");
		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedPopoverItem), await tabContainer.getRealTabId(dropTargetPopoverItem));
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");
	});

	it("Moving item Before another in end overflow popover", async () => {
		let displayedPopoverItems = await tabContainer.getCurrentPopoverItems("tabContainerDnd");
		let draggedPopoverItem = displayedPopoverItems[2];
		let dropTargetPopoverItem = displayedPopoverItems[1];
		let currentOrder = await tabContainer.getItemsIds("tabContainerDnd");

		await dragAndDropInPopover(draggedPopoverItem, dropTargetPopoverItem, "Before");
		await browser.pause(10000); // TODO: this workaround avoids test crash. Find way to avoid it

		let expectedOrder = moveElementById(currentOrder, await tabContainer.getRealTabId(draggedPopoverItem), await tabContainer.getRealTabId(dropTargetPopoverItem));
		currentOrder = await tabContainer.getItemsIds("tabContainerDnd");
		assert.deepEqual(currentOrder, expectedOrder, "Items order has changed");

		// close the popover
		await tabContainer.getEndOverflow("tabContainerDnd").click();
	});
});
