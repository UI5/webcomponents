import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createReactComponent(ButtonClass);
const Popover = createReactComponent(PopoverClass);
const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {
  const popoverRef = useRef(null);

  const handlePopoverOpenerClick = () => {
    popoverRef.current.open = true;
  };

  const handleBtnClick = () => {
    popoverRef.current.open = false;
  };

  return (
    <>
      <Button id="popoverOpener" onClick={handlePopoverOpenerClick}>Open Popover</Button>

        <Popover ref={popoverRef} id="popover" opener="popoverOpener" header-text="Resizable Popover" resizable={true}>
            <p>Resize this popover by dragging its resize handle.</p>
            <p>This feature is available only on desktop devices.</p>
            <Toolbar slot="footer">
                <ToolbarButton className="popoverCloser" design="Emphasized" text="OK" />
            </Toolbar>
        </Popover>
    </>
  );
}

export default App;
