import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const CheckBox = createReactComponent(CheckBoxClass);

function App() {
  return (
    <>
      <CheckBox
        style={{ width: "200px" }}
        text="Truncating text when 'wrapping-type=None' set and some long text."
        wrapping-type="None"
      />

      <br />

      <CheckBox
        style={{ width: "200px" }}
        checked={true}
        text="Wrapping text when the components is with its default 'wrapping-type=Normal' and some long text."
      />
    </>
  );
}

export default App;
