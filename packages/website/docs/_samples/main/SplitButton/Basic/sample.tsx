import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import SplitButtonClass from "@ui5/webcomponents/dist/SplitButton.js";

const SplitButton = createComponent(SplitButtonClass);

function App() {

  return (
    <SplitButton>Split Button</SplitButton>
  );
}

export default App;
