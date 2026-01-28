import "@ui5/webcomponents-ai/dist/Button.js";
import "@ui5/webcomponents/dist/Menu.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";

var generationId;

function startGeneration(button) {
	console.warn("startGeneration");
	generationId = setTimeout(function () {
		console.warn("Generation completed");
		button.state = "revise";
		button.accessibilityAttributes = {
			root: {
				hasPopup: "menu",
				roleDescription: "Menu Button"
			}
		};
	}, 3000);
}

function stopGeneration(button) {
	console.warn("stopGeneration");
	clearTimeout(generationId);
	button.accessibilityAttributes = {
		root: {
			hasPopup: "false"
		}
	};
}

function aiButtonClickHandler(evt) {
	var button = evt.target;
	switch (button.state) {
		case "generate":
			button.state = "generating";
			startGeneration(button);
			break;
		case "generating":
			button.state = "generate";
			stopGeneration(button);
			break;
		case "revise":
			menu.opener = button;
			menu.open = true;
			break;
	}
}

myAiButton.addEventListener("click", aiButtonClickHandler);

menu.addEventListener("item-click", function (evt) {
	var button = menu.opener;
	if (evt.detail.text === "Regenerate") {
		button.state = "generating";
		startGeneration(button);
	}
});
