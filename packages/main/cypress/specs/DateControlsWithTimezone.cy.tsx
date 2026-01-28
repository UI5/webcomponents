import { getTimezone, setTimezone } from "@ui5/webcomponents-base/dist/config/Timezone.js";
import DatePicker from "../../src/DatePicker.js";
import DateTimePicker from "../../src/DateTimePicker.js";
import TimePicker from "../../src/TimePicker.js";

describe("Date related components in different timezone", () => {
	before(() => {
		cy.wrap({ setTimezone })
			.invoke("setTimezone", "Pacific/Apia");

		cy.wrap({ getTimezone })
			.invoke("getTimezone")
			.should("equal", "Pacific/Apia");
	});

	it("The date is with the correct offset in date picker", () => {
		cy.mount(<DatePicker id="datePickerNow" value="now" formatPattern="dd/MM/yyyy"/>);

		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() + offset);
		now.setHours(now.getHours() + 13);
		const day = String(now.getDate()).padStart(2, "0");
		const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
		const year = now.getFullYear();

		const value = `${day}/${month}/${year}`;

		cy.get("#datePickerNow")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value", value);
	});

	it("The time is with the correct offset in time picker", () => {
		cy.mount(<TimePicker id="timePickerNow" value="now" formatPattern="HH:mm:ss"/>);

		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() + offset);
		now.setHours(now.getHours() + 13);
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");

		const value = `${hours}:${minutes}:${seconds}`;

		cy.get("#timePickerNow")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value", value);
	});

	it("The date and time are with the correct offset in date time picker", () => {
		cy.mount(<DateTimePicker id="dateTimePickerNow" value="now" formatPattern="dd/MM/yyyy HH:mm:ss"/>);

		const now = new Date();
		const offset = now.getTimezoneOffset();
		now.setMinutes(now.getMinutes() + offset);
		now.setHours(now.getHours() + 13);
		const day = String(now.getDate()).padStart(2, "0");
		const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
		const year = now.getFullYear();
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");

		const value = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

		cy.get("#dateTimePickerNow")
			.shadow()
			.find("[ui5-datetime-input]")
			.should("have.attr", "value", value);
	});
});
