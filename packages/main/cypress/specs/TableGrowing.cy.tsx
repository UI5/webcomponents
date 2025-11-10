import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGrowing from "../../src/TableGrowing.js";
import Label from "../../src/Label.js";

function TableSample() {
	return <Table id="table">
		<TableGrowing slot="features"></TableGrowing>
		<TableHeaderRow slot="headerRow">
			<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
		</TableHeaderRow>
		<TableRow>
			<TableCell><Label>Cell A</Label></TableCell>
		</TableRow>
	</Table>;
}

function TableGrowingSample(props: { rowCount: number, overflow: boolean }) {
	return (
		<div id="wrapper" style={{ height: "200px", overflow: props.overflow ? "auto" : "" }}>
			<Table id="table">
				<TableGrowing slot="features" mode="Scroll"></TableGrowing>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
				</TableHeaderRow>
				{Array.from({ length: props.rowCount }).map(() => (
					<TableRow>
						<TableCell><Label>Cell A</Label></TableCell>
					</TableRow>
				))}
			</Table>
		</div>
	);
}

describe("TableGrowing - Button", () => {
	describe("Rendering", () => {
		it("tests button is rendered", () => {
			cy.mount(<TableSample></TableSample>);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("exist")
				.should("have.attr", "role", "button")
				.should("have.attr", "aria-labelledby", "text subtext");

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#text")
				.should("have.text", "More");
		});

		it("tests correct custom texts are rendered", () => {
			const text = "My Custom Growing Text",
				subtext = "My Custom Growing Subtext";

			cy.mount(
				<Table>
					<TableGrowing slot="features" text={text} subtext={subtext} />
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					</TableHeaderRow>
					<TableRow>
						<TableCell><Label>Cell A</Label></TableCell>
					</TableRow>
				</Table>
			);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("exist")
				.should("have.attr", "role", "button")
				.should("have.attr", "aria-labelledby", "text subtext");

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#text")
				.should("have.text", text);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#subtext")
				.should("have.text", subtext);
		});

		it("tests growing button not shown when no data", () => {
			cy.mount(
				<Table>
					<TableGrowing slot="features"></TableGrowing>
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					</TableHeaderRow>
				</Table>
			);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("not.be.visible");
		});
	});

	describe("Event & Focus", () => {
		it("tests loadMore event fired upon pressing button", () => {
			cy.mount(<TableSample></TableSample>);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore")))
				.realClick();

			cy.get("@loadMore")
				.should("have.been.calledOnce");
		});

		it("test loadMore event fired upon pressing Enter", () => {
			cy.mount(<TableSample></TableSample>);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore")));

			cy.get<TableGrowing>("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("be.visible")
				.focus();

			cy.realPress("Enter");

			cy.get("@loadMore")
				.should("have.been.calledOnce");

			cy.get<TableGrowing>("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("be.visible")
				.focus();

			cy.realPress("Space");

			cy.get("@loadMore")
				.should("have.been.calledTwice");
		});

		it("tests focus is set to first newly added row - click", () => {
			cy.mount(<TableSample></TableSample>);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).addEventListener("load-more", () => {
						const table = document.getElementById("table");
						const row = document.createElement("ui5-table-row");
						row.id = "new-row";
						row.innerHTML = "<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>";
						table!.appendChild(row);
					});
				})
				.realClick();

			cy.get("[ui5-table]")
				.children("ui5-table-row")
				.should("have.length", 2);

			cy.get("#new-row")
				.should("exist")
				.should("have.focus");
		});

		it("tests focus is set to first newly added row - ENTER", () => {
			cy.mount(<TableSample></TableSample>);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).addEventListener("load-more", () => {
						const table = document.getElementById("table");
						const row = document.createElement("ui5-table-row");
						row.id = "new-row";
						row.innerHTML = "<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>";
						table!.appendChild(row);
					});
				})
				.trigger("keydown", { key: "Enter", code: "Enter", which: 13 });

			cy.get("[ui5-table]")
				.children("ui5-table-row")
				.should("have.length", 2);

			cy.get("#new-row")
				.should("exist")
				.should("have.focus");
		});

		it("tests focus is set to growing button when no new rows are added", () => {
			cy.mount(<TableSample></TableSample>);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.realClick();

			cy.get("[ui5-table-growing]")
				.should("have.focus");
		});
	});
});

describe("TableGrowing - Scroll", () => {
	describe("Rendering", () => {
		it("tests no button shown, when scrollable", () => {
			cy.mount(<TableGrowingSample rowCount={10} overflow={true}></TableGrowingSample>);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("not.be.visible");
		});

		it("tests button shown when not scrollable", () => {
			cy.mount(<TableGrowingSample rowCount={1} overflow={false}></TableGrowingSample>);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("be.visible");
		});
	});

	describe("Event", () => {
		it("tests loadMore event fire upon scrolling to table end", () => {
			cy.mount(<TableGrowingSample rowCount={10} overflow={true}></TableGrowingSample>);

			cy.get("[ui5-table]")
				.should("be.visible");

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore"));
					tableGrowing.get(0).addEventListener("load-more", () => {
						const table = document.getElementById("table");
						Array.from({ length: 10 }).forEach(() => {
							const row = document.createElement("ui5-table-row");
							row.innerHTML = "<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>";
							table!.appendChild(row);
						});
					});
				});

			for (let i = 0; i <= 5; i++) {
				cy.get("[ui5-table-row]:last-child")
				.scrollIntoView();

				cy.get("[ui5-table-row]:last-child")
					.should("be.visible");

				cy.get("@loadMore")
					.should("have.been.calledOnce");

				cy.get("#wrapper")
					.then($wrapper => {
						const wrapper = $wrapper.get(0);
						expect(wrapper.scrollTop).to.be.greaterThan(0);
					});
			}
		});

		it("tests button fires load-more, button vanishes, scroll to end fires load-more", () => {
			cy.mount(<TableGrowingSample rowCount={1} overflow={true}></TableGrowingSample>);

			cy.get<TableGrowing>("[ui5-table-growing]")
				.then(tableGrowing => {
					tableGrowing.get(0).addEventListener("load-more", () => {
						const table = document.getElementById("table");
						Array.from({ length: 10 }).forEach(() => {
							const row = document.createElement("ui5-table-row");
							row.innerHTML = "<ui5-table-cell><ui5-label>Cell B</ui5-label></ui5-table-cell>";
							table!.appendChild(row);
						});
					});
					tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore"));
				})
				.realClick();

			cy.get("@loadMore")
				.should("have.been.calledOnce");

			cy.get("[ui5-table]")
				.children("ui5-table-row")
				.should("have.length", 11);

			cy.get("[ui5-table-growing]")
				.shadow()
				.find("#button")
				.should("not.be.visible");

			for (let i = 2; i <= 6; i++) {
				cy.get("#wrapper")
					.scrollTo("bottom", { duration: 300 });

				cy.get("@loadMore")
					.should("have.callCount", i);

				cy.get("[ui5-table]")
					.children("ui5-table-row")
					.should("have.length", 1 + 10 * i);

				cy.get("#wrapper")
					.then($wrapper => {
						const wrapper = $wrapper.get(0);
						expect(wrapper.scrollTop).to.be.greaterThan(0);
					});
			}
		});
	});
});
