import Icon from "@ui5/webcomponents/dist/Icon.js";
import List from "@ui5/webcomponents/dist/List.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import type ShellBarV2 from "../../ShellBarV2.js";

function ShellBarV2LegacyBrandingArea(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy) {
		return null;
	}

	return (
		<>
			{legacy.hasMenuItems && ShellBarV2InteractiveMenuButton.call(this)}
			{legacy.hasMenuItems && ShellBarV2LegacySecondaryTitle.call(this)}
			{!legacy.hasMenuItems && ShellBarV2LegacyTitleArea.call(this)}

			{/* Menu Popover (legacy) */}
			{ShellBarV2MenuPopover.call(this)}
		</>
	);
}

function ShellBarV2LegacyTitleArea(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy) {
		return null;
	}

	return (
		<>
			{!!(legacy.isSBreakPoint && legacy.hasLogo) && ShellBarV2SingleLogo.call(this)}
			{!legacy.isSBreakPoint && (legacy.hasLogo || legacy.primaryTitle) && (
				<>
					{ShellBarV2CombinedLogo.call(this)}
					{legacy.hasSecondaryTitle && legacy.hasPrimaryTitle && ShellBarV2LegacySecondaryTitle.call(this)}
				</>
			)}
		</>
	);
}

/**
 * Renders interactive menu button for non-S breakpoints.
 * Shows primaryTitle with arrow, opens menu popover.
 */
function ShellBarV2InteractiveMenuButton(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy) {
		return null;
	}

	return (
		<>
			{!legacy.showLogoInMenuButton && legacy.hasLogo && ShellBarV2SingleLogo.call(this)}
			{legacy.showTitleInMenuButton && <h1 class="ui5-hidden-text">{legacy.primaryTitle}</h1>}
			{legacy.showMenuButton && (
				<button
					class={{
						"ui5-shellbar-menu-button": true,
						"ui5-shellbar-menu-button--interactive": legacy.hasMenuItems,
					}}
					onClick={legacy.handleMenuButtonClickBound}
					aria-haspopup="menu"
					aria-expanded={legacy.menuPopoverExpanded}
					aria-label={legacy.brandingText}
					data-ui5-stable="menu"
					tabIndex={0}>
					{legacy.showLogoInMenuButton && (
						<span class="ui5-shellbar-logo" aria-label={legacy.logoAriaLabel} title={legacy.logoAriaLabel}>
							<slot name="logo"></slot>
						</span>
					)}
					{legacy.showTitleInMenuButton && (
						<div class="ui5-shellbar-menu-button-title">{legacy.primaryTitle}</div>
					)}
					<Icon class="ui5-shellbar-menu-button-arrow" name={slimArrowDown} />
				</button>
			)}
		</>
	);
}

/**
 * Renders single logo on S breakpoint when no menu items.
 * Used on S breakpoint when no menu items and no branding slot.
 */
function ShellBarV2SingleLogo(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy) {
		return null;
	}

	return (
		<span
			role={legacy.logoRole}
			class="ui5-shellbar-logo ui5-shellbar-gap-end"
			aria-label={legacy.logoAriaLabel}
			title={legacy.logoAriaLabel}
			onClick={legacy.handleLogoClickBound}
			onKeyDown={legacy.handleLogoKeydownBound}
			onKeyUp={legacy.handleLogoKeyupBound}
			tabIndex={0}
			data-ui5-stable="logo">
			<slot name="logo"></slot>
		</span>
	);
}

function ShellBarV2CombinedLogo(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy) {
		return null;
	}

	return (
		<div
			role={legacy.logoRole}
			class="ui5-shellbar-logo-area"
			onClick={legacy.handleLogoClickBound}
			tabIndex={0}
			onKeyDown={legacy.handleLogoKeydownBound}
			onKeyUp={legacy.handleLogoKeyupBound}
			aria-label={legacy.logoAriaLabel}>
			{legacy.hasLogo && (
				<span
					class="ui5-shellbar-logo"
					title={legacy.logoAriaLabel}
					data-ui5-stable="logo">
					<slot name="logo"></slot>
				</span>
			)}
			<div class="ui5-shellbar-headings">
				{legacy.primaryTitle && (
					<h1 class="ui5-shellbar-title">
						<bdi>{legacy.primaryTitle}</bdi>
					</h1>
				)}
			</div>
		</div>
	);
}

function ShellBarV2LegacySecondaryTitle(this: ShellBarV2) {
	const legacy = this.legacyAdaptor;
	if (!legacy || !legacy.showSecondaryTitle) {
		return null;
	}

	return (
		<div style={{ display: "block" }} class="ui5-shellbar-secondary-title ui5-shellbar-gap-start ui5-shellbar-gap-end" data-ui5-stable="secondary-title">
			{this.secondaryTitle}
		</div>
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
		<Popover class="ui5-shellbar-menu-popover"
			hideArrow={true}
			placement="Bottom"
			preventInitialFocus={true}
			onBeforeOpen={legacy.handleMenuPopoverBeforeOpenBound}
			onClose={legacy.handleMenuPopoverAfterCloseBound}
		>
			<List separators="None" selectionMode="Single" onItemClick={legacy.handleMenuItemClickBound}>
				<slot name="menuItems"></slot>
			</List>
		</Popover>
	);
}

export {
	ShellBarV2SingleLogo,
	ShellBarV2MenuPopover,
	ShellBarV2LegacyTitleArea,
	ShellBarV2LegacyBrandingArea,
	ShellBarV2LegacySecondaryTitle,
	ShellBarV2InteractiveMenuButton,
};
