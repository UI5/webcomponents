commit f350e53f1871a24aee242ff88e5f60c94cb075c9
Author: Nayden Naydenov <31909318+nnaydenow@users.noreply.github.com>
Date:   Mon Sep 14 16:29:19 2026 +0300

    fix(framework): cache base theme to avoid repeated getComputedStyle calls (#14051)
    
    isLegacyThemeFamily() was calling getThemeDesignerTheme() on every invocation, which reads getComputedStyle() each time and forces a synchronous style recalculation. Under a custom theme with thousands of icon renders, this produced a storm of forced full-document recalcs — measured at ~27s of main-thread block.
    
    applyTheme() already calls getThemeDesignerTheme() once and stores the result via setBaseTheme(). Switch isLegacyThemeFamily() to read the cached getBaseTheme() instead of hitting the DOM on every call.
