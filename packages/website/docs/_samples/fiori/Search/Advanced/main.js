import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-fiori/dist/Search.js";
import "@ui5/webcomponents-fiori/dist/SearchMessageArea.js";
import "@ui5/webcomponents-fiori/dist/SearchItem.js";

const data = [
	{ name: "Red Apple", category: "Fruit" },
	{ name: "Apple", category: "Fruit" },
	{ name: "Cucumber", category: "Vegetable" },
	{ name: "Orange", category: "Fruit" },
	{ name: "Tomato", category: "Vegetable" },
];

function onDelete(event) {
	const item = event.target;
	if (item) {
		item.remove();
	}
}

function createItems(parent, data) {
	data.forEach((item) => {
		const searchItem = document.createElement("ui5-search-item");
		searchItem.text = item.name;
		searchItem.icon = "search";
		searchItem.addEventListener("ui5-delete", onDelete);
		parent.appendChild(searchItem);
	});
}

const filtering = document.getElementById("filtering");
createItems(filtering, data);
filtering.addEventListener("ui5-input", (event) => {
	const value = event.target.value.toLowerCase();
	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(value)
	);

	filtering.items.forEach((item) => {
		item.remove();
	});

	// create search items based on search
	createItems(filtering, filteredData);
});
