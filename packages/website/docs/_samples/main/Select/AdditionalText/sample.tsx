import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents-icons/dist/ipad.js";
import "@ui5/webcomponents-icons/dist/iphone.js";
import "@ui5/webcomponents-icons/dist/laptop.js";

const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

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
