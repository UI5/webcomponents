import directionArrows from "@ui5/webcomponents-icons/dist/direction-arrows.js";
import Icon from "./Icon.js";
import type SliderHandle from "./SliderHandle.js";

export default function SliderHandleTemplate(this: SliderHandle) {
	return (
		<div class="ui5-slider-handle-container">
			<Icon name={directionArrows}
				mode="Decorative"
				part="icon-slider"
				slider-icon
			></Icon>
		</div>
	);
}
