import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";

const Bar = createReactComponent(BarClass);
const IllustratedMessage = createReactComponent(IllustratedMessageClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);

function App() {

  const handleClick = () => {
    dialog.open = true;
  };

  const handleClick = () => {
    dialog.open = false;
  };

  return (
    <>
      <Button id="openDialogButton">Open Dialog</Button>
        <Dialog id="hello-dialog" header-text="Error">
            <IllustratedMessage name="UnableToLoad" />
            <Bar design="Footer" slot="footer">
                <Button id="closeDialogButton" design="Emphasized" slot="endContent">Close</Button>
            </Bar>
        </Dialog>
    </>
  );
}

export default App;
