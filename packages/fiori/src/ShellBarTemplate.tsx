import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import type ShellBar from "./ShellBar.js";
import ShellBarItem from "./ShellBarItem.js";

import {
	ShellBarSearchField,
	ShellBarSearchFieldFullWidth
} from "./shellbarv2/templates/ShellBarSearchTemplate.js";

import {
	ShellBarSearchField as ShellBarSearchFieldLegacy,
	ShellBarSearchButton as ShellBarSearchButtonLegacy,
	ShellBarSearchFieldFullWidth as ShellBarSearchFieldFullWidthLegacy,
} from "./shellbarv2/templates/ShellBarSearchLegacyTemplate.js";

import {
	ShellBarLegacyBrandingArea,
} from "./shellbarv2/templates/ShellBarLegacyTemplate.js";

export default function ShellBarTemplate(this: ShellBar) {
	const isLegacySearch = !this.isSelfCollapsibleSearch;

	const SearchInBarTemplate = isLegacySearch ? ShellBarSearchFieldLegacy : ShellBarSearchField;
	const SearchFullWidthTemplate = isLegacySearch ? ShellBarSearchFieldFullWidthLegacy : ShellBarSearchFieldFullWidth;

	const profileAction = this.getAction("profile");
	const overflowAction = this.getAction("overflow");
	const assistantAction = this.getAction("assistant");
	const notificationsAction = this.getAction("notifications");
	const productSwitchAction = this.getAction("products");

	const actionsAccInfo = this.actionsAccessibilityInfo;

	return (
		<>
			<header class="ui5-shellbar-root" part="root" onKeyDown={this._onKeyDown} aria-label={this.texts.shellbar}>
				{/* Full-width search overlay */}
				{this.showFullWidthSearch && SearchFullWidthTemplate.call(this)}

				<div class="ui5-shellbar-wrapper">

					{this.enabledFeatures.startButton && (
						<div class="ui5-shellbar-start-button ui5-shellbar-gap-end">
							<slot name="startButton"></slot>
						</div>
					)}

					{this.enabledFeatures.branding && (
						<div class="ui5-shellbar-branding-area">
							<slot name="branding"></slot>
						</div>
					)}

					{/* Legacy branding (logo + primaryTitle) when no menu items */}
					{!this.enabledFeatures.branding && ShellBarLegacyBrandingArea.call(this)}

					<div class="ui5-shellbar-overflow-container">
						<div class="ui5-shellbar-overflow-container-inner">

							{this.enabledFeatures.content && (
								<div
									class="ui5-shellbar-content-area ui5-shellbar-content-items"
									role={this.contentRole}
									aria-label={this.texts.contentItems}
								>
									{/* Start separator */}
									{this.separatorConfig.showStartSeparator && (
										<div class="ui5-shellbar-separator ui5-shellbar-separator-start"></div>
									)}

									{/* Start content items */}
									{this.startContent.map(item => {
										const packedSep = this.getPackedSeparatorInfo(item, true);
										return (
											<div
												key={(item as any)._individualSlot}
												id={(item as any)._individualSlot}
												class="ui5-shellbar-content-item ui5-shellbar-gap-start"
											>
												{packedSep.shouldPack && (
													<div class="ui5-shellbar-separator ui5-shellbar-separator-start"></div>
												)}
												<slot name={(item as any)._individualSlot}></slot>
											</div>
										);
									})}

									{/* Spacer: Grows to fill available space, used to measure if space is tight, should be in DOM always */}
									<div class="ui5-shellbar-spacer"></div>

									{/* End content items */}
									{this.endContent.map(item => {
										const packedSep = this.getPackedSeparatorInfo(item, false);
										return (
											<div
												key={(item as any)._individualSlot}
												id={(item as any)._individualSlot}
												class="ui5-shellbar-content-item ui5-shellbar-gap-start"
											>
												<slot name={(item as any)._individualSlot}></slot>
												{packedSep.shouldPack && (
													<div class="ui5-shellbar-separator ui5-shellbar-separator-end ui5-shellbar-gap-start"></div>
												)}
											</div>
										);
									})}

									{/* End separator */}
									{this.separatorConfig.showEndSeparator && (
										<div class="ui5-shellbar-separator ui5-shellbar-separator-end ui5-shellbar-gap-start"></div>
									)}
								</div>
							)}

							{this.enabledFeatures.search && SearchInBarTemplate.call(this)}
							{this.enabledFeatures.search && isLegacySearch && ShellBarSearchButtonLegacy.call(this)}

							<div class={`ui5-shellbar-actions-area ${!this.enabledFeatures.search ? "ui5-shellbar-actions-area--no-search" : ""}`} role={this.actionsRole}>

								{assistantAction && (
									<div class="ui5-shellbar-assistant-button ui5-shellbar-gap-start">
										<slot name="assistant"></slot>
									</div>
								)}

								{notificationsAction && (
									<Button
										data-ui5-stable={notificationsAction.stableDomRef}
										class="ui5-shellbar-bell-button ui5-shellbar-action-button ui5-shellbar-gap-start"
										icon={notificationsAction.icon}
										design="Transparent"
										onClick={this.handleNotificationsClick}
										tooltip={actionsAccInfo.notifications.title}
										accessibilityAttributes={actionsAccInfo.notifications.accessibilityAttributes}
									>
										{notificationsAction?.count && (
											<ButtonBadge slot="badge" design="OverlayText" text={notificationsAction?.count} />
										)}
									</Button>
								)}

								{/* Custom Items */}
								{this.items.map(item => (
									<div
										key={item._id}
										class="ui5-shellbar-custom-item ui5-shellbar-gap-start"
										data-ui5-stable={item.stableDomRef}
									>
										{!item.inOverflow ? <slot name={(item as any)._individualSlot}></slot> : null}
									</div>
								))}
							</div>
						</div>
					</div>

					{overflowAction && (
						<Button
							data-ui5-stable={overflowAction.stableDomRef}
							id="ui5-shellbar-overflow-button"
							class="ui5-shellbar-overflow-button ui5-shellbar-action-button ui5-shellbar-gap-start"
							icon={overflowAction.icon}
							design="Transparent"
							onClick={this.handleOverflowClick}
							tooltip={actionsAccInfo.overflow.title}
							accessibilityAttributes={actionsAccInfo.overflow.accessibilityAttributes}
						>
							{this.overflowBadge && (
								<ButtonBadge
									slot="badge"
									design={this.overflowBadge === " " ? "AttentionDot" : "OverlayText"}
									text={this.overflowBadge === " " ? "" : this.overflowBadge}
								/>
							)}
						</Button>
					)}

					{profileAction && (
						<Button
							data-profile-btn
							data-ui5-stable={profileAction.stableDomRef}
							class="ui5-shellbar-image-button ui5-shellbar-action-button ui5-shellbar-gap-start"
							design="Transparent"
							onClick={this.handleProfileClick}
							tooltip={actionsAccInfo.profile.title}
							accessibilityAttributes={actionsAccInfo.profile.accessibilityAttributes}
						>
							<slot name="profile"></slot>
						</Button>
					)}

					{productSwitchAction && (
						<Button
							data-ui5-stable={productSwitchAction.stableDomRef}
							class="ui5-shellbar-button-product-switch ui5-shellbar-action-button ui5-shellbar-gap-start"
							icon={productSwitchAction.icon}
							design="Transparent"
							onClick={this.handleProductSwitchClick}
							tooltip={actionsAccInfo.products.title}
							accessibilityAttributes={actionsAccInfo.products.accessibilityAttributes}
						></Button>
					)}

				</div>
			</header>

			{/* Overflow Popover */}
			<Popover
				class="ui5-shellbar-overflow-popover"
				open={this.overflowPopoverOpen}
				onClose={this.onPopoverClose}
				opener="ui5-shellbar-overflow-button"
				placement="Bottom"
				hideArrow={true}
				horizontalAlign={this.popoverHorizontalAlign} // TODO: add test
			>
				<List separators="None" onClick={this.handleOverflowItemClick}>
					{this.overflowItems.map(item => {
						if (item.type === "action") {
							const actionData = item.data;
							return (
								<ShellBarItem
									key={item.id}
									icon={actionData.icon ? `sap-icon://${actionData.icon}` : ""}
									data-action-id={item.id}
									count={actionData.count}
									inOverflow={true}
									text={this.getActionOverflowText(item.id)}
								/>
							);
						}
						return <slot key={item.id} name={item.data._individualSlot}></slot>;
					})}
				</List>
			</Popover>
		</>
	);
}
