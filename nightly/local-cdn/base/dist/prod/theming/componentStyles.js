"use strict";const t=new Map;let e;const n=()=>(e||(e=new CSSStyleSheet),e),r=(o,s)=>{t.set(o,s);const S=Array.from(t.values()).join(`
`);n().replaceSync(S)};export{n as getComponentStyles,r as updateComponentStyles};
//# sourceMappingURL=componentStyles.js.map
