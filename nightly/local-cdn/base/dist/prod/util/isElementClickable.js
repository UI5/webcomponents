"use strict";const n=/^(?:a|area)$/i,a=/^(?:input|select|textarea|button)$/i,r=e=>{if(e.disabled)return!1;const t=e.getAttribute("tabindex");return t!=null?parseInt(t)>=0:a.test(e.nodeName)||n.test(e.nodeName)&&!!e.href};export default r;
//# sourceMappingURL=isElementClickable.js.map
