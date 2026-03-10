import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";

const Button = createReactComponent(ButtonClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);

function App() {
  const [popover1Open, setPopover1Open] = useState(false);
  const [popover2Open, setPopover2Open] = useState(false);

  return (
    <>
      <div className="center">
        <Button id="btn1" onClick={() => setPopover1Open(!popover1Open)}>
          Open ResponsivePopover to Bottom
        </Button>
        <Button id="btn2" onClick={() => setPopover2Open(!popover2Open)}>
          Open ResponsivePopover to Left
        </Button>
      </div>

      <ResponsivePopover
        open={popover1Open}
        id="respPopover1"
        opener="btn1"
        headerText="Newsletter subscription"
        placement="Bottom"
        onClose={() => setPopover1Open(false)}
      >
        <div className="popover-content">
          <Label for="emailInput" required={true} showColon={true}>
            Email
          </Label>
          <Input
            style={{ minWidth: "150px" }}
            id="emailInput"
            placeholder="Enter Email"
          />
          <Label>
            Note: If you open the page in mobile, a dialog would be displayed.
          </Label>
        </div>

        <div slot="footer" className="popover-footer">
          <Button id="closePopoverButton" design="Emphasized">
            Subscribe
          </Button>
        </div>
      </ResponsivePopover>

      <ResponsivePopover
        open={popover2Open}
        id="respPopover2"
        opener="btn2"
        headerText="Newsletter subscription"
        placement="Start"
        onClose={() => setPopover2Open(false)}
      >
        <div className="popover-content">
          <Label for="emailInput" required={true} showColon={true}>
            Email
          </Label>
          <Input
            style={{ minWidth: "150px" }}
            id="emailInput"
            placeholder="Enter Email"
          />
          <Label>
            Note: If you open the page in mobile, a dialog would be displayed.
          </Label>
        </div>
        <div slot="footer" className="popover-footer">
          <Button id="closePopoverButton" design="Emphasized">
            Subscribe
          </Button>
        </div>
      </ResponsivePopover>
    </>
  );
}

export default App;
