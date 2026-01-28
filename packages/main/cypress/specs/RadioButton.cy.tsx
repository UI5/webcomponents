
import RadioButton from "../../src/RadioButton.js";
import Input from "../../src/Input.js";
import Label from "../../src/Label.js";

describe("Rendering", () => {
	it("DOM structure", () => {
		cy.mount(
			<>
				<RadioButton id="testRbtn" text="N/A" disabled name="test"></RadioButton>
				<RadioButton id="testRbtn1" text="Male" name="test"></RadioButton>
				<RadioButton id="groupRbReadOnly" name="a" readonly text="Option E"></RadioButton>
			</>);

		cy.get("#testRbtn1")
			.shadow()
			.find(".ui5-radio-root")
			.should("not.have.attr", "aria-disabled");

		cy.get("#testRbtn1")
			.shadow()
			.find("input")
			.should("not.have.attr", "disabled");

		cy.get("#testRbtn")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "aria-disabled");

		cy.get("#testRbtn")
			.shadow()
			.find("input")
			.should("have.attr", "disabled");

		cy.get("#groupRbReadOnly")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "aria-disabled");

		cy.get("#groupRbReadOnly")
			.shadow()
			.find("input")
			.should("have.attr", "readonly");

		cy.get("#groupRbReadOnly")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "aria-disabled");
	});
});

describe("RadioButton general interaction", () => {
	it("tests change event", () => {
		const changeEventStub = cy.stub().as("myStub");
		cy.mount(<RadioButton id="rb1" onChange={changeEventStub}></RadioButton>);

		cy.get("#rb1")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("@myStub").should("not.have.been.called");

		cy.get("#rb1").realClick();
		cy.get("@myStub").should("have.been.called");

		cy.get("#rb1").realClick();
		cy.get("@myStub").should("have.been.calledOnce");
	});

	it("tests change event upon ENTER", () => {
		const changeEventStub = cy.stub().as("myStub");
		cy.mount(
			<>
				<RadioButton id="rb1"></RadioButton>
				<RadioButton id="rb2" text="Option B" onChange={changeEventStub}></RadioButton>
			</>);

		cy.get("#rb1")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("#rb1").realClick();
		cy.get("#rb1").should("be.focused");
		cy.get("#rb1").realPress("Tab");

		cy.get("#rb2")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("@myStub").should("not.have.been.called");
		cy.get("#rb2").realPress("Enter");
		cy.get("@myStub").should("have.been.called");

		cy.get("#rb2").realPress("Enter");
		cy.get("@myStub").should("have.been.calledOnce");
	});

	it("tests change event upon SPACE", () => {
		const changeEventStub = cy.stub().as("myStub");
		cy.mount(
			<>
				<RadioButton id="rb2" text="Option B"></RadioButton>
				<RadioButton id="rb3" wrappingType="Normal" text="Option C" onChange={changeEventStub}></RadioButton>
			</>);

		cy.get("#rb2")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("#rb2").realClick();
		cy.get("#rb2").should("be.focused");
		cy.get("#rb2").realPress("Tab");

		cy.get("#rb3")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("@myStub").should("not.have.been.called");
		cy.get("#rb3").realPress("Space");
		cy.get("@myStub").should("have.been.called");

		cy.get("#rb3").realPress("Space");
		cy.get("@myStub").should("have.been.calledOnce");
	});

	it("tests change event not fired, when disabled", () => {
		const changeEventStub = cy.stub().as("myStub");
		cy.mount(<RadioButton id="rb4" disabled text="Option D" onChange={changeEventStub}></RadioButton>);

		cy.get("#rb4")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("#rb4").realClick();
		cy.get("#rb4").should("be.focused");
		cy.get("#rb4").realPress("Space");
		cy.get("#rb4").realPress("Enter");

		cy.get("@myStub").should("not.have.been.called");
	});

	it("tests radio buttons selection within group with ARROW-RIGHT key", () => {
		cy.mount(
			<>
				<Input id="tabField"></Input>
				<RadioButton id="groupRb1" name="a" wrappingType="None" text="Option A long long should shrink long long text text text text text text text text"></RadioButton>
				<RadioButton id="groupRb2" name="a" disabled text="Option C"></RadioButton>
				<RadioButton id="groupRb3" name="a" text="Option D"></RadioButton>
				<RadioButton id="groupRbReadOnly" name="a" readonly text="Option E"></RadioButton>
			</>);

		cy.get("#tabField").should("exist");
		cy.get("#tabField").realClick();
		cy.get("#tabField").should("be.focused");
		cy.get("#tabField").realPress("Tab");

		cy.get("#groupRb1").should("exist");
		cy.get("#groupRb1").should("be.focused");
		cy.get("#groupRb1").realPress("ArrowRight");

		cy.get("#groupRb1").should("have.prop", "checked", false);
		cy.get("#groupRb3").should("have.prop", "checked", true);

		cy.get("#groupRb3").should("exist");
		cy.get("#groupRb3").should("be.focused");
		cy.get("#groupRb3").realPress("ArrowRight");

		cy.get("#groupRb3").should("have.prop", "checked", true);
		cy.get("#groupRbReadOnly").should("have.prop", "checked", false);
		cy.get("#groupRbReadOnly").should("be.focused");
	});

	it("tests radio buttons selection within group with ARROW-LEFT key", () => {
		cy.mount(
			<>
				<RadioButton id="groupRb4" name="b" wrappingType="None" text="Option A long long should shrink long long text text text text text text text text"></RadioButton>
				<RadioButton id="groupRb5" name="b" disabled text="Option C"></RadioButton>
				<RadioButton id="groupRb6" name="b" text="Option D"></RadioButton>
			</>);

		cy.get("#groupRb4").should("exist");
		cy.get("#groupRb6").should("exist");
		cy.get("#groupRb4").realClick();

		cy.get("#groupRb4").should("be.focused");

		cy.realPress("ArrowLeft");

		cy.get("#groupRb4").should("have.prop", "checked", false);
		cy.get("#groupRb6").should("have.prop", "checked", true);
	});

	it("tests tabindex within group with selected item", () => {
		cy.mount(
			<>
				<RadioButton id="testRbtn11" name="test2" checked text="Selected A"></RadioButton>
				<RadioButton id="testRbtn12" name="test2" disabled text="Disabled B"></RadioButton>
				<RadioButton id="testRbtn13" name="test2" text="Standard C"></RadioButton>
			</>);

		cy.get("#testRbtn11")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "0");

		cy.get("#testRbtn12")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "-1");

		cy.get("#testRbtn13")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "-1");
	});

	it("tests tabindex within group with no checked item", () => {
		cy.mount(
			<>
				<RadioButton id="testRbtn1" text="Male" name="test"></RadioButton>
				<RadioButton id="testRbtn2" text="Female" name="test"></RadioButton>
			</>);

		cy.get("#testRbtn1")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "0");

		cy.get("#testRbtn2")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "-1");
	});

	it("tests radio buttons selection within group by clicking", () => {
		cy.mount(
			<>
				<RadioButton id="groupRb4" name="b" wrappingType="None" text="Option A long long should shrink long long text text text text text text text text"></RadioButton>
				<RadioButton id="groupRb6" checked name="b" text="Option D"></RadioButton>
			</>);

		cy.get("#groupRb4")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("#groupRb6")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("#groupRb4").realClick();

		cy.get("#groupRb6")
			.should("have.prop", "checked", false);

		cy.get("#groupRb6")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "-1");

		cy.get("#groupRb4").should("have.prop", "checked", true);

		cy.get("#groupRb4")
			.shadow()
			.find(".ui5-radio-root")
			.should("have.attr", "tabindex", "0");
	});

	it("tests single selection within group, even if multiple radios are set as checked", () => {
		cy.mount(
			<>
				<RadioButton id="groupRb8" text="Critical" valueState="Critical" checked name="GroupB"></RadioButton>
				<RadioButton id="groupRb9" text="Negative" valueState="Negative" checked name="GroupB"></RadioButton>
				<RadioButton id="groupRb10" text="Default selected" valueState="None" checked name="GroupB"></RadioButton>
			</>);

		cy.get("#groupRb8").should("not.have.attr", "checked");
		cy.get("#groupRb9").should("not.have.attr", "checked");
		cy.get("#groupRb10").should("have.attr", "checked");
	});

	it("tests change event from radio buttons within group", () => {
		const changeEventStub = cy.stub().as("myStub");
		cy.mount(<RadioButton id="groupRb7" text="None selected" onChange={changeEventStub} valueState="None" name="GroupB"></RadioButton>);

		cy.get("#groupRb7")
			.shadow()
			.find(".ui5-radio-root")
			.should("exist");

		cy.get("@myStub").should("not.have.been.called");

		cy.get("#groupRb7").realClick();

		cy.get("@myStub").should("be.calledOnce");
		cy.get("#groupRb7").should("have.prop", "checked", true);
	});

	it("tests truncating and wrapping", () => {
		const RADIOBUTTON_DEFAULT_HEIGHT = 44;
		cy.mount(
			<>
				<RadioButton id="truncatingRb" wrappingType="None" text="Long long long long long long long long long long text that should truncate at some point"></RadioButton>
				<br />
				<RadioButton id="wrappingRb" wrappingType="Normal" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." class="radiobutton2auto"></RadioButton>
			</>);

		cy.get("#truncatingRb").should("have.prop", "wrappingType", "None");
		cy.get("#wrappingRb").should("have.prop", "wrappingType", "Normal");

		cy.get("#truncatingRb").invoke("height").should($truncatedLabelHeight => {
			expect($truncatedLabelHeight).to.be.equal(RADIOBUTTON_DEFAULT_HEIGHT);
		});
		cy.get("#wrappingRb").invoke("height").should($truncatedLabelHeight => {
			expect($truncatedLabelHeight).to.be.equal(RADIOBUTTON_DEFAULT_HEIGHT);
		});
	});

	it("tests accessibleName", () => {
		const RADIOBUTTON_LABEL = "Sample Label";
		const RADIOBUTTON_TEXT = "Sample Text";

		cy.mount(
			<>
				<RadioButton id="rb-acc-name" accessible-name="Sample Label"></RadioButton>
				<RadioButton id="rb-acc-name-text" text="Sample Text" accessible-name="Sample Label"></RadioButton>
			</>);

		cy.get("#rb-acc-name").should('have.prop', "ariaLabelText", RADIOBUTTON_LABEL);
		cy.get("#rb-acc-name-text").should('have.prop', "ariaLabelText", `${RADIOBUTTON_LABEL} ${RADIOBUTTON_TEXT}`);
	});

	it("tests accessibleNameRef", () => {
		const LABEL_TEXT = "Label for this radio button:";
		cy.mount(
			<>
				<Label id="lbl-rb-acc-name-ref">{LABEL_TEXT}</Label>
				<RadioButton id="rb-acc-name-ref" accessibleNameRef="lbl-rb-acc-name-ref"></RadioButton>
			</>);

		cy.get("#rb-acc-name-ref").should("have.prop", "ariaLabelText", LABEL_TEXT);
	});

	it("tests accessibleNameRef and radio button text together", () => {
		const LABEL_TEXT = "Label for this radio button:";
		const RADIO_BUTTON_TEXT = "Sample Text";
		cy.mount(
			<>
				<Label id="lbl-rb-acc-name-ref-with-text">{LABEL_TEXT}</Label>
				<RadioButton id="rb-acc-name-ref-with-text" accessibleNameRef="lbl-rb-acc-name-ref-with-text" text={RADIO_BUTTON_TEXT}></RadioButton>
			</>);

		cy.get("#rb-acc-name-ref-with-text").should("have.prop", "ariaLabelText", `${LABEL_TEXT} ${RADIO_BUTTON_TEXT}`);
	});

	it("tests accessibleNameRef when the radio button is wrapped by another custom element", () => {
		const LABEL_TEXT = "Label for this radio button:";
		cy.mount(
			<>
				<Label id="lbl-rb-acc-name-ref">{LABEL_TEXT}</Label>
				<RadioButton id="rb-acc-name-ref-wrapped" accessibleNameRef="lbl-rb-acc-name-ref"></RadioButton>
			</>);

		cy.get("#rb-acc-name-ref-wrapped").should("have.prop", "ariaLabelText", LABEL_TEXT);
	});

	it("correctly assigns tabindex when the whole group has been removed from DOM and added back to DOM", () => {
		cy.mount(<div id="rbGroupContainer"></div>);

		cy.get("#rbGroupContainer").then(($el) => {
			$el[0].innerHTML = `
				<ui5-radio-button id="optionA" name="sameGroup" text="A"></ui5-radio-button>
				<ui5-radio-button id="optionB" name="sameGroup" text="B"></ui5-radio-button>
				<ui5-radio-button id="optionC" name="sameGroup" text="C"></ui5-radio-button>
			`;
		});

		cy.get("#optionA").shadow().find(".ui5-radio-root").should('have.attr', "tabindex", "0");
		cy.get("#optionB").shadow().find(".ui5-radio-root").should('have.attr', "tabindex", "-1");
		cy.get("#optionC").shadow().find(".ui5-radio-root").should('have.attr', "tabindex", "-1");

		cy.get("#rbGroupContainer").then(($el) => {
			$el[0].innerHTML = "";
			$el[0].innerHTML = `
				<ui5-radio-button id="optionA" name="sameGroup" text="A"></ui5-radio-button>
				<ui5-radio-button id="optionB" name="sameGroup" text="B"></ui5-radio-button>
				<ui5-radio-button id="optionC" name="sameGroup" text="C"></ui5-radio-button>
			`;
		});

		cy.get("#optionA").shadow().find(".ui5-radio-root").should('have.attr', "tabindex", "0");
		cy.get("#optionB").shadow().find(".ui5-radio-root").should('have.attr', "tabindex", "-1");
		cy.get("#optionC").shadow().find(".ui5-radio-root").should('have.attr', "tabindex", "-1");
	});

	it("tests form interaction", () => {
		cy.mount(
			<form id="formWithRequiredRadio">
				<RadioButton id="formRadioBtnRequired" value="optionA" name="formGroup" text="Option A" required></RadioButton>
				<RadioButton value="optionB" name="formGroup" text="Option B"></RadioButton>
				<RadioButton value="optionC" name="formGroup" text="Option C"></RadioButton>
				<Input type="submit" />
			</form>);

		cy.get<HTMLFormElement>("#formWithRequiredRadio").then(($el) => {
			return $el[0].checkValidity()
		}).should("be.false");
		cy.get("#formRadioBtnRequired").should("have.prop", "required", true);
		cy.get("#formRadioBtnRequired").should("have.prop", "checked", false);

		cy.get("#formRadioBtnRequired")
			.shadow()
			.find(".ui5-radio-root")
			.realClick();

		cy.get<HTMLFormElement>("#formWithRequiredRadio").then(($el) => {
			return $el[0].checkValidity()
		}).should("be.true");
		cy.get("#formRadioBtnRequired").should("have.prop", "checked", true);
	});

	it("tests dynamically creating of buttons", () => {
		cy.mount(<div id="radioContainer"></div>);

		cy.get("#radioContainer").then($container => {
			const rb1 = document.createElement("ui5-radio-button") as RadioButton;
			const rb2 = document.createElement("ui5-radio-button") as RadioButton;

			cy.spy<RadioButton>((rb1 as RadioButton), "appendChild").as("showOutsideViewport");

			rb1.id = "testDRbtn11";
			rb1.name = "test2";
			rb1.text = "A";

			$container[0].appendChild(rb1);

			cy.spy<RadioButton>((rb2 as RadioButton), "appendChild").as("showOutsideViewport");

			rb2.id = "testDRbtn12";
			rb2.name = "test2";
			rb2.text = "B";

			$container[0].appendChild(rb2);
		});

		cy.get("#testDRbtn11")
			.should("be.visible");

		cy.get("#testDRbtn12")
			.should("be.visible");
	});
});

describe("RadioButton keyboard handling in RTL", () => {
	it("Arrow Left", () => {
		cy.mount(
			<div dir="rtl">
				<RadioButton id="rtlOptionA" name="rtlGroup" text="Option A" checked></RadioButton>
				<RadioButton id="rtlOptionB" name="rtlGroup" text="Option B"></RadioButton>
				<RadioButton id="rtlOptionC" name="rtlGroup" text="Option C"></RadioButton>
			</div>);

		cy.get("#rtlOptionA").should("exist");
		cy.get("#rtlOptionA").realClick().realPress("ArrowLeft");

		cy.get("#rtlOptionB").should("have.prop", "checked", true);

		cy.get("#rtlOptionB").should("exist");
		cy.get("#rtlOptionB").realPress("ArrowLeft");

		cy.get("#rtlOptionC").should("have.prop", "checked", true);
	});

	it("Arrow Right", () => {
		cy.mount(
			<div dir="rtl">
				<RadioButton id="rtlOptionA" name="rtlGroup" text="Option A" checked></RadioButton>
				<RadioButton id="rtlOptionB" name="rtlGroup" text="Option B"></RadioButton>
				<RadioButton id="rtlOptionC" name="rtlGroup" text="Option C"></RadioButton>
			</div>);

		cy.get("#rtlOptionA").should("exist");
		cy.get("#rtlOptionA").realClick().realPress("ArrowRight");

		cy.get("#rtlOptionC").should("have.prop", "checked", true);

		cy.get("#rtlOptionC").should("exist");
		cy.get("#rtlOptionC").realPress("ArrowRight");

		cy.get("#rtlOptionB").should("have.prop", "checked", true);
	});
});