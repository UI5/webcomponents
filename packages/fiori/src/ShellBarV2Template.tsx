import Button from "@ui5/webcomponents/dist/Button.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type ShellBarV2 from "./ShellBarV2.js";
import type ShellBarV2Item from "./ShellBarV2Item.js";

function ShellBarV2SearchField(this: ShellBarV2) {
	return (
		// .ui5-shellbar-search-field-area is used to measure the width of
		// the search field. It must be present even if the search is in full-width mode.
		<div class="ui5-shellbar-search-field-area">
			{!this.showFullWidthSearch && (
				<slot name="searchField"></slot>
			)}
		</div>
	);
}

function ShellBarV2SearchFieldFullWidth(this: ShellBarV2) {
	return (
		<div class="ui5-shellbar-search-full-width-wrapper">
			<div class="ui5-shellbar-search-full-field">
				<slot name="searchField"></slot>
			</div>
			<Button
				class="ui5-shellbar-cancel-button"
				onClick={this.handleCancelButtonClick}
			>
				Cancel
			</Button>
		</div>
	);
}

export default function ShellBarV2Template(this: ShellBarV2) {
	return (
		<>
			<header class="ui5-shellbar-root" part="root" onKeyDown={this._onKeyDown}>
				{/* Full-width search overlay */}
				{this.showFullWidthSearch && ShellBarV2SearchFieldFullWidth.call(this)}

				<div class="ui5-shellbar-wrapper">

					{this.hasStartButton && (
						<div class="ui5-shellbar-start-button">
							<slot name="startButton"></slot>
						</div>
					)}

					{this.hasBranding && (
						<div class="ui5-shellbar-branding-area">
							<slot name="branding"></slot>
						</div>
					)}

					<div class="ui5-shellbar-overflow-container">
						<div class="ui5-shellbar-overflow-container-inner">

							{this.hasContent && (
								<div
									class="ui5-shellbar-content-area"
									role={this.contentRole}
									aria-label={this._contentItemsText}
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
												class="ui5-shellbar-content-item"
											>
												{packedSep.shouldPack && (
													<div class="ui5-shellbar-separator ui5-shellbar-separator-start"></div>
												)}
												<slot name={(item as any)._individualSlot}></slot>
											</div>
										);
									})}

									{/* Spacer: Grows to fill available space, used to measure if space is tight */}
									<div class="ui5-shellbar-spacer"></div>

									{/* End content items */}
									{this.endContent.map(item => {
										const packedSep = this.getPackedSeparatorInfo(item, false);
										return (
											<div
												key={(item as any)._individualSlot}
												id={(item as any)._individualSlot}
												class="ui5-shellbar-content-item"
											>
												<slot name={(item as any)._individualSlot}></slot>
												{packedSep.shouldPack && (
													<div class="ui5-shellbar-separator ui5-shellbar-separator-end"></div>
												)}
											</div>
										);
									})}

									{/* End separator */}
									{this.separatorConfig.showEndSeparator && (
										<div class="ui5-shellbar-separator ui5-shellbar-separator-end"></div>
									)}
								</div>
							)}

							{this.hasSearchField && ShellBarV2SearchField.call(this)}

							<div class={`ui5-shellbar-actions-area ${!this.hasSearchField ? "ui5-shellbar-actions-area--no-search" : ""}`} role={this.actionsRole}>

								{this.items.map(item => (
									<div
										key={item._id}
										class="ui5-shellbar-custom-item"
										data-ui5-stable={(item as any)._individualSlot}
									>
										{!item.inOverflow ? <slot name={(item as any)._individualSlot}></slot> : null}
									</div>
								))}

								{this.getAction("notifications") && (
									<Button
										class="ui5-shellbar-notifications-button"
										icon="bell"
										design="Transparent"
										onClick={this._handleNotificationsClick}
										tooltip={this._notificationsText}
										accessibilityAttributes={this.accInfo.notifications.accessibilityAttributes}
									>
										{this.getAction("notifications")?.count && (
											<span class="ui5-shellbar-badge">{this.getAction("notifications")?.count}</span>
										)}
									</Button>
								)}

								{this.getAction("assistant") && (
									<div class="ui5-shellbar-assistant-button">
										<slot name="assistant"></slot>
									</div>
								)}
							</div>
						</div>
					</div>

					{this.showOverflowButton && (
						<Button
							id="ui5-shellbar-overflow-button"
							class="ui5-shellbar-overflow-button"
							icon="overflow"
							design="Transparent"
							onClick={this.handleOverflowClick}
							tooltip={this._overflowText}
							accessibilityAttributes={this.accInfo.overflow.accessibilityAttributes}
						/>
					)}

					{this.getAction("product-switch") && (
						<Button
							class="ui5-shellbar-product-switch-button ui5-shellbar-no-overflow"
							icon="grid"
							design="Transparent"
							onClick={this._handleProductSwitchClick}
							tooltip={this._productsText}
							accessibilityAttributes={this.accInfo.products.accessibilityAttributes}
						/>
					)}

					{this.getAction("profile") && (
						<div
							class="ui5-shellbar-profile-button ui5-shellbar-no-overflow"
							onClick={this._handleProfileClick}
							role="button"
							tabIndex={0}
							aria-label={this._profileText}
							aria-haspopup={this.accInfo.profile.accessibilityAttributes.hasPopup}
							aria-expanded={this.accInfo.profile.accessibilityAttributes.expanded}
						>
							<slot name="profile"></slot>
						</div>
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
				<List separators="None">
					{this.overflowItems.map(item => {
						if (item.type === "action") {
							return (
								<ListItemStandard
									key={item.id}
									icon={item.data.icon ? `sap-icon://${item.data.icon}` : ""}
									data-action-id={item.id}
									type="Active"
									onClick={this.handleOverflowItemClick}
								>
									{this.getActionText(item.id)}
								</ListItemStandard>
							);
						}
						return <slot key={item.id} name={(item.data as ShellBarV2Item)._individualSlot}></slot>;
					})}
				</List>
			</Popover>
		</>
	);
}
