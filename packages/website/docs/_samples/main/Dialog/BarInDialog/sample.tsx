import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleClick = () => {
    dialog.open = true;
  };

  const handleClick = () => {
    dialog.open = false;
  };

  const handleClick = () => {
    dialogState.open = true;
  };

  const handleClick = () => {
    dialogState.open = false;
  };

  return (
    <>
      <Button id="dialogOpener">Open Dialog</Button>

        <Dialog id="dialog">
            <Bar slot="header" design="Header">
                <Title level="H5" slot="startContent">Bar used in Header and Footer</Title>
                <Button className="dialogCloser" design="Transparent" slot="endContent" icon="decline" />
            </Bar>
            <div>Custom styles are applied to remove the default Dialog's paddings when ui5-bar is placed in the header or footer of a dialog.</div>
            <Bar slot="footer" design="Footer">
                <Button style={{ minWidth: "4rem" }} className="dialogCloser" design="Emphasized" slot="endContent">OK</Button>
            </Bar>
        </Dialog>

         <Button id="dialogStateOpener">Open Dialog with State</Button>

        <Dialog id="dialogState" state="Critical">
            <Bar id="bar" slot="header" design="Header">
                <Title level="H5" slot="startContent">Bar used in Header and Footer</Title>
            </Bar>
            <div>Custom styles are applied to adjust the paddings when a ui5-bar is placed in the header or footer of a dialog with state.</div>
            <Bar slot="footer" design="Footer">
                <Button style={{ minWidth: "4rem" }} design="Emphasized" id="closeDialogStateButton" slot="endContent">OK</Button>
            </Bar>
        </Dialog>
    </>
  );
}

export default App;
