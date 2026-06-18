import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";

const RangeSlider = createReactComponent(RangeSliderClass);

const tickmarks = [
  { value: 0, label: "Freezing" },
  { value: 25, label: "Cool" },
  { value: 50, label: "Warm" },
  { value: 75, label: "Hot" },
  { value: 100, label: "Boiling" },
];

function App() {
  return (
    <>
      <RangeSlider
        min={0}
        max={100}
        step={5}
        startValue={25}
        endValue={75}
        showTooltip={true}
        tickmarks={tickmarks}
      />
    </>
  );
}

export default App;
