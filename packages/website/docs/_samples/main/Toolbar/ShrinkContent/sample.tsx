import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import ToolbarClass from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarItemClass from "@ui5/webcomponents/dist/ToolbarItem.js";
import ToolbarButtonClass from "@ui5/webcomponents/dist/ToolbarButton.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Toolbar = createReactComponent(ToolbarClass);
const ToolbarItem = createReactComponent(ToolbarItemClass);
const ToolbarButton = createReactComponent(ToolbarButtonClass);
const Title = createReactComponent(TitleClass);

function App() {
  return (
    <>
      <Toolbar alignContent="Start">
        <ToolbarItem overflowPriority="NeverOverflow" shrinkContent>
          <Title wrappingType="None">
            Super Long Title That Should Shrink To Fit Available Space
          </Title>
        </ToolbarItem>
        <ToolbarButton text="Edit" />
        <ToolbarButton text="Delete" />
      </Toolbar>
    </>
  );
}

export default App;
