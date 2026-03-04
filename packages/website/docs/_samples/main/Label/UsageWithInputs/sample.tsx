import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const CheckBox = createComponent(CheckBoxClass);
const DatePicker = createComponent(DatePickerClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);
const TextArea = createComponent(TextAreaClass);

function App() {

  return (
    <>
      <style>{`
        .f {
            display: flex;
            flex-direction: column;
        }
        .f > :nth-child(2n) {
            margin-bottom: 1.5rem;
        }
      `}</style>
      <div className="f">
            <Label htmlFor="myInput" required={true} showColon={true}>First name</Label>
            <Input id="myInput" required={true} placeholder="Enter your name" />
            <Label htmlFor="myDatePicker" required={true} showColon={true}>Date of birth</Label>
            <DatePicker id="myDatePicker" required={true} />
            <Label htmlFor="mySelect" required={true} showColon={true}>Job</Label>
            <Select id="mySelect" required={true}>
                <Option>Manager</Option>
                <Option>Sales</Option>
                <Option selected={true}>Developer</Option>
            </Select>
            <Label htmlFor="myTextArea" required={true} showColon={true}>Description</Label>
            <TextArea id="myTextArea" required={true} placeholder="Type as much text as you wish" />
            <div style={{ display: "flex", alignItems: "center" }}>
                <Label htmlFor="myCheckBox" required={true} showColon={true}>Accept terms of use</Label>
                <CheckBox id="myCheckBox" required={true} />
            </div>
        </div>
    </>
  );
}

export default App;
