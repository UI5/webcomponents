import { createReactComponent } from "@ui5/webcomponents-base";
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

  const handleUi5Input = () => {
    const width = (slider.value / 100 * 1500);
	container.style.width = `${width
  };

  return (
    <>
      <Label show-colon={true}>Form Layout</Label><Text>S2 M2 L4 XL6</Text></br>
    	<Label show-colon={true}>Label Span</Label><Text>S12 M12 L12 XL12</Text></br>
        <Label show-colon={true}>Page Size</Label><Text id="txtLayout">XL</Text>
        <Slider id="slider" value={100} />

        <div id="container" style={{ maxWidth: "1500px", width: "1500px", overflowX: "auto" }}>

    		<Form className="addressForm" header-text="With column span" layout="S2 M2 L4 XL6" label-span="S12 M12 L12 XL12">
    			<FormGroup header-text="Address - column-span=1" column-span={1}>
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

		
    			<FormGroup header-text="Contact - column-span=2" column-span={2}>
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

    			<FormGroup header-text="Other Info - column-span=2" column-span={2}>
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
    		</Form>
        </div>
    </>
  );
}

export default App;
