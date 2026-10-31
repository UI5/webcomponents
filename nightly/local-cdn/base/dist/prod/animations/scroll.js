"use strict";import u,{duration as n}from"./animate.js";const f=(r,c,a)=>{let o,l;return u({beforeStart:()=>{o=r.scrollLeft,l=r.scrollTop},duration:n(),element:r,advance:t=>{r.scrollLeft=o+t*c,r.scrollTop=l+t*a}})};export default f;
//# sourceMappingURL=scroll.js.map
