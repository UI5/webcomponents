import { createReactComponent } from "@ui5/webcomponents-base";
import CardClass from "@ui5/webcomponents/dist/Card.js";
import CardHeaderClass from "@ui5/webcomponents/dist/CardHeader.js";
import LabelClass from "@ui5/webcomponents/dist/Label.js";
import TokenClass from "@ui5/webcomponents/dist/Token.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import TextAreaClass from "@ui5/webcomponents/dist/TextArea.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import ToastClass from "@ui5/webcomponents/dist/Toast.js";
import MenuClass from "@ui5/webcomponents/dist/Menu.js";
import MenuItemClass from "@ui5/webcomponents/dist/MenuItem.js";
import MenuSeparatorClass from "@ui5/webcomponents/dist/MenuSeparator.js";
import AIButtonClass from "@ui5/webcomponents-ai/dist/AIButton.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/AIButtonState.js";

const Card = createReactComponent(CardClass);
const CardHeader = createReactComponent(CardHeaderClass);
const Label = createReactComponent(LabelClass);
const Token = createReactComponent(TokenClass);
const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const BusyIndicator = createReactComponent(BusyIndicatorClass);
const TextArea = createReactComponent(TextAreaClass);
const Button = createReactComponent(ButtonClass);
const Toast = createReactComponent(ToastClass);
const Menu = createReactComponent(MenuClass);
const MenuItem = createReactComponent(MenuItemClass);
const MenuSeparator = createReactComponent(MenuSeparatorClass);

function aiQuickPromptButtonClickHandler(e) {
	var button = e.target;
	switch(button.state) {
		case "":
		case "generate":
			button.state = "generating";
			quickPromptBusyIndicator.active = true;
			sendButton.disabled = true;
			const keys = Object.keys(predefinedTexts[translationKey]);
			const randomKey = keys[Math.floor(Math.random() * keys.length)];
			currentTextKey = randomKey;
			stopBusyIndicatorAndGenerateText(button, predefinedTexts);
			break;
		case "generating":
			button.state = "revise";
			stopQuickPromptGeneration(button);
			break;
		case "revise":
			menu1.opener = button;
			menu1.open = true;
			break;
		case "reviseGenerating":
			button.state = "revise";
			stopQuickPromptGeneration(button);
			break;
	}
}
function startQuickPromptGeneration(button) {
	console.warn("startGeneration");
	generationStopped = false;
	generationId = setTimeout(function() {
		console.warn("Generation completed");
		button.state = "revise";
	}, 2000);
}
function stopQuickPromptGeneration() {
	console.warn("stopGeneration");
	clearInterval(generationId);
	generationStopped = true;
	sendButton.disabled = false;
	output.disabled = false;
	quickPromptBusyIndicator.active = false;
}
function isTextWrong() {
		return output.value.trim() !== predefinedTexts[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsExpanded[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsBulleted[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsRephrased[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsSimplified[translationKey][currentTextKey];
	}
function setStateAndGenerate(button, state, textKey, predefinedTexts) {
	quickPromptBusyIndicator.active = true;
	button.state = state;
	stopBusyIndicatorAndGenerateText(button, predefinedTexts, textKey);

}
function startTextGeneration(button, state, predefinedTexts) {
	quickPromptBusyIndicator.active = true;
	button.state = state;
	stopBusyIndicatorAndGenerateText(button, predefinedTexts);
}
function stopBusyIndicatorAndGenerateText(button, predefinedTexts, textKey) {
	setTimeout(() => {
		generateText(predefinedTexts[translationKey][textKey || currentTextKey], button);
	}, 2000);
	startQuickPromptGeneration(button);
 }
function clearValueState(output) {
	output.valueState = "None";
}
function setNegativeValueState(output) {
	output.valueState = "Negative";
	const div = document.createElement("div");
	div.setAttribute("slot", "valueStateMessage");
	div.textContent = "Something went wrong during the generation process. Please try again.";

	if (!output.querySelector("[slot='valueStateMessage']")) {
		output.appendChild(div);
	}
}
function fixSpellingAndGrammar(button, output) {
	if (isTextWrong()) {
		setStateAndGenerate(button, "generating", currentTextKey, predefinedTexts);
		setNegativeValueState(output);
	} else {
		output.valueState = "Positive";
		setTimeout(() => {
			output.valueState = "None";
		}, 3000);
	}
}
function generateText(text, button) {
	if (generationId) {
		clearInterval(generationId);
	}

	const output = document.getElementById("output");
	const words = text.split(" ");
	let currentWordIndex = 0;
	output.value = "";
	generationId = setInterval(() => {
		if (currentWordIndex < words.length) {
			output.value += words[currentWordIndex] + " ";
			currentWordIndex++;
			sendButton.disabled = true;
			output.disabled = true;
		} else {
			if (!generationStopped) {
				button.state = "revise";
				button.accessibilityAttributes = {
					root: {
						hasPopup: "menu",
						roleDescription: "Menu Button"
					}
				};
				output.valueState = "None";
				quickPromptBusyIndicator.active = false;
			}
			clearInterval(generationId);
			sendButton.disabled = false;
			output.disabled = false;
			quickPromptBusyIndicator.active = false;
		}
	}, 75);
}


function App() {
  const sendButtonRef = useRef(null);
  const toastRef = useRef(null);
  const quickPromptBusyIndicatorRef = useRef(null);
  const outputRef = useRef(null);
  const outputRef = useRef(null);
  const outputRef = useRef(null);
  const menu1Ref = useRef(null);

  const handleSendButtonClick = () => {
    const output = document.getElementById("outputRef.current");
    if (outputRef.current.value) {
    toastRef.current.open = true;
    outputRef.current.valueState = "None";
    outputRef.current.value = "";
    }
  };

  const handleMenu1ItemClick = (e) => {
    const button = menu1Ref.current.opener;
    const output = document.getElementById("outputRef.current");
    switch (e.detail.text) {
    case "Regenerate":
    const keys = Object.keys(predefinedTexts[translationKey]);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    currentTextKey = randomKey;
    setStateAndGenerate(button, "generating", randomKey, predefinedTexts);
    break;
    case "Make Bulleted List":
    startTextGeneration(button, "reviseGenerating", predefinedTextsBulleted);
    break;
    case "Clear Error":
    clearValueState(outputRef.current);
    break;
    case "Fix Spelling and Grammar":
    fixSpellingAndGrammar(button, outputRef.current);
    break;
    case "Generate Error":
    setNegativeValueState(outputRef.current);
    break;
    case "Simplify":
    startTextGeneration(button, "reviseGenerating", predefinedTextsSimplified);
    break;
    case "Expand":
    startTextGeneration(button, "reviseGenerating", predefinedTextsExpanded);
    break;
    case "Rephrase":
    startTextGeneration(button, "reviseGenerating", predefinedTextsRephrased);
    break;
    case "Summarize":
    startTextGeneration(button, "reviseGenerating", predefinedTextsSummarized);
    break;
    case "Bulgarian":
    translationKey = "bg";
    startTextGeneration(button, "reviseGenerating", predefinedTexts);
    break;
    case "English":
    translationKey = "en";
    startTextGeneration(button, "reviseGenerating", predefinedTexts);
    break;
    case "German":
    translationKey = "de";
    startTextGeneration(button, "reviseGenerating", predefinedTexts);
    break;
    default:
    return "";
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "fit-content" }}>
            <Card>
            		<CardHeader slot="header" titleText="Michael Adams" subtitleText="Senior Sales Executive">
            			<img src="https://ui5.github.io/webcomponents/images/avatars/man_avatar_1.png" slot="avatar" alt="avatar" />
            		</CardHeader>
            		<section style={{ display: "flex", height: "450px", flexDirection: "column", justifyContent: "flex-end", padding: "1rem", borderStartStartRadius: "0.625rem", borderStartEndRadius: "0.625rem", gap: "0.5rem" }}>
            			<Label required={true}>To: </Label>
            			<div style={{ display: "flex", gap: "0.125rem" }}>
            				<Token selected={true} text="Diana Mihaylova" style={{ width: "fit-content", marginBlockEnd: "1rem" }} />
            				<Token selected={true} text="DL Marketing Sector SAP" style={{ width: "fit-content", marginBlockEnd: "1rem" }} />
            			</div>
            			<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            				<Label style={{ alignSelf: "flex-end" }} required={true}>Offer: </Label>
            				<AIButton id="quickPromptAiButton" style={{ alignSelf: "flex-end" }} state="generate">
            					<AIButtonState name="generate" text="Generate" icon="ai" />
            					<AIButtonState name="generating" text="Stop Generating" icon="stop" />
            					<AIButtonState name="reviseGenerating" text="Stop Generating" icon="stop" />
            					<AIButtonState name="revise" text="Revise" icon="ai" endIcon="navigation-down-arrow" />
            				</AIButton>
            			</div>
            				<BusyIndicator style={{ width: "100%", height: "100%" }} id="quickPromptBusyIndicator" ref={quickPromptBusyIndicatorRef}>
            				<TextArea id="output" ref={outputRef} ref={outputRef} ref={outputRef} style={{ height: "100%" }} />
            		</section>
            		<div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "0.25rem", padding: "0 0.75rem 0.75rem 0.75rem" }}>
            			<Button id="footerBtnSend" ref={sendButtonRef} onClick={handleSendButtonClick} design="Emphasized">Send</Button>
            			<Button id="footerBtnCancel" design="Transparent">Cancel</Button>
            		</div>
            		<Toast placement="MiddleCenter" id="quickPromptToast" ref={toastRef} duration={3000}>Your message was sent successfully!</Toast>
            	</Card>
            	<Menu id="menu1" ref={menu1Ref} onItemClick={handleMenu1ItemClick} horizontalAlign="End">
            		<MenuItem text="Regenerate" />
            		<MenuSeparator />
            		<MenuItem text="Fix Spelling and Grammar" />
            		<MenuItem text="Rewrite Text">
            			<MenuItem text="Simplify" />
            			<MenuItem text="Expand" />
            			<MenuItem text="Rephrase" />
            			<MenuItem text="Summarize" />
            		</MenuItem>
            		<MenuItem text="Make Bulleted List" />
            		<MenuItem text="Translate">
            			<MenuItem text="Bulgarian" />
            			<MenuItem text="English" />
            			<MenuItem text="German" />
            		</MenuItem>
            		<MenuSeparator />
            		<MenuItem text="Generate Error" />
            		<MenuItem text="Clear Error" />
            	</Menu>
          </div>
    </>
  );
}

export default App;
