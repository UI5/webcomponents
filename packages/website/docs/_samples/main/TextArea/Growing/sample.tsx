import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const TextArea = createReactComponent(TextAreaClass);

export const Example = () => {
  return (
    <TextArea
      growing={true}
      growingMaxRows={5}
      placeholder="Enter new rows..."
    />
  );
}
