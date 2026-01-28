import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-fiori/dist/Page.js";
import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/BusyIndicator.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/CheckBox.js";

let response = null;
let texts = null;
let skipDialog = false;

if (!response) {
	response = await fetch("../assets/data/predefinedTexts.json");
	texts = await response.json();
}

const translationKey = "en"
const predefinedTexts = texts.predefinedTexts;

const toggleDialog = (dialog, isOpen) => {
	dialog.open = isOpen;
};

dialogCloser.addEventListener("click", () => toggleDialog(dialog, false));
myAiButton.accessibilityAttributes = {
	root: {
		hasPopup: "dialog"
	}
};

myAiButton.addEventListener("click", () => {
	if (myAiButton.state === "generating") {
		myAiButton.state = "regenerate";
		stopTextGeneration();
		return;
	}

	if (skipDialog) {
		startGenerationHandler();
	} else {
		toggleDialog(dialog, true);
	}
});

document.getElementById("dialogProceed").addEventListener("click", () => {
	if (checkbox.checked) {
		skipDialog = true;
	}
	toggleDialog(dialog, false);
	startGenerationHandler();
});

let generationIntervals = [];

const startGenerationHandler = () => {
	const button = myAiButton;
	if (button.state === "" || button.state === "regenerate") {
		button.state = "generating";
		startTextGeneration(button);
	}
};

const startTextGeneration = async (button) => {
	console.warn("Text generation started");
	setBusyIndicator(true);

	try {
		const texts = predefinedTexts[translationKey];
		const [output1Text, output2Text] = getRandomPredefinedText(texts, 2);

		await generateTextForOutput(output1Text, "output1");
		await generateTextForOutput(output2Text, "output2");

		resetAfterGeneration(button);
	} catch (error) {
		console.error("An error occurred during text generation:", error);
		stopTextGeneration();
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

const generateTextForOutput = async (text, outputId) => {
	const output = document.getElementById(outputId);
	toggleOutputsDisabled(true);

	await typeText(text, output);

	toggleOutputsDisabled(false);
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