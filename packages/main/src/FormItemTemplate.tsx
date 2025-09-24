import type FormItem from "./FormItem.js";
import type SlottedChild from "@ui5/webcomponents-base/dist/UI5Element.js";

export default function FormItemTemplate(this: FormItem) {
	return (
		<div class="ui5-form-item-root">
			<div class="ui5-form-item-layout" part="layout">
				<div class="ui5-form-item-label" part="label" role="term">
					<slot name="labelContent"></slot>
				</div>
				<div class="ui5-form-item-content" part="content" role="definition">
					{this.content.map(item =>
						<div class="ui5-form-item-content-child">
							<slot name={(item as SlottedChild)._individualSlot}></slot>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
