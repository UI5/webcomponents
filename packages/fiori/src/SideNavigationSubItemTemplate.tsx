import Icon from "@ui5/webcomponents/dist/Icon.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
import type SideNavigationSubItem from "./SideNavigationSubItem.js";

export default function SideNavigationSubItemTemplate(this: SideNavigationSubItem) {
	const EffectiveTag = this._effectiveTag;

	return (
		<li id={this._id} class="ui5-sn-list-li" role="none">
			<EffectiveTag id={this._id}
						  data-sap-focus-ref
						  class={`ui5-sn-item ui5-sn-item-level2 ${this._classes}`}
						  role={this.ariaRole}
						  onKeyDown={this._onkeydown}
						  onKeyUp={this._onkeyup}
						  onClick={this._onclick}
						  onFocusIn={this._onfocusin}
						  tabIndex={this.effectiveTabIndex}
						  aria-current={this._ariaCurrent}
						  aria-selected={this._ariaSelected}
						  title={this._tooltip}
						  aria-disabled={this.effectiveDisabled}
						  href={this._href}
						  target={this._target}
						  aria-haspopup={this._ariaHasPopup}
			>
				{this.icon &&
					<Icon class="ui5-sn-item-icon" name={this.icon}/>
				}
				<div class="ui5-sn-item-text">{this.text}</div>
				{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						  name={arrowRight}
					/>
				}
			</EffectiveTag>
		</li>
	);
}
