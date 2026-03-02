import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Bar = createReactComponent(BarClass);
const Button = createReactComponent(ButtonClass);
const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Title = createReactComponent(TitleClass);

function App() {

  return (
    <>
      <Form style={{ width: "800px" }} layout="S1 M2 L2 XL2" item-spacing="Large">

                <Bar design="Subheader" slot="header">
                    <Title level="H4" slot="startContent">Address</Title>
                    <Button slot="endContent">Action 1</Button>
                    <Button slot="endContent">Action 2</Button>
                </Bar>

                <FormItem>
                    <Label htmlFor="nameInp" slot="labelContent">Name:</Label>
                    <Input value="Red Point Stores" id="nameInp" />
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
                    <Label id="cityLbl" htmlFor="cityInp" slot="labelContent">ZIP Code/City:</Label>
                    <Input id="cityInp" value={411} accessible-name-ref="cityLbl" />
                    <Input value="Maintown" accessible-name-ref="cityLbl" />
                </FormItem>
        
                <FormItem>
                    <Label htmlFor="wsInp" slot="labelContent">WebSite:</Label>
                    <Input value="sap.com" id="wsInp" />
                </FormItem>
    
                <FormItem>
                    <Label id="streetLbl" htmlFor="streetInp" slot="labelContent">Street:</Label>
                    <Input id="streetInp" value="Main St" accessible-name-ref="streetLbl" />
                    <Input id="streetNumberInp" value={1618} accessible-name-ref="streetLbl" />
                </FormItem>
    
                <FormItem>
                    <Label htmlFor="delInp" slot="labelContent">Delivery address:</Label>
                    <Input value="Newtown" id="delInp" />
                </FormItem>
        </Form>
    </>
  );
}

export default App;
