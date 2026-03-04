import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Title = createReactComponent(TitleClass);

function App() {
  const dialogRef = useRef(null);
  const dialogStateRef = useRef(null);

  const handleDialogOpenerClick = () => {
    dialogRef.current!.open = true;
  };

  const handleBtnClick = () => {
    dialogRef.current!.open = false;
  };

  const handleDialogStateOpenerClick = () => {
    dialogStateRef.current!.open = true;
  };

  const handleCloseDialogStateButtonClick = () => {
    dialogStateRef.current!.open = false;
  };

  return (
    <>
      <style>{`
        /* Styles for Dialog */
        #dialog::part(header),
        #dialog::part(footer) {
            padding-inline: 0;
        }

        /* Styles for Dialog with State */
        #dialogState::part(header),
        #dialogState::part(footer) {
            padding-inline-end: 0;
        }

        #bar::part(startContent) {
            padding-inline-start: 0;
        }
      `}</style>
      <Button id="dialogOpener" onClick={handleDialogOpenerClick}>Open Dialog</Button>

        <Dialog ref={dialogRef} id="dialog">
            <Bar slot="header" design="Header">
                <Title level="H5" slot="startContent">Bar used in Header and Footer</Title>
                <Button class="dialogCloser" design="Transparent" slot="endContent" icon="decline" />
            </Bar>
            <div>Custom styles are applied to remove the default Dialog's paddings when ui5-bar is placed in the header or footer of a dialog.</div>
            <Bar slot="footer" design="Footer">
                <Button style={{ minWidth: "4rem" }} class="dialogCloser" design="Emphasized" slot="endContent">OK</Button>
            </Bar>
        </Dialog>

         <Button id="dialogStateOpener" onClick={handleDialogStateOpenerClick}>Open Dialog with State</Button>

        <Dialog ref={dialogStateRef} id="dialogState" state="Critical">
            <Bar id="bar" slot="header" design="Header">
                <Title level="H5" slot="startContent">Bar used in Header and Footer</Title>
            </Bar>
            <div>Custom styles are applied to adjust the paddings when a ui5-bar is placed in the header or footer of a dialog with state.</div>
            <Bar slot="footer" design="Footer">
                <Button style={{ minWidth: "4rem" }} design="Emphasized" id="closeDialogStateButton" slot="endContent" onClick={handleCloseDialogStateButtonClick}>OK</Button>
            </Bar>
        </Dialog>
    </>
  );
}

export default App;
