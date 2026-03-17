import { useState } from "react";
import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import LinkClass from "@ui5/webcomponents/dist/Link.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const Link = createReactComponent(LinkClass);
const Option = createReactComponent(OptionClass);
const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);
const Select = createReactComponent(SelectClass);
const Text = createReactComponent(TextClass);

function App() {
  const [editable, setEditable] = useState(false);

  const handleSelectionChange = (
    e: UI5CustomEvent<SegmentedButtonClass, "selection-change">,
  ) => {
    const selectedItem = e.currentTarget.selectedItems[0].textContent;
    setEditable(selectedItem === "Edit");
  };

  return (
    <>
      <SegmentedButton
        id="swEditable"
        onSelectionChange={handleSelectionChange}
      >
        <SegmentedButtonItem selected={true}>Display</SegmentedButtonItem>
        <SegmentedButtonItem>Edit</SegmentedButtonItem>
      </SegmentedButton>

      <div
        id="container"
        style={{ maxWidth: "1500px", width: "1250px", overflowX: "auto" }}
      >
        <Form
          id="editableForm"
          headerText="Address"
          layout="S1 M2 L2 XL2"
          itemSpacing={editable ? "Normal" : "Large"}
          accessibleMode={editable ? "Edit" : "Display"}
        >
          {editable ? (
            <>
              <FormItem>
                <Label for="nameInp" slot="labelContent" showColon={true}>
                  Name
                </Label>
                <Input value="Red Point Stores" id="nameInp" />
              </FormItem>

              <FormItem>
                <Label id="countryLbl" for="countrySel" slot="labelContent" showColon={true}>
                  Country
                </Label>
                <Select id="countrySel" accessibleNameRef="countryLbl">
                  <Option>Australia</Option>
                  <Option selected={true}>Germany</Option>
                  <Option>England</Option>
                </Select>
              </FormItem>

              <FormItem>
                <Label id="cityLbl" for="cityInp" slot="labelContent" showColon={true}>
                  ZIP Code/City
                </Label>
                <Input id="cityInp" value="411" accessibleNameRef="cityLbl" />
                <Input value="Maintown" accessibleNameRef="cityLbl" />
              </FormItem>

              <FormItem>
                <Label for="wsInp" slot="labelContent" showColon={true}>
                  WebSite
                </Label>
                <Input value="sap.com" id="wsInp" />
              </FormItem>

              <FormItem>
                <Label id="streetLbl" for="streetInp" slot="labelContent" showColon={true}>
                  Street
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
                <Label for="delInp" slot="labelContent" showColon={true}>
                  Delivery address
                </Label>
                <Input value="Newtown" id="delInp" />
              </FormItem>
            </>
          ) : (
            <>
              <FormItem>
                <Label slot="labelContent" showColon={true}>Name</Label>
                <Text>Red Point Stores</Text>
              </FormItem>

              <FormItem>
                <Label slot="labelContent" showColon={true}>Country</Label>
                <Text>Germany</Text>
              </FormItem>

              <FormItem>
                <Label slot="labelContent" showColon={true}>ZIP Code/City</Label>
                <Text>411 Maintown</Text>
              </FormItem>

              <FormItem>
                <Label for="wsInp" slot="labelContent" showColon={true}>
                  WebSite
                </Label>
                <Link href="sap.com">sap.com</Link>
              </FormItem>

              <FormItem>
                <Label slot="labelContent" showColon={true}>Street</Label>
                <Text>Main St 1618</Text>
              </FormItem>

              <FormItem>
                <Label for="delInp" slot="labelContent" showColon={true}>
                  Delivery address
                </Label>
                <Text>Newtown</Text>
              </FormItem>
            </>
          )}
        </Form>
      </div>
    </>
  );
}

export default App;
