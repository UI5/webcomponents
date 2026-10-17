import type { Slot } from "../UI5ElementMetadata.js";
/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @deprecated since 2.19.0, please use the `@ui5/webcomponents-base/dist/decorators/slot-strict.js` decorator instead.
 * For Example:
 * ```ts
 * // If you previously used the `slot` decorator:
 * import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
 *
 * // Now use `slot-strict` decorator + `DefaultSlot` and `Slot` types for slot members:
 * import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
 * import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
 *
 * class MyComponent extends UI5Element {
 * @slot()
 * header!: Slot<T> // Array<T> -> Slot<T>
 *
 * @slot({ type: HTMLElement, default: true })
 * items!: DefaultSlot<T>; // Array<T> -> DefaultSlot<T>
 * }
 * ```
 * @returns { PropertyDecorator }
 */
declare const slot: (slotData?: Slot) => PropertyDecorator;
export default slot;
