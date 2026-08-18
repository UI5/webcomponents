import type OptionGroup from "./OptionGroup.js";
import type Option from "./Option.js";

export default function OptionGroupTemplate(this: OptionGroup) {
	return (
		<div
			class="ui5-option-group-root"
			role="group"
			aria-label={this.headerText}
			aria-roledescription={this._groupHeaderRoleDescription}
		>
			{this.headerText &&
				<div class="ui5-option-group-header" aria-hidden="true">
					{this.headerText}
				</div>
			}
			{this.items.map((item: Option) => <slot name={item._individualSlot}></slot>)}
		</div>
	);
}
