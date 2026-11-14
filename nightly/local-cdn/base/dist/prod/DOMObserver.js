"use strict";const t=new WeakMap,n=(e,o,r)=>{const s=new MutationObserver(o);t.set(e,s),s.observe(e,r)},b=e=>{const o=t.get(e);o&&(o.disconnect(),t.delete(e))};export{n as observeDOMNode,b as unobserveDOMNode};
//# sourceMappingURL=DOMObserver.js.map
