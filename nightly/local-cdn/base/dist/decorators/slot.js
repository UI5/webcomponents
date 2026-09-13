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
const slot = (slotData) => {
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
};
export default slot;
//# sourceMappingURL=slot.js.map