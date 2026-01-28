import type ShellBarBranding from "./ShellBarBranding.js";

export default function ShellBarBrandingTemplate(this: ShellBarBranding) {
	return (
	  <a
			class="ui5-shellbar-branding-root"
			href={this.parsedRef}
			target={this.target}
			role={this._role}
			tabIndex={0}
			aria-label={this.accessibleNameText}
			onClick={this._onclick}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
	  >
			<span class="ui5-shellbar-logo">
				<slot name="logo"></slot>
			</span>

			{!this._isSBreakPoint && (
				<bdi class="ui5-shellbar-title">
					<slot></slot>
				</bdi>
			)}
	  </a>
	);
}
