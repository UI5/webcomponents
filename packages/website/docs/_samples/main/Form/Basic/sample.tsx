import { createReactComponent } from "@ui5/webcomponents-base";
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
    const width = (sliderRef.current.value / 100 * 1500);
	containerRef.current.style.width = `${width}px`;
  };

  return (
    <>
      <Label show-colon={true}>Form Layout</Label><Text>S1 M3 L4 XL4</Text><br />
        <Label show-colon={true}>Page Size</Label><Text id="txtLayout">L</Text>
        <Slider ref={sliderRef} id="slider" value={85} onUi5Input={handleSliderUi5Input} />

        <div ref={containerRef} id="container" style={{ maxWidth: "1500px", width: "1250px", overflowX: "auto" }}>
            <Form header-text="Address" layout="S1 M2 L2 XL2">
                <FormItem>
                    <Label slot="labelContent">Name:</Label>
                    <Text className="text">Red Point Stores</Text>
                </FormItem>
            
                <FormItem>
                    <Label slot="labelContent">ZIP Code/City:</Label>
                    <Text className="text">411 Maintown</Text>
                </FormItem>
            
                <FormItem>
                    <Label slot="labelContent">Street:</Label>
                    <Text className="text">Main St 1618</Text>
                </FormItem>
    
                <FormItem>
                    <Label slot="labelContent">Country:</Label>
                    <Text className="text">Germany</Text>
                </FormItem>
            </Form>
        </div>
    </>
  );
}

export default App;
