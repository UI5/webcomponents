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
        <ToolbarButton icon="decline" text="Reject" />
    	<ToolbarButton icon="add" text="Add" />
        <ToolbarButton icon="employee" text="Add more people" overflow-priority="AlwaysOverflow" />
        <ToolbarButton icon="employee" text="Call me tomorrow" overflow-priority="AlwaysOverflow" />
    </Toolbar>
    </>
  );
}

export default App;
