import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import TableIBCS from "../../src/TableIBCS.js";
import type { TableIBCSRow, TableIBCSColumn } from "../../src/TableIBCS.js";
import Label from "../../src/Label.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

const rows: Record<string, TableIBCSRow> = {
	cash: { type: "Measure", parentKey: "assets" },
	restricted: { type: "OfWhich" },
	assets: { type: "Total" },
	ratio: { type: "PercentOf" },
	result: { type: "Result" },
	other: { type: "Remainder" },
	country: { type: "Structure" },
};
const columns: Record<string, TableIBCSColumn> = {
	label: { type: "RowHeader" },
	py: { type: "Scenario", scenario: "Previous" },
	pl: { type: "Scenario", scenario: "Plan" },
	fc: { type: "Scenario", scenario: "Forecast" },
	ac: { type: "Scenario", scenario: "Actual" },
	delta: { type: "Variance", groupStart: true },
};

function Fixture({ enabled = true, popin = false }: { enabled?: boolean, popin?: boolean }) {
	return (
		<>
			<span id="positive-color" style={{ color: "var(--sapPositiveTextColor)" }}>Positive</span>
			<span id="negative-color" style={{ color: "var(--sapNegativeTextColor)" }}>Negative</span>
			<Table id="table" overflowMode={popin ? "Popin" : "Scroll"} style={{ width: "100%" }}>
				<TableSelectionSingle id="selection" slot="features" behavior="RowOnly" />
				{enabled && <TableIBCS id="ibcs" slot="features" rows={rows} columns={columns}
					cellImpacts={{ cash: { delta: "Favorable" }, result: { delta: "Unfavorable" } }} />}
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="label" minWidth="12rem">Position</TableHeaderCell>
					<TableHeaderCell id="py" width="6rem">PY</TableHeaderCell>
					<TableHeaderCell id="pl" width="6rem">PL</TableHeaderCell>
					<TableHeaderCell id="fc" width="6rem">FC</TableHeaderCell>
					<TableHeaderCell id="ac" width="6rem">AC</TableHeaderCell>
					<TableHeaderCell id="delta" width="6rem">ΔPY</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow>Assets</TableGroupRow>
				{[
					["cash", "Cash", "100", "110", "115", "120", "+20"],
					["restricted", "of which restricted", "10", "10", "10", "10", "0"],
					["assets", "Assets", "200", "210", "215", "220", "+20"],
					["ratio", "Cash share", "50.0%", "52.4%", "53.5%", "54.5%", "+4.5pp"],
					["result", "Result", "100", "90", "90", "80", "−20"],
					["other", "Other assets", "20", "20", "20", "20", "0"],
					["country", "Germany", "30", "30", "30", "30", "0"],
				].map(([key, label, ...values]) => (
					<TableRow rowKey={key}>
						<TableCell><Label>{label}</Label></TableCell>
						{values.map(value => <TableCell><Label>{value}</Label></TableCell>)}
					</TableRow>
				))}
			</Table>
		</>
	);
}

const row = (key: string) => cy.get(`[ui5-table-row][row-key="${key}"]`);
const cell = (key: string, index: number) => row(key).children("[ui5-table-cell]").eq(index);

describe("TableIBCS", () => {
	afterEach(() => cy.then(() => setTheme("sap_horizon")));

	it("does not apply semantic styles without the feature", () => {
		cy.mount(<Fixture enabled={false} />);
		row("assets").should("not.have.attr", "data-ui5-ibcs-row-type");
		cell("assets", 1).should("not.have.attr", "data-ui5-ibcs-row-type");
		cy.get("#ac").should("not.have.attr", "data-ui5-ibcs-scenario");
	});

	it("applies all row types, hierarchy indentation and of-which alignment", () => {
		cy.mount(<Fixture />);
		Object.entries(rows).forEach(([key, definition]) => {
			row(key).should("have.attr", "data-ui5-ibcs-row-type", definition.type);
		});
		cell("assets", 1).should("have.css", "font-weight", "700");
		cell("ratio", 1).should("have.css", "font-style", "italic");
		cell("restricted", 0).should("have.css", "text-align", "end");
		cell("assets", 0).then($root => {
			const rootIndent = parseFloat(getComputedStyle($root[0]).paddingInlineStart);
			cell("cash", 0).should($child => {
				expect(parseFloat(getComputedStyle($child[0]).paddingInlineStart)).to.equal(rootIndent + 16);
			});
		});
		cy.get("[ui5-table-group-row]").should("not.have.attr", "data-ui5-ibcs-row-type");
	});

	it("renders scenario fills and keeps equal application-supplied widths", () => {
		cy.mount(<Fixture />);
		cy.get("#ac").should("have.attr", "data-ui5-ibcs-scenario", "Actual");
		cy.get("#py").should("have.attr", "data-ui5-ibcs-scenario", "Previous");
		cy.get("#pl").should($header => {
			expect(getComputedStyle($header[0], "::after").borderInlineStartWidth).to.equal("0px");
		});
		cy.get("#fc").should($header => {
			expect(getComputedStyle($header[0], "::after").backgroundImage).to.contain("repeating-linear-gradient");
		});
		cy.get("#ac").should($header => {
			expect($header[0].getBoundingClientRect().width).to.equal(96);
		});
	});

	it("uses supplied impact and exposes it to assistive technology", () => {
		cy.mount(<Fixture />);
		cy.get("#positive-color").then($reference => {
			const color = getComputedStyle($reference[0]).color;
			cell("cash", 5).should("have.css", "color", color);
			cell("cash", 5).find("[ui5-label]").should("have.css", "color", color);
		});
		cell("cash", 5).shadow().find(".ui5-table-ibcs-impact").should("have.text", "Favorable impact");
		cell("cash", 5).find("[ui5-label]").should("have.text", "+20");
		cell("result", 5).shadow().find(".ui5-table-ibcs-impact").should("have.text", "Unfavorable impact");
		cell("assets", 5).should("not.have.attr", "data-ui5-ibcs-impact");
	});

	it("updates metadata without rewriting public layout properties or content", () => {
		cy.mount(<Fixture />);
		cy.get("#ac").invoke("prop", "horizontalAlign", "Center");
		cy.get("#ibcs").invoke("prop", "columns", { ...columns, ac: { type: "Scenario", scenario: "Forecast" } });
		cy.get("#ac").should("have.attr", "data-ui5-ibcs-scenario", "Forecast").and("have.prop", "horizontalAlign", "Center");
		cell("cash", 4).should("have.css", "text-align", "center");
		cy.get("#ibcs").invoke("prop", "cellImpacts", { cash: { delta: "Unfavorable" } });
		cell("cash", 5).should("have.attr", "data-ui5-ibcs-impact", "Unfavorable");
		cell("result", 5).should("not.have.attr", "data-ui5-ibcs-impact");
		cell("cash", 5).find("[ui5-label]").should("have.text", "+20");
	});

	it("supports attaching and removing the feature dynamically", () => {
		cy.mount(<Fixture enabled={false} />);
		cy.get<Table>("#table").then($table => {
			const feature = new TableIBCS();
			feature.slot = "features";
			feature.id = "ibcs";
			feature.rows = rows;
			feature.columns = columns;
			$table[0].append(feature);
		});
		row("assets").should("have.attr", "data-ui5-ibcs-row-type", "Total");
		cy.get("#ibcs").invoke("remove");
		row("assets").should("not.have.attr", "data-ui5-ibcs-row-type");
		cell("cash", 0).should("not.have.attr", "data-ui5-ibcs-column-type");
		cy.get("#ac").should("not.have.attr", "data-ui5-ibcs-scenario");
		cell("ratio", 1).should("not.have.css", "font-style", "italic");
	});

	it("reattaches the same feature and styles column totals and percent-of columns", () => {
		cy.mount(<Fixture />);
		cy.get<TableIBCS>("#ibcs").then($feature => {
			const feature = $feature[0];
			feature.remove();
			cy.get("#ac").should("not.have.attr", "data-ui5-ibcs-scenario");
			cy.get("#table").then($table => { $table[0].append(feature); });
		});
		cy.get("#ac").should("have.attr", "data-ui5-ibcs-scenario", "Actual");
		cy.get("#ibcs").invoke("prop", "columns", {
			...columns,
			py: { type: "Total" },
			pl: { type: "PercentOf" },
			fc: { type: "Measure", result: true },
		});
		cell("cash", 1).should("have.css", "font-weight", "700");
		cell("cash", 2).should("have.css", "font-style", "italic");
		cell("cash", 3).should("have.css", "font-weight", "700");
		cy.get("#py").should("not.have.attr", "data-ui5-ibcs-scenario");
	});

	it("handles recycled row keys and changed cell slots", () => {
		cy.mount(<Fixture />);
		row("cash").invoke("prop", "rowKey", "result");
		cy.get("[ui5-table-row][row-key=result]").first().should("have.attr", "data-ui5-ibcs-row-type", "Result");
		cy.get("[ui5-table-row][row-key=result]").first().children("[ui5-table-cell]").last()
			.should("have.attr", "data-ui5-ibcs-impact", "Unfavorable");
		row("country").then($row => {
			const previous = $row[0].children[0];
			const replacement = new TableCell();
			replacement.id = "replacement";
			replacement.textContent = "France";
			previous.replaceWith(replacement);
		});
		cy.get("#replacement").should("have.attr", "data-ui5-ibcs-column-type", "RowHeader");
	});

	it("composes with native row-only selection and keyboard navigation", () => {
		cy.mount(<Fixture />);
		row("cash").realClick();
		cy.get("#selection").should("have.prop", "selected", "cash");
		row("cash").should("have.attr", "aria-selected", "true");
		cy.realPress("ArrowDown");
		cy.realPress("Enter");
		cy.get("#selection").should("have.prop", "selected", "restricted");
	});

	it("keeps impact text when cells move into popin", () => {
		cy.viewport(420, 720);
		cy.mount(<Fixture popin={true} />);
		cell("cash", 5).should("have.attr", "_popin");
		cell("cash", 5).shadow().find("#popin-content").should("contain.text", "Favorable impact");
	});

	it("updates colors with the theme and tolerates cyclic hierarchy metadata", () => {
		cy.mount(<Fixture />);
		cy.then(() => setTheme("sap_horizon_dark"));
		cy.get("#negative-color").then($reference => {
			cell("result", 5).should("have.css", "color", getComputedStyle($reference[0]).color);
		});
		cy.get("#ibcs").invoke("prop", "rows", {
			cash: { type: "Measure", parentKey: "assets" },
			assets: { type: "Total", parentKey: "cash" },
		});
		cell("cash", 0).should($cell => {
			expect($cell[0].style.getPropertyValue("--_ui5_table_ibcs_indent")).to.equal("");
		});
		row("cash").should("be.visible");
	});
});
