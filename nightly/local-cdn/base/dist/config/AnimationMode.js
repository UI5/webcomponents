import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
import { createOrUpdateStyle } from "../ManagedStyles.js";
let curAnimationMode;
const applyAnimationMode = (animationMode) => {
    createOrUpdateStyle(`:root { --_ui5-animation-mode: ${animationMode}; }`, "data-ui5-animation-mode");
};
attachConfigurationReset(() => {
    curAnimationMode = undefined;
});
/**
 * Returns the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @returns { AnimationMode }
 */
const getAnimationMode = () => {
    if (curAnimationMode === undefined) {
        curAnimationMode = getConfiguredAnimationMode();
        applyAnimationMode(curAnimationMode);
    }
    return curAnimationMode;
};
/**
 * Sets the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @param { AnimationMode } animationMode
 */
const setAnimationMode = (animationMode) => {
    const options = Object.values(AnimationMode);
    if (options.includes(animationMode)) {
        curAnimationMode = animationMode;
        applyAnimationMode(curAnimationMode);
    }
};
export { getAnimationMode, setAnimationMode, };
//# sourceMappingURL=AnimationMode.js.map