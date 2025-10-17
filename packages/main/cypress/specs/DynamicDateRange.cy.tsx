import DynamicDateRange, { IDynamicDateRangeOption } from '../../src/DynamicDateRange.js';
import SingleDate from '../../src/dynamic-date-range-options/SingleDate.js';
import DateRange from '../../src/dynamic-date-range-options/DateRange.js';
import Today from '../../src/dynamic-date-range-options/Today.js';
import LastOptions from '../../src/dynamic-date-range-options/LastOptions.js';
import NextOptions from '../../src/dynamic-date-range-options/NextOptions.js';
import FromDateTime from '../../src/dynamic-date-range-options/FromDateTime.js';
import ToDateTime from '../../src/dynamic-date-range-options/ToDateTime.js';

describe('DynamicDateRange Component', () => {
	beforeEach(() => {
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE">
		</DynamicDateRange>
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
			new DateRange()
		];

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
			.realClick(); // Open the picker

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-list]")
			.as("list");

		cy.get('@list')
			.find("[ui5-li]")
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
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.should('exist');

		cy.get("@input")
			.find('[ui5-icon]')
			.as("icon");

		cy.get("@icon")
			.realClick(); // Open the picker

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-list]")
			.as("list");

		cy.get('@list')
			.find("[ui5-li]")
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

		cy.get("@popover")
			.find("[ui5-button][design='Emphasized']")
			.as("submitButton");

		cy.get("@submitButton")
			.should('exist')
			.realClick();

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
		cy.mount(<DynamicDateRange options="LASTDAYS, NEXTWEEKS, LASTMONTHS">
		</DynamicDateRange>
		);
	});

	it('selects Last X Days option with custom number input', () => {
		new LastOptions();
		new NextOptions();

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

		cy.get("@popover")
			.find("[ui5-button][design='Emphasized']")
			.as("submitButton");

		cy.get("@submitButton")
			.realClick();

		cy.get("@innerInput")
			.should('have.value', 'Last 7 Days');
	});

	it('handles Next X Weeks option and verifies date range calculation', () => {
		new LastOptions();
		new NextOptions();

		cy.window().then((win) => {
			cy.stub(win.Date, 'now').returns(new Date(2025, 5, 15).getTime()); // June 15, 2025
		});

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
			.as("listItems");

		cy.get("@listItems")
			.last()
			.realClick();

		cy.get("@popover")
			.find("[slot='header']")
			.should('contain.text', 'Next X');

		cy.get("@popover")
			.find("[ui5-step-input]")
			.as("stepInput");

		cy.get("@stepInput")
			.shadow()
			.find("[ui5-input]")
			.shadow()
			.find("input")
			.as("stepInputInner");

		cy.get("@stepInputInner")
			.clear()
			.realType('3');

		cy.get("@stepInputInner")
			.realPress("Enter");

		cy.get("@popover")
			.find(".ui5-ddr-current-value")
			.should('contain.text', 'Selected:');

		cy.get("@popover")
			.find("[ui5-button][design='Emphasized']")
			.as("submitButton");

		cy.get("@submitButton")
			.realClick();

		cy.get("@innerInput")
			.should('have.value', 'Next 3 Weeks');
	});

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
		cy.mount(<DynamicDateRange options="TODAY, DATE, DATERANGE">
		</DynamicDateRange>
		);
	});
	it('should select FromDateTime option and display date/time picker', () => {
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
			.click();
		
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
			.contains('From')
			.click();

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
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.find('[ui5-icon]')
			.click();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find("[ui5-list]")
			.find("[ui5-li]")
			.contains('From')
			.click();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.click();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.should('have.attr', 'selected');

		cy.get("@popover")
			.find("[ui5-time-selection-clocks]")
			.should('exist');

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.click();

		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Date']")
			.should('have.attr', 'selected');
	});

	it('should select a date and time, then submit the value', () => {
		cy.get('[ui5-dynamic-date-range]')
			.as("ddr");

		cy.get("@ddr")
			.shadow()
			.find('[ui5-input]')
			.as("input");

		cy.get("@input")
			.find('[ui5-icon]')
			.click();

		cy.get("@ddr")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find("[ui5-list]")
			.find("[ui5-li]")
			.contains('From')
			.click();
		
		cy.get("@popover")
			.find("[ui5-calendar]")
			.as("calendar");

		cy.get("@calendar")
			.shadow()
			.find("ui5-daypicker")
			.shadow()
			.find(".ui5-dp-daytext")
			.eq(15)
			.click(); // Select day 16
		
		cy.get("@popover")
			.find("[ui5-segmented-button-item][data-ui5-key='Time']")
			.click();
		cy.get("@popover")
			.find("[ui5-time-selection-clocks]")
			.as("timePicker");
		
		// Set time to 14:30
		cy.get("@timePicker")
			.shadow()
			.find("[ui5-wheelslider][data-sap-slider='hours']")
			.shadow()
			.find(".ui5-wheelslider-item")
			.contains('14')
			.click();

		cy.get("@timePicker")
			.shadow()
			.find("[ui5-wheelslider][data-sap-slider='minutes']")
			.shadow().find(".ui5-wheelslider-item")
			.contains('30')
			.click();
		
		cy.get("@popover")
			.find("[ui5-button][design='Emphasized']")
			.click();

		cy.get("@input")
			.shadow()
			.find("input")
			.should('contain.value', 'From');

		cy.get("@input")
			.shadow()
			.find("input")
			.should('contain.value', '14:30');
	});

	it('should parse text input for FromDateTime correctly', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");
		
		// Type FromDateTime value directly
		cy.get("@input").shadow().find("input").clear()
			.type('From Dec 25, 2025, 3:45:00 PM{enter}');
		
		// Verify value is parsed and stored
		cy.get("@input").shadow().find("input")
			.should('have.value', 'From Dec 25, 2025, 3:45:00 PM');
	});

	it('should validate invalid FromDateTime input', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");
		
		// Type invalid FromDateTime value
		cy.get("@input").shadow().find("input").clear()
			.type('From invalid date{enter}');
		
		// Verify input is cleared for invalid value
		cy.get("@input").shadow().find("input").should('have.value', '');
	});
});

describe('ToDateTime Option', () => {
	it('should select ToDateTime option and display date/time picker', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");
		
		// Open picker and select ToDateTime
		cy.get("@input").find('[ui5-icon]').click();
		cy.get("@ddr").shadow().find("[ui5-responsive-popover]").as("popover");
		cy.get("@popover").find("[ui5-list]").find("[ui5-li]").contains('To').click();
		
		// Verify date/time picker interface appears
		cy.get("@popover").find(".ui5-dynamic-date-range-option-datetime-container").should('exist');
		cy.get("@popover").find("[ui5-segmented-button]").should('exist');
		
		// Verify Date button is initially selected
		cy.get("@popover").find("[ui5-segmented-button-item][data-ui5-key='Date']").should('have.attr', 'selected');
	});

	it('should handle time selection in ToDateTime option', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");
		
		// Open picker and select ToDateTime
		cy.get("@input").find('[ui5-icon]').click();
		cy.get("@ddr").shadow().find("[ui5-responsive-popover]").as("popover");
		cy.get("@popover").find("[ui5-list]").find("[ui5-li]").contains('To').click();
		
		// Switch to time view
		cy.get("@popover").find("[ui5-segmented-button-item][data-ui5-key='Time']").click();
		
		// Verify time picker is displayed
		cy.get("@popover").find("[ui5-time-selection-clocks]").should('exist');
		
		// Set time to 09:15
		cy.get("@popover").find("[ui5-time-selection-clocks]").as("timePicker");
		cy.get("@timePicker").shadow().find("[ui5-wheelslider][data-sap-slider='hours']")
			.shadow().find(".ui5-wheelslider-item").contains('09').click();
		cy.get("@timePicker").shadow().find("[ui5-wheelslider][data-sap-slider='minutes']")
			.shadow().find(".ui5-wheelslider-item").contains('15').click();
		
		// Submit value
		cy.get("@popover").find("[ui5-button][design='Emphasized']").click();
		
		// Verify input contains formatted datetime value
		cy.get("@input").shadow().find("input").should('contain.value', 'To');
		cy.get("@input").shadow().find("input").should('contain.value', '09:15');
	});

	it('should parse text input for ToDateTime correctly', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");
		
		// Type ToDateTime value directly
		cy.get("@input").shadow().find("input").clear()
			.type('To Jan 1, 2026, 11:30:00 AM{enter}');
		
		// Verify value is parsed and stored
		cy.get("@input").shadow().find("input")
			.should('have.value', 'To Jan 1, 2026, 11:30:00 AM');
	});

	it('should validate ToDateTime input format', () => {
		cy.get('[ui5-dynamic-date-range]').as("ddr");
		cy.get("@ddr").shadow().find('[ui5-input]').as("input");
		
		// Type valid ToDateTime value without "To" prefix
		cy.get("@input").shadow().find("input").clear()
			.type('Jan 1, 2026, 11:30:00 AM{enter}');
		
		// Verify input is cleared as it doesn't match ToDateTime format
		cy.get("@input").shadow().find("input").should('have.value', '');
	});
});