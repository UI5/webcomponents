commit 878d8a39b5c6a5cf0ce9a5b3363655e68c7ecd3e
Author: Nikola Anachkov <87311182+NakataCode@users.noreply.github.com>
Date:   Fri Dec 12 12:53:38 2025 +0200

    fix(ui5-breadcrumbs): remove role='link' from current page element (#12797)
    
    Problem:
    The current page element was incorrectly set as a link despite being non-interactive.
    
    Solution:
    Removed the role="link" attribute from the current page element while preserving aria-current="page" to properly indicate the user's current location without suggesting it's an interactive link
    
    Fixes: #12780
