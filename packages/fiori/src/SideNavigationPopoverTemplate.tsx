import NavigationMenu from "./NavigationMenu.js";
import NavigationMenuItem from "./NavigationMenuItem.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import SideNavigation from "./SideNavigation.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";

export default function SideNavigationTemplate(this: SideNavigation) {
	const renderMenuItem = (item: SideNavigationItem | SideNavigationSubItem) => (
		<NavigationMenuItem
			accessibilityAttributes={item.accessibilityAttributes}
			text={item.text}
			icon={item.icon}
			design={item.design}
			disabled={item.disabled}
			href={item.href}
			target={item.target}
			title={item.title}
			tooltip={item._tooltip}
			ref={(el: HTMLElement | null) => {
				if (el && item.tag.length > 0) {
					if (!el.hasAttribute('data-tags-appended')) {
						item.tag.forEach((tagEl) => {
							const clonedTag = tagEl.cloneNode(true) as HTMLElement;
							clonedTag.slot = 'endContent';
							el.appendChild(clonedTag);
						});
						el.setAttribute('data-tags-appended', 'true');
					}
				}
				this.captureRef.bind(item)(el as any);
			}}
		>
			{item.children.length > 0 && !item.unselectable &&
				(<NavigationMenuItem
					class="ui5-navigation-menu-item-root-parent"
					accessibilityAttributes={item.accessibilityAttributes}
					text={item.text}
					design={item.design}
					disabled={item.disabled}
					href={item.href}
					target={item.target}
					title={item.title}
					tooltip={item._tooltip}
					ref={(el: HTMLElement | null) => {
						if (el && item.tag.length > 0) {
							if (!el.hasAttribute('data-tags-appended')) {
								item.tag.forEach((tagEl) => {
									const clonedTag = tagEl.cloneNode(true) as HTMLElement;
									clonedTag.slot = 'endContent';
									el.appendChild(clonedTag);
								});
								el.setAttribute('data-tags-appended', 'true');
							}
						}
						this.captureRef.bind(item)(el as any);
					}}
				>
				</NavigationMenuItem>)
			}

			{(item as any).items?.map(renderMenuItem)}
		</NavigationMenuItem>
	);

	return (<>
		<NavigationMenu
			id={`${this._id}-side-navigation-overflow-menu`}
			onBeforeOpen={this._onBeforeMenuOpen}
			onBeforeClose={this._onBeforeMenuClose}
			onClose={this._onMenuClose}
			class="ui5-side-navigation-popover ui5-side-navigation-overflow-menu"
		>
			{this._menuPopoverItems.map(renderMenuItem)}
		</NavigationMenu>
		<ResponsivePopover
			verticalAlign="Top"
			class="ui5-side-navigation-popover"
			hideArrow={true}
			accessibleNameRef={`${this._id}-sideNavigationPopoverText`}
			onOpen={this._onAfterPopoverOpen}
			onBeforeOpen={this._onBeforePopoverOpen}
			onBeforeClose={this._onBeforePopoverClose}
		>
			{this._popoverContents && <>
				<span id={`${this._id}-sideNavigationPopoverText`}
					class="ui5-hidden-text"
				>{this.accSideNavigationPopoverHiddenText}</span>
				<SideNavigation
					inPopover={true}
					class="ui5-side-navigation-in-popover"
				>
					<SideNavigationItem
						accessibilityAttributes={this._popoverContents.item.accessibilityAttributes}
						text={this._popoverContents.item.text}
						tooltip={this._popoverContents.item._tooltip}
						href={this._popoverContents.item._href}
						target={this._popoverContents.item._target}
						design={this._popoverContents.item.design}
						disabled={this._popoverContents.item.disabled}
						expanded={true}
						_fixed={true}
						selected={this._popoverContents.item.selected}
						unselectable={this._popoverContents.item.unselectable}
						onui5-click={this.handlePopupItemClick}
						ref={(el: HTMLElement | null) => {
							if (el && this._popoverContents.item.tag.length > 0) {
								// Only append if the element doesn't have our marker
								if (!el.hasAttribute('data-tags-appended')) {
									this._popoverContents.item.tag.forEach((tagEl) => {
										const clonedTag = tagEl.cloneNode(true) as HTMLElement;
										clonedTag.slot = 'tag';
										el.appendChild(clonedTag);
									});
									el.setAttribute('data-tags-appended', 'true');
								}
							}
							this.captureRef.bind(this._popoverContents.item)(el as SideNavigationItem | null);
						}}
					>
						{this._popoverContents.subItems.map(item =>
							<SideNavigationSubItem
								accessibilityAttributes={item.accessibilityAttributes}
								text={item.text}
								tooltip={item._tooltip}
								href={item._href}
								target={item._target}
								design={item.design}
								disabled={item.disabled}
								selected={item.selected}
								unselectable={item.unselectable}
								onui5-click={this.handlePopupItemClick}
								ref={(el: HTMLElement | null) => {
									if (el && item.tag.length > 0) {
										// Only append if the element doesn't have our marker
										if (!el.hasAttribute('data-tags-appended')) {
											item.tag.forEach((tagEl) => {
												const clonedTag = tagEl.cloneNode(true) as HTMLElement;
												clonedTag.slot = 'tag';
												el.appendChild(clonedTag);
											});
											el.setAttribute('data-tags-appended', 'true');
										}
									}
									this.captureRef.bind(item)(el as SideNavigationSubItem | null);
								}}
							>
							</SideNavigationSubItem>
						)}
					</SideNavigationItem>
				</SideNavigation>
			</>}
		</ResponsivePopover>
	</>);
}
