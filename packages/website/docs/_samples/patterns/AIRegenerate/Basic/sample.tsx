import { createReactComponent } from "@ui5/webcomponents-base";
import AvatarClass from "@ui5/webcomponents/dist/Avatar.js";
import TitleClass from "@ui5/webcomponents/dist/Title.js";
import BusyIndicatorClass from "@ui5/webcomponents/dist/BusyIndicator.js";
import TextClass from "@ui5/webcomponents/dist/Text.js";
import DialogClass from "@ui5/webcomponents/dist/Dialog.js";
import CheckBoxClass from "@ui5/webcomponents/dist/CheckBox.js";
import ButtonClass from "@ui5/webcomponents/dist/Button.js";
import DynamicPageClass from "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import DynamicPageHeaderClass from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import ShellBarClass from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import ShellBarBrandingClass from "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import AIButtonClass from "@ui5/webcomponents-ai/dist/AIButton.js";
import AIButtonStateClass from "@ui5/webcomponents-ai/dist/AIButtonState.js";

const DynamicPage = createReactComponent(DynamicPageClass);
const DynamicPageHeader = createReactComponent(DynamicPageHeaderClass);
const ShellBar = createReactComponent(ShellBarClass);
const ShellBarBranding = createReactComponent(ShellBarBrandingClass);
const Avatar = createReactComponent(AvatarClass);
const AIButton = createReactComponent(AIButtonClass);
const AIButtonState = createReactComponent(AIButtonStateClass);
const Title = createReactComponent(TitleClass);
const BusyIndicator = createReactComponent(BusyIndicatorClass);
const Text = createReactComponent(TextClass);
const Dialog = createReactComponent(DialogClass);
const CheckBox = createReactComponent(CheckBoxClass);
const Button = createReactComponent(ButtonClass);

const toggleDialog = (dialog, isOpen) => {
	dialog.open = isOpen;
};
const startGenerationHandler = () => {
	const button = myAiButton;
	if (button.state === "" || button.state === "regenerate") {
		button.state = "generating";
		startTextGeneration(button);
	}
};
const setBusyIndicator = (isActive) => {
	ui5BiOutput1.active = isActive;
	ui5BiOutput2.active = isActive;
};
const resetAfterGeneration = (button) => {
	setBusyIndicator(false);
	button.state = "regenerate";
	button.accessibilityAttributes = {
		root: {
			hasPopup: "false"
		}
	};
};
const stopTextGeneration = () => {
	console.warn("Text generation stopped");
	generationIntervals.forEach(clearInterval);
	generationIntervals = [];
	setBusyIndicator(false);
	toggleOutputsDisabled(false);
};
const toggleOutputsDisabled = (isDisabled) => {
	document.getElementById("output1").disabled = isDisabled;
	document.getElementById("output2").disabled = isDisabled;
};
const getRandomPredefinedText = (texts, count) => {
	const keys = Object.keys(texts);
	const selectedTexts = [];

	for (let i = 0; i < count; i++) {
		const randomKey = keys[Math.floor(Math.random() * keys.length)];
		selectedTexts.push(texts[randomKey]);
	}

	return selectedTexts;
};
const typeText = (text, output) => {
	const words = text.split(" ");
	output.innerHTML = "";

	return new Promise((resolve) => {
		let index = 0;
		const interval = setInterval(() => {
			if (index < words.length) {
				output.innerHTML += `${words[index]} `;
				index++;
			} else {
				clearInterval(interval);
				generationIntervals.splice(generationIntervals.indexOf(interval), 1);
				resolve();
			}
		}, 50);
		generationIntervals.push(interval);
	});
};


function App() {
  const myAiButtonRef = useRef(null);

  const handleMyAiButtonClick = () => {
    if (myAiButtonRef.current.state === "generating") {
    myAiButtonRef.current.state = "regenerate";
    stopTextGeneration();
    return;
    }
    if (skipDialog) {
    startGenerationHandler();
    } else {
    toggleDialog(dialog, true);
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "fit-content" }}>
            <DynamicPage style={{ height: "31.25rem" }}>
            		<DynamicPageHeader style={{ height: "9.375rem" }}>
            			<ShellBar id="shellbar">
            				<ShellBarBranding slot="branding">
            					Your Application
            					<img slot="logo" src="https://ui5.github.io/webcomponents/nightly/images/sap-logo-svg.svg" alt="SAP Logo"/>
            				</ShellBarBranding>
            				<Avatar slot="profile" id="avatar">
            					<img src="https://ui5.github.io/webcomponents/nightly/images/avatars/woman_avatar_3.png" alt="avatar"/>
            				</Avatar>
            			</ShellBar>
            			<AIButton
            			 id="myAiButton" ref={myAiButtonRef} onClick={handleMyAiButtonClick}
            			 state="regenerate"
            			 style={{ float: "inline-end", margin: "1.375rem" }}
            			>
            				<AIButtonState name="regenerate" text="Regenerate" icon="ai" />
            				<AIButtonState name="generating" text="Stop Generating" icon="stop" />
            			</AIButton>
            		</DynamicPageHeader>
            			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
            				<div style={{ borderRadius: "0.25rem", background: "white", padding: "2rem 3rem", margin: "2rem" }}>
            					<Title level="H1" size="H4">Article 1</Title>
            					<Title level="H2" size="H5">Informative Subtitle for Article 1</Title>
            					<br />
            					<hr />
            					<BusyIndicator delay={0} style={{ width: "100%" }} id="ui5BiOutput1">
            					<Text id="output1" emptyIndicatorMode="" style={{ width: "100%", height: "10rem" }}>
            						Discover the ultimate solution for home organization with our versatile storage bins.
            						These durable containers come in various sizes to fit any space, from closets to garages.
            						Their stackable design maximizes your storage capacity while keeping your items easily accessible.
            						Each bin features a transparent body, allowing you to quickly identify contents without opening them.
            						Perfect for seasonal items, toys, or tools, these storage bins are the key to a clutter-free home.
            						Start organizing today and enjoy a more spacious and tidy living environment.
            					</Text>
            					</BusyIndicator>
            					<Title level="H1" size="H4">Article 2</Title>
            					<Title level="H2" size="H5">Informative Subtitle for Article 2</Title>
            					<br />
            					<hr />
            					<BusyIndicator delay={0} style={{ width: "100%" }} id="ui5BiOutput2">
            					<Text id="output2" emptyIndicatorMode="" style={{ width: "100%", height: "10rem" }}>
            						Experience the future of cooking with our state-of-the-art smart oven.
            						This innovative appliance offers a range of features to enhance your culinary skills, including precise temperature control and multiple cooking modes.
            						The smart oven connects to your smartphone, allowing you to monitor and adjust settings remotely.
            						With its sleek design and intuitive interface, cooking has never been easier or more enjoyable.
            						Whether you're baking, roasting, or broiling, this smart oven ensures perfect results every time.
            						Upgrade your kitchen and transform the way you cook.
            					</Text>
            					</BusyIndicator>
            				</div>
            			</div>
            		</DynamicPage>
            		<Dialog id="dialog" state="Critical" headerText="Warning">
            		<Text>
            			Regenerating will overwrite all fields with AI-generated content.<br />
            			Do you want to continue?
            		</Text>
            		<CheckBox id="checkbox" style={{ marginInlineStart: "-0.625rem" }} text="Don't ask me again" />
            		<div slot="footer" style={{ display: "flex", justifyContent: "flex-end", width: "100%", alignItems: "center", gap: "0.25rem" }}>
            			<Button design="Emphasized" id="dialogProceed">Regenerate</Button>
            			<Button id="dialogCloser">Cancel</Button>
            		</div>
            		</Dialog>
          </div>
    </>
  );
}

export default App;
