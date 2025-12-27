declare const isBooted: () => boolean;
/**
 * Attaches a callback that will be executed after boot finishes.
 * **Note:** If the framework already booted, the callback will be immediately executed.
 * @public
 * @param { Function } listener
 */
declare const attachBoot: (listener: () => void) => void;
declare const boot: () => Promise<void>;
export { boot, attachBoot, isBooted, };
