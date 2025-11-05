import Button from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import type ShellBarV2 from "../../ShellBarV2.js";

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
 * Renders separate logo when menu items exist.
 * Used on non-S breakpoints when menu items are present.
 */
function ShellBarV2SeparateLogo(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.showSeparateLogo) {
		return null;
	}

	return (
		<span
			class="ui5-shellbar-logo"
			role={legacy.logoRole}
			aria-label={legacy.logoAriaLabel}
			tabIndex={0}
			onClick={legacy.handleLogoClick}
			onKeyDown={legacy.handleLogoKeydown}
			onKeyUp={legacy.handleLogoKeyup}
		>
			<slot name="logo"></slot>
		</span>
	);
}

/**
 * Renders interactive menu button for non-S breakpoints.
 * Shows primaryTitle with arrow, opens menu popover.
 */
function ShellBarV2InteractiveMenuButton(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.showInteractiveMenuButton) {
		return null;
	}

	return (
		<button
			class="ui5-shellbar-menu-button ui5-shellbar-menu-button--interactive"
			onClick={legacy.handleMenuButtonClick}
			aria-haspopup="menu"
			aria-expanded={legacy.menuPopoverExpanded}
			tabIndex={0}
		>
			<div class="ui5-shellbar-menu-button-title">{legacy.primaryTitle}</div>
			<Icon class="ui5-shellbar-menu-button-arrow" name={slimArrowDown} />
		</button>
	);
}

/**
 * Renders legacy title area (primaryTitle only).
 * Used when primaryTitle property is set but no branding slot.
 */
function ShellBarV2LegacyTitleArea(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.hasPrimaryTitle) {
		return null;
	}

	return (
		<div class="ui5-shellbar-headings">
			<h1 class="ui5-shellbar-title">
				<bdi>{legacy.primaryTitle}</bdi>
			</h1>
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
		<div class="ui5-shellbar-legacy-branding ui5-shellbar-logo-area">
			{ShellBarV2LegacyLogoArea.call(this)}
			{ShellBarV2LegacyTitleArea.call(this)}
		</div>
	);
}

/**
 * Renders single logo on S breakpoint when no menu items.
 * Used on S breakpoint when no menu items and no branding slot.
 */
function ShellBarV2SingleLogo(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.hasLogo || !this.isSBreakPoint || legacy.hasMenuItems || this.hasBranding) {
		return null;
	}

	return (
		<span
			class="ui5-shellbar-logo"
			role={legacy.logoRole}
			aria-label={legacy.logoAriaLabel}
			tabIndex={0}
			onClick={legacy.handleLogoClick}
			onKeyDown={legacy.handleLogoKeydown}
			onKeyUp={legacy.handleLogoKeyup}
		>
			<slot name="logo"></slot>
		</span>
	);
}

/**
 * Renders legacy secondaryTitle.
 * Rendered separately from the logo area to match old shellbar structure.
 * Hidden on S breakpoint when menu items exist.
 */
function ShellBarV2LegacySecondaryTitle(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.showSecondaryTitle) {
		return null;
	}

	return (
		<h2 class="ui5-shellbar-secondary-title">
			{legacy.secondaryTitle}
		</h2>
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
	ShellBarV2SeparateLogo,
	ShellBarV2InteractiveMenuButton,
	ShellBarV2SingleLogo,
	ShellBarV2LegacyTitleArea,
	ShellBarV2LegacyBrandingArea,
	ShellBarV2LegacySecondaryTitle,
	ShellBarV2MenuButton,
	ShellBarV2MenuPopover,
};
