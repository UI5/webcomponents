import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef } from "react";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import FileUploaderClass from "@ui5/webcomponents/dist/FileUploader.js";
import FormClass from "@ui5/webcomponents/dist/Form.js";
import FormGroupClass from "@ui5/webcomponents/dist/FormGroup.js";
import FormItemClass from "@ui5/webcomponents/dist/FormItem.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MultiInputClass from "@ui5/webcomponents/dist/MultiInput.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import RadioButtonClass from "@ui5/webcomponents/dist/RadioButton.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import SliderClass from "@ui5/webcomponents/dist/Slider.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";
import TimePickerClass from "@ui5/webcomponents/dist/TimePicker.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";

const Button = createComponent(ButtonClass);
const CheckBox = createComponent(CheckBoxClass);
const FileUploader = createComponent(FileUploaderClass);
const Form = createComponent(FormClass);
const FormGroup = createComponent(FormGroupClass);
const FormItem = createComponent(FormItemClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const MultiInput = createComponent(MultiInputClass);
const Option = createComponent(OptionClass);
const RadioButton = createComponent(RadioButtonClass);
const Select = createComponent(SelectClass);
const Slider = createComponent(SliderClass);
const Switch = createComponent(SwitchClass);
const Text = createComponent(TextClass);
const TextArea = createComponent(TextAreaClass);
const TimePicker = createComponent(TimePickerClass);
const Token = createComponent(TokenClass);

function App() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  const handleSliderUi5Input = () => {
    const width = (sliderRef.current!.value / 100 * 1500);
	containerRef.current!.style.width = `${width}px`;
  };

  return (
    <>
      <style>{`
        :root {
        	--my-margin: -0.6875rem;
        }
        .ui5-content-density-compact {
        	--my-margin: -0.5rem;
        }

        .margin--density-aware {
        	margin-inline-start: var(--my-margin);
        }
        .margin--fixed {
        	margin-inline-start: -0.5rem;
        }
      `}</style>
      <Label showColon={true}>Form Layout</Label><Text>S1 M2 L3 XL4</Text><br />
        <Label showColon={true}>Label Span</Label><Text>S12 M12 L12 XL12</Text><br />
        <Label showColon={true}>Page Size</Label><Text id="txtLayout">L</Text>
        <Slider ref={sliderRef} id="slider" value={80} onInput={handleSliderUi5Input} />

        <div ref={containerRef} id="container" style={{ maxWidth: "1500px", width: "1250px", overflowX: "auto" }}>
            <Form headerText="Address" layout="S1 M2 L3 XL4" labelSpan="S12 M12 L12 XL12">
                <FormGroup headerText="Group1 (Text Fields)" columnSpan={2}>

                    <FormItem>
                        <Label required={true} htmlFor="nameInp" slot="labelContent">Label:</Label>
                        <Input id="nameInp" value="Typed text" />
                    </FormItem>
                
                    <FormItem>
                        <Label required={true} htmlFor="cityInp" slot="labelContent">Label:</Label>
                        <div>
                            <Input style={{ flexGrow: 1, marginInlineEnd: "0.25rem" }} id="cityInp" placeholder="Placeholder" />
                            <Text>UNIT</Text>
                        </div>
                    </FormItem>
            
                    <FormItem>
                        <Label required={true} htmlFor="streetInp" slot="labelContent">Label:</Label>
                        <TextArea id="streetInp" placeholder="Write your message here" showExceededText={true} maxLength={10} />
                    </FormItem>
                
                    <FormItem>
                        <Label required={true} slot="labelContent" htmlFor="fileUpload">Label:</Label>
                        <FileUploader id="fileUpload" placeholder="Choose a file">
                            <Button>Browse...</Button>
                        </FileUploader>
                    </FormItem>

                    <FormItem>
                        <Label required={true} htmlFor="durationInp" slot="labelContent">Duration:</Label>
                        <TimePicker id="durationInp" formatPattern="hh:mm:ss" value="12:00:01" />
                    </FormItem>
    
                    <FormItem>
                        <Label required={true} htmlFor="cityInp3" slot="labelContent">Label:</Label>
                        <Input id="cityInp3" placeholder="Placeholder" />
                        <Input placeholder="Placeholder" />
                    </FormItem>
                </FormGroup>

                <FormGroup headerText="Group2 (Cb, Rb, Switch)">
                    <FormItem>
                        <Label required={true} slot="labelContent" htmlFor="rbGroup">Label:</Label>
                        <CheckBox class="margin--density-aware" text="Here comes your checkbox text" />
                    </FormItem>

                    <FormItem>
                        <Label required={true} slot="labelContent" htmlFor="rbGroup">Label:</Label>

                        <div role="radiogroup" className="margin--density-aware">
                            <RadioButton id="rbGroup" text="With Text" name="test" />
                            <RadioButton text="With Tex" name="test" />
                        </div>
                    </FormItem>

                    <FormItem>
                        <Label required={true} slot="labelContent" htmlFor="swGroup">Label:</Label>
                        <Switch id="swGrou" class="margin--fixed" checked={true} />
                    </FormItem>
                </FormGroup>

                <FormGroup headerText="Group3 (Select Fields)">
                    <FormItem>
                        <Label required={true} htmlFor="countrySel" slot="labelContent">Label:</Label>
                        <Select id="countrySel" accessibleNameRef="countryLbl">
                            <Option>Australia</Option>
                            <Option selected={true}>Germany</Option>
                            <Option>England</Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Label required={true} htmlFor="countrySel2" slot="labelContent">Label:</Label>
                        <Select id="countrySel2" accessibleNameRef="countryLbl">
                            <Option>Australia</Option>
                            <Option>Germany</Option>
                            <Option selected={true}>England</Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Label required={true} htmlFor="mcb-grouping1" slot="labelContent">Label:</Label>
                        <MultiInput id="mcb-grouping1" showValueHelpIcon={true}>
                            <Token slot="tokens" text="laboris" />
                            <Token slot="tokens" text="ipsum" />
                            <Token slot="tokens" text="esse" />
                            <Token slot="tokens" text="amet" />
                        </MultiInput>
                    </FormItem>
                </FormGroup>
            </Form>
        </div>
    </>
  );
}

export default App;
