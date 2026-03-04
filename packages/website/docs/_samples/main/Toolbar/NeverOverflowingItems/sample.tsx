import { createReactComponent } from "@ui5/webcomponents-base";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {

  return (
    <>
      <Toolbar>
        <ToolbarButton icon="employee" text="add" overflowPriority="NeverOverflow" />
        <ToolbarButton icon="employee" text="decline" overflowPriority="NeverOverflow" />
        <ToolbarButton icon="employee" text="Add people" overflowPriority="NeverOverflow" />
        <ToolbarButton icon="employee" text="Call me later" overflowPriority="NeverOverflow" />
    </Toolbar>
    </>
  );
}

export default App;
