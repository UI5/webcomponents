import { useRef } from "react";
import { createReactComponent } from "@ui5/webcomponents-base";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";

const Button = createReactComponent(ButtonClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Popover = createReactComponent(PopoverClass);

function App() {
  const popoverRef = useRef(null);

  const handleBtnClick = () => {
    popoverRef.current.open = !popoverRef.current.open;
  };

  return (
    <>
      <Button id="btn" onClick={handleBtnClick}>Open Popover</Button>

        <Popover ref={popoverRef} opener="btn" header-text="Newsletter subscription">

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
