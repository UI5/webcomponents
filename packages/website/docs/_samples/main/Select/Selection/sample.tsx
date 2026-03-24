import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Label = createReactComponent(LabelClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Text = createReactComponent(TextClass);

export const Example = () => {
  const [selectedValue, setSelectedValue] = useState("DE");

  const handleCountrySelectChange = (
    e: UI5CustomEvent<SelectClass, "change">,
  ) => {
    setSelectedValue(e.currentTarget.value!);
  };

  return (
    <>
      <div>
        <Label showColon={true} for="countrySelect">Country</Label>
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
