// eslint-disable-next-line import/no-extraneous-dependencies
import "@ui5/webcomponents-base/dist/ssr-dom.js";
import type { JSX } from "./jsx-runtime.js";
import merge from "./thirdparty/merge.js";
import { boot } from "./Boot.js";
import UI5ElementMetadata from "./UI5ElementMetadata.js";
import type {
	Slot,
	SlotValue,
	State,
	PropertyValue,
	Metadata,
} from "./UI5ElementMetadata.js";
import EventProvider from "./EventProvider.js";
import updateShadowRoot from "./updateShadowRoot.js";
import { shouldIgnoreCustomElement } from "./IgnoreCustomElements.js";
import {
	renderDeferred,
	renderImmediately,
	cancelRender,
} from "./Render.js";
import { registerTag, isTagRegistered, recordTagRegistrationFailure } from "./CustomElementsRegistry.js";
import { observeDOMNode, unobserveDOMNode } from "./DOMObserver.js";
import { skipOriginalEvent } from "./config/NoConflict.js";
import getEffectiveDir from "./locale/getEffectiveDir.js";
import { kebabToCamelCase, camelToKebabCase, kebabToPascalCase } from "./util/StringHelper.js";
import isValidPropertyName from "./util/isValidPropertyName.js";
import { getSlotName, getSlottedNodesList } from "./util/SlotsHelper.js";
import arraysAreEqual from "./util/arraysAreEqual.js";
import { markAsRtlAware } from "./locale/RTLAwareRegistry.js";
import executeTemplate from "./renderer/executeTemplate.js";
import { shouldScopeCustomElement } from "./CustomElementsScopeUtils.js";
import type { TemplateFunction } from "./renderer/executeTemplate.js";
import type {
	AccessibilityInfo,
	PromiseResolve,
	ComponentStylesData,
	ClassMap,
} from "./types.js";
import { updateFormValue, setFormValue } from "./features/InputElementsFormSupport.js";
import type { IFormInputElement } from "./features/InputElementsFormSupport.js";
import { getI18nBundle } from "./i18nBundle.js";
import type I18nBundle from "./i18nBundle.js";
import { fetchCldr } from "./asset-registries/LocaleData.js";
import getLocale from "./locale/getLocale.js";
import { getLanguageChangePending } from "./config/Language.js";

const DEV_MODE = true;
let autoId = 0;

const elementTimeouts = new Map<string, Promise<void>>();
const uniqueDependenciesCache = new Map<typeof UI5Element, Array<typeof UI5Element>>();

type Renderer = (instance: UI5Element, container: HTMLElement | DocumentFragment) => void;

type ChangeInfo = {
	type: "property" | "slot",
	name: string,
	reason?: string,
	child?: SlotValue,
	target?: UI5Element,
	newValue?: PropertyValue,
	oldValue?: PropertyValue,
}

type InvalidationInfo = ChangeInfo & { target: UI5Element };

type ChildChangeListener = (param: InvalidationInfo) => void;

type SlotChangeListener = (this: HTMLSlotElement, ev: Event) => void;

type SlottedChild = Record<string, any>;

const defaultConverter = {
	fromAttribute(value: string | null, type: unknown) {
		if (type === Boolean) {
			return value !== null;
		}
		if (type === Number) {
			return value === null ? undefined : parseFloat(value);
		}
		return value;
	},
	toAttribute(value: unknown, type: unknown) {
		if (type === Boolean) {
			return value as boolean ? "" : null;
		}

		// don't set attributes for arrays and objects
		if (type === Object || type === Array) {
			return null;
		}

		// object, array, other
		if (value === null || value === undefined) {
			return null;
		}

		return String(value);
	},
};

/**
 * Triggers re-rendering of a UI5Element instance due to state change.
 * @param {ChangeInfo} changeInfo An object with information about the change that caused invalidation.
 * @private
 */
function _invalidate(this: UI5Element, changeInfo: ChangeInfo) {
	// Invalidation should be suppressed: 1) before the component is rendered for the first time 2) and during the execution of onBeforeRendering
	// This is necessary not only as an optimization, but also to avoid infinite loops on invalidation between children and parents (when invalidateOnChildChange is used)
	if (this._suppressInvalidation) {
		return;
	}

	const ctor = this.constructor as typeof UI5Element;

	// Skip re-rendering of language-aware components while language-specific data (e.g., CLDR, language bundles) is still loading.
	// Once all necessary language data has been loaded, the language change
	// will trigger a re-render of all language-aware components.
	if (ctor.getMetadata().isLanguageAware() && getLanguageChangePending()) {
		return;
	}

	// Call the onInvalidation hook
	this.onInvalidation(changeInfo);

	this._changedState.push(changeInfo);
	renderDeferred(this);
	this._invalidationEventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}

/**
 * looks up a property descsriptor including in the prototype chain
 * @param proto the starting prototype
 * @param name the property to look for
 * @returns the property descriptor if found directly or in the prototype chaing, undefined if not found
 */
function getPropertyDescriptor(proto: any, name: PropertyKey): PropertyDescriptor | undefined {
	do {
		const descriptor = Object.getOwnPropertyDescriptor(proto, name);
		if (descriptor) {
			return descriptor;
		}
		// go up the prototype chain
		proto = Object.getPrototypeOf(proto);
	} while (proto && proto !== HTMLElement.prototype);
}

type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true
type Equal<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends
	(<T>() => T extends Y ? 1 : 2) ? true : false

// JSX support
type IsAny<T, Y, N> = 0 extends (1 & T) ? Y : N
// type Convert<T> = { [Property in keyof T as `on${KebabToPascal<string & Property>}` ]: T[Property] extends IsAny<T> ? any : (e: CustomEvent<T[Property]>) => void }
type KebabToCamel<T extends string> = T extends `${infer H}-${infer J}${infer K}`
	? `${Uncapitalize<H>}${Capitalize<J>}${KebabToCamel<K>}`
	: T;
type KebabToPascal<T extends string> = Capitalize<KebabToCamel<T>>;

type GlobalHTMLAttributeNames = "accesskey" | "autocapitalize" | "autofocus" | "autocomplete" | "contenteditable" | "contextmenu" | "class" | "dir" | "draggable" | "enterkeyhint" | "hidden" | "id" | "inputmode" | "lang" | "nonce" | "part" | "exportparts" | "pattern" | "slot" | "spellcheck" | "style" | "tabIndex" | "tabindex" | "title" | "translate" | "ref" | "inert" | "role";
type ElementProps<I> = Partial<Omit<I, keyof HTMLElement>>;
type TargetedCustomEvent<D, T> = Omit<CustomEvent<D>, "currentTarget"> & { currentTarget: T };
// define as method and extract the function signature from the method to make it bivariant so that inheritance of event handlers is not checked via strictFunctionTypes
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#strict-function-types
type TargetedEventHandler<D, T> = {
	asMethod(e: TargetedCustomEvent<D, T>): void
}["asMethod"];
type Convert<T, K extends UI5Element> = { [Property in keyof T as `on${KebabToPascal<string & Property>}`]: IsAny<T[Property], any, TargetedEventHandler<T[Property], K>> }

/**
 * @class
 * Base class for all UI5 Web Components
 *
 * @extends HTMLElement
 * @public
 */
abstract class UI5Element extends HTMLElement {
	eventDetails!: NotEqual<this, UI5Element> extends true ? object : {
		[k: string]: any
	};
	_jsxEvents!: Omit<JSX.DOMAttributes<this>, keyof Convert<this["eventDetails"], this> | "onClose" | "onToggle" | "onChange" | "onSelect" | "onInput"> & Convert<this["eventDetails"], this>;
	_jsxProps!: Pick<JSX.AllHTMLAttributes<HTMLElement>, GlobalHTMLAttributeNames> & ElementProps<this> & Partial<this["_jsxEvents"]> & { key?: any };
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
	_domRefReadyPromise: Promise<void> & { _deferredResolve?: PromiseResolve };
	_doNotSyncAttributes: Set<string>;
	__shouldHydrate = false;
	_state: State;
	_internals: ElementInternals;
	_individualSlot?: string;
	_getRealDomRef?: () => HTMLElement;

	static template?: TemplateFunction;
	static _metadata: UI5ElementMetadata;

	static renderer: Renderer;
	initializedProperties: Map<string, unknown>;

	// used to differentiate whether a setter is called from the constructor (from an initializer) or later
	// setters from the constructor should not set attributes, this is delegated after the first rendering but is async
	// setters after the constructor can set attributes synchronously for more convinient development
	_rendered = false;

	constructor() {
		super();

		const ctor = this.constructor as typeof UI5Element;
		this._changedState = []; // Filled on each invalidation, cleared on re-render (used for debugging)
		this._suppressInvalidation = true; // A flag telling whether all invalidations should be ignored. Initialized with "true" because a UI5Element can not be invalidated until it is rendered for the first time
		this._inDOM = false; // A flag telling whether the UI5Element is currently in the DOM tree of the document or not
		this._fullyConnected = false; // A flag telling whether the UI5Element's onEnterDOM hook was called (since it's possible to have the element removed from DOM before that)
		this._childChangeListeners = new Map(); // used to store lazy listeners per slot for the child change event of every child inside that slot
		this._slotChangeListeners = new Map(); // used to store lazy listeners per slot for the slotchange event of all slot children inside that slot
		this._invalidationEventProvider = new EventProvider(); // used by parent components for listening to changes to child components
		this._componentStateFinalizedEventProvider = new EventProvider(); // used by friend classes for synchronization
		let deferredResolve;
		this._domRefReadyPromise = new Promise(resolve => {
			deferredResolve = resolve;
		});
		this._domRefReadyPromise._deferredResolve = deferredResolve;
		this._doNotSyncAttributes = new Set(); // attributes that are excluded from attributeChangedCallback synchronization
		this._slotsAssignedNodes = new WeakMap(); // map of all nodes, slotted (directly or transitively) per component slot

		this._state = { ...ctor.getMetadata().getInitialState() };

		// save properties set before element is upgraded, as they will be overriden by the field initializers in the constructor
		this.initializedProperties = new Map();
		const allProps = (this.constructor as typeof UI5Element).getMetadata().getPropertiesList();
		allProps.forEach(propertyName => {
			if (this.hasOwnProperty(propertyName)) { // eslint-disable-line
				const value = (this as Record<string, unknown>)[propertyName];
				this.initializedProperties.set(propertyName, value);
			}
		});
		this._internals = this.attachInternals();

		this._initShadowRoot();
	}

	_initShadowRoot() {
		const ctor = this.constructor as typeof UI5Element;
		if (ctor._needsShadowDOM()) {
			const defaultOptions = { mode: "open" } as ShadowRootInit;
			if (!this.shadowRoot) {
				this.attachShadow({ ...defaultOptions, ...ctor.getMetadata().getShadowRootOptions() });
			} else {
				// The shadow root is initially rendered. This applies to case where the component's template
				// is inserted into the DOM declaratively using a <template> tag.
				this.__shouldHydrate = true;
			}

			const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
			if (slotsAreManaged) {
				this.shadowRoot!.addEventListener("slotchange", this._onShadowRootSlotChange.bind(this));
			}
		}
	}

	/**
	 * Note: this "slotchange" listener is for slots, rendered in the component's shadow root
	 */
	_onShadowRootSlotChange(e: Event) {
		const targetShadowRoot = (e.target as Node)?.getRootNode(); // the "slotchange" event target is always a slot element
		if (targetShadowRoot === this.shadowRoot) { // only for slotchange events that originate from slots, belonging to the component's shadow root
			this._processChildren();
		}
	}

	/**
	 * Returns a unique ID for this UI5 Element.
	 * @protected
	 */
	get _id() {
		if (!this.__id) {
			this.__id = `ui5wc_${++autoId}`;
		}

		return this.__id;
	}

	render() {
		const template = (this.constructor as typeof UI5Element).template;
		return executeTemplate(template!, this);
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
	 * @private
	 */
	async connectedCallback() {
		if (DEV_MODE) {
			const props = (this.constructor as typeof UI5Element).getMetadata().getProperties();
			for (const [prop, propData] of Object.entries(props)) { // eslint-disable-line
				if (Object.hasOwn(this, prop) && !this.initializedProperties.has(prop)) {
					// initialized properties should not trigger this error as they will be reassigned, only property initializers will trigger this in case unsupported TS mode
					// eslint-disable-next-line no-console
					console.error(`[UI5-FWK] ${(this.constructor as typeof UI5Element).getMetadata().getTag()} has a property [${prop}] that is shadowed by the instance. Updates to this property will not invalidate the component. Possible reason is TS target ES2022 or TS useDefineForClassFields`);
				}
			}
		}

		const ctor = this.constructor as typeof UI5Element;

		this.setAttribute(ctor.getMetadata().getPureTag(), "");
		if (ctor.getMetadata().supportsF6FastNavigation() && !this.hasAttribute("data-sap-ui-fastnavgroup")) {
			this.setAttribute("data-sap-ui-fastnavgroup", "true");
		}

		const slotsAreManaged = ctor.getMetadata().slotsAreManaged();

		this._inDOM = true;

		if (slotsAreManaged) {
			// always register the observer before yielding control to the main thread (await)
			this._startObservingDOMChildren();
			await this._processChildren();
		}

		if (!ctor.asyncFinished) {
			await ctor._definePromise;
		}

		if (!this._inDOM) { // Component removed from DOM while _processChildren was running
			return;
		}

		renderImmediately(this);
		this._domRefReadyPromise._deferredResolve!();
		this._fullyConnected = true;
		this.onEnterDOM();
	}

	/**
	 * Promise that is resolved when the component is defined and CLDR/Message bundles are ready to use.
	 * @public
	 */
	get definePromise(): Promise<void> {
		const ctor = this.constructor as typeof UI5Element;
		if (!ctor.asyncFinished && ctor._definePromise) {
			return ctor._definePromise;
		}
		return Promise.resolve();
	}

	/**
	 * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
	 * @private
	 */
	disconnectedCallback() {
		const ctor = this.constructor as typeof UI5Element;
		const slotsAreManaged = ctor.getMetadata().slotsAreManaged();

		this._inDOM = false;

		if (slotsAreManaged) {
			this._stopObservingDOMChildren();
		}

		if (this._fullyConnected) {
			this.onExitDOM();
			this._fullyConnected = false;
		}

		this._domRefReadyPromise._deferredResolve!();

		cancelRender(this);
	}

	/**
	 * Called every time before the component renders.
	 * @public
	 */
	onBeforeRendering(): void { }

	/**
	 * Called every time after the component renders.
	 * @public
	 */
	onAfterRendering(): void { }

	/**
	 * Called on connectedCallback - added to the DOM.
	 * @public
	 */
	onEnterDOM(): void { }

	/**
	 * Called on disconnectedCallback - removed from the DOM.
	 * @public
	 */
	onExitDOM(): void { }

	/**
	 * @private
	 */
	_startObservingDOMChildren() {
		const ctor = this.constructor as typeof UI5Element;
		const metadata = ctor.getMetadata();
		const shouldObserveChildren = metadata.hasSlots();

		if (!shouldObserveChildren) {
			return;
		}

		const canSlotText = metadata.canSlotText();
		const mutationObserverOptions = {
			childList: true,
			subtree: canSlotText,
			characterData: canSlotText,
		};
		observeDOMNode(this, this._processChildren.bind(this) as MutationCallback, mutationObserverOptions);
	}

	/**
	 * @private
	 */
	_stopObservingDOMChildren() {
		unobserveDOMNode(this);
	}

	/**
	 * Note: this method is also manually called by "compatibility/patchNodeValue.js"
	 * @private
	 */
	async _processChildren() {
		const hasSlots = (this.constructor as typeof UI5Element).getMetadata().hasSlots();
		if (hasSlots) {
			await this._updateSlots();
		}
	}

	/**
	 * @private
	 */
	async _updateSlots() {
		const ctor = this.constructor as typeof UI5Element;
		const slotsMap = ctor.getMetadata().getSlots();
		const canSlotText = ctor.getMetadata().canSlotText();
		const domChildren = Array.from(canSlotText ? this.childNodes : this.children) as Array<Node>;

		const slotsCachedContentMap = new Map<string, Array<SlotValue>>(); // Store here the content of each slot before the mutation occurred
		const propertyNameToSlotMap = new Map<string, string>(); // Used for reverse lookup to determine to which slot the property name corresponds

		// Init the _state object based on the supported slots and store the previous values
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			propertyNameToSlotMap.set(propertyName, slotName);
			slotsCachedContentMap.set(propertyName, [...(this._state[propertyName] as Array<SlotValue>)]);
			this._clearSlot(slotName, slotData);
		}

		const autoIncrementMap = new Map<string, number>();
		const slottedChildrenMap = new Map<string, Array<{ child: Node, idx: number }>>();

		const allChildrenUpgraded = domChildren.map(async (child, idx) => {
			// Determine the type of the child (mainly by the slot attribute)
			const slotName = getSlotName(child);
			const slotData = slotsMap[slotName];

			// Check if the slotName is supported
			if (slotData === undefined) {
				if (slotName !== "default") {
					const validValues = Object.keys(slotsMap).join(", ");
					console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
				}

				return;
			}

			// For children that need individual slots, calculate them
			if (slotData.individualSlots) {
				const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
				autoIncrementMap.set(slotName, nextIndex);
				(child as SlottedChild)._individualSlot = `${slotName}-${nextIndex}`;
			}

			// Await for not-yet-defined custom elements
			if (child instanceof HTMLElement) {
				const localName = child.localName;
				const shouldWaitForCustomElement = localName.includes("-") && !shouldIgnoreCustomElement(localName);

				if (shouldWaitForCustomElement) {
					const isDefined = customElements.get(localName);
					if (!isDefined) {
						const whenDefinedPromise = customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
						let timeoutPromise = elementTimeouts.get(localName);
						if (!timeoutPromise) {
							timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
							elementTimeouts.set(localName, timeoutPromise);
						}
						await Promise.race([whenDefinedPromise, timeoutPromise]);
					}
					customElements.upgrade(child);
				}
			}

			child = (ctor.getMetadata().constructor as typeof UI5ElementMetadata).validateSlotValue(child, slotData);

			// Listen for any invalidation on the child if invalidateOnChildChange is true or an object (ignore when false or not set)
			if (instanceOfUI5Element(child) && slotData.invalidateOnChildChange) {
				const childChangeListener = this._getChildChangeListener(slotName);
				child.attachInvalidate.call(child, childChangeListener);
			}

			// Listen for the slotchange event if the child is a slot itself
			if (child instanceof HTMLSlotElement) {
				this._attachSlotChange(child, slotName, !!slotData.invalidateOnChildChange);
			}

			const propertyName = slotData.propertyName || slotName;

			if (slottedChildrenMap.has(propertyName)) {
				slottedChildrenMap.get(propertyName)!.push({ child, idx });
			} else {
				slottedChildrenMap.set(propertyName, [{ child, idx }]);
			}
		});

		await Promise.all(allChildrenUpgraded);

		// Distribute the child in the _state object, keeping the Light DOM order,
		// not the order elements are defined.
		slottedChildrenMap.forEach((children, propertyName) => {
			this._state[propertyName] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
			this._state[kebabToCamelCase(propertyName)] = this._state[propertyName];
		});

		// Compare the content of each slot with the cached values and invalidate for the ones that changed
		let invalidated = false;
		for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
			const propertyName = slotData.propertyName || slotName;
			if (!arraysAreEqual(slotsCachedContentMap.get(propertyName)!, this._state[propertyName] as Array<SlotValue>)) {
				_invalidate.call(this, {
					type: "slot",
					name: propertyNameToSlotMap.get(propertyName)!,
					reason: "children",
				});

				invalidated = true;

				if (ctor.getMetadata().isFormAssociated()) {
					setFormValue(this as unknown as IFormInputElement);
				}
			}
		}

		// If none of the slots had an invalidation due to changes to immediate children,
		// the change is considered to be text content of the default slot
		if (!invalidated) {
			_invalidate.call(this, {
				type: "slot",
				name: "default",
				reason: "textcontent",
			});
		}
	}

	/**
	 * Removes all children from the slot and detaches listeners, if any
	 * @private
	 */
	_clearSlot(slotName: string, slotData: Slot) {
		const propertyName = slotData.propertyName || slotName;
		const children = this._state[propertyName] as Array<SlotValue>;

		children.forEach(child => {
			if (instanceOfUI5Element(child)) {
				const childChangeListener = this._getChildChangeListener(slotName);
				child.detachInvalidate.call(child, childChangeListener);
			}

			if (child instanceof HTMLSlotElement) {
				this._detachSlotChange(child, slotName);
			}
		});

		this._state[propertyName] = [];
		this._state[kebabToCamelCase(propertyName)] = this._state[propertyName];
	}

	/**
	 * Attach a callback that will be executed whenever the component is invalidated
	 *
	 * @param callback
	 * @public
	 */
	attachInvalidate(callback: (param: InvalidationInfo) => void): void {
		this._invalidationEventProvider.attachEvent("invalidate", callback);
	}

	/**
	 * Detach the callback that is executed whenever the component is invalidated
	 *
	 * @param callback
	 * @public
	 */
	detachInvalidate(callback: (param: InvalidationInfo) => void): void {
		this._invalidationEventProvider.detachEvent("invalidate", callback);
	}

	/**
	 * Callback that is executed whenever a monitored child changes its state
	 *
	 * @param slotName the slot in which a child was invalidated
	 * @param childChangeInfo the changeInfo object for the child in the given slot
	 * @private
	 */
	_onChildChange(slotName: string, childChangeInfo: ChangeInfo) {
		if (!(this.constructor as typeof UI5Element).getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
			return;
		}

		// The component should be invalidated as this type of change on the child is listened for
		// However, no matter what changed on the child (property/slot), the invalidation is registered as "type=slot" for the component itself
		_invalidate.call(this, {
			type: "slot",
			name: slotName,
			reason: "childchange",
			child: childChangeInfo.target,
		});
	}

	/**
	 * Do not override this method in derivatives of UI5Element
	 * @private
	 */
	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		let newPropertyValue: PropertyValue;
		if (this._doNotSyncAttributes.has(name)) { // This attribute is mutated internally, not by the user
			return;
		}

		const properties = (this.constructor as typeof UI5Element).getMetadata().getProperties();
		const realName = name.replace(/^ui5-/, "");
		const nameInCamelCase = kebabToCamelCase(realName);
		if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
			const propData = properties[nameInCamelCase];

			const converter = propData.converter ?? defaultConverter;
			newPropertyValue = converter.fromAttribute(newValue, propData.type);

			(this as Record<string, any>)[nameInCamelCase] = newPropertyValue;
		}
	}

	formAssociatedCallback() {
		const ctor = this.constructor as typeof UI5Element;

		if (!ctor.getMetadata().isFormAssociated()) {
			return;
		}

		updateFormValue(this);
	}

	static get formAssociated() {
		return this.getMetadata().isFormAssociated();
	}

	/**
	 * @private
	 */
	_updateAttribute(name: string, newValue: PropertyValue) {
		const ctor = this.constructor as typeof UI5Element;

		if (!ctor.getMetadata().hasAttribute(name)) {
			return;
		}

		const properties = ctor.getMetadata().getProperties();
		const propData = properties[name];
		const attrName = camelToKebabCase(name);
		const converter = propData.converter || defaultConverter;

		if (DEV_MODE) {
			const tag = (this.constructor as typeof UI5Element).getMetadata().getTag();
			if (typeof newValue === "boolean" && propData.type !== Boolean) {
				// eslint-disable-next-line
				console.error(`[UI5-FWK] boolean value for property [${name}] of component [${tag}] is missing "{ type: Boolean }" in its property decorator. Attribute conversion will treat it as a string. If this is intended, pass the value converted to string, otherwise add the type to the property decorator`);
			}
			if (typeof newValue === "number" && propData.type !== Number) {
				// eslint-disable-next-line
				console.error(`[UI5-FWK] numeric value for property [${name}] of component [${tag}] is missing "{ type: Number }" in its property decorator. Attribute conversion will treat it as a string. If this is intended, pass the value converted to string, otherwise add the type to the property decorator`);
			}
			if (typeof newValue === "string" && propData.type && propData.type !== String) {
				// eslint-disable-next-line
				console.error(`[UI5-FWK] string value for property [${name}] of component [${tag}] which has a non-string type [${propData.type}] in its property decorator. Attribute conversion will stop and keep the string value in the property.`);
			}
		}

		const newAttrValue = converter.toAttribute(newValue, propData.type);
		this._doNotSyncAttributes.add(attrName); // skip the attributeChangedCallback call for this attribute
		if (newAttrValue === null || newAttrValue === undefined) { // null means there must be no attribute for the current value of the property
			this.removeAttribute(attrName); // remove the attribute safely (will not trigger synchronization to the property value due to the above line)
		} else {
			this.setAttribute(attrName, newAttrValue); // setting attributes from properties should not trigger the property setter again
		}
		this._doNotSyncAttributes.delete(attrName); // enable synchronization again for this attribute
	}

	/**
	 * Returns a singleton event listener for the "change" event of a child in a given slot
	 *
	 * @param slotName the name of the slot, where the child is
	 * @private
	 */
	_getChildChangeListener(slotName: string): ChildChangeListener {
		if (!this._childChangeListeners.has(slotName)) {
			this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
		}
		return this._childChangeListeners.get(slotName)!;
	}

	/**
	 * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
	 *
	 * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
	 * @private
	 */
	_getSlotChangeListener(slotName: string): SlotChangeListener {
		if (!this._slotChangeListeners.has(slotName)) {
			this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
		}
		return this._slotChangeListeners.get(slotName)!;
	}

	/**
	 * @private
	 */
	_attachSlotChange(slot: HTMLSlotElement, slotName: string, invalidateOnChildChange: boolean) {
		const slotChangeListener = this._getSlotChangeListener(slotName);
		slot.addEventListener("slotchange", (e: Event) => {
			slotChangeListener.call(slot, e);

			if (invalidateOnChildChange) {
				// Detach listeners for UI5 Elements that used to be in this slot
				const previousChildren = this._slotsAssignedNodes.get(slot);
				if (previousChildren) {
					previousChildren.forEach(child => {
						if (instanceOfUI5Element(child)) {
							const childChangeListener = this._getChildChangeListener(slotName);
							child.detachInvalidate.call(child, childChangeListener);
						}
					});
				}

				// Attach listeners for UI5 Elements that are now in this slot
				const newChildren = getSlottedNodesList([slot]);
				this._slotsAssignedNodes.set(slot, newChildren);
				newChildren.forEach(child => {
					if (instanceOfUI5Element(child)) {
						const childChangeListener = this._getChildChangeListener(slotName);
						child.attachInvalidate.call(child, childChangeListener);
					}
				});
			}
		});
	}

	/**
	 * @private
	 */
	_detachSlotChange(child: HTMLSlotElement, slotName: string) {
		child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
	}

	/**
	 * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
	 * Note: this "slotchange" listener is for slots that are children of the component (in the light dom, as opposed to slots rendered by the component in the shadow root)
	 *
	 * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
	 * @private
	 */
	_onSlotChange(slotName: string) {
		_invalidate.call(this, {
			type: "slot",
			name: slotName,
			reason: "slotchange",
		});
	}

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
	onInvalidation(changeInfo: ChangeInfo): void { } // eslint-disable-line

	updateAttributes() {
		const ctor = this.constructor as typeof UI5Element;
		const props = ctor.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(props)) { // eslint-disable-line
			this._updateAttribute(prop, (this as unknown as Record<string, PropertyValue>)[prop]);
		}
	}

	/**
	 * Do not call this method directly, only intended to be called by js
	 * @protected
	 */
	_render() {
		const ctor = this.constructor as typeof UI5Element;
		const hasIndividualSlots = ctor.getMetadata().hasIndividualSlots();

		// restore properties that were initialized before `define` by calling the setter
		if (this.initializedProperties.size > 0) {
			Array.from(this.initializedProperties.entries()).forEach(([prop, value]) => {
				delete (this as Record<string, unknown>)[prop];
				(this as Record<string, unknown>)[prop] = value;
			});
			this.initializedProperties.clear();
		}
		// suppress invalidation to prevent state changes scheduling another rendering
		this._suppressInvalidation = true;

		try {
			this.onBeforeRendering();

			if (!this._rendered) {
				// first time rendering, previous setters might have been initializers from the constructor - update attributes here
				this.updateAttributes();
			}

			// Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
			this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized");
		} finally {
			// always resume normal invalidation handling
			this._suppressInvalidation = false;
		}

		// Update the shadow root with the render result
		/*
		if (this._changedState.length) {
			let element = this.localName;
			if (this.id) {
				element = `${element}#${this.id}`;
			}
			console.log("Re-rendering:", element, this._changedState.map(x => { // eslint-disable-line
				let res = `${x.type}`;
				if (x.reason) {
					res = `${res}(${x.reason})`;
				}
				res = `${res}: ${x.name}`;
				if (x.type === "property") {
					res = `${res} ${JSON.stringify(x.oldValue)} => ${JSON.stringify(x.newValue)}`;
				}

				return res;
			}));
		}
		*/
		this._changedState = [];

		// Update shadow root
		if (ctor._needsShadowDOM()) {
			updateShadowRoot(this);
		}
		this._rendered = true;

		// Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
		if (hasIndividualSlots) {
			this._assignIndividualSlotsToChildren();
		}

		// Call the onAfterRendering hook
		this.onAfterRendering();
	}

	/**
	 * @private
	 */
	_assignIndividualSlotsToChildren() {
		const domChildren = Array.from(this.children);

		domChildren.forEach((child: Record<string, any>) => {
			if (child._individualSlot) {
				child.setAttribute("slot", child._individualSlot);
			}
		});
	}

	/**
	 * @private
	 */
	_waitForDomRef() {
		return this._domRefReadyPromise;
	}

	/**
	 * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
	 * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
	 * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
	 *
	 * @public
	 */
	getDomRef(): HTMLElement | undefined {
		// If a component set _getRealDomRef to its children, use the return value of this function
		if (typeof this._getRealDomRef === "function") {
			return this._getRealDomRef();
		}

		if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
			return;
		}

		return this.shadowRoot.children[0] as HTMLElement;
	}

	/**
	 * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	getFocusDomRef(): HTMLElement | undefined {
		const domRef = this.getDomRef();
		if (domRef) {
			const focusRef = domRef.querySelector("[data-sap-focus-ref]") as HTMLElement;
			return focusRef || domRef;
		}
	}

	/**
	 * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
	 * This is the element that will receive the focus by default.
	 * @public
	 */
	async getFocusDomRefAsync(): Promise<HTMLElement | undefined> {
		await this._waitForDomRef();
		return this.getFocusDomRef();
	}

	/**
	 * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
	 * @param focusOptions additional options for the focus
	 * @public
	 */
	async focus(focusOptions?: FocusOptions): Promise<void> {
		await this._waitForDomRef();

		const focusDomRef = this.getFocusDomRef();
		if (focusDomRef === this || !this.isConnected) {
			HTMLElement.prototype.focus.call(this, focusOptions);
		} else if (focusDomRef && typeof focusDomRef.focus === "function") {
			focusDomRef.focus(focusOptions);
		}
	}

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
	fireEvent<T>(name: string, data?: T, cancelable = false, bubbles = true): boolean {
		const eventResult = this._fireEvent(name, data, cancelable, bubbles);
		const pascalCaseEventName = kebabToPascalCase(name);

		// pascal events are more convinient for native react usage
		// live-change:
		//	 Before: onlive-change
		//	 After: onLiveChange
		if (pascalCaseEventName !== name) {
			return eventResult && this._fireEvent(pascalCaseEventName, data, cancelable, bubbles);
		}

		return eventResult;
	}

	/**
	 * Fires a custom event, configured via the "event" decorator.
	 * @public
	 * @param name - name of the event
	 * @param data - additional data for the event
	 * @returns false, if the event was cancelled (preventDefault called), true otherwise
	 */
	fireDecoratorEvent<N extends keyof this["eventDetails"]>(name: N, data?: this["eventDetails"][N] | undefined): boolean {
		const eventData = this.getEventData(name as string);
		const cancellable = eventData ? eventData.cancelable : false;
		const bubbles = eventData ? eventData.bubbles : false;

		const eventResult = this._fireEvent(name as string, data, cancellable, bubbles);
		const pascalCaseEventName = kebabToPascalCase(name as string);

		// pascal events are more convinient for native react usage
		// live-change:
		//	 Before: onlive-change
		//	 After: onLiveChange
		if (pascalCaseEventName !== name) {
			return eventResult && this._fireEvent(pascalCaseEventName, data, cancellable, bubbles);
		}

		return eventResult;
	}

	_fireEvent<T>(name: string, data?: T, cancelable = false, bubbles = true) {
		const noConflictEvent = new CustomEvent<T>(`ui5-${name}`, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the no-conflict event is prevented
		const noConflictEventResult = this.dispatchEvent(noConflictEvent);

		if (skipOriginalEvent(name)) {
			return noConflictEventResult;
		}

		const normalEvent = new CustomEvent<T>(name, {
			detail: data,
			composed: false,
			bubbles,
			cancelable,
		});

		// This will be false if the normal event is prevented
		const normalEventResult = this.dispatchEvent(normalEvent);

		// Return false if any of the two events was prevented (its result was false).
		return normalEventResult && noConflictEventResult;
	}

	getEventData(name: string) {
		const ctor = this.constructor as typeof UI5Element;
		const eventMap = ctor.getMetadata().getEvents();
		return eventMap[name];
	}

	/**
	 * Returns the actual children, associated with a slot.
	 * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
	 * @public
	 */
	getSlottedNodes<T = Node>(slotName: string): Array<T> {
		return getSlottedNodesList((this as unknown as Record<string, Array<SlotValue>>)[slotName]) as Array<T>;
	}

	/**
	 * Attach a callback that will be executed whenever the component's state is finalized
	 *
	 * @param callback
	 * @public
	 */
	attachComponentStateFinalized(callback: () => void): void {
		this._componentStateFinalizedEventProvider.attachEvent("componentStateFinalized", callback);
	}

	/**
	 * Detach the callback that is executed whenever the component's state is finalized
	 *
	 * @param callback
	 * @public
	 */
	detachComponentStateFinalized(callback: () => void): void {
		this._componentStateFinalizedEventProvider.detachEvent("componentStateFinalized", callback);
	}

	/**
	 * Determines whether the component should be rendered in RTL mode or not.
	 * Returns: "rtl", "ltr" or undefined
	 *
	 * @public
	 * @default undefined
	 */
	get effectiveDir(): string | undefined {
		markAsRtlAware(this.constructor as typeof UI5Element); // if a UI5 Element calls this method, it's considered to be rtl-aware
		return getEffectiveDir(this);
	}

	/**
	 * Used to duck-type UI5 elements without using instanceof
	 * @public
	 * @default true
	 */
	get isUI5Element(): boolean {
		return true;
	}

	get isUI5AbstractElement(): boolean {
		return !(this.constructor as typeof UI5Element)._needsShadowDOM();
	}

	get classes(): ClassMap {
		return {};
	}

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
	get accessibilityInfo(): AccessibilityInfo | undefined {
		return undefined;
	}

	/**
	 * Do not override this method in derivatives of UI5Element, use metadata properties instead
	 * @private
	 */
	static get observedAttributes() {
		return this.getMetadata().getAttributesList();
	}

	/**
	 * Returns all tags, used inside component's template subject to scoping.
	 * returns {Array[]} // TODO add @
	 * @private
	 */
	static get tagsToScope(): Array<string> {
		const componentTag = this.getMetadata().getPureTag();
		const tagsToScope = this.getUniqueDependencies().map((dep: typeof UI5Element) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);

		if (shouldScopeCustomElement(componentTag)) {
			tagsToScope.push(componentTag);
		}

		return tagsToScope;
	}

	/**
	 * @private
	 */
	static _needsShadowDOM() {
		return !!this.template || Object.prototype.hasOwnProperty.call(this.prototype, "render");
	}

	/**
	 * @private
	 */
	static _generateAccessors() {
		const proto = this.prototype;
		const slotsAreManaged = this.getMetadata().slotsAreManaged();

		// Properties
		const properties = this.getMetadata().getProperties();
		for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
			if (!isValidPropertyName(prop)) {
				console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
			}

			const descriptor = getPropertyDescriptor(proto, prop);
			// if the decorator is on a setter, proxy the new setter to it
			let origSet: (v: any) => void;
			if (descriptor?.set) {
				// eslint-disable-next-line @typescript-eslint/unbound-method
				origSet = descriptor.set;
			}
			// if the decorator is on a setter, there will be a corresponding getter - proxy the new getter to it
			let origGet: () => PropertyValue;
			if (descriptor?.get) {
				// eslint-disable-next-line @typescript-eslint/unbound-method
				origGet = descriptor.get;
			}

			Object.defineProperty(proto, prop, {
				get(this: UI5Element) {
					// proxy the getter to the original accessor if there was one
					if (origGet) {
						return origGet.call(this);
					}
					return this._state[prop];
				},

				set(this: UI5Element, value: PropertyValue) {
					const ctor = this.constructor as typeof UI5Element;
					const oldState = origGet ? origGet.call(this) : this._state[prop];

					const isDifferent = oldState !== value;
					if (isDifferent) {
						// if the decorator is on a setter, use it for storage
						if (origSet) {
							origSet.call(this, value);
						} else {
							this._state[prop] = value;
						}
						_invalidate.call(this, {
							type: "property",
							name: prop,
							newValue: value,
							oldValue: oldState,
						});

						if (this._rendered) {
							// the component is already rendered, indicating it is not the constructor -
							// therefore the attribute can be set synchronously.

							// get the effective value of the property,
							// as it might differ from the provided value
							const newValue = origGet ? origGet.call(this) : this._state[prop];

							this._updateAttribute(prop, newValue);
						}

						if (ctor.getMetadata().isFormAssociated()) {
							setFormValue(this as unknown as IFormInputElement);
						}
					}
				},
			});
		}

		// Slots
		if (slotsAreManaged) {
			const slots = this.getMetadata().getSlots();
			for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
				if (!isValidPropertyName(slotName)) {
					console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
				}

				const propertyName = slotData.propertyName || slotName;
				const propertyDescriptor: PropertyDescriptor = {
					get(this: UI5Element) {
						if (this._state[propertyName] !== undefined) {
							return this._state[propertyName];
						}
						return [];
					},
					set() {
						throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
					},
				};
				Object.defineProperty(proto, propertyName, propertyDescriptor);
				if (propertyName !== kebabToCamelCase(propertyName)) {
					Object.defineProperty(proto, kebabToCamelCase(propertyName), propertyDescriptor);
				}
			}
		}
	}

	/**
	 * Returns the metadata object for this UI5 Web Component Class
	 * @protected
	 */
	static metadata: Metadata = {};

	/**
	 * Returns the CSS for this UI5 Web Component Class
	 * @protected
	 */
	static styles: ComponentStylesData = "";

	/**
	 * Returns an array with the dependencies for this UI5 Web Component, which could be:
	 *  - composed components (used in its shadow root)
	 *  - slotted components that the component may need to communicate with
	 *
	 * @deprecated no longer necessary for jsxRenderer-enabled components
	 * @protected
	 */
	static get dependencies(): Array<typeof UI5Element> {
		return [];
	}

	static cacheUniqueDependencies(this: typeof UI5Element): void {
		const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
		uniqueDependenciesCache.set(this, filtered);
	}

	/**
	 * Returns a list of the unique dependencies for this UI5 Web Component
	 *
	 * @public
	 */
	static getUniqueDependencies(this: typeof UI5Element): Array<typeof UI5Element> {
		if (!uniqueDependenciesCache.has(this)) {
			this.cacheUniqueDependencies();
		}

		return uniqueDependenciesCache.get(this) || [];
	}

	/**
	 * Hook that will be called upon custom element definition
	 *
	 * @protected
	 * @deprecated use the "i18n" decorator for fetching message bundles and the "cldr" option in the "customElements" decorator for fetching CLDR
	 */
	static async onDefine(): Promise<void> {
		return Promise.resolve();
	}

	static fetchI18nBundles() {
		return Promise.all(Object.entries(this.getMetadata().getI18n()).map(pair => {
			const { bundleName } = pair[1];
			return getI18nBundle(bundleName);
		}));
	}

	static fetchCLDR() {
		if (this.getMetadata().needsCLDR()) {
			return fetchCldr(getLocale().getLanguage(), getLocale().getRegion(), getLocale().getScript());
		}
		return Promise.resolve();
	}

	static asyncFinished: boolean;
	static _definePromise: Promise<void> | undefined;
	static i18nBundleStorage: Record<string, I18nBundle> = {};

	static get i18nBundles(): Record<string, I18nBundle> {
		return this.i18nBundleStorage;
	}

	/**
	 * Registers a UI5 Web Component in the browser window object
	 * @public
	 */
	static define(): typeof UI5Element {
		const defineSequence = async () => {
			await boot(); // boot must finish first, because it initializes configuration
			const result = await Promise.all([
				this.fetchI18nBundles(), // uses configuration
				this.fetchCLDR(),
				this.onDefine(),
			]);
			const [i18nBundles] = result;
			Object.entries(this.getMetadata().getI18n()).forEach((pair, index) => {
				const bundleName = pair[1].bundleName;
				this.i18nBundleStorage[bundleName] = i18nBundles[index];
			});
			this.asyncFinished = true;
		};
		this._definePromise = defineSequence();

		const tag = this.getMetadata().getTag();

		const definedLocally = isTagRegistered(tag);
		const definedGlobally = customElements.get(tag);

		if (definedGlobally && !definedLocally) {
			recordTagRegistrationFailure(tag);
		} else if (!definedGlobally) {
			this._generateAccessors();
			registerTag(tag);
			customElements.define(tag, this as unknown as CustomElementConstructor);
		}

		return this;
	}

	/**
	 * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
	 * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
	 * @public
	 */
	static getMetadata(): UI5ElementMetadata {
		if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
			return this._metadata;
		}

		const metadataObjects = [this.metadata];
		let klass = this; // eslint-disable-line
		while (klass !== UI5Element) {
			klass = Object.getPrototypeOf(klass);
			metadataObjects.unshift(klass.metadata);
		}
		const mergedMetadata = merge({}, ...metadataObjects) as Metadata;

		this._metadata = new UI5ElementMetadata(mergedMetadata);
		return this._metadata;
	}

	get validity() { return this._internals.validity; }
	get validationMessage() { return this._internals.validationMessage; }
	checkValidity() { return this._internals.checkValidity(); }
	reportValidity() { return this._internals.reportValidity(); }
}

/**
 * Always use duck-typing to cover all runtimes on the page.
 */
const instanceOfUI5Element = (object: any): object is UI5Element => {
	return "isUI5Element" in object;
};

export default UI5Element;
export {
	instanceOfUI5Element,
};
export type {
	ChangeInfo,
	InvalidationInfo,
	Renderer,
	SlottedChild,
};
