import BusyIndicator from "./BusyIndicator.js";
import DropIndicator from "./DropIndicator.js";
import type List from "./List.js";

export default function ListTemplate(this: List) {
	return (
		<div
			class="ui5-list-root"
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onDragEnter={this._ondragenter}
			onDragOver={this._ondragover}
			onDrop={this._ondrop}
			onDragLeave={this._ondragleave}
			// events bubbling from slotted items
			onui5-_close={this.onItemClose}
			onui5-toggle={this.onItemToggle}
			onui5-request-tabindex-change={this.onItemTabIndexChange}
			onui5-_focused={this.onItemFocused}
			onui5-forward-after={this.onForwardAfter}
			onui5-forward-before={this.onForwardBefore}
			onui5-selection-requested={this.onSelectionRequested}
			onui5-focus-requested={this.onFocusRequested}
			onui5-_press={this.onItemPress}
		>
			<BusyIndicator
				id={`${this._id}-busyIndicator`}
				delay={this.loadingDelay}
				active={this.showBusyIndicatorOverlay}
				class="ui5-list-busy-indicator"
			>
				<div class="ui5-list-container">
					<span tabindex={-1} aria-hidden="true" class="ui5-list-start-marker"></span>

					{this.header.length > 0 && <slot name="header" />}

					{this.shouldRenderH1 &&
						<header id={this.headerID} class="ui5-list-header">
							{this.headerText}
						</header>
					}

					<div class="ui5-list-scroll-container">

						{this.hasData &&
							<div id={`${this._id}-before`} tabindex={0} role="none" class="ui5-list-focusarea"></div>
						}

						<span id={`${this._id}-modeLabel`} class="ui5-hidden-text">{this.ariaLabelModeText}</span>

						<ul id={`${this._id}-listUl`}
							class="ui5-list-ul"
							role={this.listAccessibleRole}
							aria-label={this.ariaLabelTxt}
							aria-labelledby={this.ariaLabelledBy}
							aria-description={this.ariaDescriptionText}
						>
							<slot></slot>

							{this.showNoDataText &&
								<li tabindex={0} id={`${this._id}-nodata`} class="ui5-list-nodata" role="listitem">
									<div id={`${this._id}-nodata-text`} class="ui5-list-nodata-text">
										{this.noDataText}
									</div>
								</li>
							}
						</ul>

						{ this.growsWithButton && moreRow.call(this) }

						{this.footerText &&
							<footer id={`${this._id}-footer`} class="ui5-list-footer">{this.footerText}</footer>
						}

						{this.hasData &&
							<div id={`${this._id}-after`} tabindex={0} role="none" class="ui5-list-focusarea"></div>
						}
					</div>
					<span tabindex={-1} aria-hidden="true" class="ui5-list-end-marker"></span>
				</div>
				<DropIndicator orientation="Horizontal" ownerReference={this}/>
			</BusyIndicator>
		</div>
	);
}

function moreRow(this: List) {
	return (
		<div class="ui5-growing-button" part="growing-button">
			<div
				id={`${this._id}-growing-btn`}
				role="button"
				tabindex={0}
				part="growing-button-inner"
				class={{
					"ui5-growing-button-inner": true,
					"ui5-growing-button-inner-active": this._loadMoreActive,
				}}
				aria-label={this.growingButtonAriaLabel}
				aria-labelledby={this.growingButtonAriaLabelledBy}
				aria-describedby={this.growingButtonAriaDescribedBy}
				onClick={this._onLoadMoreClick}
				onKeyDown={this._onLoadMoreKeydown}
				onKeyUp={this._onLoadMoreKeyup}
				onMouseDown={this._onLoadMoreMousedown}
				onMouseUp={this._onLoadMoreMouseup}
			>
				{this.loading &&
					<BusyIndicator
						delay={this.loadingDelay}
						part="growing-button-busy-indicator"
						class="ui5-list-growing-button-busy-indicator"
						active>
					</BusyIndicator>
				}
				<span id={`${this._id}-growingButton-text`} class="ui5-growing-button-text" growing-button-text>
					{this._growingButtonText}
				</span>
			</div>
			{this.accessibilityAttributes.growingButton?.description &&
				<span id={`${this._id}-growingButton-description`} class="ui5-hidden-text">
					{this.accessibilityAttributes.growingButton.description}
				</span>
			}
		</div>
	);
}
