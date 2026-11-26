import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableHeaderCellActionAI from "../../src/TableHeaderCellActionAI.js";
import Label from "../../src/Label.js";

describe("TableHeaderCell - Column widths", () => {
	function checkWidth(id: string, expectedWidth: number) {
		cy.get(id).then($cell => {
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	}

	it("columns have equal widths width default width", () => {
		cy.mount(
			<Table style="width: 400px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		const expectedWidth = 100;
		cy.get("[ui5-table-header-cell]").each($cell => {
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
			expect(getComputedStyle($cell[0]).minHeight).to.not.equal("auto");
		});
	});

	it("columns have width set", () => {
		cy.mount(
			<Table style="width: 200px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="100px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell width="100px"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell width="100px"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell width="100px"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		const expectedWidth = 100;
		cy.get("[ui5-table-header-cell]").each($cell => {
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	});

	it("columns have relative width set", () => {
		cy.mount(
			<Table style="width: 200px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" width="10%"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" width="25%"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell id="colC" width="25%"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell id="colD" width="40%"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		checkWidth("#colA", 48);
		checkWidth("#colB", 50);
		checkWidth("#colC", 50);
		checkWidth("#colD", 80);

		cy.get("[ui5-table]").then($table => {
			$table.css("width", "800px");
		});

		checkWidth("#colA", 80);
		checkWidth("#colB", 200);
		checkWidth("#colC", 200);
		checkWidth("#colD", 320);
	});

	it("columns have min-width set", () => {
		cy.mount(
			<Table style="width: 800px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="100px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell minWidth="100px"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell minWidth="100px"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell minWidth="100px"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-header-cell]").each($cell => {
			const expectedWidth = 200;
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});

		cy.get("[ui5-table]").then($table => {
			$table.css("width", "400px");
		});

		cy.get("[ui5-table-header-cell]").each($cell => {
			const expectedWidth = 100;
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});

		cy.get("[ui5-table]").then($table => {
			$table.css("width", "100px");
		});

		cy.get("[ui5-table-header-cell]").each($cell => {
			const expectedWidth = 100;
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	});

	it("column width settings combined", () => {
		cy.mount(
			<Table style="width: 800px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="50px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" width="300px"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px" width="50%"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell id="colD" width="2fr"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		checkWidth("#colA", 50);
		checkWidth("#colB", 300);
		checkWidth("#colC", 400);
		checkWidth("#colD", 50);

		cy.get("[ui5-table]").then($table => {
			$table.css("width", "200px");
		});

		checkWidth("#colA", 50);
		checkWidth("#colB", 300);
		checkWidth("#colC", 200);
		// 2fr is being ignored
		checkWidth("#colD", 48);
	});
});

describe("TableHeaderCell - Popin properties", () => {
	function checkPopinState(expectedState: { poppedIn: string[], hidden: string[] }) {
		cy.get("[ui5-table-header-cell]").each(($cell, index) => {
			const id = $cell.attr("id") ?? "";
			const shouldBePoppedIn = expectedState.poppedIn.includes(id);
			const shouldBeHidden = expectedState.hidden.includes(id);
			const roleCondition = shouldBePoppedIn || shouldBeHidden ? "not.have.attr" : "have.attr";

			cy.wrap($cell)
				.should(roleCondition, "role", "columnheader");
			cy.get("[ui5-table-header-row]")
				.shadow()
				.find(`slot[name=default-${index + 1}]`)
				.should(shouldBePoppedIn || shouldBeHidden ? "not.exist" : "exist");
		});

		cy.get("[ui5-table-row]").each($row => {
			cy.wrap($row).find("[ui5-table-cell]").each(($cell, index) => {
				const id = $cell.attr("id") ?? "NOT_FOUND";
				const shouldBeHidden = expectedState.hidden.some(hiddenId => id.includes(hiddenId));
				cy.wrap($row).shadow().find(`slot[name=default-${index + 1}]`)
					.should(shouldBeHidden ? "not.exist" : "exist");
			});
		});
	}

	function mounTable(popinHidden = false) {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell id="colD" minWidth="150px" popinText="Column ?" popinHidden={popinHidden}>Column D</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell id="row-1-colA"><Label>Cell A</Label></TableCell>
					<TableCell id="row-1-colB"><Label>Cell B</Label></TableCell>
					<TableCell id="row-1-colC"><Label>Cell C</Label></TableCell>
					<TableCell id="row-1-colD"><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell id="row-2-colA"><Label>Cell A</Label></TableCell>
					<TableCell id="row-2-colB"><Label>Cell B</Label></TableCell>
					<TableCell id="row-2-colC"><Label>Cell C</Label></TableCell>
					<TableCell id="row-2-colD"><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell id="row-3-colA"><Label>Cell A</Label></TableCell>
					<TableCell id="row-3-colB"><Label>Cell B</Label></TableCell>
					<TableCell id="row-3-colC"><Label>Cell C</Label></TableCell>
					<TableCell id="row-3-colD"><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);
	}

	it("should show the popin-text in the popin area", () => {
		mounTable();
		cy.get("[ui5-table]").then($table => {
			$table.css("width", "150px");
		});

		cy.get<Table>("[ui5-table]").should($table => {
			let popinCellCount = 0;
			let validPopinTextCount = 0;
			const table = $table[0];
			// eslint-disable-next-line no-restricted-syntax
			for (const row of table.rows) {
				// eslint-disable-next-line no-restricted-syntax
				for (const cell of row.cells) {
					if (cell._popin) {
						popinCellCount++;
						const popinText = cell._headerCell.popinText || cell._headerCell.textContent;
						if (cell.shadowRoot.textContent === `${popinText}:`) {
							validPopinTextCount++;
						}
					}
				}
			}
			expect(popinCellCount).to.be.greaterThan(0);
			expect(validPopinTextCount).to.equal(popinCellCount);
		});
	});

	it("should hide column in popin if popinHidden is set", () => {
		mounTable(true);

		const testWidths = [
			{ width: 150, poppedIn: ["colC", "colB"], hidden: ["colD"] },
			{ width: 300, poppedIn: ["colC", "colB"], hidden: ["colD"] },
			{ width: 500, poppedIn: ["colC"], hidden: ["colD"] },
			{ width: 700, poppedIn: [], hidden: ["colD"] },
			{ width: 850, poppedIn: [], hidden: [] },
		];

		testWidths.forEach(({ width, poppedIn, hidden }) => {
			cy.get("[ui5-table]").then($table => {
				$table.css("width", `${width}px`);
			});

			checkPopinState({ poppedIn, hidden });
		});
	});

	it("should hide popin if popinHidden, shows it if changed on runtime", () => {
		mounTable(true);
		cy.get("[ui5-table]").then($table => {
			$table.css("width", "150px");
		});

		checkPopinState({ poppedIn: ["colC", "colB"], hidden: ["colD"] });

		cy.get("#colD")
			.invoke("removeAttr", "popin-hidden");

		checkPopinState({ poppedIn: ["colC", "colB", "colD"], hidden: [] });
	});
});

describe("TableHeaderCell - Sort indicator", () => {
	beforeEach(() => {
		cy.mount(
			<Table overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px">Column A</TableHeaderCell>
					<TableHeaderCell minWidth="200px" sortIndicator="Ascending">
						<Label required wrappingType="None">Column B</Label>
						<TableHeaderCellActionAI slot="action"></TableHeaderCellActionAI>
					</TableHeaderCell>
					<TableHeaderCell minWidth="150px" popinText="Popin Text">
						<Label required>Column C</Label>
					</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
					<TableCell>Cell C</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
					<TableCell>Cell C</TableCell>
				</TableRow>
			</Table>
		);
		cy.get("[ui5-table]").as("table").children("[ui5-table-row]").as("rows");
		cy.get("@table").children("[ui5-table-header-row]").first().as("headerRow");
		cy.get("@headerRow").get("[ui5-table-header-cell]").each(($headerCell, index) => {
			cy.wrap($headerCell).as(`headerCell${index + 1}`);
		});
		cy.get("@rows").each(($row, index) => {
			cy.wrap($row).as(`row${index + 1}`);
		});
	});

	it("renders content and updates the sort icon and aria-sort", () => {
		cy.get("@headerCell1").contains("Column A");
		cy.get("@headerCell2").should("have.attr", "aria-sort", "ascending");
		cy.get("@headerCell2").shadow().find("[ui5-icon]").as("actionBicon");
		cy.get("@actionBicon").should("have.attr", "name", "sort-ascending");

		cy.get("@headerCell2").invoke("attr", "sort-indicator", "Descending");
		cy.get("@headerCell2").shadow().find("[ui5-icon]").should("have.attr", "name", "sort-descending");
		cy.get("@actionBicon").should("have.attr", "name", "sort-descending");
		cy.get("@headerCell2").should("have.attr", "aria-sort", "descending");

		cy.get("@headerCell2").invoke("attr", "sort-indicator", "None");
		cy.get("@headerCell2").shadow().find("[ui5-icon]").should("not.exist");
		cy.get("@headerCell2").should("not.have.attr", "aria-sort");
	});
});

describe("TableHeaderCell - Interactive", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="plainHeader" minWidth="200px">Column A</TableHeaderCell>
					<TableHeaderCell id="interactiveHeader" minWidth="200px" interactive={true}>
						<Label>Column B</Label>
					</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
				</TableRow>
			</Table>
		);
	});

	it("fires the header-click event on click, Enter, Space only when interactive", () => {
		cy.get("#plainHeader").invoke("on", "header-click", cy.stub().as("plainClick"));
		cy.get("#interactiveHeader").invoke("on", "header-click", cy.stub().as("headerClick"));

		// non-interactive header does not fire the header-click event
		cy.get("#plainHeader").realClick();
		cy.get("@plainClick").should("not.have.been.called");

		cy.get("#interactiveHeader").realClick();
		cy.get("@headerClick").should("have.been.calledOnce");

		// click on slotted content still fires the header-click
		cy.get("#interactiveHeader").find("[ui5-label]").realClick();
		cy.get("@headerClick").should("have.been.calledTwice");

		// keyboard: Enter and Space
		cy.get("#interactiveHeader").realPress("Enter");
		cy.get("@headerClick").should("have.been.calledThrice");
		cy.get("#interactiveHeader").realPress("Space");
		cy.get("@headerClick").should("have.callCount", 4);
	});

	it("sets the _active attribute while clicked", () => {
		cy.get("#interactiveHeader").realMouseDown();
		cy.get("#interactiveHeader").should("have.attr", "_active");
		cy.get("#interactiveHeader").realMouseUp();
		cy.get("#interactiveHeader").should("not.have.attr", "_active");
	});

	describe("with a slotted action", () => {
		beforeEach(() => {
			cy.mount(
				<Table id="table">
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell id="interactiveHeader" minWidth="200px" interactive={true}>
							<Label>Column B</Label>
							<TableHeaderCellActionAI slot="action"></TableHeaderCellActionAI>
						</TableHeaderCell>
					</TableHeaderRow>
					<TableRow>
						<TableCell>Cell B</TableCell>
					</TableRow>
				</Table>
			);
		});

		it("keeps focus on the interactive header on Enter instead of moving it to a slotted action", () => {
			cy.get("#interactiveHeader").invoke("on", "header-click", cy.stub().as("headerClick"));

			// click
			cy.get("#interactiveHeader").realClick();
			cy.focused().should("have.id", "interactiveHeader");
			cy.get("@headerClick").should("have.been.calledOnce");
			cy.focused().should("have.id", "interactiveHeader");

			// Enter fires the event again, but focus must stay on the header cell and not move to the slotted action button
			cy.get("#interactiveHeader").realPress("Enter");
			cy.get("@headerClick").should("have.been.calledTwice");
			cy.focused().should("have.id", "interactiveHeader");
		});

		it("does not set the _active state when a slotted action is clicked", () => {
			cy.get("#interactiveHeader").find("[ui5-table-header-cell-action-ai]").shadow().find("[ui5-button]")
				.as("actionButton");

			// clicking the action button must not set the _active state on the header cell
			cy.get("@actionButton").realMouseDown();
			cy.get("#interactiveHeader").should("not.have.attr", "_active");
			cy.get("@actionButton").realMouseUp();

			// clicking the header cell itself still sets the _active state
			cy.get("#interactiveHeader").realMouseDown();
			cy.get("#interactiveHeader").should("have.attr", "_active");
			cy.get("#interactiveHeader").realMouseUp();
		});

		it("does not fire header-click when a slotted action is clicked", () => {
			cy.get("#interactiveHeader").find("[ui5-table-header-cell-action-ai]").shadow().find("[ui5-button]")
				.as("actionButton");
			cy.get("#interactiveHeader").invoke("on", "header-click", cy.stub().as("headerClick"));

			// clicking the action button must not fire the header-click event
			cy.get("@actionButton").realClick();
			cy.get("@headerClick").should("not.have.been.called");

			// clicking the header cell itself still fires the event
			cy.get("#interactiveHeader").realClick();
			cy.get("@headerClick").should("have.been.calledOnce");
		});
	});
});
