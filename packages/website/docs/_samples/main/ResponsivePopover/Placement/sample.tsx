import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";

const Button = createComponent(ButtonClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const ResponsivePopover = createComponent(ResponsivePopoverClass);

function App() {
  const respPopover1Ref = useRef(null);
  const respPopover2Ref = useRef(null);

  const handleBtn1Click = () => {
    respPopover1Ref.current!.open = !respPopover1Ref.current!.open;
  };

  const handleBtn2Click = () => {
    respPopover2Ref.current!.open = !respPopover2Ref.current!.open;
  };

  return (
    <>
      <div className="center">
            <Button id="btn1" onClick={handleBtn1Click}>Open ResponsivePopover to Bottom</Button>
            <Button id="btn2" onClick={handleBtn2Click}>Open ResponsivePopover to Left</Button>
        </div>
   
        <ResponsivePopover ref={respPopover1Ref} id="respPopover1" opener="btn1" headerText="Newsletter subscription" placement="Bottom">
            <div className="popover-content">
                <Label htmlFor="emailInput" required={true} showColon={true}>Email</Label>
                <Input style={{ minWidth: "150px" }} id="emailInput" placeholder="Enter Email" />
                <Label>Note: If you open the page in mobile, a dialog would be displayed.</Label>
            </div>

            <div slot="footer" className="popover-footer">
                <Button id="closePopoverButton" design="Emphasized">Subscribe</Button>
            </div>
        </ResponsivePopover>

        <ResponsivePopover ref={respPopover2Ref} id="respPopover2" opener="btn2" headerText="Newsletter subscription" placement="Start">
            <div className="popover-content">
                <Label htmlFor="emailInput" required={true} showColon={true}>Email</Label>
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
