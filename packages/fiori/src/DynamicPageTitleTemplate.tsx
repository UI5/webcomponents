import Icon from "@ui5/webcomponents/dist/Icon.js";
import type DynamicPageTitle from "./DynamicPageTitle.js";
import slimArrowDownIcon from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

export default function DynamicPageTitleTemplate(this: DynamicPageTitle) {
	return (
		<div class="ui5-dynamic-page-title-root">
			<span class="ui5-dynamic-page-title-focus-area"
				data-sap-focus-ref
				tabIndex={this._tabIndex}
				onKeyDown={this._onkeydown}
				onClick={this.onTitleClick}
				role={this._role}
				aria-expanded={this.forAriaExpanded}
				aria-labelledby={this._ariaLabelledBy}
				aria-describedby={this._ariaDescribedBy}
			></span>

			{this.hasSnappedTitleOnMobile ?
				<div id={`${this._id}-heading`}
					 class="ui5-dynamic-page--snapped-title-on-mobile"
				>
					<slot name="snappedTitleOnMobile"></slot>
					<Icon name={slimArrowDownIcon} mode="Decorative" />
				</div>
				: <>
					<div class="ui5-dynamic-page-title--top-area">
						<slot name="breadcrumbs"></slot>

						{this.mobileNavigationActions &&
						<slot name="navigationBar"></slot>
						}
					</div>
					<div class="ui5-dynamic-page-title--wrapper"
						onui5-_min-content-width-change={this.onMinContentWidthChange}
					>
						<div id={`${this._id}-heading`}
						 class="ui5-dynamic-page-title--heading"
						>
							<slot name={this.headingSlotName}></slot>
						</div>

						{this.hasContent &&
						<div class="ui5-dynamic-page-title--content"
							style={{
								"min-width": this.minContentWidth ? `${this.minContentWidth || 0}px` : undefined,
							}}
						>
							<slot></slot>
						</div>
						}

						<div class="ui5-dynamic-page-title--actions"
							style={{
								"min-width": this.minActionsWidth ? `${this.minActionsWidth || 0}px` : undefined,
							}}
						>
							<slot name="actionsBar"></slot>
							{!this.mobileNavigationActions && <>
								{this._needsSeparator &&
								<div class="ui5-dynamic-page-title--actions-separator"></div>
								}
								<slot name="navigationBar"></slot>
							</>}
						</div>
					</div>
					<div class="ui5-dynamic-page-title--subheading">
						<slot name={this.subheadingSlotName}></slot>
					</div>
				</>}

			<span id={`${this._id}-toggle-description`}
				class="ui5-hidden-text"
			>{this._ariaDescribedbyText}</span>
		</div>
	);
}
