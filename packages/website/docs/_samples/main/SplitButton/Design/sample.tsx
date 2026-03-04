import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";

const SplitButton = createComponent(SplitButtonClass);

function App() {

  return (
    <>
      <SplitButton design="Emphasized">
            Emphasized
        </SplitButton>
        <SplitButton design="Default">
            Default
        </SplitButton>
        <SplitButton design="Attention">
            Attention
        </SplitButton>
        <SplitButton design="Positive">
            Positive
        </SplitButton>
        <SplitButton design="Negative">
            Negative
        </SplitButton>
        <SplitButton design="Transparent">
            Transparent
        </SplitButton>
    </>
  );
}

export default App;
