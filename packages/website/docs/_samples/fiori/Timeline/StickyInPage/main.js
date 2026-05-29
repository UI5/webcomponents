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
let activeStatus = "";

function renderTokens() {
    tokenArea.innerHTML = "";
    if (activeStatus !== "") {
        const token = document.createElement("ui5-token");
        token.setAttribute("text", activeStatus);
        token.forcedTabIndex = "0";
        token.selected = true;
        token.addEventListener("select", () => { token.selected = true; });
        token.addEventListener("delete", () => {
            activeStatus = "";
            const allOption = statusFilter.querySelector("ui5-toolbar-select-option:first-child");
            statusFilter.querySelectorAll("ui5-toolbar-select-option").forEach(opt => {
                opt.removeAttribute("selected");
            });
            allOption.setAttribute("selected", "");
            applyFilter();
        });
        tokenArea.appendChild(token);
    }
}

function applyFilter() {
    const visible = allEntries.filter(item => {
        if (activeStatus === "") {
            return true;
        }
        return item.getAttribute("data-status") === activeStatus;
    });

    allEntries.forEach(item => {
        if (item.parentElement === timeline) {
            timeline.removeChild(item);
        }
    });
    visible.forEach(item => timeline.appendChild(item));

    infoLabel.textContent = `${visible.length} of ${allEntries.length} documents`;
    renderTokens();
}

statusFilter.addEventListener("change", event => {
    const selectedOption = event.detail?.selectedOption || event.target.querySelector("[selected]");
    activeStatus = selectedOption?.getAttribute("data-status") || "";
    applyFilter();
});
