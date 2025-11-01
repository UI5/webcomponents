# ShellBarV2 Architecture Review

## Executive Summary

The ShellBarV2 architecture uses a coordinator pattern with focused support modules. While the separation of concerns is good, several design issues exist:

- **Over-engineered simple abstractions** (EventBus, DomAdapter)
- **Under-engineered complex logic** (overflow calculation, error handling)
- **Tight coupling via lambda closures**
- **Performance issues** (layout thrashing in overflow calculation)
- **Missing optimizations** (lazy initialization, memoization)

## Critical Design Flaws

### 1. Tight Coupling via Lambda Closures

**Location**: `ShellBarV2.ts` lines 339-345

```typescript
overflowSupport = new ShellBarV2OverflowSupport({
  eventBus: this.eventBus,
  domAdapter: this.domAdapter,
  getActions: () => this.actions.slice(),
  getContent: () => this.content.slice(),
  getCustomItems: () => this.items.slice(),
});
```

**Problem**:
- Support modules hold closures over component internals
- Makes unit testing difficult (can't mock data easily)
- Hides what data modules actually need
- Creates implicit dependencies

**Impact**: High - affects testability and maintainability

**Recommended Fix**:
```typescript
// Pass data when calling methods, not in constructor
const result = overflowSupport.updateOverflow({
  actions: this.actions,
  content: this.content,
  items: this.items,
  overflowOuter: this.overflowOuter!,
  overflowInner: this.overflowInner!,
  showSearchField: this.showSearchField,
});
```

**Benefits**:
- Explicit dependencies
- Easy to test with mock data
- Clear what module needs

### 2. Circular Reference Risk

**Location**: `ShellBarV2.ts` lines 322-324

```typescript
eventBus = new ShellBarV2EventBus({
  host: this,  // Component passes itself
});
```

**Problem**:
- Component passes `this` to module
- Creates circular reference (component → module → component)
- Potential garbage collection issues
- Module can call any component method (violates encapsulation)

**Impact**: Medium - potential memory leaks

**Recommended Fix**:
```typescript
// Remove EventBus entirely, use native events
private emitOverflowChanged(detail: OverflowChangedDetail) {
  this.dispatchEvent(new CustomEvent("overflow-changed", { detail }));
}
```

**Benefits**:
- No circular references
- Less code to maintain
- Standard event API

### 3. Unnecessary Abstractions

**Location**: `ShellBarDomAdapter.ts` (entire file)

```typescript
class ShellBarV2DomAdapter {
  getWidth(): number {
    return this.host.getBoundingClientRect().width;
  }
  
  querySelector<T>(selector: string): T | null {
    return this.shadowRoot.querySelector<T>(selector);
  }
}
```

**Problem**:
- 15-line wrapper around two DOM calls
- No logic or complexity to justify abstraction
- Adds indirection without value
- More code to maintain

**Impact**: Low - unnecessary complexity

**Recommended Fix**:
```typescript
// Remove DomAdapter, call DOM directly
private getWidth(): number {
  return this.getBoundingClientRect().width;
}

private querySelector<T>(selector: string): T | null {
  return this.shadowRoot!.querySelector<T>(selector);
}
```

**Benefits**:
- Less code
- Clearer intent
- One less file to maintain

**Same issue with EventBus**: Another 15-line wrapper that doesn't add value.

### 4. State Ownership Unclear

**Location**: `ShellBarOverflowSupport.ts` line 35, `ShellBarV2.ts` lines 478-486

```typescript
// In OverflowSupport:
private hiddenItems: string[] = [];

// In ShellBarV2:
items.forEach(item => {
  item.inOverflow = hiddenItems.includes(item._id);
});
```

**Problem**:
- Overflow state duplicated in two places
- Who owns the truth?
- Synchronization required
- Potential for inconsistency

**Impact**: Medium - maintainability and bugs

**Recommended Fix**:
```typescript
// Component owns all state
private hiddenItemIds: Set<string> = new Set();

// Module only calculates, doesn't store
calculateOverflow(params): string[] {
  return /* list of hidden IDs */;
}
```

**Benefits**:
- Single source of truth
- No synchronization needed
- Clear ownership

### 5. SearchSupport Does Too Much

**Location**: `ShellBarSearchSupport.ts` (entire file)

**Responsibilities**:
1. Event subscription (subscribe/unsubscribe)
2. Event handling (onSearch, onSearchOpen, onSearchClose)
3. State synchronization (syncCollapsedState)
4. Auto-management logic (autoManageSearchState)
5. Full-screen detection (shouldShowFullScreen)
6. CSS variable parsing (getSearchFieldWidth)

**Problem**:
- Violates Single Responsibility Principle
- Hard to test (too many concerns)
- Hard to understand (what is this module for?)
- Hard to change (ripple effects)

**Impact**: High - maintainability

**Recommended Fix**:
```typescript
// Split into focused modules
class SearchEventSubscriber {
  subscribe(field, handlers) { /* ... */ }
  unsubscribe(field, handlers) { /* ... */ }
}

class SearchAutoManager {
  shouldCollapse(hiddenItems, space, hasValue, hasFocus): boolean {
    return hiddenItems > 0 && !hasValue && !hasFocus;
  }
  
  shouldExpand(availableSpace, requiredSpace): boolean {
    return availableSpace > requiredSpace;
  }
}

// Or inline simple logic in main component
```

**Benefits**:
- Each class has one reason to change
- Easy to test individual behaviors
- Clear purpose

### 6. Magic Numbers and Strings

**Location**: `ShellBarOverflowSupport.ts` lines 136, 151, 169

```typescript
const hideOrder = 10 + dataHideOrder;  // Content items
let hideOrder = 0 + (params.showSearchField ? 100 : 0);  // Actions
hideOrder: 999,  // Protected items

// Magic CSS classes
element.classList.add("ui5-shellbar-hidden");
```

**Problem**:
- No explanation for numbers
- Hard to understand priority system
- Hard to modify (where else is 100 used?)
- Typo-prone string literals

**Impact**: Medium - readability and maintainability

**Recommended Fix**:
```typescript
const HIDE_ORDER = {
  // Content items hide first
  CONTENT_BASE: 10,
  
  // Action items hide second
  ACTION_BASE: 100,
  
  // Protected items never hide
  PROTECTED_BASE: 900,
} as const;

const CSS_CLASSES = {
  HIDDEN: "ui5-shellbar-hidden",
} as const;

// Usage
const hideOrder = HIDE_ORDER.CONTENT_BASE + dataHideOrder;
element.classList.add(CSS_CLASSES.HIDDEN);
```

**Benefits**:
- Self-documenting
- Easy to change
- No typos
- Centralized configuration

### 7. Imperative Overflow Algorithm with Layout Thrashing

**Location**: `ShellBarOverflowSupport.ts` lines 79-101

```typescript
sortedItems.forEach(item => {
  if (item.protected) {
    return;
  }
  
  // Check if still overflowing - FORCES REFLOW!
  if (!this.isOverflowing(overflowOuter, overflowInner)) {
    return;
  }
  
  // Hide item - FORCES REFLOW!
  element.classList.add("ui5-shellbar-hidden");
  hiddenItems.push(item.id);
});
```

**Problem**:
- Reads layout (getBoundingClientRect) after every write (classList.add)
- Forces browser reflow for each item
- O(n) reflows where n = number of items
- Performance degrades with many items
- Imperative style hard to reason about

**Impact**: High - performance

**Recommended Fix**:
```typescript
// Pure function that calculates what to hide
function calculateHiddenItems(
  items: OverflowItem[],
  containerWidth: number,
): string[] {
  const hidden: string[] = [];
  let accumulatedWidth = 0;
  
  // Calculate widths upfront (batch read)
  const itemWidths = items.map(item => ({
    id: item.id,
    width: getElementWidth(item.selector),
    protected: item.protected,
    order: item.hideOrder,
  }));
  
  // Sort by hide order
  itemWidths.sort((a, b) => a.order - b.order);
  
  // Calculate visible width
  const visibleWidth = itemWidths
    .filter(item => !item.protected)
    .reduce((sum, item) => sum + item.width, 0);
  
  if (visibleWidth <= containerWidth) {
    return []; // Nothing to hide
  }
  
  // Calculate what to hide
  let remainingWidth = visibleWidth;
  for (const item of itemWidths) {
    if (item.protected) continue;
    
    if (remainingWidth > containerWidth) {
      hidden.push(item.id);
      remainingWidth -= item.width;
    }
  }
  
  return hidden;
}

// Apply changes in one pass (batch write)
function applyHiddenItems(hidden: string[], domAdapter: DomAdapter) {
  hidden.forEach(id => {
    const element = domAdapter.querySelector(`[data-id="${id}"]`);
    if (element) {
      element.classList.add(CSS_CLASSES.HIDDEN);
    }
  });
}

// Usage
const hidden = calculateHiddenItems(items, containerWidth);
applyHiddenItems(hidden, domAdapter);
```

**Benefits**:
- Single reflow instead of n reflows
- Pure calculation (testable without DOM)
- Better performance
- Declarative style (easier to understand)

**Performance Impact**: With 10 items, this is 10x faster (1 reflow vs 10).

### 8. No Error Handling

**Location**: `ShellBarOverflowSupport.ts` lines 91-94

```typescript
const element = this.domAdapter.querySelector(item.selector);
if (element) {
  element.classList.add("ui5-shellbar-hidden");
}
// What if element is null? Silent failure.
```

**Problem**:
- Silent failures hide bugs
- No logging or warnings
- Hard to debug when things break
- No fallback behavior

**Impact**: Medium - debugging and reliability

**Recommended Fix**:
```typescript
const element = this.domAdapter.querySelector(item.selector);
if (!element) {
  console.warn(
    `ShellBarV2: Could not find element for overflow item "${item.id}" with selector "${item.selector}"`
  );
  return;
}
element.classList.add(CSS_CLASSES.HIDDEN);
```

**Or use assertions in development**:
```typescript
if (!element) {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `Missing overflow item: "${item.id}" (${item.selector})`
    );
  }
  console.warn(/* ... */);
  return;
}
```

**Benefits**:
- Failures visible during development
- Easier debugging
- Graceful degradation in production

### 9. No Lazy Initialization

**Location**: `ShellBarV2.ts` lines 322-352

```typescript
// All modules created immediately
eventBus = new ShellBarV2EventBus({...});
domAdapter = new ShellBarV2DomAdapter({...});
searchSupport = new ShellBarV2SearchSupport({...});
overflowSupport = new ShellBarV2OverflowSupport({...});
itemNavigation = new ShellBarV2ItemNavigation({...});
breakpoint = new ShellBarV2Breakpoint();
actionsSupport = new ShellBarV2Actions();
```

**Problem**:
- All modules created even if never used
- Search support created even without search field
- Wastes memory
- Wastes initialization time

**Impact**: Low - minor optimization

**Recommended Fix**:
```typescript
private _searchSupport?: ShellBarV2SearchSupport;
get searchSupport() {
  if (!this._searchSupport && this.hasSearchField) {
    this._searchSupport = new ShellBarV2SearchSupport({
      getSearchState: () => this.showSearchField,
      setSearchState: (expanded) => this.setSearchState(expanded),
      getSearchField: () => this.search,
      getCSSVariable: (cssVar) => this.getCSSVariable(cssVar),
      getOverflowed: () => this.overflowSupport.isOverflowing(
        this.overflowOuter!,
        this.overflowInner!
      ),
    });
  }
  return this._searchSupport;
}

onEnterDOM() {
  ResizeHandler.register(this, this.handleResizeBound);
  
  // Only subscribe if search exists
  if (this.hasSearchField) {
    this.searchSupport?.subscribe();
  }
  
  this.eventBus.on("overflow-changed", this.handleOverflowChangedBound);
}
```

**Benefits**:
- Only create what's needed
- Faster initialization
- Lower memory footprint

### 10. Priority Flip Hack

**Location**: `ShellBarOverflowSupport.ts` lines 153-156

```typescript
let hideOrder = 0 + (params.showSearchField ? 100 : 0);

if (this.isCurrentlyHidden(selector)) {
  // flip priority to ensure currently hidden items remain hidden
  hideOrder *= -1;  // WTF? Negative numbers for priority?
}
```

**Problem**:
- Using negative numbers to flip priority
- Confusing and non-obvious
- Fragile (what if we need to flip again?)
- Hard to understand intent

**Impact**: Medium - maintainability

**Recommended Fix**:
```typescript
interface OverflowItem {
  id: string;
  hideOrder: number;
  protected: boolean;
  selector: string;
  currentlyHidden: boolean;  // Explicit flag
}

// Sort with explicit logic
items.sort((a, b) => {
  // Hidden items stay hidden (priority boost)
  if (a.currentlyHidden !== b.currentlyHidden) {
    return a.currentlyHidden ? -1 : 1;
  }
  
  // Protected items last
  if (a.protected !== b.protected) {
    return a.protected ? 1 : -1;
  }
  
  // Normal priority
  return a.hideOrder - b.hideOrder;
});
```

**Benefits**:
- Clear intent
- Explicit sorting logic
- Easy to modify
- Self-documenting

## Design Pattern Improvements

### Pattern 1: Replace Coordinator with Facade

**Current**: ShellBarV2 directly coordinates all modules.

**Problem**: Component class becomes large and hard to test.

**Recommended**: Extract coordination logic to separate controller.

```typescript
class ShellBarV2Controller {
  constructor(
    private component: ShellBarV2,
    private breakpoint: ShellBarBreakpoint,
    private overflow: ShellBarOverflow,
    private search: ShellBarSearch,
  ) {}
  
  handleResize() {
    this.updateBreakpoint();
    const overflowResult = this.updateOverflow();
    this.updateSearch(overflowResult);
  }
  
  private updateBreakpoint() {
    const width = this.component.getBoundingClientRect().width;
    const bp = this.breakpoint.calculate({ width });
    if (this.component.breakpointSize !== bp) {
      this.component.breakpointSize = bp;
    }
  }
  
  private updateOverflow(): OverflowResult {
    return this.overflow.calculate({
      items: this.component.items,
      actions: this.component.actions,
      containerWidth: this.component.getWidth(),
    });
  }
  
  private updateSearch(overflowResult: OverflowResult) {
    this.search.autoManage({
      hiddenCount: overflowResult.hiddenItems.length,
      availableSpace: overflowResult.spacerWidth,
    });
  }
}

// In ShellBarV2:
private controller = new ShellBarV2Controller(this, ...);

handleResize() {
  this.controller.handleResize();
}
```

**Benefits**:
- Separation of coordination logic
- Easier to test controller independently
- Component stays focused on rendering

### Pattern 2: Strategy Pattern for Overflow

**Current**: Single overflow algorithm hardcoded.

**Problem**: Can't change strategy (e.g., different hiding logic for mobile).

**Recommended**: Use Strategy pattern.

```typescript
interface OverflowStrategy {
  calculateHiddenItems(
    items: OverflowItem[],
    containerWidth: number,
  ): string[];
}

class PriorityOverflowStrategy implements OverflowStrategy {
  calculateHiddenItems(items, containerWidth) {
    // Current priority-based algorithm
  }
}

class BalancedOverflowStrategy implements OverflowStrategy {
  calculateHiddenItems(items, containerWidth) {
    // Hide items more evenly
  }
}

class MobileOverflowStrategy implements OverflowStrategy {
  calculateHiddenItems(items, containerWidth) {
    // More aggressive hiding for mobile
  }
}

class ShellBarOverflow {
  constructor(private strategy: OverflowStrategy) {}
  
  setStrategy(strategy: OverflowStrategy) {
    this.strategy = strategy;
  }
  
  calculate(params: OverflowParams) {
    return this.strategy.calculateHiddenItems(
      params.items,
      params.containerWidth,
    );
  }
}
```

**Benefits**:
- Multiple overflow algorithms
- Easy to test each strategy
- Can switch at runtime
- Open/closed principle

### Pattern 3: Observer Pattern Instead of EventBus

**Current**: Custom EventBus wrapper.

**Problem**: Unnecessary abstraction.

**Recommended**: Standard Observer pattern or native events.

```typescript
interface Observer<T> {
  update(data: T): void;
}

class OverflowObservable {
  private observers: Array<Observer<OverflowState>> = [];
  
  subscribe(observer: Observer<OverflowState>) {
    this.observers.push(observer);
    return () => this.unsubscribe(observer);
  }
  
  unsubscribe(observer: Observer<OverflowState>) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify(state: OverflowState) {
    this.observers.forEach(obs => obs.update(state));
  }
}

// Usage
class ShellBarV2 implements Observer<OverflowState> {
  onEnterDOM() {
    this.overflow.subscribe(this);
  }
  
  update(state: OverflowState) {
    this.handleOverflowChanged(state);
  }
}
```

**Or just use native events** (simpler):
```typescript
// In overflow module
this.dispatchEvent(new CustomEvent("overflow-changed", { detail }));

// In component
this.addEventListener("overflow-changed", this.handleOverflow);
```

**Benefits**:
- Standard pattern
- Type-safe
- Less code

### Pattern 4: Builder Pattern for Actions

**Current**: Imperative array building with filter.

**Problem**: Hard to modify, not fluent.

**Recommended**: Builder pattern.

```typescript
class ActionListBuilder {
  private actions: ActionItem[] = [];
  
  addNotifications(config: { show: boolean, count?: string }) {
    if (config.show) {
      this.actions.push({
        id: "notifications",
        visible: true,
        count: config.count,
        icon: "bell",
      });
    }
    return this;
  }
  
  addProductSwitch(show: boolean) {
    if (show) {
      this.actions.push({
        id: "product-switch",
        visible: true,
        icon: "grid",
      });
    }
    return this;
  }
  
  addAssistant(show: boolean) {
    if (show) {
      this.actions.push({
        id: "assistant",
        visible: true,
        icon: "da",
      });
    }
    return this;
  }
  
  addProfile(show: boolean) {
    if (show) {
      this.actions.push({
        id: "profile",
        visible: true,
      });
    }
    return this;
  }
  
  build(): ActionItem[] {
    return this.actions;
  }
}

// Usage
const actions = new ActionListBuilder()
  .addNotifications({ show: this.showNotifications, count: this.notificationsCount })
  .addProductSwitch(this.showProductSwitch)
  .addAssistant(this.hasAssistant)
  .addProfile(this.hasProfile)
  .build();
```

**Benefits**:
- Fluent API
- Easy to extend
- Self-documenting
- Each method handles one action

## Architecture Improvements

### 1. Inversion of Control

**Current**: Component creates all modules.

**Problem**: Hard to test with mocks, tight coupling.

**Recommended**: Dependency injection.

```typescript
interface ShellBarV2Dependencies {
  breakpoint?: ShellBarBreakpoint;
  overflow?: ShellBarOverflow;
  search?: ShellBarSearch;
  navigation?: ShellBarNavigation;
}

class ShellBarV2 extends UI5Element {
  private breakpoint: ShellBarBreakpoint;
  private overflow: ShellBarOverflow;
  // ...
  
  constructor(deps: ShellBarV2Dependencies = {}) {
    super();
    this.breakpoint = deps.breakpoint ?? new ShellBarBreakpoint();
    this.overflow = deps.overflow ?? new ShellBarOverflow();
    // ...
  }
}

// Testing
const mockOverflow = { calculate: jest.fn() };
const shellbar = new ShellBarV2({ overflow: mockOverflow });
```

**Benefits**:
- Easy to inject mocks for testing
- Can swap implementations
- Clear dependencies

### 2. Pure Overflow Calculation

**Current**: Overflow calculation mutates DOM while measuring.

**Problem**: Layout thrashing, hard to test, imperative.

**Recommended**: Pure calculation, then apply.

```typescript
interface OverflowCalculationInput {
  items: ReadonlyArray<{
    id: string;
    width: number;
    priority: number;
    protected: boolean;
  }>;
  containerWidth: number;
}

interface OverflowCalculationResult {
  hiddenIds: ReadonlyArray<string>;
  visibleIds: ReadonlyArray<string>;
  showOverflowButton: boolean;
}

// Pure function - no side effects
function calculateOverflow(
  input: OverflowCalculationInput,
): OverflowCalculationResult {
  const sortedItems = [...input.items].sort((a, b) => a.priority - b.priority);
  
  let usedWidth = 0;
  const hidden: string[] = [];
  const visible: string[] = [];
  
  for (const item of sortedItems) {
    if (item.protected) {
      visible.push(item.id);
      usedWidth += item.width;
      continue;
    }
    
    if (usedWidth + item.width <= input.containerWidth) {
      visible.push(item.id);
      usedWidth += item.width;
    } else {
      hidden.push(item.id);
    }
  }
  
  return {
    hiddenIds: hidden,
    visibleIds: visible,
    showOverflowButton: hidden.length > 0,
  };
}

// Separate function to apply result to DOM
function applyOverflowResult(
  result: OverflowCalculationResult,
  querySelector: (selector: string) => Element | null,
) {
  result.hiddenIds.forEach(id => {
    const element = querySelector(`[data-id="${id}"]`);
    element?.classList.add(CSS_CLASSES.HIDDEN);
  });
  
  result.visibleIds.forEach(id => {
    const element = querySelector(`[data-id="${id}"]`);
    element?.classList.remove(CSS_CLASSES.HIDDEN);
  });
}
```

**Benefits**:
- Pure function (easy to test without DOM)
- No layout thrashing
- Declarative
- Predictable

### 3. Immutable State Updates

**Current**: State mutated in place.

```typescript
this.hiddenItems.push(itemId);
items.forEach(item => { item.inOverflow = true; });
```

**Problem**: Hard to track changes, side effects.

**Recommended**: Immutable updates.

```typescript
// Before
this.hiddenItems.push(itemId);

// After
this.hiddenItems = [...this.hiddenItems, itemId];

// Before
items.forEach(item => {
  item.inOverflow = hiddenIds.includes(item._id);
});

// After
this.items = this.items.map(item => ({
  ...item,
  inOverflow: hiddenIds.includes(item._id),
}));
```

**Benefits**:
- Predictable state changes
- Easy to debug (can log before/after)
- Works with time-travel debugging
- Safer in async code

### 4. Clear Contracts with Interfaces

**Current**: Implicit contracts (lambdas, any types).

**Problem**: Hard to understand what module needs.

**Recommended**: Explicit interfaces.

```typescript
interface IOverflowSupport {
  calculate(params: OverflowParams): OverflowResult;
  getOverflowItems(): ReadonlyArray<OverflowItem>;
}

interface OverflowParams {
  readonly items: ReadonlyArray<ShellBarItem>;
  readonly actions: ReadonlyArray<ActionItem>;
  readonly containerWidth: number;
  readonly showSearchField: boolean;
}

interface OverflowResult {
  readonly hiddenIds: ReadonlyArray<string>;
  readonly showOverflowButton: boolean;
}

class ShellBarOverflowSupport implements IOverflowSupport {
  calculate(params: OverflowParams): OverflowResult {
    // Implementation
  }
  
  getOverflowItems(): ReadonlyArray<OverflowItem> {
    // Implementation
  }
}
```

**Benefits**:
- Clear contracts
- TypeScript enforcement
- Self-documenting
- Easy to mock for testing

### 5. Composition Over Classes

**Current**: Each feature is a class.

**Problem**: Classes add boilerplate.

**Recommended**: Compose simple functions.

```typescript
// Simple functions
function calculateBreakpoint(width: number): BreakpointType {
  if (width <= 599) return "S";
  if (width <= 1023) return "M";
  if (width <= 1439) return "L";
  if (width <= 1919) return "XL";
  return "XXL";
}

function buildActions(params: ActionsParams): ActionItem[] {
  return [
    params.showNotifications && {
      id: "notifications",
      count: params.notificationsCount,
      icon: "bell",
    },
    params.showProductSwitch && {
      id: "product-switch",
      icon: "grid",
    },
    // ...
  ].filter(Boolean) as ActionItem[];
}

// Compose in component
class ShellBarV2 {
  private updateBreakpoint() {
    const width = this.getBoundingClientRect().width;
    this.breakpointSize = calculateBreakpoint(width);
  }
  
  private updateActions() {
    this.actions = buildActions({
      showNotifications: this.showNotifications,
      notificationsCount: this.notificationsCount,
      // ...
    });
  }
}
```

**Benefits**:
- Less boilerplate
- Simpler to test
- Easy to compose
- Functional style

## Missing Optimizations

### 1. Memoization

**Problem**: Expensive calculations run on every render.

```typescript
// Current - recalculates every time
get overflowItems() {
  const result = [];
  this.hiddenActions.forEach(action => { /* ... */ });
  return result.sort((a, b) => a.order - b.order);
}
```

**Recommended**: Memoize expensive getters.

```typescript
import { memoize } from "@ui5/webcomponents-base/util/memoize.js";

private _overflowItemsCache?: { ids: string[], result: OverflowItem[] };

get overflowItems(): OverflowItem[] {
  // Only recalculate if hidden items changed
  const currentIds = this.hiddenItems.join(",");
  
  if (this._overflowItemsCache?.ids === currentIds) {
    return this._overflowItemsCache.result;
  }
  
  const result = this.calculateOverflowItems();
  this._overflowItemsCache = { ids: currentIds, result };
  return result;
}
```

### 2. Debouncing Resize

**Problem**: Resize handler fires many times per second.

```typescript
// Current - no debouncing
handleResize() {
  this.updateBreakpoint();
  this.updateOverflow();
}
```

**Recommended**: Debounce or use requestAnimationFrame.

```typescript
private resizeScheduled = false;

handleResize() {
  if (this.resizeScheduled) return;
  
  this.resizeScheduled = true;
  requestAnimationFrame(() => {
    this.updateBreakpoint();
    this.updateOverflow();
    this.resizeScheduled = false;
  });
}
```

### 3. Virtual Overflow List

**Problem**: If hundreds of items in overflow, DOM gets slow.

**Recommended**: Use virtual scrolling for overflow popover.

```typescript
// Use ui5-list with growing enabled
// Or implement virtual scrolling
<ui5-list mode="None" growing growing-button-text="More">
  {this.overflowItems.slice(0, this.visibleOverflowCount).map(item => (
    <ui5-li-standard>{item.text}</ui5-li-standard>
  ))}
</ui5-list>
```

## Priority Matrix

| Issue | Impact | Effort | Priority |
|-------|--------|--------|----------|
| Layout thrashing in overflow | High | High | P0 |
| Lambda coupling | High | Medium | P0 |
| Magic numbers | Medium | Low | P1 |
| Remove EventBus/DomAdapter | Low | Low | P1 |
| SearchSupport complexity | High | High | P1 |
| No error handling | Medium | Medium | P2 |
| No lazy initialization | Low | Low | P2 |
| State ownership unclear | Medium | Medium | P2 |
| Priority flip hack | Medium | Low | P2 |
| Circular references | Medium | Low | P3 |

## Recommended Implementation Plan

### Phase 1: Quick Wins (1-2 days)
1. Add constants for magic numbers
2. Remove EventBus and DomAdapter
3. Add basic error handling and logging
4. Add lazy initialization

**Impact**: Cleaner code, fewer files, better error messages.

### Phase 2: Decouple Modules (3-5 days)
1. Pass data instead of lambda closures
2. Define clear interfaces for all modules
3. Fix state ownership (component owns all state)
4. Fix priority flip hack

**Impact**: Better testability, clearer contracts.

### Phase 3: Performance (5-7 days)
1. Make overflow calculation pure
2. Batch DOM reads and writes
3. Add memoization for expensive getters
4. Add resize debouncing

**Impact**: Better performance, especially with many items.

### Phase 4: Refactor Complex Modules (3-5 days)
1. Split SearchSupport into focused modules
2. Extract coordination to controller
3. Add Strategy pattern for overflow

**Impact**: Better maintainability, easier to extend.

## Testing Recommendations

### Unit Tests
```typescript
// Test pure functions
describe("calculateOverflow", () => {
  it("hides items when container too small", () => {
    const items = [
      { id: "a", width: 100, priority: 1 },
      { id: "b", width: 100, priority: 2 },
    ];
    
    const result = calculateOverflow({ items, containerWidth: 150 });
    
    expect(result.hiddenIds).toEqual(["b"]);
    expect(result.visibleIds).toEqual(["a"]);
  });
});

// Test with dependency injection
describe("ShellBarV2", () => {
  it("updates breakpoint on resize", () => {
    const mockBreakpoint = { calculate: jest.fn(() => "M") };
    const shellbar = new ShellBarV2({ breakpoint: mockBreakpoint });
    
    shellbar.handleResize();
    
    expect(mockBreakpoint.calculate).toHaveBeenCalled();
    expect(shellbar.breakpointSize).toBe("M");
  });
});
```

### Integration Tests
```typescript
describe("ShellBarV2 overflow", () => {
  it("hides items when space limited", async () => {
    const shellbar = await fixture(html`
      <ui5-shellbar-v2>
        <ui5-shellbar-v2-item id="item1">Item 1</ui5-shellbar-v2-item>
        <ui5-shellbar-v2-item id="item2">Item 2</ui5-shellbar-v2-item>
      </ui5-shellbar-v2>
    `);
    
    // Resize to small width
    shellbar.style.width = "300px";
    await nextFrame();
    
    const item2 = shellbar.querySelector("#item2");
    expect(item2.inOverflow).toBe(true);
  });
});
```

### Performance Tests
```typescript
describe("ShellBarV2 performance", () => {
  it("handles resize with 50 items efficiently", async () => {
    const shellbar = createShellBarWithItems(50);
    
    const start = performance.now();
    shellbar.handleResize();
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(16); // 60fps = 16ms per frame
  });
});
```

## Conclusion

The ShellBarV2 architecture has good separation of concerns but suffers from:
- Over-engineering simple parts (EventBus, DomAdapter)
- Under-engineering complex parts (overflow algorithm, error handling)
- Tight coupling via closures
- Performance issues (layout thrashing)

Recommended actions:
1. **Remove unnecessary abstractions** (EventBus, DomAdapter)
2. **Fix overflow performance** (pure calculation + batch DOM)
3. **Decouple modules** (pass data, not closures)
4. **Add error handling** (fail fast in dev, graceful in prod)

These changes will make the code simpler, faster, and more maintainable.

