import { assert } from "chai";

describe("Table general interaction", () => {
	before(async () => {
		await browser.url(`test/pages/Table.html`);
	});

	it("tests if column disapears when min-width is reacted (650px)", async () => {
		const btn = await browser.$("#size-btn-650");
		const headerTableRow = await browser.$("#tbl").shadow$("thead tr");

		await btn.click();

		assert.strictEqual((await headerTableRow.getHTML(false)).split("</slot>").length - 1, 4, "Columns should be 4");
	});

	it("tests if column popins when min-width is reacted (500px)", async () => {
		const btn = await browser.$("#size-btn-500");
		const headerTableRow = await browser.$("#tbl").shadow$("thead tr");
		const popinRows = await browser.$("#roll-0").shadow$$(".ui5-table-popin-row");

		await btn.click();

		assert.strictEqual((await headerTableRow.getHTML(false)).split("</slot>").length - 1, 2, "Columns should be 4");
		assert.strictEqual((await browser.$("#roll-0").shadow$$(".ui5-table-popin-row")).length, 2, "popin rows should be 2");
	});

	it("tests if noData div is displayed for empty table", async () => {
		const noDataRow = await browser.$("#tableNoData").shadow$("div.ui5-table-no-data-row");

		assert.ok(await noDataRow.isExisting(), 'noData div is present');
	});

	it("tests if popinChange is fired when min-width is reacted (500px)", async () => {
		let tableLabel = await browser.$("#tableLabel");
		const btn = await browser.$("#size-btn-500");
		const btn2 = await browser.$("#size-btn-650");

		await btn.click();

		assert.strictEqual(await tableLabel.getHTML(false), "Number of poppedColumns: 4", "popinChange should be fired and columns should be 4");

		await btn2.click();

		assert.strictEqual(await tableLabel.getHTML(false), "Number of poppedColumns: 2", "popinChange should be fired and columns should be 2");
	});

	it("tests row-click is fired", async () => {
		const lbl = await browser.$("#testRowClickResult");
		const cellInRow1 = await browser.$("#testRowClickCell1");
		const cellInRow2 = await browser.$("#testRowClickCell2");
		const row1Data = "Dublin";
		const row2Data = "London";

		await cellInRow1.click();
		let lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row1Data), "Event row-click fired and intercepted.");

		await cellInRow2.click();
		lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row2Data), "Event row-click fired and intercepted.");

		await cellInRow1.keys("Space");
		lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row1Data), "Event row-click fired and intercepted.");

		await cellInRow2.keys("Enter");
		lblHtml = await lbl.getHTML();
		assert.ok(lblHtml.indexOf(row2Data), "Event row-click fired and intercepted.");
	});

	it("tests row aria-label value", async () => {
		const row = await browser.$("#roll-0").shadow$(".ui5-table-row-root");

		const EXPECTED_TEXT = "Product Notebook Basic 15HT-1000 Supplier Very Best Screens Dimensions 30 x 18 x 3 cm Weight 4.2 KG Price 956 EUR. 2 of 6";

		assert.strictEqual(await row.getAttribute("aria-label"), EXPECTED_TEXT,
			"The aria-label value is correct.");
	});

	it("tests header's row aria-label value", async () => {
		const table = await browser.$("#tbl");
		const tableHeader = await table.shadow$(".ui5-table-header-row");

		const EXPECTED_TEXT = "Header Row 1 of 6 Product Supplier Dimensions Weight Price";

		assert.strictEqual(await tableHeader.getAttribute("aria-label"), EXPECTED_TEXT,
			"The aria-label value is correct.");
	});

	it("tests selectable row aria-label value", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const row = await browser.$("#firstRowSingleSelect");
		const rowRoot = await browser.$("#firstRowSingleSelect").shadow$(".ui5-table-row-root");

		let EXPECTED_TEXT = "Product Notebook Basic 15 Supplier Very Best Screens Dimensions 30 x 18 x 3 cm Weight 4.2 KG Price 956 EUR Row Type Active. 2 of 5. Not Selected";

		assert.strictEqual(await rowRoot.getAttribute("aria-label"), EXPECTED_TEXT, "The aria-label value is correct.");

		await row.setProperty("selected", true);

		EXPECTED_TEXT = "Product Notebook Basic 15 Supplier Very Best Screens Dimensions 30 x 18 x 3 cm Weight 4.2 KG Price 956 EUR Row Type Active. 2 of 5. Selected";

		assert.strictEqual(await rowRoot.getAttribute("aria-label"), EXPECTED_TEXT, "The aria-label value is correct.");
	});

	describe("Accessibility", () => {
		before(async () => {
			await browser.url(`test/pages/Table.html`);
		});

		it("Should apply aria-label from the accessibleName property", async () => {
			const table = await browser.$("#tblLessCells");
			const innerTable = await table.shadow$("table");

			assert.strictEqual(await innerTable.getAttribute("aria-label"), "Table label", "Table aria-label attribute is correct.");
		});

		it("Should apply aria-label from the accessibleNameRef property", async () => {
			const table = await browser.$("#tbl");
			const innerTable = await table.shadow$("table");
			const tableLabel = await browser.$("#tableLabel");

			assert.strictEqual(await innerTable.getAttribute("aria-label"), await tableLabel.getHTML(false), "Table aria-label attribute is correct.");
		});

		it("Should announce empty cell in a row", async () => {
			const row = await browser.$("#rowWithEmptyCell").shadow$(".ui5-table-row-root");
			const EXPECTED_TEXT = "City Empty Supplier J.M. Brothers Country USA. 3 of 4";

			assert.strictEqual(await row.getAttribute("aria-label"), EXPECTED_TEXT,
				"The aria-label value is correct when there is an empty cell in the row.");
		});

		describe("Keyboard handling when popin", async () => {
			before(async () => {
				await browser.url(`test/pages/TableAllPopin.html`);
				await browser.setWindowSize(500, 1200);
			})

			it("Should have correct focus handling when having popin rows", async () => {
				const beforeBtn = await browser.$("#beforeEl");
				const link = await browser.$("#focusedEl");
				const afterBtn = await browser.$("#afterEl");

				await beforeBtn.click();
				await browser.keys("Tab");
				await browser.keys("Tab");

				assert.equal(await link.isFocused(), true, "Link is focused")

				await browser.keys("Tab");
				assert.equal(await afterBtn.isFocused(), true, "Button is focused")
			});

			it("Should have correct focus handling when having popin rows", async () => {
				const input = await browser.$("#tbl2 #interactive");
				const btn = await browser.$("#btn-focused");
				const secondInput = await browser.$("#input-second-focused");

				await input.click();
				await browser.keys("Tab");

				assert.equal(await btn.isFocused(), true, "Button is focused")

				await browser.keys("Tab");
				assert.equal(await secondInput.isFocused(), true, "Input is focused")
			});

			after(async () => {
				await browser.setWindowSize(1600, 1200);
			})
		})
	});

	describe("Growing Table on 'More' button press", async () => {
		it("tests the 'load-more' event", async () => {
			await browser.url(`test/pages/TableGrowingWithButton.html`);

			const inputResult = await browser.$("#inputLoadMoreCounter");
			const loadMoreTrigger = await browser.$("#tbl").shadow$(".ui5-table-growing-row-inner");

			// act
			await loadMoreTrigger.click();
			// assert
			assert.strictEqual(await inputResult.getProperty("value"), "1",
				"The load-more is fired.");

			// act
			await loadMoreTrigger.keys("Space");
			// assert
			assert.strictEqual(await inputResult.getProperty("value"), "2",
				"The load-more is fired 2nd time.");

			// act
			await loadMoreTrigger.keys("Enter");
			// assert
			assert.strictEqual(await inputResult.getProperty("value"), "3",
				"The load-more is fired 3rd time.");
		});
	});

	describe("Growing Table on Scroll", async () => {
		it("tests the 'load-more' event", async () => {
			await browser.url(`test/pages/TableGrowingWithScroll.html`);

			const inputResult = await browser.$("#inputLoadMoreCounter");
			const btnScroll = await browser.$("#btnScroll");

			// act
			await btnScroll.click();

			await browser.waitUntil(async () => (await inputResult.getProperty("value")) === "1", {
				timeout: 2000,
				timeoutMsg: "The load-more event must be fired."
			});
		});

		it("tests 'loadMore' event not fired initially when the table does not overflow", async () => {
			await browser.url(`test/pages/TableGrowingWithScroll.html`);

			await browser.pause(300);

			const inputResult = await browser.$("#inputLoadMoreInitialCounter");

			assert.strictEqual(await inputResult.getAttribute("value"), "0", "The event load-more has not been fired.");
		});
	});

	describe("Table selection modes", async () => {
		it("test click over Active/Inactive row in SingleSelect mode", async () => {
			await browser.url("test/pages/TableSelection.html");
			const table = await browser.$("#single");
			const firstRow = await browser.$("#firstRowSingleSelect");
			const thirdRow = await browser.$("#thirdRowSingleSelect");
			const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowSSLabel");
			const firstCellThirdRowLabel = await browser.$("#firstCellThirdRowSSLabel");
			const contentButton = await browser.$("#button1");
			const rowClickCount = await browser.$("#rowClickSSCountField");
			const selectionChangeCount = await browser.$("#selectionChangeSSCountField");
			const selectedRow = await browser.$("#selectionChangeSSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeSSPreviousRowField");

			// act
			await firstCellFirstRowLabel.click();

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(await table.getAttribute("mode"), "SingleSelect", "The table's mode is SingleSelect");
			assert.strictEqual(await firstRow.getAttribute("mode"), "SingleSelect", "The row's mode is SingleSelect");
			assert.strictEqual(await firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(await thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events on click over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowSingleSelect", "The first row is selected");

			// act
			await firstCellThirdRowLabel.click();

			// test row-click and selection-change events on click over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "2", "Click over an Inactive row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowSingleSelect", "The second row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "Prevously the first row was selected");

			// act
			await contentButton.click();

			// test row-click and selection-change on click over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "2", "Click over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowSingleSelect", "The selected row is not changed");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "The prevously  selected row is not changed");
		});

		it("test Space/Enter key interaction over Active/Inactive row in SingleSelect mode", async () => {
			const firstRow = await browser.$("#firstRowSingleSelect");
			const secondRow = await browser.$("#secondRowSingleSelect");
			const thirdRow = await browser.$("#thirdRowSingleSelect");
			const forthRow = await browser.$("#forthRowSingleSelect");
			const contentButton = await browser.$("#button1");
			const rowClickCount = await browser.$("#rowClickSSCountField");
			const selectionChangeCount = await browser.$("#selectionChangeSSCountField");
			const selectedRow = await browser.$("#selectionChangeSSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeSSPreviousRowField");

			// act
			await browser.keys(["Shift", "Tab"]);
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "3", "Enter key over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowSingleSelect", "The first row is selected");

			// act
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an already selected row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Enter key over an already selected row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "3", "Enter key over an already selected row should not trigger selection-change event");

			// act
			await browser.keys("ArrowDown");
			await browser.keys("ArrowDown");
			await thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Enter key over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "4", "Enter key over an Inactive row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowSingleSelect", "The third row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowSingleSelect", "Prevously the first row was selected");

			// act
			await thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an already selected row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an already selected row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "4", "Space key over an already selected row should not trigger selection-change event");

			// act
			await browser.keys("ArrowDown");
			await forthRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "5", "Space key over an Inactive row should trigger selection-change event");

			// act
			await browser.keys("ArrowUp");
			await browser.keys("ArrowUp");
			await secondRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an Active row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "6", "Space key over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowSingleSelect", "The second row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "forthRowSingleSelect", "Prevously the forth row was selected");

			// act
			await browser.keys(["Shift", "Tab"]);
			await contentButton.keys("Space");

			// test row-click and selection-change on Space key over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "3", "Space key over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "6", "Space key over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowSingleSelect", "The selected row is not changed");
		});

		it("test click over Active/Inactive row in MultiSelect mode", async () => {
			const table = await browser.$("#multi");
			const firstRow = await browser.$("#firstRowMultiSelect");
			const thirdRow = await browser.$("#thirdRowMultiSelect");
			const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowMSLabel");
			const firstCellThirdRowLabel = await browser.$("#firstCellThirdRowMSLabel");
			const checkBoxFirstCell = await firstRow.shadow$(".ui5-multi-select-checkbox").shadow$(".ui5-checkbox-root");
			const contentButton = await browser.$("#button2");
			const rowClickCount = await browser.$("#rowClickMSCountField");
			const selectionChangeCount = await browser.$("#selectionChangeMSCountField");
			const selectedRow = await browser.$("#selectionChangeMSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeMSPreviousRowField");

			// act
			await firstCellFirstRowLabel.click();

			// check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(await table.getAttribute("mode"), "MultiSelect", "The table's mode is MultiSelect");
			assert.strictEqual(await firstRow.getAttribute("mode"), "MultiSelect", "The row's mode is MultiSelect");
			assert.strictEqual(await firstRow.getAttribute("type"), "Active", "The row's type is Active");
			assert.strictEqual(await thirdRow.getAttribute("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Click over a row in a MultiSelect mode table should not trigger selection-change event");

			// act
			await checkBoxFirstCell.click();

			// test click over the selection checkbox within each row in MultiSelect mode
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over the selection checkbox should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over the selection checkbox should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowMultiSelect", "The first row is selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "", "There is no previously selected row");

			// act
			await contentButton.click();

			// test row-click and selection-change on click over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over an active element within a table cell should not trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowMultiSelect", "The selected row is not changed");

			// act
			await firstCellThirdRowLabel.click();

			// test row-click and selection-change events over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Click over an Inactive row should not trigger selection-change event");
		});

		it("test Space/Enter key interaction over Active/Inactive row in MultiSelect mode", async () => {
			const firstRow = await browser.$("#firstRowMultiSelect");
			const secondRow = await browser.$("#secondRowMultiSelect");
			const thirdRow = await browser.$("#thirdRowMultiSelect");
			const checkBoxFirstCell = await secondRow.shadow$(".ui5-multi-select-checkbox").shadow$(".ui5-checkbox-root");
			const contentButton = await browser.$("#button2");
			const selectionChangeCount = await browser.$("#selectionChangeMSCountField");
			const rowClickCount = await browser.$("#rowClickMSCountField");
			const selectedRow = await browser.$("#selectionChangeMSSelectedValueField");
			const previouslySelectedRows = await browser.$("#selectionChangeMSPreviousRowField");

			// act
			await browser.keys("ArrowUp");
			await browser.keys("ArrowUp");
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Enter key over an Active row should not trigger selection-change event");

			// act
			await browser.keys("Tab");
			await browser.keys("Tab");
			await contentButton.keys("Enter");

			// test row-click and selection-change on Enter key over an active table cell content
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an active element within a table cell should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "1", "Enter key over an active element within a table cell should not trigger selection-change event");

			// act
			await browser.keys("Tab");
			await browser.execute(el => el.focus(), checkBoxFirstCell);
			await checkBoxFirstCell.keys("Enter");

			// test Space over the selection checkbox within each row in MultiSelect mode
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over the selection checkbox should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "2", "Enter key over the selection checkbox should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowMultiSelect", "The second row is currently selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowMultiSelect", "Prevously the first row was selected");

			// act
			await checkBoxFirstCell.keys("Space");

			// test Space key over the selection checkbox of already selected row in MultiSelect mode
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over the selection checkbox should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "3", "Space key over the selection checkbox of already selected row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "firstRowMultiSelect", "The second row is not selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "secondRowMultiSelect", "Prevously the second row was selected");

			// act
			await browser.keys(["Shift", "Tab"]);
			await secondRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Active row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "4", "Space key over an Active row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "secondRowMultiSelect", "The second row is currently selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "firstRowMultiSelect", "The previously selected row is the first row");

			// act
			await browser.keys("ArrowDown");
			await thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "5", "Space key over an Inactive row should trigger selection-change event");
			assert.strictEqual(await selectedRow.getProperty("value"), "thirdRowMultiSelect", "The third row is cuurently selected");
			assert.strictEqual(await previouslySelectedRows.getProperty("value"), "secondRowMultiSelect", "The previously selected row is the second row");

			// act
			await thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an already selected row
			assert.strictEqual(await rowClickCount.getProperty("value"), "2",  "Enter key over an already selected Inactive row should not trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "5",  "Enter key over an already selected row should trigger selection-change event");
		});

		it("test selectAll functionallity in MultiSelect mode", async () => {
			await browser.url("test/pages/TableSelection.html");
			const firstRow = await browser.$("#firstRowMultiSelect");
			const secondRow = await browser.$("#secondRowMultiSelect");
			const thirdRow = await browser.$("#thirdRowMultiSelect");
			const forthRow = await browser.$("#forthRowMultiSelect");
			const table = await browser.$("#multi");
			const selectAllCheckBox = await table.shadow$("thead ui5-checkbox");

			// act
			await firstRow.setProperty("selected", true);
			await secondRow.setProperty("selected", true);
			await thirdRow.setProperty("selected", true);
			await forthRow.setProperty("selected", true);

			// assert
			assert.ok(await firstRow.getAttribute("selected"), "The first row is selected");
			assert.ok(await secondRow.getAttribute("selected"), "The second row is selected");
			assert.ok(await thirdRow.getAttribute("selected"), "The third row is selected");
			assert.ok(await forthRow.getAttribute("selected"), "The forth row is selected");
			assert.ok(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is checked");

			// act
			await forthRow.setProperty("selected", false);

			// assert
			assert.notOk(await forthRow.getAttribute("selected"), "The forth row is not selected");
			assert.notOk(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is not checked");
		});

		it("test mouse and keyboard interaction over Active/Inactive row in Default mode", async () => {
			const table = await browser.$("#default");
			const firstRow = await browser.$("#firstRowDefaultMode");
			const thirdRow = await browser.$("#thirdRowDefaultMode");
			const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowDefaultLabel");
			const firstCellThirdRowLabel = await browser.$("#firstCellThirdRowDefaultLabel");
			const rowClickCount = await browser.$("#rowClickDefaultCountField");
			const selectionChangeCount = await browser.$("#selectionChangeDefaultCountField");

			// act
			await firstCellFirstRowLabel.click();

			// Check whether the table's and row's mode property is set correctly, as well as the row type property
			assert.strictEqual(await table.getProperty("mode"), "None", "The table's mode is None");
			assert.strictEqual(await firstRow.getProperty("mode"), "None", "The row's mode is None");
			assert.strictEqual(await firstRow.getProperty("type"), "Active", "The row's type is Active");
			assert.strictEqual(await thirdRow.getProperty("type"), "Inactive", "The row's type is Inactive")

			// test row-click and selection-change events on click over an Active row
			assert.strictEqual(await rowClickCount.getProperty("value"), "1", "Click over an Active row should trigger row-click event");
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Click over a row in a default mode table should not trigger selection-change event");

			// act
			await firstRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Active row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Enter key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Active row should trigger row-click event");

			// act
			await firstRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Active row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Space key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Active row should not trigger row-click event");

			// act
			await firstCellThirdRowLabel.click();

			// test row-click and selection-change events on click over an Inactive row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Click over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Click over an Inactive row should trigger row-click event");

			// act
			await thirdRow.keys("Enter");

			// test row-click and selection-change events on Enter key activation over an Inactive row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Enter key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Enter key over an Inactive row should not trigger row-click event");

			// act
			await thirdRow.keys("Space");

			// test row-click and selection-change events on Space key activation over an Inactive row
			assert.strictEqual(await selectionChangeCount.getProperty("value"), "", "Space key over a row in a default mode table should not trigger selection-change event");
			assert.strictEqual(await rowClickCount.getProperty("value"), "2", "Space key over an Inactive row should not trigger row-click event");
		});

		it ("tests adding spaces to input fields in a row", async () => {
			await browser.url(`test/pages/Table.html`);

			const input = await browser.$("#myInput");
			const inner = await input.shadow$("input");

			await inner.click();
			await inner.keys("a");
			await inner.keys("Space");
			await inner.keys("b");

			assert.strictEqual(await inner.getValue(), "a b", "space should be visible");
		});
	});

	describe("Navigated property", () => {
		before(async () => {
			await browser.url(`test/pages/Table.html`);
		});

		it("Should apply aria-current when navigated property is true", async () => {
			const table = await browser.$("#tblLessCells");
			const row = await table.$$("ui5-table-row")[0];

			assert.strictEqual(await row.shadow$("tr").getAttribute("aria-current"), "true", "Table row aria-current attribute is set correctly.");
		});

		it("Aria-current should not be present when navigated property is false", async () => {
			const table = await browser.$("#tblLessCells");
			const row = await table.$$("ui5-table-row")[1];

			assert.notOk(await row.shadow$("tr").getAttribute("aria-current"), "Table row aria-current attribute is not present.");
		});
	});

	describe("Display cell inline or block according to property popin-display", () => {
		before(async () => {
			await browser.url(`test/pages/Table.html`);
		});

		it("Popin-display property should have value Inline", async () => {
			const table = await browser.$("#tbl");
			const column = await table.$$("ui5-table-column")[2];

			assert.strictEqual(await column.getAttribute("popin-display"), "Inline", "Table row popin-display property is set to Inline.");
		});

		it("Popin-display should have value Block by default", async () => {
			const table = await browser.$("#tbl");
			const column = await table.$$("ui5-table-column")[0];

			assert.strictEqual(await column.getAttribute("popin-display"), "Block", "Table row popin-display property is set by default.");
		});
	});
});

describe("Table keyboard interaction", async () => {
	it("Tab/Shift+Tab", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");

		const firstRow = await browser.$("#firstRowMultiSelect");
		const buttonInFirstRow = await firstRow.$("#button2");
		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");

		const secondRow = await browser.$("#secondRowMultiSelect");
		const buttonInSecondRow = await secondRow.$("#button3");

		const precedingElementInTabIndex = await browser.$("#selectionChangeSSPreviousRowField");
		const nextElementInTabIndex = await browser.$("#rowClickMSCountField");

		// Act
		await precedingElementInTabIndex.click();
		await browser.keys("Tab");

		// Assert
		assert.ok(await firstRow.isFocused(), "First row's root should be focused on initial table focusin");
		assert.notOk(await buttonInFirstRow.isFocused(), "The button nested in the first row should not be focused on initial table focusin");

		// Act
		await browser.keys("Tab");

		// Assert
		assert.ok(await buttonInFirstRow.isFocused(), "The button nested in the first row should be focused");
		assert.notOk(await firstRow.isFocused(), "First row's root not be focused when a nested element is in focus");
		assert.notOk(await firstRowCheckBox.isFocused(), "The first row's checkbox is excluded from the tab chain");

		// Act
		await browser.keys("Tab");

		// Assert
		assert.ok(await nextElementInTabIndex.isFocused(), "The element after the table is focused on Tab over the last focusable element");
		assert.notOk(await secondRow.isFocused(), "The second row should not be focused");
		assert.notOk(await buttonInSecondRow.isFocused(), "The second row's button should not be focused");

		// Act
		await browser.keys(["Shift", "Tab"]);

		// Assert
		assert.ok(await buttonInFirstRow.isFocused(), "The previously focused button in the table should be focused");
		assert.notOk(await nextElementInTabIndex.isFocused(), "The element after the table should lose focus");

		// Act
		await browser.keys(["Shift", "Tab"]);

		// Assert
		assert.ok(await firstRow.isFocused(), "The first row's root should be focused");
		assert.notOk(await buttonInFirstRow.isFocused(), "The previously focused nested button should lose focus");

		// Act
		await browser.keys(["Shift", "Tab"]);

		// Assert
		assert.ok(await precedingElementInTabIndex.isFocused(), "The element before the table should be focused");
		assert.notOk(await firstRow.isFocused(), "The first row should lose focus");
	});

	it("F7", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");

		const firstRow = await browser.$("#firstRowMultiSelect");
		const buttonInFirstRow = await firstRow.$("#button2");

		const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowMSLabel");

		// Act
		await firstCellFirstRowLabel.click();
		await browser.keys("Tab");
		await browser.keys("F7");

		// Assert
		assert.ok(await firstRow.isFocused(), "The first row's root should be in focus");
		assert.notOk(await buttonInFirstRow.isFocused(), "The button nested in the first row should lose focus");

		// Act
		await browser.keys("F7");

		// Assert
		assert.ok(await buttonInFirstRow.isFocused(), "The button nested in the first row should be focused");
		assert.notOk(await firstRow.isFocused(), "First row's root should lose focus");
	});

	it("Ctrl + A", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const firstRow = await browser.$("#firstRowMultiSelect");
		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");
		const secondRow = await browser.$("#secondRowMultiSelect");
		const thirdRow = await browser.$("#thirdRowMultiSelect");
		const forthRow = await browser.$("#forthRowMultiSelect");
		const selectAllCheckBox = await table.shadow$("thead ui5-checkbox");

		const firstCellFirstRowLabel = await browser.$("#firstCellFirstRowMSLabel");

		// Act
		await firstCellFirstRowLabel.click();

		// Assert
		assert.notOk(await firstRow.getAttribute("selected"), "The first row is not selected");
		assert.notOk(await firstRowCheckBox.getProperty("checked"), "The first row's checkbox is not checked");
		assert.notOk(await secondRow.getAttribute("selected"), "The second row is not selected");
		assert.notOk(await thirdRow.getAttribute("selected"), "The third row is not selected");
		assert.notOk(await forthRow.getAttribute("selected"), "The forth row is not selected");
		assert.notOk(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is not checked");

		// Act
		await browser.keys(["Control", "a"]);

		// Assert
		assert.ok(await firstRow.getAttribute("selected"), "The first row is selected");
		assert.ok(await firstRowCheckBox.getProperty("checked"), "The first row's checkbox is checked");
		assert.ok(await secondRow.getAttribute("selected"), "The second row is selected");
		assert.ok(await thirdRow.getAttribute("selected"), "The third row is selected");
		assert.ok(await forthRow.getAttribute("selected"), "The forth row is selected");
		assert.ok(await selectAllCheckBox.getProperty("checked"), "Select all checkbox is checked");
	});

	it("Alt + Up/Down", async () => {
		await browser.url(`test/pages/TableGrowingWithButton.html`);

		const table = await browser.$("#tbl");
		const tableHeader = await table.shadow$(".ui5-table-header-row");
		const firstRow = await table.$("ui5-table-row");
		const secondRow = await table.$$("ui5-table-row")[1];
		const moreButton = await table.shadow$('[id$="growingButton"]');

		const firstCellFirstRowLabel = await firstRow.$("ui5-label");

		// Act
		await firstCellFirstRowLabel.waitForClickable({ timeout: 1600 });
		await firstCellFirstRowLabel.click();

		// Assert
		assert.ok(await firstRow.isFocused(), "The first row is initially focused");

		// [Alt] + [Up]
		await browser.keys(["Alt", "ArrowUp"]);

		// Assert
		assert.ok(await tableHeader.isFocusedDeep(), "Focus should move from first row to header");
		assert.notOk(await firstRow.isFocused(), "The first row should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowUp"]);

		// Assert
		assert.ok(await moreButton.isFocusedDeep(), "Focus should move from header to More button");
		assert.notOk(await tableHeader.isFocusedDeep(), "The header should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowUp"]);

		// Assert
		assert.ok(await firstRow.isFocused(), "Focus should move from More button to last focused row");
		assert.notOk(await moreButton.isFocusedDeep(), "The More button should not be focused");

		// [Alt] + [Down]
		await browser.keys("ArrowDown");

		// Assert
		assert.ok(await secondRow.isFocused(), "The second row is initially focused");

		await browser.keys(["Alt", "ArrowDown"]);

		// Assert
		assert.ok(await moreButton.isFocusedDeep(), "Focus should move from second row to More button");
		assert.notOk(await secondRow.isFocused(), "The second row should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowDown"]);

		// Assert
		assert.ok(await tableHeader.isFocusedDeep(), "Focus should move More button to header");
		assert.notOk(await moreButton.isFocusedDeep(), "The More button should not be focused");

		// Act
		await browser.keys(["Alt", "ArrowDown"]);

		// Assert
		assert.ok(await secondRow.isFocused(), "Focus should move from header to last focused row");
		assert.notOk(await tableHeader.isFocusedDeep(), "The header should not be focused");
	});

	it("SHIFT + UP/DOWN", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const firstRow = await browser.$("#firstRowMultiSelect");
		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");
		const secondRow = await browser.$("#secondRowMultiSelect");
		const thirdRow = await browser.$("#thirdRowMultiSelect");

		await firstRowCheckBox.click();
		await browser.keys(["Shift", "ArrowDown"]);

		assert.strictEqual(await firstRow.getProperty("selected"), true, "The first row is selected");
		assert.strictEqual(await secondRow.getProperty("selected"), true, "The second row is selected");

		await browser.keys("ArrowDown");
		await browser.keys(["Shift", "ArrowUp"]);
		await browser.keys(["Shift", "ArrowUp"]);

		assert.strictEqual(await firstRow.getProperty("selected"), false, "The first row is unselected");
		assert.strictEqual(await secondRow.getProperty("selected"), false, "The second row is unselected");

		await firstRowCheckBox.click();
		await browser.keys(["Shift", "ArrowDown"]);
		await browser.keys(["Shift", "ArrowDown"]);

		await firstRowCheckBox.click();
		await browser.keys(["Shift", "ArrowDown"]);
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys(["Shift", "ArrowUp"]);

		assert.strictEqual(await secondRow.getProperty("selected"), false, "The second row is unselected");
		assert.strictEqual(await thirdRow.getProperty("selected"), false, "The third row is unselected");
	});

	it("CTRL + HOME/END", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const tableHeader = await table.shadow$(".ui5-table-header-row");
		const firstRow = await browser.$("#firstRowMultiSelect");

		const firstRowCheckBox = await firstRow.shadow$("ui5-checkbox");
		const secondRow = await browser.$("#secondRowMultiSelect");
		const fourthRow = await browser.$("#forthRowMultiSelect");

		await firstRowCheckBox.click();
		await browser.keys(["Control", "Home"]);

		assert.strictEqual(await tableHeader.getAttribute("tabindex"), "0", "The header is focused");

		await browser.keys(["Control", "End"]);

		assert.strictEqual(await fourthRow.getAttribute("forced-tab-index"), "0", "The last row is focused");
	});

	it("SHIFT + HOME/END", async () => {
		await browser.url(`test/pages/TableSelection.html`);

		const table = await browser.$("#multi");
		const firstRow = await browser.$("#firstRowMultiSelect");
		const headerFirstLabel = await table.$("ui5-table-column");
		const headerFirstLabelDOM = await headerFirstLabel.shadow$("th");

		const secondRow = await browser.$("#secondRowMultiSelect");
		const thirdRow = await browser.$("#thirdRowMultiSelect");
		const fourthRow = await browser.$("#forthRowMultiSelect");

		await headerFirstLabelDOM.click();
		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");
		await browser.keys(["Shift", "Home"]);

		assert.strictEqual(await firstRow.getProperty("selected"), true, "The first row is selected");
		assert.strictEqual(await secondRow.getProperty("selected"), true, "The second row is selected");

		await browser.keys("ArrowDown");
		await browser.keys("ArrowDown");

		await browser.keys(["Shift", "End"]);

		assert.strictEqual(await thirdRow.getProperty("selected"), true, "The third row is selected");
		assert.strictEqual(await fourthRow.getProperty("selected"), true, "The fourth row is selected");
	});
});
