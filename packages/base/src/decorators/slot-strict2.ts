import type UI5Element from "../UI5Element.js";
import type { Slot } from "../UI5ElementMetadata.js";

type HasSlotDetails = { slotDetails: Record<string, unknown> };

// Helper type that produces a clear error message
type ValidateSlotKey<T extends HasSlotDetails, K extends PropertyKey> =
    K extends keyof T["slotDetails"]
        ? K
        : `Error: Slot "${K & string}" is not declared in slotDetails. Add it to slotDetails!: { ${K & string}: YourType }`;


// Overload: slot key must exist in slotDetails with clear error
function slot<
    T extends HasSlotDetails,
    K extends PropertyKey
>(slotData?: Slot): (
    target: T,
    key: ValidateSlotKey<T, K>
) => void;

// Implementation
function slot(slotData?: Slot) {
    return <K extends PropertyKey>(
        target: HasSlotDetails,
        slotKey: K
    ) => {
        const ctor = (target as any).constructor as typeof UI5Element;

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

        const key = slotData && slotData.default ? "default" : (slotKey as string);
        slotData = slotData || { type: HTMLElement };

        if (!slotData.type) {
            slotData.type = HTMLElement;
        }

        if (!slotMetadata[key]) {
            slotMetadata[key] = slotData;
        }

        if (slotData.default) {
            delete slotMetadata.default.default;
            slotMetadata.default.propertyName = slotKey as string;
        }

        ctor.metadata.managedSlots = true;
    };
}

export default slot;