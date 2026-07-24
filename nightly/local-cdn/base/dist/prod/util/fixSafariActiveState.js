"use strict";import{isIOS as e,isSafari as a}from"../Device.js";let t=!1;const i=()=>{a()&&e()&&!t&&(document.body.addEventListener("touchstart",()=>{}),t=!0)};export default i;
//# sourceMappingURL=fixSafariActiveState.js.map
