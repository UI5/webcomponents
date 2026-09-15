"use strict";const e=t=>{const p=t.openEnd;t.openEnd=function(){return this._mAttributes?.popover&&delete this._mAttributes.popover,p.apply(this)}},n=t=>{"prototype"in t&&"openEnd"in t.prototype?e(t.prototype):"openEnd"in t&&e(t)};export default n;
//# sourceMappingURL=patchPatcher.js.map
