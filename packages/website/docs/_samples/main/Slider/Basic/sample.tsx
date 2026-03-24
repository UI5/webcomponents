import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";

const Slider = createReactComponent(SliderClass);

export const Example = () => {
  return (
    <>
      <Slider value={20} min={0} max={100} step={5} />
    </>
  );
}
