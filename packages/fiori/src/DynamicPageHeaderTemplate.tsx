import type DynamicPageHeader from "./DynamicPageHeader.js";

export default function DynamicPageHeaderTemplate(this: DynamicPageHeader) {
	return (
		<div class="ui5-dynamic-page-header-root" role="region">
			<slot></slot>
		</div>
	);
}
