import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";

const CheckBox = createReactComponent(CheckBoxClass);

export const Example = () => {
  return (
    <>
      <CheckBox text="Positive" valueState="Positive" />
      <CheckBox text="Negative" valueState="Negative" />
      <CheckBox text="Critical" valueState="Critical" />
      <CheckBox text="Information" valueState="Information" />
      <CheckBox text="Disabled" disabled={true} checked={true} />
      <CheckBox text="Readonly" readonly={true} checked={true} />
      <CheckBox
        text="Positive disabled"
        disabled={true}
        valueState="Positive"
        checked={true}
      />
      <CheckBox
        text="Negative disabled"
        disabled={true}
        valueState="Negative"
        checked={true}
      />
      <CheckBox
        text="Critical disabled "
        disabled={true}
        valueState="Critical"
        checked={true}
      />
      <CheckBox
        text="Information disabled "
        disabled={true}
        valueState="Information"
        checked={true}
      />
      <CheckBox
        text="Positive readonly"
        readonly={true}
        valueState="Positive"
        checked={true}
      />
      <CheckBox
        text="Negative readonly"
        readonly={true}
        valueState="Negative"
        checked={true}
      />
      <CheckBox
        text="Critical readonly"
        readonly={true}
        valueState="Critical"
        checked={true}
      />
      <CheckBox
        text="Information readonly"
        readonly={true}
        valueState="Information"
        checked={true}
      />
      <CheckBox
        text="Positive indeterminate"
        valueState="Positive"
        indeterminate={true}
        checked={true}
      />
      <CheckBox
        text="Negative indeterminate"
        valueState="Negative"
        indeterminate={true}
        checked={true}
      />
      <CheckBox
        text="Critical indeterminate"
        valueState="Critical"
        indeterminate={true}
        checked={true}
      />
      <CheckBox
        text="Information indeterminate"
        valueState="Information"
        indeterminate={true}
        checked={true}
      />
    </>
  );
}
