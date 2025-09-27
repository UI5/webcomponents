import { isIOS, isSafari } from "../Device.js";
let listenerAttached = false;
const fixSafariActiveState = () => {
    if (isSafari() && isIOS() && !listenerAttached) {
        // Safari on iOS does not use the :active state unless there is a touchstart event handler on the <body> element
        document.body.addEventListener("touchstart", () => { });
        listenerAttached = true;
    }
};
export default fixSafariActiveState;
//# sourceMappingURL=fixSafariActiveState.js.map