import "@ui5/webcomponents-fiori/dist/DynamicPage.js";
import "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";

import "@ui5/webcomponents/dist/Breadcrumbs.js";
import "@ui5/webcomponents/dist/BreadcrumbsItem.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Toolbar.js";
import "@ui5/webcomponents/dist/ToolbarButton.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";

import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

const page = document.getElementById("page");
const tabs = document.getElementById("tabs");

const panels = {
    0: document.getElementById("tab-overview"),
    1: document.getElementById("tab-specifications"),
    2: document.getElementById("tab-related"),
};

tabs.addEventListener("tab-select", e => {
    Object.values(panels).forEach(panel => panel.classList.remove("active"));
    panels[e.detail.tabIndex].classList.add("active");
    page.scrollContainer.scrollTop = 0;
});

