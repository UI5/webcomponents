import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarItem.js";

import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";

import "@ui5/webcomponents-icons/dist/cart.js";
import "@ui5/webcomponents-icons/dist/checklist.js";
import "@ui5/webcomponents-icons/dist/complete.js";
import "@ui5/webcomponents-icons/dist/credit-card.js";
import "@ui5/webcomponents-icons/dist/factory.js";
import "@ui5/webcomponents-icons/dist/process.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/shield.js";
import "@ui5/webcomponents-icons/dist/shipping-status.js";
import "@ui5/webcomponents-icons/dist/undo.js";

const timeline = document.getElementById("orderTimeline");
const searchInput = document.getElementById("searchInput");
const infoBarContent = document.getElementById("infoBarContent");

const allEntries = Array.from(timeline.querySelectorAll("[ui5-timeline-item]"));
let searchQuery = "";

function renderInfoBar() {
    infoBarContent.innerHTML = "";

    if (searchQuery !== "") {
        const token = document.createElement("ui5-token");
        token.setAttribute("text", `Search: "${searchQuery}"`);
        token.forcedTabIndex = "0";
        token.selected = true;
        token.addEventListener("select", () => { token.selected = true; });
        token.addEventListener("delete", () => {
            searchQuery = "";
            searchInput.value = "";
            applySearch();
        });
        infoBarContent.appendChild(token);
    }

    const label = document.createElement("ui5-label");
    const visible = allEntries.filter(item => item.parentElement === timeline);
    label.textContent = `${visible.length} of ${allEntries.length} events`;
    infoBarContent.appendChild(label);
}

function applySearch() {
    const visible = allEntries.filter(item => {
        if (searchQuery === "") {
            return true;
        }
        return (item.getAttribute("data-haystack") || "").includes(searchQuery);
    });

    allEntries.forEach(item => {
        if (item.parentElement === timeline) {
            timeline.removeChild(item);
        }
    });
    visible.forEach(item => timeline.appendChild(item));

    renderInfoBar();
}

searchInput.addEventListener("input", event => {
    searchQuery = (event.target.value || "").trim().toLowerCase();
    applySearch();
});

renderInfoBar();
