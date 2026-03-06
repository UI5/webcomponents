import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const Toolbar = createComponent(ToolbarClass);
const ToolbarButton = createComponent(ToolbarButtonClass);

function App() {
  return (
    <>
      <Toolbar>
        <ToolbarButton
          icon="employee"
          text="add"
          overflowPriority="NeverOverflow"
        />
        <ToolbarButton
          icon="employee"
          text="decline"
          overflowPriority="NeverOverflow"
        />
        <ToolbarButton
          icon="employee"
          text="Add people"
          overflowPriority="NeverOverflow"
        />
        <ToolbarButton
          icon="employee"
          text="Call me later"
          overflowPriority="NeverOverflow"
        />
      </Toolbar>
    </>
  );
}

export default App;
