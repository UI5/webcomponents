import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";

const Label = createComponent(LabelClass);

function App() {

  return (
    <>
      <Label style={{ color: "var(--sapPositiveColor)", fontSize: "1.25rem" }}>Styled Label</Label>
        <Label style={{ color: "var(--sapNegativeColor)", fontSize: "1rem", fontStyle: "italic" }}>Styled Label</Label>
    </>
  );
}

export default App;
