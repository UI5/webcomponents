import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import type DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";

export default function DynamicPageHeaderActionsTemplate(this: DynamicPageHeaderActions) {
	return (
		<div class="ui5-dynamic-page-header-actions-root">
			<div class="ui5-dynamic-page-header-actions--wrapper">
				<Button
					class="ui5-dynamic-page-header-action ui5-dynamic-page-header-action-expand"
					onClick={this.onExpandClick}
					icon={this.arrowButtonIcon}
					accessibleName={this.expandLabel}
					accessibilityAttributes={this.accessibilityAttributes}
					tooltip={this.expandLabel}
					onMouseOver={this.onExpandHoverIn}
					onMouseOut={this.onExpandHoverOut}
				/>
				{this.showPinButton &&
					<ToggleButton
						class="ui5-dynamic-page-header-action ui5-dynamic-page-header-action-pin"
						onClick={this.onPinClick}
						icon={this.pinButtonIcon}
						pressed={this.pinned}
						accessibilityAttributes={this.accessibilityAttributes}
						accessibleName={this.pinLabel}
						tooltip={this.pinLabel}
					/>
				}
			</div>
		</div>
	);
}
