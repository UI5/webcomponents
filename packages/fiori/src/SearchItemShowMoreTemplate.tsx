import type SearchItemShowMore from "./SearchItemShowMore.js";

export default function SearchItemShowMoreTemplate(this: SearchItemShowMore) {
	return (
		<li
			class="ui5-li-root ui5-li--focusable ui5-search-item-show-more"
			role="option"
			tabindex={this._effectiveTabIndex}
			aria-selected={this.selected}
			onFocusIn={this._onfocusin}
			onFocusOut={this._onfocusout}
			onClick={this._onclick}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
		>
			<span class="ui5-search-item-show-more-text">{this.showMoreTextCount}</span>
		</li>
	);
}
