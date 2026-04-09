import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Text = createReactComponent(TextClass);
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
        state="Negative"
        headerText="State :: Negative"
        onClose={() => setDialogOpen(false)}
      >
        <Text>Dialog with state</Text>
        <Toolbar slot="footer">
          <ToolbarButton
            class="dialogCloser"
            text="Close"
            onClick={() => setDialogOpen(false)}
          />
        </Toolbar>
      </Dialog>
    </>
  );
}

export default App;
