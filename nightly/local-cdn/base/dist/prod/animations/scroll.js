"use strict";import u,{duration as f}from"./animate.js";const n=(r,c,a)=>{let o,l;return u({beforeStart:()=>{o=r.scrollLeft,l=r.scrollTop},duration:f,element:r,advance:t=>{r.scrollLeft=o+t*c,r.scrollTop=l+t*a}})};export default n;
//# sourceMappingURL=scroll.js.map
