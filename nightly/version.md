commit 6c25f72cb9331e387ead2204f51a7ff4feb0b6c8
Author: Nikola Anachkov <87311182+NakataCode@users.noreply.github.com>
Date:   Fri Nov 6 17:13:43 2026 +0200

    fix(ui5-option): wrap long option text instead of overflowing (#14264)
    
    Long option text was clipped and overlapped adjacent options because the host had a fixed height and the content was set to overflow: hidden.
    
    The host now uses min-height instead of a fixed height so rows grow with their content, and its content wraps (white-space: normal, overflow: visible) rather than being clipped. The host is made a flex container so the inner row stretches to fill it — its height: 100% otherwise collapses against the auto-height host and misplaces the focus outline. A small padding-block keeps short single-line options at their standard height.
