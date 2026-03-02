import { createReactComponent } from "@ui5/webcomponents-base";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabSeparatorClass from "@ui5/webcomponents/dist/TabSeparator.js";

const Tab = createReactComponent(TabClass);
const TabSeparator = createReactComponent(TabSeparatorClass);

function App() {

  const handleMoveOver = () => {
    const { source, destination
  };

  const handleMove = () => {
    const { source, destination
  };

  return (
    <>
      <ui5-tabcontainer fixed id="tabContainer">
        <Tab design="Positive" text="One" data-fixed="true" />
        <Tab design="Negative" text="Two" data-fixed="true" />
        <Tab design="Critical" text="Three" data-fixed="true" />
        <TabSeparator />
        <Tab movable={true} text="Four" />
        <Tab movable={true} text="Five" />
        <Tab movable={true} text="Six" />
        <Tab movable={true} text="Seven" />
        <Tab movable={true} design="Positive" text="Eight" />
        <Tab movable={true} design="Negative" text="Nine" />
        <Tab movable={true} design="Critical" text="Ten" />
        <Tab movable={true} text="Eleven" />
        <Tab movable={true} text="Twelve" />
        <Tab movable={true} text="Thirteen" selected={true} />
        <Tab movable={true} text="Fourteen" />
    </ui5-tabcontainer>
    </>
  );
}

export default App;
