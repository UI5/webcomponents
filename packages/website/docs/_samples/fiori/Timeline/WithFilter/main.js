import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/DateRangePicker.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Token.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents/dist/ToolbarItem.js";
import "@ui5/webcomponents/dist/ToolbarSpacer.js";

import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";

import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/cloud-check.js";
import "@ui5/webcomponents-icons/dist/cloud.js";
import "@ui5/webcomponents-icons/dist/complete.js";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/inspection.js";
import "@ui5/webcomponents-icons/dist/message-error.js";
import "@ui5/webcomponents-icons/dist/play.js";
import "@ui5/webcomponents-icons/dist/restart.js";
import "@ui5/webcomponents-icons/dist/sort.js";
import "@ui5/webcomponents-icons/dist/status-positive.js";

const timeline = document.getElementById("pipelineTimeline");
const searchInput = document.getElementById("searchInput");
const sortButton = document.getElementById("sortButton");
const filterButton = document.getElementById("filterButton");
const filterDialog = document.getElementById("filterDialog");
const filterList = document.getElementById("filterList");
const dateRangePicker = document.getElementById("dateRangePicker");
const filterApply = document.getElementById("filterApply");
const filterCancel = document.getElementById("filterCancel");
const tokenArea = document.getElementById("tokenArea");
const countLabel = document.getElementById("countLabel");

const allEntries = Array.from(timeline.querySelectorAll("[ui5-timeline-item]"));
let isNewestFirst = true;
let activeEnvs = [];
let searchQuery = "";
let dateRange = { start: "", end: "", display: "" };

function parseDate(subtitleText) {
    const parts = subtitleText.match(/(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})/);
    if (!parts) return null;
    return new Date(parts[3], parts[2] - 1, parts[1], parts[4], parts[5]);
}

function renderTokens() {
    tokenArea.innerHTML = "";

    activeEnvs.forEach(env => {
        const token = document.createElement("ui5-token");
        token.setAttribute("text", env);
        token.forcedTabIndex = "0";
        token.selected = true;
        token.addEventListener("select", () => { token.selected = true; });
        token.addEventListener("delete", () => {
            activeEnvs = activeEnvs.filter(e => e !== env);
            applyFilters();
        });
        tokenArea.appendChild(token);
    });

    if (dateRange.display) {
        const token = document.createElement("ui5-token");
        token.setAttribute("text", dateRange.display);
        token.forcedTabIndex = "0";
        token.selected = true;
        token.addEventListener("select", () => { token.selected = true; });
        token.addEventListener("delete", () => {
            dateRange = { start: "", end: "", display: "" };
            dateRangePicker.value = "";
            applyFilters();
        });
        tokenArea.appendChild(token);
    }

    if (searchQuery !== "") {
        const token = document.createElement("ui5-token");
        token.setAttribute("text", `"${searchQuery}"`);
        token.forcedTabIndex = "0";
        token.selected = true;
        token.addEventListener("select", () => { token.selected = true; });
        token.addEventListener("delete", () => {
            searchQuery = "";
            searchInput.value = "";
            applyFilters();
        });
        tokenArea.appendChild(token);
    }
}

function applyFilters() {
    const filtered = allEntries.filter(item => {
        const env = item.getAttribute("data-env") || "";
        const haystack = item.getAttribute("data-haystack") || "";
        const subtitleText = item.getAttribute("subtitle-text") || "";

        const matchesEnv = activeEnvs.length === 0 || activeEnvs.includes(env);
        const matchesSearch = searchQuery === "" || haystack.includes(searchQuery);

        let matchesDate = true;
        if (dateRange.start && dateRange.end) {
            const itemDate = parseDate(subtitleText);
            if (itemDate) {
                matchesDate = itemDate >= new Date(dateRange.start) && itemDate <= new Date(dateRange.end);
            }
        }

        return matchesEnv && matchesSearch && matchesDate;
    });

    const sorted = filtered.slice().sort((a, b) => {
        const aDate = a.getAttribute("subtitle-text") || "";
        const bDate = b.getAttribute("subtitle-text") || "";
        return isNewestFirst
            ? bDate.localeCompare(aDate)
            : aDate.localeCompare(bDate);
    });

    allEntries.forEach(item => {
        if (item.parentElement === timeline) {
            timeline.removeChild(item);
        }
    });
    sorted.forEach(item => timeline.appendChild(item));

    countLabel.textContent = `${sorted.length} of ${allEntries.length} events`;
    renderTokens();
}

searchInput.addEventListener("input", event => {
    searchQuery = event.target.value.trim().toLowerCase();
    applyFilters();
});

sortButton.addEventListener("click", () => {
    isNewestFirst = !isNewestFirst;
    sortButton.text = isNewestFirst ? "Newest first" : "Oldest first";
    applyFilters();
});

filterButton.addEventListener("click", () => {
    filterDialog.open = true;
});

filterApply.addEventListener("click", () => {
    activeEnvs = filterList.getSelectedItems().map(item => item.getAttribute("data-env"));

    const pickerValue = dateRangePicker.value || "";
    if (pickerValue) {
        const startDate = dateRangePicker.startDateValue;
        const endDate = dateRangePicker.endDateValue;
        if (startDate && endDate) {
            endDate.setHours(23, 59, 59);
            dateRange = {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                display: pickerValue,
            };
        }
    } else {
        dateRange = { start: "", end: "", display: "" };
    }

    filterDialog.open = false;
    applyFilters();
});

filterCancel.addEventListener("click", () => {
    filterDialog.open = false;
});
