"use strict";function n(e,o){let t=null,l=null;return function(...u){if(l){t=u;return}e(...u),l=setTimeout(()=>{t&&(e(...t),t=null),l=null},o)}}export default n;
//# sourceMappingURL=throttle.js.map
