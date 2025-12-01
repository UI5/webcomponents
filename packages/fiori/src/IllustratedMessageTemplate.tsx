import Title from "@ui5/webcomponents/dist/Title.js";
import type IllustratedMessage from "./IllustratedMessage.js";

export default function IllustratedMessageTemplate(this: IllustratedMessage) {
	return (
		<div class="ui5-illustrated-message-root">
			<div class="ui5-illustrated-message-inner">
				<div class="ui5-illustrated-message-illustration">
					{renderIllustration.call(this)}
				</div>
				<div class="ui5-illustrated-message-text-and-actions-container">
					{this.hasTitle &&
						<div part="title" class="ui5-illustrated-message-title">
							{this.hasFormattedTitle ?
								<slot name="title"></slot>
								:
								<Title>{this.effectiveTitleText}</Title>
							}
						</div>
					}

					{this.hasSubtitle &&
						<div part="subtitle" class="ui5-illustrated-message-subtitle">
							{this.hasFormattedSubtitle ?
								<slot name="subtitle"></slot>
								:
								this.effectiveSubitleText
							}
						</div>
					}
					{this.hasActions &&
						<div class="ui5-illustrated-message-actions">
							<slot></slot>
						</div>
					}
				</div>
			</div>

			<svg xmlns="http://www.w3.org/2000/svg" class="ui5-illustrated-message-util">
				<defs>
					<pattern id="sapIllus_PatternShadow" data-name="sapIllus_PatternShadow" width="3" height="5.5"
						patternUnits="userSpaceOnUse" viewBox="0 0 3 5.5">
						<rect class="sapIllus_NoColor sapIllus_NoColor_Fill" width="3" height="5.5" />
						<circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cx="3"
							cy="5.5001" r="0.5" />
						<circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cy="5.5001"
							r="0.5" />
						<circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cx="1.5"
							cy="2.7501" r="0.5" />
						<circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cx="3"
							cy="0.0001" r="0.5" />
						<circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cy="0.0001"
							r="0.5" />
					</pattern>
					<pattern id="sapIllus_PatternHighlight" data-name="sapIllus_PatternHighlight" width="3" height="5.5"
						patternTransform="translate(35.9059 309.6208)" patternUnits="userSpaceOnUse" viewBox="0 0 3 5.5">
						<rect class="sapIllus_NoColor sapIllus_NoColor_Fill" width="3" height="5.5" />
						<circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="3.0001"
							cy="5.5001" r="0.5" />
						<circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="0.0001"
							cy="5.5001" r="0.5" />
						<circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="1.5001"
							cy="2.7501" r="0.5" />
						<circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="3.0001"
							cy="0.0001" r="0.5" />
						<circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="0.0001"
							cy="0.0001" r="0.5" />
					</pattern>
				</defs>
			</svg>
		</div>
	);
}

function renderIllustration(this: IllustratedMessage) {
	const illustration = this.effectiveIllustration;

	// Safe variant: render template
	if (illustration && typeof illustration === "object") {
		return illustration;
	}

	// Unsafe variant: render SVG string
	if (illustration && typeof illustration === "string") {
		return <div dangerouslySetInnerHTML={{ __html: illustration }}></div>;
	}

	return null;
}
