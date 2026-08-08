"use strict";import r from"./theming/getConstructableStyle.js";import{getComponentStyles as n}from"./theming/componentStyles.js";const s=o=>{const e=o.constructor,t=o.shadowRoot;if(!t){console.warn("There is no shadow root to update");return}t.adoptedStyleSheets=[n(),...r(e)],e.renderer(o,t)};export default s;
//# sourceMappingURL=updateShadowRoot.js.map
