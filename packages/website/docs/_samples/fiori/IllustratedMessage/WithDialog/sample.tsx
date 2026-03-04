import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef } from "react";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";

const IllustratedMessage = createComponent(IllustratedMessageClass);
const Bar = createComponent(BarClass);
const Button = createComponent(ButtonClass);
const Dialog = createComponent(DialogClass);

function App() {
  const dialogRef = useRef(null);

  const handleOpenDialogButtonClick = () => {
    dialogRef.current!.open = true;
  };

  const handleCloseDialogButtonClick = () => {
    dialogRef.current!.open = false;
  };

  return (
    <>
      <Button id="openDialogButton" onClick={handleOpenDialogButtonClick}>Open Dialog</Button>
        <Dialog ref={dialogRef} id="hello-dialog" headerText="Error">
            <IllustratedMessage name="UnableToLoad" />
            <Bar design="Footer" slot="footer">
                <Button id="closeDialogButton" design="Emphasized" slot="endContent" onClick={handleCloseDialogButtonClick}>Close</Button>
            </Bar>
        </Dialog>
    </>
  );
}

export default App;
