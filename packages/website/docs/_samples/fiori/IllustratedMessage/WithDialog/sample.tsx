import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import IllustratedMessageClass from "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";

const IllustratedMessage = createReactComponent(IllustratedMessageClass);
const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);

export const Example = () => {
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
