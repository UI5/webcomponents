import type TabContainer from "./TabContainer.js";
import DropIndicator from "./DropIndicator.js";
import Button from "./Button.js";
import TabContainerPopoverTemplate from "./TabContainerPopoverTemplate.js";
import type Tab from "./Tab.js";

function contentArea(this: TabContainer) {
	return (
		<div
			class={{
				"ui5-tc__content": true,
				"ui5-tc__content--collapsed": this._contentCollapsed,
			}}
			part="content"
		>
			<div
				class="ui5-tc__contentItem"
				id="ui5-tc-content"
				hidden={this._selectedTab?.effectiveHidden}
				role="tabpanel"
				aria-labelledby={this._selectedTab?._id}
			>
				{this.items.map(item =>
					<slot name={(item as Tab)._effectiveSlotName}></slot>
				)}
			</div>
		</div>
	);
}

const defaultPartials = {
	contentArea,
};

export default function TabContainerTemplate(this: TabContainer, injectedPartials?: Partial<typeof defaultPartials>) {
	const partials = {
		...defaultPartials,
		...injectedPartials,
	};

	return (<>
		<div
			class={{
				"ui5-tc-root": true,
				"ui5-tc--textOnly": this.textOnly,
				"ui5-tc--withAdditionalText": this.withAdditionalText,
				"ui5-tc--standardTabLayout": this.standardTabLayout,
				"ui5-tc--noTabSelected": !this._selectedTab,
			}}
		>
			{this.tabsAtTheBottom && partials.contentArea.call(this)}

			<div
				class="ui5-tc__header"
				id={`${this._id}-header`}
				onFocusIn={this._onHeaderFocusin}
				onDragStart={this._onDragStart}
				onDragEnter={this._onHeaderDragEnter}
				onDragOver={this._onHeaderDragOver}
				onDrop={this._onHeaderDrop}
				onDragLeave={this._onHeaderDragLeave}
				part="tabstrip"
			>
				<div
					class="ui5-tc__overflow ui5-tc__overflow--start"
					onClick={this._onOverflowClick}
					onKeyDown={this._onOverflowKeyDown}
					hidden
				>
					{this.startOverflowButton.length ?
						<slot name="startOverflowButton"></slot>
						: // else
						<Button
							endIcon={this.overflowMenuIcon}
							data-ui5-stable="overflow-start"
							tooltip={this.overflowMenuTitle}
							accessibilityAttributes={this.overflowBtnAccessibilityAttributes}
						>
							{this._startOverflowText}
						</Button>
					}
				</div>

				<div
					id={ `${this._id}-tabStrip` }
					class="ui5-tc__tabStrip"
					role="tablist"
					aria-describedby={this.tablistAriaDescribedById}
					onClick={this._onTabStripClick}
					onKeyDown={this._onTabStripKeyDown}
					onKeyUp={this._onTabStripKeyUp}
				>
					{this.items.map(item =>
						(item as Tab).stripPresentation
					)}
				</div>

				<div
					class="ui5-tc__overflow ui5-tc__overflow--end"
					onClick={this._onOverflowClick}
					onKeyDown={this._onOverflowKeyDown}
					hidden
				>
					{this.overflowButton.length ?
						<slot name="overflowButton"></slot>
						:
						<Button
							endIcon={this.overflowMenuIcon}
							data-ui5-stable="overflow-end"
							tooltip={this.overflowMenuTitle}
							accessibilityAttributes={this.overflowBtnAccessibilityAttributes}
						>
							{this._endOverflowText}
						</Button>
					}
				</div>

				<DropIndicator orientation="Vertical" ownerReference={this}/>
			</div>

			{!this.tabsAtTheBottom && partials.contentArea.call(this)}

			{this.hasItems &&
				<span id={ `${this._id}-invisibleText` } class="ui5-hidden-text">{this.accInvisibleText}</span>
			}

		</div>

		{ TabContainerPopoverTemplate.call(this) }
	</>);
}
