import { createReactComponent } from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents-icons/dist/laptop.js";
import "@ui5/webcomponents-icons/dist/video.js";
import "@ui5/webcomponents-icons/dist/home.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Tab = createReactComponent(TabClass);
const TabContainer = createReactComponent(TabContainerClass);

function App() {

  return (
    <>
      <TabContainer tabLayout="Inline" collapsed>
        <Tab icon="laptop" text="Monitors" additionalText={10} />
        <Tab icon="video" text="Cameras" additionalText={2} selected={true} />
        <Tab icon="home" text="Rooms" additionalText={16} />
    </TabContainer>
    </>
  );
}

export default App;
