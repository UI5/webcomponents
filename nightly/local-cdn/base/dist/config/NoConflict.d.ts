type NoConflictData = boolean | {
    events: Array<string>;
};
/**
 * Returns if the "noConflict" configuration is set.
 * @public
 * @returns { NoConflictData }
 */
declare const getNoConflict: () => NoConflictData;
/**
 * Sets the "noConflict" mode.
 * - When "false" (default value), all custom events are fired with and without the "ui5-" prefix.
 * - When "true", all custom events are fired with the "ui5-" prefix only.
 * - When an object is supplied, just the specified events will be fired with the "ui5-" prefix.
 * @public
 * @param { NoConflictData } noConflictData
 */
declare const setNoConflict: (noConflictData: NoConflictData) => void;
declare const skipOriginalEvent: (eventName: string) => boolean;
export { getNoConflict, setNoConflict, skipOriginalEvent, };
