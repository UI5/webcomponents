type DirectionChangeCallback = () => void;
/**
 * Attach a callback that will be executed whenever the application calls the "applyDirection" function
 * @public
 * @param listener
 */
declare const attachDirectionChange: (listener: DirectionChangeCallback) => void;
/**
 * Detach a callback that was passed with "attachDirectionChange"
 * @public
 * @param listener
 */
declare const detachDirectionChange: (listener: DirectionChangeCallback) => void;
declare const fireDirectionChange: () => void[];
export { attachDirectionChange, detachDirectionChange, fireDirectionChange, };
