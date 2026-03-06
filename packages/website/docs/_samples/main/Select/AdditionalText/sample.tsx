import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents-icons/dist/ipad.js";
import "@ui5/webcomponents-icons/dist/iphone.js";
import "@ui5/webcomponents-icons/dist/laptop.js";

const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);

function App() {
  return (
    <>
      <Select>
        <Option additionalText="AT">Austria</Option>
        <Option additionalText="BE">Belgium</Option>
        <Option additionalText="BR">Brazil</Option>
        <Option additionalText="BG">Bulgaria</Option>
        <Option additionalText="CA">Canada</Option>
      </Select>
    </>
  );
}

export default App;
