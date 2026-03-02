import { createReactComponent } from "@ui5/webcomponents-base";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Label = createReactComponent(LabelClass);
const Link = createReactComponent(LinkClass);
const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);
const Text = createReactComponent(TextClass);

function App() {

  const handleSelectionChange = () => {
    const selectedItem = swEditable.selectedItems[0].textContent;
	const editable = selectedItem === "Edit";

	// clear previous form items
	while (editableForm.firstChild) {
		editableForm.removeChild(editableForm.firstChild);
  };

  return (
    <>
      <SegmentedButton id="swEditable">
            <SegmentedButtonItem>Display</SegmentedButtonItem>
            <SegmentedButtonItem>Edit</SegmentedButtonItem>
        </SegmentedButton>

        <div id="container" style={{ maxWidth: "1500px", width: "1250px", overflowX: "auto" }}>
            <Form id="editableForm" header-text="Address" layout="S1 M2 L2 XL2" item-spacing="Large">

                <FormItem>
                    <Label slot="labelContent">Name:</Label>
                    <Text>Red Point Stores</Text>
                </FormItem>

                <FormItem>
                    <Label slot="labelContent">Country:</Label>
                    <Text>Germany</Text>
                </FormItem>

                <FormItem>
                    <Label slot="labelContent">ZIP Code/City:</Label>
                    <Text>411 Maintown</Text>
                </FormItem>

                <FormItem>
                    <Label htmlFor="wsInp" slot="labelContent">WebSite:</Label>
                    <Link href="sap.com">sap.com</Link>
                </FormItem>

                <FormItem>
                    <Label slot="labelContent">Street:</Label>
                    <Text>Main St 1618</Text>
                </FormItem>

                <FormItem>
                    <Label htmlFor="delInp" slot="labelContent">Delivery address:</Label>
                    <Text>Newtown</Text>
                </FormItem>
            </Form>
        </div>
    </>
  );
}

export default App;
