"use strict";import l from"./DragRegistry.js";function m(t,r,o,a,n={}){t.preventDefault();const e=l.getDraggedElement();if(!e&&n?.crossDnD)return;const i=n.originalEvent?{originalEvent:t}:{};r.fireDecoratorEvent("move",{...i,source:{element:e},destination:{element:o,placement:a}}),e?.focus()}export default m;
//# sourceMappingURL=handleDrop.js.map
