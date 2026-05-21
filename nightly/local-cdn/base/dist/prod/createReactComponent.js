"use strict";import{createElement as d}from"react";export default function p(i){const s=i.getMetadata().getTag();return function(r){const n={};return Object.entries(r).forEach(([t,e])=>{if(t.startsWith("on")&&typeof e=="function"){const c=e;n[t]=o=>{const a=o.nativeEvent?.detail;a!==void 0&&(o.detail=a),c(o)}}else n[t]=e}),d(s,n)}}
//# sourceMappingURL=createReactComponent.js.map
