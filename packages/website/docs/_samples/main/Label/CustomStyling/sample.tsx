import { createReactComponent } from "@ui5/webcomponents-base";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Label = createReactComponent(LabelClass);

function App() {

  return (
    <>
      <Label style={{ color: "var(--sapPositiveColor)", fontSize: "1.25rem" }}>Styled Label</Label>
        <Label style={{ color: "var(--sapNegativeColor)", fontSize: "1rem", fontStyle: "italic" }}>Styled Label</Label>
    </>
  );
}

export default App;
