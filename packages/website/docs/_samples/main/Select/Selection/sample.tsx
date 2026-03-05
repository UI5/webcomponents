import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Label = createComponent(LabelClass);
const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);
const Text = createComponent(TextClass);

function App() {
  const [selectedValue, setSelectedValue] = useState("DE");

  const handleCountrySelectChange = (
    e: UI5CustomEvent<SelectClass, "change">,
  ) => {
    setSelectedValue(e.currentTarget.value!);
  };

  return (
    <>
      <div>
        <Label for="countrySelect">Country:</Label>
        <Select
          id="countrySelect"
          value="DE"
          onChange={handleCountrySelectChange}
        >
          <Option value="US">United States</Option>
          <Option value="DE">Germany</Option>
          <Option value="FR">France</Option>
          <Option value="UK">United Kingdom</Option>
        </Select>
      </div>

      <div>
        <Label>
          Selected value: <Text id="output">{selectedValue}</Text>
        </Label>
      </div>
    </>
  );
}

export default App;
