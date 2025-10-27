import Icon from "@ui5/webcomponents/dist/Icon.js";
import navRightArrow from "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import navDownArrow from "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import arrowRight from "@ui5/webcomponents-icons/dist/arrow-right.js";
import type SideNavigationItem from "./SideNavigationItem.js";

export default function SideNavigationItemTemplate(this: SideNavigationItem) {
	if (this.sideNavCollapsed) {
		return ItemTemplate.call(this);
	}

	return (
		<li id={this._id} class="ui5-sn-list-li" role="none">
			{ItemTemplate.call(this)}
		</li>
	);
}

function ItemTemplate(this: SideNavigationItem) {
	const EffectiveTag = this._effectiveTag;

	return (
		<>
			<EffectiveTag id={this._id}
						  data-sap-focus-ref
						  class={`ui5-sn-item ui5-sn-item-level1 ${this._classes}`}
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
						  onFocusOut={this._onfocusout}
						  onMouseEnter={this._onmouseenter}
						  onMouseLeave={this._onmouseleave}
						  aria-checked={this._ariaChecked}
						  aria-owns={this._groupId}
						  aria-label={this._ariaLabel}
						  aria-expanded={this._expanded}
						  aria-describedby={this._describedBy}
			>
				{this.sideNavCollapsed ?
					<Icon class="ui5-sn-item-icon" name={this.icon}/>
					:
					this.icon && <Icon class="ui5-sn-item-icon" name={this.icon}/>
				}
				<div class="ui5-sn-item-text">{this.text}</div>
				{this.sideNavCollapsed ?
					!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						  name={navRightArrow}
					/>
					:
					!!this.items.length &&
					<Icon class="ui5-sn-item-toggle-icon"
						  name={this.expanded ? navDownArrow : navRightArrow}
						  accessibleName={this._arrowTooltip}
						  showTooltip={true}
						  onClick={this._onToggleClick}
					/>
				}
				{this.isExternalLink &&
					<Icon class="ui5-sn-item-external-link-icon"
						  name={arrowRight}
					/>
				}
			</EffectiveTag>
			{!this.sideNavCollapsed && !!this.items.length &&
				<ul id={this._groupId}
					class="ui5-sn-item-ul"
					aria-label={this.text}
					role="group"
				>
					<slot></slot>
				</ul>
			}
		</>
	);
}
