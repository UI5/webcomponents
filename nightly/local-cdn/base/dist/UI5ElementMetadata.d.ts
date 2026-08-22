import type UI5Element from "./UI5Element.js";
type SlotInvalidation = {
    properties: boolean | Array<string>;
    slots: boolean | Array<string>;
};
type Slot = {
    type: typeof Node | typeof HTMLElement;
    default?: boolean;
    propertyName?: string;
    individualSlots?: boolean;
    invalidateOnChildChange?: boolean | SlotInvalidation;
};
type SlotValue = Node;
type Property = {
    type?: BooleanConstructor | StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor;
    noAttribute?: boolean;
    converter?: {
        fromAttribute(value: string | null, type: unknown): PropertyValue;
        toAttribute(value: unknown, type: unknown): string | null;
    };
};
type PropertyValue = boolean | number | string | object | undefined | null;
type EventData = Record<string, {
    detail?: Record<string, object>;
    cancelable?: boolean;
    bubbles?: boolean;
}>;
type I18nBundleAccessorValue = {
    bundleName: string;
    target: typeof UI5Element;
};
type I18nBundleAccessors = Record<string, I18nBundleAccessorValue>;
type Metadata = {
    tag?: string;
    managedSlots?: boolean;
    properties?: Record<string, Property>;
    slots?: Record<string, Slot>;
    events?: EventData;
    fastNavigation?: boolean;
    themeAware?: boolean;
    languageAware?: boolean;
    cldr?: boolean;
    formAssociated?: boolean;
    shadowRootOptions?: Partial<ShadowRootInit>;
    features?: Array<string>;
    i18n?: I18nBundleAccessors;
};
type State = Record<string, PropertyValue | Array<SlotValue>>;
/**
 * @class
 * @public
 */
declare class UI5ElementMetadata {
    metadata: Metadata;
    _initialState: State | undefined;
    constructor(metadata: Metadata);
    getInitialState(): State;
    /**
     * Validates the slot's value and returns it if correct
     * or throws an exception if not.
     * **Note:** Only intended for use by UI5Element.js
     * @public
     */
    static validateSlotValue(value: Node, slotData: Slot): Node;
    /**
     * Returns the tag of the UI5 Element without the scope
     * @public
     */
    getPureTag(): string;
    /**
     * Returns the tag of the UI5 Element
     * @public
     */
    getTag(): string;
    /**
     * Determines whether a property should have an attribute counterpart
     * @public
     * @param propName
     */
    hasAttribute(propName: string): boolean;
    /**
     * Returns an array with the properties of the UI5 Element (in camelCase)
     * @public
     */
    getPropertiesList(): Array<string>;
    /**
     * Returns an array with the attributes of the UI5 Element (in kebab-case)
     * @public
     */
    getAttributesList(): Array<string>;
    /**
     * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
     */
    canSlotText(): boolean;
    /**
     * Determines whether this UI5 Element supports any slots
     * @public
     */
    hasSlots(): boolean;
    /**
     * Determines whether this UI5 Element supports any slots with "individualSlots: true"
     * @public
     */
    hasIndividualSlots(): boolean;
    /**
     * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
     * @public
     */
    slotsAreManaged(): boolean;
    /**
     * Determines whether this control supports F6 fast navigation
     * @public
     */
    supportsF6FastNavigation(): boolean;
    /**
     * Returns an object with key-value pairs of properties and their metadata definitions
     * @public
     */
    getProperties(): Record<string, Property>;
    /**
     * Returns an object with key-value pairs of events and their metadata definitions
     * @public
     */
    getEvents(): EventData;
    /**
     * Returns an object with key-value pairs of slots and their metadata definitions
     * @public
     */
    getSlots(): Record<string, Slot>;
    /**
     * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
     */
    isLanguageAware(): boolean;
    /**
     * Determines whether this UI5 Element has any theme dependant carachteristics.
     */
    isThemeAware(): boolean;
    /**
     * Determines whether this UI5 Element needs CLDR assets to be fetched to work correctly
     */
    needsCLDR(): boolean;
    getShadowRootOptions(): Partial<ShadowRootInit>;
    /**
     * Determines whether this UI5 Element has any theme dependant carachteristics.
     */
    isFormAssociated(): boolean;
    /**
     * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
     * and determines whether this should cause and invalidation
     *
     * @param slotName the name of the slot in which a child was changed
     * @param type the type of change in the child: "property" or "slot"
     * @param name the name of the property/slot that changed
     */
    shouldInvalidateOnChildChange(slotName: string, type: "property" | "slot", name: string): boolean;
    getI18n(): I18nBundleAccessors;
}
export default UI5ElementMetadata;
export type { Property, PropertyValue, Slot, SlotValue, EventData, State, Metadata, };
