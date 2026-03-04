import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";

const Button = createReactComponent(ButtonClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Popover = createReactComponent(PopoverClass);

function App() {
  const popover1Ref = useRef(null);
  const popover2Ref = useRef(null);

  const handleBtn1Click = () => {
    popover1Ref.current.open = !popover1Ref.current.open;
  };

  const handleBtn2Click = () => {
    popover2Ref.current.open = !popover2Ref.current.open;
  };

  return (
    <>
      <div className="center">
            <Button id="btn1" onClick={handleBtn1Click}>Open Popover to Bottom</Button>
            <Button id="btn2" onClick={handleBtn2Click}>Open Popover to Left</Button>
        </div>
   
        <Popover ref={popover1Ref} id="popover1" opener="btn1" header-text="Newsletter subscription" placement="Bottom">
            <div className="popover-content">
                <Label htmlFor="emailInput" required={true} show-colon={true}>Email</Label>
                <Input style={{ minWidth: "150px" }} id="emailInput" placeholder="Enter Email" />
                <Label>Note: If you open the page in mobile, a dialog would be displayed.</Label>
            </div>

            <div slot="footer" className="popover-footer">
                <Button id="closePopoverButton" design="Emphasized">Subscribe</Button>
            </div>
        </Popover>

        <Popover ref={popover2Ref} id="popover2" opener="btn2" header-text="Newsletter subscription" placement="Start">
            <div className="popover-content">
                <Label htmlFor="emailInput" required={true} show-colon={true}>Email</Label>
                <Input style={{ minWidth: "150px" }} id="emailInput" placeholder="Enter Email" />
                <Label>Note: If you open the page in mobile, a dialog would be displayed.</Label>
            </div>
            <div slot="footer" className="popover-footer">
                <Button id="closePopoverButton" design="Emphasized">Subscribe</Button>
            </div>
        </Popover>
    </>
  );
}

export default App;
