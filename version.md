commit 98642857668624b5184ff6e725e0e7f7c47c3934
Author: Copilot <198982749+Copilot@users.noreply.github.com>
Date:   Thu Sep 11 16:48:17 2025 +0300

    fix(ui5-segmented-button): correct aria-multiselectable and aria-orientation="horizontal" (#12270)
    
    Fixes SegmentedButton ARIA attributes for accessibility compliance
    - Add conditional aria-multiselectable based on selection mode
    - Add aria-orientation="horizontal" attribute
    
    Fixes: #12263
