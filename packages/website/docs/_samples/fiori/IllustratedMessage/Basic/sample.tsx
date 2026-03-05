import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const IllustratedMessage = createComponent(IllustratedMessageClass);
const Button = createComponent(ButtonClass);

function App() {

  return (
    <>
      <IllustratedMessage name="UnableToUpload">
            <Button design="Emphasized">Action 1</Button>
            <Button>Action 2</Button>
        </IllustratedMessage>
    </>
  );
}

export default App;
