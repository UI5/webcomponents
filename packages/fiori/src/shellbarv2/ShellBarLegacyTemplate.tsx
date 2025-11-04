import Button from "@ui5/webcomponents/dist/Button.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import type ShellBarV2 from "../ShellBarV2.js";

/**
 * Renders the legacy logo area.
 * Used when logo slot is provided but no branding slot.
 */
function ShellBarV2LegacyLogoArea(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.hasLogo) {
		return null;
	}

	return (
		<div
			class="ui5-shellbar-logo"
			role={legacy.logoRole}
			aria-label={legacy.logoAriaLabel}
			tabIndex={0}
			onClick={legacy.handleLogoClick}
			onKeyDown={legacy.handleLogoKeydown}
			onKeyUp={legacy.handleLogoKeyup}
		>
			<slot name="logo"></slot>
		</div>
	);
}

/**
 * Renders legacy title area.
 * Used when primaryTitle/secondaryTitle properties are set but no branding slot.
 */
function ShellBarV2LegacyTitleArea(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || (!legacy.hasPrimaryTitle && !legacy.hasSecondaryTitle)) {
		return null;
	}

	return (
		<div class="ui5-shellbar-title-area">
			{legacy.hasPrimaryTitle && (
				<div class="ui5-shellbar-primary-title">{legacy.primaryTitle}</div>
			)}
			{legacy.hasSecondaryTitle && (
				<div class="ui5-shellbar-secondary-title">{legacy.secondaryTitle}</div>
			)}
		</div>
	);
}

/**
 * Renders the legacy branding area (logo + titles).
 * Only renders if no modern branding slot is used.
 */
function ShellBarV2LegacyBrandingArea(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.shouldRenderLegacyBranding) {
		return null;
	}

	return (
		<div class="ui5-shellbar-legacy-branding">
			{ShellBarV2LegacyLogoArea.call(this)}
			{ShellBarV2LegacyTitleArea.call(this)}
		</div>
	);
}

/**
 * Renders the menu button for S breakpoint.
 * Shows logo or title and opens menu popover.
 */
function ShellBarV2MenuButton(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.showMenuButton) {
		return null;
	}

	return (
		<Button
			class="ui5-shellbar-menu-button"
			design="Transparent"
			onClick={legacy.handleMenuButtonClick}
			accessibilityAttributes={legacy.menuButtonAccessibilityAttributes}
		>
			{legacy.showLogoInMenuButton && (
				<slot name="logo"></slot>
			)}
			{legacy.showTitleInMenuButton && (
				<span>{legacy.primaryTitle}</span>
			)}
		</Button>
	);
}

/**
 * Renders the menu popover.
 * Contains the list of menu items.
 */
function ShellBarV2MenuPopover(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.hasMenuItems) {
		return null;
	}

	return (
		<Popover
			class="ui5-shellbar-menu-popover"
			placement="Bottom"
			horizontalAlign={this.popoverHorizontalAlign}
			onBeforeOpen={legacy.handleMenuPopoverBeforeOpen}
			onClose={legacy.handleMenuPopoverAfterClose}
		>
			<List onItemClick={legacy.handleMenuItemClick}>
				<slot name="menuItems"></slot>
			</List>
		</Popover>
	);
}

export {
	ShellBarV2LegacyLogoArea,
	ShellBarV2LegacyTitleArea,
	ShellBarV2LegacyBrandingArea,
	ShellBarV2MenuButton,
	ShellBarV2MenuPopover,
};
