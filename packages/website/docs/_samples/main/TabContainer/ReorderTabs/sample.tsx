import { useRef, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Tab = createReactComponent(TabClass);
const TabContainer = createReactComponent(TabContainerClass);

function App() {
  const tabContainerRef = useRef(null);

  useEffect(() => {
    const tabContainer = tabContainerRef.current;
    if (!tabContainer) return;

    const handleMoveOver = (event: CustomEvent) => {
      const { source } = event.detail;

      if (tabContainer.contains(source.element)) {
        event.preventDefault();
      }
    };

    const handleMove = (event: CustomEvent) => {
      const { source, destination } = event.detail;

      switch (destination.placement) {
        case MovePlacement.Before:
          destination.element.before(source.element);
          break;
        case MovePlacement.After:
          destination.element.after(source.element);
          break;
        case MovePlacement.On:
          destination.element.prepend(source.element);
          break;
      }

      const newParent = source.element.parentElement;

      if (newParent.hasAttribute("ui5-tab")) {
        source.element.slot = "items";
      } else {
        source.element.slot = "";
      }
    };

    tabContainer.addEventListener("move-over", handleMoveOver);
    tabContainer.addEventListener("move", handleMove);

    return () => {
      tabContainer.removeEventListener("move-over", handleMoveOver);
      tabContainer.removeEventListener("move", handleMove);
    };
  }, []);

  return (
    <>
      <TabContainer fixed id="tabContainer" ref={tabContainerRef}>
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
      </TabContainer>
    </>
  );
}

export default App;
