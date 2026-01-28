import type {{INIT_PACKAGE_VAR_CLASS_NAME}} from "./{{INIT_PACKAGE_VAR_CLASS_NAME}}.js";

export default function {{INIT_PACKAGE_VAR_CLASS_NAME}}Template(this: {{INIT_PACKAGE_VAR_CLASS_NAME}}) {
	return (
		<div class="root" onClick={this.onClick}>
			{this.counterText} :: {this.count}
		</div>
	);
}
