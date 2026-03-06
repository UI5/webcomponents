import { useState } from "react";
import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import "@ui5/webcomponents-icons/dist/checklist-item.js";

const List = createComponent(ListClass);
const ListItemStandard = createComponent(ListItemStandardClass);

function App() {
  const [items, setItems] = useState([
    { id: "1", text: "Item #1" },
    { id: "2", text: "Item #2" },
    { id: "3", text: "Item #3" },
    { id: "4", text: "Item #4" },
    { id: "5", text: "Item #5" },
  ]);

  const handleMoveOver = (e: UI5CustomEvent<ListClass, "move-over">) => {
    const { destination, source } = e.detail;

    if (
      destination.placement === "Before" ||
      destination.placement === "After"
    ) {
      e.preventDefault();
    }
  };

  const handleMove = (e: UI5CustomEvent<ListClass, "move">) => {
    const { destination, source } = e.detail;

    setItems((prevItems) => {
      const newItems = [...prevItems];
      const sourceIndex = newItems.findIndex(
        (item) => item.id === source.element.dataset.id,
      );
      const destIndex = newItems.findIndex(
        (item) => item.id === destination.element.dataset.id,
      );

      if (sourceIndex === -1 || destIndex === -1) return prevItems;

      const [movedItem] = newItems.splice(sourceIndex, 1);

      let insertIndex = destIndex;
      if (destination.placement === MovePlacement.After) {
        insertIndex = sourceIndex < destIndex ? destIndex : destIndex + 1;
      } else if (destination.placement === MovePlacement.Before) {
        insertIndex = sourceIndex < destIndex ? destIndex - 1 : destIndex;
      }

      newItems.splice(insertIndex, 0, movedItem);
      return newItems;
    });
  };

  return (
    <>
      <List id="listDnd1" onMoveOver={handleMoveOver} onMove={handleMove}>
        {items.map((item) => (
          <ListItemStandard
            key={item.id}
            data-id={item.id}
            icon="checklist-item"
            movable={true}
          >
            {item.text}
          </ListItemStandard>
        ))}
      </List>
    </>
  );
}

export default App;
