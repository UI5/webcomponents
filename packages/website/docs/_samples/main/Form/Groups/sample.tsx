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

export const Example = () => {
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
      <Text>S12 M12 L12 XL4</Text>
      <br />
      <Label showColon={true}>Page Size</Label>
      <Text id="txtLayout">L</Text>
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
          headerText="Supplier"
          layout="S1 M3 L4 XL4"
          labelSpan="S12 M12 L12 XL4"
        >
          <FormGroup headerText="Address">
            <FormItem>
              <Label slot="labelContent" showColon={true}>Name</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>ZIP Code/City</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Street</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Country</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>WebSite</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Contact">
            <FormItem>
              <Label slot="labelContent" showColon={true}>Twitter</Label>
              <Text>@sap</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Email</Label>
              <Link>john.smith@sap.com</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Tel</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>SMS</Label>
              <Link>+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Mobile</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Pager</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Fax</Label>
              <Link href="sap.com">+49 6227 747474</Link>
            </FormItem>
          </FormGroup>

          <FormGroup headerText="Other info">
            <FormItem>
              <Label slot="labelContent" showColon={true}>Name</Label>
              <Text>Red Point Stores</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>ZIP Code/City</Label>
              <Text>411 Maintown</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Street</Label>
              <Text>Main St 1618</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>Country</Label>
              <Text>Germany</Text>
            </FormItem>

            <FormItem>
              <Label slot="labelContent" showColon={true}>WebSite</Label>
              <Link href="sap.com">sap.com</Link>
            </FormItem>
          </FormGroup>
        </Form>
      </div>
    </>
  );
}
