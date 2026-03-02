import { createReactComponent } from "@ui5/webcomponents-base";
import BarClass from "@ui5/webcomponents-fiori/dist/Bar.js";
import WizardClass from "@ui5/webcomponents-fiori/dist/Wizard.js";
import WizardStepClass from "@ui5/webcomponents-fiori/dist/WizardStep.js";
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

const Bar = createReactComponent(BarClass);
const Wizard = createReactComponent(WizardClass);
const WizardStep = createReactComponent(WizardStepClass);
const Button = createReactComponent(ButtonClass);
const DatePicker = createReactComponent(DatePickerClass);
const Dialog = createReactComponent(DialogClass);
const Input = createReactComponent(InputClass);
const Label = createReactComponent(LabelClass);
const MessageStrip = createReactComponent(MessageStripClass);
const Option = createReactComponent(OptionClass);
const Select = createReactComponent(SelectClass);
const Switch = createReactComponent(SwitchClass);
const Title = createReactComponent(TitleClass);

function App() {

  const handleClick = () => {
    dialog.open = true;
    const index = wizardWiz.getSelectedStepIndex();
    setButtonVisibility(index, wizardWiz.children.length);
  };

  const handleUi5StepChange = () => {
    const index = wizardWiz.getSelectedStepIndex();
    setButtonVisibility(index, wizardWiz.children.length)
  };

  const handleClick = () => {
    const index = wizardWiz.getSelectedStepIndex();
    setNextStep(wizardWiz, index, index + 1);
    setButtonVisibility(index + 1, wizardWiz.children.length)
  };

  const handleClick = () => {
    const index = wizardWiz.getSelectedStepIndex();
    deselectAll(wizardWiz);
    setPreviousStep(wizardWiz, index, index - 1);
    setButtonVisibility(index - 1, wizardWiz.children.length)
  };

  const handleClick = () => {
    dialog.open = false;
  };

  const handleClick = () => {
    alert("Finalize");
    dialog.open = false;
  };

  return (
    <>
      <Dialog id="dialog" stretch={true} header-heading="Wizard">
            <Wizard id="wiz" content-layout="SingleStep">
                <WizardStep icon="product" title-text="Product type" selected={true}>
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
                <WizardStep icon="hint" title-text="Product Information" disabled={true}>
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
                                <Switch id="wiz-sw" />
                            </div>
                        </div>
                    </div>
                </WizardStep>
                <WizardStep icon="action-settings" title-text="Options" disabled={true}>
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
                                <DatePicker id="wiz-dp" />
                            </div>
                        </div>
                    </div>
                </WizardStep>
            </Wizard>
            <Bar id="footer" slot="footer" design="Footer">
                <Button id="prevButton" design="Emphasized" slot="endContent">Previous Step</Button>
                <Button id="nextButton" design="Emphasized" slot="endContent">Next step</Button>
                <Button id="wiz-finalize" design="Emphasized" slot="endContent">Finalize</Button>
                <Button id="cancel" design="Transparent" slot="endContent">Cancel</Button>
            </Bar>
        </Dialog>
        <Button id="button">Open dialog</Button>
    </>
  );
}

export default App;
