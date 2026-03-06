import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useState } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import PopoverClass from "@ui5/webcomponents/dist/Popover.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Button = createComponent(ButtonClass);
const Popover = createComponent(PopoverClass);
const Toolbar = createComponent(ToolbarClass);
const ToolbarButton = createComponent(ToolbarButtonClass);

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button id="popoverOpener" onClick={() => setOpen(true)}>
        Open Popover
      </Button>

      <Popover
        open={open}
        id="popover"
        opener="popoverOpener"
        headerText="Resizable Popover"
        resizable={true}
        onClose={() => setOpen(false)}
      >
        <p>Resize this popover by dragging its resize handle.</p>
        <p>This feature is available only on desktop devices.</p>
        <Toolbar slot="footer">
          <ToolbarButton
            class="popoverCloser"
            design="Emphasized"
            text="OK"
            onClick={() => setOpen(false)}
          />
        </Toolbar>
      </Popover>
    </>
  );
}

export default App;
