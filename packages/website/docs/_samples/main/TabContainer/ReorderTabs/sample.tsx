import { createReactComponent } from "@ui5/webcomponents-base";
import TabClass from "@ui5/webcomponents/dist/Tab.js";

const Tab = createReactComponent(TabClass);

function App() {

  const handleMoveOver = () => {
    const { source
  };

  const handleMove = () => {
    const { source, destination
  };

  return (
    <>
      <ui5-tabcontainer fixed id="tabContainer">
        <Tab id="tab1" text="Tab 1" movable={true} />
        <Tab id="tab2" text="Tab 2" movable={true} />
        <Tab id="tab3" text="Tab 3" movable={true}>
    		<Tab id="tab3.1" text="Tab 3.1" slot="items" movable={true} />
    		<Tab id="tab3.2" text="Tab 3.2" slot="items" movable={true} />
    		<Tab id="tab3.3" text="Tab 3.3" slot="items" movable={true} />
    	</Tab>
        <Tab id="tab4" text="Tab 4" movable={true} />
        <Tab id="tab5" text="Tab 5" movable={true} />
        <Tab id="tab6" text="Tab 6" movable={true} />
        <Tab id="tab7" text="Tab 7" movable={true} />
        <Tab id="tab8" text="Tab 8" movable={true} />
        <Tab id="tab9" text="Tab 9" movable={true} />
        <Tab id="tab10" text="Tab 10" movable={true} />
        <Tab id="tab11" text="Tab 11" movable={true} />
        <Tab id="tab12" text="Tab 12" movable={true} />
        <Tab id="tab13" text="Tab 13" movable={true} />
        <Tab id="tab14" text="Tab 14" movable={true} />
        <Tab id="tab15" text="Tab 15" movable={true} />
        <Tab id="tab16" text="Tab 16" movable={true} />
    </ui5-tabcontainer>
    </>
  );
}

export default App;
