import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type TableRowHighlight from "./TableRowHighlight.js";

const DEFAULT_ICONS: Record<string, string> = {
	Positive: "sys-enter-2",
	Negative: "error",
	Critical: "alert",
	Information: "information",
};

export default function TableRowHighlightTemplate(this: TableRowHighlight) {
	const icon = this.icon || DEFAULT_ICONS[this.type];
	const showIcon = this._design === "Extended" && this.type !== "None" && icon;
	return (
		<>
			<div id="highlight" part="highlight"></div>
			{ showIcon && <div id="highlight-tooltip" title={this._accessibleText}>
				<Icon id="highlight-icon"
					name={icon}
					accessibleName={this._accessibleText}
				/>
			</div> }
		</>
	);
}
