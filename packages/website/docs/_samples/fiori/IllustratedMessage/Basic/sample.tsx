import { createReactComponent } from "@ui5/webcomponents-base";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";

const IllustratedMessage = createReactComponent(IllustratedMessageClass);
const Button = createReactComponent(ButtonClass);

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
