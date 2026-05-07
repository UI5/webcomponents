import type ListItemBase from "./ListItemBase.js";
import type { AriaRole } from "@ui5/webcomponents-base/";

export default function ListItemBaseTemplate(this: ListItemBase, hooks?: { listItemContent: () => void }, injectedProps?: {
	role?: AriaRole,
	title?: string,
	ariaSetsize?: number,
	ariaPosinset?: number,
}) {
	const listItemContent = hooks?.listItemContent || defaultListItemContent;

	return (
		<li
			part="native-li"
			data-sap-focus-ref
			tabindex={this._effectiveTabIndex}
			class={this.classes.main}
			draggable={this.movable}
			role={injectedProps?.role}
			title={injectedProps?.title}
			{...(injectedProps?.ariaSetsize !== undefined && { "aria-setsize": injectedProps.ariaSetsize })}
			{...(injectedProps?.ariaPosinset !== undefined && { "aria-posinset": injectedProps.ariaPosinset })}
			onFocusIn={this._onfocusin}
			onKeyUp={this._onkeyup}
			onKeyDown={this._onkeydown}
			onClick={this._onclick}
		>
			{ listItemContent.call(this) }
		</li>
	);
}

function defaultListItemContent(this: ListItemBase) {
	return <div part="content" id={`${this._id}-content`} class="ui5-li-content">
		<div class="ui5-li-text-wrapper">
			<span part="title" class="ui5-li-title"><slot></slot></span>
		</div>
	</div>;
}
