import type UserMenuItem from "./UserMenuItem.js";
import MenuItemTemplate from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import type { MenuItemHooks } from "@ui5/webcomponents/dist/MenuItemTemplate.js";
import ListItemTemplate from "@ui5/webcomponents/dist/ListItemTemplate.js";
import type { ListItemHooks } from "@ui5/webcomponents/dist/ListItemTemplate.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import List from "@ui5/webcomponents/dist/List.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
import navBackIcon from "@ui5/webcomponents-icons/dist/nav-back.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";
import checkIcon from "@ui5/webcomponents-icons/dist/accept.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function UserMenuItemTemplate(this: UserMenuItem) {
	if (this.isPhone) {
		return phoneTemplate.call(this);
	}

	const hooks: Partial<MenuItemHooks> = {};
	if (this.showSelection) {
		hooks.menuItemTextContent = userMenuItemTextContent;
	}
	return [MenuItemTemplate.call(this, hooks)];
}

function phoneTemplate(this: UserMenuItem) {
	const hooks: Partial<ListItemHooks> = {
		iconBegin: function (this: UserMenuItem) {
			if (this.hasIcon) {
				return <Icon class="ui5-li-icon" name={this.icon} />;
			}
			if (this._siblingsWithIcon) {
				return <div class="ui5-menu-item-dummy-icon"></div>;
			}
		},
		listItemContent: function (this: UserMenuItem) {
			return (<>
				{this.showSelection ? (
					<div class="ui5-user-menu-item-text-wrapper">
						{this.text && <div class="ui5-menu-item-text">{this.text}</div>}
						{this._selectedSubItemText &&
							<div class="ui5-user-menu-item-selection-text">{this._selectedSubItemText}</div>
						}
					</div>
				) : (
					<>{this.text && <div class="ui5-menu-item-text">{this.text}</div>}</>
				)}
				{rightContent.call(this)}
				{checkmarkContent.call(this)}
			</>);
		},
	};

	return [
		ListItemTemplate.call(this, hooks),
		phoneSubmenuPopover.call(this),
	];
}

function checkmarkContent(this: UserMenuItem) {
	return !this._markChecked ? "" : (
		<div class="ui5-menu-item-checked">
			<Icon name={checkIcon} class="ui5-menu-item-icon-checked" />
		</div>
	);
}

function rightContent(this: UserMenuItem) {
	switch (true) {
	case this.hasSubmenu:
		return (
			<div class="ui5-menu-item-submenu-icon">
				<Icon part="subicon" name={slimArrowRight} class="ui5-menu-item-icon-end" />
			</div>
		);
	case this.hasEndContent:
		return (
			<div class="ui5-menu-item-end-content" role="group" aria-label={this.endContentAccessibleName}>
				<slot name="endContent" onKeyDown={this._endContentKeyDown}></slot>
			</div>
		);
	case !!this.additionalText:
		return (
			<span part="additional-text" class="ui5-li-additional-text" aria-hidden={this._accInfo.ariaHidden}>
				{this.additionalText}
			</span>
		);
	}
}

function phoneSubmenuPopover(this: UserMenuItem) {
	return this.hasSubmenu && <ResponsivePopover
		id={`${this._id}-menu-rp`}
		class="ui5-menu-rp ui5-menu-rp-sub-menu"
		preventInitialFocus={true}
		preventFocusRestore={true}
		hideArrow={true}
		allowTargetOverlap={true}
		placement={PopoverPlacement.End}
		verticalAlign="Top"
		accessibleName={this.accessibleNameText}
		onBeforeOpen={this._beforePopoverOpen}
		onOpen={this._afterPopoverOpen}
		onBeforeClose={this._beforePopoverClose}
		onClose={this._afterPopoverClose}
	>
		<div slot="header" class="ui5-menu-dialog-header">
			<Button
				icon={navBackIcon}
				class="ui5-menu-back-button"
				design="Transparent"
				aria-label={this.labelBack}
				onClick={this._close}
			/>
			<div class="ui5-menu-dialog-title">
				<div>{this.text}</div>
			</div>
			<Button
				icon={declineIcon}
				class="ui5-menu-close-button"
				design="Transparent"
				aria-label={this.labelCancel}
				onClick={this._closeAll}
			/>
		</div>

		<div
			id={`${this._id}-menu-main`}
			class={this.loading ? "menu-busy-indicator-main" : ""}
			aria-busy={this.loading}
		>
			{this.items.length ? (
				<List
					id={`${this._id}-menu-list`}
					selectionMode="None"
					separators="None"
					accessibleRole="Menu"
					loading={this.loading}
					loadingDelay={this.loadingDelay}
					onMouseOver={this._itemMouseOver}
					onKeyDown={this._itemKeyDown}
					onKeyUp={this._itemKeyUp}
					onui5-close-menu={this._close}
					onui5-exit-end-content={this._navigateOutOfEndContent}
				>
					<slot></slot>
				</List>
			) : this.loading && <BusyIndicator
				id={`${this._id}-menu-busy-indicator`}
				delay={this.loadingDelay}
				class="ui5-menu-busy-indicator"
				active={true}
			/>}
		</div>
	</ResponsivePopover>;
}

function userMenuItemTextContent(this: UserMenuItem) {
	return (
		<div class="ui5-user-menu-item-text-wrapper">
			{this.text && <div class="ui5-menu-item-text">{this.text}</div>}
			{this._selectedSubItemText &&
				<div class="ui5-user-menu-item-selection-text">{this._selectedSubItemText}</div>
			}
		</div>
	);
}
