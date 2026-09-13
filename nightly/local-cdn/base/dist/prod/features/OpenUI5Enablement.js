"use strict";import{registerFeature as a}from"../FeaturesRegistry.js";import o from"../generated/css/BusyIndicator.css.js";import n from"../thirdparty/merge.js";import{isTabPrevious as c}from"../Keys.js";const u={properties:{__isBusy:{type:Boolean}}};class r{static wrapTemplateResultInBusyMarkup(t,i,e){return i.isOpenUI5Component&&i.__isBusy&&(e=t`
			<div class="busy-indicator-wrapper">
				<span tabindex="0" busy-indicator-before-span @focusin=${i.__suppressFocusIn}></span>
				${e}
				<div class="busy-indicator-overlay"></div>
				<div busy-indicator
					class="busy-indicator-busy-area"
					tabindex="0"
					role="progressbar"
					@keydown=${i.__suppressFocusBack}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-valuetext="Busy">
					<div>
						<div class="busy-indicator-circle circle-animation-0"></div>
						<div class="busy-indicator-circle circle-animation-1"></div>
						<div class="busy-indicator-circle circle-animation-2"></div>
					</div>
				</div>
			</div>`),e}static enrichBusyIndicatorSettings(t){r.enrichBusyIndicatorMetadata(t),r.enrichBusyIndicatorMethods(t.prototype)}static enrichBusyIndicatorMetadata(t){t.metadata=n(t.metadata,u)}static enrichBusyIndicatorMethods(t){Object.defineProperties(t,{__redirectFocus:{value:!0,writable:!0},__suppressFocusBack:{get(){return{handleEvent:i=>{if(c(i)){const e=this.shadowRoot.querySelector("[busy-indicator-before-span]");this.__redirectFocus=!1,e.focus(),this.__redirectFocus=!0}},capture:!0,passive:!1}}},isOpenUI5Component:{get:()=>!0}}),t.__suppressFocusIn=function(){const e=this.shadowRoot?.querySelector("[busy-indicator]");e&&this.__redirectFocus&&e.focus()},t.getDomRef=function(){if(typeof this._getRealDomRef=="function")return this._getRealDomRef();if(!this.shadowRoot||this.shadowRoot.children.length===0)return;const e=[...this.shadowRoot.children].filter(s=>!["link","style"].includes(s.localName));return e.length!==1&&console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`),this.__isBusy?e[0].querySelector(".busy-indicator-wrapper > :not([busy-indicator-before-span]):not(.busy-indicator-overlay):not(.busy-indicator-busy-area)"):e[0]}}static getBusyIndicatorStyles(){return o}}a("OpenUI5Enablement",r);export default r;
//# sourceMappingURL=OpenUI5Enablement.js.map
