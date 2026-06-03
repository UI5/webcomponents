import type HeroBanner from "./HeroBanner.js";

export default function HeroBannerTemplate(this: HeroBanner) {
	const actionsBottomStart = this.actionsPlacement === "BottomStart";

	return (
		<div
			class="ui5-banner-root"
			role="banner"
			part="canvas"
		>
			<div class={{
				"ui5-banner-content": true,
				[`ui5-banner-layout-${this.layout}`]: true,
			}} part="content">
				<div class="ui5-banner-header" part="header">
					<div class="ui5-banner-header-text">
						{this.overlineText &&
							<div class="ui5-banner-overline">
								{this.overlineText}
							</div>
						}

						{this.headerText &&
							<h2 class="ui5-banner-heading">
								{this.headerText}
							</h2>
						}

						{actionsBottomStart && this._hasActions &&
							<div class="ui5-banner-actions ui5-banner-actions-bottom-start">
								<slot name="actions"></slot>
							</div>
						}
					</div>

					{!actionsBottomStart && this._hasActions &&
						<div class="ui5-banner-actions">
							<slot name="actions"></slot>
						</div>
					}
				</div>

				{this._hasStartContent &&
					<div class="ui5-banner-block ui5-banner-block-start" part="startContent">
						<slot></slot>
					</div>
				}

				{this._hasEndContent &&
					<div class="ui5-banner-block ui5-banner-block-end" part="endContent">
						<slot name="endContent"></slot>
					</div>
				}
			</div>
		</div>
	);
}
