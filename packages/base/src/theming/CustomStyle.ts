import { reRenderAllUI5Elements } from "../Render.js";
import getSharedResource from "../getSharedResource.js";
import EventProvider from "../EventProvider.js";

type CustomCSSChangeCallback = (tag: string) => void;
type CustomCSSEntry = { id: string, css: string };

const getEventProvider = () => getSharedResource("CustomStyle.eventProvider", new EventProvider<string, void>());
const CUSTOM_CSS_CHANGE = "CustomCSSChange";

let currentId = 0;
const nextId = () => {
	currentId++;
	return `custom-css-${currentId}`;
};

const attachCustomCSSChange = (listener: CustomCSSChangeCallback) => {
	getEventProvider().attachEvent(CUSTOM_CSS_CHANGE, listener);
};

const detachCustomCSSChange = (listener: CustomCSSChangeCallback) => {
	getEventProvider().detachEvent(CUSTOM_CSS_CHANGE, listener);
};

const fireCustomCSSChange = (tag: string) => {
	return getEventProvider().fireEvent(CUSTOM_CSS_CHANGE, tag);
};

const getCustomCSSFor = () => getSharedResource<Record<string, Array<CustomCSSEntry>>>("CustomStyle.customCSSFor", {});

// Listen to the eventProvider, in case other copies of this CustomStyle module fire this
// event, and this copy would therefore need to reRender the ui5 webcomponents; but
// don't reRender if it was this copy that fired the event to begin with.
let skipRerender: boolean;
attachCustomCSSChange((tag: string) => {
	if (!skipRerender) {
		reRenderAllUI5Elements({ tag });
	}
});

const fireChangeAndRerender = (tag: string) => {
	skipRerender = true;
	try {
		// The event is fired and the attached event listeners are all called synchronously
		// The skipRerender flag will be used to avoid calling reRenderAllUI5Elements twice when it is this copy
		// of CustomStyle.js which is firing the `CustomCSSChange` event.
		fireCustomCSSChange(tag);
	} finally {
		skipRerender = false;
	}

	return reRenderAllUI5Elements({ tag });
};

const addCustomCSS = (tag: string, css: string): string => {
	const customCSSFor = getCustomCSSFor();
	if (!customCSSFor[tag]) {
		customCSSFor[tag] = [];
	}

	const id = nextId();
	customCSSFor[tag].push({ id, css });
	fireChangeAndRerender(tag);

	return id;
};

const removeCustomCSS = (tag: string, id: string) => {
	const customCSSFor = getCustomCSSFor();
	const entries = customCSSFor[tag];
	if (!entries) {
		return;
	}

	const index = entries.findIndex(entry => entry.id === id);
	if (index === -1) {
		return;
	}

	entries.splice(index, 1);
	fireChangeAndRerender(tag);
};

const getCustomCSS = (tag: string) => {
	const customCSSFor = getCustomCSSFor();
	return customCSSFor[tag] ? customCSSFor[tag].map(entry => entry.css).join("") : "";
};

export {
	addCustomCSS,
	removeCustomCSS,
	getCustomCSS,
	attachCustomCSSChange,
	detachCustomCSSChange,
};
