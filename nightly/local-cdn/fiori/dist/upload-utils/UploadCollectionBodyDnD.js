/**
 * Handles drag and drop event listeners on document.body.
 * Ensures that there is only 1 listener per type attached (drag, drop, leave). Event listeners will only be attached when
 * there is at least 1 UploadCollection subscribed.
 */
import EventProvider from "@ui5/webcomponents-base/dist/EventProvider.js";
import UploadCollectionDnDOverlayMode from "../types/UploadCollectionDnDMode.js";
const draggingFiles = (event) => {
    return event.dataTransfer && Array.from(event.dataTransfer.types).includes("Files");
};
const eventProvider = new EventProvider();
const EVENT = "UploadCollectionBodyDndEvent";
let lastDragEnter = null;
let globalHandlersAttached = false;
const ondragenter = (event) => {
    if (!draggingFiles(event)) {
        return;
    }
    lastDragEnter = event.target;
    eventProvider.fireEvent(EVENT, { mode: UploadCollectionDnDOverlayMode.Drag });
};
const ondragleave = (event) => {
    if (lastDragEnter === event.target) {
        eventProvider.fireEvent(EVENT, { mode: UploadCollectionDnDOverlayMode.None });
    }
};
const ondrop = () => {
    eventProvider.fireEvent(EVENT, { mode: UploadCollectionDnDOverlayMode.None });
};
const ondragover = (event) => {
    event.preventDefault();
};
const attachGlobalHandlers = () => {
    document.body.addEventListener("dragenter", ondragenter);
    document.body.addEventListener("dragleave", ondragleave);
    document.body.addEventListener("drop", ondrop);
    document.body.addEventListener("dragover", ondragover);
};
const detachGlobalHandlers = () => {
    document.body.removeEventListener("dragenter", ondragenter);
    document.body.removeEventListener("dragleave", ondragleave);
    document.body.removeEventListener("drop", ondrop);
    document.body.removeEventListener("dragover", ondragover);
    globalHandlersAttached = false;
};
const attachBodyDnDHandler = (handler) => {
    eventProvider.attachEvent(EVENT, handler);
    if (!globalHandlersAttached) {
        attachGlobalHandlers();
        globalHandlersAttached = true;
    }
};
const detachBodyDnDHandler = (handler) => {
    eventProvider.detachEvent(EVENT, handler);
    if (!eventProvider.hasListeners(EVENT)) {
        detachGlobalHandlers();
    }
};
export { attachBodyDnDHandler, detachBodyDnDHandler, draggingFiles, };
//# sourceMappingURL=UploadCollectionBodyDnD.js.map