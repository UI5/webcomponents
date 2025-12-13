const patchPatcher = (Patcher) => {
    const origOpenEnd = Patcher.prototype.openEnd;
    Patcher.prototype.openEnd = function openEnd() {
        if (this._mAttributes.popover) {
            delete this._mAttributes.popover; // The "popover" attribute will be managed externally, don't let Patcher remove it
        }
        return origOpenEnd.apply(this);
    };
};
export default patchPatcher;
//# sourceMappingURL=patchPatcher.js.map