import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents/dist/SuggestionItemCustom.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";

const countries = [
	"Albania",
	"Andorra",
	"Austria",
	"Belarus",
	"Belgium",
	"Bulgaria",
	"Croatia",
	"Germany",
	"Denmark",
];

const input = document.getElementById("field");

input.addEventListener("input", event => {
	const value = event.target.value;
	const filtered = countries.filter(country => country.toLowerCase().startsWith(value.toLowerCase()));

	fillInput(filtered, value)
});

const fillInput = (data, value) => {
	input.innerHTML = "";

	data.forEach((country) => {
		const item = document.createElement("ui5-suggestion-item-custom");
		item.setAttribute("text", country);
	
		item.innerHTML = `
			<div class='item-content'>
				<ui5-icon name="globe" aria-hidden="true"></ui5-icon>
				<div class='item-titles'>
					<span>${generateHighlightedMarkup(country, value)}</span>
					<small>EU</small>
				</div>
	
				<span class='green'><b>EU</b></span>
			</div>
		`;
		input.appendChild(item);
	});
};

input.addEventListener("ui5-selection-change", e => {
	const text = e.detail.item?.text;

	announce(text + " EU", "Polite");
})
