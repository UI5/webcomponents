import { createReactComponent } from "@ui5/webcomponents-base";
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

  const handleClick = () => {
    dialog.open = true;
  };

  const handleClick = () => {
    dialog.open = false;
  };

  return (
    <>
      <Button id="dialogOpener">Open Dialog</Button>

        <Dialog id="dialog" state="Negative" header-text="State :: Negative">
            <Text>Dialog with state</Text>
            <Toolbar slot="footer">
                <ToolbarButton className="dialogCloser" text="Close" />
            </Toolbar>
        </Dialog>
    </>
  );
}

export default App;
