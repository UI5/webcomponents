import CheckBox from "../../src/CheckBox.js";
import Input from "../../src/Input.js";
import Title from "../../src/Title.js";
import Button from "../../src/Button.js";

describe('CheckBox Component', () => {
    it('should have correct type and value attributes in shadow dom', () => {
        cy.mount(<CheckBox value="testValue" />);
        cy.get("[ui5-checkbox]")
            .shadow()
            .find('[type="checkbox"]')
            .should('have.attr', 'value', 'testValue');
    });

    it('should omit value attribute in shadow dom when checkbox has default value', () => {
        cy.mount(<CheckBox />);
        cy.get("[ui5-checkbox]")
            .shadow()
            .find('[type="checkbox"]')
            .should('not.have.attr', 'value');
    });

});

describe("Validation inside a form", () => {
    it("has correct validity", () => {
        cy.mount(<form method="get">
            <CheckBox id="cb" name="checkbox5" required text="unchecked ui5-checkbox with name and required" > </CheckBox>
            <button type="submit" > Submits forms </button>
        </form>);

        cy.get("form")
            .then($item => {
                $item.get(0).addEventListener("submit", cy.stub().as("submit"));
            });

        cy.get("button")
            .realClick();

        cy.get("@submit")
            .should("have.not.been.called");

        cy.get("#cb")
            .then($el => {
                const checkbox = $el[0] as CheckBox;
                expect(checkbox.formValidity.valueMissing, "Unchecked required checkbox should have formValidity with valueMissing=true").to.be.true;
                expect(checkbox.validity.valueMissing, "Unchecked required checkbox should have validity with valueMissing=true").to.be.true;
                expect(checkbox.validity.valid, "Unchecked required checkbox should have validity with valid=false").to.be.false;
                expect(checkbox.checkValidity(), "Unchecked required checkbox should fail validity check").to.be.false;
                expect(checkbox.reportValidity(), "Unchecked required checkbox should fail report validity").to.be.false;
            });

        cy.get("#cb:invalid") // select using :invalid CSS pseudo-class
            .should("exist", "Unchecked required checkbox should have :invalid CSS class");

        cy.get("#cb") // check the required checkbox
            .realClick();

        cy.get("#cb")
            .then($el => {
                const checkbox = $el[0] as CheckBox;
                expect(checkbox.formValidity.valueMissing, "Checked required checkbox should have formValidity with valueMissing=false").to.be.false;
                expect(checkbox.validity.valueMissing, "Checked required checkbox should have validity with valueMissing=false").to.be.false;
                expect(checkbox.validity.valid, "Checked required checkbox should have validity with valid=true").to.be.true;
                expect(checkbox.checkValidity(), "Checked required checkbox should pass validity check").to.be.true;
                expect(checkbox.reportValidity(), "Checked required checkbox should pass report validity").to.be.true;
            });

        cy.get("#cb:invalid").should("not.exist", "Checked required checkbox should not have :invalid CSS class");
    });
});

describe("CheckBox general interaction", () => {
    it("tests checked default value is false", () => {
        cy.mount(<CheckBox text="Long long long text" />);

        cy.get("[ui5-checkbox]").should("have.prop", "checked", false);
    });

    it("tests change event", () => {
        cy.mount(
            <div>
                <CheckBox text="Long long long text" />
                <Input />
            </div>
        );

        let counter = 0;
        cy.get("[ui5-checkbox]").then(($checkbox) => {
            $checkbox[0].addEventListener("ui5-change", function () {
                counter += 1;
                (document.querySelector("[ui5-input]") as HTMLInputElement).value = `${counter}`;
            });
        });

        cy.get("[ui5-checkbox]").realClick();
        cy.get("[ui5-checkbox]").realPress("Space");
        cy.get("[ui5-checkbox]").realPress("Enter");

        cy.get("[ui5-input]").should("have.value", "3");
    });

    it("tests readonly space and enter keys active state", () => {
        cy.mount(<CheckBox readonly text="Option" />);

        cy.get("[ui5-checkbox]").realClick();

        cy.get("[ui5-checkbox]").realPress("Space");
        cy.get("[ui5-checkbox]").should("not.have.attr", "active");

        cy.get("[ui5-checkbox]").realPress("Enter");
        cy.get("[ui5-checkbox]").should("not.have.attr", "active");
    });

    it("tests change event not fired, when disabled", () => {
        cy.mount(
            <div>
                <CheckBox disabled />
                <Input value="3" />
            </div>
        );

        cy.get("[ui5-checkbox]").realClick();
        cy.get("[ui5-checkbox]").realPress("Space");
        cy.get("[ui5-checkbox]").realPress("Enter");

        cy.get("[ui5-input]").should("have.value", "3");
    });

    it("tests change events not fired when displayOnly", () => {
        cy.mount(
            <div>
                <CheckBox displayOnly />
                <Input value="3" />
            </div>
        );

        cy.get("[ui5-checkbox]").realClick();
        cy.get("[ui5-checkbox]").realPress("Space");
        cy.get("[ui5-checkbox]").realPress("Enter");

        cy.get("[ui5-input]").should("have.value", "3");
    });

    it("tests truncating and wrapping", () => {
        const CHECKBOX_DEFAULT_HEIGHT = 44;

        cy.mount(
            <div>
                <CheckBox 
                    wrappingType="None" 
                    style={{ width: "200px" }} 
                    text="Longest ever text written in English that have to truncate because it is so long of course!"
                />
                <CheckBox 
                    style={{ width: "200px" }} 
                    text="Long long long text that should wrap at some point and make the checkbox taller than default"
                />
            </div>
        );

        cy.get("[ui5-checkbox]").first()
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.prop", "offsetHeight", CHECKBOX_DEFAULT_HEIGHT);

        cy.get("[ui5-checkbox]").last()
            .should("have.prop", "offsetHeight")
            .and("be.greaterThan", CHECKBOX_DEFAULT_HEIGHT);
    });

    it("tests accessible-name and accessible-name-ref", () => {
        cy.mount(
            <div>
                <CheckBox disabled />
                <CheckBox accessibleName="Hello world" />
                <CheckBox accessibleNameRef="cb-label" />
                <Title id="cb-label">ACC Test - aria-label</Title>
            </div>
        );

        const EXPECTED_ARIA_LABEL = "Hello world";
        const EXPECTED_ARIA_LABEL_NAME_REF = "ACC Test - aria-label";

        cy.get("[ui5-checkbox]").first()
            .shadow()
            .find(".ui5-checkbox-root")
            .should("not.have.attr", "aria-label");

        cy.get("[ui5-checkbox]").eq(1)
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.attr", "aria-label", EXPECTED_ARIA_LABEL);

        cy.get("[ui5-checkbox]").eq(2)
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.attr", "aria-label", EXPECTED_ARIA_LABEL_NAME_REF);
    });

    it("tests _accInfo", () => {
        const CustomCheckBox = () => {
            const checkbox = <CheckBox />;
            cy.wrap(checkbox).then(() => {
                cy.get("[ui5-checkbox]").then(($checkbox) => {
                    ($checkbox[0] as CheckBox)._accInfo = {
                        role: "presentation",
                    };
                });
            });
            return checkbox;
        };

        cy.mount(<CustomCheckBox />);

        const EXPECTED_ROLE = "presentation";

        cy.get("[ui5-checkbox]")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("have.attr", "role", EXPECTED_ROLE);

        cy.get("[ui5-checkbox]")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("not.have.attr", "aria-checked");
    });

    it("tests ui5-icon has aria-hidden attribute", () => {
        cy.mount(<CheckBox checked />);

        cy.get("[ui5-checkbox]")
            .shadow()
            .find(".ui5-checkbox-icon")
            .should("have.attr", "aria-hidden", "true");
    });

    it("tests change event - value is changed", () => {
        cy.mount(<CheckBox text="Long long long text" />);

        cy.get("[ui5-checkbox]").should("have.prop", "checked", false);

        cy.get("[ui5-checkbox]").realClick();

        cy.get("[ui5-checkbox]").should("have.prop", "checked", true);
    });

    it("tests change event preventDefault - value is not changed", () => {
        cy.mount(
            <div>
                <CheckBox class="defaultPreventedCb" />
                <CheckBox class="defaultPreventedCb" checked />
                <CheckBox class="defaultPreventedCb" indeterminate />
                <CheckBox class="defaultPreventedCb" indeterminate checked />
            </div>
        );

        cy.get(".defaultPreventedCb").each(($checkbox) => {
            $checkbox[0].addEventListener("ui5-change", function (event) {
                event.preventDefault();
            });
        });

        cy.get(".defaultPreventedCb").eq(0).realClick();
        cy.get(".defaultPreventedCb").eq(0).should("have.prop", "checked", false);
        cy.get(".defaultPreventedCb").eq(0).should("have.prop", "indeterminate", false);

        cy.get(".defaultPreventedCb").eq(1).realClick();
        cy.get(".defaultPreventedCb").eq(1).should("have.prop", "checked", true);
        cy.get(".defaultPreventedCb").eq(1).should("have.prop", "indeterminate", false);

        cy.get(".defaultPreventedCb").eq(2).realClick();
        cy.get(".defaultPreventedCb").eq(2).should("have.prop", "checked", false);
        cy.get(".defaultPreventedCb").eq(2).should("have.prop", "indeterminate", true);

        cy.get(".defaultPreventedCb").eq(3).realClick();
        cy.get(".defaultPreventedCb").eq(3).should("have.prop", "checked", true);
        cy.get(".defaultPreventedCb").eq(3).should("have.prop", "indeterminate", true);
    });

    it("tests form submission when checkbox is required, but unchecked", () => {
        cy.mount(
            <form>
                <CheckBox text="Option 1" checked />
                <CheckBox text="Option 2" checked />
                <CheckBox text="Option 3" required />
                <Button type="Submit">Submit</Button>
                <input type="hidden" value="false" />
            </form>
        );

        cy.get("[ui5-button]").realClick();

        cy.get("input[type='hidden']").should("have.value", "false");
    });

    it("tests form submission when checkbox is checked and button is clicked", () => {
        cy.mount(
            <form>
                <CheckBox text="Option 1" checked />
                <CheckBox text="Option 2" checked />
                <CheckBox text="Option 3" required />
                <Button type="Submit">Submit</Button>
                <input type="hidden" value="false" />
            </form>
        );

        cy.get("form").then(($form) => {
            $form[0].addEventListener("submit", function (event) {
                event.preventDefault();
                (document.querySelector("input[type='hidden']") as HTMLInputElement).value = "true";
            });
        });

        cy.get("[ui5-checkbox]").last().realClick();
        cy.get("[ui5-button]").realClick();

        cy.get("input[type='hidden']").should("have.value", "true");
    });

    it("tests displayOnly mode - checkbox cannot be toggled", () => {
        cy.mount(<CheckBox displayOnly />);

        cy.get("[ui5-checkbox]").should("have.prop", "checked", false);

        cy.get("[ui5-checkbox]").realClick();

        cy.get("[ui5-checkbox]").should("have.prop", "checked", false);
    });

    it("tests displayOnly mode - checkbox is not focusable", () => {
        cy.mount(<CheckBox displayOnly />);

        cy.get("[ui5-checkbox]").realClick();

        cy.get("[ui5-checkbox]").should("not.be.focused");
    });

    it("tests displayOnly mode - checkbox is not in the tab chain", () => {
        cy.mount(<CheckBox displayOnly />);

        cy.get("[ui5-checkbox]")
            .shadow()
            .find(".ui5-checkbox-root")
            .should("not.have.attr", "tabindex");
    });

    it("tests displayOnly mode - displays the correct icon", () => {
        cy.mount(<CheckBox displayOnly />);

        cy.get("[ui5-checkbox]")
            .shadow()
            .find("ui5-icon")
            .should("have.attr", "name", "border");

        cy.mount(<CheckBox displayOnly checked />);

        cy.get("[ui5-checkbox]")
            .shadow()
            .find("ui5-icon")
            .should("have.attr", "name", "complete");

        cy.mount(<CheckBox displayOnly indeterminate checked />);

        cy.get("[ui5-checkbox]")
            .shadow()
            .find("ui5-icon")
            .should("have.attr", "name", "tri-state");
    });
});

describe("Accessibility", () => {
	it("should announce the associated label when CheckBox is focused", () => {
		cy.mount(
			<>
				<label for="cb">Should be the aria-label</label>
				<CheckBox id="cb"></CheckBox>
			</>
		);

		cy.get('label[for="cb"]')
			.invoke('text')
			.then((labelText) => {
				cy.get("[ui5-checkbox]")
					.shadow()
					.find(".ui5-checkbox-root")
					.should("have.attr", "aria-label", labelText);
			});
	});

	it("should provide correct accessibilityInfo properties", () => {
		cy.mount(
			<>
				<CheckBox 
					id="accessibilityTestCb" 
					text="Accessibility Test" 
					required 
					readonly 
					accessibleName="Custom Aria Label"
				></CheckBox>
			</>
		);

		cy.get("#accessibilityTestCb").then($checkbox => {
			const checkbox = $checkbox[0] as CheckBox;
			const accInfo = checkbox.accessibilityInfo;
			
            // Description should come from accessibleName property
			expect(accInfo.description).to.equal("Accessibility Test Not checked");
            expect(accInfo.label).to.equal("Custom Aria Label");
			
			expect(accInfo.readonly).to.be.true;
			expect(accInfo.required).to.be.true;
			expect(accInfo.disabled).to.be.false;

            expect(accInfo.type).to.equal("Checkbox");
			expect(accInfo.role).to.equal("checkbox");
		});    
	});

    it("should provide correct accessibilityInfo description from accessibleNameRef", () => {
        cy.mount(
            <>
                <label id="cb-label">Label For Accessibility Test</label>
                <CheckBox 
                    id="accessibilityTestCb1" 
                    accessibleNameRef="cb-label"
                ></CheckBox>
            </>
        );

        cy.get("#accessibilityTestCb1").then($checkbox => {
            const checkbox = $checkbox[0] as CheckBox;
            const accInfo = checkbox.accessibilityInfo;
            
            // Description should come from associated label
            expect(accInfo.description).to.equal("Not checked");
            expect(accInfo.label).to.equal("Label For Accessibility Test");
        });    
    });

    it("should provide correct accessibilityInfo description from associated label", () => {
        cy.mount(
            <>
                <label for="accessibilityTestCb3">Label For Accessibility Test</label>
                <CheckBox 
                    id="accessibilityTestCb3" 
                ></CheckBox>
            </>
        );

        cy.get("#accessibilityTestCb3").then($checkbox => {
            const checkbox = $checkbox[0] as CheckBox;
            const accInfo = checkbox.accessibilityInfo;
            
            // Description should come from associated label
            expect(accInfo.description).to.equal("Not checked");
            expect(accInfo.label).to.equal("Label For Accessibility Test");
        });    
    });
});
