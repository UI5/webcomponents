import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Label = createComponent(LabelClass);

function App() {

  return (
    <>
      <style>{`
        .w200 {
            width: 200px;
        }
      `}</style>
      <Label class="w200">Label that demonstrates how the long labels could be wrapped. To test the truncation, use wrappingType="None"</Label>
        <br /><br />
        <Label class="w200" wrappingType="None">Label that demonstrates truncation, the long labels will be truncated.</Label>
    </>
  );
}

export default App;
