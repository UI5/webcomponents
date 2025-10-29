import "@ui5/webcomponents/dist/Card.js";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/TextArea.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/RangeSlider.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents-fiori/dist/DynamicSideContent.js";
import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";

let response = null;
let responseContent = null;

if (!response) {
	response = await fetch("../assets/data/predefinedTexts.json");
	responseContent = await response.json();
}

const dialog = document.getElementById("dialog");
const busyIndicator = document.querySelector("ui5-busy-indicator");
const applyTextImprovementsButton = document.getElementById("applyTextImprovementsButton");
const openDialogButton = document.getElementById("openDialogButton");
const closeDialogButton = document.getElementById("closeDialogButton");
const output = document.getElementById("output");
const structureSelect = document.getElementById("structureSelect");
const languageSelect = document.getElementById("languageSelect");
const toneOfVoiceSelect = document.getElementById("toneOfVoiceSelect");
const sendButton = document.getElementById("sendButton");
const toast = document.getElementById("guidedPromptToast");

const texts = {
	paragraph: responseContent.predefinedTexts,
	bulleted: responseContent.predefinedTextsBulleted,
};
let options = {
	structure: "paragraph",
	language: "en",
	toneOfVoice: 2,
};
let text;
let dialogGenerationId;

function startGenerating() {
	console.warn("startGenerating");
	text = texts[options.structure][options.language][options.toneOfVoice];
	busyIndicator.active = true;
	output.value = "";
	openDialogButton.state = "generating";

	closeDialog();
	
	var generationId = setTimeout(() => {
		stopGenerating(generationId)
		output.value = text;
	}, 3000);

	return generationId;
}

function stopGenerating(generationId) {
	console.warn("stopGenerating");
	busyIndicator.active = false;
	openDialogButton.state = "generate";
	clearTimeout(generationId);
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

sendButton.addEventListener("click", function() {
	const output = document.getElementById("output");
	if (output.value) {
		toast.open = true;
		output.valueState = "None";
		output.value = "";
	}
});

structureSelect.addEventListener("change", structureSelectHandler);
openDialogButton.addEventListener("click", openDialogButtonClickHandler);
closeDialogButton.addEventListener("click", closeDialog);
applyTextImprovementsButton.addEventListener("click", applyTextImprovementsButtonClickHandler);
languageSelect.addEventListener("change", languageSelectHandler);
toneOfVoiceSelect.addEventListener(
	"selection-change",
	toneOfVoiceSelectHandler
);
