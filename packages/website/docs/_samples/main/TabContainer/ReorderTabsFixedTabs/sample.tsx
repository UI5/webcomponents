import { useRef, useEffect } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import TabClass from "@ui5/webcomponents/dist/Tab.js";
import TabSeparatorClass from "@ui5/webcomponents/dist/TabSeparator.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import TabContainerClass from "@ui5/webcomponents/dist/TabContainer.js";

const Tab = createReactComponent(TabClass);
const TabSeparator = createReactComponent(TabSeparatorClass);
const TabContainer = createReactComponent(TabContainerClass);

function App() {
  const tabContainerRef = useRef(null);

  useEffect(() => {
    const tabContainer = tabContainerRef.current;
    if (!tabContainer) return;

    const handleMoveOver = (event: CustomEvent) => {
      const { source, destination } = event.detail;

      if (!tabContainer.contains(source.element)) {
        return;
      }

      if (destination.element.dataset.fixed) {
        return;
      }

      event.preventDefault();
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
      </TabContainer>
    </>
  );
}

export default App;
