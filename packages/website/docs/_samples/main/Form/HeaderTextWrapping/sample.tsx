import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createComponent(FormClass);
const FormItem = createComponent(FormItemClass);
const Label = createComponent(LabelClass);
const Text = createComponent(TextClass);

function App() {
  return (
    <>
      <div id="container" style={{ maxWidth: "1500px", width: "300px", overflowX: "auto" }}>
            <Form class="addressForm" headerText="A very long header title for the form and more">
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
