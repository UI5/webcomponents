import { createReactComponent } from "@ui5/webcomponents-base";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";

const RangeSlider = createReactComponent(RangeSliderClass);

function App() {

  return (
    <>
        <RangeSlider start-value={20} end-value={60} min={0} max={100} step={5} />
    </>
  );
}

export default App;
