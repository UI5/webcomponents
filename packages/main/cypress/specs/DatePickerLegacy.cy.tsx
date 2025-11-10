import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "../../src/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import "@ui5/webcomponents-base/dist/features/LegacyDateFormats.js";
import DatePicker from "../../src/DatePicker.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";

describe("Legacy date customization and Islamic calendar type", () => {
	const configurationObject = {
		"formatSettings": {
			"legacyDateCalendarCustomizing": [
				{
					"dateFormat": "A",
					"gregDate": "20240211",
					"islamicMonthStart": "14450801"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240311",
					"islamicMonthStart": "14450901"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240410",
					"islamicMonthStart": "14451001"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240509",
					"islamicMonthStart": "14451101"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240607",
					"islamicMonthStart": "14451201"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240707",
					"islamicMonthStart": "14460101"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240805",
					"islamicMonthStart": "14460201"
				},
				{
					"dateFormat": "A",
					"gregDate": "20240904",
					"islamicMonthStart": "14460301"
				},
				{
					"dateFormat": "A",
					"gregDate": "20241004",
					"islamicMonthStart": "14460401"
				},
				{
					"dateFormat": "A",
					"gregDate": "20241103",
					"islamicMonthStart": "14460501"
				},
				{
					"dateFormat": "A",
					"gregDate": "20241202",
					"islamicMonthStart": "14460601"
				}
			]
		}
	};

	beforeEach(() => {
		cy.window()
			.then($el => {
				const scriptElement = document.createElement("script");
				scriptElement.type = "application/json";
				scriptElement.setAttribute("data-ui5-config", "true");
				scriptElement.innerHTML = JSON.stringify(configurationObject);
				$el.document.head.append(scriptElement);
				console.log("=== window object attached", scriptElement.innerHTML)

			})

		cy.wrap({ resetConfiguration })
			.then(({ resetConfiguration }) => {
				resetConfiguration(true);
			});

		cy.wrap({ setLanguage })
			.then(({ setLanguage }) => {
				return setLanguage("en");
			});
	});

	afterEach(() => {
		cy.window()
			.then($el => {
				const scriptElement = $el.document.head.querySelector("script[data-ui5-config]");

				scriptElement?.remove();
			})
	});

	it("Customization of legacy dates in Islamic calendar", () => {
		// According to the Islamic calendar, Rab. I 9, 1446 AH should be displayed on Thursday,
		// but it needs to be configured using the legacyDateCalendarCustomizing setting.
		cy.mount(<DatePicker value="Rab. I 9, 1446 AH" primaryCalendarType="Islamic"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.realClick()
			.should("be.focused")
			.realPress("F4");

		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetDisplayedDay(11)
			.should("have.text", "9");
	});

	it("primary calendar type", () => {
		cy.mount(<DatePicker primaryCalendarType="Islamic"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.shadow()
			.find("ui5-calendar")
			.should("have.attr", "primary-calendar-type", "Islamic");
	});

	it("Islamic calendar type input value", () => {
		cy.mount(<DatePicker primaryCalendarType="Islamic" formatPattern="MMM d, y G"></DatePicker>);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerGetInnerInput()
			.as("input")
			.realClick()
			.should("be.focused")
			.realType("Rab. I 6, 1440 AH")
			.realPress("Enter");

		cy.get("@datePicker")
			.should("have.value", "Rab. I 6, 1440 AH");

		cy.get("@datePicker")
			.shadow()
			.find("ui5-datetime-input")
			.should("have.attr", "value-state", "None");
	});
});