import { createReactComponent } from "@ui5/webcomponents-base";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";

const Slider = createReactComponent(SliderClass);

function App() {

  return (
    <>
      <!-- playground-hide-end -->
        <Slider value={20} min={0} max={100} step={5} show-tickmarks={true} />
        <Slider value={20} min={0} max={100} step={5} show-tickmarks={true} label-interval={2} />
        <!-- playground-hide -->
        <script type="module" src="main.js"></script>
    </>
  );
}

export default App;
