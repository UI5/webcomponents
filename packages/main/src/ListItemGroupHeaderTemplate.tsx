import type ListItemGroupHeader from "./ListItemGroupHeader.js";
import WrappingType from "./types/WrappingType.js";

export default function ListItemGroupHeaderTemplate(this: ListItemGroupHeader) {
	return (
		<div
			part="native-li"
			role={this.effectiveAccRole}
			tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
			class={{
				"ui5-ghli-root": true,
				...this.classes.main,
			}}
			aria-label={this.ariaLabelText}
			aria-roledescription={this.groupHeaderText}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
		>
			<div id={`${this._id}-content`} class="ui5-li-content">
				{renderTitle.call(this)}
			</div>

			{this.hasSubItems && <slot name="subItems"></slot>}
		</div>
	);
}

function renderTitle(this: ListItemGroupHeader) {
	if (this.wrappingType === WrappingType.Normal) {
		return this.expandableTextTemplate?.call(this, {
			className: "ui5-ghli-title",
			text: this._textContent,
			maxCharacters: this._maxCharacters,
			part: "title",
		});
	}

	return (
		<span part="title" class="ui5-ghli-title">
			<slot></slot>
		</span>
	);
}
