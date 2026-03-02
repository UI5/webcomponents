import { createReactComponent } from "@ui5/webcomponents-base";
import TabClass from "@ui5/webcomponents/dist/Tab.js";

const Tab = createReactComponent(TabClass);

function App() {

  return (
    <>
      <ui5-tabcontainer overflow-mode="StartAndEnd" collapsed>
        <Tab text="Tab 1" />
        <Tab text="Tab 2" />
        <Tab text="Tab 3" />
        <Tab text="Tab 4" />
        <Tab text="Tab 5" />
        <Tab text="Tab 6" />
        <Tab text="Tab 7" />
        <Tab text="Tab 8" />
        <Tab text="Tab 9" />
        <Tab text="Tab 10" />
        <Tab text="Tab 11" />
        <Tab text="Tab 12" />
        <Tab text="Tab 13" selected={true} />
        <Tab text="Tab 14" />
        <Tab text="Tab 15" />
        <Tab text="Tab 16" />
        <Tab text="Tab 17" />
        <Tab text="Tab 18" />
        <Tab text="Tab 19" />
        <Tab text="Tab 20" />
        <Tab text="Tab 21" />
        <Tab text="Tab 22" />
        <Tab text="Tab 23" />
     </ui5-tabcontainer>
    </>
  );
}

export default App;
