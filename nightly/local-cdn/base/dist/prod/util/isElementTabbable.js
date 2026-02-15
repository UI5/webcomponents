"use strict";import a from"./isElementHidden.js";const r=e=>{if(!e||e.hasAttribute("data-sap-no-tab-ref")||a(e))return!1;const t=e.getAttribute("tabindex");if(t!=null)return parseInt(t)>=0;const n=e.nodeName.toLowerCase();return n==="a"||/^(input|select|textarea|button|object)$/.test(n)?!e.disabled:!1};export default r;
//# sourceMappingURL=isElementTabbable.js.map
