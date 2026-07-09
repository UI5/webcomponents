import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";

const Slider = createReactComponent(SliderClass);

const tickmarks = [
  { value: 0, label: "Freezing" },
  { value: 2.5, label: "Room Temp" },
  { value: 5, label: "Warm" },
  { value: 7.5, label: "Hot" },
  { value: 10, label: "Boiling" },
];

function App() {
  return (
    <>
      <Slider
        min={0}
        max={10}
        step={0.5}
        value={2.5}
        showTooltip={true}
        tickmarks={tickmarks}
      />
    </>
  );
}

export default App;
