import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import "@ui5/webcomponents-fiori/dist/TimelineHeaderBar.js";

import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/developer-settings.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/upload.js";

const timeline = document.getElementById("timeline");
let allItems;

timeline.addEventListener("search", (event) => {
    if (!allItems) {
        allItems = [...timeline.querySelectorAll("[ui5-timeline-item]")];
    }

    const searchQuery = event.detail.value.toLowerCase();

    allItems.forEach((item) => item.remove());
    allItems
        .filter((item) => {
            if (!searchQuery) return true;
            const text = [item.titleText, item.name, item.subtitleText, item.textContent]
                .join(" ").toLowerCase();
            return text.includes(searchQuery);
        })
        .forEach((item) => timeline.appendChild(item));
});
