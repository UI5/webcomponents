import type FormItem from "./FormItem.js";

export default function FormItemTemplate(this: FormItem) {
	return (
		<div class="ui5-form-item-root">
			<div class="ui5-form-item-layout" part="layout">
				{ this.itemSpacing === "Large" ? content.call(this) : contentAsDefinitionList.call(this) }
			</div>
		</div>
	);
}

function content(this: FormItem) {
	return <>
		<div class="ui5-form-item-label" part="label">
			<slot name="labelContent"></slot>
		</div>
		<div class="ui5-form-item-content" part="content">
			{ content.call(this) }
		</div>
	</>;
}

function contentAsDefinitionList(this: FormItem) {
	return <>
		<dt class="ui5-form-item-label" part="label">
			<slot name="labelContent"></slot>
		</dt>
		<dd class="ui5-form-item-content" part="content">
			{ content.call(this) }
		</dd>
	</>;
}
