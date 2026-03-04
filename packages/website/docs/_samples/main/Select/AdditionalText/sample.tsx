import { createReactComponent } from "@ui5/webcomponents-base";
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
            <Option additional-text="AT">Austria</Option>
            <Option additional-text="BE">Belgium</Option>
            <Option additional-text="BR">Brazil</Option>
            <Option additional-text="BG">Bulgaria</Option>
            <Option additional-text="CA">Canada</Option>
        </Select>
    </>
  );
}

export default App;
