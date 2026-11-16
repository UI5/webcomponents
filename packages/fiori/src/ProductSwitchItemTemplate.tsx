import Icon from "@ui5/webcomponents/dist/Icon.js";
import type ProductSwitchItem from "./ProductSwitchItem.js";

export default function ProductSwitchItemTemplate(this: ProductSwitchItem) {
	return (
		<>
			{this.targetSrc ?
				<a
					data-sap-focus-ref
					class="ui5-product-switch-item-root"
					onFocusOut={this._onfocusout}
					onFocusIn={this._onfocusin}
					onMouseDown={this._onmousedown}
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
					href={this.targetSrc}
					target={this._effectiveTarget}
				>
					{ item.call(this) }
				</a>
				:
				<div
					role="listitem"
					class="ui5-product-switch-item-root"
					data-sap-focus-ref
					onFocusOut={this._onfocusout}
					onFocusIn={this._onfocusin}
					onMouseDown={this._onmousedown}
					onKeyDown={this._onkeydown}
					onKeyUp={this._onkeyup}
					tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
				>
					{ item.call(this) }
				</div>
			}
		</>
	);
}

function item(this: ProductSwitchItem) {
	return (
		<>
			{this.image && this.image.length > 0 ? (
				<span class="ui5-product-switch-item-image-placeholder">
					<slot name="image"></slot>
				</span>
			) : (
				this.icon &&
				<Icon
					class="ui5-product-switch-item-icon"
					name={this.icon}
				/>
			)}

			<span class="ui5-product-switch-item-text-content">
				{this.titleText &&
					<span class="ui5-product-switch-item-title">{this.titleText}</span>
				}
				{this.subtitleText &&
					<span class="ui5-product-switch-item-subtitle">{this.subtitleText}</span>
				}
			</span>
		</>
	);
}
