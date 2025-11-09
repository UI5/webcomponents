import Button from "@ui5/webcomponents/dist/Button.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import type ShellBarV2 from "./ShellBarV2.js";
import ShellBarV2Item from "./ShellBarV2Item.js";

import {
	ShellBarV2SearchField,
	ShellBarV2SearchFieldFullWidth
} from "./shellbarv2/templates/ShellBarSearchTemplate.js";

import {
	ShellBarV2SearchField as ShellBarV2SearchFieldLegacy,
	ShellBarV2SearchButton as ShellBarV2SearchButtonLegacy,
	ShellBarV2SearchFieldFullWidth as ShellBarV2SearchFieldFullWidthLegacy,
} from "./shellbarv2/templates/ShellBarSearchLegacyTemplate.js";

import {
	ShellBarV2LegacyBrandingArea,
} from "./shellbarv2/templates/ShellBarLegacyTemplate.js";

export default function ShellBarV2Template(this: ShellBarV2) {
	const isLegacySearch = !this.isSelfCollapsibleSearch;

	const SearchInBarTemplate = isLegacySearch ? ShellBarV2SearchFieldLegacy : ShellBarV2SearchField;
	const SearchFullWidthTemplate = isLegacySearch ? ShellBarV2SearchFieldFullWidthLegacy : ShellBarV2SearchFieldFullWidth;

	return (
		<>
			<header class="ui5-shellbar-root" part="root" onKeyDown={this._onKeyDown}>
				{/* Full-width search overlay */}
				{this.showFullWidthSearch && SearchFullWidthTemplate.call(this)}

				<div class="ui5-shellbar-wrapper">

					{this.hasStartButton && (
						<div class="ui5-shellbar-start-button">
							<slot name="startButton"></slot>
						</div>
					)}

					{this.hasBranding && (
						<div class={{
							"ui5-shellbar-branding-area": true,
							"ui5-shellbar-gap-start": this.hasStartButton,
						}}>
							<slot name="branding"></slot>
						</div>
					)}

					{/* Legacy branding (logo + primaryTitle) when no menu items */}
					{!this.hasBranding && ShellBarV2LegacyBrandingArea.call(this)}

					<div class="ui5-shellbar-overflow-container">
						<div class="ui5-shellbar-overflow-container-inner">

							{this.hasContent && (
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

							{this.hasSearchField && SearchInBarTemplate.call(this)}
							{this.hasSearchField && isLegacySearch && ShellBarV2SearchButtonLegacy.call(this)}

							<div class={`ui5-shellbar-actions-area ${!this.hasSearchField ? "ui5-shellbar-actions-area--no-search" : ""}`} role={this.actionsRole}>

								{this.getAction("assistant") && (
									<div class="ui5-shellbar-assistant-button ui5-shellbar-gap-start">
										<slot name="assistant"></slot>
									</div>
								)}

								{this.getAction("notifications") && (
									<Button
										class="ui5-shellbar-bell-button ui5-shellbar-action-button ui5-shellbar-gap-start"
										icon="bell"
										design="Transparent"
										onClick={this.handleNotificationsClick}
										tooltip={this.getActionText("notifications")}
										accessibilityAttributes={this.accInfo.notifications.accessibilityAttributes}
									>
										{this.getAction("notifications")?.count && (
											<ButtonBadge slot="badge" design="OverlayText" text={this.getAction("notifications")?.count} />
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

					{this.showOverflowButton && (
						<Button
							data-ui5-stable="overflow"
							id="ui5-shellbar-overflow-button"
							class="ui5-shellbar-overflow-button ui5-shellbar-action-button ui5-shellbar-gap-start"
							icon="overflow"
							design="Transparent"
							onClick={this.handleOverflowClick}
							tooltip={this.getActionText("overflow")}
							accessibilityAttributes={this.accInfo.overflow.accessibilityAttributes}
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

					{this.getAction("profile") && (
						<Button
							data-profile-btn
							data-ui5-stable="profile"
							class="ui5-shellbar-image-button ui5-shellbar-action-button ui5-shellbar-gap-start"
							design="Transparent"
							onClick={this._handleProfileClick}
							tooltip={this.getActionText("profile")}
							accessibilityAttributes={this.accInfo.profile.accessibilityAttributes}
						>
							<slot name="profile"></slot>
						</Button>
					)}

					{this.getAction("product-switch") && (
						<Button
							data-ui5-stable="product-switch"
							class="ui5-shellbar-button-product-switch ui5-shellbar-action-button ui5-shellbar-gap-start"
							icon="grid"
							design="Transparent"
							onClick={this._handleProductSwitchClick}
							tooltip={this.getActionText("product-switch")}
							accessibilityAttributes={this.accInfo.products.accessibilityAttributes}
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
				horizontalAlign="End"
			>
				<List separators="None" onClick={this.handleOverflowItemClick}>
					{this.overflowItems.map(item => {
						if (item.type === "action") {
							const actionData = item.data;
							return (
								<ShellBarV2Item
									key={item.id}
									icon={actionData.icon ? `sap-icon://${actionData.icon}` : ""}
									data-action-id={item.id}
									count={actionData.count}
									inOverflow={true}
									text={this.getActionText(item.id)}
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
