import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";

const Slider = createComponent(SliderClass);

function App() {

  return (
    <>
        <Slider value={20} min={0} max={100} step={5} showTickmarks={true} />
        <Slider value={20} min={0} max={100} step={5} showTickmarks={true} labelInterval={2} />
    </>
  );
}

export default App;
