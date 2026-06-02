import "../../src/Assets.js";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import DatePicker from "../../src/DatePicker.js";

// Timestamps for Feb 2019 calendar checks
const timestamp_3_Feb_2019 = 1549152000;
const timestamp_28_Jan_2019 = 1548633600;

describe("DatePicker CLDR race condition", () => {
	it("mounts correctly when setLanguage is called without await before mount", () => {
		// Capture the promise but do NOT await it — this is the race condition.
		// Before the fix, the component rendered before CLDR data loaded → crash.
		// After the fix, connectedCallback bails early and reRenderAllUI5Elements
		// picks up the registered element once CLDR resolves.
		let languageReady: Promise<void>;
		cy.then(() => {
			languageReady = setLanguage("bg");
		});

		cy.mount(<DatePicker value="фев 6, 2019" formatPattern="MMM d, y"></DatePicker>);

		// Now wait for the language change to settle so locale data is applied
		cy.then(() => languageReady);

		cy.get("[ui5-date-picker]")
			.as("datePicker")
			.ui5DatePickerValueHelpIconPress();

		// Monday (bg locale) should be the first displayed date — week starts Jan 28
		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetFirstDisplayedDate()
			.should("have.attr", "data-sap-timestamp", timestamp_28_Jan_2019.toString());

		// Feb 3 should fall on Sunday (last day in Mon-first week = wday6)
		cy.get<DatePicker>("@datePicker")
			.ui5DatePickerGetPopoverDate(timestamp_3_Feb_2019)
			.should("have.class", "ui5-dp-wday6");
	});
});
