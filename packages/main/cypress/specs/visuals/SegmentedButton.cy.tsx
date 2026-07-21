import SegmentedButton from "../../../src/SegmentedButton.js";
import SegmentedButtonItem from "../../../src/SegmentedButtonItem.js";
import list from "@ui5/webcomponents-icons/dist/list.js";
import grid from "@ui5/webcomponents-icons/dist/grid.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";

describe("SegmentedButton visual", () => {
	it("basic — first item selected by default", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
				<SegmentedButtonItem>Third</SegmentedButtonItem>
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("second item selected", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem selected>Second</SegmentedButtonItem>
				<SegmentedButtonItem>Third</SegmentedButtonItem>
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("multiple selection mode — two items selected", () => {
		cy.mount(
			<SegmentedButton selectionMode="Multiple">
				<SegmentedButtonItem selected>First</SegmentedButtonItem>
				<SegmentedButtonItem>Second</SegmentedButtonItem>
				<SegmentedButtonItem selected>Third</SegmentedButtonItem>
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("with disabled item", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem>First</SegmentedButtonItem>
				<SegmentedButtonItem disabled>Second</SegmentedButtonItem>
				<SegmentedButtonItem>Third</SegmentedButtonItem>
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("itemsFitContent — items sized to their content", () => {
		cy.mount(
			<SegmentedButton itemsFitContent>
				<SegmentedButtonItem>Short</SegmentedButtonItem>
				<SegmentedButtonItem>Much longer text</SegmentedButtonItem>
				<SegmentedButtonItem>Medium</SegmentedButtonItem>
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("with icons", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem icon={list}>List</SegmentedButtonItem>
				<SegmentedButtonItem icon={grid} selected>Grid</SegmentedButtonItem>
				<SegmentedButtonItem icon={calendar}>Calendar</SegmentedButtonItem>
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("icon only", () => {
		cy.mount(
			<SegmentedButton>
				<SegmentedButtonItem icon={list} />
				<SegmentedButtonItem icon={grid} selected />
				<SegmentedButtonItem icon={calendar} />
			</SegmentedButton>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SegmentedButton>
					<SegmentedButtonItem>First</SegmentedButtonItem>
					<SegmentedButtonItem selected>Second</SegmentedButtonItem>
					<SegmentedButtonItem>Third</SegmentedButtonItem>
				</SegmentedButton>
			</div>
		);
		cy.screenshot();
	});
});
