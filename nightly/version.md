commit cfa61558d6d2ca2290aa45dc79e59c75f4b8053b
Author: Nayden Naydenov <31909318+nnaydenow@users.noreply.github.com>
Date:   Thu May 21 14:27:38 2026 +0300

    fix(ui5-table-cell): truncate overflowing cell content (#13566)
    
    Wrap slot content in a block container with overflow hidden and constrain slotted elements to 100% width, so text truncation via ui5-text max-lines or CSS ellipsis works correctly within table cells.
    
    Fixes: https://github.com/UI5/webcomponents/issues/10721
