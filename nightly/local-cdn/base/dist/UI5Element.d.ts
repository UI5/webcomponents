import "@ui5/webcomponents-base/dist/ssr-dom.js";
import type { JSX } from "./jsx-runtime.js";
import UI5ElementMetadata from "./UI5ElementMetadata.js";
import type { Slot as SlotMetadata, SlotValue, State, PropertyValue, Metadata } from "./UI5ElementMetadata.js";
import EventProvider from "./EventProvider.js";
import type { TemplateFunction } from "./renderer/executeTemplate.js";
import type { AccessibilityInfo, PromiseResolve, ComponentStylesData, ClassMap } from "./types.js";
import type I18nBundle from "./i18nBundle.js";
type Renderer = (instance: UI5Element, container: HTMLElement | DocumentFragment) => void;
type ChangeInfo = {
    type: "property" | "slot";
    name: string;
    reason?: string;
    child?: SlotValue;
    target?: UI5Element;
    newValue?: PropertyValue;
    oldValue?: PropertyValue;
};
type InvalidationInfo = ChangeInfo & {
    target: UI5Element;
};
type ChildChangeListener = (param: InvalidationInfo) => void;
type SlotChangeListener = (this: HTMLSlotElement, ev: Event) => void;
type SlottedChild = Record<string, any>;
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type IsAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
type KebabToCamel<T extends string> = T extends `${infer H}-${infer J}${infer K}` ? `${Uncapitalize<H>}${Capitalize<J>}${KebabToCamel<K>}` : T;
type KebabToPascal<T extends string> = Capitalize<KebabToCamel<T>>;
type GlobalHTMLAttributeNames = "accesskey" | "autocapitalize" | "autofocus" | "autocomplete" | "contenteditable" | "contextmenu" | "class" | "dir" | "draggable" | "enterkeyhint" | "hidden" | "id" | "inputmode" | "lang" | "nonce" | "part" | "exportparts" | "pattern" | "slot" | "spellcheck" | "style" | "tabIndex" | "tabindex" | "title" | "translate" | "ref" | "inert" | "role";
type ElementProps<I> = Partial<Omit<I, keyof HTMLElement>>;
type TargetedCustomEvent<D, T> = Omit<CustomEvent<D>, "currentTarget"> & {
    currentTarget: T;
};
type TargetedEventHandler<D, T> = {
    asMethod(e: TargetedCustomEvent<D, T>): void;
}["asMethod"];
type Convert<T, K extends UI5Element> = {
    [Property in keyof T as `on${KebabToPascal<string & Property>}`]: IsAny<T[Property], any, TargetedEventHandler<T[Property], K>>;
};
declare const SlotMarker: unique symbol;
declare const DefaultSlotMarker: unique symbol;
export type Slot<T> = T[] & {
    [SlotMarker]: true;
};
export type DefaultSlot<T> = T[] & {
    [DefaultSlotMarker]: true;
};
export type IsSlot<T> = T extends {
    [SlotMarker]: true;
} ? true : T extends {
    [DefaultSlotMarker]: true;
} ? true : false;
export type IsDefaultSlot<T> = T extends {
    [DefaultSlotMarker]: true;
} ? true : false;
/**
 * @class
 * Base class for all UI5 Web Components
 *
 * @extends HTMLElement
 * @public
 */
declare abstract class UI5Element extends HTMLElement {
    eventDetails: NotEqual<this, UI5Element> extends true ? object : {
        [k: string]: any;
    };
    _jsxEvents: Omit<JSX.DOMAttributes<this>, keyof Convert<this["eventDetails"], this> | "onClose" | "onToggle" | "onChange" | "onSelect" | "onInput"> & Convert<this["eventDetails"], this>;
    _jsxProps: Pick<JSX.AllHTMLAttributes<HTMLElement>, GlobalHTMLAttributeNames> & ElementProps<this> & Partial<this["_jsxEvents"]> & {
        key?: any;
    };
    __id?: string;
    _suppressInvalidation: boolean;
    _changedState: Array<ChangeInfo>;
    _invalidationEventProvider: EventProvider<InvalidationInfo, void>;
    _componentStateFinalizedEventProvider: EventProvider<void, void>;
    _inDOM: boolean;
    _fullyConnected: boolean;
    _childChangeListeners: Map<string, ChildChangeListener>;
    _slotsAssignedNodes: WeakMap<HTMLSlotElement, Array<SlotValue>>;
    _slotChangeListeners: Map<string, SlotChangeListener>;
    _domRefReadyPromise: Promise<void> & {
        _deferredResolve?: PromiseResolve;
    };
    _doNotSyncAttributes: Set<string>;
    __shouldHydrate: boolean;
    _state: State;
    _internals: ElementInternals;
    _individualSlot?: string;
    _getRealDomRef?: () => HTMLElement;
    static template?: TemplateFunction;
    static _metadata: UI5ElementMetadata;
    static renderer: Renderer;
    initializedProperties: Map<string, unknown>;
    _rendered: boolean;
    constructor();
    _initShadowRoot(): void;
    /**
     * Note: this "slotchange" listener is for slots, rendered in the component's shadow root
     */
    _onShadowRootSlotChange(e: Event): void;
    /**
     * Returns a unique ID for this UI5 Element.
     * @protected
     */
    get _id(): string;
    render(): object;
    /**
     * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
     * @private
     */
    connectedCallback(): Promise<void>;
    get definePromise(): Promise<void>;
    /**
     * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
     * @private
     */
    disconnectedCallback(): void;
    /**
     * Called every time before the component renders.
     * @public
     */
    onBeforeRendering(): void;
    /**
     * Called every time after the component renders.
     * @public
     */
    onAfterRendering(): void;
    /**
     * Called on connectedCallback - added to the DOM.
     * @public
     */
    onEnterDOM(): void;
    /**
     * Called on disconnectedCallback - removed from the DOM.
     * @public
     */
    onExitDOM(): void;
    /**
     * @private
     */
    _startObservingDOMChildren(): void;
    /**
     * @private
     */
    _stopObservingDOMChildren(): void;
    /**
     * Note: this method is also manually called by "compatibility/patchNodeValue.js"
     * @private
     */
    _processChildren(): Promise<void>;
    /**
     * @private
     */
    _updateSlots(): Promise<void>;
    /**
     * Removes all children from the slot and detaches listeners, if any
     * @private
     */
    _clearSlot(slotName: string, slotData: SlotMetadata): void;
    /**
     * Attach a callback that will be executed whenever the component is invalidated
     *
     * @param callback
     * @public
     */
    attachInvalidate(callback: (param: InvalidationInfo) => void): void;
    /**
     * Detach the callback that is executed whenever the component is invalidated
     *
     * @param callback
     * @public
     */
    detachInvalidate(callback: (param: InvalidationInfo) => void): void;
    /**
     * Callback that is executed whenever a monitored child changes its state
     *
     * @param slotName the slot in which a child was invalidated
     * @param childChangeInfo the changeInfo object for the child in the given slot
     * @private
     */
    _onChildChange(slotName: string, childChangeInfo: ChangeInfo): void;
    /**
     * Do not override this method in derivatives of UI5Element
     * @private
     */
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    formAssociatedCallback(): void;
    static get formAssociated(): boolean;
    /**
     * @private
     */
    _updateAttribute(name: string, newValue: PropertyValue): void;
    /**
     * Returns a singleton event listener for the "change" event of a child in a given slot
     *
     * @param slotName the name of the slot, where the child is
     * @private
     */
    _getChildChangeListener(slotName: string): ChildChangeListener;
    /**
     * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @private
     */
    _getSlotChangeListener(slotName: string): SlotChangeListener;
    /**
     * @private
     */
    _attachSlotChange(slot: HTMLSlotElement, slotName: string, invalidateOnChildChange: boolean): void;
    /**
     * @private
     */
    _detachSlotChange(child: HTMLSlotElement, slotName: string): void;
    /**
     * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
     * Note: this "slotchange" listener is for slots that are children of the component (in the light dom, as opposed to slots rendered by the component in the shadow root)
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @private
     */
    _onSlotChange(slotName: string): void;
    /**
     * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
     *
     * @param  changeInfo An object with information about the change that caused invalidation.
     * The object can have the following properties:
     *  - type: (property|slot) tells what caused the invalidation
     *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
     *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
     *
     *  - name: the name of the property or slot that caused the invalidation
     *
     *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
     *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
     *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
     *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
     *	  Can only trigger if the child of a slot is a slot element itself.
     *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
     *	  Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
     *
     *  - newValue: the new value of the property (for type="property" only)
     *
     *  - oldValue: the old value of the property (for type="property" only)
     *
     *  - child the child that was changed (for type="slot" and reason="childchange" only)
     *
     * @public
     */
    onInvalidation(changeInfo: ChangeInfo): void;
    updateAttributes(): void;
    /**
     * Do not call this method directly, only intended to be called by js
     * @protected
     */
    _render(): void;
    /**
     * @private
     */
    _assignIndividualSlotsToChildren(): void;
    /**
     * @private
     */
    _waitForDomRef(): Promise<void> & {
        _deferredResolve?: PromiseResolve;
    };
    /**
     * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
     * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
     * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
     *
     * @public
     */
    getDomRef(): HTMLElement | undefined;
    /**
     * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    getFocusDomRef(): HTMLElement | undefined;
    /**
     * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    getFocusDomRefAsync(): Promise<HTMLElement | undefined>;
    /**
     * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
     * @param focusOptions additional options for the focus
     * @public
     */
    focus(focusOptions?: FocusOptions): Promise<void>;
    /**
     *
     * @public
     * @param name - name of the event
     * @param data - additional data for the event
     * @param cancelable - true, if the user can call preventDefault on the event object
     * @param bubbles - true, if the event bubbles
     * @returns false, if the event was cancelled (preventDefault called), true otherwise
     * @deprecated use fireDecoratorEvent instead
     */
    fireEvent<T>(name: string, data?: T, cancelable?: boolean, bubbles?: boolean): boolean;
    /**
     * Fires a custom event, configured via the "event" decorator.
     * @public
     * @param name - name of the event
     * @param data - additional data for the event
     * @returns false, if the event was cancelled (preventDefault called), true otherwise
     */
    fireDecoratorEvent<N extends keyof this["eventDetails"]>(name: N, data?: this["eventDetails"][N] | undefined): boolean;
    _fireEvent<T>(name: string, data?: T, cancelable?: boolean, bubbles?: boolean): boolean;
    getEventData(name: string): {
        detail?: Record<string, object>;
        cancelable?: boolean;
        bubbles?: boolean;
    };
    /**
     * Returns the actual children, associated with a slot.
     * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
     * @public
     */
    getSlottedNodes<T = Node>(slotName: string): Array<T>;
    /**
     * Attach a callback that will be executed whenever the component's state is finalized
     *
     * @param callback
     * @public
     */
    attachComponentStateFinalized(callback: () => void): void;
    /**
     * Detach the callback that is executed whenever the component's state is finalized
     *
     * @param callback
     * @public
     */
    detachComponentStateFinalized(callback: () => void): void;
    /**
     * Determines whether the component should be rendered in RTL mode or not.
     * Returns: "rtl", "ltr" or undefined
     *
     * @public
     * @default undefined
     */
    get effectiveDir(): string | undefined;
    /**
     * Used to duck-type UI5 elements without using instanceof
     * @public
     * @default true
     */
    get isUI5Element(): boolean;
    get isUI5AbstractElement(): boolean;
    get classes(): ClassMap;
    /**
     * Provides the accessibility information for the component.
     *
     * **Note:** The default implementation returns `undefined`, indicating that
     * the component does not provide any accessibility metadata by default. In such cases,
     * consumers of this API may apply their own fallback if needed.
     *
     * Subclasses overriding this getter must return an object of type `AccessibilityInfo`
     * describing the component's accessible name, role, description, and other relevant properties.
     *
     * If the component is intentionally decorative and should be ignored by assistive
     * technologies, return an empty object `{}`.
     *
     * @private
     */
    get accessibilityInfo(): AccessibilityInfo | undefined;
    /**
     * Do not override this method in derivatives of UI5Element, use metadata properties instead
     * @private
     */
    static get observedAttributes(): string[];
    /**
     * Returns all tags, used inside component's template subject to scoping.
     * returns {Array[]} // TODO add @
     * @private
     */
    static get tagsToScope(): Array<string>;
    /**
     * @private
     */
    static _needsShadowDOM(): boolean;
    /**
     * @private
     */
    static _generateAccessors(): void;
    /**
     * Returns the metadata object for this UI5 Web Component Class
     * @protected
     */
    static metadata: Metadata;
    /**
     * Returns the CSS for this UI5 Web Component Class
     * @protected
     */
    static styles: ComponentStylesData;
    /**
     * Returns an array with the dependencies for this UI5 Web Component, which could be:
     *  - composed components (used in its shadow root)
     *  - slotted components that the component may need to communicate with
     *
     * @deprecated no longer necessary for jsxRenderer-enabled components
     * @protected
     */
    static get dependencies(): Array<typeof UI5Element>;
    static cacheUniqueDependencies(this: typeof UI5Element): void;
    /**
     * Returns a list of the unique dependencies for this UI5 Web Component
     *
     * @public
     */
    static getUniqueDependencies(this: typeof UI5Element): Array<typeof UI5Element>;
    /**
     * Hook that will be called upon custom element definition
     *
     * @protected
     * @deprecated use the "i18n" decorator for fetching message bundles and the "cldr" option in the "customElements" decorator for fetching CLDR
     */
    static onDefine(): Promise<void>;
    static fetchI18nBundles(): Promise<I18nBundle[]>;
    static fetchCLDR(): Promise<void>;
    static asyncFinished: boolean;
    static _definePromise: Promise<void> | undefined;
    static i18nBundleStorage: Record<string, I18nBundle>;
    static get i18nBundles(): Record<string, I18nBundle>;
    /**
     * Registers a UI5 Web Component in the browser window object
     * @public
     */
    static define(): typeof UI5Element;
    /**
     * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
     * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
     * @public
     */
    static getMetadata(): UI5ElementMetadata;
    get validity(): ValidityState;
    get validationMessage(): string;
    checkValidity(): boolean;
    reportValidity(): boolean;
}
/**
 * Always use duck-typing to cover all runtimes on the page.
 */
declare const instanceOfUI5Element: (object: any) => object is UI5Element;
export default UI5Element;
export { instanceOfUI5Element, };
export type { ChangeInfo, InvalidationInfo, Renderer, SlottedChild, };
