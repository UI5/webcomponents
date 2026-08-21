import type ExpandableText from "./ExpandableText.js";
import Text from "./Text.js";
import Link from "./Link.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";

export default function ExpandableTextTemplate(this: ExpandableText) {
	return (
		<div>
			<Text
				class="ui5-exp-text-text"
				emptyIndicatorMode={this.emptyIndicatorMode}
			>
				{this._displayedText}
			</Text>

			{this._maxCharactersExceeded && <>
				<span class="ui5-exp-text-ellipsis">{this._ellipsisText}</span>
				<Link
					id="toggle"
					class="ui5-exp-text-toggle"
					accessibleRole="Button"
					accessibleName={this._accessibleNameForToggle}
					accessibilityAttributes={this._accessibilityAttributesForToggle}
					onClick={this._handleToggleClick}
				>
					{this._textForToggle}
				</Link>

				{this._usePopover &&
					<ResponsivePopover
						open={this._expanded}
						opener="toggle"
						accessibleNameRef="popover-text"
						contentOnlyOnDesktop={true}
						_hideHeader={true}
						class="ui5-exp-text-popover"
						onClose={this._handlePopoverClose}
					>
						<Text class="ui5-exp-text-popover-text" id="popover-text">{this.text}</Text>
						<div
							slot="footer"
							class="ui5-exp-text-footer"
						>
							<Button
								design="Transparent"
								onClick={this._handleCloseButtonClick}
							>
								{this._closeButtonText}
							</Button>
						</div>
					</ResponsivePopover>
				}
			</>
			}
		</div>
	);
}
