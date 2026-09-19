const patchOpenEnd = (target) => {
    const origOpenEnd = target.openEnd;
    target.openEnd = function openEnd() {
        if (this._mAttributes?.popover) {
            delete this._mAttributes.popover; // The "popover" attribute will be managed externally, don't let Patcher remove it
        }
        return origOpenEnd.apply(this);
    };
};
const patchPatcher = (Patcher) => {
    // Newer version: properties are on prototype
    if ("prototype" in Patcher && "openEnd" in Patcher.prototype) {
        patchOpenEnd(Patcher.prototype);
    }
    else if ("openEnd" in Patcher) {
        // Older version: properties are on constructor directly
        patchOpenEnd(Patcher);
    }
};
export default patchPatcher;
//# sourceMappingURL=patchPatcher.js.map