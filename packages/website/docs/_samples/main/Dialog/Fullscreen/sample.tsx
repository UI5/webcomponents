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
        Open Fullscreen Dialog
      </Button>

      <Dialog
        open={dialogOpen}
        id="dialog"
        headerText="Fullscreen Dialog"
        showFullscreenButton={true}
        draggable={true}
        resizable={true}
        onClose={() => setDialogOpen(false)}
      >
        <div>This dialog has a fullscreen toggle button in the header.</div>
        <div>
          Click the fullscreen button or press Shift+Ctrl+F to toggle fullscreen
          mode.
        </div>
        <div>You can also double-click the header to toggle.</div>
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
