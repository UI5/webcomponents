import { createReactComponent } from "@ui5/webcomponents-base";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

function App() {

  return (
    <>
      <Select>
            <Option icon="laptop">Desktop</Option>
            <Option icon="ipad" selected={true}>Tablet</Option>
            <Option icon="iphone">Phone</Option>
        </Select>
    </>
  );
}

export default App;
