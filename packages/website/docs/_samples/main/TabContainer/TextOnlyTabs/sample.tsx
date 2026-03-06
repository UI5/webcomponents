import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Tab = createComponent(TabClass);
const TabContainer = createComponent(TabContainerClass);

function App() {
  return (
    <>
      <TabContainer>
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
      </TabContainer>
    </>
  );
}

export default App;
