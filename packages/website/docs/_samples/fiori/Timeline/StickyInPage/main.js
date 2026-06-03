import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarSelect.js";
import "@ui5/webcomponents/dist/ToolbarSelectOption.js";

import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";

import "@ui5/webcomponents-icons/dist/document-text.js";
import "@ui5/webcomponents-icons/dist/employee-approvals.js";
import "@ui5/webcomponents-icons/dist/employee-rejections.js";
import "@ui5/webcomponents-icons/dist/signature.js";
import "@ui5/webcomponents-icons/dist/to-be-reviewed.js";

const timeline = document.getElementById("approvalTimeline");
const statusFilter = document.getElementById("statusFilter");
const tokenArea = document.getElementById("tokenArea");
const infoLabel = document.getElementById("infoLabel");

const allEntries = Array.from(timeline.querySelectorAll("[ui5-timeline-item]"));
const allOptions = Array.from(statusFilter.querySelectorAll("[ui5-toolbar-select-option]"));
let activeStatus = "";

function renderTokens() {
    tokenArea.innerHTML = "";
    if (activeStatus !== "") {
        const token = document.createElement("ui5-token");
        token.text = activeStatus;
        token.forcedTabIndex = "0";
        token.selected = true;
        token.addEventListener("select", () => { token.selected = true; });
        token.addEventListener("delete", () => {
            activeStatus = "";
            allOptions.forEach(opt => { opt.selected = false; });
            allOptions[0].selected = true;
            applyFilter();
        });
        tokenArea.appendChild(token);
    }
}

function applyFilter() {
    let visibleCount = 0;
    allEntries.forEach(item => {
        const matches = activeStatus === "" || item.dataset.status === activeStatus;
        item.hidden = !matches;
        if (matches) {
            visibleCount++;
        }
    });

    infoLabel.textContent = `${visibleCount} of ${allEntries.length} documents`;
    renderTokens();
}

statusFilter.addEventListener("change", event => {
    const selectedOption = event.detail?.selectedOption;
    activeStatus = selectedOption?.dataset.status || "";
    applyFilter();
});
