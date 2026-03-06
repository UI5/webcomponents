import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";

const Button = createComponent(ButtonClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const Popover = createComponent(PopoverClass);

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button id="btn" onClick={() => setOpen(!open)}>
        Open Popover
      </Button>

      <Popover
        open={open}
        opener="btn"
        headerText="Newsletter subscription"
        onClose={() => setOpen(false)}
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
      </Popover>
    </>
  );
}

export default App;
