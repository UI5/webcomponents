import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const Button = createComponent(ButtonClass);

function App() {

  return (
    <>
      <Button>Press</Button>
        <Button icon="edit">Edit</Button>
        <Button disabled={true}>Merge</Button>
    </>
  );
}

export default App;
