import type { SlottedChild } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type FormItem from "./FormItem.js";

export default function FormItemTemplate(this: FormItem) {
	return (
		<div class="ui5-form-item-root">
			<div class="ui5-form-item-layout" part="layout">
				{ this.accessibleMode === "Edit" ? content.call(this) : contentAsDefinitionList.call(this) }
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
			{this.content.map(item =>
				<div class="ui5-form-item-content-child">
					<slot name={(item as SlottedChild)._individualSlot}></slot>
				</div>
			)}
		</div>
	</>;
}

function contentAsDefinitionList(this: FormItem) {
	return <>
		<dt class="ui5-form-item-label" part="label">
			<slot name="labelContent"></slot>
		</dt>
		<dd class="ui5-form-item-content" part="content">
			{this.content.map(item =>
				<div class="ui5-form-item-content-child">
					<slot name={(item as SlottedChild)._individualSlot}></slot>
				</div>
			)}
		</dd>
	</>;
}
