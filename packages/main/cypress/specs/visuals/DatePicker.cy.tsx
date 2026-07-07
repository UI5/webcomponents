import DatePicker from "../../../src/DatePicker.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";

const FIXED_VALUE = "Jan 15, 2024";

describe("DatePicker visual", () => {
	beforeEach(() => {
		setAnimationMode(AnimationMode.None);
	});

	it("basic state", () => {
		cy.mount(<DatePicker value={FIXED_VALUE} />);
		cy.screenshot();
	});

	it("placeholder only — no value", () => {
		cy.mount(<DatePicker placeholder="Select date" />);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(<DatePicker value={FIXED_VALUE} disabled />);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(<DatePicker value={FIXED_VALUE} readonly />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<DatePicker value={FIXED_VALUE} valueState="Negative">
				<span slot="valueStateMessage">Invalid date</span>
			</DatePicker>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<DatePicker value={FIXED_VALUE} valueState="Critical">
				<span slot="valueStateMessage">Date outside range</span>
			</DatePicker>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<DatePicker value={FIXED_VALUE} valueState="Positive">
				<span slot="valueStateMessage">Valid date</span>
			</DatePicker>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<DatePicker value={FIXED_VALUE} valueState="Information">
				<span slot="valueStateMessage">Date will be used as reference</span>
			</DatePicker>
		);
		cy.screenshot();
	});

	it("calendar popover open", () => {
		cy.mount(<DatePicker value={FIXED_VALUE} />);
		cy.get("[ui5-date-picker]").ui5DatePickerValueHelpIconPress();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<DatePicker value={FIXED_VALUE} />
			</div>
		);
		cy.screenshot();
	});
});
