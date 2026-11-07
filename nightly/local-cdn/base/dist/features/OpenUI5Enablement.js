import { registerFeature } from "../FeaturesRegistry.js";
import BusyIndicatorStyles from "../generated/css/BusyIndicator.css.js";
import merge from "../thirdparty/merge.js";
import { isTabPrevious, } from "../Keys.js";
const busyIndicatorMetadata = {
    properties: {
        __isBusy: {
            type: Boolean,
        },
    },
};
class OpenUI5Enablement {
    static wrapTemplateResultInBusyMarkup(html, host, templateResult) {
        if (host.isOpenUI5Component && host.__isBusy) {
            templateResult = html `
			<div class="busy-indicator-wrapper">
				<span tabindex="0" busy-indicator-before-span @focusin=${host.__suppressFocusIn}></span>
				${templateResult}
				<div class="busy-indicator-overlay"></div>
				<div busy-indicator
					class="busy-indicator-busy-area"
					tabindex="0"
					role="progressbar"
					@keydown=${host.__suppressFocusBack}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuetext="Busy">
					<div>
						<div class="busy-indicator-circle circle-animation-0"></div>
						<div class="busy-indicator-circle circle-animation-1"></div>
						<div class="busy-indicator-circle circle-animation-2"></div>
					</div>
				</div>
			</div>`;
        }
        return templateResult;
    }
    static enrichBusyIndicatorSettings(klass) {
        OpenUI5Enablement.enrichBusyIndicatorMetadata(klass);
        OpenUI5Enablement.enrichBusyIndicatorMethods(klass.prototype);
    }
    static enrichBusyIndicatorMetadata(klass) {
        klass.metadata = merge(klass.metadata, busyIndicatorMetadata);
    }
    static enrichBusyIndicatorMethods(UI5ElementPrototype) {
        Object.defineProperties(UI5ElementPrototype, {
            "__redirectFocus": { value: true, writable: true },
            "__suppressFocusBack": {
                get() {
                    return {
                        handleEvent: (e) => {
                            if (isTabPrevious(e)) {
                                const beforeElem = this.shadowRoot.querySelector("[busy-indicator-before-span]");
                                this.__redirectFocus = false;
                                beforeElem.focus();
                                this.__redirectFocus = true;
                            }
                        },
                        capture: true,
                        passive: false,
                    };
                },
            },
            "isOpenUI5Component": { get: () => { return true; } },
        });
        UI5ElementPrototype.__suppressFocusIn = function handleFocusIn() {
            const busyIndicator = this.shadowRoot?.querySelector("[busy-indicator]");
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
                console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
            }
            if (this.__isBusy) {
                return children[0].querySelector(".busy-indicator-wrapper > :not([busy-indicator-before-span]):not(.busy-indicator-overlay):not(.busy-indicator-busy-area)");
            }
            return children[0];
        };
    }
    static getBusyIndicatorStyles() {
        return BusyIndicatorStyles;
    }
}
registerFeature("OpenUI5Enablement", OpenUI5Enablement);
export default OpenUI5Enablement;
//# sourceMappingURL=OpenUI5Enablement.js.map