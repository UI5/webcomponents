import { useRef, useEffect } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import TreeClass from "@ui5/webcomponents/dist/Tree.js";
import TreeItemClass from "@ui5/webcomponents/dist/TreeItem.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const Label = createComponent(LabelClass);
const Title = createComponent(TitleClass);
const Tree = createComponent(TreeClass);
const TreeItem = createComponent(TreeItemClass);

function App() {
  const treeRef = useRef(null);

  useEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;

    const handleBeforeItemMove = (e: CustomEvent) => {
      const { destination, source } = e.detail;

      if (
        destination.placement === "Before" ||
        destination.placement === "After"
      ) {
        e.preventDefault();
      }

      if (
        destination.placement === "On" &&
        "allowsNesting" in destination.element.dataset
      ) {
        e.preventDefault();
      }
    };

    const handleMoveOver = (e: CustomEvent) => {
      const { source } = e.detail;

      if (!tree.contains(source.element)) {
        return;
      }

      handleBeforeItemMove(e);
    };

    const handleMove = (e: CustomEvent) => {
      const { destination, source } = e.detail;

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
    };

    tree.addEventListener("move-over", handleMoveOver);
    tree.addEventListener("move", handleMove);

    return () => {
      tree.removeEventListener("move-over", handleMoveOver);
      tree.removeEventListener("move", handleMove);
    };
  }, []);

  return (
    <>
      <Tree
        ref={treeRef}
        id="tree"
        noDataText="No data"
        selectionMode="Multiple"
        accessibleName="Tree with accessibleName"
      >
        <TreeItem
          movable={true}
          text="Tree 1"
          icon="paste"
          additionalText="Available"
          indeterminate={true}
          selected={true}
          additionalTextState="Information"
          accessibleName="Tree item with accessibleName"
        >
          <Title slot="content">
            <Label>Tree 1</Label>
            <Label>Tree 1</Label>
          </Title>

          <TreeItem
            movable={true}
            expanded={true}
            text="Tree 1.1"
            additionalText="Re-stock"
            additionalTextState="Negative"
            indeterminate={true}
            selected={true}
          >
            <TreeItem
              movable={true}
              text="Tree 1.1.1"
              additionalText="Required"
              additionalTextState="Critical"
              selected={true}
            />
            <TreeItem
              movable={true}
              text="Tree 1.1.2"
              additionalText="Available"
              additionalTextState="Positive"
            />
          </TreeItem>
        </TreeItem>

        <TreeItem
          movable={true}
          data-allows-nesting={true}
          text="Tree 2(Allows Nesting)"
          icon="copy"
        >
          <TreeItem movable={true} id="firstCollapsedItem" text="Tree 2.1">
            <TreeItem movable={true} text="Tree 2.1.1" />
            <TreeItem movable={true} text="Tree 2.1.2">
              <TreeItem movable={true} text="Tree 2.1.2.1" />
              <TreeItem movable={true} text="Tree 2.1.2.2" />
              <TreeItem movable={true} text="Tree 2.1.2.3" />
              <TreeItem movable={true} text="Tree 2.1.2.5" />
            </TreeItem>
          </TreeItem>
          <TreeItem movable={true} text="Tree 2.2" />
          <TreeItem movable={true} text="Tree 2.3" />
        </TreeItem>

        <TreeItem movable={true} text="Tree 3 (no icon)" />
      </Tree>
    </>
  );
}

export default App;
