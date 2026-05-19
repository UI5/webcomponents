import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";

import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";

import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/filter.js";

const timeline = document.getElementById("filterableTimeline");
const searchInput = document.getElementById("searchInput");
const sortButton = document.getElementById("sortButton");
const filterButton = document.getElementById("filterButton");
const filterDialog = document.getElementById("filterDialog");
const filterList = document.getElementById("filterList");
const filterDialogApply = document.getElementById("filterDialogApply");
const filterDialogCancel = document.getElementById("filterDialogCancel");
const activeStateLabel = document.getElementById("activeStateLabel");

const allEntries = Array.from(timeline.querySelectorAll("[ui5-timeline-item]"));
let isAscending = true;
let activeAuthors = [];
let searchQuery = "";

function applyFilters() {
    const filtered = allEntries.filter(item => {
        const author = item.getAttribute("data-author") || "";
        const title = item.getAttribute("title-text") || "";

        const matchesAuthor = activeAuthors.length === 0 || activeAuthors.includes(author);
        const matchesSearch = searchQuery === ""
            || author.toLowerCase().includes(searchQuery)
            || title.toLowerCase().includes(searchQuery);

        return matchesAuthor && matchesSearch;
    });

    const sorted = filtered.slice().sort((firstItem, secondItem) => {
        const firstSubtitle = firstItem.getAttribute("subtitle-text") || "";
        const secondSubtitle = secondItem.getAttribute("subtitle-text") || "";
        return isAscending
            ? firstSubtitle.localeCompare(secondSubtitle)
            : secondSubtitle.localeCompare(firstSubtitle);
    });

    allEntries.forEach(item => {
        if (item.parentElement === timeline) {
            timeline.removeChild(item);
        }
    });
    sorted.forEach(item => timeline.appendChild(item));

    const sortLabel = `Sort: ${isAscending ? "Ascending" : "Descending"}`;
    const filterLabel = activeAuthors.length === 0 ? "No filters" : `Filter: ${activeAuthors.join(", ")}`;
    const searchLabel = searchQuery === "" ? "No search" : `Search: "${searchQuery}"`;
    activeStateLabel.textContent = `${sortLabel} · ${filterLabel} · ${searchLabel}`;
}

searchInput.addEventListener("input", event => {
    searchQuery = event.target.value.trim().toLowerCase();
    applyFilters();
});

sortButton.addEventListener("click", () => {
    isAscending = !isAscending;
    sortButton.textContent = `Sort: ${isAscending ? "Ascending" : "Descending"}`;
    applyFilters();
});

filterButton.addEventListener("click", () => {
    filterDialog.open = true;
});

filterDialogApply.addEventListener("click", () => {
    activeAuthors = filterList.getSelectedItems().map(item => item.textContent.trim());
    filterDialog.open = false;
    applyFilters();
});

filterDialogCancel.addEventListener("click", () => {
    filterDialog.open = false;
});
