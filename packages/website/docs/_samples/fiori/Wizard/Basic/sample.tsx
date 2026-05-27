import createReactComponent from "@ui5/webcomponents-base/dist/createReactComponent.js";
import { type UI5CustomEvent } from "@ui5/webcomponents-base";
import { useState, useRef, useCallback } from "react";
import WizardClass from "@ui5/webcomponents-fiori/dist/Wizard.js";
import WizardStepClass from "@ui5/webcomponents-fiori/dist/WizardStep.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import InputClass from "@ui5/webcomponents/dist/Input.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import MessageStripClass from "@ui5/webcomponents/dist/MessageStrip.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import SwitchClass from "@ui5/webcomponents/dist/Switch.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/hint.js";
import "@ui5/webcomponents-icons/dist/action-settings.js";

const Wizard = createReactComponent(WizardClass);
const WizardStep = createReactComponent(WizardStepClass);
const Button = createReactComponent(ButtonClass);
const DatePicker = createReactComponent(DatePickerClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const MessageStrip = createReactComponent(MessageStripClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Switch = createReactComponent(SwitchClass);
const Title = createReactComponent(TitleClass);

function App() {
  const [step1Selected, setStep1Selected] = useState(true);
  const [step2Selected, setStep2Selected] = useState(false);
  const [step3Selected, setStep3Selected] = useState(false);
  const [step2Disabled, setStep2Disabled] = useState(true);
  const [step3Disabled, setStep3Disabled] = useState(true);
  const [toStep2Hidden, setToStep2Hidden] = useState(false);
  const [toStep3Hidden, setToStep3Hidden] = useState(true);
  const [finalizeHidden, setFinalizeHidden] = useState(true);

  const handleStepChange = useCallback(
    (e: UI5CustomEvent<WizardClass, "step-change">) => {
      console.log(e.detail.step);
    },
    [],
  );

  const handleSwitchChange = useCallback(() => {
    setToStep3Hidden(false);
  }, []);

  const handleDatePickerChange = useCallback(() => {
    setFinalizeHidden(false);
  }, []);

  const handleToStep2Click = useCallback(() => {
    setStep1Selected(false);
    setStep2Selected(true);
    setStep3Selected(false);
    setStep2Disabled(false);
    setToStep2Hidden(true);
  }, []);

  const handleToStep3Click = useCallback(() => {
    setStep1Selected(false);
    setStep2Selected(false);
    setStep3Selected(true);
    setStep3Disabled(false);
    setToStep3Hidden(true);
  }, []);

  const handleFinalizeClick = useCallback(() => {
    alert("Done!");
  }, []);

  return (
    <>
      <Wizard onStepChange={handleStepChange}>
        <WizardStep
          icon="product"
          titleText="Product type"
          selected={step1Selected}
        >
          <div
            style={{
              display: "flex",
              minHeight: "200px",
              flexDirection: "column",
            }}
          >
            <Title>1. Product Type</Title>
            <br />
            <MessageStrip>
              The Wizard control is supposed to break down large tasks, into
              smaller steps, easier for the user to work with.
            </MessageStrip>
            <br />
            <Label>
              Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus
              sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu
              aliquet, feugiat massa semper, volutpat diam. Nam vitae ante
              posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend
              tempor lorem. Mauris vitae elementum mi, sed eleifend ligula.
              Nulla tempor vulputate dolor, nec dignissim quam convallis ut.
              Praesent vitae commodo felis, ut iaculis felis. Fusce quis
              eleifend sapien, eget facilisis nibh. Suspendisse est velit,
              scelerisque ut commodo eget, dignissim quis metus. Cras faucibus
              consequat gravida. Curabitur vitae quam felis. Phasellus ac leo
              eleifend, commodo tortor et, varius quam. Aliquam erat volutpat.
            </Label>
          </div>
          {!toStep2Hidden && (
            <Button design="Emphasized" onClick={handleToStep2Click}>
              Step 2
            </Button>
          )}
        </WizardStep>
        <WizardStep
          icon="hint"
          titleText="Product Information"
          disabled={step2Disabled}
          selected={step2Selected}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title>2. Product Information</Title>
            <br />
            <Label>
              Integer pellentesque leo sit amet dui vehicula, quis ullamcorper
              est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie
              a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet
              dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem.
              Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui.
              Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer
              pellentesque leo sit amet dui vehicula, quis ullamcorper est
              pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a
              turpis a, molestie aliquet dui. Donec pulvinar, sapien
            </Label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <Label>Name</Label>
                <Input placeholder="product name..." />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "1rem",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Label>Weight</Label>
                <Input value="3.65" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "1rem",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Label>Manifacturer</Label>
                <Select>
                  <Option selected={true}>Apple</Option>
                  <Option>Samsung</Option>
                  <Option>Huawei</Option>
                </Select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "1rem",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Label>5 years guarantee included</Label>
                <Switch onChange={handleSwitchChange} />
              </div>
            </div>
          </div>
          {!toStep3Hidden && (
            <Button design="Emphasized" onClick={handleToStep3Click}>
              Step 3
            </Button>
          )}
        </WizardStep>
        <WizardStep
          icon="action-settings"
          titleText="Options"
          disabled={step3Disabled}
          selected={step3Selected}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title>3. Options</Title>
            <br />
            <Label>
              Integer pellentesque leo sit amet dui vehicula, quis ullamcorper
              est pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie
              a turpis a, molestie aliquet dui. Donec ppellentesque leo sit amet
              dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem.
              Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui.
              Donec pulvinar, sapien corper eu, posuere malesuada nisl. Integer
              pellentesque leo sit amet dui vehicula, quis ullamcorper est
              pulvinar. Nam in libero sem. Suspendisse arcu metus, molestie a
              turpis a, molestie aliquet dui. Donec pulvinar, sapien
            </Label>
            <MessageStrip>
              The Wizard control is supposed to break down large tasks, into
              smaller steps, easier for the user to work with.
            </MessageStrip>
            <br />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <Label>Manifacture date</Label>
                <DatePicker onChange={handleDatePickerChange} />
              </div>
            </div>
          </div>
          {!finalizeHidden && (
            <Button design="Emphasized" onClick={handleFinalizeClick}>
              Finalize
            </Button>
          )}
        </WizardStep>
      </Wizard>
    </>
  );
}

export default App;
