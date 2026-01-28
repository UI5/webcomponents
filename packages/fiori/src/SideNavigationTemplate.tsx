import overflow from "@ui5/webcomponents-icons/dist/overflow.js";
import type SideNavigation from "./SideNavigation.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationPopoverTemplate from "./SideNavigationPopoverTemplate.js";

export default function SideNavigationTemplate(this: SideNavigation) {
	return (<>
		<nav class={{
			"ui5-sn-root": true,
			"ui5-sn-collapsed": this.collapsed,
		}}
		role={this._rootRole}
		aria-label={this.accessibleName}
		>
			{header.call(this)}

			{this.collapsed ?
				<div role="menubar"
					class="ui5-sn-list ui5-sn-flexible"
					aria-orientation="vertical"
					aria-roledescription={this.ariaRoleDescNavigationList}
					aria-label={this.navigationMenuPrimaryHiddenText}
				>
					<slot></slot>
					<SideNavigationItem
						isOverflow={true}
						id={`${this._id}-sn-overflow-item`}
						text={this.overflowAccessibleName}
						onClick={this._handleOverflowClick}
						class="ui5-sn-item-overflow"
						sideNavCollapsed={true}
						icon={overflow}
					/>
				</div>
				:
				<ul role="tree"
					class="ui5-sn-list ui5-sn-flexible"
					aria-roledescription={this.ariaRoleDescNavigationList}
					aria-label={this.navigationMenuPrimaryHiddenText}
				>
					<slot></slot>
				</ul>
			}

			{this.hasFixedItems && <>
				<div role="separator" class="ui5-sn-spacer"></div>
				{this.collapsed ?
					<div role="menubar"
						class="ui5-sn-list ui5-sn-fixed"
						aria-orientation="vertical"
						aria-roledescription={this.ariaRoleDescNavigationList}
						aria-label={this.navigationMenuFooterHiddenText}
					>
						<slot name="fixedItems"></slot>
					</div>
					:
					<ul role="tree"
						class="ui5-sn-list ui5-sn-fixed"
						aria-roledescription={this.ariaRoleDescNavigationList}
						aria-label={this.navigationMenuFooterHiddenText}
					>
						<slot name="fixedItems"></slot>
					</ul>
				}
			</>}
		</nav>
		{SideNavigationPopoverTemplate.call(this)}
	</>);
}

function header(this: SideNavigation) {
	return this.showHeader ? (
		<slot name="header"></slot>
	) : undefined;
}
