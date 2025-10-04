import type { Slot } from "../UI5ElementMetadata.js";
/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
declare const slot: (slotData?: Slot) => PropertyDecorator;
export default slot;
