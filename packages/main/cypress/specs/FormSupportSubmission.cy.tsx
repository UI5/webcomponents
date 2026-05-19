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
import MultiInput from "../../src/MultiInput.js";
import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";
import Tokenizer from "../../src/Tokenizer.js";
import Token from "../../src/Token.js";
import CheckBox from "../../src/CheckBox.js";
import RadioButton from "../../src/RadioButton.js";
import Switch from "../../src/Switch.js";
import Slider from "../../src/Slider.js";
import RangeSlider from "../../src/RangeSlider.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";

describe("Form submission with Enter key", () => {

	describe("ComboBox", () => {
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

	describe("MultiComboBox", () => {
		const mountMultiComboBoxForm = (hasItems = false) => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<MultiComboBox name="date" onChange={() => change()}>
						{hasItems && (
							<>
								<MultiComboBoxItem text="Item 1" />
								<MultiComboBoxItem text="Item 2" />
								<MultiComboBoxItem text="Item 3" />
							</>
						)}
					</MultiComboBox>
				</form>
			);
			cy.get("[ui5-multi-combobox]").as("multiComboBox");

			cy.get("@multiComboBox")
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
			mountMultiComboBoxForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountMultiComboBoxForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires submit on second Enter after type ahead is confirmed", () => {
			mountMultiComboBoxForm(true);

			cy.realType("Item");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");

		});

		it("fires submit on second Enter after selection is confirmed", () => {
			mountMultiComboBoxForm(true);

			cy.realType("Item");
			cy.realPress("ArrowDown");
			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
		});
	});

	describe("MultiInput", () => {
		const mountMultiInputForm = (hasItems = false) => {
			const submit = cy.spy().as("submit");
			const change = cy.spy().as("change");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<MultiInput name="date" showSuggestions={hasItems} onChange={() => change()}>
						{hasItems && (
							<>
								<SuggestionItem text="Item 1" />
								<SuggestionItem text="Item 2" />
								<SuggestionItem text="Item 3" />
							</>
						)}
					</MultiInput>
				</form>
			);
			cy.get("[ui5-multi-input]").as("input");

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
			mountMultiInputForm();

			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("not.have.been.called");
		});

		it("fires change event then submits form when Enter is pressed after typing", () => {
			mountMultiInputForm();

			cy.realType("ASD");
			cy.realPress("Enter");

			cy.get("@submit").should("have.been.calledOnce");
			cy.get("@change").should("have.been.calledOnce");

			assertChangeCalledBeforeSubmit();
		});

		it("fires change on first Enter when selecting type ahead, then submits on second Enter", () => {
			mountMultiInputForm(true);

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
			mountMultiInputForm(true);

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



	describe("DynamicDateRange", () => {

		it.skip("submits form without firing change event when Enter is pressed on empty input", () => { });

		it.skip("fires change event then submits form when Enter is pressed after typing", () => { });

		it.skip("fires change on first Enter when selecting type ahead, then submits on second Enter", () => { });

		it.skip("fires change on first Enter when selecting item from dropdown, then submits on second Enter", () => { });
	});

	describe("TextArea", () => {
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

	describe("Input", () => {
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

	describe("DatePicker", () => {
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

		it("submits form without firing change event when Enter is pressed on empty input", () => {
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

	describe("DateRangePicker", () => {
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

		it("submits form without firing change event when Enter is pressed on empty input", () => {
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

	describe("DateTimePicker", () => {
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

		it("submits form without firing change event when Enter is pressed on empty input", () => {
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

	describe("TimePicker", () => {
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

		it("submits form without firing change event when Enter is pressed on empty input", () => {
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

	describe("StepInput", () => {
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

		it("submits form without firing change event when Enter is pressed on empty input", () => {
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

	describe("Tokenizer", () => {
		const mountTokenizerForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<Tokenizer>
						<Token text="Token 1" />
					</Tokenizer>
				</form>
			);
			cy.get("[ui5-token]").as("token");

			cy.get("@token")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountTokenizerForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("CheckBox", () => {
		const mountCheckBoxForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<CheckBox />
				</form>
			);
			cy.get("[ui5-checkbox]").as("checkbox");

			cy.get("@checkbox")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountCheckBoxForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("RadioButton", () => {
		const mountRadioButtonForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<RadioButton />
				</form>
			);
			cy.get("[ui5-radio-button]").as("radioButton");

			cy.get("@radioButton")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountRadioButtonForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("Switch", () => {
		const mountSwitchForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<Switch />
				</form>
			);
			cy.get("[ui5-switch]").as("switch");

			cy.get("@switch")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountSwitchForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("Slider", () => {
		const mountSliderForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<Slider />
				</form>
			);
			cy.get("[ui5-slider]").as("slider");

			cy.get("@slider")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountSliderForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("RangeSlider", () => {
		const mountRangeSliderForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<RangeSlider />
				</form>
			);
			cy.get("[ui5-range-slider]").as("rangeSlider");

			cy.get("@rangeSlider")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountRangeSliderForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("Select", () => {
		const mountSelectForm = () => {
			const submit = cy.spy().as("submit");

			cy.mount(
				<form novalidate onSubmit={e => {
					e.preventDefault();
					submit();
				}}>
					<Select>
						<Option value="1">Item 1</Option>
						<Option value="2">Item 2</Option>
						<Option value="3">Item 3</Option>
					</Select>
				</form>
			);
			cy.get("[ui5-select]").as("select");

			cy.get("@select")
				.realClick()
				.should("be.focused");
		};

		it("doesn't submit form when Enter is pressed", () => {
			mountSelectForm();

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");

			cy.realPress("Enter");

			cy.get("@submit").should("not.have.been.called");
		});
	});

	describe("ColorPicker", () => {
		it.skip("doesn't submit form when Enter is pressed", () => { });
	});

	describe("FileUploader", () => {
		it.skip("doesn't submit form when Enter is pressed", () => { });
	});
});
