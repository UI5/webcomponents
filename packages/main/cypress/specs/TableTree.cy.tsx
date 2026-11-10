import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableHierarchy from "../../src/TableHierarchy.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import Label from "../../src/Label.js";

function mountHierarchyTable(withFeature = true) {
	cy.mount(
		<Table id="table" overflowMode="Popin">
			{ withFeature && <TableHierarchy id="hierarchy" slot="features"></TableHierarchy> }
			<TableHeaderRow slot="headerRow">
				<TableHeaderCell id="colA" minWidth="300px">Name</TableHeaderCell>
				<TableHeaderCell id="colB" minWidth="200px">Role</TableHeaderCell>
			</TableHeaderRow>
			<TableRow id="row1" rowKey="row1" hierarchyLevel={1} hierarchyState="Expanded">
				<TableCell><Label>Board</Label></TableCell>
				<TableCell><Label>Unit</Label></TableCell>
			</TableRow>
			<TableRow id="row2" rowKey="row2" hierarchyLevel={2} hierarchyState="Collapsed">
				<TableCell><Label>Development</Label></TableCell>
				<TableCell><Label>Unit</Label></TableCell>
			</TableRow>
			<TableRow id="row3" rowKey="row3" hierarchyLevel={2}>
				<TableCell><Label>Alice</Label></TableCell>
				<TableCell><Label>Developer</Label></TableCell>
			</TableRow>
			<TableRow id="row4" rowKey="row4">
				<TableCell><Label>Bob</Label></TableCell>
				<TableCell><Label>Assistant</Label></TableCell>
			</TableRow>
		</Table>
	);
}

function firstCell(rowId: string) {
	return cy.get(`#${rowId}`).find("[ui5-table-cell]").first();
}

function toggleOf(rowId: string) {
	return firstCell(rowId).shadow().find("#hierarchy-toggle");
}

function buttonOf(rowId: string) {
	return toggleOf(rowId).find("[ui5-button]");
}

describe("Table - Hierarchy", () => {
	describe("ARIA", () => {
		it("uses the treegrid role only when the hierarchy feature is applied", () => {
			mountHierarchyTable();
			cy.get("#table").shadow().find("#table").should("have.attr", "role", "treegrid");

			cy.get("#hierarchy").invoke("remove");
			cy.get("#table").shadow().find("#table").should("have.attr", "role", "grid");
			cy.get("#row1").should("not.have.attr", "aria-level");
			cy.get("#row1").should("not.have.attr", "aria-expanded");
			toggleOf("row1").should("not.exist");
		});

		it("does not change the table without the hierarchy feature", () => {
			mountHierarchyTable(false);
			cy.get("#table").shadow().find("#table").should("have.attr", "role", "grid");
			cy.get("#row1").should("not.have.attr", "aria-level");
			cy.get("#row1").should("not.have.attr", "aria-expanded");
			toggleOf("row1").should("not.exist");
		});

		it("sets aria-level and aria-expanded on the rows", () => {
			mountHierarchyTable();
			cy.get("#row1").should("have.attr", "aria-level", "1").and("have.attr", "aria-expanded", "true");
			cy.get("#row2").should("have.attr", "aria-level", "2").and("have.attr", "aria-expanded", "false");
			cy.get("#row3").should("have.attr", "aria-level", "2").and("not.have.attr", "aria-expanded");
			cy.get("#row4").should("have.attr", "aria-level", "1").and("not.have.attr", "aria-expanded");
		});

		it("updates the ARIA attributes and the indicator when the hierarchy properties change", () => {
			mountHierarchyTable();
			cy.get("#hierarchy").then($hierarchy => {
				$hierarchy[0].addEventListener("toggle", cy.stub().as("toggle"));
			});
			cy.get("#row3").invoke("prop", "hierarchyState", "Expanded");
			cy.get("#row3").should("have.attr", "aria-expanded", "true");
			buttonOf("row3").shadow().find("[ui5-icon]").should("have.prop", "name", "navigation-down-arrow");

			cy.get("#row3").invoke("prop", "hierarchyLevel", 3);
			cy.get("#row3").should("have.attr", "aria-level", "3");
			cy.get("#row3").invoke("prop", "hierarchyState", "Leaf");
			cy.get("#row3").should("not.have.attr", "aria-expanded");
			toggleOf("row3").should("have.attr", "data-leaf");
			cy.get("@toggle").should("not.have.been.called");
		});

		it("uses level 1 for invalid hierarchy levels without changing the property", () => {
			mountHierarchyTable();
			for (const level of [0, -1, 1.5, NaN, Infinity]) {
				cy.get("#row3").invoke("prop", "hierarchyLevel", level);
				cy.get<TableRow>("#row3").should("have.attr", "aria-level", "1").and($row => {
					expect(Object.is($row[0].hierarchyLevel, level)).to.equal(true);
				});
			}
		});

		it("applies hierarchy properties to appended and reused rows", () => {
			mountHierarchyTable();
			cy.get<Table>("#table").then($table => {
				const row = document.createElement("ui5-table-row") as TableRow;
				row.id = "addedRow";
				row.hierarchyLevel = 3;
				row.hierarchyState = "Collapsed";
				row.appendChild(document.createElement("ui5-table-cell"));
				$table[0].appendChild(row);
			});
			cy.get("#addedRow").should("have.attr", "aria-level", "3").and("have.attr", "aria-expanded", "false");
			buttonOf("addedRow").shadow().find("[ui5-icon]").should("have.prop", "name", "navigation-right-arrow");

			cy.get("#addedRow").invoke("prop", "hierarchyLevel", 1);
			cy.get("#addedRow").invoke("prop", "hierarchyState", "Leaf");
			cy.get("#addedRow").should("have.attr", "aria-level", "1").and("not.have.attr", "aria-expanded");
			toggleOf("addedRow").should("have.attr", "data-leaf");
		});

		it("updates the ARIA attributes and the indicator when the hierarchy attributes change", () => {
			mountHierarchyTable();
			cy.get("#row3").invoke("attr", "hierarchy-state", "Collapsed");
			cy.get("#row3").should("have.attr", "aria-expanded", "false");
			buttonOf("row3").shadow().find("[ui5-icon]").should("have.prop", "name", "navigation-right-arrow");

			cy.get("#row3").invoke("attr", "hierarchy-level", "3");
			cy.get("#row3").should("have.attr", "aria-level", "3");

			cy.get("#row1").invoke("removeAttr", "hierarchy-state");
			cy.get("#row1").should("not.have.attr", "aria-expanded");
			toggleOf("row1").should("have.attr", "data-leaf");
		});
	});

	describe("Rendering", () => {
		it("renders the indicator only in the first cell of each row", () => {
			mountHierarchyTable();
			cy.get("#table").find("[ui5-table-row]").each($row => {
				cy.wrap($row).find("[ui5-table-cell]").eq(0).shadow().find("#hierarchy-toggle").should("exist");
				cy.wrap($row).find("[ui5-table-cell]").eq(1).shadow().find("#hierarchy-toggle").should("not.exist");
			});
			cy.get("#table").find("[ui5-table-header-cell]").first().shadow().find("#hierarchy-toggle").should("not.exist");
		});

		it("differentiates between expanded nodes, collapsed nodes and leaves", () => {
			mountHierarchyTable();
			buttonOf("row1").shadow().find("[ui5-icon]").should("have.prop", "name", "navigation-down-arrow");
			buttonOf("row1").should("have.prop", "tooltip", "Collapse Node");
			buttonOf("row2").shadow().find("[ui5-icon]").should("have.prop", "name", "navigation-right-arrow");
			buttonOf("row2").should("have.prop", "tooltip", "Expand Node");
			buttonOf("row1").shadow().find("button").should("have.attr", "aria-label", "Collapse Node").and("not.be.disabled");
			buttonOf("row2").shadow().find("button").should("have.attr", "aria-label", "Expand Node").and("not.be.disabled");
			toggleOf("row3").should("have.attr", "data-leaf");
			toggleOf("row3").should("not.have.attr", "title");
			buttonOf("row3").should("have.prop", "disabled", true).and("not.be.visible");
			buttonOf("row3").shadow().find("button").should("be.disabled");
		});

		it("indents the indicator depending on the level", () => {
			mountHierarchyTable();
			cy.get("#row3").invoke("attr", "hierarchy-level", "3");
			cy.get("#row3").should("have.attr", "aria-level", "3");

			const getInlineStart = (rowId: string) => toggleOf(rowId).then($toggle => $toggle[0].getBoundingClientRect().left);
			getInlineStart("row1").then(level1 => {
				getInlineStart("row4").should("equal", level1);
				getInlineStart("row2").then(level2 => {
					expect(level2).to.be.greaterThan(level1);
					getInlineStart("row3").then(level3 => {
						expect(level3 - level2).to.be.closeTo(level2 - level1, 1);
					});
				});
			});
		});

		it("aligns leaves with the nodes of the same level", () => {
			mountHierarchyTable();
			firstCell("row2").find("[ui5-label]").then($nodeLabel => {
				firstCell("row3").find("[ui5-label]").then($leafLabel => {
					expect($leafLabel[0].getBoundingClientRect().left).to.be.closeTo($nodeLabel[0].getBoundingClientRect().left, 1);
				});
			});
		});

		it("preserves button spacing and vertical alignment with narrow and multiline content", () => {
			cy.mount(
				<Table style={{ width: "200px" }}>
					<TableHierarchy slot="features"></TableHierarchy>
					<TableHeaderRow slot="headerRow"><TableHeaderCell>Name</TableHeaderCell></TableHeaderRow>
					<TableRow id="row1" hierarchyState="Collapsed">
						<TableCell><div style={{ width: "300px", flexShrink: 0 }}>Wide content</div></TableCell>
					</TableRow>
					<TableRow id="row2" hierarchyLevel={2} hierarchyState="Collapsed">
						<TableCell><div style={{ height: "80px" }}>Multiline<br />content</div></TableCell>
					</TableRow>
					<TableRow id="row3" hierarchyLevel={2}>
						<TableCell><div style={{ height: "80px" }}>Multiline<br />leaf</div></TableCell>
					</TableRow>
				</Table>
			);

			firstCell("row1").should($cell => {
				const cell = $cell[0];
				const toggle = cell.shadowRoot!.querySelector("#hierarchy-toggle")!.getBoundingClientRect();
				const button = cell.shadowRoot!.querySelector("[ui5-button]")!.getBoundingClientRect();
				const content = cell.querySelector("div")!.getBoundingClientRect();
				expect(toggle.width).to.be.closeTo(button.width, 1);
				expect(content.left).to.be.closeTo(button.right, 1);
			});
			for (const rowId of ["row2", "row3"]) {
				firstCell(rowId).should($cell => {
					const cell = $cell[0];
					const toggle = cell.shadowRoot!.querySelector("#hierarchy-toggle")!.getBoundingClientRect();
					const button = cell.shadowRoot!.querySelector("[ui5-button]")!.getBoundingClientRect();
					const content = cell.querySelector("div")!.getBoundingClientRect();
					expect(toggle.height).to.be.closeTo(button.height, 1);
					expect(button.top + button.height / 2).to.be.closeTo(content.top + content.height / 2, 1);
					expect(content.left).to.be.closeTo(button.right, 1);
				});
			}
		});

		it("hides icons without reserving space and preserves hierarchy semantics and indentation", () => {
			mountHierarchyTable();
			firstCell("row1").find("[ui5-label]").then($label => {
				const visibleStart = $label[0].getBoundingClientRect().left;
				toggleOf("row1").then($toggle => {
					const toggleWidth = $toggle[0].getBoundingClientRect().width;
					cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", true);
					firstCell("row1").find("[ui5-label]").should($hiddenLabel => {
						expect($hiddenLabel[0].getBoundingClientRect().left).to.be.closeTo(visibleStart - toggleWidth, 1);
					});
				});
			});

			for (const rowId of ["row1", "row2", "row3", "row4"]) {
				toggleOf(rowId).should("have.attr", "data-hidden", "")
					.and("have.css", "visibility", "hidden")
					.and("have.css", "width", "0px");
			}
			buttonOf("row1").should("have.prop", "disabled", true).and("not.be.visible");
			buttonOf("row2").should("have.prop", "disabled", true).and("not.be.visible");
			buttonOf("row1").shadow().find("button").should("be.disabled");
			buttonOf("row2").shadow().find("button").should("be.disabled");
			buttonOf("row1").shadow().find("[ui5-icon]").should("exist").and("not.be.visible");
			buttonOf("row2").shadow().find("[ui5-icon]").should("exist").and("not.be.visible");
			cy.get("#table").shadow().find("#table").should("have.attr", "role", "treegrid");
			cy.get("#row1").should("have.attr", "aria-level", "1").and("have.attr", "aria-expanded", "true");
			cy.get("#row2").should("have.attr", "aria-level", "2").and("have.attr", "aria-expanded", "false");
			cy.get("#row3").should("not.have.attr", "aria-expanded");

			firstCell("row1").should($cell => {
				const cell = $cell[0];
				const contentStart = cell.getBoundingClientRect().left + parseFloat(getComputedStyle(cell).paddingLeft);
				expect(cell.querySelector("[ui5-label]")!.getBoundingClientRect().left).to.be.closeTo(contentStart, 1);
			});
			firstCell("row2").find("[ui5-label]").then($nodeLabel => {
				const nodeStart = $nodeLabel[0].getBoundingClientRect().left;
				firstCell("row3").find("[ui5-label]").should($leafLabel => {
					expect($leafLabel[0].getBoundingClientRect().left).to.be.closeTo(nodeStart, 1);
				});
				firstCell("row1").find("[ui5-label]").then($rootLabel => {
					expect(nodeStart).to.be.greaterThan($rootLabel[0].getBoundingClientRect().left);
				});
			});

			cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", false);
			toggleOf("row1").should("not.have.attr", "data-hidden");
			buttonOf("row1").shadow().find("[ui5-icon]").should("be.visible");
		});

		it("keeps the indicator in the first cell when other columns pop in", () => {
			mountHierarchyTable();
			cy.get("#table").invoke("css", "width", "350px");
			cy.get("#row1").find("[ui5-table-cell]").eq(1).should("have.attr", "_popin");
			firstCell("row1").should("not.have.attr", "_popin");
			toggleOf("row1").should("exist");
			cy.get("#row1").find("[ui5-table-cell]").eq(1).shadow().find("#hierarchy-toggle").should("not.exist");
		});
	});

	describe("Interaction", () => {
		beforeEach(() => {
			mountHierarchyTable();
			cy.get("#hierarchy").then($hierarchy => {
				$hierarchy[0].addEventListener("toggle", cy.stub().as("toggle"));
			});
			cy.get("#table").then($table => {
				$table[0].addEventListener("row-click", cy.stub().as("rowClick"));
			});
		});

		it("toggles a node by clicking the indicator", () => {
			buttonOf("row2").realClick();
			cy.get("@toggle").should("have.been.calledOnce");
			cy.get("@toggle").its("firstCall.args.0.detail").then(detail => {
				expect(detail.row.id).to.equal("row2");
				expect(detail.expanded).to.equal(true);
			});
			cy.get("#row2").should("have.attr", "hierarchy-state", "Expanded");
			cy.get("#row2").should("have.attr", "aria-expanded", "true");
			buttonOf("row2").shadow().find("[ui5-icon]").should("have.prop", "name", "navigation-down-arrow");

			buttonOf("row2").realClick();
			cy.get("@toggle").should("have.been.calledTwice");
			cy.get("@toggle").its("secondCall.args.0.detail.expanded").should("equal", false);
			cy.get("#row2").should("have.attr", "aria-expanded", "false");
			cy.get("@rowClick").should("not.have.been.called");
		});

		it("enters and leaves the expand button with F2 and restores it with F7", () => {
			cy.get("#row2").realClick();
			cy.realPress("ArrowRight");
			firstCell("row2").should("be.focused");
			cy.realPress("F2");
			buttonOf("row2").should("be.focused");
			cy.realPress("F7");
			cy.get("#row2").should("be.focused");
			cy.realPress("F7");
			buttonOf("row2").should("be.focused");
			cy.realPress("F2");
			firstCell("row2").should("be.focused");
			cy.realPress("Enter");
			buttonOf("row2").should("be.focused");
			cy.get("@toggle").should("not.have.been.called");
		});

		it("skips hidden expand buttons when entering cell content", () => {
			cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", true);
			buttonOf("row2").should("have.prop", "disabled", true);
			cy.get("#row2").realClick();
			cy.realPress("ArrowRight");
			firstCell("row2").should("be.focused");
			cy.realPress("F2");
			firstCell("row2").should("be.focused");
			cy.realPress("Enter");
			firstCell("row2").should("be.focused");
			cy.get("@toggle").should("not.have.been.called");
		});

		it("does not focus the placeholder button on a leaf", () => {
			cy.get("#row3").realClick();
			cy.realPress("ArrowRight");
			firstCell("row3").should("be.focused");
			cy.realPress("F2");
			firstCell("row3").should("be.focused");
			cy.get("@toggle").should("not.have.been.called");
		});

		it("toggles nodes with Enter and Space on the expand/collapse button", () => {
			buttonOf("row2").shadow().find("button").focus();
			buttonOf("row2").should("be.focused");
			cy.realPress("Enter");
			cy.get("#row2").should("have.attr", "aria-expanded", "true");
			cy.get("@toggle").should("have.been.calledOnce");
			cy.realPress("Space");
			cy.get("#row2").should("have.attr", "aria-expanded", "false");
			cy.get("@toggle").should("have.been.calledTwice");
			cy.get("@rowClick").should("not.have.been.called");
		});

		it("disables pointer and keyboard toggling when icons are hidden and restores interaction when shown", () => {
			cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", true);
			toggleOf("row2").should("have.attr", "data-hidden", "");
			buttonOf("row2").click({ force: true });
			cy.get("#row2").realClick().should("be.focused");
			cy.realPress("+");
			cy.get("#row2").should("have.attr", "hierarchy-state", "Collapsed");

			cy.get("#row1").realClick();
			cy.realPress("ArrowRight");
			firstCell("row1").should("be.focused");
			cy.realPress("-");
			cy.get("#row1").should("have.attr", "hierarchy-state", "Expanded");
			cy.get("@toggle").should("not.have.been.called");

			cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", false);
			toggleOf("row2").should("not.have.attr", "data-hidden");
			buttonOf("row2").realClick();
			cy.get("#row2").should("have.attr", "hierarchy-state", "Expanded");
			cy.get("#row2").realClick().should("be.focused");
			cy.realPress("-");
			cy.get("#row2").should("have.attr", "hierarchy-state", "Collapsed");
			cy.get("@toggle").should("have.been.calledTwice");
		});

		it("does not toggle a leaf", () => {
			toggleOf("row3").realClick();
			cy.get("@toggle").should("not.have.been.called");
			cy.get("#row3").should("have.prop", "hierarchyState", "Leaf");
		});

		it("keeps the expand state when the toggle event is prevented", () => {
			cy.get("#hierarchy").then($hierarchy => {
				$hierarchy[0].addEventListener("toggle", e => e.preventDefault());
			});
			buttonOf("row2").realClick();
			cy.get("@toggle").should("have.been.calledOnce");
			cy.get("#row2").should("have.attr", "hierarchy-state", "Collapsed");
			cy.get("#row2").should("have.attr", "aria-expanded", "false");
		});

		it("expands and collapses nodes with + and - on the row", () => {
			cy.get("#row2").realClick();
			cy.get("#row2").should("be.focused");

			cy.realPress("-");
			cy.get("@toggle").should("not.have.been.called");

			cy.realPress("+");
			cy.get("@toggle").should("have.been.calledOnce");
			cy.get("#row2").should("have.attr", "aria-expanded", "true");

			cy.realPress("+");
			cy.get("@toggle").should("have.been.calledOnce");

			cy.realPress("-");
			cy.get("@toggle").should("have.been.calledTwice");
			cy.get("#row2").should("have.attr", "aria-expanded", "false");
		});

		it("expands and collapses nodes with + and - on a cell", () => {
			cy.get("#row1").realClick();
			cy.realPress("ArrowRight");
			firstCell("row1").should("be.focused");

			cy.realPress("-");
			cy.get("@toggle").should("have.been.calledOnce");
			cy.get("#row1").should("have.attr", "aria-expanded", "false");

			cy.realPress("+");
			cy.get("@toggle").should("have.been.calledTwice");
			cy.get("#row1").should("have.attr", "aria-expanded", "true");
		});

		it("ignores + and - on leaves", () => {
			cy.get("#row3").realClick();
			cy.realPress("+");
			cy.realPress("-");
			cy.get("@toggle").should("not.have.been.called");
		});
	});

	it("works together with the selection feature", () => {
		cy.mount(
			<Table id="table">
				<TableHierarchy id="hierarchy" slot="features"></TableHierarchy>
				<TableSelectionMulti id="selection" slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell>Name</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="row1" hierarchyLevel={1} hierarchyState="Collapsed">
					<TableCell><Label>Board</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table").shadow().find("#table").should("have.attr", "role", "treegrid");
		cy.get("#row1").shadow().find("#selection-cell").should("exist");
		toggleOf("row1").realClick();
		cy.get("#row1").should("have.attr", "aria-expanded", "true");
		cy.get("#selection").should("not.have.attr", "selected");
	});
});
