import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type Wizard from "./Wizard.js";

export default function WizardPopoverTemplate(this: Wizard) {
	return (
		<ResponsivePopover
			horizontalAlign="Center"
			placement="Bottom"
			aria-label={this.actionSheetStepsText}
			class={{
				"ui5-wizard-responsive-popover": true,
				"ui5-wizard-popover": !isPhone(),
				"ui5-wizard-dialog": isPhone(),
			}}
			contentOnlyOnDesktop={true}
			preventFocusRestore={true}
			_hideHeader={true}
		>
			<ul class="ui5-wizard-responsive-popover-list">
				{this._groupedTabs.map(tab =>
					<li>
						<Button
							icon={tab.icon}
							disabled={tab.disabled}
							design="Transparent"
							data-ui5-header-tab-ref-id={tab.accInfo.ariaPosinset}
							onClick={this._onOverflowStepButtonClick}
						>{tab.titleText}</Button>
					</li>
				)}
			</ul>
			<div slot="footer" class="ui5-responsive-popover-footer">
				<Button
					design="Transparent"
					onClick={this._closeRespPopover}
				>{this._dialogCancelButtonText}</Button>
			</div>
		</ResponsivePopover>
	);
}
