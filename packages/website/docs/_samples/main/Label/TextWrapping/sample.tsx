import { createReactComponent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <style>{`
        .w200 {
            width: 200px;
        }
      `}</style>
      <Label className="w200">Label that demonstrates how the long labels could be wrapped. To test the truncation, use wrapping-type="None"</Label>
        <br /><br />
        <Label className="w200" wrapping-type="None">Label that demonstrates truncation, the long labels will be truncated.</Label>
    </>
  );
}

export default App;
