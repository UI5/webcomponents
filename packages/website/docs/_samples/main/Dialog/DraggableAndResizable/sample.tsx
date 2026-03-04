import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

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

        <Dialog ref={dialogRef} id="dialog" headerText="Draggable/Resizable dialog" draggable={true} resizable={true}>
            <div>Move this dialog around the screen by dragging it by its header.</div>
            <div>Resize this dialog by dragging it by its resize handle.</div>
            <div>These features are available only on Desktop.</div>
            <Toolbar slot="footer">
                <ToolbarButton class="dialogCloser" design="Emphasized" text="OK" />
            </Toolbar>
        </Dialog>
    </>
  );
}

export default App;
