import getSharedResource from "@ui5/webcomponents-base/dist/getSharedResource.js";
import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import isEventMarked from "@ui5/webcomponents-base/dist/util/isEventMarked.js";
import type OpenUI5Support from "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
import type Popup from "../Popup.js";
import type { PopupInfo } from "@ui5/webcomponents-base/dist/features/patchPopup.js";

type RegisteredPopup = {
	instance: Popup;
	parentPopovers: Array<Popup>;
}

const OpenedPopupsRegistry = getSharedResource<{ openedRegistry: Array<RegisteredPopup> }>("OpenedPopupsRegistry", { openedRegistry: [] });
const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");

function registerPopupWithOpenUI5Support(popupInfo: PopupInfo) {
	openUI5Support?.addOpenedPopup(popupInfo);
}

function unregisterPopupWithOpenUI5Support(popup: object) {
	openUI5Support?.removeOpenedPopup(popup);
}

const addOpenedPopup = (instance: Popup, parentPopovers: Array<Popup> = []) => {
	if (!OpenedPopupsRegistry.openedRegistry.some(popup => popup.instance === instance)) {
		OpenedPopupsRegistry.openedRegistry.push({
			instance,
			parentPopovers,
		});

		registerPopupWithOpenUI5Support({
			type: "WebComponent",
			instance,
		});
	}

	_updateTopModalPopup();

	if (OpenedPopupsRegistry.openedRegistry.length === 1) {
		attachGlobalListener();
	}
};

const removeOpenedPopup = (instance: Popup) => {
	OpenedPopupsRegistry.openedRegistry = OpenedPopupsRegistry.openedRegistry.filter(el => {
		return el.instance !== instance;
	});

	unregisterPopupWithOpenUI5Support(instance);

	_updateTopModalPopup();

	if (!OpenedPopupsRegistry.openedRegistry.length) {
		detachGlobalListener();
	}
};

const getOpenedPopups = () => {
	return [...OpenedPopupsRegistry.openedRegistry];
};

// True while the registry has just consumed an Escape key press by closing a
// non-native popup. A native <dialog> layered beneath that popup will still
// receive its own "cancel" event as the key press's default action (the
// document keydown listener below runs first, before that default action), so
// its Dialog._onCancel consults this flag to avoid also closing the dialog.
let escapeHandledByRegistry = false;

const wasEscapeHandledByRegistry = () => escapeHandledByRegistry;

const resetEscapeHandledByRegistry = () => {
	escapeHandledByRegistry = false;
};

const _keydownListener = (event: KeyboardEvent) => {
	if (!OpenedPopupsRegistry.openedRegistry.length) {
		return;
	}

	if (isEscape(event) && !isEventMarked(event)) {
		// Start each Escape clean; only set below when we actually consume it.
		escapeHandledByRegistry = false;

		const topmostPopup = OpenedPopupsRegistry.openedRegistry[OpenedPopupsRegistry.openedRegistry.length - 1].instance;

		if (openUI5Support && topmostPopup !== openUI5Support.getTopmostPopup()) {
			// An OpenUI5 popup sits above the WebC stack and owns this Escape;
			// a native dialog beneath it must not close.
			escapeHandledByRegistry = true;
			return;
		}

		// Native <dialog> popups handle Escape via their own "cancel" event.
		if (topmostPopup._useNativeDialog) {
			return;
		}

		// A non-native popup is topmost: close it here. If a native <dialog> is
		// open beneath it, record that this Escape is spoken for so the dialog's
		// "cancel" handler does not close the dialog too.
		escapeHandledByRegistry = true;
		event.stopImmediatePropagation();
		topmostPopup.closePopup(true);
	}
};

const attachGlobalListener = () => {
	document.addEventListener("keydown", _keydownListener);
};

const detachGlobalListener = () => {
	document.removeEventListener("keydown", _keydownListener);
};

const _updateTopModalPopup = () => {
	let popup;
	let hasModal = false;

	for (let i = OpenedPopupsRegistry.openedRegistry.length - 1; i >= 0; i--) {
		popup = OpenedPopupsRegistry.openedRegistry[i].instance;

		if (!hasModal && popup.isModal) {
			popup.isTopModalPopup = true;
			hasModal = true;
		} else {
			popup.isTopModalPopup = false;
		}
	}
};

export {
	addOpenedPopup,
	removeOpenedPopup,
	getOpenedPopups,
	wasEscapeHandledByRegistry,
	resetEscapeHandledByRegistry,
};
