import type NotificationListGroupItem from "./NotificationListGroupItem.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import NotificationListGroupList from "./NotificationListGroupList.js";

export default function NotificationListItemTemplate(this: NotificationListGroupItem) {
	return (
		<li
			class="ui5-nli-group-root ui5-nli-focusable"
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
			aria-labelledby={this.ariaLabelledBy}
			aria-description={this.accInvisibleText}
			aria-level={1}
		>
			{this.loading && (
				<span
					id={`${this._id}-loading`}
					class="ui5-hidden-text"
				>
					{this.loadingText}
				</span>
			)}
			<div class="ui5-nli-group-content-wrapper">
				<div
					class={{
						"ui5-nli-group-header": true,
						"ui5-nli-group-header-expanded": this._expanded,
					}}
					onClick={this._onHeaderToggleClick}
					onKeyDown={this._onkeydown}
					role="button"
					aria-expanded={this._expanded}
					aria-controls={`${this._id}-notificationsList`}
					data-ui5-tooltip={this.toggleIconAccessibleName}>
					<Icon
						name={this.groupCollapsedIcon}
						class="ui5-nli-group-toggle-icon"
						mode="Decorative"
					/>
					<div
						id={`${this._id}-title-text`}
						class="ui5-nli-group-title-text"
						part="title-text"
						role="heading"
						aria-level={2}
					>
						{this.titleText}
					</div>
					<div class="ui5-nli-group-divider"></div>
				</div>
				<NotificationListGroupList
					id={`${this._id}-notificationsList`}
					class="ui5-nli-group-items"
					accessibleNameRef={`${this._id}-title-text`}
					growing={this.growing}
					loading={this.loading}
					loadingDelay={this.loadingDelay}
					onLoadMore={this._onLoadMore}
				>
					<slot></slot>
				</NotificationListGroupList>
			</div>
		</li>
	);
}
