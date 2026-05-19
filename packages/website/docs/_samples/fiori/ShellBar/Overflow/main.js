import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Tag.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Slider.js";
import "@ui5/webcomponents/dist/Popover.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/ShellBarSpacer.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";

import "@ui5/webcomponents/dist/Icon.js";

import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/example.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const shellbar = document.getElementById("shellbar");
const popover = document.getElementById("popover");
const popoverContent = document.getElementById("popover-content");

// Create overflow button (added to shellbar when items are hidden)
const overflowBtn = document.createElement("ui5-button");
overflowBtn.icon = "slim-arrow-down";
overflowBtn.slot = "content";
overflowBtn.dataset.hideOrder = "999"; // Never hide the overflow button
overflowBtn.addEventListener("click", () => {
    popover.opener = overflowBtn;
    popover.open = !popover.open;
});

// Listen for content items becoming hidden/visible
shellbar.addEventListener("content-item-visibility-change", (e) => {
    const hiddenItems = e.detail.items;

    // Update popover with clones of hidden items
    popoverContent.innerHTML = "";
    hiddenItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.removeAttribute("slot");
        popoverContent.appendChild(clone);
    });

    // Show/hide overflow button based on whether items are hidden
    if (hiddenItems.length > 0) {
        shellbar.prepend(overflowBtn);
    } else {
        overflowBtn.remove();
        popover.open = false;
    }
});

// Slider to resize shellbar container
document.getElementById("slider").addEventListener("input", (e) => {
    document.getElementById("container").style.width = `${e.target.value}%`;
});
