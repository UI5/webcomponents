import type TimelineItem from "./TimelineItem.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import TimelineLayout from "./types/TimelineLayout.js";

export default function TimelineItemTemplate(this: TimelineItem) {
	// Create accessible label with status information
	const accessibleLabel = this._getAccessibleLabel;

	return (
		<div class="ui5-tli-root">
			<div
				class={{
					"ui5-tli-indicator": true,
					"ui5-tli-indicator-short-line": this.forcedLineWidth === "ShortLineWidth",
					"ui5-tli-indicator-large-line": this.forcedLineWidth === "LargeLineWidth",
				}}
			>
				<div class="ui5-tli-icon-outer">
					{
						this.icon ?
							<Icon class="ui5-tli-icon" name={this.icon} mode="Decorative"/>
							:
							<div class="ui5-tli-dummy-icon-container"></div>
					}
				</div>
			</div>

			{!this.hideBubble &&
				<div
					data-sap-focus-ref
					class="ui5-tli-bubble"
					role={this.effectiveRole}
					tabindex={parseInt(this.forcedTabIndex)}
					aria-label={accessibleLabel}
					aria-description={this.timelineItemStateText}
				>
					<div class="ui5-tli-title">
						{ this.name && name.call(this) }
						<span>{this.titleText}</span>
					</div>

					<div class="ui5-tli-subtitle">{this.subtitleText}</div>

					{this.content &&
						<div class="ui5-tli-desc">
							<slot></slot>
						</div>
					}
					<span class={{
						"ui5-tli-bubble-arrow": true,
						"ui5-tli-bubble-arrow--left": this.layout === TimelineLayout.Vertical,
						"ui5-tli-bubble-arrow--top": this.layout === TimelineLayout.Horizontal,
					}}></span>
				</div>
			}
		</div>
	);
}

function name(this: TimelineItem) {
	return (
		<>
			{this.nameClickable ?
				<Link
					class="ui5-tli-title-name-clickable"
					wrappingType={this.layout === TimelineLayout.Horizontal ? "None" : "Normal"}
					onClick={this.onNamePress}
				>
					{this.name}&nbsp;
				</Link>
				:
				<span class="ui5-tli-title-name">{this.name}&nbsp;</span>
			}
		</>
	);
}
