import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import IconClass from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/home.js";

const Icon = createComponent(IconClass);

function App() {

  return (
    <Icon name="home" mode="Interactive" />
  );
}

export default App;
