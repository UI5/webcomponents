import { registerFeature } from "../FeaturesRegistry.js";
import BusyIndicatorStyles from "../generated/css/BusyIndicator.css.js";
import merge from "../thirdparty/merge.js";
import {
	isTabPrevious,
} from "../Keys.js";

import type UI5Element from "../UI5Element.js";
import type OpenUI5Element from "./OpenUI5Element.js";

const busyIndicatorMetadata = {
	properties: {
		__isBusy: {
			type: Boolean,
		},
	},
};

class OpenUI5Enablement {
	static enrichBusyIndicatorSettings(klass: typeof UI5Element) {
		OpenUI5Enablement.enrichBusyIndicatorMetadata(klass);
		OpenUI5Enablement.enrichBusyIndicatorMethods(klass.prototype);
	}

	static enrichBusyIndicatorMetadata(klass: typeof UI5Element) {
		klass._metadata.metadata = merge(klass._metadata.metadata, busyIndicatorMetadata);
		klass._generateAccessors(["__isBusy"]);
	}

	static enrichBusyIndicatorMethods(UI5ElementPrototype: typeof OpenUI5Element.prototype) {
		Object.defineProperties(UI5ElementPrototype, {
			"__redirectFocus": { value: true, writable: true },
			"isOpenUI5Component": { get: () => { return true; } },
		});

		UI5ElementPrototype.__suppressFocusBack = function handleFocusBack(e: KeyboardEvent) {
			if (isTabPrevious(e)) {
				const beforeElem = this.shadowRoot!.querySelector<HTMLElement>("[busy-indicator-before-span]");
				this.__redirectFocus = false;
				beforeElem?.focus();
				this.__redirectFocus = true;
			}
		};

		UI5ElementPrototype.__suppressFocusIn = function handleFocusIn() {
			const busyIndicator = this.shadowRoot?.querySelector("[busy-indicator]") as HTMLElement;
			if (busyIndicator && this.__redirectFocus) {
				busyIndicator.focus();
			}
		};

		UI5ElementPrototype.getDomRef = function getDomRef() {
			// If a component set _getRealDomRef to its children, use the return value of this function
			if (typeof this._getRealDomRef === "function") {
				return this._getRealDomRef();
			}

			if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
				return;
			}

			const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));

			if (children.length !== 1) {
				console.warn(`The shadow DOM for ${(this.constructor as typeof UI5Element).getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
			}

			if (this.__isBusy) {
				return children[0].querySelector(".busy-indicator-wrapper > :not([busy-indicator-before-span]):not(.busy-indicator-overlay):not(.busy-indicator-busy-area)") as HTMLElement;
			}

			return children[0] as HTMLElement;
		};
	}

	static getBusyIndicatorStyles() {
		return BusyIndicatorStyles;
	}
}

registerFeature("OpenUI5Enablement", OpenUI5Enablement);

export default OpenUI5Enablement;
