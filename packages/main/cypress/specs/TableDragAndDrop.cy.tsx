import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Table from "../../src/Table.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import Label from "../../src/Label.js";

describe("API & Events", () => {
	function dragTo(selectors: { source: string, destination: string }, position: MovePlacement, expectMove = true, onPrevented = false) {
		const source = Cypress.$(selectors.source)[0];
		const destination = Cypress.$(selectors.destination)[0];
		const destinationRect = destination.getBoundingClientRect();

		const dataTransfer = new DataTransfer();

		cy.get(selectors.source)
			.then(row => {
				row.get(0).dispatchEvent(new DragEvent("dragstart", {
					dataTransfer,
					bubbles: true,
				}));
			});

		let delta = 10;
		if (position === MovePlacement.On) {
			delta = destinationRect.height / 2;
		} else if (position === MovePlacement.After) {
			delta = destinationRect.height;
		}

		cy.get("ui5-table")
			.trigger("dragover", {
				dataTransfer,
				clientX: destinationRect.left,
				clientY: destinationRect.top + delta,
			});

		cy.get("ui5-table")
			.trigger("drop", {
				dataTransfer,
			});

		cy.get(selectors.source)
			.trigger("dragend");

		cy.get("@moveOver")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					source: { element: source },
					destination: { element: destination, placement: position },
				},
			});

		if (onPrevented) {
			position = MovePlacement.After;
		}

		if (expectMove) {
			cy.get("@move")
				.should("be.called")
				.should("be.calledWithMatch", {
					detail: {
						source: { element: source },
						destination: { element: destination, placement: position },
					},
				});
		}
	}

	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
				</TableHeaderRow>
				{Array.from({ length: 10 }).map((_, index) =>
					<TableRow rowKey={`${index}`} movable={true}>
						<TableCell><Label>Cell A</Label></TableCell>
						<TableCell><Label>Cell B</Label></TableCell>
					</TableRow>
				)}
				<TableRow rowKey="10">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
	});

	it("tests if draggable=true is set", () => {
		cy.get("[ui5-table-row]")
			.should("have.length", 11)
			.each(($row, index) => {
				if (index === 10) {
					cy.wrap($row).should("not.have.attr", "draggable");
				} else {
					cy.wrap($row).should("have.attr", "draggable", "true");
				}
			});
	});

	it("tests if events are fired and paramters are as expected", () => {
		cy.get("[ui5-table]")
			.then(table => {
				table.get(0).addEventListener("move-over", e => e.preventDefault());
				table.get(0).addEventListener("move-over", cy.stub().as("moveOver"));
				table.get(0).addEventListener("move", cy.stub().as("move"));
			});

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='1']",
		}, MovePlacement.Before);
		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='1']",
		}, MovePlacement.On);
		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='1']",
		}, MovePlacement.After);
	});

	it("tests if drop with Before placement does not occur when not preventing move-over for it", () => {
		cy.get("ui5-table")
			.then(table => {
				table.get(0).addEventListener("move-over", (e: Event) => {
					const evt = e as CustomEvent; // needed to satisfy TS
					if (evt.detail.destination.placement === MovePlacement.Before) {
						return;
					}
					e.preventDefault();
				});
				table.get(0).addEventListener("move-over", cy.stub().as("moveOver"));
				table.get(0).addEventListener("move", cy.stub().as("move"));
			});

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.Before, false);
		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.On);
		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.After);
	});

	it("tests if drop with After placement does not occur when not preventing move-over for it", () => {
		cy.get("ui5-table")
			.then(table => {
				table.get(0).addEventListener("move-over", (e: Event) => {
					const evt = e as CustomEvent; // needed to satisfy TS
					if (evt.detail.destination.placement === MovePlacement.After) {
						return;
					}
					e.preventDefault();
				});
				table.get(0).addEventListener("move-over", cy.stub().as("moveOver"));
				table.get(0).addEventListener("move", cy.stub().as("move"));
			});

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.Before);

		cy.get("@move")
			.should("have.callCount", 1);

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.On);

		cy.get("@move")
			.should("have.callCount", 2);

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.After, false);

		cy.get("@move")
			.should("have.callCount", 2);
	});

	it("tests if drop with On placement does occur (because Before/After still applies) when not preventing move-over for it", () => {
		cy.get("ui5-table")
			.then(table => {
				table.get(0).addEventListener("move-over", (e: Event) => {
					const evt = e as CustomEvent; // needed to satisfy TS
					if (evt.detail.destination.placement === MovePlacement.On) {
						return;
					}
					e.preventDefault();
				});
				table.get(0).addEventListener("move-over", cy.stub().as("moveOver"));
				table.get(0).addEventListener("move", cy.stub().as("move"));
			});

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.Before);

		cy.get("@move")
			.should("have.callCount", 1);

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.On, true, true);

		cy.get("@move")
			.should("have.callCount", 2);

		dragTo({
			source: "ui5-table-row[row-key='0']",
			destination: "ui5-table-row[row-key='5']",
		}, MovePlacement.After);

		cy.get("@move")
			.should("have.callCount", 3);
	});
});
