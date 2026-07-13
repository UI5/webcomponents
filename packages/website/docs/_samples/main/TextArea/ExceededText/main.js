import "@ui5/webcomponents/dist/TextArea.js"

const textArea = document.getElementById("textarea");

// App-controlled threshold
textArea.addEventListener("input", () => {
	const value = textArea.value;
	const maxlength = textArea.maxlength;
	const percentage = (value.length / maxlength) * 100;

	if (percentage >= 75) {
		textArea.valueState = "Critical";
	} else {
		textArea.valueState = "None";
	}
});
