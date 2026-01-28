import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";
import Icon from "./Icon.js";
import IconDesign from "./types/IconDesign.js";
import type TableRowActionBase from "./TableRowActionBase.js";

export default function TableRowActionBaseTemplate(this: TableRowActionBase) {
	return (
		<>
			{ this.invisible ?
				<div></div>
				:
				this._isInteractive ?
					<Button
						icon={this._icon}
						tooltip={this._text}
						onClick={this._onActionClick}
						design={ButtonDesign.Transparent}
					></Button>
					:
					<Icon
						name={this._icon}
						accessibleName={this._text}
						showTooltip={true}
						design={IconDesign.NonInteractive}
					></Icon>
			}
		</>
	);
}
