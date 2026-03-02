import { createReactComponent } from "@ui5/webcomponents-base";
import IconClass from "@ui5/webcomponents/dist/Icon.js";

const Icon = createReactComponent(IconClass);

function App() {

  return (
    <Icon name="home" mode="Interactive" />
  );
}

export default App;
