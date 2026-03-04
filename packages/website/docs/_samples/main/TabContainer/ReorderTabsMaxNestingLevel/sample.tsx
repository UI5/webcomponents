import { useRef, useEffect } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import StepInputClass from "@ui5/webcomponents/dist/StepInput.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Label = createComponent(LabelClass);
const StepInput = createComponent(StepInputClass);
const Tab = createComponent(TabClass);
const TabContainer = createComponent(TabContainerClass);

function App() {
  const tabContainerRef = useRef(null);
  const maxNestingLevelRef = useRef(1);

  const getTabLevel = (element) => {
    if (element.hasAttribute("ui5-tabcontainer")) {
      return 0;
    }
    return 1 + getTabLevel(element.parentElement);
  };

  const handleNestingLevelChange = (e) => {
    maxNestingLevelRef.current = e.target.value;
  };

  useEffect(() => {
    const tabContainer = tabContainerRef.current;
    if (!tabContainer) return;

    const handleMoveOver = (event) => {
      const { source, destination } = event.detail;

      if (!tabContainer.contains(source.element)) {
        return;
      }

      let targetNestingLevel = getTabLevel(destination.element);

      if (destination.placement === "On") {
        targetNestingLevel += 1;
      }

      if (targetNestingLevel <= maxNestingLevelRef.current) {
        event.preventDefault();
      }
    };

    const handleMove = (event) => {
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
      <Label showColon={true} htmlFor="maxNestingLevelInput">Max nesting level</Label>
      <StepInput style={{ width: "5rem" }} id="maxNestingLevelInput" placeholder="maxNestingLevel" value={1} min={1} onChange={handleNestingLevelChange} />

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
