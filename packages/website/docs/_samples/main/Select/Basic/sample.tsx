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
      <Select value="tablet">
        <Option value="desktop" icon="laptop">
          Desktop
        </Option>
        <Option value="tablet" icon="ipad">
          Tablet
        </Option>
        <Option value="phone" icon="iphone">
          Phone
        </Option>
      </Select>
    </>
  );
}

export default App;
