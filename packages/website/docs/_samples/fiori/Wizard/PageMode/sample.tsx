import { createComponent } from "@ui5/webcomponents-base/dist/createComponent.js";
import { useRef, useState } from "react";
import WizardClass from "@ui5/webcomponents-fiori/dist/Wizard.js";
import WizardStepClass from "@ui5/webcomponents-fiori/dist/WizardStep.js";
import BarClass from "@ui5/webcomponents/dist/Bar.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DatePickerClass from "@ui5/webcomponents/dist/DatePicker.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
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

const Wizard = createComponent(WizardClass);
const WizardStep = createComponent(WizardStepClass);
const Bar = createComponent(BarClass);
const Button = createComponent(ButtonClass);
const DatePicker = createComponent(DatePickerClass);
const Dialog = createComponent(DialogClass);
const Input = createComponent(InputClass);
const Label = createComponent(LabelClass);
const MessageStrip = createComponent(MessageStripClass);
const Option = createComponent(OptionClass);
const Select = createComponent(SelectClass);
const Switch = createComponent(SwitchClass);
const Title = createComponent(TitleClass);

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const wizardRef = useRef<any>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [showFinalize, setShowFinalize] = useState(false);

  const updateButtons = (index: number, total: number) => {
    if (index === 0) {
      setShowPrev(false);
      setShowNext(true);
      setShowFinalize(false);
    } else if (index === total - 1) {
      setShowPrev(true);
      setShowNext(false);
      setShowFinalize(true);
    } else {
      setShowPrev(true);
      setShowNext(true);
      setShowFinalize(false);
    }
  };

  const handleButtonClick = () => {
    setDialogOpen(true);
    const wiz = wizardRef.current;
    const index = wiz.getSelectedStepIndex();
    updateButtons(index, wiz.children.length);
  };

  const handleStepChange = () => {
    const wiz = wizardRef.current;
    const index = wiz.getSelectedStepIndex();
    updateButtons(index, wiz.children.length);
  };

  const handleNextButtonClick = () => {
    const wiz = wizardRef.current;
    const index = wiz.getSelectedStepIndex();
    const nextStep = wiz.children[index + 1];
    const currentStep = wiz.children[index];
    nextStep.selected = true;
    currentStep.disabled = false;
    updateButtons(index + 1, wiz.children.length);
  };

  const handlePrevButtonClick = () => {
    const wiz = wizardRef.current;
    const index = wiz.getSelectedStepIndex();
    Array.from(wiz.children).forEach((step: any) => { step.selected = false; });
    const prevStep = wiz.children[index - 1];
    const currentStep = wiz.children[index];
    prevStep.selected = true;
    currentStep.disabled = false;
    updateButtons(index - 1, wiz.children.length);
  };

  const handleFinalizeClick = () => {
    alert("Finalize");
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} id="dialog" stretch={true} headerHeading="Wizard" onClose={() => setDialogOpen(false)}>
            <Wizard ref={wizardRef} id="wiz" contentLayout="SingleStep" onStepChange={handleStepChange}>
                <WizardStep icon="product" titleText="Product type" selected={true}>
                    <div style={{ display: "flex", minHeight: "200px", flexDirection: "column" }}>
                        <Title>1. Product Type</Title><br />
                        <MessageStrip>
                            The Wizard control is supposed to break down large tasks, into smaller steps, easier for the
                            user to work with.
                        </MessageStrip><br />
                        <Label>Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus
                            sem, quis pretium nibh lorem malesuada diam. Nulla quis arcu aliquet, feugiat massa semper,
                            volutpat diam. Nam vitae ante posuere, molestie neque sit amet, dapibus velit. Maecenas eleifend
                            tempor lorem. Mauris vitae elementum mi, sed eleifend ligula. Nulla tempor vulputate dolor, nec
                            dignissim quam convallis ut. Praesent vitae commodo felis, ut iaculis felis. Fusce quis eleifend
                            sapien, eget facilisis nibh. Suspendisse est velit, scelerisque ut commodo eget, dignissim quis
                            metus. Cras faucibus consequat gravida. Curabitur vitae quam felis. Phasellus ac leo eleifend,
                            commodo tortor et, varius quam. Aliquam erat volutpat.
                        </Label>
                    </div>
                </WizardStep>
                <WizardStep icon="hint" titleText="Product Information" disabled={true}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Title>2. Product Information</Title><br />
                        <Label>
                            Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero
                            sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo
                            sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus,
                            molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada
                            nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in
                            libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar,
                            sapien
                        </Label>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div
                                style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "1rem" }}>
                                <Label>Name</Label>
                                <Input placeholder="product name..." />
                            </div>
                            <div
                                style={{ display: "flex", flexDirection: "row", marginTop: "1rem", justifyContent: "flex-end", alignItems: "center" }}>
                                <Label>Weight</Label>
                                <Input value="3.65" />
                            </div>
                            <div
                                style={{ display: "flex", flexDirection: "row", marginTop: "1rem", justifyContent: "flex-end", alignItems: "center" }}>
                                <Label>Manifacturer</Label>
                                <Select>
                                    <Option selected={true}>Apple</Option>
                                    <Option>Samsung</Option>
                                    <Option>Huawei</Option>
                                </Select>
                            </div>
                            <div
                                style={{ display: "flex", flexDirection: "row", marginTop: "1rem", justifyContent: "flex-end", alignItems: "center" }}>
                                <Label>5 years guarantee included</Label>
                                <Switch />
                            </div>
                        </div>
                    </div>
                </WizardStep>
                <WizardStep icon="action-settings" titleText="Options" disabled={true}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Title>3. Options</Title><br />
                        <Label>
                            Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero
                            sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec ppellentesque leo
                            sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in libero sem. Suspendisse arcu metus,
                            molestie a turpis a, molestie aliquet dui. Donec pulvinar, sapien corper eu, posuere malesuada
                            nisl. Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar. Nam in
                            libero sem. Suspendisse arcu metus, molestie a turpis a, molestie aliquet dui. Donec pulvinar,
                            sapien
                        </Label>
                        <MessageStrip>
                            The Wizard control is supposed to break down large tasks, into smaller steps, easier for the
                            user to work with.
                        </MessageStrip><br />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div
                                style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: "1rem" }}>
                                <Label>Manifacture date</Label>
                                <DatePicker />
                            </div>
                        </div>
                    </div>
                </WizardStep>
            </Wizard>
            <Bar slot="footer" design="Footer">
                {showPrev && <Button design="Emphasized" slot="endContent" onClick={handlePrevButtonClick}>Previous Step</Button>}
                {showNext && <Button design="Emphasized" slot="endContent" onClick={handleNextButtonClick}>Next step</Button>}
                {showFinalize && <Button design="Emphasized" slot="endContent" onClick={handleFinalizeClick}>Finalize</Button>}
                <Button design="Transparent" slot="endContent" onClick={() => setDialogOpen(false)}>Cancel</Button>
            </Bar>
        </Dialog>
        <Button onClick={handleButtonClick}>Open dialog</Button>
    </>
  );
}

export default App;
