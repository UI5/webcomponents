import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
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
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <Button id="dialogOpener" onClick={() => setDialogOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        open={dialogOpen}
        id="dialog"
        headerText="Register Form"
        onClose={() => setDialogOpen(false)}
      >
        <section className="login-form">
          <div>
            <Label for="username" required={true} showColon={true}>
              Username
            </Label>
            <Input id="username" />
          </div>
          <div>
            <Label for="password" required={true} showColon={true}>
              Password
            </Label>
            <Input id="password" type="Password" valueState="Negative" />
          </div>
          <div>
            <Label for="email" required={true} showColon={true}>
              Email
            </Label>
            <Input id="email" type="Email" />
          </div>
          <div>
            <Label for="address" showColon={true}>
              Address
            </Label>
            <Input id="address" />
          </div>
        </section>
        <Toolbar slot="footer">
          <ToolbarButton
            class="dialogCloser"
            design="Emphasized"
            text="Submit"
          />
          <ToolbarButton
            class="dialogCloser"
            design="Transparent"
            text="Cancel"
            onClick={() => setDialogOpen(false)}
          />
        </Toolbar>
      </Dialog>
    </>
  );
}

export default App;
