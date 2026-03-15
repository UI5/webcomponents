commit 8da1a641aa99b84e43c6447a423c42bfe11da63a
Author: ilhan007 <ilhan.myumyun@sap.com>
Date:   Fri Mar 13 21:51:21 2026 +0200

    fix: match both # and ## version headings in changelog extraction
    
    Lerna generates `## [x.y.z]` for patch releases but the regex only
    matched `# [x.y.z]`, causing empty release notes for hotfix releases.
