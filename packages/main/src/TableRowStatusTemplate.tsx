import Icon from "./Icon.js";
import "@ui5/webcomponents-icons/dist/sys-enter-2.js";
import "@ui5/webcomponents-icons/dist/error.js";
import "@ui5/webcomponents-icons/dist/alert.js";
import "@ui5/webcomponents-icons/dist/information.js";
import type RowStatus from "./types/RowStatus.js";
import type TableRowStatus from "./TableRowStatus.js";

const DEFAULT_ICONS: Record<`${RowStatus}`, string> = {
	Positive: "sys-enter-2",
	Negative: "error",
	Critical: "alert",
	Information: "information",
};

export default function TableRowStatusTemplate(this: TableRowStatus) {
	const icon = this.icon || (this.value && DEFAULT_ICONS[this.value]);
	const hasStatus = this.value != null || this.colorScheme != null;
	const renderTooltip = hasStatus && this._design === "Extended";
	return (
		<>
			<div id="status" part="status"></div>
			{ renderTooltip && <div id="status-tooltip" title={this._accessibleText}>
				{ icon && <Icon id="status-icon"
					name={icon}
					accessibleName={this._accessibleText}
				/> }
			</div> }
		</>
	);
}
