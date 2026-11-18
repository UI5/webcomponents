import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableHierarchy from "../../src/TableHierarchy.js";
import TableRowActionNavigation from "../../src/TableRowActionNavigation.js";
import Text from "../../src/Text.js";

describe("Table - Group Rows", () => {
	function mountHierarchyGroups() {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHierarchy id="hierarchy" slot="features"></TableHierarchy>
				<TableSelectionMulti id="selection" slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px">Name</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Role</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1" rowKey="department" hierarchyState="Expanded">Department</TableGroupRow>
				<TableGroupRow id="group2" rowKey="team" hierarchyLevel={2} hierarchyState="Collapsed"><span id="groupText">Team</span></TableGroupRow>
				<TableRow id="row1" rowKey="employee" hierarchyLevel={2}>
					<TableCell><Text>Alice</Text></TableCell>
					<TableCell><Text>Developer</Text></TableCell>
				</TableRow>
				<TableGroupRow id="group3">Static group</TableGroupRow>
			</Table>
		);
		cy.get("#hierarchy").then($hierarchy => {
			$hierarchy[0].addEventListener("toggle", cy.stub().as("toggle"));
		});
	}

	function groupButton(id: string) {
		return cy.get(`#${id}`).shadow().find("#hierarchy-toggle [ui5-button]");
	}

	it("should indent and toggle hierarchy groups without selecting them", () => {
		mountHierarchyGroups();
		cy.get("#group1").should("have.attr", "aria-level", "1").and("have.attr", "aria-expanded", "true");
		cy.get("#group2").should("have.attr", "aria-level", "2").and("have.attr", "aria-expanded", "false");
		cy.get("#groupText").should("be.visible").then($groupText => {
			const start = $groupText[0].getBoundingClientRect().left;
			cy.get("#row1").find("[ui5-text]").first().should($leafText => {
				expect($leafText[0].getBoundingClientRect().left).to.be.closeTo(start, 1);
			});
		});
		groupButton("group1").then($button => {
			const start = $button[0].getBoundingClientRect().left;
			groupButton("group2").should($nestedButton => {
				expect($nestedButton[0].getBoundingClientRect().left - start).to.be.closeTo(16, 1);
			});
		});
		groupButton("group2").should("have.prop", "tooltip", "Expand Node").realClick();
		cy.get("@toggle").should("have.been.calledOnce").its("firstCall.args.0.detail").then(detail => {
			expect(detail.row.rowKey).to.equal("team");
			expect(detail.expanded).to.equal(true);
		});
		cy.get("#group2").should("have.attr", "aria-expanded", "true").and("not.have.attr", "aria-selected");
		groupButton("group2").should("have.prop", "tooltip", "Collapse Node").realClick();
		cy.get("#group2").should("have.attr", "aria-expanded", "false");
		cy.get("@toggle").should("have.been.calledTwice");
		cy.get("#selection").should("not.have.attr", "selected");
		cy.get("[ui5-table-header-row]").shadow().find("#selection-component").realClick();
		cy.get("#selection").should("have.prop", "selected", "employee");
		cy.get("#group1").should("not.have.attr", "aria-selected");
		cy.get("#group2").should("not.have.attr", "aria-selected");
	});

	it("should reach group toggles with F2 and support row and button keyboard toggling", () => {
		mountHierarchyGroups();
		cy.get<TableGroupRow>("#group2").then($row => $row[0].focus());
		cy.get("#group2").should("be.focused");
		cy.realPress("+");
		cy.get("#group2").should("have.attr", "aria-expanded", "true");
		cy.realPress("-");
		cy.get("#group2").should("have.attr", "aria-expanded", "false");
		cy.realPress("F2");
		groupButton("group2").should("be.focused");
		cy.realPress("Enter");
		cy.get("#group2").should("have.attr", "aria-expanded", "true");
		cy.realPress("Space");
		cy.get("#group2").should("have.attr", "aria-expanded", "false");
		cy.realPress("F2");
		cy.get("#group2").should("be.focused");
		cy.get("@toggle").should("have.callCount", 4);
	});

	it("should keep group expansion unchanged when the toggle is canceled", () => {
		mountHierarchyGroups();
		cy.get("#hierarchy").then($hierarchy => {
			$hierarchy[0].addEventListener("toggle", event => event.preventDefault());
		});
		groupButton("group2").realClick();
		cy.get("@toggle").should("have.been.calledOnce");
		cy.get("#group2").should("have.attr", "aria-expanded", "false").and("have.prop", "hierarchyState", "Collapsed");
	});

	it("should hide group toggles without reserving space and reset them when hierarchy is removed", () => {
		mountHierarchyGroups();
		cy.get("#groupText").then($text => {
			const visibleStart = $text[0].getBoundingClientRect().left;
			groupButton("group2").then($button => {
				const buttonWidth = $button[0].getBoundingClientRect().width;
				cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", true);
				cy.get("#group2").shadow().find("#hierarchy-toggle").should("have.css", "width", "0px");
				cy.get("#groupText").should($hiddenText => {
					expect($hiddenText[0].getBoundingClientRect().left).to.be.closeTo(visibleStart - buttonWidth, 1);
				});
				groupButton("group2").should("have.prop", "disabled", true).and("not.be.visible");
			});
		});
		cy.get("#row1").click("left");
		cy.realPress("ArrowUp");
		cy.realPress("+");
		cy.get("#group2").should("have.attr", "aria-expanded", "false");
		cy.get("@toggle").should("not.have.been.called");
		cy.get("#hierarchy").invoke("prop", "hideExpandCollapseIcons", false);
		groupButton("group2").should("be.visible").realClick();
		cy.get("#group2").should("have.attr", "aria-expanded", "true");
		cy.get("#hierarchy").invoke("remove");
		cy.get("#group2").should("not.have.attr", "aria-expanded");
		cy.get("#group2").should("not.have.attr", "aria-level");
		groupButton("group2").should("not.exist");
	});

	it("should not render a toggle for a leaf group and should react to hierarchy state changes", () => {
		mountHierarchyGroups();
		groupButton("group3").should("not.exist");
		cy.get("#group3").should("not.have.attr", "aria-expanded");
		cy.get("#group3").invoke("prop", "hierarchyState", "Collapsed");
		groupButton("group3").should("have.prop", "tooltip", "Expand Node");
		cy.get("#group3").invoke("prop", "hierarchyState", "Leaf");
		groupButton("group3").should("not.exist");
		cy.get("#group3").should("not.have.attr", "aria-expanded");
	});

	it("should preserve the spanning group toggle when columns pop in", () => {
		mountHierarchyGroups();
		cy.get("#table").invoke("css", "width", "350px");
		cy.get("#row1").children("[ui5-table-cell]").eq(1).should("have.attr", "_popin");
		cy.get("#group2").shadow().find("#group-cell").should("have.attr", "aria-colindex", "2").and("have.attr", "aria-colspan", "1");
		groupButton("group2").realClick();
		cy.get("#group2").should("have.attr", "aria-expanded", "true");
	});

	it("should align dynamically appended leaf rows with groups at the same level", () => {
		mountHierarchyGroups();
		cy.get<Table>("#table").then($table => {
			const group = new TableGroupRow();
			group.id = "dynamicGroup";
			group.hierarchyLevel = 3;
			group.hierarchyState = "Expanded";
			const groupText = document.createElement("span");
			groupText.id = "dynamicGroupText";
			groupText.textContent = "Team";
			group.append(groupText);
			const leaf = new TableRow();
			leaf.id = "dynamicLeaf";
			leaf.hierarchyLevel = 3;
			leaf.rowKey = "dynamic-leaf";
			const cell = new TableCell();
			const text = document.createElement("span");
			text.id = "dynamicLeafText";
			text.textContent = "Employee";
			cell.append(text);
			leaf.append(cell, new TableCell());
			$table[0].append(group, leaf);
		});
		cy.get("#dynamicGroupText").should("be.visible").then($text => {
			const start = $text[0].getBoundingClientRect().left;
			cy.get("#dynamicLeafText").should($leafText => {
				expect($leafText[0].getBoundingClientRect().left).to.be.closeTo(start, 1);
			});
			cy.get("#dynamicLeaf").invoke("prop", "hierarchyLevel", 4);
			cy.get("#dynamicLeafText").should($leafText => {
				expect($leafText[0].getBoundingClientRect().left - start).to.be.closeTo(16, 1);
			});
		});
	});

	function mountGroupedTable() {
		cy.mount(
			<Table id="table" accessible-name="Grouped Table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" width="200px">City</TableHeaderCell>
					<TableHeaderCell id="colB" width="200px">Country</TableHeaderCell>
					<TableHeaderCell id="colC" width="150px">Population</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Country: Germany</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>3,748,148</Text></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="row-2">
					<TableCell><Text>Munich</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>1,471,508</Text></TableCell>
				</TableRow>
				<TableGroupRow id="group2">
					<Text>Country: France</Text>
				</TableGroupRow>
				<TableRow id="row3" rowKey="row-3">
					<TableCell><Text>Paris</Text></TableCell>
					<TableCell><Text>France</Text></TableCell>
					<TableCell><Text>2,161,000</Text></TableCell>
				</TableRow>
			</Table>
		);
	}

	it("should render group rows and data rows", () => {
		mountGroupedTable();

		cy.get("[ui5-table-group-row]").should("have.length", 2);
		cy.get("[ui5-table-row]:not([ui5-table-group-row])").should("have.length", 3);
		cy.get("#group1").should("contain.text", "Country: Germany");
		cy.get("#group2").should("contain.text", "Country: France");
	});

	it("should have aria-roledescription on group rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "aria-roledescription");
		cy.get("#group2").should("have.attr", "aria-roledescription");
	});

	it("should use role=row on group rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "role", "row");
		cy.get("#table")
			.shadow()
			.find("#table")
			.should("have.attr", "role", "grid");
	});

	it("should have group cell spanning all columns", () => {
		mountGroupedTable();

		cy.get("#group1")
			.shadow()
			.find("#group-cell")
			.should("have.attr", "role", "gridcell")
			.and("have.attr", "aria-colindex", "1")
			.and("have.attr", "aria-colspan", "2");
	});

	it("should set aria-rowindex sequentially on all rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "aria-rowindex", "2");
		cy.get("#row1").should("have.attr", "aria-rowindex", "3");
		cy.get("#row2").should("have.attr", "aria-rowindex", "4");
		cy.get("#group2").should("have.attr", "aria-rowindex", "5");
		cy.get("#row3").should("have.attr", "aria-rowindex", "6");
	});

	it("should not be selectable", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionMulti slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#group1").should("not.have.attr", "aria-selected");
	});

	it("should not affect Select All behavior", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionMulti slot="features" id="selection"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="row-2">
					<TableCell><Text>Munich</Text></TableCell>
				</TableRow>
			</Table>
		);

		// Select all via header checkbox
		cy.get("[ui5-table-header-row]")
			.shadow()
			.find("#selection-component")
			.realClick();

		// Both data rows should be selected
		cy.get("#row1").should("have.attr", "aria-selected", "true");
		cy.get("#row2").should("have.attr", "aria-selected", "true");
		// Group row should NOT be selected
		cy.get("#group1").should("not.have.attr", "aria-selected");
	});

	it("should reset row alternation after each group header row", () => {
		cy.mount(
			<Table id="table" alternateRowColors>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group 1</Text>
				</TableGroupRow>
				<TableRow id="rowA" rowKey="a">
					<TableCell><Text>A</Text></TableCell>
				</TableRow>
				<TableRow id="rowB" rowKey="b">
					<TableCell><Text>B</Text></TableCell>
				</TableRow>
				<TableRow id="rowC" rowKey="c">
					<TableCell><Text>C</Text></TableCell>
				</TableRow>
				<TableGroupRow id="group2">
					<Text>Group 2</Text>
				</TableGroupRow>
				<TableRow id="rowD" rowKey="d">
					<TableCell><Text>D</Text></TableCell>
				</TableRow>
				<TableRow id="rowE" rowKey="e">
					<TableCell><Text>E</Text></TableCell>
				</TableRow>
			</Table>
		);

		// After group1: rowA(1)=not, rowB(2)=alternate, rowC(3)=not
		cy.get("#rowA").should("not.have.attr", "_alternate");
		cy.get("#rowB").should("have.attr", "_alternate");
		cy.get("#rowC").should("not.have.attr", "_alternate");

		// After group2: reset → rowD(1)=not, rowE(2)=alternate
		cy.get("#rowD").should("not.have.attr", "_alternate");
		cy.get("#rowE").should("have.attr", "_alternate");

		// Group rows never get _alternate
		cy.get("#group1").should("not.have.attr", "_alternate");
		cy.get("#group2").should("not.have.attr", "_alternate");
	});

	it("should not throw with popin mode and group rows", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px">City</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Country</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Population</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>3,748,148</Text></TableCell>
				</TableRow>
			</Table>
		);

		// Shrink to trigger popin
		cy.get("#table").invoke("css", "width", "300px");

		// Should not throw — table and rows intact
		cy.get("#table").should("exist");
		cy.get("#group1").should("exist");
		cy.get("#row1").should("exist");

		// Expand again
		cy.get("#table").invoke("css", "width", "800px");
		cy.get("#group1").should("contain.text", "Group");
	});

	it("should be keyboard navigable as a single-cell row", () => {
		mountGroupedTable();

		// Click on left edge to focus the row itself (not a cell inside)
		cy.get("#row1").click("left");
		cy.get("#row1").should("be.focused");

		// Arrow up should land on the group row
		cy.get("#row1").type("{uparrow}");
		cy.get("#group1").should("be.focused");
	});

	it("should not move focus on left/right arrow keys", () => {
		mountGroupedTable();

		cy.get("#row1").click("left");
		cy.get("#row1").type("{uparrow}");
		cy.get("#group1").should("be.focused");

		// Left/right should not move focus away from the group row
		cy.get("#group1").type("{leftarrow}");
		cy.get("#group1").should("be.focused");

		cy.get("#group1").type("{rightarrow}");
		cy.get("#group1").should("be.focused");
	});

	it("should preserve column position when navigating through a group row", () => {
		mountGroupedTable();

		// Focus the second cell of row1
		cy.get("#row1").click("left");
		cy.get("#row1").type("{rightarrow}{rightarrow}");
		cy.get("#row1").children("[ui5-table-cell]").eq(1).should("be.focused");

		// Navigate up to the group row
		cy.realPress("ArrowUp");
		cy.get("#group1").should("be.focused");

		// Navigate back down — should return to the same column (2nd cell)
		cy.realPress("ArrowDown");
		cy.get("#row1").children("[ui5-table-cell]").eq(1).should("be.focused");
	});

	it("should expose empty cells array even when children are slotted", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">Col</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group with content</Text>
				</TableGroupRow>
			</Table>
		);

		cy.get("#group1").then(($el) => {
			const groupRow = $el[0] as unknown as TableGroupRow;
			expect(groupRow.cells).to.have.length(0);
		});
	});

	it("should not render actions cell when table has rowActionCount", () => {
		cy.mount(
			<Table id="table" rowActionCount={1}>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableRowActionNavigation slot="actions" interactive></TableRowActionNavigation>
				</TableRow>
			</Table>
		);

		// Data row should have actions cell
		cy.get("#row1")
			.shadow()
			.find("#actions-cell")
			.should("exist");

		// Group row should NOT have actions cell
		cy.get("#group1")
			.shadow()
			.find("#actions-cell")
			.should("not.exist");
	});
});
