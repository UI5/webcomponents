commit 17a64e456dbac018f53bd8d661d05d495ac36b3c
Author: Cahit Gürgüc <cahit.guerguec@sap.com>
Date:   Fri Aug 7 15:57:21 2026 +0300

    fix(ui5-table): set "More actions" tooltip on row action overflow button (#13895)
    
    The overflow button in the row actions cell was icon-only and fell back
    to the overflow icon's "More" title, which is confusing when it is the
    only button in the actions cell. It now uses a dedicated tooltip via the
    new TABLE_ROW_OVERFLOW_BUTTON i18n key.
    
    Fixes: #13839
