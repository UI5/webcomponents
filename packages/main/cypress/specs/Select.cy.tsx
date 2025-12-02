import Option from "../../src/Option.js";
import OptionCustom from "../../src/OptionCustom.js";
import Select from "../../src/Select.js";
import download from "@ui5/webcomponents-icons/dist/download.js";

describe("Select - value handling", () => {
	it("tests selection via Select's value", () => {
		cy.mount(
			<>
				<Select value="option2">
					<Option id="opt1" value="option1">Option 1</Option>
					<Option id="opt2" value="option2">Option 2</Option>
					<Option id="opt3" value="option3">Option 3</Option>
				</Select>

				<Select value="option6">
					<Option id="opt4" value="option4">Option 4</Option>
					<Option id="opt5" value="option5">Option 5</Option>
					<Option id="opt6" value="option6">Option 6</Option>
				</Select>
			</>
		);

		cy.get("#opt2").should("have.attr", "selected");
		cy.get("#opt6").should("have.attr", "selected");
	});

	it("tests Select's value has precedence over Option's selected", () => {
		cy.mount(
			<>
				<Select value="option1">
					<Option id="opt1" value="option1">Option 1</Option>
					<Option id="opt2" value="option2">Option 2</Option>
					<Option id="opt3" value="option3" selected={true}>Option 3</Option>
				</Select>

				<Select value="option6">
					<Option id="opt4" value="option4">Option 4</Option>
					<Option id="opt5" value="option5" selected={true}>Option 5</Option>
					<Option id="opt6" value="option6">Option 6</Option>
				</Select>
			</>
		);

		// assert that Select's value is preferred over Option's selected
		cy.get("#opt1").should("have.attr", "selected");
		cy.get("#opt3").should("not.have.attr", "selected");
		cy.get("#opt5").should("not.have.attr", "selected");
		cy.get("#opt6").should("have.attr", "selected");
	});

	it("tests Select's value of an option, added with delay", () => {
		const addOption = () => {
			const newOption = document.createElement("ui5-option") as Option;
			newOption.id = "opt3";
			newOption.value = "option3";
			newOption.textContent = "Option 3";
			document.getElementById("sel")?.appendChild(newOption);
		};

		cy.mount(
			<Select id="sel" value="option3">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
			</Select>
		);

		cy.get("#opt3").should("not.exist");

		cy.wrap(addOption).invoke("call");

		// assert "Option 3" is selected although added after the Select was mounted
		cy.get("#opt3").should("have.attr", "selected");
	});

	it("tests Select's value set with a delay", () => {
		const setValue = () => {
			const select = document.getElementById("sel") as Select;
			select.value = "option2";
		};

		cy.mount(
			<Select id="sel">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);

		cy.wrap(setValue).invoke("call");

		// assert "Option 2" is selected after dynamic value change
		cy.get("#opt2").should("have.attr", "selected");
	});

	it("tests Select's value of a missing option - auto-selects firsts", () => {
		cy.mount(
			<Select id="sel" value="option3">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
			</Select>
		);

		// assert: Value remains "option3"
		cy.get("#sel")
			.should("have.attr", "value", "option3")
			.invoke("prop", "value", "option3");

		// assert: no option is selected - the Select is displayed empty
		cy.get("#opt1").should("not.have.attr", "selected");
		cy.get("#opt2").should("not.have.attr", "selected");
	});

	it("tests Select's value updated after user interaction", () => {
		cy.mount(
			<Select id="sel" value="option3">
				<Option id="opt1" value="option1">Option 1</Option>
				<Option id="opt2" value="option2">Option 2</Option>
				<Option id="opt3" value="option3">Option 3</Option>
			</Select>
		);

		cy.get("#sel")
			.realClick();

		cy.get("#sel")
			.should("have.attr", "opened");

		// act: select first option with click

		cy.get("#sel")
			.find("[ui5-option]")
			.eq(0)
			.realClick();

		// assert: value is updated after user interaction
		cy.get("#sel")
			.should("have.attr", "value", "option1")
			.invoke("prop", "value", "option1");

		// act: select second option with keyboard
		cy.get("#sel")
			.realClick();

		cy.get("#sel")
			.realPress("ArrowDown");

		cy.get("#sel")
			.realPress("Enter");

		// assert: value is updated after ArrowDown + Enter
		cy.get("#sel")
			.should("have.attr", "value", "option2")
			.invoke("prop", "value", "option2");
	});
});

describe("Select - Accessibility", () => {
	it("tests options tooltip is set displayed", () => {
		const EXPECTED_TOOLTIP = "Tooltip";
		const EXPECTED_ROLE = "option";
		cy.mount(
			<Select>
				<Option value="1" tooltip={EXPECTED_TOOLTIP}>Option 1</Option>
				<OptionCustom value="2" tooltip={EXPECTED_TOOLTIP}>Option 2</OptionCustom>
			</Select>
		);

		// Check if the role is set to option
		cy
			.get("[ui5-option]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "role", EXPECTED_ROLE)
			.get("[ui5-option-custom]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "role", EXPECTED_ROLE);

		// Check if the tooltip is set
		cy
			.get("[ui5-option][tooltip]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "title", EXPECTED_TOOLTIP)
			.get("[ui5-option-custom][tooltip]")
			.shadow()
			.find("li.ui5-li-root")
			.should("have.attr", "title", EXPECTED_TOOLTIP);
	});

	it("setting tooltip on the host is reflected on the select's shadow dom root", () => {
		cy.mount(<Select tooltip="Go home">
			<Option value="1">Option 1</Option>
			<OptionCustom value="2">Option 2</OptionCustom>
		</Select>);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.as("select");

		cy.get("@select")
			.should("have.attr", "title", "Go home");
	});

	it("should announce the associated label when Select is focused", () => {
		cy.mount(
			<>
				<label for="sel">Should be the aria-label</label>
				<Select id="sel">
					<Option value="option1">Option 1</Option>
					<Option value="option2">Option 2</Option>
					<Option value="option3">Option 3</Option>
				</Select>
			</>
		);

		cy.get('label[for="sel"]')
			.invoke('text')
			.then((labelText) => {
				cy.get("[ui5-select]")
					.shadow()
					.find(".ui5-select-label-root")
					.should("have.attr", "aria-label", labelText);
			});
	});

	it("should have aria-controls pointing to the responsive popover", () => {
		cy.mount(
			<Select>
				<Option value="option1">Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="option3">Option 3</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find("[ui5-responsive-popover]")
			.invoke("attr", "id")
			.then((popoverId) => {
				cy.get("[ui5-select]")
					.shadow()
					.find(".ui5-select-label-root")
					.should("have.attr", "aria-controls", popoverId);
			});
	});

	it("Tests accessibility", () => {
		cy.mount(
			<>
				<span id="infoText">info text</span>
				<Select id="textAreaAriaLabel" accessibleName="Hello World">
					<Option value="First">First</Option>
					<Option value="Second">Second</Option>
					<Option value="Third" selected>Third</Option>
				</Select>
				<Select id="textAreaAriaLabelledBy" accessibleNameRef="infoText">
					<Option value="One">One</Option>
					<Option value="Two">Two</Option>
					<Option value="Three" selected>Three</Option>
				</Select>
			</>
		);

		const EXPECTED_ARIA_LABEL1 = "Hello World";
		const EXPECTED_ARIA_LABEL2 = "info text";
		const EXPECTED_ARIA_ROLEDESCRIPTION = "Listbox";

		// Test first select with accessibleName
		cy.get("#textAreaAriaLabel")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL1)
			.should("have.attr", "aria-expanded", "false");

		// Test second select with accessibleNameRef
		cy.get("#textAreaAriaLabelledBy")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-label", EXPECTED_ARIA_LABEL2)
			.should("have.attr", "aria-expanded", "false")
			.should("have.attr", "aria-roledescription", EXPECTED_ARIA_ROLEDESCRIPTION);
	});

	it("tests Select with valueState Positive and aria-describedby", () => {
		cy.mount(
			<Select valueState="Positive">
				<Option value="First">First</Option>
				<Option value="Second">Second</Option>
				<Option value="Third" selected>Third</Option>
			</Select>
		);

		// Test that valueState creates the correct aria-describedby reference
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-describedby")
			.and("contain", "-valueStateDesc");

		// Test that the value state description text contains "Success"
		cy.get("[ui5-select]")
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Success");
	});

	it("tests accessibleDescription and accessibleDescriptionRef", () => {
		cy.mount(
			<>
				<span id="descText">Description text</span>
				<Select id="selectWithAccessibleDescription" accessibleDescription="Select description">
					<Option value="First">First</Option>
					<Option value="Second">Second</Option>
					<Option value="Third" selected>Third</Option>
				</Select>
				<Select id="selectWithAccessibleDescriptionRef" accessibleDescriptionRef="descText">
					<Option value="One">One</Option>
					<Option value="Two">Two</Option>
					<Option value="Three" selected>Three</Option>
				</Select>
				<Select id="selectWithoutDescription">
					<Option value="A">A</Option>
					<Option value="B">B</Option>
					<Option value="C" selected>C</Option>
				</Select>
			</>
		);

		const EXPECTED_DESCRIPTION = "Select description";
		const EXPECTED_DESCRIPTION_REF = "Description text";

		// Test first select with accessibleDescription
		cy.get("#selectWithAccessibleDescription")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", EXPECTED_DESCRIPTION);

		cy.get("#selectWithAccessibleDescription")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-describedby")
			.and("contain", "accessibleDescription");

		// Test second select with accessibleDescriptionRef
		cy.get("#selectWithAccessibleDescriptionRef")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", EXPECTED_DESCRIPTION_REF);

		cy.get("#selectWithAccessibleDescriptionRef")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-describedby")
			.and("contain", "accessibleDescription");

		// Test select without description should not have aria-describedby
		cy.get("#selectWithoutDescription")
			.shadow()
			.find(".ui5-select-label-root")
			.should("not.have.attr", "aria-describedby");

		// Test that changing the referenced element updates the description
		cy.get("#descText")
			.invoke("text", "Updated description text");

		cy.get("#selectWithAccessibleDescriptionRef")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "Updated description text");
	});

	it("tests Select with both valueState Positive and accessibleDescription", () => {
		cy.mount(
			<Select valueState="Positive" accessibleDescription="Additional description">
				<Option value="First">First</Option>
				<Option value="Second">Second</Option>
				<Option value="Third" selected>Third</Option>
			</Select>
		);

		const EXPECTED_VALUE_STATE_TEXT = "Success";
		const EXPECTED_DESCRIPTION = "Additional description";

		// Test that both valueState and accessibleDescription are included in aria-describedby
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-describedby")
			.and("contain", "-valueStateDesc")
			.and("contain", "accessibleDescription");

		// Test that the value state description text is correct
		cy.get("[ui5-select]")
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", EXPECTED_VALUE_STATE_TEXT);

		// Test that the accessible description text is correct
		cy.get("[ui5-select]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", EXPECTED_DESCRIPTION);
	});

	it("tests Select with multiple accessibleDescriptionRef values", () => {
		cy.mount(
			<>
				<span id="desc1">First description</span>
				<span id="desc2">Second description</span>
				<span id="desc3">Third description</span>
				<Select accessibleDescriptionRef="desc1 desc2 desc3">
					<Option value="First">First</Option>
					<Option value="Second">Second</Option>
					<Option value="Third" selected>Third</Option>
				</Select>
			</>
		);

		const EXPECTED_COMBINED_DESCRIPTION = "First description Second description Third description";

		// Test that accessibleDescriptionRef with multiple IDs creates the correct aria-describedby reference
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("have.attr", "aria-describedby")
			.and("contain", "accessibleDescription");

		// Test that the combined description text from multiple elements is correct
		cy.get("[ui5-select]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", EXPECTED_COMBINED_DESCRIPTION);

		// Test that changing one of the referenced elements updates the combined description
		cy.get("#desc2")
			.invoke("text", "Updated second description");

		cy.get("[ui5-select]")
			.shadow()
			.find("#accessibleDescription")
			.should("have.text", "First description Updated second description Third description");
	});

	it("should not display tooltip when Select is not readonly", () => {
		cy.mount(
			<Select style="width: 50px">
				<Option selected>VeryLongOptionTextThatWillBeTruncated</Option>
				<Option >Short</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("not.have.attr", "title");
	});

	it("should display user tooltip with precedence over the default tooltip", () => {
		cy.mount(
			<Select style="width: 50px" tooltip="Custom tooltip" readonly>
				<Option selected>VeryLongOptionTextThatWillBeTruncated</Option>
				<Option >Short</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.attr", "title", "Custom tooltip");
	});

	it("should display default tooltip (text + additionalText) if it is read-only and text is truncated, even if tooltip is not set", () => {
		cy.mount(
			<Select style="width: 50px" readonly>
				<Option additionalText="AdditionalInfo" selected>VeryLongOptionText</Option>
				<Option >Short</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.attr", "title", "VeryLongOptionText – AdditionalInfo");
	});

	it("should display default tooltip (text) if it is read-only and text is truncated, even if tooltip is not set", () => {
		cy.mount(
			<Select style="width: 50px" readonly>
				<Option selected>VeryLongOptionTextThatWillBeTruncated</Option>
				<Option >Short</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.attr", "title", "VeryLongOptionTextThatWillBeTruncated");
	});

	it("should show the text and additionalText, separated by '-' when select is read-only", () => {
		cy.mount(
			<Select readonly>
				<Option additionalText="ExtraInfo" selected>SelectedOption</Option>
				<Option additionalText="OtherInfo">OtherOption</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "SelectedOption – ExtraInfo");
	});
});

describe("Select - Popover", () => {
	it("Popover should render custom value state", () => {
		cy.mount(
			<Select id="warningSelect" valueState="Critical">
				<Option>This option has text bigger than ui5-select's width</Option>
				<div slot="valueStateMessage">Custom message</div>
			</Select>
		);

		cy.get("#warningSelect").realClick().realPress("Escape");

		cy.get("#warningSelect")
			.find("[slot=\"valueStateMessage\"]")
			.should("be.visible")
			.should("have.text", "Custom message");
	});

	it("ResponsivePopover should not have accessible name on desktop", () => {
		cy.mount(
			<Select id="desktopSelect">
				<Option value="option1">Option 1</Option>
				<Option value="option2">Option 2</Option>
				<Option value="option3">Option 3</Option>
			</Select>
		);

		// Open the popover
		cy.get("#desktopSelect").realClick();

		// Check that the ResponsivePopover does not have an accessible name on desktop
		cy.get("#desktopSelect")
			.shadow()
			.find("[ui5-responsive-popover]")
			.should("not.have.attr", "accessible-name");
	});

	it("Value state message popover can extend beyond select width", () => {
		cy.mount(
			<Select valueState="Critical">
				<Option>Short</Option>
				<Option>Long</Option>
				<div slot="valueStateMessage">
					This is a very long value state message that should extend beyond the narrow select component width and not be constrained by it.
				</div>
			</Select>
		);

		// Trigger the value state popover by clicking and then pressing Escape
		cy.get("[ui5-select]")
			.realClick()
			.realPress("Escape");

		// Get the select width for comparison
		cy.get("[ui5-select]")
			.invoke("outerWidth")
			.as("selectWidth");

		// Find the standalone value state popover
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-valuestatemessage-popover")
			.should("exist")
			.as("valueStatePopover");

		// Verify the popover width is greater than the select width
		cy.get("@valueStatePopover")
			.invoke("outerWidth")
			.then((popoverWidth) => {
				cy.get("@selectWidth").then((selectWidth) => {
					expect(popoverWidth).to.be.greaterThan(Number(selectWidth));
				});
			});
		});
});

describe("Select - Properties", () => {
	it("Icon only is setting properly the required icon", () => {
		cy.mount(
			<Select icon={download}>
				<Option selected>Phone</Option>
				<Option>Tablet</Option>
				<Option>Desktop</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find("[ui5-icon]")
			.should("have.attr", "name", "download");
	});

	it("It returns empty string as a valid value, similar to native select behavior", () => {
		cy.mount(
			<Select>
				<Option selected value="">Phone</Option>
				<Option>Tablet</Option>
				<Option>Desktop</Option>
			</Select>);

		cy.get("[ui5-select]").should("have.prop", "formFormattedValue", "");
	});

	it("Should show the selected text-separator when select is read-only", () => {
		cy.mount(
			<Select readonly text-separator="VerticalLine">
				<Option additionalText="Additional1" selected>First</Option>
				<Option additionalText="Additional2">Second</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", " | ");
	});
});

describe("Select - Validation", () => {
	it("has correct validity", () => {
		cy.mount(
			<form method="get">
				<Select id="sel1" name="select1" required>
					<Option value="">Select an option</Option>
					<Option value="option1">Option 1</Option>
					<Option value="option2">Option 2</Option>
				</Select>
				<button type="submit">Submit</button>
			</form>
		);

		cy.get("form")
			.then($item => {
				$item.get(0).addEventListener("submit", cy.stub().as("submit"));
			});

		cy.get("button")
			.realClick();

		cy.get("@submit")
			.should("have.not.been.called");

		cy.get("#sel1")
			.then($el => {
				const select = $el[0] as Select;
				expect(select.formValidity.valueMissing, "Required Select with empty value should have formValidity with valueMissing=true").to.be.true;
				expect(select.validity.valueMissing, "Required Select with empty value should have validity with valueMissing=true").to.be.true;
				expect(select.validity.valid, "Required Select with empty value should have validity with valid=false").to.be.false;
				expect(select.checkValidity(), "Required Select with empty value should fail validity check").to.be.false;
				expect(select.reportValidity(), "Required Select with empty value should fail report validity").to.be.false;
			});

		cy.get("#sel1:invalid").should("exist", "Required Select with empty value should have :invalid CSS class");

		// select an option with a non-empty value
		// this should make the Select valid
		cy.get("#sel1")
			.realClick()
			.get("[ui5-option]")
			.eq(1)
			.realClick();

		cy.get("#sel1")
			.then($el => {
				const select = $el[0] as Select;
				expect(select.formValidity.valueMissing, "Required Select with non-empty value should have formValidity with valueMissing=false").to.be.false;
				expect(select.validity.valueMissing, "Required Select with non-empty value should have validity with valueMissing=false").to.be.false;
				expect(select.validity.valid, "Required Select with non-empty value should have validity with valid=true").to.be.true;
				expect(select.checkValidity(), "Required Select with non-empty value should pass validity check").to.be.true;
				expect(select.reportValidity(), "Required Select with non-empty value should pass report validity").to.be.true;
			});

		cy.get("#sel1:invalid").should("not.exist", "Required Select with non-empty value should not have :invalid CSS class");
	});
});

describe("Select general interaction", () => {
	it("fires change on selection", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		const EXPECTED_SELECTION_TEXT = "Cozy";

		cy.get("@select").realClick();
		cy.get("@select").should("have.attr", "opened");

		cy.get("@select")
			.find("[ui5-option]")
			.eq(0)
			.realClick();

		cy.get("@changeStub").should("have.been.calledOnce");

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT);
		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("prevents change on selection", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub").callsFake((e) => {
					e.preventDefault();
				}));
			});

		const EXPECTED_SELECTION_TEXT = "Condensed";

		cy.get("@select").realClick();

		cy.get("@select")
			.find("[ui5-option]")
			.eq(1)
			.realClick();

		cy.get("@changeStub").should("have.been.calledOnce");

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT);
		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("does not fire change, when clicking on selected item", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@select").realClick();

		cy.get("@select")
			.find("[ui5-option]")
			.eq(2)
			.realClick();

		cy.get("@changeStub").should("not.have.been.called");
	});

	it("fire open, when clicking on selected item", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-open", cy.stub().as("openStub"));
			});

		cy.get("@select").realClick();

		cy.get("@openStub").should("have.been.calledOnce");
	});

	it("fire close, when clicking on selected item", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-close", cy.stub().as("closeStub"));
			});

		cy.get("@select").realClick();
		cy.get("@select").realClick();

		cy.get("@closeStub").should("have.been.calledOnce");
	});

	it("fires change on selection with keyboard handling", () => {
		cy.mount(
			<Select valueState="Negative">
				<Option value="Cozy" selected>Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed">Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowDown");
		cy.get("@select").realPress("Enter");

		cy.get("@changeStub").should("have.been.calledOnce");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT1);

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowDown");
		cy.get("@select").realPress("Space");

		cy.get("@changeStub").should("have.been.calledTwice");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT2);

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT2);
	});

	it("doesn't changes selection while closed with Arrow Up/Down while at last item", () => {
		cy.mount(
			<Select valueState="Negative">
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		const EXPECTED_SELECTION_TEXT1 = "Condensed";

		cy.get("@select").realClick();
		cy.get("@select").realPress("Escape");

		cy.get("@select").realPress("ArrowDown");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT1);

		cy.get("@changeStub").should("not.have.been.called");
	});

	it("changes selection while closed with Arrow Up/Down", () => {
		cy.mount(
			<Select valueState="Negative">
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("@select").realClick();
		cy.get("@select").realPress("Escape");

		cy.get("@select").realPress("ArrowUp");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT1);

		cy.get("@select").realPress("ArrowDown");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT2);

		cy.get("@select").should("have.prop", "value", EXPECTED_SELECTION_TEXT2);

		cy.get("@changeStub").should("have.been.calledTwice");
	});

	it("changes selection sync with selection announcement", () => {
		cy.mount(
			<>
				<Select valueState="Negative">
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<button>click</button>
			</>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		const EXPECTED_SELECTION_TEXT1 = "Compact";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("@select").realClick();
		cy.get("@select").realPress("Escape");

		cy.get("@select").realPress("ArrowUp");

		cy.get(".ui5-invisiblemessage-polite").should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("@select").realPress("ArrowDown");

		cy.get(".ui5-invisiblemessage-polite").should("contain.text", EXPECTED_SELECTION_TEXT2);

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowUp");
		cy.get("@select").realPress("Escape");

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowUp");
		cy.get("@select").realPress("Enter");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT1);

		cy.get("button").realClick();

		cy.get("@changeStub").should("have.been.calledThrice");
	});


	it("remains closed and unchanged when read-only", () => {
		cy.mount(
			<Select readonly>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact" selected>Compact</Option>
				<Option value="Condensed">Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Compact";

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("not.have.prop", "open", true);

		cy.get("[ui5-select]").realPress("ArrowUp");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").realPress("ArrowDown");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("announces the selected value once Select Popover is opened", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select] [ui5-option][selected]")
			.invoke("text")
			.then((selectedText) => {
				cy.get(".ui5-invisiblemessage-polite").should("contain.text", selectedText);
			});
	});

	it("changes selection on Tab", () => {
		cy.mount(
			<>
				<Select>
					<Option value="Banana">Banana</Option>
					<Option value="Orange" selected>Orange</Option>
					<Option value="Watermelon">Watermelon</Option>
				</Select>
				<input />
			</>
		);

		const EXPECTED_SELECTION_TEXT = "Banana";

		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]").realPress("Space");

		cy.get("[ui5-select]").realPress("ArrowUp");
		cy.get("[ui5-select]").realPress("Tab");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("input").should("be.focused");
	});

	it("changes selection on Shift + Tab", () => {
		cy.mount(
			<>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact" selected>Compact</Option>
					<Option value="Condensed">Condensed</Option>
				</Select>
				<Select>
					<Option value="Banana">Banana</Option>
					<Option value="Orange" selected>Orange</Option>
					<Option value="Watermelon">Watermelon</Option>
				</Select>
			</>
		);

		const EXPECTED_SELECTION_TEXT = "Watermelon";

		cy.get("[ui5-select]").eq(1).realClick();
		cy.get("[ui5-select]").eq(1).realClick();

		cy.get("[ui5-select]").eq(1).realPress("Space");

		cy.get("[ui5-select]").eq(1).realPress("ArrowDown");
		cy.get("[ui5-select]").eq(1).realPress(["Shift", "Tab"]);

		cy.get("[ui5-select]").eq(1)
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").eq(0).should("be.focused");
	});

	it("tests selection does not cycle with ArrowDown", () => {
		cy.mount(
			<Select>
				<Option value="Opt1">Opt1</Option>
				<Option value="Opt2">Opt2</Option>
				<Option value="Opt3" selected>Opt3</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Opt3";

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").realPress("ArrowDown");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").realPress("Escape");
	});

	it("tests selection does not cycle with ArrowUp", () => {
		cy.mount(
			<Select>
				<Option value="Opt1" selected>Opt1</Option>
				<Option value="Opt2">Opt2</Option>
				<Option value="Opt3">Opt3</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Opt1";

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").realPress("ArrowUp");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").realPress("Escape");
	});

	it("changes selection with typing single letter", () => {
		cy.mount(
			<Select>
				<Option value="Banana">Banana</Option>
				<Option value="Orange" selected>Orange</Option>
				<Option value="Watermelon">Watermelon</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Banana";

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]").realPress("b");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("changes selection with typing more letters", () => {
		cy.mount(
			<Select valueState="Critical">
				<Option value="Australia">Australia</Option>
				<Option value="Aruba">Aruba</Option>
				<Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
				<Option value="Belgium">Belgium</Option>
				<Option value="Bulgaria">Bulgaria</Option>
				<Option value="Brazil" selected>Brazil</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Brazil";

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]").realPress("b");
		cy.get("[ui5-select]").realPress("r");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);
	});

	it("changes selection using 'value'", () => {
		cy.mount(
			<>
				<Select>
					<Option value="Item1">Item1</Option>
					<Option value="Item2">Item2</Option>
					<Option value="Item3" selected>Item3</Option>
				</Select>
				<button>select.value = "Item2"</button>
				<button>select.value = "NAN"</button>
			</>
		);

		// Set up button click handlers
		cy.get("button").eq(0).then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.querySelector("[ui5-select]") as Select;
				select.value = "Item2";
			});
		});

		cy.get("button").eq(1).then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.querySelector("[ui5-select]") as Select;
				select.value = "NAN";
			});
		});

		const INVALID_VALUE = "NAN";
		const EMPTY_VALUE = "";
		const EXPECTED_SELECTION_TEXT = "Item2";

		cy.get("button").eq(0).realClick();

		cy.get("[ui5-select]").should("have.prop", "value", EXPECTED_SELECTION_TEXT);
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("button").eq(1).realClick();

		cy.get("[ui5-select]").should("have.prop", "value", INVALID_VALUE);
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EMPTY_VALUE);
	});

	it("opens upon space", () => {
		cy.mount(
			<>
				<button>click</button>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("button").realClick();
		cy.get("button").realPress("Tab");

		cy.realPress("Space");

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);
	});

	it("toggles upon F4", () => {
		cy.mount(
			<>
				<button>click</button>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("button").realClick();
		cy.get("button").realPress("Tab");

		cy.realPress("F4");

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.realPress("F4");

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("toggles upon ALT + UP", () => {
		cy.mount(
			<>
				<button>click</button>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("button").realClick();
		cy.get("button").realPress("Tab");

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.realPress(["Alt", "ArrowUp"]);

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("toggles upon ALT + DOWN", () => {
		cy.mount(
			<>
				<button>click</button>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
			</>
		);

		cy.get("button").realClick();
		cy.get("button").realPress("Tab");

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.realPress(["Alt", "ArrowDown"]);

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("adds unselected only items to select", () => {
		let initialItemsHTML = "";

		cy.mount(
			<>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<button>Add new Items</button>
				<button>Restore Items</button>
			</>
		);

		cy.get("button").eq(0).then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.querySelector("[ui5-select]") as Select;
				initialItemsHTML = select.innerHTML;

				const newOption = document.createElement("ui5-option") as Option;
				newOption.textContent = "New";

				select.innerHTML = "";
				select.appendChild(newOption);
			});
		});

		cy.get("button").eq(1).then(($btn) => {
			$btn[0].addEventListener("click", () => {
				const select = document.querySelector("[ui5-select]") as Select;
				select.innerHTML = initialItemsHTML;
			});
		});

		cy.get("button").eq(0).realClick();

		cy.get("[ui5-select]")
			.find("[ui5-option]:first-child")
			.should("have.prop", "selected", true);

		cy.get("button").eq(1).realClick();
	});

	it("reverts value before open after clicking on escape", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		let initialSelectText = "";
		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.then(($el) => {
				initialSelectText = $el[0].innerHTML;
			});

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowDown");
		cy.get("@select").realPress("Escape");

		cy.get("@select")
			.find("[ui5-option][selected]")
			.should("have.prop", "selected", true);

		cy.get("@changeStub").should("not.have.been.called");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.then(($el) => {
				expect($el[0].innerHTML).to.equal(initialSelectText);
			});
	});

	it("fires change event after selection is change and picker if focussed out", () => {
		cy.mount(
			<>
				<Select>
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<button>click</button>
			</>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowUp");

		cy.get("button").realClick();

		cy.get("@changeStub").should("have.been.calledOnce");
	});

	it("fires change event after selecting a previewed item", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@select").realClick();
		cy.get("@select").realPress("ArrowDown");

		cy.get("@select").realPress("Escape");

		cy.get("@select").realClick();
		cy.get("@select")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("@changeStub").should("have.been.calledOnce");
	});

	it("tests ESC on closed picker", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact" selected>Compact</Option>
				<Option value="Condensed">Condensed</Option>
			</Select>
		);

		const EXPECTED_SELECTION_TEXT = "Cozy";
		const EXPECTED_SELECTION_TEXT2 = "Condensed";

		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT);

		cy.get("[ui5-select]").realPress("Escape");

		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]")
			.find("[ui5-option]")
			.eq(2)
			.realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", EXPECTED_SELECTION_TEXT2);
	});

	it("Tests value state type", () => {
		cy.mount(
			<>
				<Select valueState="Positive">
					<Option value="Cozy" selected>Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed">Condensed</Option>
				</Select>
				<Select valueState="Information">
					<Option value="Cozy">Cozy</Option>
					<Option value="Compact">Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<Select valueState="Negative">
					<Option value="Cozy" selected>Cozy</Option>
					<Option value="Compact" selected>Compact</Option>
					<Option value="Condensed" selected>Condensed</Option>
				</Select>
				<Select valueState="Critical">
					<Option value="Australia" selected>Australia</Option>
					<Option value="Aruba">Aruba</Option>
					<Option value="Belgium">Belgium</Option>
				</Select>
			</>
		);

		cy.get("[ui5-select]").eq(0)
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Success");

		cy.get("[ui5-select]").eq(1)
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Information");

		cy.get("[ui5-select]").eq(2)
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Error");

		cy.get("[ui5-select]").eq(3)
			.shadow()
			.find("[id$='-valueStateDesc']")
			.should("contain.text", "Warning");
	});

	it("Tests that the picker is closed when the selected value is clicked", () => {
		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.get("[ui5-select]")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);

		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.get("[ui5-select]")
			.find("[ui5-option]:first-child")
			.realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", false);
	});

	it("Tests if currently selected option is visible in the viewport when keyboard navigation is used", () => {
		cy.viewport(600, 400);

		cy.mount(
			<Select valueState="Critical">
				<Option value="Australia" selected>Australia</Option>
				<Option value="Aruba">Aruba</Option>
				<Option value="Belgium">Belgium</Option>
				<Option value="Bulgaria">Bulgaria</Option>
				<Option value="Brazil">Brazil</Option>
			</Select>
		);

		cy.get("[ui5-select]").realClick();

		cy.get("[ui5-select]")
			.shadow()
			.find("ui5-responsive-popover")
			.should("have.prop", "open", true);

		cy.get("[ui5-select]").realPress("ArrowDown");
		cy.get("[ui5-select]").realPress("ArrowDown");
		cy.get("[ui5-select]").realPress("ArrowDown");

		cy.get("[ui5-select]")
			.find("[ui5-option][selected]")
			.should("be.visible");
	});

	it("clears typed characters after selection is changed", () => {
		cy.mount(
			<Select accessibleName="Hello World">
				<Option value="First">First</Option>
				<Option value="Second">Second</Option>
				<Option value="Third" selected>Third</Option>
			</Select>
		);

		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").realPress("s");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Second");

		cy.get("[ui5-select]").realPress("Enter");

		cy.get("[ui5-select]").realPress("t");

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Third");

		cy.get("[ui5-select]").should("have.prop", "value", "Third");
	});

	it("navigates with ArrowDown when initial value does not match any option", () => {
		cy.mount(
			<Select value="missing">
				<Option value="A">A</Option>
				<Option value="B">B</Option>
				<Option value="C">C</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.should("have.prop", "value", "missing")
			.find("[ui5-option][selected]")
			.should("not.exist");

		cy.get("[ui5-select]").realClick().realPress("ArrowDown");

		cy.get("[ui5-select]")
			.find("[ui5-option]")
			.eq(0)
			.should("have.attr", "selected");
		cy.get("[ui5-select]").should("have.prop", "value", "A");
	});

	it("navigates with ArrowUp when initial value does not match any option", () => {
		cy.mount(
			<Select value="missing">
				<Option value="A">A</Option>
				<Option value="B">B</Option>
				<Option value="C">C</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.should("have.prop", "value", "missing")
			.find("[ui5-option][selected]")
			.should("not.exist");

		cy.get("[ui5-select]").realClick().realPress("ArrowUp");

		cy.get("[ui5-select]")
			.find("[ui5-option]")
			.eq(2)
			.should("have.attr", "selected");
		cy.get("[ui5-select]").should("have.prop", "value", "C");
	});

	describe.only("Select Component - aria-activedescendant Validation", () => {
		it("should update aria-activedescendant on the Select root element when navigating options", () => {
		  // Mount the Select component
		  cy.mount(
			<Select>
			  <Option id="option-a" value="A">A</Option>
			  <Option id="option-b" value="B">B</Option>
			  <Option id="option-c" value="C">C</Option>
			</Select>
		  );
		// Ensure the Select component is rendered
		cy.get("[ui5-select]").should("exist");

		// Open the dropdown
		cy.get("[ui5-select]").realClick();

		// Validate the initial aria-activedescendant value (should not exist initially)
		cy.get("[ui5-select]").should("not.have.attr", "aria-activedescendant");

		// Navigate to the second option using ArrowDown
		cy.get("[ui5-select]").realPress("ArrowDown");

		// Validate the aria-activedescendant attribute dynamically
		cy.get("[ui5-select]")
		.shadow()
		.find(".ui5-select-label-root")
		.should("have.attr", "aria-activedescendant")
		.then((ariaActiveDescendant) => {
			// Use the activeDescendantId getter to locate the corresponding element
			cy.get("[ui5-select]")
			.invoke("prop", "activeDescendantId")
			.should("equal", ariaActiveDescendant);

			// Validate the text of the dynamically resolved active descendant
			cy.get("[ui5-select]").shadow().find(`[id="${ariaActiveDescendant}"]`)
			.should("exist")
			.and("have.text", "B");
		});

		});
	});
});