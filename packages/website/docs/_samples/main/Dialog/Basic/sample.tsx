import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
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
  const dialogRef = useRef(null);

  const handleDialogOpenerClick = () => {
    dialogRef.current!.open = true;
  };

  const handleBtnClick = () => {
    dialogRef.current!.open = false;
  };

  return (
    <>
      <style>{`
        .login-form {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: flex-start;
            margin: 3rem 6rem;
        }

        .login-form > div {
            display: grid;
            width: 15rem;
            margin-bottom: .5rem;
        }

        @media(max-width: 600px) {
            .login-form {
                margin: 3rem 1rem;
            }
        }
      `}</style>
      <Button id="dialogOpener" onClick={handleDialogOpenerClick}>Open Dialog</Button>

        <Dialog ref={dialogRef} id="dialog" headerText="Register Form">
            <section className="login-form">
                <div>
                    <Label htmlFor="username" required={true} showColon={true}>Username</Label>
                    <Input id="username" />
                </div>
                <div>
                    <Label htmlFor="password" required={true} showColon={true}>Password</Label>
                    <Input id="password" type="Password" valueState="Negative" />
                </div>
                <div>
                    <Label htmlFor="email" type="Email" required={true} showColon={true}>Email</Label>
                    <Input id="email" />
                </div>
                <div>
                    <Label htmlFor="address" showColon={true}>Address</Label>
                    <Input id="address" />
                </div>
            </section>
            <Toolbar slot="footer">
                <ToolbarButton class="dialogCloser" design="Emphasized" text="Submit"
                 />
                <ToolbarButton class="dialogCloser" design="Transparent" text="Cancel"
                 />
            </Toolbar>
        </Dialog>
    </>
  );
}

export default App;
