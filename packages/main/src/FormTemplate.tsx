import type Form from "./Form.js";
import Title from "./Title.js";
import type { IFormItem } from "./Form.js";

export default function FormTemplate(this: Form) {
	return (
		<div
			class="ui5-form-root"
			role={this.effectiveAccessibleRole}
			aria-label={this.effectiveAccessibleName}
			aria-labelledby={this.effectiveАccessibleNameRef}
		>
			{this.hasHeader &&
				<div class="ui5-form-header" part="header">
					{this.hasCustomHeader ?
						<slot name="header"></slot>
						:
						<Title id={`${this._id}-header-text`} level={this.headerLevel}>{this.headerText}</Title>
					}
				</div>
			}

			{ this.hasGroupItems ? groupLayout.call(this) : layout.call(this) }
		</div>
	);
}

function groupLayout(this: Form) {
	return <div class="ui5-form-layout" part="layout">
		{ this.groupItemsInfo.map(groupItemInfo => {
			const groupItem = groupItemInfo.groupItem;
			return <div
				class={{
					"ui5-form-column": true,
					[`ui5-form-column-spanL-${groupItem.colsL}`]: true,
					[`ui5-form-column-spanXL-${groupItem.colsXl}`]: true,
					[`ui5-form-column-spanM-${groupItem.colsM}`]: true,
					[`ui5-form-column-spanS-${groupItem.colsS}`]: true,
				}}
				part="column"
			>
				{ this.itemSpacing === "Large" ?
					<div class="ui5-form-group" role="form" aria-labelledby={groupItemInfo.accessibleNameRef}>
						{ groupContent.call(this, groupItem) }
					</div>
					:
					<dl class="ui5-form-group" aria-labelledby={groupItemInfo.accessibleNameRef}>
						{ groupContent.call(this, groupItem) }
					</dl>
				}
			</div>;
		})}
	</div>;
}

function groupContent(this: Form, groupItem: IFormItem) {
	return <>
		{ groupItem.headerText &&
			<div class="ui5-form-group-heading">
				<Title id={`${groupItem._id}-group-header-text`} level={groupItem.headerLevel} size="H6">{groupItem.headerText}</Title>
			</div>
		}

		<div class="ui5-form-group-layout">
			<slot name={groupItem._individualSlot}></slot>
		</div>
	</>;
}

function layout(this: Form) {
	return (
		this.itemSpacing === "Large" ?
			<div class="ui5-form-layout" part="layout">
				{ layoutContent.call(this) }
			</div>
			:
			<dl class="ui5-form-layout" part="layout">
				{ layoutContent.call(this) }
			</dl>
	);
}

function layoutContent(this: Form) {
	return this.itemsInfo.map(itemInfo => {
		const item = itemInfo.item;
		return (
			<div class={{
				"ui5-form-item": true,
				[`ui5-form-item-span-${item.columnSpan}`]: item.columnSpan !== undefined,
			}}
			>
				<slot name={item._individualSlot}></slot>
			</div>
		);
	})
}
