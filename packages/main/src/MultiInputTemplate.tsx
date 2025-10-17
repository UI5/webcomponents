import Icon from "./Icon.js";
import InputTemplate from "./InputTemplate.js";
import type MultiInput from "./MultiInput.js";
import Tokenizer from "./Tokenizer.js";
import valueHelp from "@ui5/webcomponents-icons/dist/value-help.js";

export default function MultiInputTemplate(this: MultiInput) {
	return [
		InputTemplate.call(this, { preContent, postContent }),
	];
}

function preContent(this: MultiInput) {
	return (
		<>
			<span id="hiddenText-nMore" class="ui5-hidden-text">{this._tokensCountText}</span>

			{this.showValueHelpIcon &&
				<span id="hiddenText-value-help" class="ui5-hidden-text">{this._valueHelpText}</span>
			}
			<Tokenizer
				class="ui5-multi-input-tokenizer"
				opener={this.morePopoverOpener}
				popoverMinWidth={this._inputWidth}
				hidePopoverArrow={true}
				expanded={this.tokenizerExpanded}
				onKeyDown={this._onTokenizerKeydown}
				onTokenDelete={this.tokenDelete}
				onFocusOut={this._tokenizerFocusOut}
				onShowMoreItemsPress={this._showMoreItemsPress}
			>
				{ this.tokens.map(token => <slot name={token._individualSlot}></slot>)}
			</Tokenizer>
		</>
	);
}

function postContent(this: MultiInput) {
	return (
		<>
			{this.showValueHelpIcon &&
				<Icon
					class="inputIcon"
					name={valueHelp}
					accessibleName={this.valueHelpLabel}
					onMouseUp={this.valueHelpMouseUp}
					onMouseDown={this.valueHelpMouseDown}
					onClick={this.valueHelpPress}
				/>
			}
		</>
	);
}
