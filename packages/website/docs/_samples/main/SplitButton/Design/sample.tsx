import { createReactComponent } from "@ui5/webcomponents-base";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";

const SplitButton = createReactComponent(SplitButtonClass);

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
