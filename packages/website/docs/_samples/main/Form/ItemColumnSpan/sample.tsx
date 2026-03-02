import { createReactComponent } from "@ui5/webcomponents-base";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";

const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Slider = createReactComponent(SliderClass);
const Text = createReactComponent(TextClass);
const TextArea = createReactComponent(TextAreaClass);

function App() {

  const handleUi5Input = () => {
    const width = (slider.value / 100 * 1500);
	container.style.width = `${width
  };

  return (
    <>
      <Label show-colon={true}>Form Layout</Label><Text>S2 M2 L2 XL2</Text></br>
        <Label show-colon={true}>Label Span</Label><Text>S12 M12 L12 XL12</Text></br>
        <Label show-colon={true}>Page Size</Label><Text id="txtLayout">М</Text>
        <Slider id="slider" value={53} />

        <div id="container" style={{ maxWidth: "1500px", width: "800px", overflowX: "auto" }}>
            <Form header-text="Personal Data" layout="S2 M2 L2 XL2" label-span="S12 M12 L12 XL12">
                <FormItem column-span={2}>
                    <Label required={true} htmlFor="nameInp" slot="labelContent">Name:</Label>
                    <Input id="nameInp" />
                </FormItem>

                <FormItem>
                    <Label htmlFor="addressInp" slot="labelContent">Address:</Label>
                    <Input id="addressInp" />
                </FormItem>

                <FormItem>
                    <Label required={true} htmlFor="countryInp" slot="labelContent">Country:</Label>
                    <Select id="countryInp">
                        <Option selected={true} >Argentina</Option>
                        <Option>Bulgaria</Option>
                        <Option>Denmark</Option>
                    </Select>
                </FormItem>

                <FormItem column-span={2}>
                    <Label htmlFor="additionalCommentsInp" slot="labelContent">Additional Comments:</Label>
                    <TextArea id="additionalCommentsInp" placeholder="Write your message here" show-exceeded-text={true} maxLength={10} />
                </FormItem>
            </Form>
        </div>
    </>
  );
}

export default App;
