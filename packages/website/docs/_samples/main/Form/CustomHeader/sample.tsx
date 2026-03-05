import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";

const Bar = createComponent(BarClass);
const Button = createComponent(ButtonClass);
const Form = createComponent(FormClass);
const FormItem = createComponent(FormItemClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);
const Title = createComponent(TitleClass);

function App() {
  return (
    <>
      <style>{`
        ui5-bar {
        	box-shadow: none;
        }
      `}</style>
      <Form
        style={{ width: "800px" }}
        layout="S1 M2 L2 XL2"
        item-spacing="Large"
      >
        <Bar style={{ boxShadow: "none" }} design="Subheader" slot="header">
          <Title level="H4" slot="startContent">
            Address
          </Title>
          <Button slot="endContent">Action 1</Button>
          <Button slot="endContent">Action 2</Button>
        </Bar>

        <FormItem>
          <Label for="nameInp" slot="labelContent">
            Name:
          </Label>
          <Input value="Red Point Stores" id="nameInp" />
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
          <Label id="cityLbl" for="cityInp" slot="labelContent">
            ZIP Code/City:
          </Label>
          <Input id="cityInp" value="411" accessibleNameRef="cityLbl" />
          <Input value="Maintown" accessibleNameRef="cityLbl" />
        </FormItem>

        <FormItem>
          <Label for="wsInp" slot="labelContent">
            WebSite:
          </Label>
          <Input value="sap.com" id="wsInp" />
        </FormItem>

        <FormItem>
          <Label id="streetLbl" for="streetInp" slot="labelContent">
            Street:
          </Label>
          <Input id="streetInp" value="Main St" accessibleNameRef="streetLbl" />
          <Input
            id="streetNumberInp"
            value="1618"
            accessibleNameRef="streetLbl"
          />
        </FormItem>

        <FormItem>
          <Label for="delInp" slot="labelContent">
            Delivery address:
          </Label>
          <Input value="Newtown" id="delInp" />
        </FormItem>
      </Form>
    </>
  );
}

export default App;
