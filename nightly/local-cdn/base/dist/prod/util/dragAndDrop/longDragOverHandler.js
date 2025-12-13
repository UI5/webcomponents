"use strict";let a=null,l=Date.now();const s=300,D=g=>(u,i,e)=>{const o=e.value;return e.value=function(t){let n=!1;if(t.target instanceof HTMLElement){const r=t.target.closest(g);r===a&&Date.now()-l>=s?n=!0:r!==a&&(a=r,l=Date.now())}o.apply(this,[t,n])},e};export default D;
//# sourceMappingURL=longDragOverHandler.js.map
