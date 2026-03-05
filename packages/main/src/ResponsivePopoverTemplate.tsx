import decline from "@ui5/webcomponents-icons/dist/decline.js";
import PopoverTemplate from "./PopoverTemplate.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import Dialog from "./Dialog.js";
import Title from "./Title.js";
import Button from "./Button.js";

export default function ResponsivePopoverTemplate(this: ResponsivePopover) {
	if (!this._isPhone) {
		return PopoverTemplate.call(this);
	}

	return (
		<Dialog
			root-element
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			accessibleDescription={this.accessibleDescription}
			accessibleDescriptionRef={this.accessibleDescriptionRef}
			accessibleRole={this.accessibleRole}
			stretch={true}
			preventInitialFocus={this.preventInitialFocus}
			preventFocusRestore={this.preventFocusRestore}
			initialFocus={this.initialFocus}
			onBeforeOpen={this._beforeDialogOpen}
			onOpen={this._afterDialogOpen}
			onBeforeClose={this._beforeDialogClose}
			onClose={this._afterDialogClose}
			exportparts="content, header, footer"
			open={this.open}
		>
			{!this._hideHeader && <>
				{this.header.length ?
					<slot slot="header" name="header"></slot>
					:
					<div class={this.classes.header} slot="header">
						{this.headerText &&
							<Title
								level="H1"
								wrappingType="None"
								class="ui5-popup-header-text ui5-responsive-popover-header-text"
							>
								{this.headerText}
							</Title>
						}
						{!this._hideCloseButton &&
							<Button
								icon={decline}
								design="Transparent"
								accessibleName={this._closeDialogAriaLabel}
								onClick={this._dialogCloseButtonClick}
							></Button>
						}
					</div>
				}
			</>}

			<slot></slot>

			<slot slot="footer" name="footer"></slot>
		</Dialog>
	);
}
