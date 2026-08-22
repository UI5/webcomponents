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
function slot(slotData) {
    return (target, slotKey) => {
        const ctor = target.constructor;
        if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
            ctor.metadata = {};
        }
        const metadata = ctor.metadata;
        if (!metadata.slots) {
            metadata.slots = {};
        }
        const slotMetadata = metadata.slots;
        if (slotData && slotData.default && slotMetadata.default) {
            throw new Error("Only one slot can be the default slot.");
        }
        const key = slotData && slotData.default ? "default" : slotKey;
        slotData = slotData || { type: HTMLElement };
        if (!slotData.type) {
            slotData.type = HTMLElement;
        }
        if (!slotMetadata[key]) {
            slotMetadata[key] = slotData;
        }
        if (slotData.default) {
            delete slotMetadata.default.default;
            slotMetadata.default.propertyName = slotKey;
        }
        ctor.metadata.managedSlots = true;
    };
}
export default slot;
//# sourceMappingURL=slot-strict.js.map