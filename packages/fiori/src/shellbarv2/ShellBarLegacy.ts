import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import type ShellBarV2 from "../ShellBarV2.js";

type ShellBarV2LegacyDeps = {
	component: ShellBarV2;
	getShadowRoot: () => ShadowRoot | null;
};

/**
 * Controller for legacy ShellBar features that will be removed in future versions.
 * Handles: logo slot, primaryTitle/secondaryTitle properties, menuItems slot.
 */
class ShellBarV2Legacy {
	private component: ShellBarV2;
	private getShadowRoot: () => ShadowRoot | null;

	// Bound handlers for event listeners
	private handleMenuButtonClickBound = this.handleMenuButtonClick.bind(this);
	private handleLogoClickBound = this.handleLogoClick.bind(this);
	private handleLogoKeydownBound = this.handleLogoKeydown.bind(this);
	private handleLogoKeyupBound = this.handleLogoKeyup.bind(this);
	private handleMenuItemClickBound = this.handleMenuItemClick.bind(this);
	private handleMenuPopoverBeforeOpenBound = this.handleMenuPopoverBeforeOpen.bind(this);
	private handleMenuPopoverAfterCloseBound = this.handleMenuPopoverAfterClose.bind(this);

	constructor(deps: ShellBarV2LegacyDeps) {
		this.component = deps.component;
		this.getShadowRoot = deps.getShadowRoot;
	}

	/**
	 * Subscribe to events (if needed in the future).
	 */
	subscribe() {
		// No subscription needed for now
	}

	/**
	 * Unsubscribe from events.
	 */
	unsubscribe() {
		// No unsubscription needed for now
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
			menuPopover.opener = menuButton;
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
			const list = menuPopover.content[0] as any;
			if (list.focusFirstItem) {
				list.focusFirstItem();
			}
		}
	}

	handleMenuPopoverAfterClose() {
		this.component.menuPopoverOpen = false;
	}

	private getMenuPopover() {
		const shadowRoot = this.getShadowRoot();
		return shadowRoot?.querySelector(".ui5-shellbar-menu-popover") as any;
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

	/* ------------- Title Management -------------- */

	get hasPrimaryTitle(): boolean {
		return !!this.component.primaryTitle;
	}

	get hasSecondaryTitle(): boolean {
		return !!this.component.secondaryTitle;
	}

	get primaryTitle(): string {
		return this.component.primaryTitle || "";
	}

	get secondaryTitle(): string {
		return this.component.secondaryTitle || "";
	}

	/* ------------- Menu Button (Mobile) -------------- */

	get showMenuButton(): boolean {
		// Show menu button on S breakpoint if we have menu items or logo/title
		return this.component.isSBreakPoint && (this.hasMenuItems || this.hasLogo || this.hasPrimaryTitle);
	}

	get showLogoInMenuButton(): boolean {
		return this.hasLogo && this.component.isSBreakPoint;
	}

	get showTitleInMenuButton(): boolean {
		return this.hasPrimaryTitle && !this.showLogoInMenuButton;
	}

	get menuButtonAccessibilityAttributes() {
		return {
			hasPopup: this.hasMenuItems ? "menu" as const : undefined,
			expanded: this.hasMenuItems ? this.menuPopoverExpanded : undefined,
		};
	}

	/* ------------- Common -------------- */

	get shouldRenderLegacyBranding(): boolean {
		// Only render legacy branding if no modern branding slot is used
		return !this.component.hasBranding && (this.hasLogo || this.hasPrimaryTitle || this.hasSecondaryTitle);
	}
}

export default ShellBarV2Legacy;

