import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import OptionCustomClass from "@ui5/webcomponents/dist/OptionCustom.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/soccer.js";

const Icon = createComponent(IconClass);
const OptionCustom = createComponent(OptionCustomClass);
const Select = createComponent(SelectClass);

function App() {
  return (
    <>
      <Select>
        <OptionCustom displayText="AR">
          <div className="optionContent">
            <Icon name="soccer" />
            Argentina
            <Icon name="employee" />
          </div>
        </OptionCustom>

        <OptionCustom displayText="BE">
          <div className="optionContent">
            <Icon name="soccer" />
            Belgium
            <Icon name="employee" />
          </div>
        </OptionCustom>

        <OptionCustom displayText="BR">
          <div className="optionContent">
            <Icon name="soccer" />
            Brazil
            <Icon name="employee" />
          </div>
        </OptionCustom>
      </Select>
    </>
  );
}

export default App;
