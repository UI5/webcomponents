import DynamicDateRange from "../../../src/DynamicDateRange.js";
import "../../../src/dynamic-date-range-options/Today.js";
import "../../../src/dynamic-date-range-options/Yesterday.js";
import "../../../src/dynamic-date-range-options/Tomorrow.js";
import "../../../src/dynamic-date-range-options/SingleDate.js";
import "../../../src/dynamic-date-range-options/DateRange.js";
import "../../../src/dynamic-date-range-options/DateTimeRange.js";
import "../../../src/dynamic-date-range-options/FromDateTime.js";
import "../../../src/dynamic-date-range-options/ToDateTime.js";
import "../../../src/dynamic-date-range-options/LastOptions.js";
import "../../../src/dynamic-date-range-options/NextOptions.js";

describe("DynamicDateRange visual", () => {
	beforeEach(() => {
		cy.clock(new Date("Jan 15, 2024").getTime(), ["Date"]);
	});

	it("basic state", () => {
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE" />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DynamicDateRange options="TODAY, DATE, DATERANGE" />
			</div>
		);
		cy.screenshot();
	});

	it("with value — Today", () => {
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE" value={{ operator: "TODAY", values: [] }} />);
		cy.screenshot();
	});

	it("popover open — options list", () => {
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE, LASTDAYS, NEXTWEEKS" />);
		cy.get("[ui5-dynamic-date-range]").ui5DynamicDateRangeOpen();
		cy.screenshot();
	});

	it("popover open — Date option selected (calendar shown)", () => {
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE" />);
		cy.get("[ui5-dynamic-date-range]")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeGetOptionsList()
			.contains("Date")
			.realClick();
		cy.get("[ui5-dynamic-date-range]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("popover open — Last X option selected (step input shown)", () => {
		cy.mount(<DynamicDateRange options="LASTDAYS" />);
		cy.get("[ui5-dynamic-date-range]")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeGetOptionsList()
			.first()
			.realClick();
		cy.get("[ui5-dynamic-date-range]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("popover open — DateTimeRange option selected", () => {
		cy.mount(<DynamicDateRange options="DATETIMERANGE" />);
		cy.get("[ui5-dynamic-date-range]")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();
		cy.get("[ui5-dynamic-date-range]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
