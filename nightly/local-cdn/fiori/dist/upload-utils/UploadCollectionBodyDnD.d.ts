/**
 * Handles drag and drop event listeners on document.body.
 * Ensures that there is only 1 listener per type attached (drag, drop, leave). Event listeners will only be attached when
 * there is at least 1 UploadCollection subscribed.
 */
import UploadCollectionDnDOverlayMode from "../types/UploadCollectionDnDMode.js";
type DnDEventListener = (param: DnDEventListenerParam) => void;
type DnDEventListenerParam = {
    mode: UploadCollectionDnDOverlayMode;
};
declare const draggingFiles: (event: DragEvent) => boolean | null;
declare const attachBodyDnDHandler: (handler: DnDEventListener) => void;
declare const detachBodyDnDHandler: (handler: DnDEventListener) => void;
export { attachBodyDnDHandler, detachBodyDnDHandler, draggingFiles, };
export type { DnDEventListener, DnDEventListenerParam, };
