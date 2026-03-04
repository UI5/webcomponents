import { createReactComponent } from "@ui5/webcomponents-base";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents-icons/dist/meal.js";

const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

function App() {

  return (
    <>
      <Select valueState="Positive" value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>
    </Select>

    <Select valueState="Information" value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>
    </Select>

    <Select valueState="Critical" value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>
    </Select>

    <Select valueState="Negative" value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>
    </Select>

    <Select valueState="Negative" value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>

        <div slot="valueStateMessage">Please provide valid value</div>
    </Select>

    <Select readonly={true} value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>
    </Select>

    <Select disabled={true} value="apple">
        <Option value="apple" icon="meal">Apple</Option>
        <Option value="avocado" icon="meal">Avocado</Option>
        <Option value="mango" icon="meal">Mango</Option>
    </Select>
    </>
  );
}

export default App;
