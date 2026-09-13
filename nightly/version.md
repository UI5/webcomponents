commit a042bc832401fab01d7959cbacdf842616a01241
Author: Konstantin Gogov <konstantin.gogov@sap.com>
Date:   Fri Sep 11 18:21:17 2026 +0300

    fix(ui5-shellbar): update Joule assistant button icon in website samples (#14038)
    
    Updated all affected website samples (HTML + React variants):
    - Import da-2 icon alongside da
    - Add click handler that swaps icon between da and da-2 on toggle
    - Add unique IDs to toggle buttons in multi-instance samples
    
    Fixes #14021
