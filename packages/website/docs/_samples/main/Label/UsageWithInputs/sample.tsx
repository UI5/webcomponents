import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const CheckBox = createReactComponent(CheckBoxClass);
const DatePicker = createReactComponent(DatePickerClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const TextArea = createReactComponent(TextAreaClass);

export const Example = () => {
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
        <Label for="myInput" required={true} showColon={true}>
          First name
        </Label>
        <Input id="myInput" required={true} placeholder="Enter your name" />
        <Label for="myDatePicker" required={true} showColon={true}>
          Date of birth
        </Label>
        <DatePicker id="myDatePicker" required={true} />
        <Label for="mySelect" required={true} showColon={true}>
          Job
        </Label>
        <Select id="mySelect" required={true}>
          <Option>Manager</Option>
          <Option>Sales</Option>
          <Option selected={true}>Developer</Option>
        </Select>
        <Label for="myTextArea" required={true} showColon={true}>
          Description
        </Label>
        <TextArea
          id="myTextArea"
          required={true}
          placeholder="Type as much text as you wish"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label for="myCheckBox" required={true} showColon={true}>
            Accept terms of use
          </Label>
          <CheckBox id="myCheckBox" required={true} />
        </div>
      </div>
    </>
  );
}
