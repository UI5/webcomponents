import { createReactComponent } from "@ui5/webcomponents-base";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";

const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);

function App() {

  return (
    <>
      <Toolbar>
        <ToolbarButton icon="employee" text="add" overflow-priority="NeverOverflow" />
        <ToolbarButton icon="employee" text="decline" overflow-priority="NeverOverflow" />
        <ToolbarButton icon="employee" text="Add people" overflow-priority="NeverOverflow" />
        <ToolbarButton icon="employee" text="Call me later" overflow-priority="NeverOverflow" />
    </Toolbar>
    </>
  );
}

export default App;
