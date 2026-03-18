import type Form from "./Form.js";
import Title from "./Title.js";

export default function FormTemplate(this: Form) {
	return (
		<div
			class="ui5-form-root"
			role={this.effectiveAccessibleRole}
			aria-label={this.effectiveAccessibleName}
			aria-labelledby={this.effectiveАccessibleNameRef}
			style={{
				"--ui5-form-columns-s": this.columnsS,
				"--ui5-form-columns-m": this.columnsM,
				"--ui5-form-columns-l": this.columnsL,
				"--ui5-form-columns-xl": this.columnsXl,
				"--ui5-form-item-layout-S": this.getFormItemLayout("S"),
				"--ui5-form-item-layout-M": this.getFormItemLayout("M"),
				"--ui5-form-item-layout-L": this.getFormItemLayout("L"),
				"--ui5-form-item-layout-XL": this.getFormItemLayout("XL"),
			}}
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

			{this.hasGroupItems ? groupedItemsLayout.call(this) : standaloneItemsLayout.call(this)}
		</div>
	);
}

function groupedItemsLayout(this: Form) {
	return <div class="ui5-form-layout" part="layout">
		{this.groupItemsInfo.map(groupItemInfo => {
			const groupItem = groupItemInfo.groupItem;
			return <div
				class="ui5-form-column"
				style={{
					"--ui5-form-column-span-s": groupItem.colsS,
					"--ui5-form-column-span-m": groupItem.colsM,
					"--ui5-form-column-span-l": groupItem.colsL,
					"--ui5-form-column-span-xl": groupItem.colsXl,
				}}
				part="column"
			>
				<div class="ui5-form-group"
					role={groupItemInfo.role}
					aria-labelledby={groupItemInfo.accessibleNameRef}
					aria-label={groupItemInfo.accessibleName}
				>
					{groupItem.headerText &&
						<div class="ui5-form-group-heading">
							<Title id={`${groupItem._id}-group-header-text`} level={groupItem.headerLevel} size="H6">{groupItem.headerText}</Title>
						</div>
					}
					{this.accessibleMode === "Edit" ?
						<div class="ui5-form-group-layout">
							<slot name={groupItem._individualSlot}></slot>
						</div>
						:
						<dl class="ui5-form-group-layout" aria-labelledby={groupItemInfo.accessibleNameRefInner} aria-label={groupItemInfo.accessibleNameInner}>
							<slot name={groupItem._individualSlot}></slot>
						</dl>
					}
				</div>
			</div>;
		})}
	</div>;
}

function standaloneItemsLayout(this: Form) {
	return (
		this.accessibleMode === "Edit" ?
			<div class="ui5-form-layout" part="layout">
				{standaloneItemsLayoutContent.call(this)}
			</div>
			:
			<dl class="ui5-form-layout" part="layout">
				{standaloneItemsLayoutContent.call(this)}
			</dl>
	);
}

function standaloneItemsLayoutContent(this: Form) {
	return this.itemsInfo.map(itemInfo => {
		const item = itemInfo.item;
		return (
			<div class="ui5-form-item">
				<slot name={item._individualSlot}></slot>
			</div >
		);
	});
}
