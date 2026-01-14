import type DynamicPage from "./DynamicPage.js";
import DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";

export default function DynamicPageTemplate(this: DynamicPage) {
	return (
		<div class="ui5-dynamic-page-root">
			<div class="ui5-dynamic-page-scroll-container"
				onScroll={this.snapOnScroll}
			>
				<header
					class="ui5-dynamic-page-title-header-wrapper"
					id={`${this._id}-header`}
					aria-label={this.headerAriaLabel}
					onui5-toggle-title={this.onToggleTitle}
				>
					<slot name="titleArea"></slot>
					{this.headerInTitle &&
						<slot tabIndex={this.headerTabIndex}
							aria-hidden={this.headerAriaHidden}
							name="headerArea"
						></slot>
					}

					{this.actionsInTitle && headerActions.call(this)}
				</header>

				{this.headerInContent &&
					<slot tabIndex={this.headerTabIndex}
						aria-hidden={this.headerAriaHidden}
						name="headerArea"
					></slot>
				}

				{!this.actionsInTitle && headerActions.call(this)}

				<div
					part="content"
					class="ui5-dynamic-page-content"
					onFocusIn={this.onContentFocusIn}
					onFocusOut={this.onContentFocusOut}
				>
					<div class="ui5-dynamic-page-fit-content" part="fit-content">
						<slot></slot>
						{this.showFooter &&
							<div class="ui5-dynamic-page-spacer"></div>
						}
					</div>
				</div>
			</div>

			<div class="ui5-dynamic-page-footer" part="footer">
				<slot name="footerArea"></slot>
			</div>
		</div>
	);
}

function headerActions(this: DynamicPage) {
	if (!this.hasSnappedTitleOnMobile && this.hasHeading) {
		return (
			<DynamicPageHeaderActions
				snapped={this.headerSnapped}
				pinned={this.headerPinned}
				hidePinButton={this.hidePinButton}
				onui5-expand-button-click={this.onExpandClick}
				onui5-pin-button-click={this.onPinClick}
				onui5-expand-button-hover-in={this.onExpandHoverIn}
				onui5-expand-button-hover-out={this.onExpandHoverOut}
			/>
		);
	}
}
