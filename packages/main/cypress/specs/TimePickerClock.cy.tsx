import TimePickerClock from "../../src/TimePickerClock.js";

type TimePickerClockTemplateOptions = Partial<{
	label: string;
	itemMin: number;
	itemMax: number;
	lastItemReplacement: number;
	valueStep: number;
	displayStep: number;
	selectedValue: number;
	active: boolean;
	disabled: boolean;
	prependZero: boolean;
	onChange: () => void;
}>;

function TimePickerClockTemplate(options: TimePickerClockTemplateOptions) {
	return <div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action: none; margin: 2rem;">
		<TimePickerClock id="myHours12" {...options} />
	</div>
}

describe("Clock API", () => {
	it("without 'disabled' property", () => {
		cy.mount(<TimePickerClockTemplate label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.realClick({ x: 210, y: 50 });

		cy.get("[ui5-time-picker-clock]")
			.should("have.prop", "selectedValue", 1);
	});

	it("with 'disabled' property", () => {
		cy.mount(<TimePickerClockTemplate label="myHours12 (disabled)" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active disabled />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.realClick({ x: 210, y: 50 });

		cy.get("[ui5-time-picker-clock]")
			.should("have.prop", "selectedValue", 12);
	});

	it("with 'active' property", () => {
		cy.mount(<TimePickerClockTemplate label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock")
			.should("be.visible");
	});

	it("without 'active' property", () => {
		cy.mount(<TimePickerClockTemplate label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock")
			.should("not.be.visible");
	});

	it("'displayStep' and 'valueStep' properties - hours", () => {
		cy.mount(<TimePickerClockTemplate label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.should("have.length", 12);
	});

	it("'displayStep' and 'valueStep' properties - minutes (5)", () => {
		cy.mount(<TimePickerClockTemplate label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.should("have.length", 12);
	});

	it("'displayStep' and 'valueStep' properties - minutes (10)", () => {
		cy.mount(<TimePickerClockTemplate label="myMinutes10" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={10} displayStep={10} valueStep={10} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.should("have.length", 6);
	});

	it("'lastItemReplacement' and 'prependZero' properties - hours", () => {
		cy.mount(<TimePickerClockTemplate label="myHours24" itemMin={1} itemMax={24} lastItemReplacement={0} displayStep={1} selectedValue={1} prependZero active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.last()
			.should("have.text", "0");
	});

	it("'lastItemReplacement' and 'prependZero' properties - minutes", () => {
		cy.mount(<TimePickerClockTemplate label="myMinutes" itemMin={1} itemMax={60} lastItemReplacement={0} selectedValue={0} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-items .ui5-tp-clock-item:not(.ui5-tp-clock-item-with-marker) .ui5-tp-clock-number")
			.last()
			.should("have.text", "0");
	});

	it("should not select value when clicking outside clock numbers", () => {
		cy.mount(<TimePickerClockTemplate label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.realClick({ x: 200, y: 200 });

		cy.get("[ui5-time-picker-clock]")
			.should("have.prop", "selectedValue", 12);
	});

	it("should keep selected value after clicking same number", () => {
		cy.mount(<TimePickerClockTemplate label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.realClick({ x: 45, y: 110 });

		cy.get("[ui5-time-picker-clock]")
			.invoke("prop", "selectedValue")
			.then(val => {
				cy.get("[ui5-time-picker-clock]")
					.shadow()
					.find(".ui5-tp-clock-cover")
					.realClick({ x: 45, y: 110 });

				cy.get("[ui5-time-picker-clock]")
					.should("have.prop", "selectedValue", val);
			});
	});
});

describe("Clock item selection", () => {
	it("select clock item and 'change' event", () => {
		cy.mount(<TimePickerClockTemplate label="myHours12" itemMin={1} itemMax={12} displayStep={1} selectedValue={12} active onChange={cy.stub().as("changed")} />);

		cy.get("[ui5-time-picker-clock]")
			.shadow()
			.find(".ui5-tp-clock-cover")
			.as("hours12Cover")
			.realClick({ x: 210, y: 50 });

		cy.get("[ui5-time-picker-clock]")
			.should("have.prop", "selectedValue", 1);

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.get("@hours12Cover")
			.realClick({ x: 150, y: 35 });

		cy.get("[ui5-time-picker-clock]")
			.should("have.prop", "selectedValue", 12);

		cy.get("@changed")
			.should("have.been.calledTwice");
	});
});