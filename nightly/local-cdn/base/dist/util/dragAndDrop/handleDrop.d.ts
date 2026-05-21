import type UI5Element from "../../UI5Element.js";
import type MovePlacement from "../../types/MovePlacement.js";
import type { DragAndDropSettings } from "./DragRegistry.js";
declare function handleDrop<T extends UI5Element>(e: DragEvent, component: T, target: HTMLElement, placement: `${MovePlacement}`, settings?: DragAndDropSettings): void;
export default handleDrop;
