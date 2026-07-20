import DateRangePicker from "../../../src/DateRangePicker.js";

describe("DateRangePicker visual", () => {
	beforeEach(() => {
		cy.clock(new Date("Jan 15, 2024").getTime(), ["Date"]);
	});

	it("basic state", () => {
		cy.mount(<DateRangePicker value="Jan 15, 2024 - Jan 25, 2024" />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DateRangePicker value="Jan 15, 2024 - Jan 25, 2024" />
			</div>
		);
		cy.screenshot();
	});

	it("calendar open", () => {
		cy.mount(<DateRangePicker value="Jan 15, 2024 - Jan 25, 2024" />);
		cy.get("[ui5-daterange-picker]").ui5DatePickerValueHelpIconPress();
		cy.get("[ui5-daterange-picker]").ui5DateRangePickerExpectToBeOpen();
		cy.screenshot();
	});

	it("calendar open — two months", () => {
		cy.mount(<DateRangePicker showTwoMonths value="Jan 15, 2024 - Feb 10, 2024" />);
		cy.get("[ui5-daterange-picker]").ui5DatePickerValueHelpIconPress();
		cy.get("[ui5-daterange-picker]").ui5DateRangePickerExpectToBeOpen();
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(<DateRangePicker valueState="Negative" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Invalid date range</span>
		</DateRangePicker>);
		cy.screenshot();
	});

	it("value state — Negative — calendar open", () => {
		cy.mount(<DateRangePicker valueState="Negative" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Invalid date range</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").ui5DatePickerValueHelpIconPress();
		cy.get("[ui5-daterange-picker]").ui5DateRangePickerExpectToBeOpen();
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(<DateRangePicker valueState="Negative" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Invalid date range</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").shadow().find("ui5-datetime-input").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(<DateRangePicker valueState="Critical" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Date range outside allowed period</span>
		</DateRangePicker>);
		cy.screenshot();
	});

	it("value state — Critical — calendar open", () => {
		cy.mount(<DateRangePicker valueState="Critical" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Date range outside allowed period</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").ui5DatePickerValueHelpIconPress();
		cy.get("[ui5-daterange-picker]").ui5DateRangePickerExpectToBeOpen();
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(<DateRangePicker valueState="Critical" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Date range outside allowed period</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").shadow().find("ui5-datetime-input").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(<DateRangePicker valueState="Positive" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Date range is valid</span>
		</DateRangePicker>);
		cy.screenshot();
	});

	it("value state — Positive — calendar open", () => {
		cy.mount(<DateRangePicker valueState="Positive" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Date range is valid</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").ui5DatePickerValueHelpIconPress();
		cy.get("[ui5-daterange-picker]").ui5DateRangePickerExpectToBeOpen();
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(<DateRangePicker valueState="Positive" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Date range is valid</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").shadow().find("ui5-datetime-input").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(<DateRangePicker valueState="Information" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Select a date range</span>
		</DateRangePicker>);
		cy.screenshot();
	});

	it("value state — Information — calendar open", () => {
		cy.mount(<DateRangePicker valueState="Information" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Select a date range</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").ui5DatePickerValueHelpIconPress();
		cy.get("[ui5-daterange-picker]").ui5DateRangePickerExpectToBeOpen();
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(<DateRangePicker valueState="Information" value="Jan 15, 2024 - Jan 25, 2024">
			<span slot="valueStateMessage">Select a date range</span>
		</DateRangePicker>);
		cy.get("[ui5-daterange-picker]").shadow().find("ui5-datetime-input").shadow().find("input").realClick();
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(<DateRangePicker disabled value="Jan 15, 2024 - Jan 25, 2024" />);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(<DateRangePicker readonly value="Jan 15, 2024 - Jan 25, 2024" />);
		cy.screenshot();
	});

	it("placeholder", () => {
		cy.mount(<DateRangePicker placeholder="Select date range" />);
		cy.screenshot();
	});
});
