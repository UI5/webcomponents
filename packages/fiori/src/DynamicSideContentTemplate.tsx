import type DynamicSideContent from "./DynamicSideContent.js";

export default function DynamicSideContentTemplate(this: DynamicSideContent) {
	return (
		<div
			class={this.classes.root}
			style={this.styles.root}
		>
			{this._isSideContentFirst ?
				<>
					{ sideContent.call(this) }
					{ mainContent.call(this) }
				</>
				:
				<>
					{ mainContent.call(this) }
					{ sideContent.call(this) }
				</>
			}
		</div>
	);
}

function mainContent(this: DynamicSideContent) {
	return (
		<div
			role="main"
			aria-label={this.accInfo.mainContent?.ariaLabel}
			class={this.classes.main}
			style={this.styles.main}
		>
			<slot></slot>
		</div>
	);
}

function sideContent(this: DynamicSideContent) {
	return (
		<aside
			role="complementary"
			aria-label={this.accInfo.sideContent?.ariaLabel}
			class={this.classes.side}
			style={this.styles.side}
		>
			<slot name="sideContent"></slot>
		</aside>
	);
}
