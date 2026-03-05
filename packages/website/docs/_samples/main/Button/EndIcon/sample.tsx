import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/home.js";

const Button = createComponent(ButtonClass);

function App() {
  return (
    <>
      <Button endIcon="navigation-down-arrow">
        Button with Icon at the end
      </Button>
      <Button icon="home" endIcon="navigation-down-arrow">
        Button with two Icons
      </Button>
    </>
  );
}

export default App;
