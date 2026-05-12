import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import OptionGroupClass from "@ui5/webcomponents/dist/OptionGroup.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const Option = createReactComponent(OptionClass);
const OptionGroup = createReactComponent(OptionGroupClass);
const Select = createReactComponent(SelectClass);

function App() {
  return (
    <>
      <Select>
        <OptionGroup headerText="Oceania">
          <Option value="au">Australia</Option>
          <Option value="nz">New Zealand</Option>
        </OptionGroup>
        <OptionGroup headerText="Europe">
          <Option value="fr">France</Option>
          <Option value="de" selected>
            Germany
          </Option>
        </OptionGroup>
      </Select>
    </>
  );
}

export default App;
