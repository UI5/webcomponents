import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/task.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import { startMultipleDrag } from "@ui5/webcomponents-base/dist/DragAndDrop.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const lists = [
    document.getElementById("list1"),
    document.getElementById("list2"),
];
const counters = [
    document.getElementById("count1"),
    document.getElementById("count2"),
];

function getSelectedItems(list) {
    return list.getItems().filter(item => item.selected);
}

function updateSelectionCount(listIndex) {
    const selectedItems = getSelectedItems(lists[listIndex]);
    counters[listIndex].textContent = selectedItems.length;
}

function setupSelectionChangeListener(listIndex) {
    lists[listIndex].addEventListener("ui5-selection-change", () => {
        updateSelectionCount(listIndex);
    });
}

function handleDragStart(listIndex) {
    return function(event) {
        const list = lists[listIndex];
        const selectedItems = getSelectedItems(list);
        const draggedItem = event.target;

        // If dragged item is not selected, select only it
        if (!draggedItem.selected) {
            selectedItems.forEach(item => item.selected = false);
            draggedItem.selected = true;
            updateSelectionCount(listIndex);
        }

        const currentSelected = getSelectedItems(list);

        // Start multiple drag if more than one item is selected
        if (currentSelected.length > 1) {
            startMultipleDrag(currentSelected.length, event);
        }
    };
}

function handleMoveOver(event) {
    const { source, destination } = event.detail;

    // Allow drops from both lists
    const sourceList = source.element.closest('ui5-list');
    if (lists.includes(sourceList)) {
        // Allow reordering within lists
        if (destination.placement === MovePlacement.Before ||
            destination.placement === MovePlacement.After) {
            event.preventDefault();
        }
    }
}

function handleMove(event) {
    const { source, destination } = event.detail;

    // Get the source list to find all selected items
    const sourceList = source.element.closest('ui5-list');
    const selectedItems = getSelectedItems(sourceList);

    // Determine which items to move: all selected items or just the dragged item
    const itemsToMove = selectedItems.length > 1 && selectedItems.includes(source.element)
        ? selectedItems
        : [source.element];

    // Move the items using spread operator
    switch (destination.placement) {
        case MovePlacement.Before:
            destination.element.before(...itemsToMove);
            break;
        case MovePlacement.After:
            destination.element.after(...itemsToMove);
            break;
        case MovePlacement.On:
            destination.element.prepend(...itemsToMove);
            break;
    }

    // Update selection counts after move
    setTimeout(() => {
        updateSelectionCount(0);
        updateSelectionCount(1);
    }, 0);
}

// Setup both lists
lists.forEach((list, index) => {
    setupSelectionChangeListener(index);
    list.addEventListener("dragstart", handleDragStart(index));
    list.addEventListener("ui5-move-over", handleMoveOver);
    list.addEventListener("ui5-move", handleMove);
});

// Initialize selection counts
updateSelectionCount(0);
updateSelectionCount(1);
