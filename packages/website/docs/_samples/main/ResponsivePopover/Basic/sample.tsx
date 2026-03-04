import { useRef } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import ResponsivePopoverClass from "@ui5/webcomponents/dist/ResponsivePopover.js";

const Button = createComponent(ButtonClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const ResponsivePopover = createComponent(ResponsivePopoverClass);

function App() {
  const popoverRef = useRef(null);

  const handleBtnClick = () => {
    popoverRef.current!.open = !popoverRef.current!.open;
  };

  return (
    <>
      <Button id="btn" onClick={handleBtnClick}>Open ResponsivePopover</Button>

        <ResponsivePopover ref={popoverRef} opener="btn" headerText="Newsletter subscription">

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
