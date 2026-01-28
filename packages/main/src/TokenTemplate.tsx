import type Token from "./Token.js";
import Icon from "./Icon.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

export default function TokenTemplate(this: Token) {
	return (
		<div
			role="option"
			tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : -1}
			class="ui5-token--wrapper"
			aria-description={this.ariaDescription}
			aria-selected={this.selected}
			onClick={this._handleSelect}
			onFocusIn={this._focusin}
			onFocusOut={this._focusout}
			onKeyDown={this._keydown}
		>
			<span class="ui5-token--text">{this.text}</span>

			{!this.readonly &&
				<div class="ui5-token--icon">
					{this.closeIcon.length > 0 ?
						<slot name="closeIcon" onClick={this._delete}></slot>
						:
						<Icon
							name={decline}
							mode="Decorative"
							accessibleName={this.tokenDeletableText}
							showTooltip={true}
							onClick={this._delete}
							onMouseDown={this._onmousedown}
						/>
					}
				</div>
			}
		</div>
	);
}
