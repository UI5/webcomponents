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
      <Toolbar align-content="Start">
        <ToolbarButton icon="decline" text="Decline" />
        <ToolbarButton icon="add" text="Add" />
        <ToolbarButton icon="employee" text="Add people" />
        <ToolbarButton icon="employee" text="Call me later" />
    </Toolbar>

    <Toolbar align-content="End">
        <ToolbarButton icon="decline" text="Decline" />
        <ToolbarButton icon="add" text="Add" />
        <ToolbarButton icon="employee" text="Add people" />
        <ToolbarButton icon="employee" text="Call me later" />
    </Toolbar>
    </>
  );
}

export default App;
