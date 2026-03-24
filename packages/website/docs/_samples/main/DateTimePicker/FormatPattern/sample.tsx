import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DateTimePickerClass from "@ui5/webcomponents/dist/DateTimePicker.js";

const DateTimePicker = createReactComponent(DateTimePickerClass);

export const Example = () => {
  return (
    <>
      <DateTimePicker valueFormat="dd/MM/yyyy, hh:mm" displayFormat="dd/MM/yyyy, hh:mm" />

      <DateTimePicker valueFormat="dd/MM/yyyy, hh:mm:ss aa" displayFormat="dd/MM/yyyy, hh:mm:ss aa" />

      <DateTimePicker valueFormat="long" displayFormat="long" />
    </>
  );
}
