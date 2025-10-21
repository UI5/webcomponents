import "../../src/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import DateRangePicker from "../../src/DateRangePicker.js";
import Label from "../../src/Label.js";

type DateTimePickerTemplateOptions = Partial<{
	formatPattern: string;
	delimiter: string;
	onChange: () => void;
	value: string;
	minDate: string;
	maxDate: string;
}>

function DateRangePickerTemplate(options: DateTimePickerTemplateOptions) {
	return <DateRangePicker {...options} />
}

describe("DateRangePicker general interaction", () => {
	it("Custom Validation Error", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("invalid input");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "invalid input")

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "Negative");

		cy.get("@dateRangePicker")
			.shadow()
			.find("[slot='header']")
			.first()
			.should("have.text", "Invalid entry");
	});

	it("Custom Validation None", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("09/09/2020 - 10/10/2020");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "09/09/2020 - 10/10/2020")

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "None");
	});

	it("custom formatting", () => {
		cy.mount(<DateRangePicker displayFormat="dd/MM/yyyy" valueFormat="yyyy-MM-dd"></DateRangePicker>);

		cy.get("[ui5-daterange-picker]")
			.as("dateRangePicker");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realType("05/05/2018 - 06/06/2018")
			.realPress("Enter");

		cy.get("@dateRangePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value", "05/05/2018 - 06/06/2018");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "2018-05-05 - 2018-06-06");
	});

	it("Selected dates are updated after value update in the input field", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		const timestamp_9_Sep_2020 = 1599609600;

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("09/09/2020 - 10/10/2020");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "09/09/2020 - 10/10/2020")

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-daypicker]")
			.should("have.attr", "timestamp", timestamp_9_Sep_2020.toString());
	});

	it("Is delimiter set", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="MMM d, y" delimiter="@" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("Feb 25, 2022 @ Feb 28, 2022");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "Feb 25, 2022 @ Feb 28, 2022")

		cy.get<DateRangePicker>("@dateRangePicker")
			.invoke("attr", "delimiter", "###");

		cy.get<DateRangePicker>("@dateRangePicker")
			.should("have.attr", "value", "Feb 25, 2022 ### Feb 28, 2022");
	});

	it("startDateValue and endDateValue getter", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("27/09/2019 - 10/10/2019")

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "27/09/2019 - 10/10/2019")

		cy.get<DateRangePicker>("@dateRangePicker")
			.then($datePicker => {
				cy.wrap({
					startDateValue: () => $datePicker[0].startDateValue,
					endDateValue: () => $datePicker[0].endDateValue
				})
					.as("dates")
					.invoke("startDateValue")
					.should(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp)).to.deep.equal(new Date(2019, 8, 27));
					});

				cy.get("@dates")
					.invoke("endDateValue")
					.should(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp as number)).to.deep.equal(new Date(2019, 9, 10));
					});
			});
	});

	it("Setting the same date for first & last is possible", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("05/08/2020 - 05/08/2020");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "05/08/2020 - 05/08/2020");

		cy.get<DateRangePicker>("@dateRangePicker")
			.then($el => {
				cy.wrap({
					startDateValue: () => $el[0].startDateValue,
					endDateValue: () => $el[0].endDateValue
				})
					.as("dates")
					.invoke("startDateValue")
					.should(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp)).to.deep.equal(new Date(2020, 7, 5));
					});

				cy.get("@dates")
					.invoke("endDateValue")
					.should(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp as number)).to.deep.equal(new Date(2020, 7, 5));
					});
			});
	});

	it("Change event fired once", () => {
		cy.mount(<DateRangePickerTemplate onChange={cy.stub().as("changeStub")} />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-root .ui5-dp-content div > .ui5-dp-item")
			.as("items")
			.eq(5)
			.as("dayOne");

		cy.get("@items")
			.eq(15)
			.as("dayTwo");

		cy.get("@dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get("@dayOne").realClick();
		cy.get("@dayTwo").realClick();

		cy.get("@changeStub").should("be.calledOnce");
	});

	it("Page up/down increments/decrements the day value", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="MMM d, y" value="Jul 16, 2020 @ Jul 29, 2020" delimiter="@" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("input")
			.realClick()
			.should("be.focused");

		cy.realPress("End")
		// TODO: Carret position need to be checked somehow before triggering next action
		cy.wait(100);

		cy.realPress("PageDown");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 28, 2020");

		cy.realPress("PageUp");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");

		cy.realPress("Home");
		// TODO: Carret position need to be checked somehow before triggering next action
		cy.wait(100);

		cy.realPress("PageDown");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 15, 2020 @ Jul 29, 2020");

		cy.realPress("PageUp");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements the month value", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="MMM d, y" value="Jul 16, 2020 @ Jul 29, 2020" delimiter="@" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("input")
			.realClick()
			.should("be.focused");

		cy.realPress("End")

		cy.realPress(["Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Aug 29, 2020");

		cy.realPress(["Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");

		cy.realPress("Home");

		cy.realPress(["Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jun 16, 2020 @ Jul 29, 2020");

		cy.realPress(["Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Page up/down increments/decrements the year value", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="MMM d, y" value="Jul 16, 2020 @ Jul 29, 2020" delimiter="@" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.as("input")
			.realClick()
			.should("be.focused");

		cy.realPress("End");

		cy.realPress(["Control", "Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2021");

		cy.realPress(["Control", "Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");

		cy.realPress("Home");

		cy.realPress(["Control", "Shift", "PageDown"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2019 @ Jul 29, 2020");

		cy.realPress(["Control", "Shift", "PageUp"]);

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 29, 2020");
	});

	it("Enter keyboard key confirms the date range in the input field", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="MMM d, y" delimiter="@" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("Jul 17, 2020 @ Jul 16, 2020");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Focus out of the input field confirms the date range", () => {
		cy.mount(
			<>
				<DateRangePickerTemplate formatPattern="MMM d, y" delimiter="@" />
				<button>After</button>
			</>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("Jul 17, 2020 @ Jul 16, 2020");

		cy.realPress("Tab");

		cy.get("button")
			.contains("After")
			.should("be.focused");

		cy.get("@dateRangePicker")
			.should("have.attr", "value", "Jul 16, 2020 @ Jul 17, 2020");
	});

	it("Delimiter is part of the format pattern", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="yyyy-MM-dd" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("2020-09-09 - 2020-10-10");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "2020-09-09 - 2020-10-10")

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "None");
	});

	it("Month name changes on next button press", () => {
		cy.mount(<DateRangePickerTemplate value="09/09/2020 - 10/10/2020" formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.as("calendar")
			.shadow()
			.find(".ui5-calheader")
			.as("calendarHeader");

		cy.get("@dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get("@calendarHeader")
			.find("[data-ui5-cal-header-btn-next]")
			.realClick()
			.should("be.visible");

		cy.get("@calendarHeader")
			.find("[data-ui5-cal-header-btn-month]")
			.as("monthButton")
			.should("have.text", "October");
	});

	it("startDateValue and endDateValue getters when only start date is present", () => {
		cy.mount(<DateRangePickerTemplate value="27/09/2019" formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.then($datePicker => {
				cy.wrap({
					startDateValue: () => $datePicker[0].startDateValue,
					endDateValue: () => $datePicker[0].endDateValue
				})
					.as("dates")
					.invoke("startDateValue")
					.should(date => {
						const timestamp = date ? date.getTime() : new Date().getTime();
						expect(new Date(timestamp)).to.deep.equal(new Date(2019, 8, 27));
					});

				cy.get("@dates")
					.invoke("endDateValue")
					.should(date => {
						expect(date.toString()).to.be.equal("Invalid Date");
					});
			});
	});

	it("Min and max dates are set without format-pattern by using ISO (yyyy-MM-dd) format", () => {
		cy.wrap({ setLanguage })
			.then(api => {
				return api.setLanguage("bg");
			})

		cy.mount(<DateRangePickerTemplate minDate="2023-02-10" maxDate="2023-07-22" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.shadow()
			.find("input")
			.realClick()
			.should("be.focused");

		cy.realType("10.02.2023 - 25.07.2023");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.attr", "value-state", "Negative");
	});

	it("Should open month picker if format-pattern is 'MM.yyyy'", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="MM.yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get("@dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-monthpicker]")
			.should("exist")
			.and("be.visible");
	});

	it("Select month range in MonthPicker", () => {
		cy.wrap({ setLanguage })
			.then(api => {
				return api.setLanguage("en");
			})

		cy.mount(<DateRangePickerTemplate formatPattern="MM.yyyy" />);

		// TODO: Remove when focus is applied on month, day, year picker in their onAfterRendering method. It takes the focus one they are rendered even if not visible
		cy.wait(500);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()

		cy.get("@dateRangePicker")
			.should("be.focused");

		cy.realType("09.2024 - 11.2024");

		cy.realPress("Enter");

		cy.get("@dateRangePicker")
			.should("have.value", "09.2024 - 11.2024")

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-monthpicker]")
			.shadow()
			.find(".ui5-mp-root .ui5-mp-item")
			.should(months => {
				const startSelectionMonth = months[8];
				const monthInBetween = months[9];
				const endSelectionMonth = months[10];

				expect(startSelectionMonth).to.have.class("ui5-mp-item--selected");
				expect(monthInBetween).to.have.class("ui5-mp-item--selected-between");
				expect(endSelectionMonth).to.have.class("ui5-mp-item--selected");
			});
	});

	it("Should open year picker if format-pattern is 'yyyy'", () => {
		cy.mount(<DateRangePickerTemplate formatPattern="yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get("@dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-yearpicker]")
			.should("exist")
			.and("be.visible");
	});

	it("Select year range in YearPicker", () => {
		cy.wrap({ setLanguage })
			.then(api => {
				return api.setLanguage("en");
			})

		cy.mount(<DateRangePickerTemplate formatPattern="yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("0001 - 0006");

		cy.realPress("Enter");

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.should("have.value", "0001 - 0006")

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-yearpicker]")
			.shadow()
			.find(".ui5-yp-root .ui5-yp-item")
			.should(years => {
				const startSelectionYear = years[0];
				const yearInBetween = years[4];
				const endSelectionYear = years[5];

				expect(startSelectionYear).to.have.class("ui5-yp-item--selected");
				expect(yearInBetween).to.have.class("ui5-yp-item--selected-between");
				expect(endSelectionYear).to.have.class("ui5-yp-item--selected");
			});
	});
});

describe("Accessibility", () => {
	it("Picker popover accessible name", () => {
		const LABEL = "Deadline";
		cy.mount(<DateRangePicker accessible-name={LABEL}></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get("@dateRangePicker")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "accessible-name", `Choose Date Range for ${LABEL}`);
	});

	it("Picker popover accessible name with external label", () => {
		const LABEL = "Deadline";
		cy.mount(<>
			<Label for="dateRangePicker">{LABEL}</Label>
			<DateRangePicker id="dateRangePicker"></DateRangePicker>
		</>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get("@dateRangePicker")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("have.attr", "accessible-name", `Choose Date Range for ${LABEL}`);
	});

	it("accessibleDescription property", () => {
		const DESCRIPTION = "Some description";
		cy.mount(<DateRangePicker accessibleDescription={DESCRIPTION}></DateRangePicker>);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.ui5DatePickerGetInnerInput()
			.should("have.attr", "aria-describedby", "descr");

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.shadow()
			.find("[ui5-datetime-input]")
			.shadow()
			.find("span#descr")
			.should("have.text", DESCRIPTION);
	});

	it("accessibleDescriptionRef property", () => {
		const DESCRIPTION = "External description";
		cy.mount(
			<>
				<p id="descr">{DESCRIPTION}</p>
				<DateRangePicker accessibleDescriptionRef="descr"></DateRangePicker>
			</>
		);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.shadow()
			.find("[ui5-datetime-input]")
			.shadow()
			.find("input")
			.should("have.attr", "aria-describedby")
			.and("contain", "descr");

		cy.get("#descr").should("have.text", DESCRIPTION);
	});

	it("Selected days: accessibility semantics", () => {
		cy.wrap({ setLanguage })
			.then(api => {
				return api.setLanguage("en");
			})

		cy.mount(<DateRangePickerTemplate formatPattern="dd/MM/yyyy" />);

		cy.get<DateRangePicker>("[ui5-daterange-picker]")
			.as("dateRangePicker")
			.shadow()
			.find("[ui5-datetime-input]")
			.realClick()
			.should("be.focused");

		cy.realType("09/06/2024 - 15/06/2024");

		cy.realPress("Enter")

		cy.get<DateRangePicker>("@dateRangePicker")
			.should("have.value", "09/06/2024 - 15/06/2024");

		cy.realPress("F4");

		cy.get<DateRangePicker>("@dateRangePicker")
			.ui5DateRangePickerExpectToBeOpen()

		cy.get<DateRangePicker>("@dateRangePicker")
			.shadow()
			.find("[ui5-calendar]")
			.shadow()
			.find("[ui5-daypicker]")
			.shadow()
			.find(".ui5-dp-root .ui5-dp-content div > .ui5-dp-item")
			.should(days => {
				const startSelectionDay = days[14];
				const dayInBetween = days[15];
				const endSelectionDay = days[20];

				expect(startSelectionDay).to.have.attr("aria-selected", "true");
				expect(dayInBetween).to.have.attr("aria-selected", "true");
				expect(endSelectionDay).to.have.attr("aria-selected", "true");
			});
	});
});

describe("Validation inside a form", () => {
	it("has correct validity for valueMissing", () => {
		cy.mount(
			<form>
				<DateRangePicker id="dateRangePicker" required formatPattern="dd/MM/yyyy"></DateRangePicker>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#dateRangePicker")
			.as("dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { valueMissing: true },
				validity: { valueMissing: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateRangePicker:invalid")
			.should("exist");

		cy.get("@dateRangePicker")
			.ui5DatePickerTypeDate("09/09/2020 - 10/10/2020");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { valueMissing: false },
				validity: { valueMissing: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateRangePicker:invalid")
			.should("not.exist");
	});

	it("has correct validity for patternMismatch", () => {
		cy.mount(
			<form>
				<DateRangePicker id="dateRangePicker" required formatPattern="dd/MM/yyyy"></DateRangePicker>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#dateRangePicker")
			.as("dateRangePicker")
			.ui5DatePickerTypeDate("invalid input");

		cy.get("#submitBtn")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: true },
				validity: { patternMismatch: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateRangePicker:invalid")
			.should("exist");

		cy.get("@dateRangePicker")
			.ui5DatePickerTypeDate("09/09/2020 - 10/10/2020");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { patternMismatch: false },
				validity: { patternMismatch: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateRangePicker:invalid")
			.should("not.exist");
	});

	it("has correct validity for rangeUnderflow", () => {
		cy.mount(
			<form>
				<DateRangePicker id="dateRangePicker" minDate="10/10/2020" formatPattern="dd/MM/yyyy"></DateRangePicker>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#dateRangePicker")
			.as("dateRangePicker")
			.ui5DatePickerTypeDate("01/10/2020 - 02/10/2020");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: true },
				validity: { rangeUnderflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateRangePicker:invalid")
			.should("exist");

		cy.get("@dateRangePicker")
			.ui5DatePickerTypeDate("11/10/2020 - 12/10/2020");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { rangeUnderflow: false },
				validity: { rangeUnderflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateRangePicker:invalid")
			.should("not.exist");
	});

	it("has correct validity for rangeOverflow", () => {
		cy.mount(
			<form>
				<DateRangePicker id="dateRangePicker" maxDate="10/10/2020" formatPattern="dd/MM/yyyy"></DateRangePicker>
				<button type="submit" id="submitBtn">Submit</button>
			</form>
		);

		cy.get("form").then($form => {
			$form.get(0).addEventListener("submit", (e) => e.preventDefault());
			$form.get(0).addEventListener("submit", cy.stub().as("submit"));
		});

		cy.get("#dateRangePicker")
			.as("dateRangePicker")
			.ui5DatePickerTypeDate("11/10/2020 - 12/10/2020");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: true },
				validity: { rangeOverflow: true, valid: false },
				checkValidity: false,
				reportValidity: false
			});

		cy.get("#dateRangePicker:invalid")
			.should("exist");

		cy.get("@dateRangePicker")
			.ui5DatePickerTypeDate("07/09/2020 - 09/10/2020");

		cy.get("@dateRangePicker")
			.ui5AssertValidityState({
				formValidity: { rangeOverflow: false },
				validity: { rangeOverflow: false, valid: true },
				checkValidity: true,
				reportValidity: true
			});

		cy.get("#dateRangePicker:invalid")
			.should("not.exist");
	});
});