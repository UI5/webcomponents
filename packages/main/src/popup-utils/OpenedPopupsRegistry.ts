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

const _keydownListener = (event: KeyboardEvent) => {
	if (!OpenedPopupsRegistry.openedRegistry.length) {
		return;
	}

	if (isEscape(event) && !isEventMarked(event)) {
		const topmostPopup = OpenedPopupsRegistry.openedRegistry[OpenedPopupsRegistry.openedRegistry.length - 1].instance;

		if (openUI5Support && topmostPopup !== openUI5Support.getTopmostPopup()) {
			return;
		}

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

export { addOpenedPopup, removeOpenedPopup, getOpenedPopups };
