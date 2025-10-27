---
title: Drag and Drop
---

# Drag and Drop

*UI5 Web Components has built-in drag and drop for lists, trees, tables, and tabs. This guide shows you how to use it.*

You can drag items to reorder them or move them between components. The framework handles visual feedback and multiple selection for you.

## Supported Components

These components support drag and drop:

### Lists and Trees
- `ui5-list` - Lists with movable items
- `ui5-li` - List items you can drag
- `ui5-li-custom` - Custom list items you can drag
- `ui5-tree` - Trees with movable items
- `ui5-tree-item` - Tree items you can drag
- `ui5-tree-item-custom` - Custom tree items you can drag

### Tables
- `ui5-table` - Tables with movable rows
- `ui5-table-row` - Table rows you can drag

### Tab Containers
- `ui5-tab-container` - Tab containers with movable tabs
- `ui5-tab` - Tabs you can drag

### Other Components
- `ui5-li-group` - List groups that support drag events

## Basic Setup

### Make List Items Draggable

Set the `movable` property to `true`:

```html
<ui5-list id="myList" header-text="Draggable Items">
    <ui5-li movable>Item 1</ui5-li>
    <ui5-li movable>Item 2</ui5-li>
    <ui5-li movable>Item 3</ui5-li>
</ui5-list>
```

### Handle Drag Events

Lists fire two events for drag operations:

#### `move-over` Event

This fires when you drag an item over a drop target. Use it to validate if the drop is allowed:

```javascript
list.addEventListener("ui5-move-over", (event) => {
    const { source, destination } = event.detail;
    
    // Allow drop before or after items
    if (destination.placement === "Before" || destination.placement === "After") {
        event.preventDefault(); // Allow the drop
    }
    
    // Conditionally allow nesting
    if (destination.placement === "On" && destination.element.dataset.allowsNesting) {
        event.preventDefault();
    }
});
```

#### `move` Event

This fires when you drop an item. It only fires if you prevented the default action in the `move-over` event:

```javascript
list.addEventListener("ui5-move", (event) => {
    const { source, destination } = event.detail;
    
    switch (destination.placement) {
        case "Before":
            destination.element.before(source.element);
            break;
        case "After":
            destination.element.after(source.element);
            break;
        case "On":
            destination.element.prepend(source.element);
            break;
    }
});
```

## Event Details

Both events give you this information:

```typescript
{
    source: {
        element: HTMLElement  // The element being dragged
    },
    destination: {
        element: HTMLElement,     // The target element
        placement: "Before" | "After" | "On"  // Where the item should be placed
    }
}
```

### Where Items Can Go

- **`Before`**: Place the item before the target
- **`After`**: Place the item after the target  
- **`On`**: Place the item inside the target (for nesting)

## Multiple Item Drag

You can drag multiple selected items at once when using lists with multiple selection.

### Enable Multiple Selection

```html
<ui5-list selection-mode="Multiple">
    <ui5-li movable>Item 1</ui5-li>
    <ui5-li movable>Item 2</ui5-li>
    <ui5-li movable>Item 3</ui5-li>
</ui5-list>
```

### Handle Multiple Item Drag

When you select multiple items and drag one of them, all selected items move together:

```javascript
import { startMultipleDrag } from "@ui5/webcomponents-base/dist/DragAndDrop.js";

list.addEventListener("dragstart", (event) => {
    const selectedItems = list.getItems().filter(item => item.selected);
    const draggedItem = event.target;
    
    // If dragged item is not selected, select only it
    if (!draggedItem.selected) {
        selectedItems.forEach(item => item.selected = false);
        draggedItem.selected = true;
    }
    
    const currentSelected = list.getItems().filter(item => item.selected);
    
    // Start multiple drag if more than one item is selected
    if (currentSelected.length > 1) {
        startMultipleDrag(currentSelected.length, event);
    }
});
```

Remember to move the selected items in the `move` event instead of just the dragged item:

```javascript
function handleMove(event) {
    const { source, destination } = event.detail;
    
    // Get the source list to find all selected items
    const sourceList = source.element.closest('ui5-list');
    const selectedItems = sourceList.getItems().filter(item => item.selected);
    
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
}
```
## Advanced Features

### Custom Drag Images

You can create custom drag images for better visual feedback:

```css
.drag-image {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    border: 2px solid #7c3aed;
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    white-space: nowrap;
    position: absolute;
    top: -1000px; /* Hide off-screen */
    left: -1000px; /* Hide off-screen */
}
```

Then create a custom drag image element in JavaScript:

```javascript
function createCustomDragImage(count) {
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="drag-image">
            ${count} Items
        </div>
    `;
    document.body.appendChild(element);
    return element;
}

list.addEventListener("dragstart", (event) => {
    const selectedItems = list.getItems().filter(item => item.selected);
    if (selectedItems.length > 1) {
        const dragElement = createCustomDragImage(selectedItems.length);
        event.dataTransfer.setDragImage(dragElement, 30, 15);
        
        // Clean up after drag starts
        requestAnimationFrame(() => {
            if (dragElement.parentNode) {
                dragElement.parentNode.removeChild(dragElement);
            }
        });
    }
});
```

### Conditional Drag and Drop

You can control which items accept drops based on their properties:

```javascript
// Mark certain items as fixed (non-movable)
list.addEventListener("ui5-move-over", (event) => {
    const { destination } = event.detail;
    
    // Prevent dropping on fixed items
    if (destination.element.dataset.fixed) {
        return; // Don't prevent default, disallow drop
    }
    
    event.preventDefault(); // Allow drop
});
```

### Drag Between Lists

You can drag items between different lists:

```javascript
const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");

function handleCrossListMove(event) {
    const { source, destination } = event.detail;
    
    // Allow drops from other lists
    if (!event.currentTarget.contains(source.element)) {
        event.preventDefault();
    }
}

list1.addEventListener("ui5-move-over", handleCrossListMove);
list2.addEventListener("ui5-move-over", handleCrossListMove);

// Handle the actual move
[list1, list2].forEach(list => {
    list.addEventListener("ui5-move", (event) => {
        const { source, destination } = event.detail;
        
        switch (destination.placement) {
            case "Before":
                destination.element.before(source.element);
                break;
            case "After":
                destination.element.after(source.element);
                break;
        }
    });
});
```

## DragRegistry API

For advanced cases, use the DragRegistry API to control multiple drag operations programmatically:

```javascript
import { startMultipleDrag } from "@ui5/webcomponents-base/dist/DragAndDrop.js";

// Start a multiple drag operation
startMultipleDrag(itemCount, dragEvent);
```

### DragRegistry Methods

- **`startMultipleDrag(count: number, e: DragEvent)`**: Starts a multiple drag operation with a custom ghost showing the item count

## Best Practices

### 1. Validate Drop Operations

Always check if drops are valid in the `move-over` event:

```javascript
list.addEventListener("ui5-move-over", (event) => {
    const { source, destination } = event.detail;
    
    // Example: Prevent dropping item on itself
    if (source.element === destination.element) {
        return;
    }
    
    // Example: Check business logic
    if (isValidDrop(source.element, destination.element)) {
        event.preventDefault();
    }
});
```

### 2. Handle Edge Cases

Think about fixed items, disabled states, and loading states:

```javascript
list.addEventListener("ui5-move-over", (event) => {
    const { destination, source } = event.detail;
    
    // Don't allow drops during loading
    if (list.loading) {
        return;
    }
    
    // Don't allow drops on disabled items
    if (destination.element.disabled) {
        return;
    }
    
    event.preventDefault();
});
```

### 3. Make It Accessible

Make sure drag and drop works for everyone:

- Add keyboard alternatives for drag and drop operations
- Use proper ARIA labels and descriptions
- Announce drag operations to screen readers

## TypeScript Support

When using TypeScript, import the right types:

```typescript
import type { ListMoveEventDetail } from "@ui5/webcomponents/dist/List.js";

const handleMove = (event: CustomEvent<ListMoveEventDetail>) => {
    const { source, destination } = event.detail;
    // Type-safe access to event details
};
```

## Browser Support

Drag and drop works in all modern browsers that support the HTML5 Drag and Drop API. Older browsers fall back to basic mouse interactions.
