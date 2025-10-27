import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/RatingIndicator.js";
import "@ui5/webcomponents/dist/Tab.js";
import "@ui5/webcomponents/dist/TabContainer.js";
import "@ui5/webcomponents/dist/TabSeparator.js";
import "@ui5/webcomponents/dist/ToggleButton.js";

import "@ui5/webcomponents-fiori/dist/ShellBar.js";
import "@ui5/webcomponents-fiori/dist/ShellBarBranding.js";
import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";

import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";
import "@ui5/webcomponents-icons/dist/incoming-call.js";
import "@ui5/webcomponents-icons/dist/disconnected.js";
import "@ui5/webcomponents-icons/dist/camera.js";
import "@ui5/webcomponents-icons/dist/laptop.js";
import "@ui5/webcomponents-icons/dist/desktop-mobile.js";
import "@ui5/webcomponents-icons/dist/responsive.js";
import "@ui5/webcomponents-icons/dist/print.js";
import "@ui5/webcomponents-icons/dist/iphone.js";
import "@ui5/webcomponents-icons/dist/ipad.js";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/menu.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import "@ui5/webcomponents-icons/dist/full-screen.js";
import "@ui5/webcomponents-icons/dist/add.js";

let midFullScreen = false;
let endFullScreen = false;
let avatars = [
    "camera",
    "laptop",
    "desktop-mobile",
    "responsive",
    "print",
    "iphone",
    "ipad",
];
let avatarsBG = [
    "Accent1",
    "Accent2",
    "Accent3",
    "Accent4",
    "Accent5",
    "Accent6",
    "Accent7",
    "Accent8",
    "Accent9",
    "Accent10",
];
let suppliers = [
    "Titanium",
    "Technocom",
    " Red Point Stores",
    " Very Best Screens",
    "Smartcards",
    "Alpha Printers",
    "Printer for All",
    "Oxynum",
    "Fasttech",
    "Ultrasonic United",
    "Speaker Experts",
    "Brainsoft",
];
function updateProductInfo(item) {
    avatar.icon = avatars[getRandomInt(6)];
    avatar.backgroundColor = avatarsBG[getRandomInt(9) + 1];
    productRating.value = getRandomInt(4) + 1;
    col2title.textContent = item.textContent;
    lblName.innerHTML = "<b>" + item.textContent + "</b>";
    lblDesc.innerHTML = "<b>" + item.description + "</b>";
    lblSupplier.innerHTML = "<b>" + suppliers[getRandomInt(11)] + "</b>";
}
function updateDetailInfo(item) {
    col3title.textContent = item.textContent;
}
function nextLayout(target) {
    let layout = fcl.layout;
    if (target === "col1") {
        exitFullScreen();
        return "TwoColumnsMidExpanded";
    }
    if (target === "col2") {
        if (midFullScreen) {
            enterFullScreen();
            return "EndColumnFullScreen";
        }
        exitFullScreen();
        return "ThreeColumnsMidExpanded";
    }
    if (target === "col2close") {
        if (midFullScreen) {
            enterFullScreen();
        } else {
            exitFullScreen();
        }
        return "OneColumn";
    }
    if (target === "col3close") {
        if (fcl.media === "phone") {
            endFullScreen = true;
        }
        if (endFullScreen) {
            enterFullScreen();
            return "MidColumnFullScreen";
        }
        exitFullScreen();
        return "ThreeColumnsMidExpandedEndHidden";
    }
    if (target === "col2fullscreen") {
        if (!midFullScreen) {
            enterFullScreen();
            return "MidColumnFullScreen";
        }
        exitFullScreen();
        return "ThreeColumnsMidExpandedEndHidden";
    }
    if (target === "col3fullscreen") {
        if (!endFullScreen) {
            enterFullScreen();
            return "EndColumnFullScreen";
        }
        exitFullScreen();
        return "ThreeColumnsEndExpanded";
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function enterFullScreen() {
    endFullScreen = true;
    midFullScreen = true;
    fullscreenMidColumn.icon = "exit-full-screen";
    fullscreenEndColumn.icon = "exit-full-screen";
}
function exitFullScreen() {
    endFullScreen = false;
    midFullScreen = false;
    fullscreenMidColumn.icon = "full-screen";
    fullscreenEndColumn.icon = "full-screen";
}
// Event handlers
col1list.addEventListener("item-click", function (e) {
    updateProductInfo(e.detail.item);
    fcl.layout = nextLayout("col1");
});
col2list.addEventListener("item-click", function (e) {
    updateDetailInfo(e.detail.item);
    fcl.layout = nextLayout("col2");
});
closeMidColumn.addEventListener("click", function (e) {
    fcl.layout = nextLayout("col2close");
});
closeEndColumn.addEventListener("click", function (e) {
    fcl.layout = nextLayout("col3close");
});
fullscreenMidColumn.addEventListener("click", function (e) {
    fcl.layout = nextLayout("col2fullscreen");
});
fullscreenEndColumn.addEventListener("click", function (e) {
    fcl.layout = nextLayout("col3fullscreen");
});
[...document.querySelectorAll("ui5-toggle-button")].forEach(el => {
	el.addEventListener("click", event => {
		const toggleButton = event.target;
		toggleButton.icon = toggleButton.pressed ? "sap-icon://da-2" : "sap-icon://da";
	});
});