import CheckBox from "../../src/CheckBox.js";
import Switch from "../../src/Switch.js";
import Link from "../../src/Link.js";
import Label from "../../src/Label.js";
import Text from "../../src/Text.js";
import RatingIndicator from "../../src/RatingIndicator.js";
import StepInput from "../../src/StepInput.js";
import Button from "../../src/Button.js";
import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import SegmentedButtonItem from "../../src/SegmentedButtonItem.js";
import SegmentedButton from "../../src/SegmentedButton.js";
import Input from "../../src/Input.js";
import DatePicker from "../../src/DatePicker.js";
import RadioButton from "../../src/RadioButton.js";
import RangeSlider from "../../src/RangeSlider.js";
import Slider from "../../src/Slider.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";
import FileUploader from "../../src/FileUploader.js";

describe("Vertical Alignment", () => {
	it("tests container height to detect and avoid vertical misalignment", () => {
		cy.mount(
			<>
			<div id="container">
				<Input value="value"></Input>
				<DatePicker value="today"></DatePicker>
				<SegmentedButton accessibleName="Geographic location">
					<SegmentedButtonItem>Map</SegmentedButtonItem>
					<SegmentedButtonItem selected>Satellite</SegmentedButtonItem>
				</SegmentedButton>
				<ComboBox value="Bulgaria">
					<ComboBoxItem text="Algeria" id="cbi"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Bosnia and Herzegovina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
					<ComboBoxItem text="Bulgaria"></ComboBoxItem>
					<ComboBoxItem text="Canada"></ComboBoxItem>
					<ComboBoxItem text="Chile"></ComboBoxItem>
				</ComboBox>
				<Select>
					<Option>Option 1</Option>
					<Option>Option 2</Option>
					<Option>Option 3</Option>
				</Select>
			</div>

			<div id="container2">
				<CheckBox text="Check" checked></CheckBox>
				<Switch textOn="On" textOff="Off"></Switch>
				<RadioButton text="option c" checked></RadioButton>
				<Label>Lorem ipsum dolor sit</Label>
				<Text>Some text here</Text>
				<Button>Click Me</Button>
				<Link href="https://ui5webcomponents.github.io" target="_blank">Link</Link>
				<StepInput></StepInput>
				<FileUploader></FileUploader>
			</div>

			<div id="container3">
				<RatingIndicator></RatingIndicator>
			</div>

			<div id="container4">
				<RangeSlider id="range_slider1" style={{ width: "200px" }}></RangeSlider>
				<Slider id="slider1" style={{ width: "200px" }}></Slider>
			</div>
			</>
		);

		cy.get("#container").should("have.css", "height", "44px");
		cy.get("#container2").should("have.css", "height", "44px");
		cy.get("#container3").should("have.css", "height", "48px");
		cy.get("#container4").should("have.css", "height", "53px");
	});
});
