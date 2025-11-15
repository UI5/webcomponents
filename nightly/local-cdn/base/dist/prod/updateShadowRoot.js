"use strict";import r from"./theming/getConstructableStyle.js";const s=o=>{const e=o.constructor,t=o.shadowRoot;if(!t){console.warn("There is no shadow root to update");return}t.adoptedStyleSheets=r(e),e.renderer(o,t)};export default s;
//# sourceMappingURL=updateShadowRoot.js.map
