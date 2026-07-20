import type MenuSeparator from "./MenuSeparator.js";

export default function MenuSeparatorTemplate(this: MenuSeparator) {
	return (
		<li
			role="separator"
			class="ui5-menu-separator"
		/>
	);
}
