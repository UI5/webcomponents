import TextArea from "../../src/TextArea.js";
import Label from "../../src/Label.js";

describe("TextArea general interaction", () => {
	describe("Attribute propagation", () => {
		it("Should change the placeholder of the inner textarea", () => {
			const attributeValue = "test";

			cy.mount(<TextArea placeholder={attributeValue}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "placeholder", attributeValue);
		});

		it("Disabled attribute is propagated properly", () => {
			cy.mount(<TextArea disabled={true}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "disabled");
		});

		it("Redonly attribute is propagated properly", () => {
			cy.mount(<TextArea readonly={true}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "readonly");
		});

		it("Required attribute is propagated properly", () => {
			cy.mount(<TextArea required={true}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-required", "true");

			cy.mount(<TextArea></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-required", "false");
		});

		it("Value attribute is propagated properly", () => {
			const attributeValue = "test";

			cy.mount(<TextArea value={attributeValue}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.value", attributeValue);
		});

		it("Tests aria-label", () => {
			const attributeValue = "test";

			cy.mount(<TextArea accessibleName={attributeValue}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Tests aria-labelledby", () => {
			const attributeValue = "test";

			cy.mount(
				<>
					<span id="ref">{attributeValue}</span>
					<TextArea accessibleNameRef="ref"></TextArea>
				</>
			);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Checks if aria-invalid is set correctly", () => {
			cy.mount(<TextArea valueState="Negative"></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-invalid", "true");

			cy.mount(<TextArea valueState="Critical"></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("not.have.attr", "aria-invalid");
		});

		it("Tests aria-label is set to match the label text when label is for that text area", () => {
			const attributeValue = "test";

			cy.mount(
				<>
					<Label for="ref">{attributeValue}</Label>
					<TextArea id="ref"></TextArea>
				</>
			);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Tests aria-label is set directly from the property accessible-name of the text-area", () => {
			const attributeValue = "test";

			cy.mount(
				<>
					<Label for="ref">some text</Label>
					<TextArea id="ref" accessibleName={attributeValue}></TextArea>
				</>
			);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("Tests accessibleDescription property", () => {
			const descriptionValue = "This is a direct description";

			cy.mount(<TextArea accessibleDescription={descriptionValue}></TextArea>);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("#accessibleDescription")
				.should("contain.text", descriptionValue);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-describedby")
				.and("include", "accessibleDescription");
		});

		it("Tests accessibleDescriptionRef property", () => {
			const descriptionValue = "External description text";

			cy.mount(
				<>
					<div id="external-desc">{descriptionValue}</div>
					<TextArea accessibleDescriptionRef="external-desc"></TextArea>
				</>
			);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("#accessibleDescription")
				.should("contain.text", descriptionValue);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("textarea")
				.should("have.attr", "aria-describedby")
				.and("include", "accessibleDescription");
		});

		it("Tests accessibleDescriptionRef with multiple references", () => {
			const desc1 = "First description";
			const desc2 = "Second description";

			cy.mount(
				<>
					<div id="desc1">{desc1}</div>
					<div id="desc2">{desc2}</div>
					<TextArea accessibleDescriptionRef="desc1 desc2"></TextArea>
				</>
			);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("#accessibleDescription")
				.should("contain.text", desc1)
				.and("contain.text", desc2);
		});

		it("Tests accessibleDescriptionRef takes precedence over accessibleDescription", () => {
			const directDesc = "Direct description";
			const refDesc = "Referenced description";

			cy.mount(
				<>
					<div id="ref-desc">{refDesc}</div>
					<TextArea accessibleDescription={directDesc} accessibleDescriptionRef="ref-desc"></TextArea>
				</>
			);

			cy.get("[ui5-textarea]")
				.shadow()
				.find("#accessibleDescription")
				.should("contain.text", refDesc)
				.and("not.contain.text", directDesc);
		});
	});

	describe("disabled and readonly textarea", () => {
		it("can not be edited when disabled", () => {
			cy.mount(<TextArea disabled></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "");
		});

		it("can not be edited when readonly", () => {
			cy.mount(<TextArea readonly></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "");
		});
	});

	describe("when enabled", () => {
		it("shows value state message", () => {
			cy.mount(<TextArea valueState="Negative"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.and("have.attr", "open");
		});

		it("does not show value state msg when valueState='None'", () => {
			cy.mount(<TextArea valueState="None"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("not.exist");
		});

		it("Should not open value state message when textarea is in readonly state", () => {
			cy.mount(<TextArea readonly valueState="Negative"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("not.exist");
		});

		it("fires change event", () => {
			cy.mount(<TextArea></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
				});

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.focused()
				.blur();

			cy.get("@changed")
				.should("have.been.calledOnce");
		});

		it("fires input event", () => {
			cy.mount(<TextArea></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@input")
				.should("have.been.calledThrice");
		});
	});

	describe("when growing", () => {
		it("Should have 8 rows and grow", () => {
			cy.mount(<TextArea growing={true} rows={8}></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.focused()
						.realType("1{enter}");

					cy.focused()
						.realType("2{enter}");

					cy.focused()
						.realType("3{enter}");

					cy.focused()
						.realType("4{enter}");

					cy.focused()
						.realType("5{enter}");

					cy.focused()
						.realType("6{enter}");

					cy.focused()
						.realType("7{enter}");

					cy.focused()
						.realType("8");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);

					cy.focused()
						.realType("{enter}9");

					cy.get("@textarea")
						.invoke("height")
						.should("be.greaterThan", initialTextareaSize);
				});
		});

		it("Should have 8 rows and grow", () => {
			cy.mount(<TextArea growing={true} growingMaxRows={4}></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.get("@textarea")
						.realType("1{enter}")
						.realType("2");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);
				});

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.get("@textarea")
						.realType("{enter}3")
						.realType("{enter}4");

					cy.get("@textarea")
						.invoke("height")
						.should("be.greaterThan", initialTextareaSize);
				});

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.get("@textarea")
						.realType("{enter}5")
						.realType("{enter}6");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);
				});
		});

		it("should grow correctly when typing symbols (&)", () => {
			cy.mount(<TextArea growing={true} value="&&&" style="width: 100px"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.then(textarea => {
					const initialTextareaSize = textarea.height();

					cy.focused()
						.realType("&");

					cy.get("@textarea")
						.invoke("height")
						.should("be.equal", initialTextareaSize);
				});
		});
	});


	describe("When having max length set", () => {
		it("prevents input when max is reached", () => {
			cy.mount(<TextArea maxlength={10}></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realType("123456789123456789121111");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "1234567891");
		});

		describe("When having max length set", () => {
			it("Shows counter", () => {
				cy.mount(<TextArea maxlength={10} showExceededText={true}></TextArea>);

				cy.get("[ui5-textarea]")
					.as("textarea");

				cy.get("@textarea")
					.realClick();

				cy.get("@textarea")
					.should("be.focused");

				cy.get("@textarea")
					.shadow()
					.find(".ui5-textarea-exceeded-text")
					.as("exceededText")
					.should("contain.text", "10 characters remaining");

				cy.get("@textarea")
					.realType("1234567890");

				cy.get("@exceededText")
					.should("contain.text", "0 characters remaining");

				cy.get("@textarea")
					.realType("12345");

				cy.get("@exceededText")
					.should("contain.text", "5 characters over limit");
			});

			it("Shows exceeded text when maxLength is 0", () => {
				cy.mount(<TextArea maxlength={0} showExceededText={true}></TextArea>);

				cy.get("[ui5-textarea]")
					.as("textarea");

				cy.get("@textarea")
					.realClick();

				cy.get("@textarea")
					.should("be.focused");

				cy.get("@textarea")
					.shadow()
					.find(".ui5-textarea-exceeded-text")
					.as("exceededText")
					.should("contain.text", "0 characters remaining");

				cy.get("@textarea")
					.realType("12345");

				cy.get("@exceededText")
					.should("contain.text", "5 characters over limit");
			});
		});
	});

	describe("Value update", () => {
		it("Should revert the DOM value, when escape is pressed", () => {
			cy.mount(<TextArea></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realType("1234");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "1234");

			cy.get("@textarea")
				.realPress("Escape");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "");
		});

		it("Should allow preventing escape behavior by preventing the input event", () => {
			cy.mount(<TextArea value="initial value"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-input", (event: CustomEvent) => {
						if (event.detail && event.detail.escapePressed) {
							event.preventDefault();
						}
					});
				});

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.realType(" modified");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "initial value modified");

			cy.get("@textarea")
				.realPress("Escape");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.should("have.value", "initial value modified");
		});

		it("Value state type should be added to the screen readers default value states announcement", () => {
			// Negative
			cy.mount(<TextArea valueState="Negative"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Invalid entry")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Error Invalid entry");

			// Critical
			cy.mount(<TextArea valueState="Critical"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Warning issued")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Warning Warning issued");

			// Critical
			cy.mount(<TextArea valueState="Critical"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Warning issued")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Warning Warning issued");

			// Information
			cy.mount(<TextArea valueState="Information"></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.shadow()
				.find("[ui5-popover].ui5-valuestatemessage-popover")
				.should("be.visible")
				.should("have.text", "Informative entry")
				.and("have.attr", "open");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Information Informative entry");

			// Custom
			cy.mount(
				<TextArea valueState="Negative">
					<div slot="valueStateMessage">Custom message</div>
				</TextArea>
			);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.realClick();

			cy.get("@textarea")
				.should("be.focused");

			cy.get("@textarea")
				.find("[slot=\"valueStateMessage\"]")
				.should("be.visible")
				.should("have.text", "Custom message");

			cy.get("@textarea")
				.shadow()
				.find(".ui5-hidden-text")
				.should("have.text", "Value State Error Custom message");
		});

		it("Should select all exceeded characters on paste", () => {
			const text = "Text longer then twenty characters";
			const maxlength = 20;
			const expectedSelectionRange = text.length - maxlength;

			cy.mount(<TextArea value={text} maxlength={maxlength} showExceededText={true}></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea");

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.as("nativeTextarea")
				.then($nativeTextarea => {
					const inputElement = $nativeTextarea.get(0);

					const inputEvent = new InputEvent("input", {
						inputType: "insertFromPaste",
						data: text,
					});

					inputElement.dispatchEvent(inputEvent);
				});

			cy.get<HTMLTextAreaElement>("@nativeTextarea")
				.then(textarea => {
					return textarea.get(0).selectionEnd - textarea.get(0).selectionStart;
				})
				.should("be.equal", expectedSelectionRange);

			cy.get("@textarea")
				.shadow()
				.find(".ui5-textarea-exceeded-text")
				.should("contain.text", `${expectedSelectionRange} characters over limit`);
		});
	});

	describe("selection events", () => {
		it("fires select event", () => {
			cy.mount(<TextArea style={{ height: "320px", width: "400px" }} value="Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et. Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et."></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-select", cy.stub().as("select"));
				});

			cy.get("@textarea")
				.realClick({ clickCount: 2 });

			cy.get("@select")
				.should("have.been.calledOnce");
		});

		it("fires select event", () => {
			cy.mount(<TextArea style={{ height: "320px", width: "400px" }} value="Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et. Ipsum enim esse ipsum cupidatat ex veniam labore quis irure. Eiusmod labore anim anim nulla aute ut. Aliqua officia non ex cupidatat consequat non magna eiusmod aliquip laborum aliqua excepteur exercitation. Pariatur deserunt dolore aute sint in minim nisi magna proident proident consequat exercitation consectetur nostrud. Sint voluptate consectetur eu mollit non ullamco minim. In enim velit ea Lorem fugiat nulla esse deserunt nulla cupidatat non. Excepteur proident non ad anim enim culpa occaecat magna incididunt consequat do. Enim minim quis nisi enim est voluptate irure laborum ea cillum eu. Aliquip labore officia amet non exercitation dolore enim incididunt ullamco irure nulla ad nulla et."></TextArea>);

			cy.get("[ui5-textarea]")
				.as("textarea")
				.then(textarea => {
					textarea.get(0).addEventListener("ui5-scroll", cy.stub().as("scroll"));
				});

			cy.get("@textarea")
				.shadow()
				.find("textarea")
				.then(nativeTextarea => {
					nativeTextarea.get(0).scroll({ top: 100 });
				});

			cy.get("@scroll")
				.should("have.been.calledOnce");
		});
	});
});
