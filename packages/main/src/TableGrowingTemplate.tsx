import type TableGrowing from "./TableGrowing.js";

export default function TableGrowingTemplate(this: TableGrowing) {
	return (
		<div
			id="button"
			tabindex={-1}
			data-ui5-growing-active={this._activeState}
			onClick={this.loadMore}
			onKeyDown={this._onKeydown}
			onKeyUp={this._onKeyup}
			onFocusOut={this._onFocusout}
			role="button"
			aria-labelledby="text subtext"
			aria-describedby="description">
			<span id="text">{this._buttonText}</span>
			{ this.subtext &&
				<span id="subtext">{this.subtext}</span>
			}
			<span id="description" class="ui5-hidden-text" aria-hidden="true">{this._buttonDescription}</span>
		</div>
	);
}
