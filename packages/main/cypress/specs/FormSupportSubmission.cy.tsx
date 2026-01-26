import "../../src/Assets.js";
import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import TextArea from "../../src/TextArea.js";
import Input from "../../src/Input.js";
import "../../src/features/InputSuggestions.js";
import SuggestionItem from "../../src/SuggestionItem.js";
import DatePicker from "../../src/DatePicker.js";
import DateRangePicker from "../../src/DateRangePicker.js";
import DateTimePicker from "../../src/DateTimePicker.js";
import TimePicker from "../../src/TimePicker.js";
import StepInput from "../../src/StepInput.js";

describe("Form support (submission)", () => {
	describe("ComboBox form submission with Enter key", () => {
		const mountComboBoxForm = (hasItems = false) => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<ComboBox name="date" onChange={() => change()}>
						{hasItems && (
							<>
								<ComboBoxItem text="Item 1" />
								<ComboBoxItem text="Item 2" />
								<ComboBoxItem text="Item 3" />
							</>
						)}
					</ComboBox>
				</form>
			);
			cy.get("[ui5-combobox]").as("comboBox");

			cy.get("@comboBox")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty input", () => {
			mountComboBoxForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountComboBoxForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting type ahead, then submits on second Enter", () => {
			mountComboBoxForm(true);

			cy.realType("Item");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => {
			mountComboBoxForm(true);

			cy.realType("Item");
			cy.realPress("ArrowDown");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});

	describe.skip("MultiComboBox form submission with Enter key", () => {
		it("submits form without firing change event when Enter is pressed on empty input", () => { })
	});
	describe.skip("MultiIInput form submission with Enter key", () => {
		it("submits form without firing change event when Enter is pressed on empty input", () => { })
	});

	describe("TextArea form submission with Enter key", () => {
		const mountTextAreaForm = () => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<TextArea name="date" onChange={() => change()} />
				</form>
			);
			cy.get("[ui5-textarea]").as("textArea");

			cy.get("@textArea")
				.realClick()
				.should("be.focused");
		};

		it("submits form without firing change event when Enter is pressed on empty input", () => {
			mountTextAreaForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountTextAreaForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("not.have.been.called");
		});
	});

	describe("Input form submission with Enter key", () => {
		const mountInputForm = (hasItems = false) => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<Input name="date" showSuggestions={hasItems} onChange={() => change()}>
						{hasItems && (
							<>
								<SuggestionItem text="Item 1" />
								<SuggestionItem text="Item 2" />
								<SuggestionItem text="Item 3" />
							</>
						)}
					</Input>
				</form>
			);
			cy.get("[ui5-input]").as("input");

			cy.get("@input")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty input", () => {
			mountInputForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountInputForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting type ahead, then submits on second Enter", () => {
			mountInputForm(true);

			cy.realType("Item");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => {
			mountInputForm(true);

			cy.realType("Item");
			cy.realPress("ArrowDown");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});

	describe("DatePicker form submission with Enter key", () => {
		const mountDatePickerForm = () => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<DatePicker name="date" onChange={() => change()} />
				</form>
			);
			cy.get("[ui5-date-picker]").as("datePicker");

			cy.get("@datePicker")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty datePicker", () => {
			mountDatePickerForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountDatePickerForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => {
			mountDatePickerForm();

			cy.realPress("F4");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});

	describe("DateRangePicker form submission with Enter key", () => {
		const mountDateRangePickerForm = () => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<DateRangePicker name="date" onChange={() => change()} />
				</form>
			);
			cy.get("[ui5-daterange-picker]").as("dateRangePicker");

			cy.get("@dateRangePicker")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty dateRangePicker", () => {
			mountDateRangePickerForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountDateRangePickerForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => {
			mountDateRangePickerForm();

			cy.realPress("F4");

			cy.realPress("Enter");

			cy.get("@change").should("not.have.been.called");
			cy.get("@submit").should("not.have.been.called");

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});

	describe("DateTimePicker form submission with Enter key", () => {
		const mountDateTimePickerForm = () => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<DateTimePicker name="date" onChange={() => change()} />
				</form>
			);
			cy.get("[ui5-datetime-picker]").as("dateTimePicker");

			cy.get("@dateTimePicker")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty dateTimePicker", () => {
			mountDateTimePickerForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountDateTimePickerForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => {
			mountDateTimePickerForm();

			cy.realPress("F4");

			cy.realPress("Enter");

			cy.get("@change").should("not.have.been.called");
			cy.get("@submit").should("not.have.been.called");

			cy.get("@dateTimePicker")
				.shadow()
				.find("[ui5-button]")
				.contains("OK")
				.realClick();

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});

	describe("TimePicker form submission with Enter key", () => {
		const mountTimePickerForm = (hasItems = false) => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<TimePicker name="date" onChange={() => change()} />
				</form>
			);
			cy.get("[ui5-time-picker]").as("timePicker");

			cy.get("@timePicker")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty timePicker", () => {
			mountTimePickerForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountTimePickerForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => {
			mountTimePickerForm(true);

			cy.realPress("F4");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
			cy.get("@change").should("have.been.calledOnce");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});



	describe("StepInput form submission with Enter key", () => {
		const mountStepInputForm = () => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<StepInput name="date" onChange={() => change()} />
				</form>
			);
			cy.get("[ui5-step-input]").as("stepInput");

			cy.get("@stepInput")
				.realClick()
				.should("be.focused");
		};

		const assertChangeCalledBeforeSubmit = () => {
			cy.get("@change").then((changeSpy: any) =>
				cy.get("@submit").then((submitSpy: any) =>
					expect(changeSpy.getCall(0))
						.to.have.been.calledBefore(submitSpy.getCall(0))
				)
			);
		};

		it("submits form without firing change event when Enter is pressed on empty stepInput", () => {
			mountStepInputForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountStepInputForm();

			cy.realType("25");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});
	});
});
