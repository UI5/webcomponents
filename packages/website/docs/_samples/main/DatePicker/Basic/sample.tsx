import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";

const DatePicker = createReactComponent(DatePickerClass);

export const Example = () => {
  return <DatePicker />;
}
