import { createReactComponent } from "@ui5/webcomponents-base";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import SelectClass from "@ui5/webcomponents/dist/Select.js";
import OptionClass from "@ui5/webcomponents/dist/Option.js";
import RangeSliderClass from "@ui5/webcomponents/dist/RangeSlider.js";
import SegmentedButtonClass from "@ui5/webcomponents/dist/SegmentedButton.js";
import SegmentedButtonItemClass from "@ui5/webcomponents/dist/SegmentedButtonItem.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import AIButtonClass from "@ui5/webcomponents-ai/dist/AIButton.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/AIButtonState.js";

const Dialog = createReactComponent(DialogClass);
const Label = createReactComponent(LabelClass);
const Select = createReactComponent(SelectClass);
const Option = createReactComponent(OptionClass);
const RangeSlider = createReactComponent(RangeSliderClass);
const SegmentedButton = createReactComponent(SegmentedButtonClass);
const SegmentedButtonItem = createReactComponent(SegmentedButtonItemClass);
const Button = createReactComponent(ButtonClass);
const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Token = createReactComponent(TokenClass);
const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const BusyIndicator = createReactComponent(BusyIndicatorClass);
const TextArea = createReactComponent(TextAreaClass);
const Toast = createReactComponent(ToastClass);

function startGenerating() {
	console.warn("startGenerating");
	text = texts[options.structure][options.language][options.toneOfVoice];
	busyIndicator.active = true;
	output.value = "";
	openDialogButton.state = "generating";
	generationStopped = false;
	sendButton.disabled = true;
	output.disabled = true;

	closeDialog();
	
	// Delay before starting text streaming (to show busy indicator first, like QuickPrompt)
	setTimeout(() => {
		if (generationStopped) return;
		
		// Start text streaming - add words one at a time
		const words = text.split(" ");
		let currentWordIndex = 0;
		
		var generationId = setInterval(() => {
			if (currentWordIndex < words.length && !generationStopped) {
				output.value += words[currentWordIndex] + " ";
				currentWordIndex++;
			} else {
				// Generation complete or stopped
				if (!generationStopped) {
					openDialogButton.state = "generate";
				}
				busyIndicator.active = false;
				clearInterval(generationId);
				sendButton.disabled = false;
				output.disabled = false;
			}
		}, 75); // 75ms delay between words (same as QuickPrompt)
		
		dialogGenerationId = generationId;
	}, 2000); // 2 second delay to show busy indicator first (same as QuickPrompt)

	return null; // Return immediately, actual interval ID stored in dialogGenerationId after delay
}
function stopGenerating(generationId) {
	console.warn("stopGenerating");
	generationStopped = true;
	busyIndicator.active = false;
	openDialogButton.state = "generate";
	clearInterval(generationId);
	sendButton.disabled = false;
	output.disabled = false;
}
function openDialogButtonClickHandler(evt) {
	var button = evt.target;
	switch (button.state) {
	case "generate":
		openDialog();
		break;
	case "generating":
		stopGenerating(dialogGenerationId);
		openDialogButton.state = "generate";
		break;
	}
}
function applyTextImprovementsButtonClickHandler() {
	startGeneratingFromDialog();
}
function startGeneratingFromDialog() {
	dialogGenerationId = startGenerating();
}
function openDialog() {
	dialog.open = true;
}
function closeDialog() {
	dialog.open = false;
}
function structureSelectHandler(evt) {
	options.structure = evt.detail.selectedOption.value;
}
function languageSelectHandler(evt) {
	options.language = evt.detail.selectedOption.value;
}
function toneOfVoiceSelectHandler(evt) {
	const value = evt.detail.selectedItems[0].innerText;
	switch (value) {
	case "Formal": {
		options.toneOfVoice = 1;
		break;
	}
	case "Neutral": {
		options.toneOfVoice = 2;
		break;
	}
	case "Casual": {
		options.toneOfVoice = 3;
	}
	}
}


function App() {
  const dialogRef = useRef(null);
  const applyTextImprovementsButtonRef = useRef(null);
  const openDialogButtonRef = useRef(null);
  const closeDialogButtonRef = useRef(null);
  const outputRef = useRef(null);
  const structureSelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const toneOfVoiceSelectRef = useRef(null);
  const sendButtonRef = useRef(null);
  const toastRef = useRef(null);
  const outputRef = useRef(null);
  const busyIndicatorRef = useRef(null);

  const handleSendButtonClick = () => {
    const output = document.getElementById("outputRef.current");
    if (outputRef.current.value) {
    toastRef.current.open = true;
    outputRef.current.valueState = "None";
    outputRef.current.value = "";
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "fit-content" }}>
            <Dialog
            	 id="dialog" ref={dialogRef}
            	 opener="openDialogButton"
            	 headerText="Improve Text">
            		<div className="content">
            			<div className="guidedPromptForm">
            				<div style={{ display: "flex", flexDirection: "column" }}>
            					<Label>Structure:</Label>
            					<Select id="structureSelect" ref={structureSelectRef}>
            						<Option value="paragraph">Paragraph</Option>
            						<Option value="bulleted"> Bullet list</Option>
            					</Select>
            				</div>
            				<div style={{ display: "flex", flexDirection: "column" }}>
            					<Label>Length:</Label>
            					<RangeSlider
            					 min={50}
            					 max={150}
            					 startValue={75}
            					 endValue={125}
            						show-tooltip />
            				</div>
            				<div style={{ display: "flex", flexDirection: "column" }}>
            					<Label>Language:</Label>
            					<Select id="languageSelect" ref={languageSelectRef}>
            						<Option value="en">English</Option>
            						<Option value="de">German</Option>
            					</Select>
            				</div>
            				<div style={{ display: "flex", flexDirection: "column" }}>
            					<Label>Tone Of Voice:</Label>
            					<SegmentedButton id="toneOfVoiceSelect" ref={toneOfVoiceSelectRef}>
            						<SegmentedButtonItem>Formal</SegmentedButtonItem>
            						<SegmentedButtonItem selected={true}>Neutral</SegmentedButtonItem>
            						<SegmentedButtonItem>Casual</SegmentedButtonItem>
            					</SegmentedButton>
            				</div>
            			</div>
            		</div>
            		<div slot="footer" style={{ alignItems: "center", padding: "0.25rem 0", width: "100%" }}>
            			<Button
            			 id="applyTextImprovementsButton" ref={applyTextImprovementsButtonRef}
            			 design="Emphasized"
            			 name="generate"
            			 text="Apply"
            			 icon="ai">Apply</Button>
            			<Button id="closeDialogButton" ref={closeDialogButtonRef}>Close</Button>
            		</div>
            	</Dialog>
            	<Card>
            		<CardHeader slot="header" titleText="Monique Legrand" subtitleText="Senior Sales Executive">
            			<img src="https://ui5.github.io/webcomponents/images/avatars/woman_avatar_1.png" slot="avatar" />
            		</CardHeader>
            		<section style={{ display: "flex", height: "450px", flexDirection: "column", justifyContent: "flex-end", padding: "1rem", borderStartStartRadius: "0.625rem", borderStartEndRadius: "0.625rem", gap: "0.5rem" }}>
            			<Label required={true}>To: </Label>
            			<div style={{ display: "flex", gap: "0.125rem" }}>
            				<Token selected={true} text="DL Marketing Sector SAP" style={{ width: "fit-content", marginBlockEnd: "1rem" }} />
            			</div>
            			<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            				<Label style={{ alignSelf: "flex-end" }} required={true}>Offer: </Label>
            				<AIButton id="openDialogButton" ref={openDialogButtonRef} state="generate">
            					<AIButtonState
            					 name="generate"
            					 text="Compose Text"
            					 icon="ai"
            						 />
            					<AIButtonState
            					 name="generating"
            					 text="Stop Generating"
            					 icon="stop"
            						 />
            				</AIButton>
            			</div>
            			<BusyIndicator style={{ height: "100%" }} ref={busyIndicatorRef}>
            				<TextArea id="output" ref={outputRef} ref={outputRef} style={{ height: "100%" }} />
            			</BusyIndicator>
            		</section>
            		<div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "0.25rem", padding: "0 0.75rem 0.75rem 0.75rem" }}>
            			<Button id="sendButton" ref={sendButtonRef} onClick={handleSendButtonClick} design="Emphasized">Send</Button>
            			<Button design="Transparent">Cancel</Button>
            		</div>
            		<Toast placement="MiddleCenter" id="guidedPromptToast" ref={toastRef} duration={3000}>Your message was sent successfully!</Toast>
            	</Card>
          </div>
    </>
  );
}

export default App;
