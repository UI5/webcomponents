import Button from "./Button.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Title from "./Title.js";
import type Tokenizer from "./Tokenizer.js";

export default function TokenizerPopoverTemplate(this: Tokenizer) {
	return (
		<ResponsivePopover
			tokenizer-popover="true"
			open={this.open}
			opener={this.morePopoverOpener}
			style={{ "min-width": this.popoverMinWidth ? `${this.popoverMinWidth}px` : `${this.getBoundingClientRect().width}px` }}
			contentOnlyOnDesktop={true}
			preventFocusRestore={true}
			hideArrow={this.hidePopoverArrow}
			placement="Bottom"
			horizontalAlign="Start"
			onClose={this.handleAfterClose}
			onBeforeClose={this.handleBeforeClose}
			onBeforeOpen={this.handleBeforeOpen}
		>
			{this._isPhone &&
			<div slot="header" class="ui5-responsive-popover-header">
				<div class="row">
					<Title
						level="H1"
						wrappingType="None"
						class="ui5-responsive-popover-header-text"
					>
						{this.morePopoverTitle}
					</Title>
				</div>
			</div>
			}
			<List
				class="ui5-tokenizer-list"
				selectionMode={this._nMoreListMode}
				separators="None"
				onKeyDown={this._onPopoverListKeydown}
				onItemDelete={this.itemDelete}
			>
				{this._tokens
					.map(token => <ListItemStandard key={String(token._id)} data-ui5-token-ref-id={token._id} wrappingType="Normal" text={token.text}></ListItemStandard>)}
			</List>

			{this._isPhone &&
			<div slot="footer" class="ui5-responsive-popover-footer">
				<Button
					design="Emphasized"
					data-ui5-tokenizer-dialog-ok-button
					onClick={this.handleDialogButtonPress}
				>{this._okButtonText}</Button>
				<Button
					design="Transparent"
					class="ui5-responsive-popover-close-btn"
					onClick={this.handleDialogButtonPress}
				>{this._cancelButtonText}</Button>
			</div>
			}
		</ResponsivePopover>
	);
}
