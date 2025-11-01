# ShellBarV2 Architecture

## Overview

ShellBarV2 is a modular application header component. The architecture separates concerns into focused support modules that the main component coordinates.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          ShellBarV2                              │
│                    (Main Component)                              │
│                                                                   │
│  Properties: branding, items, profile, searchField, etc.         │
│  Events: menu-button-click, notifications-click, etc.            │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ Coordinates
             │
    ┌────────┴─────────┬──────────┬──────────┬──────────┬─────────┐
    │                  │          │          │          │         │
    ▼                  ▼          ▼          ▼          ▼         ▼
┌────────┐    ┌────────────┐ ┌──────┐  ┌──────┐  ┌─────────┐ ┌──────────┐
│Actions │    │  Overflow  │ │Search│  │Event │  │Breakpoint│ │  Item    │
│Support │    │  Support   │ │Support│ │Bus   │  │         │ │Navigation│
└────────┘    └──────┬─────┘ └──────┘  └──────┘  └─────────┘ └──────────┘
                     │
              ┌──────┴──────┐
              │             │
              ▼             ▼
         ┌──────┐      ┌──────────┐
         │Event │      │   DOM    │
         │Bus   │      │ Adapter  │
         └──────┘      └──────────┘
```

## Module Responsibilities

### ShellBarV2 (Main Component)
- Coordinates all support modules
- Manages lifecycle (onEnterDOM, onExitDOM, rendering)
- Exposes public API (slots, properties, events)
- Delegates specific concerns to support modules

### ShellBarActions
**Pure logic - no dependencies**
- Builds action items list from configuration
- Maps properties to visible actions (notifications, product-switch, assistant, profile)
- Returns filtered array of visible actions

### ShellBarEventBus
**Internal event communication**
- Used by: OverflowSupport → ShellBarV2
- Wraps native CustomEvent dispatching
- Provides simple pub/sub interface (emit, on, off)

### ShellBarDomAdapter
**DOM access abstraction**
- Used by: OverflowSupport
- Provides width measurements
- Provides querySelector access to shadow DOM
- Single point for DOM operations

### ShellBarBreakpoint
**Pure logic - no dependencies**
- Calculates breakpoint from width (S, M, L, XL, XXL)
- Thresholds: 599, 1023, 1439, 1919
- Used to sync branding state and responsive behavior

### ShellBarSearchSupport
**Search field management**
- Auto-collapse/expand logic based on available space
- Syncs with self-collapsible search fields
- Determines full-screen search mode
- Listens to search field events (ui5-open, ui5-close, ui5-search)
- Manages phone vs desktop behavior

### ShellBarItemNavigation
**Keyboard navigation**
- Handles arrow keys (left/right), Home, End
- Finds tabbable elements and manages focus
- Respects input field cursor position
- Filters visible elements only

### ShellBarOverflowSupport
**Most complex module - overflow management**
- Dependencies: EventBus, DomAdapter
- Iteratively hides items when space is limited
- Priority system:
  - Content items hide first (order: 10-99)
  - Action items hide second (order: 100-199)
  - Protected items never hide (order: 900+)
- Measures DOM after each hide to check if overflow resolved
- Builds overflow popover items list
- Emits overflow-changed event

## Data Flow

### Initialization
```
1. ShellBarV2 constructor creates support modules
2. onEnterDOM: registers resize handler, subscribes to events
3. onBeforeRendering: updates actions, syncs search state
4. onAfterRendering: updates breakpoint, calculates overflow
```

### Resize Flow
```
1. ResizeHandler triggers handleResize()
2. Update breakpoint via ShellBarBreakpoint
3. Update overflow via ShellBarOverflowSupport
   - OverflowSupport measures DOM
   - Iteratively hides items
   - Emits overflow-changed event
4. ShellBarV2 receives overflow-changed
   - Updates item.inOverflow flags
   - Shows/hides overflow button
5. SearchSupport auto-manages search state based on available space
```

### Overflow Calculation
```
1. Build hidable items list with priorities
2. Reset all visibility
3. For each item (in priority order):
   - Check if still overflowing
   - If yes, hide item and track it
   - If item has showInOverflow=true, mark overflow button needed
4. Emit result
```

## Dependency Injection Pattern

All support modules receive dependencies via constructor:

```typescript
// Example: OverflowSupport
constructor({
  eventBus,
  domAdapter,
  getActions,
  getContent,
  getCustomItems,
})
```

This pattern:
- Makes dependencies explicit
- Enables testing
- Keeps modules decoupled
- Main component remains coordinator

## Key Design Decisions

### 1. Separation of Concerns
Each module handles one thing:
- Actions = action item list
- Overflow = hiding logic
- Search = search field behavior
- Breakpoint = size calculation
- Navigation = keyboard handling

### 2. Pure Logic Where Possible
Modules like Actions and Breakpoint are pure functions wrapped in classes. No side effects, easy to test.

### 3. Event-Based Communication
OverflowSupport emits events instead of directly modifying component state. ShellBarV2 listens and applies changes.

### 4. DOM Access Centralized
DomAdapter provides single point for DOM operations. Makes it easier to track and test.

### 5. No Cross-Module Dependencies
Support modules don't import each other. Only ShellBarV2 knows about all of them.

### 6. Minimal State
Support modules are mostly stateless. State lives in ShellBarV2 properties. Modules calculate and return results.

## File Structure

```
packages/fiori/src/
├── ShellBarV2.ts                    # Main component
├── ShellBarV2Template.tsx           # JSX template
├── ShellBarV2Item.ts                # Item component
├── shellbarv2/
│   ├── ShellBarActions.ts           # Action items logic
│   ├── ShellBarBreakpoint.ts        # Breakpoint calculation
│   ├── ShellBarDomAdapter.ts        # DOM access
│   ├── ShellBarEventBus.ts          # Event communication
│   ├── ShellBarItemNavigation.ts    # Keyboard navigation
│   ├── ShellBarOverflowSupport.ts   # Overflow management
│   ├── ShellBarSearchSupport.ts     # Search field support
│   └── README.md                    # This file
```

## External Dependencies

- `@ui5/webcomponents-base`: Base UI5 classes and decorators
- `@ui5/webcomponents`: Button, Icon, Popover, List
- `@ui5/webcomponents-icons`: bell, grid, da, overflow icons

## Public API

### Slots
- `branding`: Logo and title (ui5-shellbar-branding)
- `startButton`: Menu button (ui5-button)
- `content`: Center content items
- `items`: Custom items (ui5-shellbar-v2-item)
- `profile`: Profile avatar
- `assistant`: AI assistant button
- `searchField`: Search field component

### Properties
- `notificationsCount`: Badge count
- `showNotifications`: Show notifications icon
- `showProductSwitch`: Show product switch icon
- `showSearchField`: Show search field

### Events
- `menu-button-click`
- `notifications-click`
- `profile-click`
- `product-switch-click`
- `search-button-click`
- `search-field-toggle`
- `search-field-clear`

## Usage Example

```html
<ui5-shellbar-v2 show-notifications show-product-switch>
  <ui5-button slot="startButton" icon="menu"></ui5-button>
  <ui5-shellbar-branding slot="branding"></ui5-shellbar-branding>
  <ui5-shellbar-v2-item icon="action" text="Action"></ui5-shellbar-v2-item>
  <ui5-avatar slot="profile"></ui5-avatar>
</ui5-shellbar-v2>
```

## Testing Strategy

Each module can be tested independently:

1. **Actions**: Pure function testing (input → output)
2. **Breakpoint**: Pure function testing
3. **EventBus**: Verify events are dispatched
4. **DomAdapter**: Mock DOM, verify selectors and measurements
5. **SearchSupport**: Test auto-collapse logic with mocked dependencies
6. **ItemNavigation**: Test keyboard events and focus management
7. **OverflowSupport**: Most complex - test hide priority, overflow detection

Integration tests verify ShellBarV2 coordinates modules correctly.

## Future Improvements

1. **Virtual scrolling for overflow**: If hundreds of items, use virtual list
2. **Drag-and-drop reordering**: Allow users to reorder items
3. **Persistent overflow state**: Remember which items user prefers visible
4. **Animation support**: Smooth transitions when items hide/show
5. **Server-side rendering**: Ensure component works without JS

## Summary

ShellBarV2 uses a coordinator pattern. The main component delegates specific concerns to focused support modules. This keeps code simple, testable, and maintainable. Each module does one thing well. Dependencies flow inward (modules don't know about ShellBarV2). Communication happens via constructor injection and events.

This architecture makes it easy to:
- Test modules in isolation
- Add new features (create new support module)
- Fix bugs (find responsible module)
- Understand code (clear boundaries)

