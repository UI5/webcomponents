import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createReactComponent(ButtonClass);
const Dialog = createReactComponent(DialogClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
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

        <Dialog id="dialog" header-text="Register Form">
            <section className="login-form">
                <div>
                    <Label htmlFor="username" required={true} show-colon={true}>Username</Label>
                    <Input id="username" />
                </div>
                <div>
                    <Label htmlFor="password" required={true} show-colon={true}>Password</Label>
                    <Input id="password" type="Password" value-state="Negative" />
                </div>
                <div>
                    <Label htmlFor="email" type="Email" required={true} show-colon={true}>Email</Label>
                    <Input id="email" />
                </div>
                <div>
                    <Label htmlFor="address" show-colon={true}>Address</Label>
                    <Input id="address" />
                </div>
            </section>
            <Toolbar slot="footer">
                <ToolbarButton className="dialogCloser" design="Emphasized" text="Submit"
                 />
                <ToolbarButton className="dialogCloser" design="Transparent" text="Cancel"
                 />
            </Toolbar>
        </Dialog>
    </>
  );
}

export default App;
