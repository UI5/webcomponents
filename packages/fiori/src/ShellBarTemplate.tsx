import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type ShellBar from "./ShellBar.js";
import ShellBarPopoverTemplate from "./ShellBarPopoverTemplate.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import ButtonBadge from "@ui5/webcomponents/dist/ButtonBadge.js";

export default function ShellBarTemplate(this: ShellBar) {
	return (
		<>
			<header
				class={this.classes.wrapper}
				aria-label={this._shellbarText}
				onKeyDown={this._onKeyDown}
				part="root">
				<div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-left">
					{this.startButton.length > 0 && <slot name="startButton"></slot>}

					{this.hasBranding && (
						<slot name="branding"></slot>
					)}

					{this.hasMenuItems && !this.hasBranding && (
						<>
							{!this.showLogoInMenuButton && this.hasLogo && singleLogo.call(this)}
							{this.showTitleInMenuButton && <h1 class="ui5-hidden-text">{this.primaryTitle}</h1>}
							{this.showMenuButton && (
								<>
									<button
										class={{
											"ui5-shellbar-menu-button": true,
											...this.classes.button,
										}}
										onClick={this._headerPress}
										aria-haspopup="menu"
										aria-expanded={this._menuPopoverExpanded}
										aria-label={this._brandingText}
										data-ui5-stable="menu"
										tabIndex={0}>
										{this.showLogoInMenuButton && (
											<span class="ui5-shellbar-logo" aria-label={this._logoText} title={this._logoText}>
												<slot name="logo"></slot>
											</span>
										)}
										{this.showTitleInMenuButton && (
											<div class="ui5-shellbar-menu-button-title">{this.primaryTitle}</div>
										)}
										<Icon class="ui5-shellbar-menu-button-arrow" name={slimArrowDown} />
									</button>
								</>
							)}
						</>
					)}

					{this.hasMenuItems && (
						// The secondary title remains visible when both menu items and the branding slot are present,
						// as the branding slot has higher priority and takes precedence in visibility.
						<>
							{this.secondaryTitle && !this.isSBreakPoint && (
								<div style={{ display: "block" }} class="ui5-shellbar-secondary-title" data-ui5-stable="secondary-title">
									{this.secondaryTitle}
								</div>
							)}
						</>
					)}

					{!this.hasMenuItems && (
						<>
							{this.isSBreakPoint && this.hasLogo && !this.hasBranding && singleLogo.call(this)}
							{!this.isSBreakPoint && (this.hasLogo || this.primaryTitle) && (
								<>
									{!this.hasBranding && combinedLogo.call(this)}
									{this.secondaryTitle && (this.primaryTitle || this.hasBranding) && (
										<h2 class="ui5-shellbar-secondary-title" data-ui5-stable="secondary-title">
											{this.secondaryTitle}
										</h2>
									)}
								</>
							)}
						</>
					)}
				</div>
				{this.hasMidContent && (
					<div class="ui5-shellbar-overflow-container ui5-shellbar-mid-content">
						<slot name="midContent"></slot>
					</div>
				)}
				<div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-right">
					<div class="ui5-shellbar-overflow-container-right-inner">
						{this.hasContentItems && (
							<div
								class="ui5-shellbar-content-items"
								role={this._contentItemsRole}
								aria-label={this._contentItemsText}
							>
								{this.showStartSeparator && (
									<div class={{
										"ui5-shellbar-separator": true,
										"ui5-shellbar-separator-start": true,
									}}></div>
								)}
								{this.startContent.map(item => {
									const itemInfo = this._contentInfo.find(info => info.id === (item as any)._individualSlot);
									return (
										<div key={(item as any)._individualSlot} id={(item as any)._individualSlot} class={itemInfo?.classes}>
											{this.shouldIncludeSeparator(itemInfo, this.startContentInfoSorted) && (
												// never displayed, only "packed" with last item that was hidden, used for measurement purposes
												<div class={{
													"ui5-shellbar-separator": true,
													"ui5-shellbar-separator-start": true,
												}}></div>
											)}
											<slot name={(item as any)._individualSlot}></slot>
										</div>
									);
								})}
								<div class="ui5-shellbar-spacer"></div>
								{this.endContent.map(item => {
									const itemInfo = this._contentInfo.find(info => info.id === (item as any)._individualSlot);
									return (
										<div key={(item as any)._individualSlot} id={(item as any)._individualSlot} class={itemInfo?.classes}>
											<slot name={(item as any)._individualSlot}></slot>
											{this.shouldIncludeSeparator(itemInfo, this.endContentInfoSorted) && (
												// never displayed, only "packed" with last item that was hidden, used for measurement purposes
												<div class={{
													"ui5-shellbar-separator": true,
													"ui5-shellbar-separator-end": true,
												}}></div>
											)}
										</div>
									);
								})}
								{this.showEndSeparator && (
									<div class={{
										"ui5-shellbar-separator": true,
										"ui5-shellbar-separator-end": true,
									}}></div>
								)}
							</div>
						)}
						{!this.hasContentItems && <div class="ui5-shellbar-spacer"></div>}
						<div class="ui5-shellbar-overflow-container-right-child" role={this._rightChildRole}>
							{this.hasSearchField && (
								<>
									{this.showFullWidthSearch && (
										<div class="ui5-shellbar-search-full-width-wrapper" style={this.styles.searchField}>
											<div class="ui5-shellbar-search-full-field">
												<slot name="searchField"></slot>
											</div>
											<Button
												onClick={this._handleCancelButtonPress}
												class="ui5-shellbar-button ui5-shellbar-cancel-button"
												data-ui5-stable="cancel-search">
												{this._cancelBtnText}
											</Button>
										</div>
									)}
									<div id={this.hasSelfCollapsibleSearch ? `${this._id}-item-1` : undefined} class={this.classes.searchField} style={this.styles.searchField}>
										<slot name="searchField"></slot>
									</div>
									{!(this.hasSelfCollapsibleSearch || this.hideSearchButton) && (
										<Button
											id={`${this._id}-item-1`}
											class={{
												"ui5-shellbar-button": true,
												"ui5-shellbar-search-button": true,
												"ui5-shellbar-search-item-for-arrow-nav": true,
												...this.classes.search,
											}}
											icon="sap-icon://search"
											data-ui5-text="Search"
											data-ui5-notifications-count={this.notificationsCount}
											data-ui5-stable="toggle-search"
											onClick={this._handleSearchIconPress}
											tooltip={this.accInfo.search.title}
											accessibilityAttributes={this.accInfo.search.accessibilityAttributes}
										/>
									)}
								</>
							)}
							{this.hasAssistant && (
								<div id={`${this._id}-assistant`} class={this.classes.assistant}>
									<slot name="assistant"></slot>
								</div>
							)}
							{this.showNotifications && (
								<Button
									id={`${this._id}-item-2`}
									class={{
										"ui5-shellbar-button": true,
										"ui5-shellbar-bell-button": true,
										"ui5-shellbar-items-for-arrow-nav": true,
										...this.classes.notification,
									}}
									icon="sap-icon://bell"
									data-ui5-text="Notifications"
									onClick={this._handleNotificationsPress}
									tooltip={this.accInfo.notifications.title}
									accessibilityAttributes={this.accInfo.notifications.accessibilityAttributes}
									data-ui5-stable="notifications"
								>
									{this.notificationsCount && (
										<ButtonBadge slot="badge" design="OverlayText" text={this.notificationsCount} />
									)}
								</Button>
							)}
							{this.customItemsInfo.map(item => (
								<Button
									key={item.id}
									id={item.id}
									class={`${item.classes} ui5-shellbar-items-for-arrow-nav`}
									icon={item.icon}
									tooltip={item.tooltip}
									data-ui5-notifications-count={this.notificationsCount}
									data-ui5-external-action-item-id={item.refItemid}
									data-ui5-stable={item.icon && !this.isIconHidden(item.icon) ? item.stableDomRef : undefined}
									onClick={item.press}
									accessibilityAttributes={item.accessibilityAttributes}
								>
									{item.count && (
										<ButtonBadge slot="badge" design="OverlayText" text={item.count} />
									)}
								</Button>
							))}
						</div>
					</div>
				</div>
				<Button
					id={`${this._id}-item-5`}
					class={{
						"ui5-shellbar-button": true,
						"ui5-shellbar-overflow-button": true,
						"ui5-shellbar-items-for-arrow-nav": true,
						...this.classes.overflow,
					}}
					icon="sap-icon://overflow"
					onClick={this._handleOverflowPress}
					tooltip={this._overflowText}
					accessibilityAttributes={this.accInfo.overflow.accessibilityAttributes}
					data-ui5-stable="overflow"
				>
					{this._overflowNotifications && (
						<ButtonBadge
							slot="badge"
							design={this._overflowNotifications === " " ? "AttentionDot" : "OverlayText"}
							text={this._overflowNotifications === " " ? "" : this._overflowNotifications}
						/>
					)}
				</Button>

				{this.hasProfile && profileButton.call(this)}
				{this.showProductSwitch && (
					<Button
						id={`${this._id}-item-4`}
						class="ui5-shellbar-no-overflow-button ui5-shellbar-button ui5-shellbar-button-product-switch ui5-shellbar-items-for-arrow-nav"
						icon="sap-icon://grid"
						data-ui5-text="Product Switch"
						onClick={this._handleProductSwitchPress}
						tooltip={this._productsText}
						aria-label={this._productSwitchBtnText}
						aria-haspopup="dialog"
						aria-expanded={this.accInfo.products.accessibilityAttributes.expanded}
						accessibilityAttributes={this.accInfo.products.accessibilityAttributes}
						data-ui5-stable="product-switch"
					/>
				)}
			</header>
			{ShellBarPopoverTemplate.call(this)}
		</>
	);
}

function profileButton(this: ShellBar) {
	return (
		<Button
			data-profile-btn
			id={`${this._id}-item-3`}
			onClick={this._handleProfilePress}
			tooltip={this._profileText}
			class="ui5-shellbar-button ui5-shellbar-image-button ui5-shellbar-no-overflow-button ui5-shellbar-items-for-arrow-nav"
			aria-label={this.imageBtnText}
			aria-haspopup="dialog"
			accessibilityAttributes={this.accInfo.profile.accessibilityAttributes}
			data-ui5-stable="profile"
		>
			<slot name="profile"></slot>
		</Button>
	);
}

function singleLogo(this: ShellBar) {
	return (
		<span
			role={this.accLogoRole}
			class="ui5-shellbar-logo"
			aria-label={this._logoText}
			title={this._logoText}
			onClick={this._logoPress}
			onKeyDown={this._logoKeydown}
			onKeyUp={this._logoKeyup}
			tabIndex={0}
			data-ui5-stable="logo">
			<slot name="logo"></slot>
		</span>
	);
}

function combinedLogo(this: ShellBar) {
	return (
		<div
			role={this.accLogoRole}
			class="ui5-shellbar-logo-area"
			onClick={this._logoPress}
			tabIndex={0}
			onKeyDown={this._logoKeydown}
			onKeyUp={this._logoKeyup}
			aria-label={this.accessibilityAttributes.branding?.name || this._logoAreaText}>
			{this.hasLogo && (
				<span
					class="ui5-shellbar-logo"
					title={this._logoText}
					data-ui5-stable="logo">
					<slot name="logo"></slot>
				</span>
			)}
			<div class="ui5-shellbar-headings">
				{this.primaryTitle && (
					<h1 class="ui5-shellbar-title">
						<bdi>{this.primaryTitle}</bdi>
					</h1>
				)}
			</div>
		</div>
	);
}
