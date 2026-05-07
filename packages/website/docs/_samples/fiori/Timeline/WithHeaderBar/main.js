import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";
import "@ui5/webcomponents-fiori/dist/TimelineFilterOption.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Text.js";

import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/developer-settings.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/document.js";
import "@ui5/webcomponents-icons/dist/upload.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/decline.js";

const timeline = document.getElementById("timeline");
const filterInfoBar = document.getElementById("filter-info-bar");
const filterInfoText = document.getElementById("filter-info-text");
const clearFiltersButton = document.getElementById("clear-filters");
const state = { searchQuery: "", selectedCategories: [], sortOrder: "Ascending" };
let allItems;

function applyFilters() {
    if (!allItems) {
        allItems = [...timeline.querySelectorAll("[ui5-timeline-item]")];
    }

    allItems.forEach((item) => item.remove());

    let visibleItems = allItems.filter((item) => {
        const text = [item.titleText, item.name, item.subtitleText, item.textContent]
            .join(" ").toLowerCase();
        const matchesSearch = !state.searchQuery || text.includes(state.searchQuery);
        const matchesCategory = state.selectedCategories.length === 0
            || state.selectedCategories.includes(item.dataset.category);
        return matchesSearch && matchesCategory;
    });

    visibleItems.sort((itemA, itemB) => {
        const dateA = new Date(itemA.dataset.date || 0);
        const dateB = new Date(itemB.dataset.date || 0);
        return state.sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
    });

    visibleItems.forEach((item) => timeline.appendChild(item));
}

function updateFilterInfoBar() {
    if (state.selectedCategories.length > 0) {
        filterInfoText.textContent = "Filtered By: " + state.selectedCategories.join(", ");
        filterInfoBar.style.display = "flex";
    } else {
        filterInfoBar.style.display = "none";
    }
}

timeline.addEventListener("search", (event) => {
    state.searchQuery = event.detail.value.toLowerCase();
    applyFilters();
});

timeline.addEventListener("filter", (event) => {
    state.selectedCategories = event.detail.selectedOptions;
    updateFilterInfoBar();
    applyFilters();
});

timeline.addEventListener("sort", (event) => {
    state.sortOrder = event.detail.sortOrder;
    applyFilters();
});

clearFiltersButton.addEventListener("click", () => {
    const headerBar = timeline.querySelector("ui5-timeline-header-bar");
    headerBar.querySelectorAll("ui5-timeline-filter-option")
        .forEach((option) => { option.selected = false; });

    state.selectedCategories = [];
    updateFilterInfoBar();
    applyFilters();
});
