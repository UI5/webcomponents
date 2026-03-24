import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";

const Button = createReactComponent(ButtonClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);

export const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button id="btn" onClick={() => setOpen(!open)}>
        Open ResponsivePopover
      </Button>

      <ResponsivePopover
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
      </ResponsivePopover>
    </>
  );
}
