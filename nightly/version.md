commit b71d78bfdab8be68a3e5b8721feed6190b2b5af2
Author: Cahit Gürgüc <cahit.guerguec@sap.com>
Date:   Fri Sep 25 17:23:52 2026 +0200

    fix(ui5-table): focus first newly added row after growing (#14073)
    
    * fix(ui5-table): focus first newly added row after growing
    
    Rows can be appended asynchronously by the application handling the
    load-more event. The growing feature previously consumed its focus
    request on the render right after the button was pressed, before the
    async row was appended, so focus fell back to the growing button
    instead of the new row.
    
    Now the pending focus request is kept across re-renders until the newly
    added row actually exists in the DOM, so it works regardless of whether
    rows are appended synchronously or asynchronously.
    
    Fixes #14057
    
    * fix(ui5-table): focus row when growing feature removes itself after loading
    
    The growing feature could be removed from the DOM synchronously within the same `load-more` handler that appends the new rows (e.g. once there is no more data left to load). Since `onExitDOM` cleared the pending focus state before the next render could apply it, focus was lost to `<body>` instead of moving to the newly added row.
    
    The pending focus request is now resolved in `onExitDOM` as well, using the DOM state at the time of removal.
    
    * fix(ui5-table): rebuild keyboard navigation grid when row count changes
    
    The grid used for arrow-key navigation was only rebuilt when focus moved to a different item. If rows were added or removed (e.g. by the growing feature) while the user stayed on the same focused row, the grid kept its stale bounds, so navigating further was not possible into the newly added rows.
    
    The grid is now rebuilt whenever the row count changes, keeping the cost of unrelated keydowns unchanged.
