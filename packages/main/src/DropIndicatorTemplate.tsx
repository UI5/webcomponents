import type DropIndicator from "./DropIndicator.js";

export default function DropIndicatorTemplate(this: DropIndicator) {
	return <div class={{
		"ui5-di-rect": this.placement === "On",
		"ui5-di-needle": this.placement !== "On",
	}}></div>;
}
