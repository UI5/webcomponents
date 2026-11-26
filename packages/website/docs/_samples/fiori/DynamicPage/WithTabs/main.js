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

let isProgrammaticScroll = false;
let scrollSettleTimer;

const items = () => tabs.allItems;
const sectionOf = item => document.getElementById(item.dataset.section);

const sectionOffset = section => {
    const container = page.scrollContainer;
    return section.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
};

const scrollToSection = section => {
    const top = sectionOffset(section) - page.scrollPaddingTop;

    isProgrammaticScroll = true;
    page.scrollContainer.scrollTo({ top, behavior: "smooth" });

    clearTimeout(scrollSettleTimer);
    scrollSettleTimer = setTimeout(() => {
        isProgrammaticScroll = false;
    }, 400);
};

tabs.addEventListener("tab-select", e => {
    const section = sectionOf(e.detail.tab);
    if (section) {
        scrollToSection(section);
    }
});

const onScroll = () => {
    if (isProgrammaticScroll) {
        return;
    }

    const all = items();
    const line = page.scrollContainer.scrollTop + page.scrollPaddingTop + 1;
    let activeIndex = 0;
    all.forEach((item, index) => {
        const section = sectionOf(item);
        if (section && sectionOffset(section) <= line) {
            activeIndex = index;
        }
    });

    const activeItem = all[activeIndex];
    if (activeItem && !activeItem.selected) {
        all.forEach((item, index) => {
            item.selected = index === activeIndex;
        });
    }
};

customElements.whenDefined("ui5-dynamic-page").then(() => {
    const attach = () => {
        if (!page.scrollContainer) {
            requestAnimationFrame(attach);
            return;
        }
        page.scrollContainer.addEventListener("scroll", onScroll);
    };
    attach();
});
