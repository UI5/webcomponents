import ColorPicker from "../../src/ColorPicker.js";
import { COLORPICKER_HUE_SLIDER, COLORPICKER_ALPHA_SLIDER } from "../../src/generated/i18n/i18n-defaults.js";

describe("Color Picker general interaction tests", () => {
	it("should not display color channel inputs and alpha slider in simplified mode", () => {
		cy.mount(<ColorPicker simplified={true}></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-hex-input")
			.should("exist");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#red")
			.should("not.exist");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#alpha")
			.should("not.exist");
	});

	it("should fire change event when color is changed", () => {
		cy.mount(<ColorPicker></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.then($item => {
				$item.get(0).addEventListener("change", cy.stub().as("valueChanged"));
			});

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#red", "123");

		cy.get("@valueChanged")
			.should("have.been.calledOnce");
	});

	it("should correctly parse rgb value to color", () => {
		cy.mount(<ColorPicker value="rgb(0, 255, 0)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.ui5ColorPickerValidateInput(".ui5-color-picker-hex-input", "00ff00");
	});

	it("should correctly parse rgba value color", () => {
		cy.mount(<ColorPicker value="rgba(255, 0, 255, 0.5)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.ui5ColorPickerValidateInput(".ui5-color-picker-hex-input", "ff00ff");

		cy.get("[ui5-color-picker]")
			.ui5ColorPickerValidateInput("#alpha", "0.5");
	});

	it("should correctly parse HEX value to color", () => {
		cy.mount(<ColorPicker value="#fafafa"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.ui5ColorPickerValidateInput(".ui5-color-picker-hex-input", "fafafa");
	});

	it("should correctly sanitize and parse HEX value to color", () => {
		cy.mount(<ColorPicker></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput(".ui5-color-picker-hex-input", "#fafafa");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput(".ui5-color-picker-hex-input", "fafafa");
	});

	it("should correctly parse short form HEX value to color", () => {
		cy.mount(<ColorPicker value="#123"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.ui5ColorPickerValidateInput(".ui5-color-picker-hex-input", "112233");
	});

	it("should correctly parse CSS color value to color", () => {
		cy.mount(<ColorPicker value="gray"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.ui5ColorPickerValidateInput(".ui5-color-picker-hex-input", "808080");
	});

	it("should toggle display from RGB to HSL when arrow button is selected", () => {
		cy.mount(<ColorPicker value="rgba(112, 178, 225, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#hue", "205");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#saturation", "65");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#light", "66");
	});

	it("should update value when color is changed via the RGB input fields", () => {
		cy.mount(<ColorPicker value="rgba(62, 128, 99, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#red", "123");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#green", "56");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#blue", "93");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(123, 56, 93, 1)");
	});

	it("should update value when color is changed via the Hue input field", () => {
		cy.mount(<ColorPicker value="rgba(112, 178, 225, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#hue", "130");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(112, 225, 131, 1)");
	});

	it("should update value when color is changed via the Saturation input field", () => {
		cy.mount(<ColorPicker value="rgba(112, 225, 131, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#saturation", "44");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(130, 206, 143, 1)");
	});

	it("should update value when color is changed via the Light input field", () => {
		cy.mount(<ColorPicker value="rgba(130, 206, 143, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#light", "30");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(43, 110, 54, 1)");
	});

	it("should update value when color is changed via the HEX input field", () => {
		cy.mount(<ColorPicker value="rgba(123, 56, 93, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput(".ui5-color-picker-hex-input", "7be");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(119, 187, 238, 1)");
	});

	it("should update value when alpha is changed via the Alpha input field", () => {
		cy.mount(<ColorPicker value="rgba(232, 128, 222, 0.89)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#alpha", "0.30");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(232, 128, 222, 0.3)");
	});

	it("should update value when color is changed via the Hue slider", () => {
		cy.mount(<ColorPicker value="rgba(70, 64, 191, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-hue-slider")
			.realClick({ position: "center" });

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(64, 191, 189, 1)");
	});

	it("should update value when alpha is changed via the Alpha slider", () => {
		cy.mount(<ColorPicker value="rgba(70, 64, 191, 0)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-alpha-slider")
			.realClick({ position: "center" });

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(70, 64, 191, 0.5)");
	});

	it("should normalize RGB values above 255 to 255", () => {
		cy.mount(<ColorPicker value="rgba(100, 100, 100, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		// Test red input normalization
		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#red", "300");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#red", "255");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(255, 100, 100, 1)");

		// Test green input normalization
		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#green", "400");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#green", "255");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(255, 255, 100, 1)");

		// Test blue input normalization
		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerUpdateInput("#blue", "500");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#blue", "255");

		cy.get<ColorPicker>("@colorPicker")
			.should("have.value", "rgba(255, 255, 255, 1)");
	});

	it("should update Saturation & Light inputs when selecting color from main color grid", () => {
		cy.mount(<ColorPicker value="rgba(136, 64, 101, 1)"></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#hue", "329");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#saturation", "36");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#light", "39");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-main-color")
			.realClick({ x: 200, y: 50 });

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#hue", "329");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#saturation", "81");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerValidateInput("#light", "78");
	});
});

describe("Color Picker accessibility tests", () => {
	it("should show correct accessibility info for RGB inputs", () => {
		cy.mount(<ColorPicker></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#red")
			.should("have.attr", "accessible-name", "Red");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#green")
			.should("have.attr", "accessible-name", "Green");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#blue")
			.should("have.attr", "accessible-name", "Blue");
	});

	it("should show correct accessibility info for HSL inputs", () => {
		cy.mount(<ColorPicker></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.ui5ColorPickerToggleColorMode();

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#hue")
			.should("have.attr", "accessible-name", "Hue");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#saturation")
			.should("have.attr", "accessible-name", "Saturation");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#light")
			.should("have.attr", "accessible-name", "Light");
	});

	it("should show correct accessibility info for sliders and other input", () => {
		cy.mount(<ColorPicker></ColorPicker>);

		cy.get("[ui5-color-picker]")
			.as("colorPicker");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find("#alpha")
			.should("have.attr", "accessible-name", "Alpha");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-hex-input")
			.should("have.attr", "accessible-name", "Hexadecimal");

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-hue-slider")
			.should("have.attr", "accessible-name", ColorPicker.i18nBundle.getText(COLORPICKER_HUE_SLIDER));

		cy.get<ColorPicker>("@colorPicker")
			.shadow()
			.find(".ui5-color-picker-alpha-slider")
			.should("have.attr", "accessible-name", ColorPicker.i18nBundle.getText(COLORPICKER_ALPHA_SLIDER));
	});
});
