import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";

const RangeSlider = createComponent(RangeSliderClass);

function App() {
  return (
    <>
      <RangeSlider startValue={20} endValue={60} min={0} max={100} step={5} />
    </>
  );
}

export default App;
