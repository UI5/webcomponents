import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { useRef } from "react";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormGroupClass from "@ui5/webcomponents/dist/FormGroup.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createReactComponent(FormClass);
const FormGroup = createReactComponent(FormGroupClass);
const FormItem = createReactComponent(FormItemClass);
const Label = createReactComponent(LabelClass);
const Link = createReactComponent(LinkClass);
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
      <style>{`
        ui5-form::part(column) {
        	background: var(--sapHoverColor);
        }
      `}</style>
      <Label showColon={true}>Page Size</Label>
      <Text id="txtLayout">L</Text>
      <Label showColon={true}>Label Span</Label>
      <Text>S12 M12 L12 XL12</Text>
      <br />
      <Slider
        ref={sliderRef}
        id="slider"
        value={69}
        onInput={handleSliderUi5Input}
      />

      <div
        ref={containerRef}
        id="container"
        style={{ maxWidth: "1500px", width: "1035px", overflowX: "auto" }}
      >
        <Form
          headerText="Form Layout: S1 M1 L2 XL3 (default)"
          labelSpan="S12 M12 L12 XL12"
        >
          <FormGroup headerText="Address">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Contact">
            <FormItem>
              <Label slot="labelContent">Twitter:</Label>
              <Text>@sap</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Email:</Label>
              <Link>john.smith@sap.com</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Tel:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">SMS:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Mobile:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Pager:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Fax:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Other info">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>
        </Form>

        <br />
        <br />

        <Form
          headerText="Form Layout: S1 M2 L3 XL5"
          layout="S1 M2 L3 XL5"
          labelSpan="S12 M12 L12 XL12"
        >
          <FormGroup headerText="Address">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Contact">
            <FormItem>
              <Label slot="labelContent">Twitter:</Label>
              <Text>@sap</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Email:</Label>
              <Link>john.smith@sap.com</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Tel:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">SMS:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Mobile:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Pager:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Fax:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Other info">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>
        </Form>

        <br />
        <br />

        <Form
          headerText="Form Layout: S1 M2 L4 XL6"
          layout="S1 M2 L4 XL6"
          labelSpan="S12 M12 L12 XL12"
        >
          <FormGroup headerText="Address">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Contact">
            <FormItem>
              <Label slot="labelContent">Twitter:</Label>
              <Text>@sap</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Email:</Label>
              <Link>john.smith@sap.com</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Tel:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">SMS:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Mobile:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Pager:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Fax:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Other info">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>
        </Form>

        <br />
        <br />

        <Form
          headerText="Form Layout: S2 M3 L5 XL7"
          layout="S2 M3 L5 XL7"
          labelSpan="S12 M12 L12 XL12"
        >
          <FormGroup headerText="Address">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Contact">
            <FormItem>
              <Label slot="labelContent">Twitter:</Label>
              <Text>@sap</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Email:</Label>
              <Link>john.smith@sap.com</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Tel:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">SMS:</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Mobile:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Pager:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Fax:</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Other info">
            <FormItem>
              <Label slot="labelContent">Name:</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">ZIP Code/City:</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Street:</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">Country:</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent">WebSite:</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>
        </Form>
      </div>
    </>
  );
}

export default App;
