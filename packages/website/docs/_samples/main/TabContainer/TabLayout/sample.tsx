import { createReactComponent } from "@ui5/webcomponents-base";
import TabClass from "@ui5/webcomponents/dist/Tab.js";

const Tab = createReactComponent(TabClass);

function App() {

  return (
    <>
      <ui5-tabcontainer tab-layout="Standard" collapsed>
        <Tab icon="laptop" text="Monitors" additional-text={10} />
        <Tab icon="video" text="Cameras" additional-text={2} selected={true} />
        <Tab icon="home" text="Rooms" additional-text={16} />
    </ui5-tabcontainer>
    </>
  );
}

export default App;
