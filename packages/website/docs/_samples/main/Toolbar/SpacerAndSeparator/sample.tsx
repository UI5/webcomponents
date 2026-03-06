import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSeparatorClass from "@ui5/webcomponents/dist/ToolbarSeparator.js";
import ToolbarSpacerClass from "@ui5/webcomponents/dist/ToolbarSpacer.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/employee.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const Toolbar = createComponent(ToolbarClass);
const ToolbarButton = createComponent(ToolbarButtonClass);
const ToolbarSeparator = createComponent(ToolbarSeparatorClass);
const ToolbarSpacer = createComponent(ToolbarSpacerClass);

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
