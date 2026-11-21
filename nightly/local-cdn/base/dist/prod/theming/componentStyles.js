"use strict";import S from"../generated/css/CommonStyles.css.js";const e=new Map;e.set("ui5-common-component-styles",S);let t;const n=()=>(t||(t=new CSSStyleSheet,t.replaceSync(Array.from(e.values()).join(`
`))),t),c=(o,s)=>{e.set(o,s);const r=Array.from(e.values()).join(`
`);n().replaceSync(r)};export{n as getComponentStyles,c as updateComponentStyles};
//# sourceMappingURL=componentStyles.js.map
