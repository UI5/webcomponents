import type RatingIndicator from "./RatingIndicator.js";
import type { Star } from "./RatingIndicator.js";
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";

export default function RatingIndicatorTemplate(this: RatingIndicator) {
	return (
		<>
		<div
			id={`${this._id}-root`}
			class="ui5-rating-indicator-root"
			role="slider"
			aria-roledescription={this._ariaRoleDescription}
			aria-valuemin={0}
			aria-valuenow={this.value}
			aria-valuemax={this.max}
			aria-valuetext={`${this.value} of ${this.max}`}
			aria-orientation="horizontal"
			aria-disabled={this._ariaDisabled}
			aria-readonly={this.ariaReadonly}
			aria-description={this._ariaDescription}
			data-ui5-has-tooltip={this.ratingTooltip ? `${this._id}-tooltip` : undefined}
			tabindex={this.effectiveTabIndex}
			onFocusIn={this._onfocusin}
			onClick={this._onclick}
			onKeyDown={this._onkeydown}
			aria-label={this._ariaLabel}
		>
			<ul class="ui5-rating-indicator-list" aria-hidden="true">
				{ this._stars.map(star => starLi.call(this, star))}
			</ul>
		</div>
		{ this.ratingTooltip &&
			// Review (double-announcement): a custom `tooltip` is announced via
			// `aria-description={this._ariaDescription}`; the default tooltip is
			// decorative. Either way no `aria-describedby` here. Tooltip is visual
			// only; `data-ui5-has-tooltip` drives the gesture.
			<Tooltip id={`${this._id}-tooltip`}>{this.ratingTooltip}</Tooltip>
		}
		</>
	);
}

function starLi(this: RatingIndicator, star: Star) {
	if (star.selected) {
		return (
			<li data-ui5-value={star.index} class="ui5-rating-indicator-item ui5-rating-indicator-item-sel">
				<Icon data-ui5-value={star.index} name={this.ratedIcon} />
			</li>
		);
	} if (star.halfStar) {
		return (
			<li class="ui5-rating-indicator-item ui5-rating-indicator-item-half">
				<div class="ui5-rating-indicator-half-icon-wrapper ui5-rating-indicator-half-icon-left">
					<Icon data-ui5-value={star.index} name={this.ratedIcon} />
				</div>
				<div class="ui5-rating-indicator-half-icon-wrapper ui5-rating-indicator-half-icon-right">
					<Icon data-ui5-value={star.index} name={this.unratedIcon} />
				</div>
			</li>
		);
	} if (this.readonly || this.displayOnly) {
		return (
			<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel">
				<Icon data-ui5-value={star.index} name={this.ratedIcon} />
			</li>
		);
	} if (this.disabled) {
		return (
			<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel">
				<Icon data-ui5-value={star.index} name={this.ratedIcon} />
			</li>
		);
	}
	return (
		<li data-ui5-value={star.index} class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel">
			<Icon data-ui5-value={star.index} name={this.unratedIcon}/>
		</li>
	);
}
