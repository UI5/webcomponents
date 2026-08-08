import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
let curAnimationMode;
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
    }
};
export { getAnimationMode, setAnimationMode, };
//# sourceMappingURL=AnimationMode.js.map