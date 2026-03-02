import { createReactComponent } from "@ui5/webcomponents-base";
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

  const handleUi5Input = () => {
    const width = (slider.value / 100 * 1500);
	container.style.width = `${width
  };

  return (
    <>
      <Label show-colon={true}>Form Layout</Label><Text>S1 M3 L4 XL4</Text></br>
        <Label show-colon={true}>Label Span</Label><Text>S12 M12 L12 XL12</Text></br>
        <Label show-colon={true}>Page Size</Label><Text id="txtLayout">L</Text>
        <Slider id="slider" value={85} />

        <div id="container" style={{ maxWidth: "1500px", width: "1250px", overflowX: "auto" }}>
            <Form id="testForm2" header-text="Labels on top" layout="S1 M2 L2 XL3" label-span="S12 M12 L12 XL12">
                <FormItem>
                    <Label htmlFor="nameInp" slot="labelContent">Name:</Label>
                    <Input value="Red Point Stores" id="nameInp" />
                </FormItem>
    
                <FormItem>
                    <Label id="cityLbl" htmlFor="cityInp" slot="labelContent">ZIP Code/City:</Label>
                    <Input id="cityInp" value={411} accessible-name-ref="cityLbl" />
                    <Input value="Maintown" accessible-name-ref="cityLbl" />
                </FormItem>
    
                <FormItem>
                    <Label id="streetLbl" htmlFor="streetInp" slot="labelContent">Street:</Label>
                    <Input id="streetInp" value="Main St" accessible-name-ref="streetLbl" />
                    <Input id="streetNumberInp" value={1618} accessible-name-ref="streetLbl" />
                </FormItem>
    
                <FormItem>
                    <Label id="countryLbl" htmlFor="countrySel" slot="labelContent">Country:</Label>
                    <Select id="countrySel" accessible-name-ref="countryLbl">
                        <Option>Australia</Option>
                        <Option selected={true}>Germany</Option>
                        <Option>England</Option>
                    </Select>
                </FormItem>
    
                <FormItem>
                    <Label htmlFor="wsInp" slot="labelContent">WebSite:</Label>
                    <Input value="sap.com" id="wsInp" />
                </FormItem>
    
                <FormItem>
                    <Label htmlFor="delInp" slot="labelContent">Delivery address:</Label>
                    <Input value="Newtown" id="delInp" />
                </FormItem>
        </Form>
        </div>
    </>
  );
}

export default App;
