import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";

const IllustratedMessage = createComponent(IllustratedMessageClass);
const Bar = createComponent(BarClass);
const Button = createComponent(ButtonClass);
const Dialog = createComponent(DialogClass);

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button id="openDialogButton" onClick={() => setDialogOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        open={dialogOpen}
        id="hello-dialog"
        headerText="Error"
        onClose={() => setDialogOpen(false)}
      >
        <IllustratedMessage name="UnableToLoad" />
        <Bar design="Footer" slot="footer">
          <Button
            id="closeDialogButton"
            design="Emphasized"
            slot="endContent"
            onClick={() => setDialogOpen(false)}
          >
            Close
          </Button>
        </Bar>
      </Dialog>
    </>
  );
}

export default App;
