import Calendar from "../../src/Calendar.js";
import CalendarDate from "../../src/CalendarDate.js";
import CalendarDateRange from "../../src/CalendarDateRange.js";
import SpecialCalendarDate from "../../src/SpecialCalendarDate.js";
import YearRangePicker from "../../src/YearRangePicker.js";
import YearPicker from "../../src/YearPicker.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Gregorian.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";

const getDefaultCalendar = (date: Date) => {
	const calDate = new Date(date);

	const day = String(calDate.getDate()).padStart(2, "0");
	const month = String(calDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
	const year = calDate.getFullYear();

	const value = `${day}/${month}/${year}`;

	return (<Calendar id="calendar1" timestamp={calDate.valueOf() / 1000} formatPattern="dd/MM/yyyy">
		<CalendarDate value={value}></CalendarDate>
	</Calendar>);
};

const getCalendarsWithWeekNumbers = () => (<>
	<Calendar id="calendar1" calendarWeekNumbering="ISO_8601">
		<CalendarDate value="Jan 1, 2023"></CalendarDate>
	</Calendar>

	<Calendar id="calendar2" calendarWeekNumbering="MiddleEastern">
		<CalendarDate value="Jan 1, 2023"></CalendarDate>
	</Calendar>

	<Calendar id="calendar3" calendarWeekNumbering="WesternTraditional">
		<CalendarDate value="Jan 1, 2023"></CalendarDate>
	</Calendar>
</>);

describe("Calendar general interaction", () => {
	it("Focus goes into the current day item of the day picker", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.ui5CalendarGetDay("#calendar1", "974851200")
			.as("selectedDay");

		cy.get("@selectedDay")
			.realClick();

		cy.get("@selectedDay")
			.should("have.focus")
			.realPress("Tab");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");
		
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.as("monthBtn");
		
		cy.get("@monthBtn")
			.should("have.focus")
			.realPress("Tab");

		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.as("yearBtn");
		
		cy.get("@yearBtn")
			.should("have.focus")
			.realPress(["Shift", "Tab"]);

		cy.get("@monthBtn")
			.should("have.focus")
			.realPress(["Shift", "Tab"]);

		cy.get("@selectedDay")
			.should("have.focus");
	});

	it("Calendar focuses the selected year when yearpicker is opened", () => {
		const YEAR = 1997;
		const date = Date.UTC(YEAR);
		cy.mount(getDefaultCalendar(new Date(date)));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find("[tabindex='0']")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedYear = new Date(parseInt(_timestamp!) * 1000).getUTCFullYear();
				expect(focusedYear).to.equal(1997);
			});
	});

	it("Calendar focuses the selected month when monthpicker is opened with space", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.ui5CalendarGetDay("#calendar1", "974851200")
			.realClick();

		cy.focused().realPress("Tab");
		cy.focused().realPress("Space");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.should("not.have.attr", "hidden");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find("[tabindex='0']")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedMonth = new Date(parseInt(_timestamp!) * 1000).getUTCMonth();
				expect(focusedMonth).to.equal(10);
			});
	});

	it("Calendar focuses the selected year when yearpicker is opened with space", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.ui5CalendarGetDay("#calendar1", "974851200")
			.realClick();

		cy.focused().realPress("Tab");
		cy.focused().realPress("Tab");
		cy.focused().realPress("Space");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.should("not.have.attr", "hidden");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find("[tabindex='0']")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedYear = new Date(parseInt(_timestamp!) * 1000).getUTCFullYear();
				expect(focusedYear).to.equal(2000);
			});
	});

	it("Should focus the selected range when YearRange Picker is opened", () => {
		const YEAR = 1997;
		const date = Date.UTC(YEAR);
		const expectedRangeStart = 1988;
		const expectedRangeEnd = 2007;
		cy.mount(getDefaultCalendar(new Date(date)));

		cy.get<Calendar>("[ui5-calendar]")
			.as("calendar");

		cy.get<Calendar>("@calendar")
			.ui5CalendarShowYearRangePicker();

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearrangepicker]")
			.as("yearRangePicker");

		cy.get<YearRangePicker>("@yearRangePicker")
			.shadow()
			.find("[tabindex='0']")
			.as("focusedYearRange");

		cy.get("@focusedYearRange")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const focusedYear = new Date(parseInt(_timestamp!) * 1000).getUTCFullYear();
				expect(focusedYear).to.equal(expectedRangeStart);
			});

		cy.get("@focusedYearRange")
			.find("span")
			.first()
			.should("have.text", `${expectedRangeStart} - ${expectedRangeEnd}`);
	});

	it("Calendar doesn't mark year as selected when there are no selected dates", () => {
		const todayDate = new Date();
		const todayTimestamp = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0) / 1000;

		cy.mount(<Calendar id="calendar2"></Calendar>);

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(`[data-sap-timestamp=${todayTimestamp}]`)
			.should("have.focus")
			.should("not.have.class", "ui5-yp-item--selected");
	});

	it("Calendar doesn't mark month as selected when there are no selected dates", () => {
		const todayDate = new Date();
		const todayTimestamp = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0, 0, 0) / 1000;

		cy.mount(<Calendar id="calendar2"></Calendar>);

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.realClick();

		cy.ui5CalendarGetMonth("#calendar2", todayTimestamp.toString())
			.should("have.focus")
			.should("not.have.class", "ui5-mp-item--selected");
	});

	it("Should navigate to Year Picker when selecting a range in Year Range Picker", () => {
		const YEAR = 1997;
		const date = Date.UTC(YEAR);
		const expectedRangeStart = 1948;
		const expectedRangeEnd = 1967;
		cy.mount(getDefaultCalendar(new Date(date)));

		cy.get<Calendar>("[ui5-calendar]")
			.as("calendar");

		cy.get<Calendar>("@calendar")
			.ui5CalendarShowYearRangePicker();

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearrangepicker]")
			.as("yearRangePicker");

		cy.get<YearRangePicker>("@yearRangePicker")
			.shadow()
			.find(".ui5-yrp-item")
			.first() // 1948 - 1967
			.as("yearRangePickerItem");

		cy.get("@yearRangePickerItem")
			.find("span")
			.first()
			.should("have.text", `${expectedRangeStart} - ${expectedRangeEnd}`);

		cy.get("@yearRangePickerItem")
			.realClick({position: "center"});

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearpicker]")
			.as("yearPicker");

		cy.get<YearPicker>("@yearPicker")
			.should("be.visible");

		cy.get("@yearPicker")
			.shadow()
			.find(".ui5-yp-item")
			.first()
			.as("yearPickerItem");

		cy.get("@yearPickerItem")
			.invoke("attr", "data-sap-timestamp")
			.then(_timestamp => {
				const year = new Date(parseInt(_timestamp!) * 1000).getUTCFullYear();
				expect(year).to.equal(expectedRangeStart);
			});

	});

	it("Page up/down increments/decrements the month value", () => {
		const date = new Date(Date.UTC(2000, 10, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.realClick();

		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
			});

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
			});
	});

	it("Shift + Page up/down increments/decrements the year value by one", () => {
		const date = new Date(Date.UTC(2000, 10, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.realClick();

		cy.focused().realPress(["Shift", "PageUp"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1999, 10, 1, 0, 0, 0)));
			});

		cy.focused().realPress(["Shift", "PageDown"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
			});
	});

	it("Ctrl + Shift + Page up/down increments/decrements the year value by ten", () => {
		const date = new Date(Date.UTC(2000, 10, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.realClick();

		cy.focused().realPress(["Control", "Shift", "PageUp"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1990, 10, 1, 0, 0, 0)));
			});

		cy.focused().realPress(["Control", "Shift", "PageDown"]);

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 10, 1, 0, 0, 0)));
			});
	});

	it("Page up/down increments/decrements the year value in the month picker", () => {
		const date = new Date(Date.UTC(2000, 9, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.realClick();

		cy.focused().realPress("F4");
		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1999, 9, 1, 0, 0, 0)));
			});

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
			});
	});

	it("Page up/down increments/decrements the year range in the year picker", () => {
		const date = new Date(Date.UTC(2000, 9, 1, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.realClick()
			.should("have.focus");

		cy.focused().realPress(["Shift", "F4"]);
		
		// Wait for focus to settle before proceeding
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find("[tabindex='0']")
			.should("have.focus");
		
		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1980, 9, 1, 0, 0, 0)));
			});

		// Wait for focus to settle before proceeding
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find("[tabindex='0']")
			.should("have.focus");

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2000, 9, 1, 0, 0, 0)));
			});
	});

	it("Navigation with Page down decrements the year ranges in the year range picker", () => {
		const date = new Date(Date.UTC(1998, 9, 16, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.ui5CalendarShowYearRangePicker();

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1998, 9, 16, 0, 0, 0)));
			});

		// Wait for focus to settle before proceeding
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearrangepicker]")
			.shadow()
			.find("[tabindex='0']")
			.should("have.focus");

		cy.focused().realPress("PageUp");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1838, 9, 16, 0, 0, 0)));
			});
	});

	it("Navigation with Page up increments the year ranges in the year range picker", () => {
		const date = new Date(Date.UTC(1998, 9, 16, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.ui5CalendarShowYearRangePicker();

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(1998, 9, 16, 0, 0, 0)));
			});

		// Wait for focus to settle before proceeding
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearrangepicker]")
			.shadow()
			.find("[tabindex='0']")
			.should("have.focus");

		cy.focused().realPress("PageDown");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "timestamp")
			.then(_timestamp => {
				expect(new Date(_timestamp * 1000)).to.deep.equal(new Date(Date.UTC(2158, 9, 16, 0, 0, 0)));
			});
	});

	it("Calendar with 'Multiple' selection type", () => {
		cy.mount(<Calendar id="calendar1" selectionMode="Multiple"></Calendar>);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		const timestamps = [971136000, 971222400, 971308800];

		timestamps.forEach(_timestamp => {
			cy.ui5CalendarGetDay("#calendar1", _timestamp.toString())
				.as("date");

			cy.get("@date").realClick();
			cy.get("@date").should("have.class", "ui5-dp-item--selected");
		});

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "selectedDates")
			.then(selectedDates => {
				expect(selectedDates.sort()).to.deep.equal(timestamps.sort());
			});
	});

	it("Keyboard navigation works properly, when calendar selection type is set to 'Multiple'", () => {
		cy.mount(<Calendar id="calendar1" selectionMode="Multiple"></Calendar>);

		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.ui5CalendarGetDay("#calendar1", timestamp.toString())
			.focus()
			.should("have.focus");

		// Select the focused date
		cy.focused().realPress("Space");

		// Deselect the focused date
		cy.focused().realPress("Space");
		cy.focused().realPress("ArrowRight");

		cy.ui5CalendarGetDay("#calendar1", "971222400")
			.should("have.focus");
	});

	it("Calendar with 'Range' selection type", () => {
		cy.mount(<Calendar id="calendar1" selectionMode="Range"></Calendar>);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		const timestamps = [971740800, 971827200, 971913600];

		cy.ui5CalendarGetDay("#calendar1", timestamps[0].toString())
			.realClick();

		cy.ui5CalendarGetDay("#calendar1", timestamps[2].toString())
			.realClick();

		cy.ui5CalendarGetDay("#calendar1", timestamps[0].toString())
			.should("have.class", "ui5-dp-item--selected");

		cy.ui5CalendarGetDay("#calendar1", timestamps[1].toString())
			.should("have.class", "ui5-dp-item--selected-between");

		cy.ui5CalendarGetDay("#calendar1", timestamps[2].toString())
			.should("have.class", "ui5-dp-item--selected");

		cy.get<Calendar>("#calendar1")
			.invoke("prop", "selectedDates")
			.then(selectedDates => {
				expect(selectedDates.sort()).to.deep.equal([timestamps[0], timestamps[2]].sort());
			});
	});

	it("Previous and next buttons are disabled when necessary", () => {
		cy.mount(<>
			<Calendar id="calendar1" formatPattern="dd/MM/yyyy" minDate="7/7/2020" maxDate="20/10/2020">
				<CalendarDate value="08/07/2020"></CalendarDate>
			</Calendar>
		</>);
		const timestamp = 1594166400;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.should("have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.should("not.have.class", "ui5-calheader-arrowbtn-disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.should("have.class", "ui5-calheader-arrowbtn-disabled");
	});

	it("Second month and year are rendered in the header", () => {
		cy.mount(<Calendar id="calendar1" primaryCalendarType="Islamic" secondaryCalendarType="Gregorian"></Calendar>);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month] > span")
			.should("have.length", 2);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year] > span")
			.should("have.length", 2);
	});

	it("Buttons for month and year in header are rendered with correct value", () => {
		cy.mount(<Calendar id="calendar1" primaryCalendarType="Islamic" secondaryCalendarType="Gregorian"></Calendar>);
		const timestamp = new Date(Date.UTC(2000, 9, 10, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.find("span")
			.should(spans => {
				expect(spans[0].textContent).to.equal("Rajab");
				expect(spans[1].textContent).to.equal("Sep – Oct");
			});

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.find("span")
			.then(spans => {
				expect(spans[0].textContent).to.equal("1421 AH");
				expect(spans[1].textContent).to.equal("2000");
			});
	});

	it("Calendar render two type for Month when MonthPicker is opened", () => {
		cy.mount(<Calendar id="calendar1" primaryCalendarType='Islamic' secondaryCalendarType='Gregorian'></Calendar>);
		const timestamp = new Date(Date.UTC(2000, 0, 1, 0, 0, 0)).valueOf() / 1000;

		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find(".ui5-mp-item")
			.first()
			.find("span")
			.should("have.length", 2)
			.then(spans => {
				expect(spans[0]).to.have.text("Muharram");
				expect(spans[1]).to.have.text("Apr – May");
			});
	});

	it("Calendar renders secondary type for Year when Year Picker is opened", () => {
		cy.mount(
			<Calendar 
				primaryCalendarType='Islamic' 
				secondaryCalendarType='Gregorian'
				formatPattern="yyyy-MM-dd"
			>
				<CalendarDate value="1416-01-01"></CalendarDate>
			</Calendar>);


		cy.get<Calendar>("[ui5-calendar]")
			.as("calendar");

		cy.get<Calendar>("@calendar")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearpicker]")
			.as("yearPicker");

		cy.get<YearPicker>("@yearPicker")
			.shadow()
			.find(".ui5-yp-item")
			.should("have.length", 8)
			.first()
			.as("yearPickerItem");

		cy.get("@yearPickerItem")
			.find("span")
			.should("have.length", 2)
			.then(spans => {
				expect(spans[0]).to.have.text("1414 AH");
				expect(spans[1]).to.have.text("1993 - 1994");
			});
	}); 

	it("Calendar renders secondary type for Year Range Picker", () => {
		cy.mount(
			<Calendar
				primaryCalendarType='Islamic'
				secondaryCalendarType='Gregorian'
				formatPattern="yyyy-MM-dd"
			>
				<CalendarDate value="1416-01-01"></CalendarDate>
			</Calendar>
		);

		cy.get<Calendar>("[ui5-calendar]")
			.as("calendar");

		cy.get<Calendar>("@calendar")
			.ui5CalendarShowYearRangePicker();

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearrangepicker]")
			.as("yearRangePicker");

		cy.get<YearRangePicker>("@yearRangePicker")
			.shadow()
			.find(".ui5-yrp-item")
			.should("have.length", 8)
			.first()
			.as("yearRangePickerItem");

		cy.get("@yearRangePickerItem")
			.find("span")
			.should("have.length", 2)
			.then(spans => {
				expect(spans[0]).to.have.text("1398 AH - 1405 AH");
				expect(spans[1]).to.have.text("1977 - 1984");
			});
	});

	it("Min and max dates are set without format-pattern by using ISO (yyyy-MM-dd) format", () => {
		const maxDate = new Date(Date.UTC(2024, 9, 4, 0, 0, 0)).toISOString().split("T")[0];
		cy.mount(<Calendar id="calendar1" maxDate={maxDate}></Calendar>);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.eq(11) // year 2025
			.should("have.class", "ui5-yp-item--disabled");
	});

	it("Min and max dates are NOT set without format-pattern, because are not in ISO format (yyyy-MM-dd)", () => {
		const maxDate = new Date(Date.UTC(2024, 9, 4, 0, 0, 0)).toString();
		cy.mount(<Calendar id="calendar1" maxDate={maxDate} minDate="25.10.2018"></Calendar>);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.eq(3) // year 2016
			.should("not.have.class", "ui5-yp-item--disabled");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.eq(10) // year 2024
			.should("not.have.class", "ui5-yp-item--disabled");
	});

	it("Year Ranges outside of the min and max dates are disabled", () => {
		cy.mount(
			<Calendar
				minDate="1998-01-01"
				maxDate="2022-01-04"
				formatPattern="yyyy-MM-dd"
			>
				<CalendarDate value="2012-01-01"></CalendarDate>
			</Calendar>
		);

		cy.get<Calendar>("[ui5-calendar]")
			.as("calendar");

		cy.get<Calendar>("@calendar")
			.ui5CalendarShowYearRangePicker();

		cy.get<Calendar>("@calendar")
			.shadow()
			.find("[ui5-yearrangepicker]")
			.as("yearRangePicker");

		cy.get<YearRangePicker>("@yearRangePicker")
			.shadow()
			.find(".ui5-yrp-item")
			.as("yearRangePickerItems");

		cy.get("@yearRangePickerItems")
			.should("have.length", 8);

		// Only the first 2 items are enabled (1998-2017 and 2018-2037)
		cy.get("@yearRangePickerItems")
			.first() // 1998-2017
			.as("firstItem");

		cy.get("@firstItem")
			.should("not.have.class", "ui5-yrp-item--disabled");

		cy.get("@yearRangePickerItems")
			.first() // 2018-2037
			.as("firstItem");

		cy.get("@firstItem")
			.should("not.have.class", "ui5-yrp-item--disabled");

		cy.get("@yearRangePickerItems")
			.eq(1) // 2038-2057
			.as("secondItem");

		cy.get("@secondItem")
			.should("not.have.class", "ui5-yrp-item--disabled");

		cy.get("@yearRangePickerItems")
			.eq(2) // 2003 - 2022
			.as("thirdItem");

		cy.get("@thirdItem")
			.should("have.class", "ui5-yrp-item--disabled");
	});

	it("Focus goes into first selected day of the range selection", () => {
		cy.mount(
			<Calendar id="calendar1" primaryCalendarType="Gregorian" secondaryCalendarType="Gregorian" selectionMode="Range">
				<CalendarDateRange startValue="Jan 20, 2021" endValue="Jan 30, 2021"></CalendarDateRange>
			</Calendar>);

		const timestamp = new Date(Date.UTC(2021, 0, 20, 0, 0, 0)).valueOf() / 1000; // 1611100800

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.realClick();

		cy.ui5CalendarGetMonth("#calendar1", timestamp.toString())
			.realClick();

		cy.ui5CalendarGetDay("#calendar1", timestamp.toString())
			.should("have.focus");
	});

	it("Special date respects format-pattern given to the calendar", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="ddMMyyyy" minDate="01072020" maxDate="21102020">
				<SpecialCalendarDate slot="specialDates" type="Type01" value="07102020"></SpecialCalendarDate>
			</Calendar>);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-root")
			.find("div[data-ui5-special-day]")
			.should("have.length", 1);
	});

	it("Disabled date range prevents selection of dates within the range", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="yyyy-MM-dd">
				<CalendarDateRange slot="disabledDates" startValue="2024-11-10" endValue="2024-11-15"></CalendarDateRange>
			</Calendar>
		);

		const timestamp = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		// Check that disabled dates have the correct class and aria-disabled attribute
		const disabledDate = new Date(Date.UTC(2024, 10, 12, 0, 0, 0)).valueOf() / 1000;
		
		cy.ui5CalendarGetDay("#calendar1", disabledDate.toString())
			.should("have.class", "ui5-dp-item--disabled")
			.should("have.attr", "aria-disabled", "true");

		// Try to click on a disabled date
		cy.ui5CalendarGetDay("#calendar1", disabledDate.toString())
			.realClick();

		// Verify the date was not selected
		cy.get<Calendar>("#calendar1")
			.invoke("prop", "selectedDates")
			.should("have.length", 0);
	});

	it("Disables a single date equal to start date when end date is not defined", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="yyyy-MM-dd" maxDate="2024-11-20">
				<CalendarDateRange slot="disabledDates" startValue="2024-11-15"></CalendarDateRange>
			</Calendar>
		);

		const timestamp = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		// Date before start should be enabled
		const enabledDate = new Date(Date.UTC(2024, 10, 14, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", enabledDate.toString())
			.should("not.have.class", "ui5-dp-item--disabled");

		// Date at start should be disabled
		const startDate = new Date(Date.UTC(2024, 10, 15, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", startDate.toString())
			.should("have.class", "ui5-dp-item--disabled");

		// Date after start should not be disabled
		const afterStartDate = new Date(Date.UTC(2024, 10, 17, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", afterStartDate.toString())
			.should("not.have.class", "ui5-dp-item--disabled");
	});

	it("Disables all dates before end date when start date is not defined", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="yyyy-MM-dd" minDate="2024-11-01">
				<CalendarDateRange slot="disabledDates" endValue="2024-11-10"></CalendarDateRange>
			</Calendar>
		);

		const timestamp = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		// Date after end should be enabled
		const enabledDate = new Date(Date.UTC(2024, 10, 11, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", enabledDate.toString())
			.should("not.have.class", "ui5-dp-item--disabled");

		// Date at end should not be disabled
		const endDate = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", endDate.toString())
			.should("not.have.class", "ui5-dp-item--disabled");

		// Date before end should be disabled
		const beforeEndDate = new Date(Date.UTC(2024, 10, 8, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", beforeEndDate.toString())
			.should("have.class", "ui5-dp-item--disabled");
	});

	it("Multiple disabled date ranges work correctly", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="yyyy-MM-dd">
				<CalendarDateRange slot="disabledDates" startValue="2024-11-05" endValue="2024-11-07"></CalendarDateRange>
				<CalendarDateRange slot="disabledDates" startValue="2024-11-15" endValue="2024-11-17"></CalendarDateRange>
			</Calendar>
		);

		const timestamp = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		// First range - should be disabled
		const firstRangeDate = new Date(Date.UTC(2024, 10, 6, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", firstRangeDate.toString())
			.should("have.class", "ui5-dp-item--disabled");

		// Between ranges - should be enabled
		const betweenDate = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", betweenDate.toString())
			.should("not.have.class", "ui5-dp-item--disabled");

		// Second range - should be disabled
		const secondRangeDate = new Date(Date.UTC(2024, 10, 16, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", secondRangeDate.toString())
			.should("have.class", "ui5-dp-item--disabled");
	});

	it("Disabled dates respect format pattern", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="dd/MM/yyyy">
				<CalendarDateRange slot="disabledDates" startValue="10/11/2024" endValue="15/11/2024"></CalendarDateRange>
			</Calendar>
		);

		const timestamp = new Date(Date.UTC(2024, 10, 10, 0, 0, 0)).valueOf() / 1000;
		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		// Check disabled date
		const disabledDate = new Date(Date.UTC(2024, 10, 12, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", disabledDate.toString())
			.should("have.class", "ui5-dp-item--disabled");
	});

	it("Disabled dates work with range selection mode", () => {
		cy.mount(
			<Calendar id="calendar1" formatPattern="yyyy-MM-dd" selectionMode="Range">
				<CalendarDateRange slot="disabledDates" startValue="2024-11-10" endValue="2024-11-15"></CalendarDateRange>
			</Calendar>
		);

		const timestamp = new Date(Date.UTC(2024, 10, 5, 0, 0, 0)).valueOf() / 1000;
		cy.get<Calendar>("#calendar1").invoke("prop", "timestamp", timestamp);

		// Try to select a range that includes disabled dates
		const validStartDate = new Date(Date.UTC(2024, 10, 8, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", validStartDate.toString())
			.realClick();

		// Try to select an end date in the disabled range
		const disabledEndDate = new Date(Date.UTC(2024, 10, 12, 0, 0, 0)).valueOf() / 1000;
		cy.ui5CalendarGetDay("#calendar1", disabledEndDate.toString())
			.realClick();

		// The disabled date should not be selectable
		cy.get<Calendar>("#calendar1")
			.invoke("prop", "selectedDates")
			.should("have.length", 1); // Only the first date should be selected
	});

	it("Check calendar week numbers with specific CalendarWeekNumbering configuration", () => {
		cy.mount(getCalendarsWithWeekNumbers());

		// Check first week number in ISO_8601 calendar
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-weekname")
			.first()
			.should("have.text", "52");

		// Check first week number in MiddleEastern calendar
		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-weekname")
			.first()
			.should("have.text", "1");

		// Check first week number in WesternTraditional calendar
		cy.get<Calendar>("#calendar3")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-weekname")
			.first()
			.should("have.text", "1");
	});

	it("Check calendar week day names with specific CalendarWeekNumbering configuration", () => {
		cy.mount(getCalendarsWithWeekNumbers());
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Mon");

		cy.get<Calendar>("#calendar2")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sat");

		cy.get<Calendar>("#calendar3")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sun");
	});
});

describe("Calendar accessibility", () => {
	it("Should have proper aria-label attributes on header buttons", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Check month button aria-label
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-label")
			.and("contain", "Month November");

		// Check year button aria-label
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-label")
			.and("contain", "Year 2000");
	});

	it("Should have proper aria-description attributes on header buttons", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Check month button aria-description
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-description")
			.and("contain", "Month November");

		// Check year button aria-description  
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-description")
			.and("contain", "Year 2000");
	});

	it("Should have proper title (tooltip) attributes on header buttons", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Check month button title includes both label and shortcut
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "title")
			.and("contain", "Month November")
			.and("contain", "(F4)");

		// Check year button title includes both label and shortcut
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "title")
			.and("contain", "Year 2000")
			.and("contain", "(Shift + F4)");
	});

	it("Should have proper aria-keyshortcuts attributes on header buttons", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Check month button keyboard shortcut
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-keyshortcuts", "F4");

		// Check year button keyboard shortcut
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-keyshortcuts", "Shift + F4");
	});

	it("Should have proper accessibility attributes on year range button when visible", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		// Navigate to year picker first to make year range button visible
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[data-ui5-cal-header-btn-year]")
			.realClick();

		// Now check year range button accessibility attributes
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.find("[data-ui5-cal-header-btn-year-range]")
			.as("yearRangeBtn");

		// Check aria-label for year range
		cy.get("@yearRangeBtn")
			.should("have.attr", "aria-label")
			.and("contain", "Year range from")
			.and("contain", "1991")
			.and("contain", "to")
			.and("contain", "2010");

		// Check aria-description for year range
		cy.get("@yearRangeBtn")
			.should("have.attr", "aria-description")
			.and("contain", "Year range from")
			.and("contain", "1991")
			.and("contain", "to")
			.and("contain", "2010");

		// Check title includes both label and shortcut
		cy.get("@yearRangeBtn")
			.should("have.attr", "title")
			.and("contain", "Year range from")
			.and("contain", "1991")
			.and("contain", "to")
			.and("contain", "2010")
			.and("contain", "(Shift + F4)");

		// Check keyboard shortcut
		cy.get("@yearRangeBtn")
			.should("have.attr", "aria-keyshortcuts", "Shift + F4");
	});

	it("Should update accessibility attributes when navigating between different months", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0)); // November 2000
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Initial check - November 2000
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-label")
			.and("contain", "Month November");

		// Navigate to next month
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-next]")
			.realClick();

		// Check updated aria-label - December 2000
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-label")
			.and("contain", "Month December");

		// Navigate to previous month twice
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-prev]")
			.realClick()
			.realClick();

		// Check updated aria-label - October 2000
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-label")
			.and("contain", "Month October");
	});

	it("Should update accessibility attributes when navigating between different years", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0)); // November 2000
		cy.mount(getDefaultCalendar(date));

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Initial check - Year 2000
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-label")
			.and("contain", "Year 2000");

		// Navigate to day picker and use keyboard shortcuts to change year
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.realClick()
			.realPress(["Shift", "PageDown"]); // Next year

		// Check updated aria-label - Year 2001
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-label")
			.and("contain", "Year 2001");

		// Navigate back one year
		cy.focused()
			.realPress(["Shift", "PageUp"]); // Previous year

		// Check updated aria-label - Year 2000
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-label")
			.and("contain", "Year 2000");
	});

	it("Should maintain accessibility attributes consistency between primary and secondary calendar types", () => {
		const date = new Date(Date.UTC(2000, 10, 22, 0, 0, 0)); 
		cy.mount(
			<Calendar id="calendar1" timestamp={date.valueOf() / 1000} formatPattern="dd/MM/yyyy" primaryCalendarType="Gregorian" secondaryCalendarType="Islamic">
				<CalendarDate value="22/11/2000"></CalendarDate>
			</Calendar>
		);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find(".ui5-calheader")
			.as("calheader");

		// Check that month button still has proper aria-label with dual calendar
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "aria-label")
			.and("contain", "Month");

		// Check that year button still has proper aria-label with dual calendar
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "aria-label")
			.and("contain", "Year");

		// Verify tooltips still contain shortcuts
		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-month]")
			.should("have.attr", "title")
			.and("contain", "(F4)");

		cy.get("@calheader")
			.find("[data-ui5-cal-header-btn-year]")
			.should("have.attr", "title")
			.and("contain", "(Shift + F4)");
	});

	it("Should have proper aria-labels for range selection dates (First, Between, Last)", () => {
		// Mount calendar with predefined range selection (Jan 20-22, 2021) similar to Calendar.html
		cy.mount(
			<Calendar id="calendar1" selectionMode="Range" formatPattern="MMM dd, yyyy">
				<CalendarDateRange startValue="Jan 20, 2021" endValue="Jan 22, 2021"></CalendarDateRange>
			</Calendar>
		);

		// Find all selected day cells using the part attribute
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[part*='day-cell-selected']")
			.as("selectedDays");

		// Should have exactly 3 selected days (Jan 20, 21, 22)
		cy.get("@selectedDays")
			.should("have.length", 3);

		// Get the selected days and verify their aria-labels
		cy.get("@selectedDays").each(($day, index) => {
			cy.wrap($day).should("have.attr", "aria-label");
			
			if (index === 0) {
				// First day should contain "First date of range"
				cy.wrap($day)
					.should("have.attr", "aria-label")
					.and("contain", "First date of range");
			} else if (index === 1) {
				// Middle day should contain "in a selected range"
				cy.wrap($day)
					.should("have.attr", "aria-label")
					.and("contain", "in a selected range");
			} else if (index === 2) {
				// Last day should contain "Last date of range"
				cy.wrap($day)
					.should("have.attr", "aria-label")
					.and("contain", "Last date of range");
			}
		});
	});
});

describe("Day Picker Tests", () => {
	it.skip("Select day with Space", () => {	
		cy.mount(<Calendar id="calendar1"></Calendar>);
		
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-item--now")
			.as("today");
		
		cy.get("@today")
			.realClick()
			.should("be.focused")
			.realPress("ArrowRight")
			.realPress("Space");
		
		cy.focused()
			.invoke("attr", "data-sap-timestamp")
			.then(timestampAttr => {
				const timestamp = parseInt(timestampAttr!);
				const selectedDate = new Date(timestamp * 1000).getDate();
				const expectedDate = new Date(Date.now() + 24 * 3600 * 1000).getDate();
				expect(selectedDate).to.eq(expectedDate);
			});
		
		cy.get<Calendar>("#calendar1")
			.should(($calendar) => {
				const selectedDates = $calendar.prop("selectedDates");
				expect(selectedDates).to.have.length.greaterThan(0);
			});
	});

	it("Select day with Enter", () => {
		const today = new Date();
		const tomorrow = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0) / 1000);

		cy.mount(<Calendar id="calendar1"></Calendar>);
		
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-item--now")
			.realClick();

		// Wait for focus to settle before proceeding
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find("[tabindex='0']")
			.should("have.focus");

		cy.get<Calendar>("#calendar1")
			.realPress("ArrowRight");

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(`[data-sap-timestamp='${tomorrow}']`)
			.should("have.focus");

		cy.get<Calendar>("#calendar1")
			.realPress("Enter");

		// assert the date after today is selected
		cy.get<Calendar>("#calendar1")
			.should(($calendar) => {
				const selectedDates = $calendar.prop("selectedDates");
				expect(selectedDates).to.include(tomorrow);
			});
	});

	it("Day names are correctly displayed", () => {
		cy.mount(<Calendar id="calendar1"></Calendar>);
		
		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sun"); // English default
	});

	it("Day names container has proper structure", () => {
		cy.mount(<Calendar id="calendar1"></Calendar>);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-days-names-container")
			.should("exist")
			.find("[role='columnheader']")
			.should("have.length", 8);
	});

	it("Arrow navigation works in day picker", () => {
		const date = new Date(Date.UTC(2000, 10, 15, 0, 0, 0));
		cy.mount(getDefaultCalendar(date));

		const timestamp = new Date(Date.UTC(2000, 10, 15, 0, 0, 0)).valueOf() / 1000;
		const nextDayTimestamp = new Date(Date.UTC(2000, 10, 16, 0, 0, 0)).valueOf() / 1000;

		cy.ui5CalendarGetDay("#calendar1", timestamp.toString())
			.realClick()
			.should("have.focus");

		cy.focused().realPress("ArrowRight");

		cy.ui5CalendarGetDay("#calendar1", nextDayTimestamp.toString())
			.should("have.focus");

		cy.focused().realPress("ArrowLeft");

		cy.ui5CalendarGetDay("#calendar1", timestamp.toString())
			.should("have.focus");
	});

	it("Today's date is highlighted correctly", () => {
		cy.mount(<Calendar id="calendar1"></Calendar>);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-item--now")
			.should("exist")
			.and("be.visible")
			.invoke("attr", "data-sap-timestamp")
			.then(timestampAttr => {
				const timestamp = parseInt(timestampAttr!);
				const todayFromTimestamp = new Date(timestamp * 1000);
				const actualToday = new Date();
				
				expect(todayFromTimestamp.getDate()).to.equal(actualToday.getDate());
				expect(todayFromTimestamp.getMonth()).to.equal(actualToday.getMonth());
				expect(todayFromTimestamp.getFullYear()).to.equal(actualToday.getFullYear());
			});
	});
});

describe("Calendar Global Configuration", () => {
	it("Should respect firstDayOfWeek from global formatSettings configuration", () => {
		const configurationObject = {
			"formatSettings": {
				"firstDayOfWeek": 6  // Saturday
			}
		};

		cy.window()
			.then($el => {
				const scriptElement = $el.document.createElement("script");
				scriptElement.type = "application/json";
				scriptElement.setAttribute("data-ui5-config", "true");
				scriptElement.innerHTML = JSON.stringify(configurationObject);
				$el.document.head.appendChild(scriptElement);
			});

		cy.wrap({ resetConfiguration })
			.invoke("resetConfiguration", true);

		cy.wrap({ getFirstDayOfWeek })
			.invoke("getFirstDayOfWeek")
			.should("equal", 6);

		const date = new Date(Date.UTC(2023, 0, 1, 0, 0, 0)); // January 1, 2023
		cy.mount(<Calendar id="calendar1" timestamp={date.valueOf() / 1000} calendarWeekNumbering="Default" />);

		cy.get<Calendar>("#calendar1")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-firstday")
			.first()
			.should("have.text", "Sat");
	});
});
