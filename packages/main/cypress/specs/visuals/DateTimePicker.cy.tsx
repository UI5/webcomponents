import DateTimePicker from "../../../src/DateTimePicker.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";

const FIXED_VALUE = "Apr 15, 2024, 10:30:00 AM";
const FIXED_FORMAT = "MMM d, yyyy, hh:mm:ss a";

describe("DateTimePicker visual", () => {
	beforeEach(() => {
		setAnimationMode(AnimationMode.None);
	});

	it("basic state", () => {
		cy.mount(<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} />);
		cy.screenshot();
	});

	it("placeholder only — no value", () => {
		cy.mount(<DateTimePicker placeholder="Select date and time" />);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} disabled />);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} readonly />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} valueState="Negative">
				<span slot="valueStateMessage">Invalid date and time</span>
			</DateTimePicker>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} valueState="Critical">
				<span slot="valueStateMessage">Date outside allowed range</span>
			</DateTimePicker>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} valueState="Positive">
				<span slot="valueStateMessage">Date is valid</span>
			</DateTimePicker>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} valueState="Information">
				<span slot="valueStateMessage">Date will be used as reference</span>
			</DateTimePicker>
		);
		cy.screenshot();
	});

	it("popover open", () => {
		cy.mount(<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} />);
		cy.get("[ui5-datetime-picker]").ui5DateTimePickerOpen();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DateTimePicker value={FIXED_VALUE} formatPattern={FIXED_FORMAT} />
			</div>
		);
		cy.screenshot();
	});
});
