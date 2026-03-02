import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";

const Button = createReactComponent(ButtonClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const ResponsivePopover = createReactComponent(ResponsivePopoverClass);

function App() {

  const handleClick = () => {
    respPopover1.open = !respPopover1.open;
  };

  const handleClick = () => {
    respPopover2.open = !respPopover2.open;
  };

  return (
    <>
      <div className="center">
            <Button id="btn1">Open ResponsivePopover to Bottom</Button>
            <Button id="btn2">Open ResponsivePopover to Left</Button>
        </div>
   
        <ResponsivePopover id="respPopover1" opener="btn1" header-text="Newsletter subscription" placement="Bottom">
            <div className="popover-content">
                <Label htmlFor="emailInput" required={true} show-colon={true}>Email</Label>
                <Input style={{ minWidth: "150px" }} id="emailInput" placeholder="Enter Email" />
                <Label>Note: If you open the page in mobile, a dialog would be displayed.</Label>
            </div>

            <div slot="footer" className="popover-footer">
                <Button id="closePopoverButton" design="Emphasized">Subscribe</Button>
            </div>
        </ResponsivePopover>

        <ResponsivePopover id="respPopover2" opener="btn2" header-text="Newsletter subscription" placement="Start">
            <div className="popover-content">
                <Label htmlFor="emailInput" required={true} show-colon={true}>Email</Label>
                <Input style={{ minWidth: "150px" }} id="emailInput" placeholder="Enter Email" />
                <Label>Note: If you open the page in mobile, a dialog would be displayed.</Label>
            </div>
            <div slot="footer" className="popover-footer">
                <Button id="closePopoverButton" design="Emphasized">Subscribe</Button>
            </div>
        </ResponsivePopover>
    </>
  );
}

export default App;
