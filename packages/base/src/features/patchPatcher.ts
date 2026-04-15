type PatcherTarget = {
	_mAttributes: { [key: string]: string },
	openEnd: () => OpenUI5Patcher,
};

type OpenUI5Patcher = { prototype: PatcherTarget } // newer versions (on prototype)
	| PatcherTarget; // older versions (on constructor directly)

const patchOpenEnd = (target: PatcherTarget) => {
	const origOpenEnd = target.openEnd;
	target.openEnd = function openEnd() {
		if (this._mAttributes?.popover) {
			delete this._mAttributes.popover; // The "popover" attribute will be managed externally, don't let Patcher remove it
		}
		return origOpenEnd.apply(this);
	};
};

const patchPatcher = (Patcher: OpenUI5Patcher) => {
	// Newer version: properties are on prototype
	if ("prototype" in Patcher && "openEnd" in Patcher.prototype) {
		patchOpenEnd(Patcher.prototype);
	} else if ("openEnd" in Patcher) {
		// Older version: properties are on constructor directly
		patchOpenEnd(Patcher);
	}
};

export default patchPatcher;
export type { OpenUI5Patcher };
