import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";
import "@ui5/webcomponents-fiori/dist/TimelineFilterOption.js";

import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/developer-settings.js";
import "@ui5/webcomponents-icons/dist/upload.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/performance.js";

const timeline = document.getElementById("timeline");
let allItems;

function collectItems() {
    if (!allItems) {
        allItems = [...timeline.querySelectorAll("[ui5-timeline-item]")];
    }
}

timeline.addEventListener("filter", (event) => {
    collectItems();

    const selectedCategories = event.detail.selectedOptions;

    allItems.forEach((item) => item.remove());
    allItems
        .filter((item) => {
            return selectedCategories.length === 0
                || selectedCategories.includes(item.dataset.category);
        })
        .forEach((item) => timeline.appendChild(item));
});

timeline.addEventListener("sort", (event) => {
    collectItems();

    const sortOrder = event.detail.sortOrder;
    const visibleItems = allItems.filter((item) => item.parentElement);

    visibleItems.sort((itemA, itemB) => {
        const dateA = new Date(itemA.dataset.date || 0);
        const dateB = new Date(itemB.dataset.date || 0);
        return sortOrder === "Ascending" ? dateA - dateB : dateB - dateA;
    });

    visibleItems.forEach((item) => timeline.appendChild(item));
});
