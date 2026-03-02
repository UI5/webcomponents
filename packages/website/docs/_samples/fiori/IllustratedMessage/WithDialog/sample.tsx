import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import "@ui5/webcomponents-fiori/dist/illustrations/UnableToLoad.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Bar = createReactComponent(BarClass);
const IllustratedMessage = createReactComponent(IllustratedMessageClass);

function App() {
  const dialogRef = React.useRef<typeof DialogClass.prototype>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.open = true;
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.open = false;
    }
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <Dialog ref={dialogRef} headerText="Error">
        <IllustratedMessage name="UnableToLoad" />
        <Bar design="Footer" slot="footer">
          <Button design="Emphasized" slot="endContent" onClick={closeDialog}>Close</Button>
        </Bar>
      </Dialog>
    </>
  );
}

export default App;
