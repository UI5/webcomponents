import type Panel from "./Panel.js";
import Button from "./Button.js";
import Icon from "./Icon.js";

import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

export default function PanelTemplate(this: Panel) {
	return (<>
		<div
			class="ui5-panel-root"
			role={this.accRole}
			aria-label={this.effectiveAccessibleName}
			aria-labelledby={this.fixedPanelAriaLabelledbyReference}
		>
			{ this.hasHeaderOrHeaderText &&
				// header: either header or h1 with header text
				<div
					class={{
						"ui5-panel-heading-wrapper": true,
						"ui5-panel-heading-wrapper-sticky": this.stickyHeader,
					}}
					role={this.headingWrapperRole}
					aria-level={this.headingWrapperAriaLevel}
				>
					<div
						onClick={this._headerClick}
						onKeyDown={this._headerKeyDown}
						onKeyUp={this._headerKeyUp}
						onTouchStart={this._isMobile}
						onFocusOut={this._headerFocusOut}
						class="ui5-panel-header"
						tabindex={this.headerTabIndex}
						role={this.accInfo.role}
						aria-expanded={this.accInfo.ariaExpanded}
						aria-controls={this.accInfo.ariaControls}
						aria-labelledby={this.accInfo.ariaLabelledby}
						part="header"
					>
						{ !this.fixed &&
							<div class="ui5-panel-header-button-root">
								{ this._hasHeader ?
									<Button
										design="Transparent"
										class="ui5-panel-header-button ui5-panel-header-button-with-icon"
										onClick={this._toggleButtonClick}
										accessibilityAttributes={this.accInfo.button.accessibilityAttributes}
										tooltip={this.accInfo.button.title}
										accessibleName={this.accInfo.button.ariaLabelButton}
									>
										<div class="ui5-panel-header-icon-wrapper">
											<Icon
												class={{
													"ui5-panel-header-icon": true,
													"ui5-panel-header-button-animated": !this.shouldNotAnimate,
												}}
												name={slimArrowRight}
											>
											</Icon>
										</div>
									</Button>
									: // else
									<Icon
										class={{
											"ui5-panel-header-button": true,
											"ui5-panel-header-icon": true,
											"ui5-panel-header-button-animated": !this.shouldNotAnimate,
										}}
										name={slimArrowRight}
										showTooltip={true}
										accessibleName={this.toggleButtonTitle}
									/>
								}
							</div>
						}

						{ this._hasHeader ?
							<slot name="header"></slot>
							: // else
							<div
								id={ `${this._id}-header-title` }
								class="ui5-panel-header-title"
							>
								{ this.headerText }
							</div>
						}
					</div>
				</div>
			}

			{/* content area */}
			<div
				class="ui5-panel-content"
				id={ `${this._id}-content` }
				tabindex={ -1 }
				style={{
					display: this._contentExpanded ? "block" : "none",
				}}
				part="content"
			>
				<slot></slot>
			</div>
		</div>
	</>);
}
