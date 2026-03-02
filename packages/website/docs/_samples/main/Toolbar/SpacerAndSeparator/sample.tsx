import { createReactComponent } from "@ui5/webcomponents-base";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSeparatorClass from "@ui5/webcomponents/dist/ToolbarSeparator.js";
import ToolbarSpacerClass from "@ui5/webcomponents/dist/ToolbarSpacer.js";

const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);
const ToolbarSeparator = createReactComponent(ToolbarSeparatorClass);
const ToolbarSpacer = createReactComponent(ToolbarSpacerClass);

function App() {

  return (
    <>
      <Toolbar>
        <ToolbarButton icon="add" text="Plus" design="Default" />
        <ToolbarButton icon="employee" text="Hire" />
        <ToolbarSeparator />
        <ToolbarButton icon="add" text="Add" />
        <ToolbarButton icon="decline" text="Decline" />
        <ToolbarSpacer />
        <ToolbarButton icon="add" text="Append" />
        <ToolbarButton icon="employee" text="Add people" />
    </Toolbar>
    </>
  );
}

export default App;
