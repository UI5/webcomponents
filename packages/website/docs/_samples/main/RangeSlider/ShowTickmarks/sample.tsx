import { createReactComponent } from "@ui5/webcomponents-base";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";

const RangeSlider = createReactComponent(RangeSliderClass);

function App() {

  return (
    <>
        <RangeSlider startValue={20} endValue={60} min={0} max={100} step={5} showTickmarks={true} />
        <RangeSlider startValue={20} endValue={60} min={0} max={100} step={5} showTickmarks={true} labelInterval={2} />
    </>
  );
}

export default App;
