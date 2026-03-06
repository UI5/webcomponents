import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { startMultipleDrag } from "@ui5/webcomponents-base/dist/DragAndDrop.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import ListClass from "@ui5/webcomponents/dist/List.js";
import ListItemStandardClass from "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/task.js";
import "@ui5/webcomponents-icons/dist/accept.js";

const List = createReactComponent(ListClass);
const ListItemStandard = createReactComponent(ListItemStandardClass);

function App() {
  const [list1Items, setList1Items] = useState([
    { id: "1", text: "Review design mockups", icon: "task" },
    { id: "2", text: "Update documentation", icon: "task" },
    { id: "3", text: "Fix bug #123", icon: "task" },
    { id: "4", text: "Prepare demo", icon: "task" },
    { id: "5", text: "Test new feature", icon: "task" },
  ]);
  const [list2Items, setList2Items] = useState([
    { id: "6", text: "Write unit tests", icon: "accept" },
    { id: "7", text: "Code review", icon: "accept" },
  ]);

  const [selected1, setSelected1] = useState(new Set());
  const [selected2, setSelected2] = useState(new Set());

  const handleSelectionChange1 = (
    e: UI5CustomEvent<ListClass, "selection-change">,
  ) => {
    const selectedItems = e.detail.selectedItems || [];
    setSelected1(new Set(selectedItems.map((item) => item.dataset.id)));
  };

  const handleSelectionChange2 = (
    e: UI5CustomEvent<ListClass, "selection-change">,
  ) => {
    const selectedItems = e.detail.selectedItems || [];
    setSelected2(new Set(selectedItems.map((item) => item.dataset.id)));
  };

  const handleDragStart1 = (e: DragEvent) => {
    const draggedId = e.currentTarget.dataset?.id;
    if (!draggedId) return;

    if (!selected1.has(draggedId)) {
      setSelected1(new Set([draggedId]));
    }

    if (selected1.has(draggedId) && selected1.size > 1) {
      startMultipleDrag(selected1.size, e);
    }
  };

  const handleDragStart2 = (e: DragEvent) => {
    const draggedId = e.currentTarget.dataset?.id;
    if (!draggedId) return;

    if (!selected2.has(draggedId)) {
      setSelected2(new Set([draggedId]));
    }

    if (selected2.has(draggedId) && selected2.size > 1) {
      startMultipleDrag(selected2.size, e);
    }
  };

  const handleMoveOver = (e: UI5CustomEvent<ListClass, "move-over">) => {
    const { source, destination } = e.detail;

    if (
      destination.placement === MovePlacement.Before ||
      destination.placement === MovePlacement.After
    ) {
      e.preventDefault();
    }
  };

  const handleMove = (e: UI5CustomEvent<ListClass, "move">) => {
    const { source, destination } = e.detail;
    const sourceId = source.element.dataset.id;
    const destId = destination.element.dataset.id;

    const sourceInList1 = list1Items.some((item) => item.id === sourceId);
    const destInList1 = list1Items.some((item) => item.id === destId);
    const destInList2 = list2Items.some((item) => item.id === destId);

    const sourceList = sourceInList1 ? list1Items : list2Items;
    const sourceSelected = sourceInList1 ? selected1 : selected2;

    const itemsToMove =
      sourceSelected.has(sourceId) && sourceSelected.size > 1
        ? sourceList.filter((item) => sourceSelected.has(item.id))
        : sourceList.filter((item) => item.id === sourceId);

    const idsToMove = new Set(itemsToMove.map((item) => item.id));

    const newList1 = list1Items.filter((item) => !idsToMove.has(item.id));
    const newList2 = list2Items.filter((item) => !idsToMove.has(item.id));

    const targetList = destInList1 ? newList1 : destInList2 ? newList2 : null;
    if (!targetList) return;

    const destIndex = targetList.findIndex((item) => item.id === destId);
    let insertIndex = destIndex;
    if (destination.placement === MovePlacement.After) {
      insertIndex = destIndex + 1;
    }

    targetList.splice(insertIndex, 0, ...itemsToMove);

    setList1Items([...newList1]);
    setList2Items([...newList2]);
    setSelected1(new Set());
    setSelected2(new Set());
  };

  return (
    <>
      <div
        className="demo-container"
        style={{ display: "flex", gap: "2rem", padding: "1rem" }}
      >
        <div className="demo-section" style={{ flex: 1, maxWidth: "300px" }}>
          <div
            className="info"
            style={{
              fontSize: "0.875rem",
              color: "var(--sapNeutralTextColor)",
              marginBottom: "1rem",
              padding: "0.5rem",
              background: "var(--sapTile_Background)",
              borderRadius: "0.25rem",
            }}
          >
            Selected:{" "}
            <span
              style={{ fontWeight: "bold", color: "var(--sapHighlightColor)" }}
            >
              {selected1.size}
            </span>{" "}
            items
            <br />
            Select multiple items and drag to move them together
          </div>

          <List
            id="list1"
            headerText="My Tasks"
            selectionMode="Multiple"
            onSelectionChange={handleSelectionChange1}
            onMoveOver={handleMoveOver}
            onMove={handleMove}
            onDragStart={handleDragStart1}
          >
            {list1Items.map((item) => (
              <ListItemStandard
                key={item.id}
                movable={true}
                icon={item.icon}
                data-id={item.id}
                selected={selected1.has(item.id)}
              >
                {item.text}
              </ListItemStandard>
            ))}
          </List>
        </div>

        <div className="demo-section" style={{ flex: 1, maxWidth: "300px" }}>
          <div
            className="info"
            style={{
              fontSize: "0.875rem",
              color: "var(--sapNeutralTextColor)",
              marginBottom: "1rem",
              padding: "0.5rem",
              background: "var(--sapTile_Background)",
              borderRadius: "0.25rem",
            }}
          >
            Selected:{" "}
            <span
              style={{ fontWeight: "bold", color: "var(--sapHighlightColor)" }}
            >
              {selected2.size}
            </span>{" "}
            items
            <br />
            Drag items from the left list here
          </div>

          <List
            id="list2"
            headerText="Done"
            selectionMode="Multiple"
            onSelectionChange={handleSelectionChange2}
            onMoveOver={handleMoveOver}
            onMove={handleMove}
            onDragStart={handleDragStart2}
          >
            {list2Items.map((item) => (
              <ListItemStandard
                key={item.id}
                movable={true}
                icon={item.icon}
                data-id={item.id}
                selected={selected2.has(item.id)}
              >
                {item.text}
              </ListItemStandard>
            ))}
          </List>
        </div>
      </div>
    </>
  );
}

export default App;
