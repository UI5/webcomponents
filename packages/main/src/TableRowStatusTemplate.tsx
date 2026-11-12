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
	const showIcon = this._design === "Extended" && this.value !== undefined && icon;
	return (
		<>
			<div id="status" part="status"></div>
			{ showIcon && <div id="status-tooltip" title={this._accessibleText}>
				<Icon id="status-icon"
					name={icon}
					accessibleName={this._accessibleText}
				/>
			</div> }
		</>
	);
}
