type OpenUI5Popup = {
	setInitialZIndex: (zIndex: number) => void,
	getNextZIndex: () => number,
	prototype: {
		onFocusEvent: (e: FocusEvent) => void,
	}
};

const patchFocusEvent = (Popup: OpenUI5Popup) => {
	const origFocusEvent = Popup.prototype.onFocusEvent;
	Popup.prototype.onFocusEvent = function onFocusEvent(e: FocusEvent, ...rest) {
		const isTypeFocus = e.type === "focus" || e.type === "activate";
		const target = e.target as HTMLElement;
		if (!isTypeFocus || !target?.closest?.("[ui5-popover],[ui5-responsive-popover],[ui5-dialog]")) {
			origFocusEvent.call(this, e, ...rest);
		}
	};
};

const patchPopup = (Popup: OpenUI5Popup) => {
	patchFocusEvent(Popup);// Popup.prototype.onFocusEvent
};

export default patchPopup;
export type { OpenUI5Popup };
