import { createReactComponent } from "@ui5/webcomponents-base";
import InputClass from "@ui5/webcomponents/dist/Input.js";

const Input = createReactComponent(InputClass);

function App() {

  const handleInput = () => {
    const value = input.value;
    
    // Clear existing suggestions
    while (input.lastChild) {
        input.removeChild(input.lastChild);
  };

  return (
    <Input id="input-threshold-3" placeholder="Start typing (threshold: 3 chars)" show-suggestions={true} />
  );
}

export default App;
