import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";

const RangeSlider = createReactComponent(RangeSliderClass);

export const Example = () => {
  return (
    <>
      <RangeSlider
        startValue={20}
        endValue={60}
        min={0}
        max={100}
        step={5}
        showTooltip={true}
      />
    </>
  );
}
