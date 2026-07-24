import AnimationMode from "../types/AnimationMode.js";
/**
 * Returns the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @returns { AnimationMode }
 */
declare const getAnimationMode: () => `${AnimationMode}`;
/**
 * Sets the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @param { AnimationMode } animationMode
 */
declare const setAnimationMode: (animationMode: `${AnimationMode}`) => void;
export { getAnimationMode, setAnimationMode, };
