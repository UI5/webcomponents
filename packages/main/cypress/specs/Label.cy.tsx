import "../../src/Assets.js";
import "../../test/pages/modules/LabelPageCustomElement.js";
import {
	LABEL_COLON,
} from "../../src/generated/i18n/i18n-defaults.js";
import Label from "../../src/Label.js";
import Input from "../../src/Input.js";
import TextArea from "../../src/TextArea.js";
import DatePicker from "../../src/DatePicker.js";

describe("Label", () => {
	describe("General API ", () => {
		it("tests initial rendering - root and slot", () => {
			cy.mount(<Label>Basic Label</Label>);
			cy.get("[ui5-label]").shadow().find(".ui5-label-root").should("exist");
			cy.get("[ui5-label]").shadow().find("slot:not([name])");
		});

		it("should show required star", () => {
			cy.mount(<Label required={true}>Required Label</Label>);
			cy.get("[ui5-label]")
				.shadow()
				.find(".ui5-label-required-colon")
				.then($el => {
					return getComputedStyle($el[0], ":after").content;
				})
				.should("equal", `"*"`);
		});

		it("tests show-colon does not force truncation", () => {
			cy.mount(
				<>
					<Label id="showColon-false">Basic Label</Label>
					<Label showColon={true} id="showColon-true">Basic Label</Label>
				</>
			);

			cy.get("#showColon-true").shadow().find(".ui5-label-text-wrapper").invoke("width")
				.then($labelWithColonWidth => {
					cy.get("#showColon-false").shadow().find(".ui5-label-text-wrapper").should("have.css", "width", `${$labelWithColonWidth}px`);
				});
		});

		it("should wrap the text of the label by default and truncate when wrappingType is None", () => {
			cy.mount(
				<>
					<Label id="wrapping-label-1" style="width: 200px">Reprehenderit amet cillum tempor ex eu dolor adipisicing reprehenderit pariatur.</Label>
					<Label id="truncated-label-1" wrappingType="None" style="width: 200px">Reprehenderit amet cillum tempor ex eu dolor adipisicing reprehenderit pariatur.</Label>
				</>
			);

			cy.get("#wrapping-label-1").invoke("height").then($wrappingLabelHeight => {
				cy.get("#truncated-label-1").invoke("height").should($truncatedLabelHeight => {
					expect($wrappingLabelHeight).to.be.greaterThan(16);
					expect($truncatedLabelHeight).to.be.lessThan(17);
				});
			});
		});

		it("colon symbol should be taken from the i18n bundle", () => {
			cy.mount(<Label showColon={true} id="showColon-true">Basic Label</Label>);

			cy.get("#showColon-true").shadow().find(".ui5-label-required-colon").then($el => {
				return getComputedStyle($el[0], ":before").content;
			})
				.should("equal", `"${LABEL_COLON.defaultText}"`);
		});
	});

	describe("linked element with 'for' property", () => {
		it("should focus ui5-input on click and set correct aria-label", () => {
			cy.mount(
				<>
					<Label for="form-ui5-input">Label for Input</Label>
					<Input id="form-ui5-input" style="width: 200px"></Input>
				</>
			);

			cy.get("[ui5-input]").shadow().find(".ui5-input-inner").should("have.attr", "aria-label", "Label for Input");

			cy.get("[ui5-label]").realClick();
			cy.get("[ui5-input]").should("be.focused");
		});

		it("should focus native HTML input on click", () => {
			cy.mount(
				<>
					<Label for="native-input">Label for Native Input</Label>
					<input id="native-input" />
				</>
			);

			cy.get("[ui5-label]").realClick();
			cy.get("#native-input").should("be.focused");
		});

		it("should focus ui5-textarea on click", () => {
			cy.mount(
				<>
					<Label for="ui5-textarea">Label for Textarea</Label>
					<TextArea id="ui5-textarea"></TextArea>
				</>
			);

			cy.get("[ui5-label]").realClick();
			cy.get("#ui5-textarea").should("be.focused");
		});

		it("should focus native HTML textarea on click", () => {
			cy.mount(
				<>
					<Label for="native-textarea">Label for Native Textarea</Label>
					<textarea id="native-textarea"></textarea>
				</>
			);

			cy.get("[ui5-label]").realClick();
			cy.get("#native-textarea").should("be.focused");
		});

		it("should focus ui5-date-picker on click", () => {
			cy.mount(
				<>
					<Label for="ui5-datepicker">Label for Date Picker</Label>
					<DatePicker id="ui5-datepicker"></DatePicker>
				</>
			);

			cy.get("[ui5-date-picker]").should("be.visible");

			cy.get("[ui5-label]").realClick();
			cy.get("[ui5-date-picker]").should("be.focused");
		});

		// Custom component should be reworked a bit
		// it("should focus within a shadow root", () => {
		// 	cy.mount(
		// 		<label-page-custom-element id="custom-element-with-label"></label-page-custom-element>
		// 	);

		// 	cy.get("#custom-element-with-label").shadow().find("[ui5-label]").realClick();
		// 	cy.get("#custom-element-with-label").shadow().find("#input").should("be.focused");
		// });
	});
});
