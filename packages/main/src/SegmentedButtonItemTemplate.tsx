import type SegmentedButtonItem from "./SegmentedButtonItem.js";
import Icon from "./Icon.js";

export default function SegmentedButtonItemTemplate(this: SegmentedButtonItem) {
	return (
		<li
			role="option"
			class="ui5-segmented-button-item-root"
			aria-posinset={this.posInSet}
			aria-setsize={this.sizeOfSet}
			aria-selected={this.selected}
			aria-disabled={this.disabled}
			aria-roledescription={this.ariaDescription}
			data-sap-focus-ref
			onClick={this._onclick}
			onKeyUp={this._onkeyup}
			tabindex={this.tabIndexValue ? parseInt(this.tabIndexValue) : undefined }
			aria-label={this.ariaLabelText}
			aria-description={this.ariaDescriptionText}
			title={this.tooltip || this.slotTextContent}
		>
			{this.icon &&
				<Icon
					part="icon"
					class="ui5-segmented-button-item-icon"
					name={this.icon}
					showTooltip={this.showIconTooltip}
				/>
			}
			<span id={`${this._id}-content`} class="ui5-segmented-button-item-text">
				<bdi>
					<slot></slot>
				</bdi>
			</span>
		</li>
	);
}
