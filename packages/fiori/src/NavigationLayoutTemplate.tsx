import type NavigationLayout from "./NavigationLayout.js";

export default function NavigationLayoutTemplate(this: NavigationLayout) {
	return (
		<div class="ui5-nl-root">
			<header class="ui5-nl-header">
				<slot name="header"></slot>
			</header>
			<section class="ui5-nl-section">
				<div class="ui5-nl-side">
					<slot name="sideContent"></slot>
				</div>
				<div class="ui5-nl-content">
					<slot></slot>
				</div>
			</section>
		</div>
	);
}
