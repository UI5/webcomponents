import type Tokenizer from "./Tokenizer.js";
import TokenizerPopoverTemplate from "./TokenizerPopoverTemplate.js";

export default function TokenizerTemplate(this: Tokenizer) {
	return (
		<>
			<div class="ui5-tokenizer-root">
				<div
					class="ui5-tokenizer--content"
					onClick={this._click}
					onMouseDown={this._onmousedown}
					onKeyDown={this._onkeydown}
					onFocusOut={this._onfocusout}
					onFocusIn={this._onfocusin}
					onui5-delete={this._delete}
					onui5-select={this.onTokenSelect}
				>
					<div class="ui5-tokenizer--list"
						role="listbox"
						aria-label={this.tokenizerLabel}
						aria-description={this.tokenizerAriaDescription}
						aria-disabled={this._ariaDisabled}
						aria-readonly={this._ariaReadonly}
					>
						{ this.tokens.map(token => <slot name={token._individualSlot}></slot>)}
					</div>

					{this.showEffectiveClearAll &&
					<span
						role="button"
						class="ui5-tokenizer--clear-all"
						onClick={this.handleClearAll}
					>{this._clearAllText}</span>
					}
				</div>

				{this.showNMore &&
					<span
						role="button"
						aria-haspopup="dialog"
						class="ui5-tokenizer-more-text"
						part="n-more-text"
						onClick={this._handleNMoreClick}
					>{this._nMoreText}</span>
				}
			</div>

			{/* Hidden span used to measure "+N more" / "N Items" button widths before
			    committing to a layout. Positioned out of flow so it never affects the
			    visible layout, causes scrollbars, or intercepts pointer events. */}
			<span
				aria-hidden="true"
				class="ui5-tokenizer-more-text ui5-tokenizer--measure-nmore"
				part="n-more-text"
			></span>

			{ TokenizerPopoverTemplate.call(this) }
		</>
	);
}
