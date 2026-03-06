import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";

const RadioButton = createReactComponent(RadioButtonClass);

function App() {
  return (
    <>
      <RadioButton
        style={{ width: "200px" }}
        wrapping-type="None"
        text="Truncating text when 'wrapping-type=None' set and long text"
        name="wrapping"
      />

      <br />

      <RadioButton
        style={{ width: "200px" }}
        text="Wrapping text when 'wrapping-type=Normal' set with long text"
        name="wrapping"
      />
    </>
  );
}

export default App;
