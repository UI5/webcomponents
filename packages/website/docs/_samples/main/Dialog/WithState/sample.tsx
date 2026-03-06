import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createComponent(ButtonClass);
const Dialog = createComponent(DialogClass);
const Text = createComponent(TextClass);
const Toolbar = createComponent(ToolbarClass);
const ToolbarButton = createComponent(ToolbarButtonClass);

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
