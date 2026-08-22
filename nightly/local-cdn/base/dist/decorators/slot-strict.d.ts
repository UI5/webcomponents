import type { Slot, DefaultSlot } from "../UI5Element.js";
import type { Slot as SlotMetadata } from "../UI5ElementMetadata.js";
/**
 * Decorator for declaring a slot in a UI5 Web Component.
 * It adds the slot metadata to the component's constructor.
 *
 * @public
 * @since 2.19.0
 * @param { SlotMetadata } slotData - Optional metadata for the slot, including type and default flag.
 *
 * Example usage:
 * ```ts
 * import slot from "@ui5/webcomponents-base/dist/decorators/slot-strict.js";
 * import type { DefaultSlot, Slot } from "@ui5/webcomponents-base/dist/UI5Element.js";
 *
 * class MyComponent extends UI5Element {
 *
 * @slot()
 * header!: Slot<HTMLElement>;
 *
 * @slot({ type: HTMLElement, default: true })
 * items!: DefaultSlot<HTMLElement>;
 * }
 * ```
 */
declare function slot<T extends Record<K, Slot<unknown> | DefaultSlot<unknown>>, K extends string>(slotData?: SlotMetadata): (target: T, prop: K) => void;
export default slot;
