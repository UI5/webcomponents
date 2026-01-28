import SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
import type Button from "./Button.js";

export default function ButtonTemplate(this: Button) {
	return (<>
		<SplitButton
			class="ui5-ai-button-inner"
			design={this.design}
			icon={this._stateIcon}
			disabled={this.disabled}
			_endIcon={this._stateEndIcon}
			_hideArrowButton={this._hideArrowButton}
			onClick={this._onClick}
			onArrowClick={this._onArrowClick}
			accessibilityAttributes={this._computedAccessibilityAttributes}
		>
			{this._hasText && (
				<div class="ui5-ai-button-text">{this._stateText}</div>
			)}
		</SplitButton>

		<SplitButton
			class="ui5-ai-button-hidden"
			design={this.design}
		/>
	</>);
}
