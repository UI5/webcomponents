import { createReactComponent } from "@ui5/webcomponents-base";
import { useRef } from "react";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";

const Form = createReactComponent(FormClass);
const FormItem = createReactComponent(FormItemClass);
const Label = createReactComponent(LabelClass);
const Text = createReactComponent(TextClass);

function App() {
  const containerRef = useRef(null);

  const handleSliderUi5Input = () => {
    const width = (slider.value / 100 * 1500);
	containerRef.current.style.width = `${width}px`;
  };

  return (
    <>
      <div ref={containerRef} id="container" style={{ maxWidth: "1500px", width: "300px", overflowX: "auto" }}>
            <Form className="addressForm" header-text="A very long header title for the form and more">
                <FormItem>
                    <Label slot="labelContent">Name:</Label>
                    <Text className="text">Red Point Stores</Text>
                </FormItem>
            
                <FormItem>
                    <Label slot="labelContent">ZIP Code/City:</Label>
                    <Text className="text">411 Maintown</Text>
                </FormItem>
            
                <FormItem>
                    <Label slot="labelContent">Street:</Label>
                    <Text className="text">Main St 1618</Text>
                </FormItem>

                <FormItem>
                    <Label slot="labelContent">Country:</Label>
                    <Text className="text">Germany</Text>
                </FormItem>
            </Form>
        </div>
    </>
  );
}

export default App;
