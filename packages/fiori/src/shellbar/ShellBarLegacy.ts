import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ShellBar from "../ShellBar.js";
import List from "@ui5/webcomponents/dist/List.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";

type ShellBarLegacyDeps = {
	component: ShellBar;
	getShadowRoot: () => ShadowRoot | null;
};

/**
 * Controller for legacy ShellBar features that will be removed in future versions.
 * Handles: logo slot, primaryTitle/secondaryTitle properties, menuItems slot.
 */
class ShellBarLegacy {
	private component: ShellBar;
	private getShadowRoot: () => ShadowRoot | null;

	// Bound handlers for event listeners
	handleLogoClickBound = this.handleLogoClick.bind(this);
	handleLogoKeyupBound = this.handleLogoKeyup.bind(this);
	handleLogoKeydownBound = this.handleLogoKeydown.bind(this);
	handleMenuItemClickBound = this.handleMenuItemClick.bind(this);
	handleMenuButtonClickBound = this.handleMenuButtonClick.bind(this);
	handleMenuPopoverBeforeOpenBound = this.handleMenuPopoverBeforeOpen.bind(this);
	handleMenuPopoverAfterCloseBound = this.handleMenuPopoverAfterClose.bind(this);

	constructor(deps: ShellBarLegacyDeps) {
		this.component = deps.component;
		this.getShadowRoot = deps.getShadowRoot;
	}

	/* ------------- Menu Management -------------- */

	handleMenuButtonClick() {
		const shadowRoot = this.getShadowRoot();
		if (!shadowRoot) {
			return;
		}

		const menuButton = shadowRoot.querySelector(".ui5-shellbar-menu-button");
		const menuPopover = this.getMenuPopover();

		if (menuPopover && menuButton) {
			menuPopover.opener = menuButton as HTMLElement;
			menuPopover.open = true;
		}
	}

	handleMenuItemClick(e: CustomEvent<ListItemClickEventDetail>) {
		const shouldContinue = this.component.fireDecoratorEvent("menu-item-click", {
			item: e.detail.item,
		});

		if (shouldContinue) {
			const menuPopover = this.getMenuPopover();
			if (menuPopover) {
				menuPopover.open = false;
			}
		}
	}

	handleMenuPopoverBeforeOpen() {
		this.component.menuPopoverOpen = true;
		const menuPopover = this.getMenuPopover();
		if (menuPopover?.content && menuPopover.content.length) {
			const list = menuPopover.content[0];
			if (list instanceof List) {
				list.focusFirstItem();
			}
		}
	}

	handleMenuPopoverAfterClose() {
		this.component.menuPopoverOpen = false;
	}

	private getMenuPopover() {
		const shadowRoot = this.getShadowRoot();
		return shadowRoot?.querySelector<Popover>(".ui5-shellbar-menu-popover");
	}

	get hasMenuItems(): boolean {
		return this.component.menuItems.length > 0;
	}

	get menuPopoverExpanded(): boolean {
		return this.component.menuPopoverOpen;
	}

	/* ------------- Logo Management -------------- */

	handleLogoClick() {
		const shadowRoot = this.getShadowRoot();
		if (!shadowRoot) {
			return;
		}

		const logoElement = shadowRoot.querySelector(".ui5-shellbar-logo");
		if (logoElement) {
			this.component.fireDecoratorEvent("logo-click", {
				targetRef: logoElement as HTMLElement,
			});
		}
	}

	handleLogoKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			return;
		}

		if (isEnter(e)) {
			this.handleLogoClick();
		}
	}

	handleLogoKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.handleLogoClick();
		}
	}

	get hasLogo(): boolean {
		return this.component.logo.length > 0;
	}

	get logoRole(): "button" | "link" {
		return this.component.accessibilityAttributes.logo?.role || "link";
	}

	get logoAriaLabel(): string {
		return this.component.accessibilityAttributes.logo?.name || "Logo";
	}

	get brandingText(): string {
		return this.component.accessibilityAttributes.branding?.name || this.primaryTitle;
	}

	/* ------------- Title Management -------------- */

	get hasPrimaryTitle(): boolean {
		return !!this.component.primaryTitle;
	}

	get hasSecondaryTitle(): boolean {
		return !!this.component.secondaryTitle;
	}

	get showSecondaryTitle(): boolean {
		return this.hasSecondaryTitle && !this.component.isSBreakPoint;
	}

	get primaryTitle(): string {
		return this.component.primaryTitle || "";
	}

	get secondaryTitle(): string {
		return this.component.secondaryTitle || "";
	}

	/* ------------- Menu Button -------------- */

	get showMenuButton(): boolean {
		return this.hasPrimaryTitle || this.showLogoInMenuButton;
	}

	get showLogoInMenuButton(): boolean {
		return this.hasLogo && this.isSBreakPoint;
	}

	get showTitleInMenuButton(): boolean {
		return this.hasPrimaryTitle && !this.showLogoInMenuButton;
	}

	/* ------------- Common -------------- */

	get isSBreakPoint(): boolean {
		return this.component.isSBreakPoint;
	}
}

export default ShellBarLegacy;
