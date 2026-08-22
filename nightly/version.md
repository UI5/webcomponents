commit 9faf49ddecb8b2204748eb1169c407449ef4519a
Author: Nikolay Hristov <n.hristov@sap.com>
Date:   Fri Aug 21 16:03:46 2026 +0300

    fix(ui5-link): adjust focus outline in HC themes (#13968)
    
    Until now, the outline of the border of focused `ui5-link` was -1px in High Contrast themes (Fiori 3 and Horizon) which caused focus border to go over the `ui5-link` text.
    
    This PR adjusts the offset to 0 and the border doesn't overlap the `ui5-link` text.
    
    <img width="310" height="87" alt="linkHC" src="https://github.com/user-attachments/assets/ff082895-19d8-48de-89d8-cf52fb678738" />
