import { setAnimationMode } from "@ui5/webcomponents-base";
import TimeSelectionClocks from "../../src/TimeSelectionClocks.js";
import { TIMEPICKER_HOURS_LABEL, TIMEPICKER_MINUTES_LABEL, TIMEPICKER_SECONDS_LABEL } from "../../src/generated/i18n/i18n-defaults.js";

type TimeSelectionClocksTemplateOptions = Partial<{
	formatPattern: string,
	value: string;
	onChange: () => void;
}>

function TimeSelectionClocksTemplate(options: TimeSelectionClocksTemplateOptions) {
	return <div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
		<TimeSelectionClocks {...options} />
	</div>
}

describe("TimeSelectionClocks Interactions", () => {
	before(() => {
		cy.wrap({ setAnimationMode })
			.then(api => {
				return api.setAnimationMode("none");
			})
	})

	it("switch active clock (by buttons)", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:20:40" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.should("have.length", 3);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons");

		["hours", "minutes", "seconds"].forEach((clock, idx) => {
			cy.get("@buttons")
				.eq(idx)
				.realClick();

			cy.wait(800);

			// @ts-expect-error
			cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", clock);
		});
	});

	it("switch active clock (by pressing colon :)", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:20:40" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.should("have.length", 3);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons")
			.eq(0)
			.realClick();

		cy.get("@buttons")
			.eq(0)
			.should("be.focused");

		["hours", "minutes", "seconds", "hours"].forEach((clock, idx) => {
			// @ts-expect-error
			cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", clock);

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", idx % 3);

			cy.realPress(["Shift", ":"])
		});
	});

	it("switch active clock (by pressing space)", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:20:40" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.should("have.length", 3);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons")
			.eq(0)
			.realClick();

		cy.get("@buttons")
			.eq(0)
			.should("be.focused");

		["hours", "minutes", "seconds", "hours"].forEach((clock, idx) => {
			// @ts-expect-error
			cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", clock);

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", idx % 3)

			cy.realPress("Space")
		});
	});

	it("switch AM/PM", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="hh:mm:ss a" value="12:20:40 PM" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-segmented-button-item]")
			.as("segBtnItems");

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.first()
			.as("button");

		cy.get("@button")
			.realClick();

		cy.get("@button")
			.should("be.focused");

		cy.get("@segBtnItems")
			.contains("AM")
			.should("not.have.attr", "selected");

		cy.get("@segBtnItems")
			.contains("PM")
			.should("have.attr", "selected");

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0)

		cy.realPress("a");

		cy.get("@segBtnItems")
			.contains("AM")
			.should("have.attr", "selected");

		cy.get("@segBtnItems")
			.contains("PM")
			.should("not.have.attr", "selected");

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0)

		cy.realPress("p");

		cy.get("@segBtnItems")
			.contains("AM")
			.should("not.have.attr", "selected");

		cy.get("@segBtnItems")
			.contains("PM")
			.should("have.attr", "selected");
	});

	it("arrow keys", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:12:12" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons");

		["hours", "minutes", "seconds"].forEach((clock, idx) => {
			cy.get("@buttons")
				.eq(idx)
				.realClick();

			cy.get("@buttons")
				.eq(idx)
				.should("be.focused");

			// change hours
			cy.realPress("ArrowDown");

			cy.get("[ui5-time-selection-clocks]")
				.shadow()
				.find("[ui5-time-picker-clock]")
				.as("clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", 11);

			cy.get("@buttons")
				.eq(idx)
				.should("contain.text", "11");

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", idx)

			cy.realPress("ArrowUp");

			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", 12);

			cy.get("@buttons")
				.eq(idx)
				.should("contain.text", "12");

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0)

			cy.realPress(["Shift", ":"])
		})
	});

	it("pageup/pagedown", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:12:12" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.as("clocks");

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons");

		[
			{ clock: "hours", keyCombination: [] },
			{ clock: "minutes", keyCombination: ["Shift"] },
			{ clock: "seconds", keyCombination: ["Shift", "Control"] }
		].forEach(({ clock, keyCombination }, idx) => {
			cy.get("@buttons")
				.eq(idx)
				.realClick();

			cy.get("@buttons")
				.eq(idx)
				.should("be.focused");

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", idx)

			// @ts-expect-error
			cy.realPress([...keyCombination, "PageDown"]);

			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", 11);

			cy.get("@buttons")
				.eq(idx)
				.should("contain.text", "11");

			// @ts-expect-error
			cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", clock);

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", idx)

			// @ts-expect-error
			cy.realPress([...keyCombination, "PageUp"]);

			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", 12);

			cy.get("@buttons")
				.eq(idx)
				.should("contain.text", "12");
		})
	});

	it("direct number typing", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:20:40" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.as("clocks");

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons");

		cy.get("@buttons")
			.eq(0)
			.realClick();

		cy.get("@buttons")
			.eq(0)
			.should("be.focused");

		[
			["08", "24", "13"],
			["3", "6", "9"],
			["11", "8"],
		].forEach(numbers => {
			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0);

			cy.realType(numbers.join(""));

			numbers.forEach((num, idx) => {
				cy.get("@clocks")
					.eq(idx)
					.should("have.prop", "selectedValue", parseInt(num));

				cy.get("@buttons")
					.eq(idx)
					.should("contain.text", parseInt(num) < 10 ? `0${parseInt(num)}` : num);
			})

			cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", "seconds");

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 2);

			cy.realPress(["Shift", ":"]);

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0);
		});

		cy.realType(["2", "5"].join(""));

		["2", "5"].forEach((num, idx) => {
			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", parseInt(num));

			cy.get("@buttons")
				.eq(idx)
				.should("contain.text", parseInt(num) < 10 ? `0${parseInt(num)}` : num);
		})

		cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", "minutes");

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 1);

		cy.wait(1500);

		cy.realType("3210");

		["2", "32", "10"].forEach((num, idx) => {
			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", parseInt(num));

			cy.get("@buttons")
				.eq(idx)
				.should("contain.text", parseInt(num) < 10 ? `0${parseInt(num)}` : num);
		})

		cy.ui5TimeSelectionClocksIsActiveClock("[ui5-time-selection-clocks]", "seconds");

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 2);
	});
});

describe("TimeSelectionClocks Accessibility", () => {
	it("accessibility-related attributes", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:20:40" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find(".ui5-time-picker-tsc-clocks")
			.should("have.attr", "role", "img");

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons");

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.as("clocks");

		[
			{ min: 0, max: 23, label: TIMEPICKER_HOURS_LABEL.defaultText },
			{ min: 0, max: 59, label: TIMEPICKER_MINUTES_LABEL.defaultText },
			{ min: 0, max: 59, label: TIMEPICKER_SECONDS_LABEL.defaultText },
		].forEach(({ min, max, label }, idx) => {
			cy.get("@buttons")
				.eq(idx)
				.should("have.attr", "value-min", min);

			cy.get("@buttons")
				.eq(idx)
				.should("have.attr", "value-max", max);

			cy.get("@buttons")
				.eq(idx)
				.invoke("attr", "value-now")
				.then(val =>
					cy.get("@clocks")
						.eq(idx)
						.should("have.prop", "selectedValue", Number(val))
				);

			cy.get("@buttons")
				.eq(idx)
				.should("have.attr", "accessible-name", label);

			cy.get("@buttons")
				.eq(idx)
				.invoke("attr", "value-text")
				.then(val =>
					cy.get("@buttons")
						.eq(idx)
						.invoke("attr", "value-now")
						.should(now =>
							expect(val).to.eq(`${now} ${label}`)
						)
				);
		})
	});

	it("change of accessibility-related attributes during interactions", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="HH:mm:ss" value="12:12:12" />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons");

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-time-picker-clock]")
			.as("clocks");

		[
			{ label: TIMEPICKER_HOURS_LABEL.defaultText },
			{ label: TIMEPICKER_MINUTES_LABEL.defaultText },
			{ label: TIMEPICKER_SECONDS_LABEL.defaultText },
		].forEach(({ label }, idx) => {
			cy.get("@buttons")
				.eq(idx)
				.realClick();

			cy.get("@buttons")
				.eq(idx)
				.should("be.focused")

			// Hours button
			cy.get("@buttons")
				.eq(idx)
				.invoke("attr", "value-now", "12")

			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", Number(12))

			cy.get("@buttons")
				.eq(idx)
				.should("attr", "value-text", `${12} ${label}`)

			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", idx);

			cy.realPress("ArrowDown");

			cy.get("@buttons")
				.eq(idx)
				.invoke("attr", "value-now", "11")

			cy.get("@clocks")
				.eq(idx)
				.should("have.prop", "selectedValue", Number(11))

			cy.get("@buttons")
				.eq(idx)
				.should("attr", "value-text", `${11} ${label}`)


			cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0);

			cy.realPress(["Shift", ":"]);
		})
	});
});

describe("TimeSelectionClocks Events", () => {
	it("'change' event", () => {
		cy.mount(<TimeSelectionClocksTemplate formatPattern="hh:mm:ss a" value="12:20:40" onChange={cy.stub().as("changed")} />);

		cy.get("[ui5-time-selection-clocks]")
			.shadow()
			.find("[ui5-toggle-spin-button]")
			.as("buttons")
			.eq(0)
			.realClick();

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0);

		cy.realPress("PageDown");

		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 0);

		cy.realPress(["Shift", "PageDown"]);

		cy.get("@changed")
			.should("have.been.calledTwice");

		cy.ui5TimeSelectionClocksInnerButton("[ui5-time-selection-clocks]", 1);

		cy.realPress(["Control", "Shift", "PageDown"]);

		cy.get("@changed")
			.should("have.been.calledThrice");
	});
});
