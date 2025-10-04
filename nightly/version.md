commit 485aab51242876f2a10580da2ed23783408df00b
Author: Nikola Anachkov <87311182+NakataCode@users.noreply.github.com>
Date:   Fri Oct 3 17:13:07 2025 +0300

    fix(ui5-list-item): change highlight state color variables (#12427)
    
    Change highlight background colors to use border color variables instead of text color variables to align with the design spec.
    
    Negative: sapNegativeTextColor → sapErrorBorderColor
    Critical: sapCriticalTextColor → sapWarningBorderColor
    Positive: sapPositiveTextColor → sapSuccessBorderColor
    Information: sapInformativeTextColor → sapInformationBorderColor
    
    Fixes: #12332
