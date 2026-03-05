import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef } from "react";
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
  const dialogRef = useRef(null);

  const handleDialogOpenerClick = () => {
    dialogRef.current!.open = true;
  };

  const handleBtnClick = () => {
    dialogRef.current!.open = false;
  };

  return (
    <>
      <Button id="dialogOpener" onClick={handleDialogOpenerClick}>Open Dialog</Button>

        <Dialog ref={dialogRef} id="dialog" state="Negative" headerText="State :: Negative">
            <Text>Dialog with state</Text>
            <Toolbar slot="footer">
                <ToolbarButton class="dialogCloser" text="Close" onClick={handleBtnClick} />
            </Toolbar>
        </Dialog>
    </>
  );
}

export default App;
