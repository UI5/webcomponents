import type UI5Element from "../../UI5Element.js";
import DragRegistry from "./DragRegistry.js";

let globalHandlersAttached = false;
const subscribers = new Set<UI5Element>();

const ondragstart = (e: DragEvent) => {
	if (!e.dataTransfer) {
		return;
	}

	const draggedElement = e.composedPath().find(el => (el as any).movable) as HTMLElement;

	if (!subscribers.has(draggedElement.parentElement as UI5Element)) {
		return;
	}

	DragRegistry.setDraggedElement(draggedElement);
};

const ondragend = () => {
	DragRegistry.clearDraggedElement();
};

const attachGlobalHandlers = () => {
	if (globalHandlersAttached) {
		return;
	}

	document.body.addEventListener("dragstart", ondragstart);
	document.body.addEventListener("dragend", ondragend);
	globalHandlersAttached = true;
};

const detachGlobalHandlers = () => {
	document.body.removeEventListener("dragstart", ondragstart);
	document.body.removeEventListener("dragend", ondragend);
	globalHandlersAttached = false;
};

const subscribe = (subscriber: UI5Element) => {
	subscribers.add(subscriber);

	if (!globalHandlersAttached) {
		attachGlobalHandlers();
	}
};

const unsubscribe = (subscriber: UI5Element) => {
	subscribers.delete(subscriber);

	if (subscribers.size === 0 && globalHandlersAttached) {
		detachGlobalHandlers();
	}
};

const GlobalDragDropManager = {
	subscribe,
	unsubscribe,
};

export default GlobalDragDropManager;
