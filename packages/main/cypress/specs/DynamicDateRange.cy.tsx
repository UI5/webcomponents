import DynamicDateRange, { IDynamicDateRangeOption } from '../../src/DynamicDateRange.js';
import SingleDate from '../../src/dynamic-date-range-options/SingleDate.js';
import DateRange from '../../src/dynamic-date-range-options/DateRange.js';
import Today from '../../src/dynamic-date-range-options/Today.js';
import LastOptions from '../../src/dynamic-date-range-options/LastOptions.js';
import NextOptions from '../../src/dynamic-date-range-options/NextOptions.js';
import DateTimeRange from '../../src/dynamic-date-range-options/DateTimeRange.js';
import FromDateTime from '../../src/dynamic-date-range-options/FromDateTime.js';
import ToDateTime from '../../src/dynamic-date-range-options/ToDateTime.js';

describe('DynamicDateRange Component', () => {
	beforeEach(() => {
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE, DATETIMERANGE"></DynamicDateRange>
		);
	});

	it('renders the DynamicDateRange component', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");
	
		cy.get("@input")
			.should('exist');
	
		cy.get("@input")
			.find('[ui5-icon]')
			.as("icon");
		
		cy.get("@icon")
			.should('have.attr', 'name', 'appointment-2');
	});

	it('displays all options correctly', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new Today(),
			new SingleDate(),
			new DateRange(),
			new DateTimeRange()
		];

		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeGetOptionsList()
			.as("listItems");

		cy.get("@listItems")
			.should('have.length', mockOptions.length);

		mockOptions.forEach((option, index) => {
			cy.get('@listItems')
				.eq(index)
				.should('contain.text', option.text);
		});
	});

	it('selects an option and updates the current value', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeGetOptionsList()
			.as("listItems");

		cy.get("@listItems")
			.contains('Today')
			.realClick();

		cy.get("@input")
			.should('have.value', 'Today');
	});

	it('handles selection change correctly', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.shadow()
			.find("input")
			.as("innerInput");
	
		cy.get("@input")
			.should('exist');

		cy.get("@innerInput")
			.realClick();

		cy.get("@innerInput")
			.realType("Today");

		cy.get("@innerInput")
			.realPress("Enter");

		cy.get("@innerInput")
			.should('have.value', 'Today');
	});

	// Check why it fails remotely
	it('selects the Date option and updates the current value', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.should('exist');

		cy.get("@input")
			.find('[ui5-icon]')
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-list]")
			.as("list");

		cy.get("@list")
			.find("[ui5-li]")
			.contains('Date')
			.realClick();

		cy.get("@popover")
			.find("[ui5-calendar]")
			.as("calendar");

		cy.get("@calendar")
			.should('exist');

		cy.realPress("Tab");
		cy.realPress("Tab");
		cy.realPress("Tab");

		cy.get("@calendar")
			.shadow()
			.find("[data-ui5-cal-header-btn-year='true']")
			.as("yearButton");

		cy.get("@yearButton")
			.should("be.focused");

		cy.realPress("Space");

		cy.get("@calendar")
			.shadow()
			.find("ui5-yearpicker")
			.as("yearPicker");

		cy.get("@yearPicker")
			.shadow()
			.find(".ui5-dp-yeartext")
			.contains('2035')
			.realClick();

		cy.realPress("Tab");

		cy.get("@calendar")
			.shadow()
			.find("[data-ui5-cal-header-btn-month='true']")
			.as("monthButton");

		cy.get("@monthButton")
			.should("be.focused");

		cy.realPress("Space");

		cy.get("@calendar")
			.shadow()
			.find("ui5-monthpicker")
			.as("monthPicker");

		cy.get("@monthPicker")
			.shadow()
			.find(".ui5-dp-monthtext")
			.contains('May')
			.realClick();

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.as("dayPicker");

		cy.get("@dayPicker")
			.shadow()
			.find(".ui5-dp-daytext")
			.eq(22) // May 21, 2035 is the 21st day
			.realClick();

		cy.get("@ddr")
			.ui5DynamicDateRangeSubmit();

		cy.get("@input")
			.shadow()
			.find("input")
			.should('have.value', 'May 21, 2035');
	});

	it('writes a date in the input and verifies it is selected in the calendar for the Date option', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.shadow()
			.find("input")
			.clear()
			.realType('May 15, 2025');
		cy.realPress("Enter");

		cy.get("@input")
			.find('[ui5-icon]')
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-list]")
			.as("list");

		cy.get("@list")
			.find("[ui5-li]")
			.contains('Date')
			.realClick();

		cy.get("@popover")
			.find("[ui5-calendar]")
			.as("calendar");

		cy.get("@calendar")
			.should('exist');

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.as("dayPicker");

		cy.get("@dayPicker")
			.shadow()
			.find("div[data-sap-timestamp='1747267200']")
			.should('have.class', 'ui5-dp-item--selected'); // Timestamp for May 15, 2025
	});
});

describe('DynamicDateRange Last/Next Options', () => {
	beforeEach(() => {
		cy.mount(<DynamicDateRange options="LASTDAYS, NEXTWEEKS, LASTMONTHS"></DynamicDateRange>
		);
	});

	it('selects Last X Days option with custom number input', () => {
		new LastOptions();
		new NextOptions();

		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeGetOptionsList()
			.as("listItems");

		cy.get("@listItems")
			.should('have.length', 2); // Since we unified the options, we only have 2 options

		// Select the first option (Last X Days / Months)
		cy.get("@listItems")
			.first()
			.realClick();

		cy.get("@popover")
			.find("[slot='header']")
			.should('contain.text', 'Last X');

		cy.get("@popover")
			.find("[ui5-step-input]")
			.as("stepInput");

		cy.get("@stepInput")
			.should('exist');

		cy.get("@stepInput")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.as("stepInputInner");

		cy.get("@stepInputInner")
			.clear()
			.realType('7');

		cy.get("@ddr")
			.ui5DynamicDateRangeSubmit();

		cy.get("@innerInput")
			.should('have.value', 'Last 7 Days');
	});

	// it('handles Next X Weeks option and verifies date range calculation', () => {
	// 	new LastOptions();
	// 	new NextOptions();

	// 	cy.window().then((win) => {
	// 		cy.stub(win.Date, 'now').returns(new Date(2025, 5, 15).getTime()); // June 15, 2025
	// 	});

	// 	cy.get('[ui5-dynamic-date-range]')
	// 		.as("ddr");

	// 	cy.get("@ddr")
	// 		.ui5DynamicDateRangeOpen()
	// 		.ui5DynamicDateRangeGetOptionsList()
	// 		.as("listItems");

	// 	cy.get("@listItems")
	// 		.last()
	// 		.realClick();

	// 	cy.get("@popover")
	// 		.find("[slot='header']")
	// 		.should('contain.text', 'Next X');

	// 	cy.get("@popover")
	// 		.find("[ui5-step-input]")
	// 		.as("stepInput");

	// 	cy.get("@stepInput")
	// 		.shadow()
	// 		.find("[ui5-input]")
	// 		.shadow()
	// 		.find("input")
	// 		.as("stepInputInner");

	// 	cy.get("@stepInputInner")
	// 		.clear()
	// 		.realType('3');

	// 	cy.get("@stepInputInner")
	// 		.realPress("Enter");

	// 	cy.get("@popover")
	// 		.find(".ui5-ddr-current-value")
	// 		.should('contain.text', 'Selected:');

	// 	cy.get("@ddr")
	// 		.ui5DynamicDateRangeSubmit();

	// 	cy.get("@innerInput")
	// 		.should('have.value', 'Next 3 Weeks');
	// });

	it('validates text input for Last X Months and parses correctly', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.clear()
			.realType('Last 6 Days');

		cy.get("@innerInput")
			.realPress("Enter");

		cy.get("@innerInput")
			.should('have.value', 'Last 6 Days');

		cy.get("@input")
			.find('[ui5-icon]')
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find("[ui5-list]")
			.as("list");

		cy.get("@list")
			.find("[ui5-li]")
			.contains("Last X Days / Months")
			.should('have.attr', 'selected');
	});
});

describe('FromDateTime Option', () => {
	beforeEach(() => {
		cy.mount(<DynamicDateRange options="FROMDATETIME">
		</DynamicDateRange>
		);
	});
	it('should select FromDateTime option and display date/time picker', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new FromDateTime(),
		];
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find(".ui5-dynamic-date-range-option-datetime-container")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button]")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');
	});

	it('should toggle between date and time views', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new FromDateTime(),
		];
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.realClick();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.should('have.attr', 'selected');

		cy.get("@popover")
			.find("[ui5-time-selection-clocks]")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.realClick();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');
	});

	it.skip('should select a date and time, then submit the value', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new FromDateTime(),
		];
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");
		
		cy.get("@popover")
			.find("[ui5-calendar]")
			.as("calendar");

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-daytext")
			.eq(15)
			.realClick(); // Select day 13
		
		cy.get("@ddr")
			.ui5DynamicDateRangeSubmit();

		cy.get("@input")
			.shadow()
			.find("input")
			.should('contain.value', 'From');

		cy.get("@input")
			.shadow()
			.find("input")
			.should('contain.value', 'From Oct 13, 2025');
	});
});

describe('ToDateTime Option', () => {
	beforeEach(() => {
		cy.mount(<DynamicDateRange options="TODATETIME">
		</DynamicDateRange>
		);
	});
	it('should select FromDateTime option and display date/time picker', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new ToDateTime(),
		];
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find(".ui5-dynamic-date-range-option-datetime-container")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button]")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');
	});

	it('should toggle between date and time views', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new ToDateTime(),
		];
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.realClick();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.should('have.attr', 'selected');

		cy.get("@popover")
			.find("[ui5-time-selection-clocks]")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.realClick();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');
	});

	it.skip('should select a date and time, then submit the value', () => {
		const mockOptions: Array<IDynamicDateRangeOption> = [
			new ToDateTime(),
		];
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");
		
		cy.get("@popover")
			.find("[ui5-calendar]")
			.as("calendar");

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-daytext")
			.eq(15)
			.realClick(); // Select day 13
		
		cy.get("@ddr")
			.ui5DynamicDateRangeSubmit();

		cy.get("@input")
			.shadow()
			.find("input")
			.should('contain.value', 'To');

		cy.get("@input")
			.shadow()
			.find("input")
			.should('contain.value', 'To Oct 13, 2025');
	});
});

describe('DynamicDateRange DateTimeRange Option', () => {
	beforeEach(() => {
		cy.mount(<DynamicDateRange options="DATETIMERANGE"></DynamicDateRange>);
	});

	it("should select DateTimeRange option and pick 2 dates from the DateTimePickers", () => {
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption()
            .ui5DynamicDateRangeSetDateTime("from-picker", "Dec 25, 2023, 2:30:00 PM")
			.ui5DynamicDateRangeSetDateTime("to-picker", "Dec 26, 2023, 4:45:00 AM")
            .ui5DynamicDateRangeSubmit();

        cy.get("@ddr")
            .shadow()
            .find("[ui5-input]")
			.as("input");

		cy.get("@input")
			.should("have.value", "Dec 25, 2023, 2:30:00 PM - Dec 26, 2023, 4:45:00 AM");
	});

	it("should auto-correct date order when second date is earlier than first", () => {
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption()
            .ui5DynamicDateRangeSetDateTime("to-picker", "Dec 25, 2023, 2:30:00 PM")
			.ui5DynamicDateRangeSetDateTime("from-picker", "Dec 26, 2023, 4:45:00 AM")
            .ui5DynamicDateRangeSubmit();

        cy.get("@ddr")
            .shadow()
            .find("[ui5-input]")
			.as("input");

		cy.get("@input")
			.should("have.value", "Dec 25, 2023, 2:30:00 PM - Dec 26, 2023, 4:45:00 AM");
    });

	it("should parse input value correctly when option is reopened", () => {
		cy.get("[ui5-dynamic-date-range]")
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find("[ui5-input]")
			.as("input");

		cy.get("@input")
			.shadow()
			.find("input")
			.as("innerInput");

		cy.get("@innerInput")
			.clear()
			.realType("Jan 4, 2025, 12:00:00 AM - Feb 26, 2025, 11:59:00 PM")
			.realPress("Enter");

		cy.get("[ui5-dynamic-date-range]")
			.as("ddr")
			.ui5DynamicDateRangeOpen()
			.ui5DynamicDateRangeSelectOption();

		// Verify the parsed dates are displayed in the pickers
		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find("[ui5-datetime-picker]#from-picker")
			.as("fromPicker");

		cy.get("@fromPicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("fromInput");

		cy.get("@fromInput")
			.should("have.value", "Jan 4, 2025, 12:00:00 AM");

		cy.get("@popover")
			.find("[ui5-datetime-picker]#to-picker")
			.as("toPicker");

		cy.get("@toPicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("toInput");

		cy.get("@toInput")
			.should("have.value", "Feb 26, 2025, 11:59:00 PM");
	});
});