import { createReactComponent } from "@ui5/webcomponents-base";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const CheckBox = createReactComponent(CheckBoxClass);

function App() {

  return (
    <>
      <CheckBox text="Positive" value-state="Positive" />
        <CheckBox text="Negative" value-state="Negative" />
        <CheckBox text="Critical" value-state="Critical" />
        <CheckBox text="Information" value-state="Information" />
        <CheckBox text="Disabled" disabled={true} checked={true} />
        <CheckBox text="Readonly" readonly={true} checked={true} />
        <CheckBox text="Positive disabled" disabled={true} value-state="Positive" checked={true} />
        <CheckBox text="Negative disabled" disabled={true} value-state="Negative" checked={true} />
        <CheckBox text="Critical disabled " disabled={true} value-state="Critical" checked={true} />
        <CheckBox text="Information disabled " disabled={true} value-state="Information" checked={true} />
        <CheckBox text="Positive readonly" readonly={true} value-state="Positive" checked={true} />
        <CheckBox text="Negative readonly" readonly={true} value-state="Negative" checked={true} />
        <CheckBox text="Critical readonly" readonly={true} value-state="Critical" checked={true} />
        <CheckBox text="Information readonly" readonly={true} value-state="Information" checked={true} />
        <CheckBox text="Positive indeterminate" value-state="Positive" indeterminate={true} checked={true} />
        <CheckBox text="Negative indeterminate" value-state="Negative" indeterminate={true} checked={true} />
        <CheckBox text="Critical indeterminate" value-state="Critical" indeterminate={true} checked={true} />
        <CheckBox text="Information indeterminate" value-state="Information" indeterminate={true} checked={true} />
    </>
  );
}

export default App;
