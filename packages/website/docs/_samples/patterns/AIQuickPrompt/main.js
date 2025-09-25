import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Card.js";
import "@ui5/webcomponents/dist/CardHeader.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents/dist/TextArea.js";
import "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

let response = null;
let texts = null;

if (!response) {
	response = await fetch("../assets/data/predefinedTexts.json");
	texts = await response.json();
}

var generationId;
var generationStopped = false;
var currentTextKey;
var translationKey = "en";
const sendButton = document.getElementById("footerBtnSend");
const toast = document.getElementById("quickPromptToast");
const predefinedTexts = texts.predefinedTexts;
const predefinedTextsBulleted = texts.predefinedTextsBulleted;
const predefinedTextsExpanded = texts.predefinedTextsExpanded;
const predefinedTextsRephrased = texts.predefinedTextsRephrased;
const predefinedTextsSimplified = texts.predefinedTextsSimplified;
const predefinedTextsSummarized = texts.predefinedTextsSummarized;

function aiQuickPromptButtonClickHandler(e) {
	var button = e.target;
	switch(button.state) {
		case "":
		case "generate":
			button.state = "generating";
			sendButton.disabled = true;
			startQuickPromptGeneration(button);
			const keys = Object.keys(predefinedTexts[translationKey]);
			const randomKey = keys[Math.floor(Math.random() * keys.length)];
			currentTextKey = randomKey;
			generateText(predefinedTexts[translationKey][randomKey], button);
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
}

sendButton.addEventListener("click", function() {
	const output = document.getElementById("output");
	if (output.value) {
		toast.open = true;
		output.valueState = "None";
		output.value = "";
	}
});

function isTextWrong() {
		return output.value.trim() !== predefinedTexts[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsExpanded[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsBulleted[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsRephrased[translationKey][currentTextKey]
			&& output.value.trim() !== predefinedTextsSimplified[translationKey][currentTextKey];
	}

menu1.addEventListener("item-click", function (e) {
	const button = menu1.opener;
	const output = document.getElementById("output");

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
			clearValueState(output);
			break;
		case "Fix Spelling and Grammar":
			fixSpellingAndGrammar(button, output);
			break;
		case "Generate Error":
			setNegativeValueState(output);
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
});

function setStateAndGenerate(button, state, textKey, predefinedTexts) {
	button.state = state;
	startQuickPromptGeneration(button);
	generateText(predefinedTexts[translationKey][textKey], button);
}

function startTextGeneration(button, state, predefinedTexts) {
	button.state = state;
	startQuickPromptGeneration(button);
	generateText(predefinedTexts[translationKey][currentTextKey], button);
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


quickPromptAiButton.addEventListener("click", aiQuickPromptButtonClickHandler);

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
				output.valueState = "None";
			}
			clearInterval(generationId);
			sendButton.disabled = false;
			output.disabled = false;
		}
	}, 75);
}