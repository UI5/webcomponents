commit b6c582c93e5a260044fefc1612c8f037744aca97
Author: Nayden Naydenov <31909318+nnaydenow@users.noreply.github.com>
Date:   Fri Jan 30 16:17:37 2026 +0200

    fix(framework): prevent redundant invalidations (#12994)
    
    The `onInvalidate` hook was triggered for slots without real changes due to a race condition in `_updateSlots`.
    
    This happened on Light DOM changes. The previous logic cached the current state, cleared the current state, processed the DOM, awaited upgrades, and then saved the new state. During this process, the state was temporarily empty, causing comparisons with the cached state to incorrectly detect changes.
    
    Slot state does not depend on child upgrades, so the flow was updated to save the new state **before** awaiting upgrades. The comparison only needs to confirm that element references remain the same.
    
    With this PR, state updates are extracted and made synchronous. This keeps the state in sync with the Light DOM even if another slot update is triggered, and ensures comparisons return correct results.
    
    As a result, `onInvalidate` is fired only when an actual slot change occurs and with accurate state data.
    
    Fixes: https://github.com/UI5/webcomponents/issues/10377
