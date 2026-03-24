import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import DateRangePickerClass from "@ui5/webcomponents/dist/DateRangePicker.js";

const DateRangePicker = createReactComponent(DateRangePickerClass);

export const Example = () => {
  return (
    <DateRangePicker
      displayFormat="dd/MM/yyyy"
      valueFormat="dd/MM/yyyy"
      minDate="1/2/2024"
      maxDate="1/7/2024"
    />
  );
}
