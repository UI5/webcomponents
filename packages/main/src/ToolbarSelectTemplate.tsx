import type ToolbarSelect from "./ToolbarSelect.js";
import Select from "./Select.js";
import Option from "./Option.js";

export default function ToolbarSelectTemplate(this: ToolbarSelect) {
	return (
		<Select
			class={this.classes.root}
			style={this.styles}
			value={this.value}
			data-ui5-external-action-item-id={this._id}
			valueState={this.valueState}
			disabled={this.disabled}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			forcedTabIndex={this.forcedTabIndex}
			onClick={(...args) => this.onClick(...args)}
			onClose={(...args) => this.onClose(...args)}
			onOpen={(...args) => this.onOpen(...args)}
			onChange={(...args) => this.onChange(...args)}
		>
			{this.hasCustomLabel &&
				<slot name="label" slot="label">
				</slot>
			}
			{this.options.map((option, index) => (
				<Option
					selected={option.selected}
					data-ui5-external-action-item-index={index}
				>
					{option.textContent}
				</Option>
			))}
		</Select>);
}
