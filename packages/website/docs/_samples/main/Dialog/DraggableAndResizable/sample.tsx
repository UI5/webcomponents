import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button id="dialogOpener" onClick={() => setDialogOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        open={dialogOpen}
        id="dialog"
        headerText="Draggable/Resizable dialog"
        draggable={true}
        resizable={true}
        onClose={() => setDialogOpen(false)}
      >
        <div>
          Move this dialog around the screen by dragging it by its header.
        </div>
        <div>Resize this dialog by dragging it by its resize handle.</div>
        <div>These features are available only on Desktop.</div>
        <Toolbar slot="footer">
          <ToolbarButton
            class="dialogCloser"
            design="Emphasized"
            text="OK"
            onClick={() => setDialogOpen(false)}
          />
        </Toolbar>
      </Dialog>
    </>
  );
}

export default App;
