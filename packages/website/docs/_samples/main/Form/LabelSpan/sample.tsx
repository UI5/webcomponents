import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef } from "react";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createComponent(FormClass);
const FormItem = createComponent(FormItemClass);
const Label = createComponent(LabelClass);
const Slider = createComponent(SliderClass);
const Text = createComponent(TextClass);

function App() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  const handleSliderUi5Input = () => {
    const width = (sliderRef.current!.value / 100) * 1500;
    containerRef.current!.style.width = `${width}px`;
  };

  return (
    <>
      <style>{`
        ui5-form-item::part(layout) {
        	background: var(--sapHoverColor);
        }
        ui5-form-item::part(content) {
        	background: var(--sapAvatar_1_Background);
        }
      `}</style>
      <Label showColon={true}>Page Size</Label>
      <Text id="txtLayout">L</Text>
      <Label showColon={true}>Label Span</Label>
      <Text>S12 M4 L4 XL4</Text>
      <br />
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
        <Form headerText="Label Span: S12 M4 L4 XL4" labelSpan="S12 M4 L4 XL4">
          <FormItem>
            <Label slot="labelContent">Name:</Label>
            <Text class="text">Red Point Stores</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">ZIP Code/City:</Label>
            <Text class="text">411 Maintown</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">Street:</Label>
            <Text class="text">Main St 1618</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">Country:</Label>
            <Text class="text">Germany</Text>
          </FormItem>
        </Form>

        <br />
        <br />

        <Form headerText="Label Span: S12 M6 L6 XL6" labelSpan="S12 M6 L6 XL6">
          <FormItem>
            <Label slot="labelContent">Name:</Label>
            <Text class="text">Red Point Stores</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">ZIP Code/City:</Label>
            <Text class="text">411 Maintown</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">Street:</Label>
            <Text class="text">Main St 1618</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">Country:</Label>
            <Text class="text">Germany</Text>
          </FormItem>
        </Form>

        <br />
        <br />

        <Form
          headerText="Label Span: S12 M12 L12 XL12"
          labelSpan="S12 M12 L12 XL12"
        >
          <FormItem>
            <Label slot="labelContent">Name:</Label>
            <Text class="text">Red Point Stores</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">ZIP Code/City:</Label>
            <Text class="text">411 Maintown</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">Street:</Label>
            <Text class="text">Main St 1618</Text>
          </FormItem>

          <FormItem>
            <Label slot="labelContent">Country:</Label>
            <Text class="text">Germany</Text>
          </FormItem>
        </Form>
      </div>
    </>
  );
}

export default App;
