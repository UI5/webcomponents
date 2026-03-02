import { createReactComponent } from "@ui5/webcomponents-base";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";

const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);

function App() {

  return (
    <>
      <Select value-state="Positive">
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal">Avocado</Option>
        <Option icon="meal">Mango</Option>
    </Select>

    <Select value-state="Information">
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal">Avocado</Option>
        <Option icon="meal">Mango</Option>
    </Select>

    <Select value-state="Critical">
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal">Avocado</Option>
        <Option icon="meal">Mango</Option>
    </Select>

    <Select value-state="Negative">
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal">Avocado</Option>
        <Option icon="meal">Mango</Option>
    </Select>

    <Select value-state="Negative" placeholder="Custom value-state message">
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal">Avocado</Option>
        <Option icon="meal">Mango</Option>

        <div slot="valueStateMessage">Please provide valid value</div>
    </Select>

    <Select readonly={true}>
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal">Avocado</Option>
        <Option icon="meal">Mango</Option>
    </Select>

    <Select disabled={true}>
        <Option icon="meal" selected={true}>Apple</Option>
        <Option icon="meal" >Avocado</Option>
        <Option icon="meal">Mango</Option>
    </Select>
    </>
  );
}

export default App;
