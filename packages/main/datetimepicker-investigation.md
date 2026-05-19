# DateTimePicker Investigation: Value Revert on Manual Edit

## TL;DR — Is This a Bug or Misusage?

**It's primarily a misusage, but with a subtle trap in the API.**

The reporter's issue has **two root causes**:

1. **The `'Z'` in `valueFormat` is a literal, not a timezone indicator** — this means dates get parsed in local time, not UTC, causing a time offset that makes values appear "wrong" after round-tripping.
2. **React state updates trigger re-render, which triggers `onBeforeRendering` normalization** — when the parent component re-renders (e.g., after the Select changes), the DateTimePicker's `value` prop is re-set from React state, which triggers `onBeforeRendering()` → `normalizeFormattedValue()`, overwriting whatever the user was typing.

---

## The Reporter's Setup

```jsx
<DateTimePicker
  value={expiration}                              // React state
  onChange={handleDateChange}                     // Updates React state
  displayFormat="dd MMM yyyy, HH:mm:ss 'UTC'"    // What user sees
  valueFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"         // How value is stored
  readonly={expirationMode !== "Specific date"}   // Readonly until manual mode
/>
```

---

## Issue 1: `'Z'` Is Treated as a Literal Character, Not UTC

### The Pattern
The reporter uses: `valueFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"`

In LDML/CLDR pattern syntax, text inside single quotes is **literal**. So `'Z'` means "output the letter Z" — it does NOT mean "this is a UTC timestamp."

### What Happens Internally
1. `"2025-05-19T12:00:00Z"` is parsed by the DateFormat engine
2. The `T` matches the literal `'T'`, the `Z` matches the literal `'Z'`
3. Since no timezone pattern symbol (`X`, `Z`, `z`, `V`) is present, `tzDiff` remains undefined
4. The engine interprets the time as **local time**, not UTC
5. On re-formatting, it outputs the same string, but the underlying Date object is offset

### Impact
When the component round-trips the value (parse → Date → format), the time may shift by the user's timezone offset. For a user in UTC+2, "12:00:00" becomes "14:00:00" (or vice versa), making it look like the value changed after round-tripping.

### Fix for the Reporter
If they want true UTC handling, they should use **`X`** instead of `'Z'`:
```
valueFormat="yyyy-MM-dd'T'HH:mm:ssX"
```
The `X` pattern outputs `Z` for UTC and `+0200` for other offsets, and **parses `Z` as UTC+0**.

---

## Issue 2: React Re-Render Triggers Value Normalization

### The Mechanism

The DatePicker has this in `onBeforeRendering()` (called before every render):

```typescript
onBeforeRendering() {
    if (!this.isLiveUpdate) {
        this.value = this.normalizeFormattedValue(this.value) || this.value;
    }
    this.liveValue = this.value;
}
```

### The `isLiveUpdate` Protection

During live typing:
- `_onInputInput()` calls `_updateValueAndFireEvents(value, false, ["input"], false)`
- `updateValue = false` → sets `isLiveUpdate = true`
- `onBeforeRendering` sees `isLiveUpdate = true` → **skips normalization**
- `displayValue` getter returns `liveValue` (raw user input) — user sees what they type

This works correctly **within the web component's own lifecycle**.

### The Problem with React Controlled Components

Here's where it breaks:

1. User selects "7 days" from Select → React state `expiration` = `"2025-05-26T12:00:00Z"`
2. React passes `value="2025-05-26T12:00:00Z"` to `<DateTimePicker>`
3. DateTimePicker's `value` property is set → triggers `onBeforeRendering`
4. `isLiveUpdate` is `false` at this point → value gets normalized
5. User switches to "Specific date" and starts typing
6. **Here's the trap**: If `handleDateChange` fires (the `onChange`) and calls `setExpiration(event.target.value)`, React re-renders, setting `value={expiration}` again
7. The re-render from React resets the property, which fires `onBeforeRendering` again
8. If the user's partially-typed value doesn't parse cleanly via valueFormat, the normalization either returns `""` (failed parse) or reformats it differently

### The Core Issue

When using React (or any framework) with **controlled component pattern** (`value={state}`), every re-render **resets the web component's value property from the framework state**. This conflicts with the web component's internal `isLiveUpdate` / `liveValue` mechanism which assumes **it** owns the value during typing.

The web component's input handling works like this:
- User types → `_onInputInput` → sets `isLiveUpdate = true`, stores `liveValue`
- **But** if React re-renders between keystrokes, it sets `this.value = expiration` (from React state)
- This triggers `onBeforeRendering`, and since `isLiveUpdate` may have been reset by the property change, normalization kicks in

---

## Issue 3: `_checkValueValidity` Validates Against `valueFormat`

In `_updateValueAndFireEvents`:
```typescript
const valid = this._checkValueValidity(value);  // Uses valueFormat!
```

But the user types in **display format** (`"dd MMM yyyy, HH:mm:ss 'UTC'"`). The validity check uses `isValidValue()` which parses against `getValueFormat()`. So:
- User types `"19 May 2025, 14:30:00 UTC"` (display format)
- `_checkValueValidity` tries to parse this against `"yyyy-MM-dd'T'HH:mm:ss'Z'"` (value format)
- **Parse fails** → `valid = false`

When `valid = false` AND `normalizeValue = false` (input event) AND `isLiveUpdate = true`:
- The condition `(valid && normalizeValue) || !this.isLiveUpdate` is `(false && false) || false` = `false`
- So the display value passes through unchanged — **this is actually fine during typing**

When `valid = false` AND `normalizeValue = true` (change event, blur/Enter) AND `isLiveUpdate = false`:
- The condition is `(false && true) || !false` = `true`
- So it tries `getDisplayValueFromValue(value)` on the user's display-format string
- `getDisplayValueFromValue` first tries `getValueFormat().parse(value)` — this fails (it's display format, not value format)
- When parse fails, it returns the value **unchanged**
- Then `normalizeDisplayValue(value)` is called — this parses with displayFormat and reformats → works correctly

**So the validation path for direct user input is actually correct** — the problem is only when React resets the value.

---

## Summary of Root Causes

| # | Issue | Type | Severity |
|---|-------|------|----------|
| 1 | `'Z'` in valueFormat is literal, not UTC | Misusage | High — causes time offset |
| 2 | React controlled pattern conflicts with `onBeforeRendering` normalization | Framework interaction | High — causes input revert |
| 3 | `_checkValueValidity` uses valueFormat for display input | Minor design quirk | Low — doesn't cause the reported issue directly |

---

## Recommendations for the Reporter

### Fix 1: Use `X` Instead of `'Z'` for UTC

```jsx
valueFormat="yyyy-MM-dd'T'HH:mm:ssX"
```

This makes the `Z` in `"2025-05-19T12:00:00Z"` semantically meaningful (UTC timezone indicator).

### Fix 2: Don't Use Controlled Pattern During Editing

Instead of always passing `value={expiration}`, only set it programmatically:

```jsx
<DateTimePicker
  value={expirationMode !== "Specific date" ? expiration : undefined}
  onChange={handleDateChange}
  // ...
/>
```

Or use a ref-based approach to set the value only when the mode changes:

```jsx
const datePickerRef = useRef(null);

useEffect(() => {
  if (expirationMode !== "Specific date" && datePickerRef.current) {
    datePickerRef.current.value = expiration;
  }
}, [expiration, expirationMode]);
```

### Fix 3: Use `onInput` Instead of `onChange` for Live Updates

The `onChange` fires on blur/Enter. If they need live tracking, use the `input` event. But more importantly, avoid React re-rendering the DateTimePicker while the user is typing.

### Fix 4 (Simplest): Remove valueFormat, Use ISO Directly

If they don't need the custom valueFormat:
```jsx
<DateTimePicker
  displayFormat="dd MMM yyyy, HH:mm:ss 'UTC'"
  // Let valueFormat default to the internal ISO format
/>
```

Then convert between their moment ISO format and the component's internal format in the event handler.

---

## Is There a Component Bug?

**Arguably yes, but it's a known limitation of web components + React controlled patterns:**

The `onBeforeRendering` normalization doesn't account for the case where a framework externally sets `value` while the user is actively editing. The `isLiveUpdate` flag is an internal mechanism that gets bypassed when the property is set from outside.

This is a **general web-component-in-React problem**, not specific to DateTimePicker. The React wrapper could potentially debounce property updates or skip setting `value` when the input is focused, but that's a `@ui5/webcomponents-react` concern, not a `@ui5/webcomponents` bug.

---

## Files Examined

- `packages/main/src/DateTimePicker.ts` — lines 246-253 (`_formatPattern`), 468-523 (format methods)
- `packages/main/src/DatePicker.ts` — lines 474-487 (`onBeforeRendering`), 582-615 (`_updateValueAndFireEvents`), 630-644 (format conversion), 668-670 (`_onInputInput`), 821-843 (normalization), 875-889 (`displayValue`)
- `packages/main/src/DateComponentBase.ts` — lines 56-80 (properties), 157-171 (format getters), 240-304 (format instances)
- `packages/localization/dist/sap/ui/core/format/DateFormat.js` — pattern parsing, `X` vs `'Z'` symbol handling
