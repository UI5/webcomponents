import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
import type SliderHandle from "./SliderHandle.js";

export default function SliderHandleTemplate(this: SliderHandle) {
	return (
		<div class={{
			"ui5-slider-handle-container": true,
			"ui5-slider-handle": true,
			"ui5-slider-handle--start": this.handleType === "start",
			"ui5-slider-handle--end": this.handleType === "end",
		}}>
			<Icon name={directionArrows}
				mode="Decorative"
				part="icon"
				slider-icon
			></Icon>
		</div>
	);
}
