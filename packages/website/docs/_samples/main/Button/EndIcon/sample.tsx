import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/home.js";

const Button = createReactComponent(ButtonClass);

function App() {

  return (
    <>
      <Button end-icon="navigation-down-arrow">Button with Icon at the end</Button>
        <Button icon="home" end-icon="navigation-down-arrow">Button with two Icons</Button>
    </>
  );
}

export default App;
