import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";
import "@ui5/webcomponents-fiori/dist/TimelineFilterOption.js";

import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/developer-settings.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/upload.js";
import "@ui5/webcomponents-icons/dist/group.js";

const timeline = document.getElementById("timeline");
const state = { searchQuery: "", selectedCategories: [], sortOrder: "Ascending" };
let allItems;

function applyFilters() {
    if (!allItems) {
        allItems = [...timeline.querySelectorAll("[ui5-timeline-item]")];
    }

    // Remove all items from DOM
    allItems.forEach((item) => item.remove());

    // Filter items matching both search and category criteria
    let visibleItems = allItems.filter((item) => {
        const text = [item.titleText, item.name, item.subtitleText, item.textContent]
            .join(" ").toLowerCase();
        const matchesSearch = !state.searchQuery || text.includes(state.searchQuery);
        const matchesCategory = state.selectedCategories.length === 0
            || state.selectedCategories.includes(item.dataset.category);
        return matchesSearch && matchesCategory;
    });

    // Sort by date
    visibleItems.sort((itemA, itemB) => {
        const dateA = new Date(itemA.dataset.date || 0);
        const dateB = new Date(itemB.dataset.date || 0);
        return state.sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
    });

    // Re-add matching items to the DOM
    visibleItems.forEach((item) => timeline.appendChild(item));
}

timeline.addEventListener("search", (event) => {
    state.searchQuery = event.detail.value.toLowerCase();
    applyFilters();
});

timeline.addEventListener("filter", (event) => {
    state.selectedCategories = event.detail.selectedOptions;
    applyFilters();
});

timeline.addEventListener("sort", (event) => {
    state.sortOrder = event.detail.sortOrder;
    applyFilters();
});
