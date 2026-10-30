import type Title from "./Title.js";
import Tooltip from "./Tooltip.js";

export default function TitleTemplate(this: Title) {
	return (
		<>
			{
				title.call(this, this.level)
			}
			{this._truncatedText &&
				<Tooltip
					text={this._truncatedText}
					horizontalAlign="Start"
					opener={this.getDomRef()}
				/>
			}
		</>
	);
}

function title(this: Title, titleLevel: string) {
	switch (titleLevel) {
	case "H1":
		return (
			<h1 class="ui5-title-root">
				{ titleInner.call(this) }
			</h1>
		);
	case "H2":
		return (
			<h2 class="ui5-title-root">
				{ titleInner.call(this) }
			</h2>
		);
	case "H3":
		return (
			<h3 class="ui5-title-root">
				{ titleInner.call(this) }
			</h3>
		);
	case "H4":
		return (
			<h4 class="ui5-title-root">
				{ titleInner.call(this) }
			</h4>
		);
	case "H5":
		return (
			<h5 class="ui5-title-root">
				{ titleInner.call(this) }
			</h5>
		);
	case "H6":
		return (
			<h6 id={`${this._id}-inner`} class="ui5-title-root">
				{ titleInner.call(this) }
			</h6>
		);
	default:
		return (
			<h2 class="ui5-title-root">
				{ titleInner.call(this) }
			</h2>
		);
	}
}

function titleInner(this: Title) {
	return (
		<span id={`${this._id}-inner`}>
			<slot></slot>
		</span>
	);
}
