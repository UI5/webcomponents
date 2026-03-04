import { createReactComponent } from "@ui5/webcomponents-base";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";

const Slider = createReactComponent(SliderClass);

function App() {

  return (
    <>
        <Slider value={20} min={0} max={100} step={5} show-tooltip={true} />
    </>
  );
}

export default App;
