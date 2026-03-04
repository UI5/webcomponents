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
      <Select value="tablet">
            <Option value="desktop" icon="laptop">Desktop</Option>
            <Option value="tablet" icon="ipad">Tablet</Option>
            <Option value="phone" icon="iphone">Phone</Option>
        </Select>
    </>
  );
}

export default App;
