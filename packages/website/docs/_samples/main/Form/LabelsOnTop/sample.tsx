import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef } from "react";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
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
      <Label showColon={true}>Label Span</Label>
      <Text>S12 M12 L12 XL12</Text>
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
        <Form
          id="testForm2"
          headerText="Labels on top"
          layout="S1 M2 L2 XL3"
          labelSpan="S12 M12 L12 XL12"
        >
          <FormItem>
            <Label for="nameInp" slot="labelContent">
              Name:
            </Label>
            <Input value="Red Point Stores" id="nameInp" />
          </FormItem>

          <FormItem>
            <Label id="cityLbl" for="cityInp" slot="labelContent">
              ZIP Code/City:
            </Label>
            <Input id="cityInp" value="411" accessibleNameRef="cityLbl" />
            <Input value="Maintown" accessibleNameRef="cityLbl" />
          </FormItem>

          <FormItem>
            <Label id="streetLbl" for="streetInp" slot="labelContent">
              Street:
            </Label>
            <Input
              id="streetInp"
              value="Main St"
              accessibleNameRef="streetLbl"
            />
            <Input
              id="streetNumberInp"
              value="1618"
              accessibleNameRef="streetLbl"
            />
          </FormItem>

          <FormItem>
            <Label id="countryLbl" for="countrySel" slot="labelContent">
              Country:
            </Label>
            <Select id="countrySel" accessibleNameRef="countryLbl">
              <Option>Australia</Option>
              <Option selected={true}>Germany</Option>
              <Option>England</Option>
            </Select>
          </FormItem>

          <FormItem>
            <Label for="wsInp" slot="labelContent">
              WebSite:
            </Label>
            <Input value="sap.com" id="wsInp" />
          </FormItem>

          <FormItem>
            <Label for="delInp" slot="labelContent">
              Delivery address:
            </Label>
            <Input value="Newtown" id="delInp" />
          </FormItem>
        </Form>
      </div>
    </>
  );
}

export default App;
