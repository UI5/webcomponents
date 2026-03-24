import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";

const TimePicker = createReactComponent(TimePickerClass);

export const Example = () => {
  return <TimePicker />;
}
