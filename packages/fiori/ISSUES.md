# Known Issues - DynamicPage

## 1. Snapped property not reflecting when changed programmatically

**Issue:** Changing the `snapped` property programmatically doesn't affect the header state.

**Expected:** Header should snap/unsnap when the property is updated via JavaScript.

**Current behavior:** Header state remains unchanged until user interaction (scroll) occurs.

**To reproduce:**
```javascript
const dynamicPage = document.querySelector('ui5-dynamic-page');
dynamicPage.snapped = true; // doesn't snap the header
```

**Status:** Needs investigation

**Potential cause:** Missing property change observer or lack of synchronization between property state and visual rendering.


