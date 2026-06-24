import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import ToolbarSelectClass from "@ui5/webcomponents/dist/ToolbarSelect.js";
import ToolbarSelectOptionClass from "@ui5/webcomponents/dist/ToolbarSelectOption.js";
import ToolbarSeparatorClass from "@ui5/webcomponents/dist/ToolbarSeparator.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const Toolbar = createReactComponent(ToolbarClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);
const ToolbarSelect = createReactComponent(ToolbarSelectClass);
const ToolbarSelectOption = createReactComponent(ToolbarSelectOptionClass);
const ToolbarSeparator = createReactComponent(ToolbarSeparatorClass);

function App() {
  return (
    <>
      {/*
        Items that share the same non-empty "overflowGroup" string overflow together
        as one atomic unit — either all visible in the bar or all in the overflow
        popover, never split. The value is a free-form string label; equality is
        exact and case-sensitive.

        Here the "Filter:" label-button and its select share overflowGroup="filters".
        The toolbar's width is constrained so that the group cannot fit alongside the
        ungrouped Add/Reject buttons — the bar shows Add, Reject, and the overflow
        button. Click the overflow button to see both group members appear adjacent
        to each other inside the popover.
      */}
      <Toolbar style={{ width: "320px" }}>
        <ToolbarButton icon="add" text="Add" />
        <ToolbarButton icon="decline" text="Reject" />
        <ToolbarSeparator />
        <ToolbarButton text="Filter:" overflowGroup="filters" />
        <ToolbarSelect overflowGroup="filters">
          <ToolbarSelectOption>All</ToolbarSelectOption>
          <ToolbarSelectOption selected>Open</ToolbarSelectOption>
          <ToolbarSelectOption>Closed</ToolbarSelectOption>
        </ToolbarSelect>
      </Toolbar>
    </>
  );
}

export default App;
