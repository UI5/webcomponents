import TimePicker from "../../../src/TimePicker.js";

describe("TimePicker visual", () => {
	beforeEach(() => {
		cy.clock(new Date("Jan 15, 2024").getTime(), ["Date"]);
	});

	it("basic state", () => {
		cy.mount(<TimePicker />);
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(<TimePicker value="11:30:00" formatPattern="HH:mm:ss" />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<TimePicker value="09:00:00" formatPattern="HH:mm:ss" />
			</div>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<TimePicker disabled value="08:00:00" />);
		cy.screenshot();
	});

	it("readonly", () => {
		cy.mount(<TimePicker readonly value="08:00:00" />);
		cy.screenshot();
	});

	it("picker open — clocks visible", () => {
		cy.mount(<TimePicker value="11:30:00" formatPattern="HH:mm:ss" />);
		cy.get("[ui5-time-picker]").ui5TimePickerValueHelpIconPress();
		cy.get("[ui5-time-picker]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(<TimePicker valueState="Negative" />);
		cy.screenshot();
	});

	it("value state — Negative — picker open", () => {
		cy.mount(<TimePicker valueState="Negative" value="11:30:00" formatPattern="HH:mm:ss" />);
		cy.get("[ui5-time-picker]").ui5TimePickerValueHelpIconPress();
		cy.get("[ui5-time-picker]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(<TimePicker valueState="Negative" />);
		cy.get("[ui5-time-picker]")
			.shadow().find("[ui5-datetime-input]")
			.shadow().find("input")
			.realClick();
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(<TimePicker valueState="Critical" />);
		cy.screenshot();
	});

	it("value state — Critical — picker open", () => {
		cy.mount(<TimePicker valueState="Critical" value="11:30:00" formatPattern="HH:mm:ss" />);
		cy.get("[ui5-time-picker]").ui5TimePickerValueHelpIconPress();
		cy.get("[ui5-time-picker]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(<TimePicker valueState="Critical" />);
		cy.get("[ui5-time-picker]")
			.shadow().find("[ui5-datetime-input]")
			.shadow().find("input")
			.realClick();
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(<TimePicker valueState="Positive" />);
		cy.screenshot();
	});

	it("value state — Positive — picker open", () => {
		cy.mount(<TimePicker valueState="Positive" value="11:30:00" formatPattern="HH:mm:ss" />);
		cy.get("[ui5-time-picker]").ui5TimePickerValueHelpIconPress();
		cy.get("[ui5-time-picker]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(<TimePicker valueState="Positive" />);
		cy.get("[ui5-time-picker]")
			.shadow().find("[ui5-datetime-input]")
			.shadow().find("input")
			.realClick();
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(<TimePicker valueState="Information" />);
		cy.screenshot();
	});

	it("value state — Information — picker open", () => {
		cy.mount(<TimePicker valueState="Information" value="11:30:00" formatPattern="HH:mm:ss" />);
		cy.get("[ui5-time-picker]").ui5TimePickerValueHelpIconPress();
		cy.get("[ui5-time-picker]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(<TimePicker valueState="Information" />);
		cy.get("[ui5-time-picker]")
			.shadow().find("[ui5-datetime-input]")
			.shadow().find("input")
			.realClick();
		cy.screenshot();
	});
});
