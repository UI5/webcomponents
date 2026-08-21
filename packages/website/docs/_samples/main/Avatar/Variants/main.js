import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/AvatarBadge.js";
import "@ui5/webcomponents-icons/dist/edit.js";

const interactiveAvatar = document.getElementById("interactive-avt");
const popupAvatar = document.getElementById("popup-avt");

// Interactive avatar click handler
interactiveAvatar.addEventListener("click", () => {
	console.log("Interactive avatar clicked");
});

// Avatar with popup click handler
popupAvatar.addEventListener("click", () => {
	console.log("Avatar with popup clicked - menu would open here");
});
