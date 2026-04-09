import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef } from "react";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Label = createReactComponent(LabelClass);
const Slider = createReactComponent(SliderClass);
const Text = createReactComponent(TextClass);

function App() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  const handleSliderUi5Input = () => {
    const width = (sliderRef.current!.value / 100) * 1500;
    containerRef.current!.style.width = `${width}px`;
  };

  return (
    <>
      <Label showColon={true}>Form Layout</Label>
      <Text>S1 M3 L4 XL4</Text>
      <br />
      <Label showColon={true}>Page Size</Label>
      <Text id="txtLayout">L</Text>
      <Slider
        ref={sliderRef}
        id="slider"
        value={85}
        onInput={handleSliderUi5Input}
      />

      <div
        ref={containerRef}
        id="container"
        style={{ maxWidth: "1500px", width: "1250px", overflowX: "auto" }}
      >
        <Form headerText="Address" layout="S1 M2 L2 XL2">
          <FormItem>
            <Label slot="labelContent" showColon={true}>Name</Label>
            <Text class="text">Red Point Stores</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent" showColon={true}>ZIP Code/City</Label>
            <Text class="text">411 Maintown</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent" showColon={true}>Street</Label>
            <Text class="text">Main St 1618</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent" showColon={true}>Country</Label>
            <Text class="text">Germany</Text>
          </FormItem>
        </Form>
      </div>
    </>
  );
}

export default App;
